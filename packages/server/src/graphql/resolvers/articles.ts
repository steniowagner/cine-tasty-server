import { QueryResolvers, QueryArticlesArgs, Article } from '../../lib/types';
import { Datasource } from '../datasources';

const resolvers: QueryResolvers = {
  Query: {
    articles: (
      _: {},
      { page }: QueryArticlesArgs,
      { dataSources }: Datasource,
    ): Promise<Article[]> => dataSources.news.getAllArticles(page),
  },
};

export default resolvers;
