import express from 'express';

import authMiddleware from '../middlewares/auth.js';
import usersController from '../controllers/users.controller.js';

const router = express.Router();

router.get('/current', authMiddleware.authenticateToken, usersController.getCurrentUser);

export default router;
