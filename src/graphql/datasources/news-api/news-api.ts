import { RESTDataSource, AugmentedRequest } from "@apollo/datasource-rest";

import { NewsAPIResponseArticles, NewsAPIResponse } from "@news-api/types";
import { QueryNewsArgs } from "@generated-types";
import { CacheHandler } from "@/utils";

import { getRequestParams } from "./utils/request-params/request-params";
import { CONSTANTS } from "./utils/constants";

export default class NewsAPI extends RESTDataSource {
  constructor(private today: Date) {
    super();
    this.baseURL = CONSTANTS.BASE_URL;
  }

  willSendRequest(_path: string, request: AugmentedRequest) {
    request.headers["X-Api-Key"] = process.env.NEWS_API_KEY as string;
  }

  private async fetchNews(params: QueryNewsArgs) {
    const requestParams = getRequestParams({
      language: params.language,
      page: params.page,
      today: this.today,
    });
    const response = await this.get<NewsAPIResponse>(CONSTANTS.ENDPOINT, {
      params: requestParams,
    });
    const isRequestSuccessful = response.status === "ok";
    return {
      hasMore: isRequestSuccessful
        ? response.articles.length === CONSTANTS.PAGE_SIZE
        : false,
      items: isRequestSuccessful ? response.articles : [],
    };
  }

  async getNews(params: QueryNewsArgs, cacheHandler: CacheHandler) {
    try {
      if (params.page > CONSTANTS.PAGE_SIZE) {
        return {
          items: [],
          hasMore: false,
        };
      }
      const cacheKey = CONSTANTS.CACHE_KEY(params.page, params.language);
      const dataCached = await cacheHandler.get<NewsAPIResponseArticles[]>(cacheKey);
      if (dataCached) {
        return {
          items: dataCached,
          hasMore: true,
        };
      }
      const response = await this.fetchNews(params);
      await cacheHandler.set({
        key: cacheKey,
        value: response.items,
        expireIn: CONSTANTS.CACHE_EXPIRATION,
      });
      return response;
    } catch (err) {
      return {
        hasMore: false,
        items: [],
      };
    }
  }
}
