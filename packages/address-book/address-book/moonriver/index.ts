import { mofi } from './platforms/mofi';
import { moonfarm } from './platforms/moonfarm';
import { solar } from './platforms/solar';
import { neku } from './platforms/neku';
import { huckleberry } from './platforms/huckleberry';
import Chain from '../../types/chain';
import { ConstInterface } from '../../types/const';
import { tokens } from './tokens/tokens';
import { convertSymbolTokenMapToAddressTokenMap } from '../../util/convertSymbolTokenMapToAddressTokenMap';

const _moonriver = {
  platforms: {
    mofi,
    moonfarm,
    solar,
    neku,
    huckleberry,
  },
  tokens,
  tokenAddressMap: convertSymbolTokenMapToAddressTokenMap(tokens),
} as const;

export const moonriver: ConstInterface<typeof _moonriver, Chain> = _moonriver;
