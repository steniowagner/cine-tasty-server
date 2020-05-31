import TheMovieDBAPI from './the-movie-db-api';
import NewsAPI from './news-api';

export default {
  tmdb: new TheMovieDBAPI(),
  news: new NewsAPI(),
};
