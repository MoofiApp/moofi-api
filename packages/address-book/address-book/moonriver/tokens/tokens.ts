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
    name: 'MoonSwap Token',
    symbol: 'mSWAP',
    address: '0xB3FB48bF090bEDFF4f6F93FFb40221742E107db7',
    chainId: 1285,
    decimals: 18,
    website: 'https://swap.moonswap.in/',
    description: '',
    logoURI:
      'https://raw.githubusercontent.com/moonfarmin/moonfarm-contracts-v2/master/images/moonswap.png',
  },
  SOLAR: {
    name: 'SOLAR',
    symbol: 'SolarBeam Token',
    address: '0x6bD193Ee6D2104F14F94E2cA6efefae561A4334B',
    chainId: 1285,
    decimals: 18,
    website: 'https://solarbeam.io',
    description: '',
    logoURI: 'https://solarbeam.io/nextimg/%2Fimages%2Ftokens%2Fsolar.png',
  },
  WBTC: {
    name: 'Wrapped BTC',
    symbol: 'WBTC',
    address: '0x6aB6d61428fde76768D7b45D8BFeec19c6eF91A8',
    chainId: 1285,
    decimals: 8,
    logoURI:
      'https://solarbeam.io/nextimg/https%3A%2F%2Fsolarbeam.io%2Fimages%2Ftokens%2Fwbtc.png/32/50?url=https%3A%2F%2Fsolarbeam.io%2Fimages%2Ftokens%2Fwbtc.png&w=32&q=50',
    website: 'https://bitcoin.org/en/',
    description: '',
  },
  miMatic: {
    name: 'MAI',
    symbol: 'miMatic',
    address: '0x7f5a79576620C046a293F54FFCdbd8f2468174F1',
    chainId: 1285,
    decimals: 18,
    logoURI:
      'https://solarbeam.io/nextimg/https%3A%2F%2Fsolarbeam.io%2Fimages%2Ftokens%2Fmimatic.png/32/50?url=https%3A%2F%2Fsolarbeam.io%2Fimages%2Ftokens%2Fmimatic.png&w=32&q=50',
    website: '',
    description: '',
  },
  NEKU: {
    name: 'Neku Finance',
    symbol: 'NEKU',
    address: '0x3Bf0880fd26E49c46d1A1e69ADb268889B4be840',
    chainId: 1285,
    decimals: 18,
    logoURI:
      'https://app.solarbeam.io/nextimg/https%3A%2F%2Fraw.githubusercontent.com%2Fsolarbeamio%2Fassets%2Fmaster%2Fblockchains%2Fmoonriver%2Fassets%2F0x3Bf0880fd26E49c46d1A1e69ADb268889B4be840%2Flogo.png/48/50?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolarbeamio%2Fassets%2Fmaster%2Fblockchains%2Fmoonriver%2Fassets%2F0x3Bf0880fd26E49c46d1A1e69ADb268889B4be840%2Flogo.png&w=48&q=50',
    website: '',
    description: '',
  },
  'USDC.m': {
    name: 'USDC@moonriver',
    symbol: 'USDC.m',
    address: '0x748134b5F553F2bcBD78c6826De99a70274bDEb3',
    chainId: 1285,
    decimals: 6,
    logoURI: 'https://token-icons.vercel.app/icon/others/wanUSDC.png',
    website: '',
    description: '',
  },
  'USDT.m': {
    name: 'USDT@moonriver',
    symbol: 'USDT.m',
    address: '0xE936CAA7f6d9F5C9e907111FCAf7c351c184CDA7',
    chainId: 1285,
    decimals: 6,
    logoURI: 'https://token-icons.vercel.app/icon/others/wanUSDT.png',
    website: '',
    description: '',
  },
  FINN: {
    name: 'FINN Token',
    symbol: 'FINN',
    address: '0x9A92B5EBf1F6F6f7d93696FCD44e5Cf75035A756',
    chainId: 1285,
    decimals: 18,
    logoURI: 'https://www.huckleberry.finance/static/media/02.edc46c96.png',
    website: '',
    description: '',
  },
} as const;

export const tokens: ConstRecord<typeof _tokens, Token> = _tokens;
