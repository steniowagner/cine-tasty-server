import { QueryResolvers, QueryArticlesArgs, ArticleQueryResult } from '../../lib/types';
import { Datasource } from '../datasources';

const resolvers: QueryResolvers = {
  Query: {
    articles: (
      _: {},
      { page, language }: QueryArticlesArgs,
      { dataSources }: Datasource,
    ): Promise<ArticleQueryResult> => dataSources.news.getAllArticles(page, language),
  },
};

export default resolvers;
