import { InputMaybe, Iso6391Language } from "@generated-types";

export const CONSTANTS = {
  ENDPOINT: (mediaType: string) =>
    mediaType === "movie" ? "genre/movie/list" : "genre/tv/list",
  CACHE_EXPIRATION: 60 * 60 * 24 * 7, // seven days,
  CACHE_KEY: (mediaType: string, language?: InputMaybe<Iso6391Language>) => {
    const cacheKeyLanguage = language || Iso6391Language.En;
    const cacheKeyMediaType = mediaType === "movie" ? "movies" : "tv-shows";
    return `${cacheKeyMediaType}/genres/${cacheKeyLanguage}`;
  },
};
