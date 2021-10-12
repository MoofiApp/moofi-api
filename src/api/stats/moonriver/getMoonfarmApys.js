const { getMasterChefApys } = require('./getMoonriverMasterChefApys');
import { MOON_LPF } from '../../../constants';

const MasterChefAbi = require('../../../abis/MasterChef.json');
const pools = require('../../../data/moonriver/moonfarmLpPools.json');
const {
  moonfarm,
} = require('../../../../packages/address-book/address-book/moonriver/platforms/moonfarm');

const getMoonfarmApys = async () =>
  await getMasterChefApys({
    masterchef: moonfarm.masterchef,
    tokenPerBlock: 'moonfarmPerBlock',
    hasMultiplier: true,
    pools: pools,
    oracleId: 'MOON',
    oracle: 'tokens',
    decimals: '1e18',
    liquidityProviderFee: MOON_LPF,
    log: true,
  });

module.exports = { getMoonfarmApys };
