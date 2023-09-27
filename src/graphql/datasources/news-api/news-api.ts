import { RESTDataSource, AugmentedRequest } from "@apollo/datasource-rest";

import { NewsAPIResponse } from "@news-api/types";
import { QueryNewsArgs } from "@generated-types";

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

  async getNews(params: QueryNewsArgs) {
    try {
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
    } catch (err) {
      return {
        hasMore: false,
        items: [],
      };
    }
  }
}
