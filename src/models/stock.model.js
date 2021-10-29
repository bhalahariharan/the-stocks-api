import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
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

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
