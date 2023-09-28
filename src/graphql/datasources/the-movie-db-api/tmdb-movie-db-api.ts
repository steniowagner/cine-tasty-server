import { RESTDataSource } from "@apollo/datasource-rest";

import { CONSTANTS } from "./utils";

export default class TheMovieDBAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = CONSTANTS.BASE_URL;
  }

  async handle<Response>(
    endpoint: string,
    params: Record<string, string> = {},
  ): Promise<Response | undefined> {
    try {
      return this.get<Response>(endpoint, {
        params,
        headers: {
          Authorization: `Bearer ${process.env.THE_MOVIE_DB_API_READ_ACCESS_TOKEN}`,
        },
      }) as Response;
    } catch (err) {
      console.error("TMDBAPI", endpoint, err);
    }
  }
}
