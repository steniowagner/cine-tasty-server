import { CONSTANTS as TMDBAPI_CONSTANTS } from "@tmdb-api/utils/constants";
import { SearchInput } from "@generated-types";
import TMDBApi from "@tmdb-api/tmdb-movie-db-api";

import { SearchResponse } from "./search.types";

export type SearchType = "famous" | "tv-shows";

export type HandlerParams = {
  tmdbAPI: TMDBApi;
  input: SearchInput;
  type: SearchType;
};

export const searchTypeEndpointMapping: Record<SearchType, string> = {
  famous: "search/person",
  "tv-shows": "search/tv",
};

export const handler = {
  handle: async <TData>(params: HandlerParams) => {
    const endpoint = searchTypeEndpointMapping[params.type];
    const response = await params.tmdbAPI.handle<SearchResponse<TData>>(endpoint, {
      language: params.input.language ?? TMDBAPI_CONSTANTS.FALLBACK_LANGUAGE,
      query: params.input.query,
      page: String(params.input.page),
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
      hasMore: params.input.page < response.total_pages,
      items: response.results,
      totalResults: response.total_results,
      totalPages: response.total_pages,
    };
  },
};
