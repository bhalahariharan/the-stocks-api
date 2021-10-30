import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import config, { getDbUrl } from './config/config.js';
import constants from './constants.js';
import routes from './routes/index.js';

const app = express();

mongoose.connect(getDbUrl()).then(() => {
  console.log(`ENV: ${process.env.NODE_ENV || 'development'}`);
  console.log('Connected to Database');
  app.listen(config.port, () => {
    console.log(`App listening at http://localhost:${config.port}`);
  });
});

app.use(
  cors({
    origin: function (origin, callback) {
      if (constants.WHITELISTED_URLS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);
app.use(express.json());

app.use(routes);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  return res.status(500).send({ message: 'Something went wrong' });
});
