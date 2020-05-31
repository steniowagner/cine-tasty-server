import TheMovieDBAPI from './the-movie-db-api';
import NewsAPI from './news-api/NewsAPI';

export default {
  tmdb: new TheMovieDBAPI(),
  news: new NewsAPI(),
};
