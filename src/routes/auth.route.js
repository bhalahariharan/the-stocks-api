import express from 'express';
import { body } from 'express-validator';

import authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post(
  '/login',
  body('pin').isString().withMessage('PIN should be a string'),
  body('pin').isLength({ min: 4, max: 4 }).withMessage('PIN should be 4 characters long'),
  body('pin').matches(/^\d+$/).withMessage('PIN should contain only digits'),
  body('pin').isIn(['1234', '5678']).withMessage('Invalid PIN'),
  authController.login
);

export default router;
