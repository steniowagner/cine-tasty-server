import { RESTDataSource } from 'apollo-datasource-rest';

import { ArticleQueryResult, QueryArticlesArgs } from '@lib/types';
import { GetArticlesResultItem } from 'types';

import { makeRequestParams, parseArticle } from './helpers';
import CONSTANTS from './utils/constants';

export interface Props {
  getArticles: (args: QueryArticlesArgs) => Promise<ArticleQueryResult>;
}

type GetRequestResponse = {
  articles: GetArticlesResultItem[];
  status: string;
};

class NewsAPI extends RESTDataSource implements Props {
  constructor() {
    super();
    this.baseURL = CONSTANTS.BASE_URL;
  }

  async getArticles({ page, language }: QueryArticlesArgs): Promise<ArticleQueryResult> {
    const params = makeRequestParams(page, language);

    try {
      const { articles } = await this.get<GetRequestResponse>(CONSTANTS.ENDPOINT, params);

      const result = articles.map((article: GetArticlesResultItem) =>
        parseArticle(article),
      );

      return {
        hasMore: articles.length === CONSTANTS.PAGE_SIZE,
        items: result,
      };
    } catch (err) {
      return {
        hasMore: false,
        items: [],
      };
    }
  }
}

export default NewsAPI;
