import { QueryTrendingFamousArgs } from "@generated-types";
import TMDBApi from "@tmdb-api/tmdb-movie-db-api";
import { CONSTANTS as TMDBAPI_CONSTANS } from "@tmdb-api/utils";

import { CONSTANTS } from "./trending-famous.constants";
import { Response } from "./trending-famous.types";

export const handler = {
  handle: async (params: QueryTrendingFamousArgs, tmdbAPI: TMDBApi) => {
    try {
      const response = await tmdbAPI.handle<Response>(CONSTANTS.ENDPOINT, {
        page: String(params.page),
        language: params.language ?? TMDBAPI_CONSTANS.FALLBACK_LANGUAGE,
      });
      if (!response) {
        return {
          hasMore: false,
          items: [],
          totalResults: 0,
          totalPages: 0,
        };
      }
      return {
        hasMore: params.page < response.total_pages,
        items: response.results,
        totalResults: response.total_results,
        totalPages: response.total_pages,
      };
    } catch (err) {
      return {
        hasMore: false,
        items: [],
        totalResults: 0,
        totalPages: 0,
      };
    }
  },
};
