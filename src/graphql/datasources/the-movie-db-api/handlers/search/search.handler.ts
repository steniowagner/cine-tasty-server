import { CONSTANTS as TMDBAPI_CONSTANTS } from "@tmdb-api/utils/constants";
import { SearchInput } from "@generated-types";
import TMDBApi from "@tmdb-api/tmdb-movie-db-api";

import { SearchResponse } from "./search.types";
import { CONSTANTS } from "./search.constants";

export type Type = "person";

export type HandlerParams = {
  tmdbAPI: TMDBApi;
  input: SearchInput;
  type: Type;
};

export const handler = {
  handle: async <TData>(params: HandlerParams) => {
    const response = await params.tmdbAPI.handle<SearchResponse<TData>>(
      CONSTANTS.ENDPOINT(params.type),
      {
        language: params.input.language ?? TMDBAPI_CONSTANTS.FALLBACK_LANGUAGE,
        query: params.input.query,
        page: String(params.input.page),
      },
    );
    if (!response) {
      return {
        hasMore: false,
        items: [],
        totalResults: 0,
        totalPages: 0,
      };
    }
    return {
      hasMore: params.input.page < response.total_pages,
      items: response.results,
      totalResults: response.total_results,
      totalPages: response.total_pages,
    };
  },
};
