import { RESTDataSource } from 'apollo-datasource-rest';

import { validateArticleResultItem, getRequestParams, parseArticle } from './helpers';
import { ArticleQueryResult, Language } from '../../../lib/types';
import { GetArticlesResultItem } from '../../../types';

const BASE_URL = 'http://newsapi.org/v2';
const ENDPOINT = 'everything';
const STATUS_OK = 'ok';
const PAGE_SIZE = 12;

export interface Props {
  getAllArticles: (
    page: number,
    language?: Language | null,
  ) => Promise<ArticleQueryResult>;
}

class NewsAPI extends RESTDataSource implements Props {
  constructor() {
    super();
    this.baseURL = BASE_URL;
  }

  async getAllArticles(
    page: number,
    language?: Language | null,
  ): Promise<ArticleQueryResult> {
    const params = getRequestParams(page, language);

    const { status, articles } = await this.get(ENDPOINT, params);

    if (status !== STATUS_OK) {
      return {
        hasMore: false,
        items: [],
      };
    }

    const result = articles
      .filter((article: GetArticlesResultItem) => validateArticleResultItem(article))
      .map((article: GetArticlesResultItem) => parseArticle(article));

    return {
      hasMore: articles.length === PAGE_SIZE,
      items: result,
    };
  }
}

export default NewsAPI;
