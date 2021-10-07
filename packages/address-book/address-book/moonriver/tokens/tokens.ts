import { ConstRecord } from '../../../types/const';
import Token from '../../../types/token';

const MOVR = {
  chainId: 43114,
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
    address: '0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d',
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
    address: '0x80a16016cc4a2e6a2caca8a4a498b1699ff0f844',
    chainId: 1285,
    decimals: 18,
    website: 'https://makerdao.com/en/',
    description:
      'DAI is an Ethereum-based stablecoin (stable-price cryptocurrency) whose issuance and development is managed by the Maker Protocol and the MakerDAO decentralized autonomous organization.',
    logoURI:
      'https://exchange.pancakeswap.finance/images/coins/0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3.png',
  },
  MOVR,
  WAVAX: MOVR,
  WNATIVE: MOVR,
  ETH: {
    chainId: 1285,
    address: '0x639a647fbe20b6c8ac19e48e2de44ea792c62c5c',
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
    website: 'https://ethereum.org/',
    description:
      'The native currency that flows within the Ethereum economy is called Ether (ETH). Ether is typically used to pay for transaction fees called Gas, and it is the base currency of the network.',
    logoURI:
      'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15/logo.png',
  },
} as const;

export const tokens: ConstRecord<typeof _tokens, Token> = _tokens;
