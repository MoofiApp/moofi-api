const { getMasterChefApys } = require('./getMoonriverMasterChefApys');
import { SOLAR_LPF } from '../../../constants';

const MasterChefAbi = require('../../../abis/MasterChef.json');
const pools = require('../../../data/moonriver/solarLpPools.json');
const singlePools = require('../../../data/moonriver/solarPools.json');
const {
  solar,
} = require('../../../../packages/address-book/address-book/moonriver/platforms/solar');

const getSolarApys = async () =>
  await getMasterChefApys({
    masterchef: solar.masterchef,
    tokenPerBlock: 'solarPerBlock',
    hasMultiplier: true,
    pools: pools,
    singlePools,
    oracleId: 'SOLAR',
    oracle: 'tokens',
    decimals: '1e18',
    liquidityProviderFee: SOLAR_LPF,
    log: true,
  });

module.exports = { getSolarApys };
