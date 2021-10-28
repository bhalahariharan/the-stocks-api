import mongoose from 'mongoose';

import constants from '../constants.js';

const companySchema = new mongoose.Schema({
  name: String,
  symbol: {
    type: String,
    uppercase: true,
  },
  equityType: {
    type: String,
    enum: [constants.EQUITY_TYPES.STOCK, constants.EQUITY_TYPES.ETF],
  },
});

const Company = mongoose.model('Company', companySchema);

export default Company;
