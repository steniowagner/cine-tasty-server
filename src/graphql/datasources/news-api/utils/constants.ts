import { NewsLanguage } from "@generated-types";

export const CONSTANTS = {
  CACHE_KEY: (page: number, language: NewsLanguage) => `${language}/${page}`,
  MAX_PAGE: 3,
  CACHE_EXPIRATION: 60 * 60 * 24 * 2, // 2 days
  BASE_URL: "https://newsapi.org/v2/",
  ENDPOINT: "everything",
  SORT_BY: "popularity",
  PAGE_SIZE: 12,
  FROM_DAYS_AGO: 2,
};
