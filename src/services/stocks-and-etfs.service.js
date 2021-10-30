import Company from '../models/company.model.js';
import Stock from '../models/stock.model.js';
import Etf from '../models/etf.model.js';
import constants from '../constants.js';

async function findCompaniesByEquityType({ equityType, page, pageSize }) {
  const query = { equityType };
  const [count, data] = await Promise.all([
    Company.count(query),
    Company.find(query)
      .sort({ name: 1 })
      .skip(page * pageSize)
      .limit(pageSize),
  ]);

  return { count, data };
}

async function findCompany({ symbol, equityType }) {
  const query = { symbol, equityType };
  const company = await Company.findOne(query);
  return company;
}

async function findStockData({ equityType, symbol, duration }) {
  const durationInMs = constants.STOCK_ETF_DURATIONS_IN_MS[duration];
  const model = equityType === constants.EQUITY_TYPES.STOCK ? Stock : Etf;

  const stockData = await model.aggregate([
    { $match: { symbol } },
    { $sort: { date: -1 } },
    { $project: { close: '$adjClose', date: 1 } },
    {
      $group: {
        _id: null,
        data: { $push: '$$ROOT' },
        firstDate: { $first: '$$ROOT.date' },
      },
    },
    {
      $project: {
        _id: 0,
        data: 1,
        date: { $subtract: ['$firstDate', durationInMs] },
      },
    },
    {
      $project: {
        data: {
          $filter: {
            input: '$data',
            cond: {
              $gt: ['$$this.date', '$date'],
            },
          },
        },
      },
    },
  ]);

  if (!stockData.length) return [];

  return stockData[0].data.map((d) => {
    delete d._id;
    return [d.date, d.close];
  });
}

function calculateReturns(stockData) {
  if (stockData.length === 0 || stockData.length === 1)
    return { changeInValue: 0, changeInPercentage: 0 };

  const [, close] = stockData[0];
  const [, prevClose] = stockData[stockData.length - 1];

  return {
    changeInValue: close - prevClose,
    changeInPercentage: calculateChangeInPercentage(prevClose, close),
  };
}

function calculateChangeInPercentage(prevClose, close) {
  const value = ((close - prevClose) / prevClose) * 100;
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function getCurrentPrice(stockData) {
  if (stockData.length === 0) return null;
  return stockData[0][1];
}

function getMean(data) {
  return data.reduce((acc, value) => acc + value, 0) / data.length;
}

function calculateStandardDeviation(stockData) {
  if (stockData.length === 0 || stockData.length === 1) return null;

  const returns = [];
  for (let i = 0; i < stockData.length; i++) {
    if (i === stockData.length - 1) {
      break;
    }
    const close = stockData[i][1];
    const prevClose = stockData[i + 1][1];
    returns.push(calculateChangeInPercentage(prevClose, close));
  }

  const mean = getMean(returns);
  const deviation = returns.map((value) => value - mean);
  const squaredDeviation = deviation.map((value) => value * value);
  const squaredDeviationMean = getMean(squaredDeviation);

  return Math.round((Math.sqrt(squaredDeviationMean) + Number.EPSILON) * 100) / 100;
}

export default {
  findCompaniesByEquityType,
  findCompany,
  findStockData,
  getCurrentPrice,
  calculateReturns,
  calculateStandardDeviation,
};
