import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";

import OpenTriviaAPI from "@open-trivia-api/open-trivia-api";
import NewsAPI from "@news-api/news-api";
import TMDBApi from "@tmdb-api/tmdb-movie-db-api";

import typeDefs from "./graphql/type-defs";
import resolvers from "./graphql/resolvers";
import { Context } from "./types";
import { RedisCacheHandler } from "./utils";

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

(async () => {
  const cacheHandler = new RedisCacheHandler();
  await cacheHandler.init();
  const { url } = await startStandaloneServer(server, {
    async context() {
      return {
        openTriviaAPI: new OpenTriviaAPI(),
        newsAPI: new NewsAPI(new Date()),
        tmdbAPI: new TMDBApi(),
        cacheHandler,
      };
    },
    listen: { port: parseInt(process.env.NODEJS_SERVER_PORT! as string) },
  });
  if (process.env.NODE_ENV !== "production") {
    console.log(`UHUL! Cine-Tasty-API is running at ${url}!`);
  }
})();
