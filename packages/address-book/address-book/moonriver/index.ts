import { mofi } from './platforms/mofi';
import { moonfarm } from './platforms/moonfarm';
import Chain from '../../types/chain';
import { ConstInterface } from '../../types/const';
import { tokens } from './tokens/tokens';
import { convertSymbolTokenMapToAddressTokenMap } from '../../util/convertSymbolTokenMapToAddressTokenMap';

const _moonriver = {
  platforms: {
    mofi,
    moonfarm,
  },
  tokens,
  tokenAddressMap: convertSymbolTokenMapToAddressTokenMap(tokens),
} as const;

export const moonriver: ConstInterface<typeof _moonriver, Chain> = _moonriver;
