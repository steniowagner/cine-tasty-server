import { NewsAPIResponseArticles } from "@news-api/types";
import { QueryNewsArgs } from "@generated-types";
import { Context } from "@types";

export const resolvers = {
  Query: {
    news: (_parent: undefined, args: QueryNewsArgs, context: Context) =>
      context.newsAPI.getNews(args),
  },

  NewsArticle: {
    image: (parent: NewsAPIResponseArticles): string | undefined | null =>
      parent.urlToImage,
    source: (parent: NewsAPIResponseArticles): string | undefined | null =>
      parent.source.name,
    id: (parent: NewsAPIResponseArticles): string | undefined | null => parent.url,
  },
};
