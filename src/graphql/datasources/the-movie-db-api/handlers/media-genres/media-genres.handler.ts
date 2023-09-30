import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { Iso6391Language } from "@generated-types";
import { CONSTANTS as TMDB_CONSTANTS } from "@tmdb-api/utils";
import { CacheHandler } from "@/utils";

import { Response } from "./media-genres.types";
import { CONSTANTS } from "./media-genres.constants";

type HandlerParams = {
  language?: Iso6391Language;
  cacheHandler: CacheHandler;
  tmdbAPI: TheMovieDBAPI;
  cacheKey: string;
  endpoint: string;
  genreIds: number[];
};

export const parseResponse = (response: Response, genreIds: number[]) =>
  genreIds
    .map((genreId) => {
      const genre = response.genres.find((genre) => genre.id === genreId);
      return genre?.name;
    })
    .filter((genre) => !!genre);

export const handler = {
  handle: async (params: HandlerParams) => {
    const dataCached = await params.cacheHandler.get<Response>(params.cacheKey);
    if (dataCached) {
      return parseResponse(dataCached, params.genreIds);
    }
    const response = await params.tmdbAPI.handle<Response>(params.endpoint, {
      language: params.language ?? TMDB_CONSTANTS.FALLBACK_LANGUAGE,
    });
    if (!response) {
      return [];
    }
    await params.cacheHandler.set({
      expireIn: CONSTANTS.CACHE_EXPIRATION,
      key: params.cacheKey,
      value: response,
    });
    return parseResponse(response, params.genreIds);
  },
};
