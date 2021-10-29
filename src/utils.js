import constants from './constants.js';

function getJwtToken(authorizationHeader) {
  return authorizationHeader.split(' ')[1];
}

function getEquityTypeFromBaseUrl(baseUrl) {
  return baseUrl === '/stocks' ? constants.EQUITY_TYPES.STOCK : constants.EQUITY_TYPES.ETF;
}

export default { getJwtToken, getEquityTypeFromBaseUrl };
