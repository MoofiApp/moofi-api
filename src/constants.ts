import { ChainId } from '../packages/address-book/address-book';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

type Environment = 'development' | 'prodution';

const ENV: Environment = process.env.NODE_ENV as Environment;

const BASE_HPY = 2190;
const MINUTELY_HPY = 525600;
const HOURLY_HPY = 8760;
const DAILY_HPY = 365;
const WEEKLY_HPY = 52;

const FORTUBE_REQ_TOKENS = 'https://bsc.for.tube/api/v2/bank_tokens';
const FORTUBE_REQ_MARKETS = 'https://bsc.for.tube/api/v1/bank/markets?mode=extended';
const FORTUBE_API_TOKEN = process.env.FORTUBE_API_TOKEN;

const MAINNET_BSC_RPC_ENDPOINTS = [
  'https://bsc-dataseed.binance.org',
  'https://bsc-dataseed1.defibit.io',
  'https://bsc-dataseed1.ninicoin.io',
  'https://bsc-dataseed2.defibit.io',
  'https://bsc-dataseed3.defibit.io',
  'https://bsc-dataseed4.defibit.io',
  'https://bsc-dataseed2.ninicoin.io',
  'https://bsc-dataseed3.ninicoin.io',
  'https://bsc-dataseed4.ninicoin.io',
  'https://bsc-dataseed1.binance.org',
  'https://bsc-dataseed2.binance.org',
  'https://bsc-dataseed3.binance.org',
  'https://bsc-dataseed4.binance.org',
];

const CUSTOM_BSC_RPC_ENDPOINTS = [process.env.BSC_RPC].filter(item => item);

const BSC_RPC_ENDPOINTS = CUSTOM_BSC_RPC_ENDPOINTS.length
  ? CUSTOM_BSC_RPC_ENDPOINTS
  : MAINNET_BSC_RPC_ENDPOINTS;

const BSC_RPC = BSC_RPC_ENDPOINTS[0];
const HECO_RPC = process.env.HECO_RPC || 'https://http-mainnet.hecochain.com';
const AVAX_RPC = process.env.AVAX_RPC || 'https://api.avax.network/ext/bc/C/rpc';
const POLYGON_RPC = process.env.POLYGON_RPC || 'https://rpc-mainnet.maticvigil.com/';
const FANTOM_RPC = process.env.FANTOM_RPC || 'https://rpc.ftm.tools';
const ONE_RPC = process.env.ONE_RPC || 'https://api.s0.t.hmny.io/';
const ARBITRUM_RPC = process.env.ARBITRUM_RPC || 'https://arb1.arbitrum.io/rpc';
const MOONRIVER_RPC = process.env.MOONRIVER_RPC || 'https://rpc.moonriver.moonbeam.network';

const MOONRIVER_CHAIN_ID = ChainId.moonriver;

const MOON_LPF = 0.003;
const SOLAR_LPF = 0.005;

const MULTICHAIN_RPC: Record<ChainId, string> = {
  [ChainId.moonriver]: MOONRIVER_RPC,
};

const MOONRIVER_VAULTS_ENDPOINT =
  'https://raw.githubusercontent.com/MoofiApp/moofi-app/master/src/features/configure/vault/moonriver_pools.js';

const MULTICHAIN_ENDPOINTS = {
  moonriver: MOONRIVER_VAULTS_ENDPOINT,
};

const MOOFI_PERFORMANCE_FEE = 0.02;
const SHARE_AFTER_PERFORMANCE_FEE = 1 - MOOFI_PERFORMANCE_FEE;

export {
  API_BASE_URL,
  BSC_RPC,
  BSC_RPC_ENDPOINTS,
  HECO_RPC,
  AVAX_RPC,
  POLYGON_RPC,
  FANTOM_RPC,
  ONE_RPC,
  ARBITRUM_RPC,
  MOONRIVER_RPC,
  MOONRIVER_CHAIN_ID,
  MOONRIVER_VAULTS_ENDPOINT,
  BASE_HPY,
  MINUTELY_HPY,
  HOURLY_HPY,
  DAILY_HPY,
  WEEKLY_HPY,
  FORTUBE_REQ_TOKENS,
  FORTUBE_REQ_MARKETS,
  FORTUBE_API_TOKEN,
  MULTICHAIN_RPC,
  MULTICHAIN_ENDPOINTS,
  MOON_LPF,
  SOLAR_LPF,
  MOOFI_PERFORMANCE_FEE,
  SHARE_AFTER_PERFORMANCE_FEE,
  ENV,
};
