import { RESTDataSource } from 'apollo-datasource-rest';

import env from '../../config/environment';
import { ArticleQueryResult, Article, Language } from '../../lib/types';

const BASE_URL = 'http://newsapi.org/v2';
const ENDPOINT = 'everything';
const STATUS_OK = 'ok';
const QUERY = 'cinema';
const PAGE_SIZE = 12;

interface APIOutput {
  publishedAt: string;
  urlToImage: string;
  source: {
    id?: string;
    name: string;
  };
  author: string;
  title: string;
  url: string;
}

type RequestParams = {
  pageSize: number;
  apiKey?: string;
  page: number;
  from: string;
  to: string;
  q: string;
};

export interface INewsAPI {
  getRequestParams: (
    page: number,
    language?: Language | null,
    query?: string,
  ) => RequestParams;
  getAllArticles: (
    page: number,
    language?: Language | null,
  ) => Promise<ArticleQueryResult>;
  validateAPIOutput: (output: APIOutput) => boolean;
  parseArticle: (apiOutput: APIOutput) => Article;
  getDateParam: () => string;
}

class NewsAPI extends RESTDataSource implements INewsAPI {
  constructor() {
    super();
    this.baseURL = BASE_URL;
  }

  parseArticle({
    publishedAt,
    urlToImage,
    source,
    author,
    title,
    url,
  }: APIOutput): Article {
    const { name, id } = source;

    return {
      image: urlToImage,
      id: id || url,
      source: name,
      publishedAt,
      author,
      title,
      url,
    };
  }

  getDateParam(): string {
    const today = new Date();

    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    const day = today
      .getDate()
      .toString()
      .padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  validateAPIOutput(output: APIOutput): boolean {
    return Object.entries(output).every(([, value]) => !!value);
  }

  getRequestParams(
    page: number,
    language?: Language | null,
    query: string = QUERY,
  ): RequestParams & { language?: string | null } {
    const dateParam = this.getDateParam();

    const params = {
      apiKey: env.NEWS_API_KEY,
      pageSize: PAGE_SIZE,
      from: dateParam,
      to: dateParam,
      q: query,
      page,
    };

    if (language && typeof language === 'string') {
      return {
        ...params,
        language: language.toLowerCase(),
      };
    }

    return params;
  }

  async getAllArticles(
    page: number,
    language?: Language | null,
  ): Promise<ArticleQueryResult> {
    const params = this.getRequestParams(page, language);

    const { status, articles } = await this.get(ENDPOINT, params);

    if (status !== STATUS_OK) {
      return {
        hasMore: false,
        items: [],
      };
    }

    const result = articles
      .filter((article: APIOutput) => this.validateAPIOutput(article))
      .map((article: APIOutput) => this.parseArticle(article));

    return {
      hasMore: articles.length === PAGE_SIZE,
      items: result,
    };
  }
}

export default NewsAPI;
