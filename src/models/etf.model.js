import mongoose from 'mongoose';

const etfSchema = new mongoose.Schema({
  symbol: {
    type: String,
    uppercase: true,
  },
  date: Date,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  adjClose: Number,
  volume: Number,
});

const Etf = mongoose.model('Etf', etfSchema);

export default Etf;
