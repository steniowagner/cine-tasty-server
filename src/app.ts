import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";

import typeDefs from "./graphql/type-defs";
import resolvers from "./graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT! as string) },
  });
  console.log(`UHUL! Cine-Tasty-API is running at ${url}!`);
})();
