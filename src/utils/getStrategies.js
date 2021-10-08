const { ethers } = require('ethers');
const { MULTICHAIN_RPC } = require('../constants');
import { ChainId } from '../../packages/address-book/address-book';

const MULTICALLS = {
  moonriver: '0x1CC39296758207aA4fCF18F5AFADA42deA548BF7',
};
const BATCH_SIZE = 128;

const MulticallAbi = require('../abis/MofiStrategyMulticall.json');

const getStrategies = async (vaults, chain) => {
  // Setup multichain
  const provider = new ethers.providers.JsonRpcProvider(MULTICHAIN_RPC[ChainId[chain]]);
  const multicall = new ethers.Contract(MULTICALLS[chain], MulticallAbi, provider);

  // Split query in batches
  const query = vaults.map(v => v.earnedTokenAddress);
  for (let i = 0; i < vaults.length; i += BATCH_SIZE) {
    let batch = query.slice(i, i + BATCH_SIZE);
    const buf = await multicall.getStrategy(batch);

    // Merge fetched data
    for (let j = 0; j < batch.length; j++) {
      vaults[j + i].strategy = buf[j];
    }
  }

  return vaults;
};

module.exports = { getStrategies };
