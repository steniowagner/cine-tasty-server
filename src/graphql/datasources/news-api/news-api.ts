import { RESTDataSource } from "@apollo/datasource-rest";

import CONSTANTS from "./utils/constants";

export default class NewsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = CONSTANTS.BASE_URL;
  }
}
