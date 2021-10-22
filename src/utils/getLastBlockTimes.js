const { web3Factory } = require('./web3');

const updateDelay = 2900000;

let cache = {};
const getLastBlockTimes = async chainId => {
  const cacheKey = Math.floor(Date.now() / updateDelay);

  if (cache[chainId]?.hasOwnProperty(cacheKey)) {
    return cache[chainId][cacheKey];
  }

  const web3 = web3Factory(chainId);

  const currentBlock = await web3.eth.getBlock('latest');
  const fromBlock = await web3.eth.getBlock(currentBlock.number - 1);

  const result = { last: fromBlock.timestamp, current: currentBlock.timestamp };

  cache[chainId] = {
    [cacheKey]: result,
  };
  return result;
};

module.exports = getLastBlockTimes;
