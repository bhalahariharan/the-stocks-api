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
  stocksAndEtfsController.getAllEtfs
);

export default router;
