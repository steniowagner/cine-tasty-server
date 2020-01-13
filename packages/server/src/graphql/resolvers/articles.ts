import { QueryResolvers, QueryArticlesArgs, ArticleQueryResult } from '../../lib/types';
import { Context } from '../../types';

const resolvers: QueryResolvers = {
  Query: {
    articles: (
      _: {},
      { page, language }: QueryArticlesArgs,
      { dataSources }: Context,
    ): Promise<ArticleQueryResult> => dataSources.news.getAllArticles(page, language),
  },
};

export default resolvers;
