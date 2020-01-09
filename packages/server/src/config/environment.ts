import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env' : `.env.${process.env.NODE_ENV}`,
});

const config = {
  THE_MOVIE_DB_API_KEY: process.env.THE_MOVIE_DB_API_KEY,
  NEWS_API_KEY: process.env.NEWS_API_KEY,
  PORT: process.env.PORT,
};

export default config;
