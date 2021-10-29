import express from 'express';
import { query } from 'express-validator';

import authMiddleware from '../middlewares/auth.js';
import stocksAndEtfsController from '../controllers/stocks-and-etfs.controller.js';
import constants from '../constants.js';

const router = express.Router();

router.get(
  '/',
  authMiddleware.authenticateToken,
  query('page')
    .optional()
    .matches(constants.REGEX.NUMBERS)
    .withMessage('page should contain only numbers'),
  query('pageSize')
    .optional()
    .matches(constants.REGEX.NUMBERS)
    .withMessage('pageSize should contain only numbers'),
  stocksAndEtfsController.getCompanies
);

router.get(
  '/:symbol',
  authMiddleware.authenticateToken,
  query('duration')
    .optional()
    .isIn(constants.STOCK_ETF_DURATIONS)
    .withMessage(`duration should be one of ${constants.STOCK_ETF_DURATIONS.join(', ')}`),
  stocksAndEtfsController.getStockEtfData
);

export default router;
