import { QueryResolvers, QueryArticlesArgs, Articles } from '../../lib/types';
import { Datasource } from '../datasources';

const resolvers: QueryResolvers = {
  Query: {
    articles: (
      _: {},
      { page }: QueryArticlesArgs,
      { dataSources }: Datasource,
    ): Promise<Articles> => dataSources.news.getAllArticles(page),
  },
};

export default resolvers;
