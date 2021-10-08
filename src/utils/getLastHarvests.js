const { ethers } = require('ethers');
const { MULTICHAIN_RPC } = require('../constants');
import { ChainId } from '../../packages/address-book/address-book';

const MULTICALLS = {
  moonriver: '0xc0AF4260348314b609Cca9c9E7652E8B745ddDa1',
};
const MulticallAbi = require('../abis/MofiLastHarvestMulticall.json');
const BATCH_SIZE = 128;

const getLastHarvests = async (vaults, chain) => {
  // Setup multichain
  const provider = new ethers.providers.JsonRpcProvider(MULTICHAIN_RPC[ChainId[chain]]);
  const multicall = new ethers.Contract(MULTICALLS[chain], MulticallAbi, provider);

  // Split query in batches
  const query = vaults.map(v => v.strategy);
  for (let i = 0; i < vaults.length; i += BATCH_SIZE) {
    let batch = query.slice(i, i + BATCH_SIZE);
    const buf = await multicall.getLastHarvests(batch);

    // Merge fetched data
    for (let j = 0; j < batch.length; j++) {
      vaults[j + i].lastHarvest = buf[j].toNumber();
    }
  }

  return vaults;
};

module.exports = { getLastHarvests };
