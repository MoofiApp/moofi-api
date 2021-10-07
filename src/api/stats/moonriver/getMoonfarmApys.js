const { getMasterChefApys } = require('./getMoonriverMasterChefApys');
import { MOON_LPF } from '../../../constants';

const MasterChefAbi = require('../../../abis/MasterChef.json');
const pools = require('../../../data/moonriver/moonfarmLpPools.json');

const getMoonfarmApys = async () =>
  await getMasterChefApys({
    masterchef: '0x78Aa55Ce0b0DC7488d2C38BD92769f4d0C8196Ff',
    tokenPerBlock: 'moonfarmPerBlock',
    hasMultiplier: false,
    pools: pools,
    oracleId: 'MOON',
    oracle: 'tokens',
    decimals: '1e18',
    liquidityProviderFee: MOON_LPF,
    log: true,
  });

module.exports = { getMoonfarmApys };
