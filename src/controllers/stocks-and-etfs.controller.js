import { validationResult } from 'express-validator';

import stocksAndEtfService from '../services/stocks-and-etfs.service.js';
import utils from '../utils.js';

async function getCompanies(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const equityType = utils.getEquityTypeFromBaseUrl(req.baseUrl);
    const page = Number(req.query.page) || 0;
    const pageSize = Number(req.query.pageSize) || 0;
    const { count, data } = await stocksAndEtfService.findCompaniesByEquityType({
      equityType,
      page,
      pageSize,
    });
    return res.json({ content: data, totalElements: count });
  } catch (error) {
    next(error);
  }
}

async function getStockEtfData(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const equityType = utils.getEquityTypeFromBaseUrl(req.baseUrl);
    const symbol = req.params.symbol;
    const duration = (req.query.duration || '1D').toUpperCase();

    const company = await stocksAndEtfService.findCompany({ equityType, symbol });
    if (!company) {
      return res.status(404).send({ message: 'Company not found' });
    }

    const stockData = await stocksAndEtfService.findStockData({ symbol, duration });
    const currentPrice = stocksAndEtfService.getCurrentPrice(stockData);
    const { changeInValue, changeInPercentage } = stocksAndEtfService.calculateReturns(stockData);
    const standardDeviation = stocksAndEtfService.calculateStandardDeviation(stockData);

    return res.json({
      company,
      currentPrice,
      changeInValue,
      changeInPercentage,
      standardDeviation,
      data: stockData,
    });
  } catch (error) {
    next(error);
  }
}

export default { getCompanies, getStockEtfData };
