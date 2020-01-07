import { RESTDataSource } from 'apollo-datasource-rest';

import env from '../../config/environment';
import { Article } from '../../lib/types';

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
}

export interface INewsAPI {
  getRequestParams: (page: number, pageSize?: number, query?: string) => RequestParams ;
  getAllArticles: (page: number) => Promise<Article[]>;
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

  getRequestParams(page: number, pageSize: number = PAGE_SIZE, query: string = QUERY): RequestParams {
    const dateParam = this.getDateParam();

    const params: RequestParams = {
      apiKey: env.NEWS_API_KEY,
      from: dateParam,
      to: dateParam,
      pageSize,
      q: query,
      page,
    };

    return params;
  }

  async getAllArticles(page: number): Promise<Article[]> {
    const params = this.getRequestParams(page);

    const { status, articles } = await this.get(ENDPOINT, params);

    if (status !== STATUS_OK) {
      return [];
    }

    const result = articles
      .filter((article: APIOutput) => this.validateAPIOutput(article))
      .map((article: APIOutput) => this.parseArticle(article));

    return result;
  }
}

export default NewsAPI;
