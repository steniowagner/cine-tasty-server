import { QueryResolvers, QueryArticlesArgs, ArticleQueryResult } from '../../lib/types';
import { Context } from '../../types';

const resolvers: QueryResolvers = {
  Query: {
    articles: (
      _: {},
      args: QueryArticlesArgs,
      { dataSources }: Context,
    ): Promise<ArticleQueryResult> => dataSources.news.getArticles(args),
  },
};

export default resolvers;
