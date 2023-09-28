import OpenTriviaAPI from "@open-trivia-api/open-trivia-api";
import NewsAPI from "@news-api/news-api";
import TMDBApi from "@tmdb-api/tmdb-movie-db-api";

export type Context = {
  openTriviaAPI: OpenTriviaAPI;
  newsAPI: NewsAPI;
  tmdbAPI: TMDBApi;
};
