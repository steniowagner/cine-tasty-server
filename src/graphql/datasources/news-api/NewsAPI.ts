import { RESTDataSource } from 'apollo-datasource-rest';
import { URLSearchParamsInit } from 'apollo-server-env';

import { ArticlesResult, QueryArticlesArgs, ArticleResponse } from '@lib/types';

import { makeRequestParams } from './helpers';
import CONSTANTS from './utils/constants';

type GetRequestResponse = {
  articles: ArticleResponse[];
  status: string;
};

class NewsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = CONSTANTS.BASE_URL;
  }

  async getArticles({ page, language }: QueryArticlesArgs): Promise<ArticlesResult> {
    const params = makeRequestParams(page, language) as URLSearchParamsInit;

    try {
      const { articles } = await this.get<GetRequestResponse>(CONSTANTS.ENDPOINT, params);

      return {
        hasMore: articles.length === CONSTANTS.PAGE_SIZE,
        items: articles,
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
