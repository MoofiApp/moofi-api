'use strict';

import BigNumber from 'bignumber.js';

import getFarmWithTradingFeesApy from '../../../utils/getFarmWithTradingFeesApy';
import { compound } from '../../../utils/compound';

import { BASE_HPY, MOOFI_PERFORMANCE_FEE, SHARE_AFTER_PERFORMANCE_FEE } from '../../../constants';

export interface ApyBreakdown {
  vaultApr?: number;
  compoundingsPerYear?: number;
  moofiPerformanceFee?: number;
  vaultApy?: number;
  lpFee?: number;
  tradingApr?: number;
  totalApy?: number;
}

export interface ApyBreakdownResult {
  apys: Record<string, number>;
  apyBreakdowns: Record<string, ApyBreakdown>;
}

export default function (
  pools: { name: string; address: string }[],
  tradingAprs: Record<string, BigNumber>,
  farmAprs: BigNumber[],
  providerFee: number,
  performanceFee: number = MOOFI_PERFORMANCE_FEE
): ApyBreakdownResult {
  const result: ApyBreakdownResult = {
    apys: {},
    apyBreakdowns: {},
  };

  pools.forEach((pool, i) => {
    const simpleApr = farmAprs[i]?.toNumber();
    if (simpleApr === -1) {
      return;
    }
    const vaultApr = simpleApr * SHARE_AFTER_PERFORMANCE_FEE;
    const vaultApy = compound(simpleApr, BASE_HPY, 1, SHARE_AFTER_PERFORMANCE_FEE);
    const tradingApr = tradingAprs[pool.address.toLowerCase()]?.toNumber();
    const totalApy = getFarmWithTradingFeesApy(
      simpleApr,
      tradingApr,
      BASE_HPY,
      1,
      SHARE_AFTER_PERFORMANCE_FEE
    );

    // Add token to APYs object
    result.apys[pool.name] = totalApy;
    result.apyBreakdowns[pool.name] = {
      vaultApr: vaultApr,
      compoundingsPerYear: BASE_HPY,
      moofiPerformanceFee: performanceFee,
      vaultApy: vaultApy,
      lpFee: providerFee,
      tradingApr: tradingApr,
      totalApy: totalApy,
    };
  });

  return result;
}
