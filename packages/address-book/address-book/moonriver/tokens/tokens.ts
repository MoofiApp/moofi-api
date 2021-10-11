import { ConstRecord } from '../../../types/const';
import Token from '../../../types/token';

const MOVR = {
  chainId: 1285,
  address: '0x98878B06940aE243284CA214f92Bb71a2b032B8A',
  decimals: 18,
  name: 'Wrapped MOVR',
  symbol: 'WMOVR',
  logoURI:
    'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png',
} as const;

const _tokens = {
  USDC: {
    name: 'USD Coin',
    address: '0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D',
    symbol: 'USDC',
    decimals: 6,
    website: 'https://www.circle.com/usdc',
    description:
      'USDC is a fully collateralized US dollar stablecoin. USDC is issued by regulated financial institutions, backed by fully reserved assets, redeemable on a 1:1 basis for US dollars.',
    chainId: 1285,
    logoURI: 'https://ftmscan.com/token/images/USDC_32.png',
  },
  DAI: {
    name: 'Dai Token',
    symbol: 'DAI',
    address: '0x80A16016cC4A2E6a2CACA8a4a498b1699fF0f844',
    chainId: 1285,
    decimals: 18,
    website: 'https://makerdao.com/en/',
    description:
      'DAI is an Ethereum-based stablecoin (stable-price cryptocurrency) whose issuance and development is managed by the Maker Protocol and the MakerDAO decentralized autonomous organization.',
    logoURI:
      'https://exchange.pancakeswap.finance/images/coins/0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3.png',
  },
  MOVR,
  WMOVR: MOVR,
  WNATIVE: MOVR,
  ETH: {
    chainId: 1285,
    address: '0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C',
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
    website: 'https://ethereum.org/',
    description:
      'The native currency that flows within the Ethereum economy is called Ether (ETH). Ether is typically used to pay for transaction fees called Gas, and it is the base currency of the network.',
    logoURI:
      'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15/logo.png',
  },
  MOON: {
    chainId: 1285,
    address: '0xB497c3E9D27Ba6b1fea9F1b941d8C79E66cfC9d6',
    decimals: 18,
    name: 'MoonFarm Token',
    symbol: 'MOON',
    website: 'https://app.moonfarm.in/',
    description: 'Moonfarm farm',
    logoURI:
      'https://raw.githubusercontent.com/moonfarmin/moonfarm-contracts-v2/master/images/moonfarm.png',
  },
  USDT: {
    name: 'Tether USD',
    address: '0xB44a9B6905aF7c801311e8F4E76932ee959c663C',
    symbol: 'USDT',
    decimals: 6,
    website: 'https://tether.to/',
    description:
      'Tether is a stablecoin pegged to the US Dollar. A stablecoin is a type of cryptocurrency whose value is pegged to another fiat currency like the US Dollar or to a commodity like Gold.',
    chainId: 1285,
    logoURI:
      'https://pancakeswap.finance/images/tokens/0x55d398326f99059ff775485246999027b3197955.png',
  },
  BUSD: {
    name: 'BUSD Token',
    symbol: 'BUSD',
    address: '0x5D9ab5522c64E1F6ef5e3627ECCc093f56167818',
    chainId: 1285,
    decimals: 18,
    website: 'https://www.binance.com/en/busd',
    description:
      'Binance USD (BUSD) is a 1:1 USD-backed stable coin issued by Binance (in partnership with Paxos), Approved and regulated by the New York State Department of Financial Services (NYDFS), The BUSD Monthly Audit Report can be viewed from the official website.',
    logoURI:
      'https://pancakeswap.finance/images/tokens/0xe9e7cea3dedca5984780bafc599bd69add087d56.png',
  },
  mSWAP: {
    name: 'BUSD Token',
    symbol: 'MoonSwap Token',
    address: '0xB3FB48bF090bEDFF4f6F93FFb40221742E107db7',
    chainId: 1285,
    decimals: 18,
    website: 'https://swap.moonswap.in/',
    description: '',
    logoURI:
      'https://raw.githubusercontent.com/moonfarmin/moonfarm-contracts-v2/master/images/moonswap.png',
  },
} as const;

export const tokens: ConstRecord<typeof _tokens, Token> = _tokens;
