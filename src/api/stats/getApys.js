const { getMoonriverApys } = require('./moonriver');
import { ENV } from '../../constants';

const INIT_DELAY = ENV === 'development' ? 0 : 1 * 60 * 1000;
const REFRESH_INTERVAL = ENV === 'development' ? 10 * 1000 : 15 * 60 * 1000;

let apys = {};
let apyBreakdowns = {};

const getApys = () => {
  return {
    apys,
    apyBreakdowns,
  };
};

const updateApys = async () => {
  console.log('> updating apys');

  try {
    const results = await Promise.allSettled([getMoonriverApys()]);

    for (const result of results) {
      if (result.status !== 'fulfilled') {
        console.warn('getApys error', result.reason);
        continue;
      }

      // Set default APY values
      let mappedApyValues = result.value;
      let mappedApyBreakdownValues = {};

      // Loop through key values and move default breakdown format
      // To require totalApy key
      for (const [key, value] of Object.entries(result.value)) {
        mappedApyBreakdownValues[key] = {
          totalApy: value,
        };
      }

      // Break out to apy and breakdowns if possible
      let hasApyBreakdowns = 'apyBreakdowns' in result.value;
      if (hasApyBreakdowns) {
        mappedApyValues = result.value.apys;
        mappedApyBreakdownValues = result.value.apyBreakdowns;
      }

      apys = { ...apys, ...mappedApyValues };

      apyBreakdowns = { ...apyBreakdowns, ...mappedApyBreakdownValues };
    }

    console.log('> updated apys');
  } catch (err) {
    console.error('> apy initialization failed', err);
  }

  setTimeout(updateApys, REFRESH_INTERVAL);
};

setTimeout(updateApys, INIT_DELAY);

module.exports = { getApys };
