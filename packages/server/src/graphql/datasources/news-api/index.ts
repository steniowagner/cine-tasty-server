import { RESTDataSource } from 'apollo-datasource-rest';

import { validateArticleResultItem, getRequestParams, parseArticle } from './helpers';
import { ArticleQueryResult, QueryArticlesArgs } from '../../../lib/types';
import { GetArticlesResultItem } from '../../../types';
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
    const params = getRequestParams(page, language);

    const { status, articles } = await this.get<GetRequestResponse>(
      CONSTANTS.ENDPOINT,
      params,
    );

    if (status !== CONSTANTS.STATUS_OK) {
      return {
        hasMore: false,
        items: [],
      };
    }

    const result = articles
      .filter((article: GetArticlesResultItem) => validateArticleResultItem(article))
      .map((article: GetArticlesResultItem) => parseArticle(article));

    return {
      hasMore: articles.length === CONSTANTS.PAGE_SIZE,
      items: result,
    };
  }
}

export default NewsAPI;
