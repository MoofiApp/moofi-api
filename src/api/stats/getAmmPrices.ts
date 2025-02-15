`use strict`;

import { fetchAmmPrices } from '../../utils/fetchAmmPrices';

import getNonAmmPrices from './getNonAmmPrices';
import moonfarmPools from '../../data/moonriver/moonfarmLpPools.json';
import solarPools from '../../data/moonriver/solarLpPools.json';
import huckleberryPools from '../../data/moonriver/huckleberryLpPools.json';
import { ENV } from '../../constants';

const INIT_DELAY = ENV === 'development' ? 0 : 1 * 60 * 1000;
const REFRESH_INTERVAL = ENV === 'development' ? 10 * 1000 : 5 * 60 * 1000;

const pools = [...moonfarmPools, ...solarPools, ...huckleberryPools];

const knownPrices = {
  BUSD: 1,
  USDT: 1,
  HUSD: 1,
  DAI: 1,
  USDC: 1,
  UST: 1,
  USDN: 1,
  'USDC.m': 1,
  'USDT.m': 1,
};

let tokenPricesCache: Promise<any>;
let lpPricesCache: Promise<any>;

const updateAmmPrices = async () => {
  console.log('> updating amm prices');
  try {
    const ammPrices = fetchAmmPrices(pools, knownPrices);

    const tokenPrices = ammPrices.then(({ _, tokenPrices }) => tokenPrices);

    const lpPrices = ammPrices.then(async ({ poolPrices, tokenPrices }) => {
      const nonAmmPrices = await getNonAmmPrices(tokenPrices);
      return { ...poolPrices, ...nonAmmPrices };
    });

    await tokenPrices;
    await lpPrices;

    tokenPricesCache = tokenPrices;
    lpPricesCache = lpPrices;

    return {
      tokenPrices,
      lpPrices,
    };
  } catch (err) {
    console.error(err);
  } finally {
    setTimeout(updateAmmPrices, REFRESH_INTERVAL);
    console.log('> updated amm prices');
  }
};

export const getAmmTokensPrices = async () => {
  return await tokenPricesCache;
};

export const getAmmLpPrices = async () => {
  return await lpPricesCache;
};

export const getAmmTokenPrice = async tokenSymbol => {
  const tokenPrices = await getAmmTokensPrices();
  if (tokenPrices.hasOwnProperty(tokenSymbol)) {
    return tokenPrices[tokenSymbol];
  }
  console.error(`Unknown token '${tokenSymbol}'. Consider adding it to .json file`);
};

export const getAmmLpPrice = async lpName => {
  const lpPrices = await getAmmLpPrices();
  if (lpPrices.hasOwnProperty(lpName)) {
    return lpPrices[lpName];
  }
  console.error(`Unknown liqudity pair '${lpName}'. Consider adding it to .json file`);
};

const init =
  // Flexible delayed initialization used to work around ratelimits
  new Promise((resolve, reject) => {
    setTimeout(resolve, INIT_DELAY);
  }).then(updateAmmPrices);

tokenPricesCache = init.then(({ tokenPrices, lpPrices }) => tokenPrices);
lpPricesCache = init.then(({ tokenPrices, lpPrices }) => lpPrices);
