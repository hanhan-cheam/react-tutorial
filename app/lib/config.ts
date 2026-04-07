export const TRADING_CONFIG = {
  // Account settings
  ACCOUNT_SIZE: 16000, // USD - change this anytime
  RISK_PERCENT: 1, // 1% risk per trade

  // Formula settings
  MIN_RRR: 2.5, // minimum reward:risk ratio
  ATR_STOP_MULTIPLIER: 1.5, // stop loss = entry - (1.5 × ATR)

  // Scanner settings
  MIN_PRICE: 10,
  MAX_PRICE: 500,
  MIN_VOLUME: 3_000_000,
  MIN_ATR_PERCENT: 2.0,
  MAX_ATR_PERCENT: 4.0,
  MIN_ATR_DOLLAR: 1.5,
  EMA_SEPARATION_PERCENT: 1,
} as const;
