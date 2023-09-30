import { Iso6391Language, InputMaybe } from "@generated-types";

export const CONSTANTS = {
  BASE_URL: "https://api.themoviedb.org/3/",
  FALLBACK_LANGUAGE: Iso6391Language.En,
  KEYS: {
    MOVIES_GENRES_CACHE_KEY: (language?: InputMaybe<Iso6391Language>) =>
      `movies/genres/${language || Iso6391Language.En}`,
    TV_SHOWS_GENRES_CACHE_KEY: (language?: InputMaybe<Iso6391Language>) =>
      `tv-shows/genres/${language || Iso6391Language.En}`,
  },
};
