import { CONSTANTS as TMDB_CONSTANS } from "@tmdb-api/utils";
import TheMovieDBAPI from "@tmdb-api/tmdb-movie-db-api";
import { TvShowImagesArgs } from "@generated-types";

import { Response } from "./movie-images.types";

export const handler = async (params: TvShowImagesArgs, tmdbAPI: TheMovieDBAPI) => {
  const response = await tmdbAPI.handle<Response>(`movie/${params.id}/images`, {
    language: params.language ?? TMDB_CONSTANS.FALLBACK_LANGUAGE,
  });
  if (!response) {
    return [];
  }
  return response.backdrops
    .filter((backdrop) => !!backdrop.file_path)
    .map((backdrop) => backdrop.file_path);
};
