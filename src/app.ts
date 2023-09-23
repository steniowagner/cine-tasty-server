import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";

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
        newsAPI: new NewsAPI(),
      };
    },
    listen: { port: parseInt(process.env.PORT! as string) },
  });
  console.log(`UHUL! Cine-Tasty-API is running at ${url}!`);
})();
