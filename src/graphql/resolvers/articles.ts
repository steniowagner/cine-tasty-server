import { QueryResolvers, QueryArticlesArgs, ArticleQueryResult } from '@lib/types';
import { GetArticlesResultItem } from '@news-api-types';
import { Context } from '@types';

const resolvers: QueryResolvers = {
  Query: {
    articles: (
      _: {},
      args: QueryArticlesArgs,
      { dataSources }: Context,
    ): Promise<ArticleQueryResult> => dataSources.news.getArticles(args),
  },

  Article: {
    image: ({ urlToImage }: GetArticlesResultItem): string | undefined => urlToImage,

    source: ({ source }: GetArticlesResultItem): string | undefined => source.name,

    id: ({ url }: GetArticlesResultItem): string | undefined => url,
  },
};

export default resolvers;
