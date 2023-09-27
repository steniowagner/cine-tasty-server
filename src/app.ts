import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";

import OpenTriviaAPI from "@open-trivia-api/open-trivia-api";
import NewsAPI from "@news-api/news-api";

import typeDefs from "./graphql/type-defs";
import resolvers from "./graphql/resolvers";
import { Context } from "./types";

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    async context() {
      return {
        openTriviaAPI: new OpenTriviaAPI(),
        newsAPI: new NewsAPI(new Date()),
      };
    },
    listen: { port: parseInt(process.env.PORT! as string) },
  });
  console.log(`UHUL! Cine-Tasty-API is running at ${url}!`);
})();
