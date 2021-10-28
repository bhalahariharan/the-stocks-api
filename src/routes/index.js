import express from 'express';

import authRoute from './auth.route.js';
import usersRoute from './users.route.js';

const router = express.Router();

router.get('/status', (req, res) => res.send("OK, We're up and running!"));

router.use('/auth', authRoute);
router.use('/users', usersRoute);

export default router;
