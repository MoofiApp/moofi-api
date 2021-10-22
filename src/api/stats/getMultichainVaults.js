const getVaults = require('../../utils/getVaults.js');
const { getStrategies } = require('../../utils/getStrategies.js');
const { getLastHarvests } = require('../../utils/getLastHarvests.js');

const { MULTICHAIN_ENDPOINTS, ENV } = require('../../constants');

const INIT_DELAY = ENV === 'development' ? 0 : 1 * 60 * 1000;
const REFRESH_INTERVAL = ENV === 'development' ? 60 * 1000 : 5 * 60 * 1000;

let multichainVaults = [];
var multichainVaultsCounter = 0;
var multichainActiveVaultsCounter = 0;

const getMultichainVaults = () => {
  return multichainVaults;
};

const updateMultichainVaults = async () => {
  console.log('> updating vaults');

  // Reset entire list and counters
  _multichainVaults = [];
  _multichainVaultsCounter = 0;
  _multichainActiveVaultsCounter = 0;

  try {
    for (let chain in MULTICHAIN_ENDPOINTS) {
      let endpoint = MULTICHAIN_ENDPOINTS[chain];
      let chainVaults = await getVaults(endpoint);
      chainVaults = await getStrategies(chainVaults, chain);
      chainVaults = await getLastHarvests(chainVaults, chain);

      var chainVaultsCounter = 0;
      var chainActiveVaultsCounter = 0;

      for (let vault in chainVaults) {
        chainVaults[vault].chain = chain;
        _multichainVaults.push(chainVaults[vault]);

        chainVaultsCounter += 1;
        _multichainVaultsCounter += 1;

        if (chainVaults[vault].status == 'active') {
          chainActiveVaultsCounter += 1;
          _multichainActiveVaultsCounter += 1;
        }
      }
    }

    console.log(
      '> updated',
      _multichainVaultsCounter,
      'vaults (',
      _multichainActiveVaultsCounter,
      'active )'
    );
    multichainVaults = _multichainVaults;
    multichainVaultsCounter = _multichainVaultsCounter;
    multichainActiveVaultsCounter = _multichainActiveVaultsCounter;
  } catch (err) {
    console.error('> vaults update failed', err);
  }

  setTimeout(updateMultichainVaults, REFRESH_INTERVAL);
};

setTimeout(updateMultichainVaults, INIT_DELAY);

module.exports = getMultichainVaults;
