import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const resolvers = {
  Query: {
    tests: () => [
      {
        test: "Hello, world!",
      },
    ],
  },
};

const typeDefs = `#graphql
  type Test {
    test: String
  }

  type Query {
    tests: [Test]
  }
`;

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
