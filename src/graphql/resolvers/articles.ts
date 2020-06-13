import {
  ArticlesResult,
  QueryArticlesArgs,
  ArticleResponse,
  QueryResolvers,
} from '@lib/types';
import { Context } from '@types';

const resolvers: QueryResolvers = {
  Query: {
    articles: (
      _: {},
      args: QueryArticlesArgs,
      { dataSources }: Context,
    ): Promise<ArticlesResult> => dataSources.news.getArticles(args),
  },

  Article: {
    image: ({ urlToImage }: ArticleResponse): string | undefined | null => urlToImage,

    source: ({ source }: ArticleResponse): string | undefined | null => source.name,

    id: ({ url }: ArticleResponse): string | undefined | null => url,
  },
};

export default resolvers;
