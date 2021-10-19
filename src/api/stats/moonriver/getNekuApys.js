const { getMasterChefApys } = require('../common/getMasterChefApys');
import { moonriverWeb3 } from '../../../utils/web3';
import { SOLAR_LPF, MOONRIVER_CHAIN_ID } from '../../../constants';

const MasterChefAbi = require('../../../abis/MasterChef.json');
const CTokenAbi = require('../../../abis/CToken.json');
const singlePools = require('../../../data/moonriver/nekuPools.json');
const { neku } = require('../../../../packages/address-book/address-book/moonriver/platforms/neku');

const getNekuApys = async () =>
  await getMasterChefApys({
    web3: moonriverWeb3,
    chainId: MOONRIVER_CHAIN_ID,
    masterchef: neku.masterchef,
    tokenPerBlock: 'orePerBlock',
    hasMultiplier: true,
    singlePools,
    cTokenAbi: CTokenAbi,
    oracleId: 'NEKU',
    oracle: 'tokens',
    decimals: '1e18',
    liquidityProviderFee: SOLAR_LPF,
    log: true,
  });

module.exports = { getNekuApys };
