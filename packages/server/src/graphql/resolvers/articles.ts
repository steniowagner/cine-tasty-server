import { QueryResolvers } from '../../lib/types';
import { Datasource } from '../datasources';
import { Article } from '../../lib/types';

const resolvers: QueryResolvers = {
  Query: {
    articles: (
      _: {},
      __: {},
      { dataSources }: Datasource,
    ): Promise<Article[]> => dataSources.news.getAllArticles(),
  },
};

export default resolvers;
