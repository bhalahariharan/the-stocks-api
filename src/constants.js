const REGEX = {
  NUMBERS: /^\d+$/,
};

const EQUITY_TYPES = {
  STOCK: 'STOCK',
  ETF: 'ETF',
};

const STOCK_ETF_DURATIONS = ['1D', '1M', '1Y', '3Y', '5Y'];
const STOCK_ETF_DURATIONS_IN_MS = {
  '1D': 86400000,
  '1M': 2629800000,
  '1Y': 31557600000,
  '3Y': 94672800000,
  '5Y': 157788000000,
};
const WHITELISTED_URLS = ['http://localhost:3000', 'https://the-stocks.surge.sh'];

export default {
  REGEX,
  EQUITY_TYPES,
  STOCK_ETF_DURATIONS,
  STOCK_ETF_DURATIONS_IN_MS,
  WHITELISTED_URLS,
};
