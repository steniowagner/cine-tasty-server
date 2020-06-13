import { RESTDataSource } from 'apollo-datasource-rest';

import { ArticleQueryResult, QueryArticlesArgs } from '@lib/types';
import { GetArticlesResultItem } from '@news-api-types';

import { makeRequestParams } from './helpers';
import CONSTANTS from './utils/constants';

type GetRequestResponse = {
  articles: GetArticlesResultItem[];
  status: string;
};

class NewsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = CONSTANTS.BASE_URL;
  }

  async getArticles({ page, language }: QueryArticlesArgs): Promise<ArticleQueryResult> {
    const params = makeRequestParams(page, language);

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
