import { ChainId } from '../../packages/address-book/address-book';

export interface LpPool {
  name: string;
  farmType?: string;
  platform?: string;
  rewardPool?: string;
  address: string;
  cAddress?: string;
  strat?: string;
  decimals: string;
  poolId?: number;
  chainId: ChainId;
  lp0: LpToken;
  lp1: LpToken;
  oracle?: string;
  oracleId?: string;
  platformFee?: number;
}

export interface SingleAssetPool {
  name: string;
  farmType?: string;
  poolId?: number;
  address: string;
  cAddress?: string;
  strat?: string;
  oracle?: string;
  oracleId?: string;
  decimals: string;
  chainId: ChainId;
  platformFee?: number;
}

export interface LpToken {
  address: string;
  oracle: string;
  oracleId: string;
  decimals: string;
}
