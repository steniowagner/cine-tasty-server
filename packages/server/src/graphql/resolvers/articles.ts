import { QueryResolvers } from '../../lib/types';

const resolvers: QueryResolvers = {
  Query: {
    articles: (_: any, __: any, { dataSources }: any) =>
      dataSources.news.getAllArticles(),
  },
};

export default resolvers;
