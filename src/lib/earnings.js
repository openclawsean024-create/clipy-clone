// 純函數: 觀看數 → 獎金 (依 TIERS)
// 跟 data.js 的 TIERS 一致 — 用 import.meta.env 處理 base 前綴路徑

import { TIERS } from '../data';

/**
 * 根據觀看數計算獎金
 * @param {number} views - 影片觀看數 (>= 0)
 * @returns {number} - 美元獎金
 */
export function calcEarnings(views) {
  if (!views || views <= 0) return 0;
  // 找最高達標的 tier
  let payout = 0;
  for (const tier of TIERS) {
    if (views >= tier.views) {
      payout = tier.payout; // 取最後（最高）達標的 tier
    }
  }
  return payout;
}

/**
 * 計算下一階還差多少觀看 + 升階後可拿多少
 * @param {number} views
 * @returns {{ nextTier: object|null, viewsToNext: number, nextPayout: number }}
 */
export function nextTier(views) {
  for (const tier of TIERS) {
    if (views < tier.views) {
      return {
        nextTier: tier,
        viewsToNext: tier.views - views,
        nextPayout: tier.payout,
      };
    }
  }
  return { nextTier: null, viewsToNext: 0, nextPayout: 0 }; // 已到頂
}

/**
 * 找出目前所在階
 */
export function currentTier(views) {
  let current = null;
  for (const tier of TIERS) {
    if (views >= tier.views) {
      current = tier;
    }
  }
  return current;
}

/**
 * 觀看數 → 階梯標籤 (10K / 100K / 等等)
 */
export function tierLabel(views) {
  const t = currentTier(views);
  return t ? t.label : '<10K';
}

/**
 * 格式化千分位
 */
export function fmtViews(n) {
  return Math.round(n).toLocaleString('en-US');
}

/**
 * 計算每萬觀看的效率
 */
export function earningsPer10k(views) {
  return (calcEarnings(views) / views) * 10000;
}
