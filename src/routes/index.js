import express from 'express';

import authRoute from './auth.route.js';

const router = express.Router();

router.get('/status', (req, res) => res.send("OK, We're up and running!"));

router.use('/auth', authRoute);

export default router;
