const { getMasterChefApys } = require('../common/getMasterChefApys');
import { moonriverWeb3 } from '../../../utils/web3';
import { HUCKLE_LPF, MOONRIVER_CHAIN_ID } from '../../../constants';

const MasterChefAbi = require('../../../abis/MasterChef.json');
const pools = require('../../../data/moonriver/huckleberryLpPools.json');
const {
  huckleberry,
} = require('../../../../packages/address-book/address-book/moonriver/platforms/huckleberry');

const getHuckleberryApys = async () =>
  await getMasterChefApys({
    web3: moonriverWeb3,
    chainId: MOONRIVER_CHAIN_ID,
    masterchef: huckleberry.masterchef,
    tokenPerBlock: 'finnPerSecond',
    hasMultiplier: true,
    multiplierCalculatedFromTime: true,
    pools: pools,
    oracleId: 'FINN',
    oracle: 'tokens',
    decimals: '1e18',
    liquidityProviderFee: HUCKLE_LPF,
    log: true,
  });

module.exports = { getHuckleberryApys };
