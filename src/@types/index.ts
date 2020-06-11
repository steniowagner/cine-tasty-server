import OpenTriviaAPI from '../graphql/datasources/open-trivia-api/OpenTriviaAPI';
import TheMovieDBAPI from '../graphql/datasources/the-movie-db-api/TheMovieDBAPI';
import NewsAPI from 'graphql/datasources/news-api/NewsAPI';

export type DataSources = {
  openTrivia: OpenTriviaAPI;
  tmdb: TheMovieDBAPI;
  news: NewsAPI;
};

export type Context = {
  dataSources: DataSources;
};
