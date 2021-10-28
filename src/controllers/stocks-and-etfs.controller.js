import { validationResult } from 'express-validator';

import stocksAndEtfService from '../services/stocks-and-etfs.service.js';
import constants from '../constants.js';

async function getAllStocks(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const page = Number(req.query.page) || 0;
    const pageSize = Number(req.query.pageSize) || 0;
    const { count, data } = await stocksAndEtfService.getCompaniesByEquityType({
      equityType: constants.EQUITY_TYPES.STOCK,
      page,
      pageSize,
    });
    return res.json({ content: data, totalElements: count });
  } catch (error) {
    next(error);
  }
}

async function getAllEtfs(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const page = Number(req.query.page) || 0;
    const pageSize = Number(req.query.pageSize) || 0;
    const { count, data } = await stocksAndEtfService.getCompaniesByEquityType({
      equityType: constants.EQUITY_TYPES.ETF,
      page,
      pageSize,
    });
    return res.json({ content: data, totalElements: count });
  } catch (error) {
    next(error);
  }
}

export default { getAllStocks, getAllEtfs };
