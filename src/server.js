import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './config/config.js';

const app = express();

mongoose.connect(config.dbUrl).then(() => {
  console.log('Connected to Database');
  app.listen(config.port, () => {
    console.log(`App listening at http://localhost:${config.port}`);
  });
});

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use(function (err, req, res, next) {
  console.error(err.stack);
  return res.status(500).send({ message: 'Something went wrong' });
});
