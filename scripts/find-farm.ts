import { ChainId } from '../packages/address-book/address-book';
import { moonfarm } from '../packages/address-book/address-book/moonriver/platforms/moonfarm';
import { solar } from '../packages/address-book/address-book/moonriver/platforms/solar';
import { huckleberry } from '../packages/address-book/address-book/moonriver/platforms/huckleberry';

const yargs = require('yargs');

const { ethers } = require('ethers');
const { MULTICHAIN_RPC } = require('../src/constants');

const masterchefABI = require('../src/abis/MasterChef.json');
const LPPairABI = require('../src/abis/LPPair.json');
const ERC20ABI = require('../src/abis/ERC20.json');

const projects = {
  moonfarm: {
    masterchef: moonfarm.masterchef,
  },
  solar: {
    masterchef: solar.masterchef,
  },
  huckleberry: {
    masterchef: huckleberry.masterchef,
  },
};

const args = yargs.options({
  network: {
    type: 'string',
    demandOption: true,
    describe: 'blockchain network',
    choices: Object.keys(ChainId),
  },
  project: {
    type: 'string',
    demandOption: true,
    describe: 'project name',
    choices: Object.keys(projects),
  },
  token: {
    type: 'string',
    demandOption: true,
    describe: 'token that you are looking for',
  },
}).argv;

const token = args['token'];
const masterchef = projects[args['project']].masterchef;

const chainId = ChainId[args['network']];
const provider = new ethers.providers.JsonRpcProvider(MULTICHAIN_RPC[chainId]);

async function fetchFarm(masterchefAddress, poolId) {
  console.log(`fetchFarm(${masterchefAddress}, ${poolId})`);
  const masterchefContract = new ethers.Contract(masterchefAddress, masterchefABI, provider);
  const poolInfo = await masterchefContract.poolInfo(poolId);
  return {
    lpToken: poolInfo.lpToken,
    allocPoint: poolInfo.allocPoint,
    lastRewardBlock: poolInfo.lastRewardBlock,
    accCakePerShare: poolInfo.accCakePerShare,
  };
}

async function fetchLiquidityPair(lpAddress) {
  console.log(`fetchLiquidityPair(${lpAddress})`);
  const lpContract = new ethers.Contract(lpAddress, LPPairABI, provider);
  const lpTokenContract = new ethers.Contract(lpAddress, ERC20ABI, provider);
  return {
    address: ethers.utils.getAddress(lpAddress),
    token0: await lpContract.token0(),
    token1: await lpContract.token1(),
    decimals: await lpTokenContract.decimals(),
  };
}

async function main() {
  for (let i = 0; i < 100; i++) {
    const farm = await fetchFarm(masterchef, i);
    try {
      const lp = await fetchLiquidityPair(farm.lpToken);
      if (token == lp.token0 || token == lp.token1) {
        console.log('Found farm with poolId', i);
      }
    } catch (e) {
      console.error('Failed to fetch for poolId', i, e);
    }
  }
}

main();
