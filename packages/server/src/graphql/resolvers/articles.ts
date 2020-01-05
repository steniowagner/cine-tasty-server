/* eslint-disable @typescript-eslint/explicit-function-return-type */
const resolvers = {
  Query: {
    articles: (_: any, __: any, { dataSources }: any) =>
      dataSources.news.getAllArticles(),
  },
};

export default resolvers;
