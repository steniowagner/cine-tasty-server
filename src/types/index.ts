import OpenTriviaAPI from "@open-trivia-api/open-trivia-api";
import NewsAPI from "@news-api/news-api";

export type Context = {
  openTriviaAPI: OpenTriviaAPI;
  newsAPI: NewsAPI;
};
