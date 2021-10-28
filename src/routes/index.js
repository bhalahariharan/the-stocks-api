import express from 'express';

import authRoute from './auth.route.js';
import usersRoute from './users.route.js';
import stocksRoute from './stocks.route.js';
import etfsRoute from './etfs.route.js';

const router = express.Router();

router.get('/status', (req, res) => res.send("OK, We're up and running!"));

router.use('/auth', authRoute);
router.use('/users', usersRoute);
router.use('/stocks', stocksRoute);
router.use('/etfs', etfsRoute);

export default router;
