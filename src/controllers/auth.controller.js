import { validationResult } from 'express-validator';

import authService from '../services/auth.service.js';

async function login(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    return res.json({ accessToken: authService.generateAccessToken() });
  } catch (error) {
    return next(error);
  }
}

export default { login };
