import BigNumber from 'bignumber.js';
import { MultiCall } from 'eth-multicall';
import { multicallAddress } from '../../../utils/web3';

import MasterChefAbi from '../../../abis/MasterChef.json';
import { ERC20, ERC20_ABI } from '../../../abis/common/ERC20';
import fetchPrice from '../../../utils/fetchPrice';
import getBlockNumber from '../../../utils/getBlockNumber';
import { getTradingFeeAprSushi, getTradingFeeApr } from '../../../utils/getTradingFeeApr';
import { sushiClient } from '../../../apollo/client';
import { AbiItem } from 'web3-utils';
import { LpPool, SingleAssetPool } from '../../../types/LpPool';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import getApyBreakdown, { ApyBreakdownResult } from '../common/getApyBreakdown';
import Web3 from 'web3';
import { ChainId } from '../../../../packages/address-book/types/chainid';
import getBlockTime from '../../../utils/getBlockTime';

export interface MasterChefApysParams {
  web3: Web3;
  chainId: ChainId;
  masterchef: string;
  masterchefAbi?: AbiItem[];
  tokenPerBlock: string;
  hasMultiplier: boolean;
  singlePools?: SingleAssetPool[];
  pools?: LpPool[] | (LpPool | SingleAssetPool)[];
  cTokenAbi?: any;
  oracle: string;
  oracleId: string;
  decimals: string;
  tradingFeeInfoClient?: ApolloClient<NormalizedCacheObject>;
  liquidityProviderFee?: number;
  log?: boolean;
  tradingAprs?: {
    [x: string]: any;
  };
  secondsPerBlock?: number;
  allocPointIndex?: string;
}

export const getMasterChefApys = async (
  masterchefParams: MasterChefApysParams
): Promise<ApyBreakdownResult> => {
  masterchefParams.pools = [
    ...(masterchefParams.pools ?? []),
    ...(masterchefParams.singlePools ?? []),
  ];

  const tradingAprs = await getTradingAprs(masterchefParams);
  const farmApys = await getFarmApys(masterchefParams);

  const liquidityProviderFee = masterchefParams.liquidityProviderFee ?? 0.003;

  return getApyBreakdown(masterchefParams.pools, tradingAprs, farmApys, liquidityProviderFee);
};

const getTradingAprs = async (params: MasterChefApysParams) => {
  let tradingAprs = params.tradingAprs ?? {};
  const client = params.tradingFeeInfoClient;
  const fee = params.liquidityProviderFee;
  if (client && fee) {
    const pairAddresses = params.pools.map(pool => pool.address.toLowerCase());
    const getAprs = client === sushiClient ? getTradingFeeAprSushi : getTradingFeeApr;
    const aprs = await getAprs(client, pairAddresses, fee);
    tradingAprs = { ...tradingAprs, ...aprs };
  }
  return tradingAprs;
};

const getFarmApys = async (params: MasterChefApysParams): Promise<BigNumber[]> => {
  const apys: BigNumber[] = [];

  const tokenPrice = await fetchPrice({ oracle: params.oracle, id: params.oracleId });
  const { multiplier, blockRewards, totalAllocPoint } = await getMasterChefData(params);
  const { balances, allocPoints } = await getPoolsData(params);

  const secondsPerBlock = params.secondsPerBlock ?? (await getBlockTime(params.chainId));
  if (params.log) {
    console.log(
      params.tokenPerBlock,
      blockRewards.div(params.decimals).toNumber(),
      'secondsPerBlock',
      secondsPerBlock,
      totalAllocPoint.toNumber()
    );
  }

  for (let i = 0; i < params.pools.length; i++) {
    const pool = params.pools[i];

    const oracle = pool.oracle ?? 'lps';
    const id = pool.oracleId ?? pool.name;
    const stakedPrice = await fetchPrice({ oracle, id });
    const balance = balances[pool.name];
    const allPoints = allocPoints[pool.name];
    if (balance === undefined) {
      apys.push(new BigNumber(-1));
      continue;
    }
    const totalStakedInUsd = balance.times(stakedPrice).dividedBy(pool.decimals ?? '1e18');

    const poolBlockRewards = blockRewards
      .times(multiplier)
      .times(allPoints)
      .dividedBy(totalAllocPoint)
      .times(1 - (pool.platformFee ?? 0.02));

    const secondsPerYear = 31536000;
    const yearlyRewards = poolBlockRewards.dividedBy(secondsPerBlock).times(secondsPerYear);
    const yearlyRewardsInUsd = yearlyRewards.times(tokenPrice).dividedBy(params.decimals);

    const apy = yearlyRewardsInUsd.dividedBy(totalStakedInUsd);
    apys.push(apy);
    if (params.log) {
      console.log(
        pool.name,
        apy.toNumber(),
        totalStakedInUsd.valueOf(),
        yearlyRewardsInUsd.valueOf()
      );
    }
  }

  return apys;
};

const getMasterChefData = async (params: MasterChefApysParams) => {
  const abi = params.masterchefAbi ?? chefAbi(params.tokenPerBlock);
  const masterchefContract = new params.web3.eth.Contract(abi, params.masterchef);
  let multiplier = new BigNumber(1);
  if (params.hasMultiplier) {
    const blockNum = await getBlockNumber(params.chainId);
    multiplier = new BigNumber(
      await masterchefContract.methods.getMultiplier(blockNum - 1, blockNum).call()
    );
  }
  const blockRewards = new BigNumber(
    await masterchefContract.methods[params.tokenPerBlock]().call()
  );
  const totalAllocPoint = new BigNumber(await masterchefContract.methods.totalAllocPoint().call());
  return { multiplier, blockRewards, totalAllocPoint };
};

const getPoolsData = async (params: MasterChefApysParams) => {
  const pools = params.pools.filter(p => p.poolId !== undefined && p.poolId !== null);
  const abi = params.masterchefAbi ?? chefAbi(params.tokenPerBlock);
  const masterchefContract = new params.web3.eth.Contract(abi, params.masterchef);
  const multicall = new MultiCall(params.web3 as any, multicallAddress(params.chainId));
  const balanceCalls = [];
  const allocPointCalls = [];
  pools.forEach(pool => {
    const tokenContract = new params.web3.eth.Contract(
      ERC20_ABI,
      pool.cAddress ? pool.cAddress : pool.address
    ) as unknown as ERC20;
    balanceCalls.push({
      balance: tokenContract.methods.balanceOf(pool.strat ?? params.masterchef),
    });
    allocPointCalls.push({
      allocPoint: masterchefContract.methods.poolInfo(pool.poolId),
    });
  });

  const res = await multicall.all([balanceCalls, allocPointCalls]);

  const balances: { [key: string]: BigNumber } = {};
  const allocPoints: { [key: string]: BigNumber } = {};
  for (let index = 0; index < res[0].length; index++) {
    const v = res[0][index];
    const pool = pools[index];
    if (pool.cAddress) {
      if (!params.cTokenAbi) {
        throw Error('No cTokenAbi');
      }
      const tokenContract = new params.web3.eth.Contract(
        ERC20_ABI,
        pool.address
      ) as unknown as ERC20;
      const nTokenContract = new params.web3.eth.Contract(params.cTokenAbi, pool.cAddress) as any;
      const exchangeRate = new BigNumber(await nTokenContract.methods.exchangeRateStored().call());
      const decimals = await tokenContract.methods.decimals().call();

      const pow = new BigNumber(10).pow(decimals);
      balances[pool.name] = new BigNumber(v.balance).multipliedBy(exchangeRate).div(pow);
    } else {
      balances[pool.name] = new BigNumber(v.balance);
    }

    const ap = res[1][index];
    allocPoints[pool.name] = ap.allocPoint[params.allocPointIndex ?? '1'];
  }
  return { balances, allocPoints };
};

const chefAbi = (tokenPerBlock): AbiItem[] => {
  const cakeAbi = MasterChefAbi as AbiItem[];
  cakeAbi.push({
    inputs: [],
    name: tokenPerBlock,
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  });
  return cakeAbi;
};
