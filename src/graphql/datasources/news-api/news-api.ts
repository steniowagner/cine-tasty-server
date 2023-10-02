import { RESTDataSource, AugmentedRequest } from "@apollo/datasource-rest";

import { NewsAPIResponseArticles, NewsAPIResponse } from "@news-api/types";
import { QueryNewsArgs } from "@generated-types";

import { getRequestParams } from "./utils/request-params/request-params";
import { CONSTANTS } from "./utils/constants";
import { CacheHandler } from "@/utils";
export default class NewsAPI extends RESTDataSource {
  constructor(private today: Date) {
    super();
    this.baseURL = CONSTANTS.BASE_URL;
  }

  willSendRequest(_path: string, request: AugmentedRequest) {
    request.headers["X-Api-Key"] = process.env.NEWS_API_KEY as string;
  }

  async getNews(params: QueryNewsArgs, cacheHandler: CacheHandler) {
    try {
      const cacheKey = CONSTANTS.CACHE_KEY(params.page, params.language);
      const dataCached = await cacheHandler.get<NewsAPIResponseArticles[]>(cacheKey);
      if (dataCached) {
        return {
          items: dataCached,
          hasMore: true,
        };
      }
      const requestParams = getRequestParams({
        language: params.language,
        page: params.page,
        today: this.today,
      });
      const response = await this.get<NewsAPIResponse>(CONSTANTS.ENDPOINT, {
        params: requestParams,
      });
      await cacheHandler.set({
        key: cacheKey,
        value: response.articles,
        expireIn: CONSTANTS.CACHE_EXPIRATION,
      });
      const isRequestSuccessful = response.status === "ok";
      return {
        hasMore: isRequestSuccessful
          ? response.articles.length === CONSTANTS.PAGE_SIZE
          : false,
        items: isRequestSuccessful ? response.articles : [],
      };
    } catch (err) {
      return {
        hasMore: false,
        items: [],
      };
    }
  }
}
