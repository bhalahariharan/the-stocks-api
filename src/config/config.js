const config = {
  port: 3001,
  dbUrl: {
    local: 'mongodb://localhost:27017/the-stocks?retryWrites=true&w=majority',
    prod: 'mongodb+srv://readOnly:8tB0HC4UWwfWf9wo@the-stocks.zqgao.mongodb.net/the-stocks?retryWrites=true&w=majority',
  },
};

export function getDbUrl() {
  return process.env.NODE_ENV === 'production' ? config.dbUrl.prod : config.dbUrl.local;
}

export default config;
