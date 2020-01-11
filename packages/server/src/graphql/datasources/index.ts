import TheMovieDBAPI, { ITheMovieDBAPI } from './the-movie-db-api';
import NewsAPI, { INewsAPI } from './news-api';

export interface Datasource {
  dataSources: {
    tmdb: ITheMovieDBAPI;
    news: INewsAPI;
  };
}

export default {
  tmdb: new TheMovieDBAPI(),
  news: new NewsAPI(),
};
