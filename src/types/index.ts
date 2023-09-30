import OpenTriviaAPI from "@open-trivia-api/open-trivia-api";
import NewsAPI from "@news-api/news-api";
import TMDBApi from "@tmdb-api/tmdb-movie-db-api";
import { CacheHandler } from "@/utils";

export type Context = {
  cacheHandler: CacheHandler;
  openTriviaAPI: OpenTriviaAPI;
  newsAPI: NewsAPI;
  tmdbAPI: TMDBApi;
};
