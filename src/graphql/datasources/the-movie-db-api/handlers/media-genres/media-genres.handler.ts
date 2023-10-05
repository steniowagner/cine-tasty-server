import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { Iso6391Language, MediaType } from "@generated-types";
import { CONSTANTS as TMDB_CONSTANTS } from "@tmdb-api/utils";
import { CacheHandler } from "@/utils";

import { Response } from "./media-genres.types";

export const CACHE_EXPIRATION = 60 * 60 * 24 * 7; // seven days

type HandlerParams = {
  shouldReturnRaw?: boolean;
  language?: Iso6391Language;
  cacheHandler: CacheHandler;
  tmdbAPI: TheMovieDBAPI;
  mediaType: MediaType;
  genreIds: number[];
};

const endpoint = (mediaType: MediaType) =>
  mediaType === MediaType.Movie ? "genre/movie/list" : "genre/tv/list";

const mediaTypeCacheKey = (mediaType: string, language?: Iso6391Language) => {
  const cacheKeyLanguage = language || Iso6391Language.En;
  const cacheKeyMediaType = mediaType === MediaType.Movie ? "movies" : "tv-shows";
  return `${cacheKeyMediaType}/genres/${cacheKeyLanguage}`;
};

const parseResponse = (response: Response, genreIds: number[]) =>
  genreIds
    .map((genreId) => {
      const genre = response.genres.find((genre) => genre.id === genreId);
      return genre?.name;
    })
    .filter((genre) => !!genre);

export const handler = {
  handle: async (params: HandlerParams) => {
    const cacheKey = mediaTypeCacheKey(params.mediaType, params.language);
    const dataCached = await params.cacheHandler.get<Response>(cacheKey);
    if (params.shouldReturnRaw && dataCached) {
      return dataCached.genres;
    }
    if (dataCached) {
      return parseResponse(dataCached, params.genreIds);
    }
    const response = await params.tmdbAPI.handle<Response>(endpoint(params.mediaType), {
      language: params.language ?? TMDB_CONSTANTS.FALLBACK_LANGUAGE,
    });
    if (!response) {
      return [];
    }
    await params.cacheHandler.set({
      expireIn: CACHE_EXPIRATION,
      key: cacheKey,
      value: response,
    });
    return params.shouldReturnRaw
      ? response.genres
      : parseResponse(response, params.genreIds);
  },
};
