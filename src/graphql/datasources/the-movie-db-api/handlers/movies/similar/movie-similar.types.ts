import { MovieSimilarArgs } from "@generated-types";

export type Result = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  video: boolean;
};

export type Response = {
  results: Result[];
  page: number;
  total_pages: number;
  total_results: number;
};

export type Params = MovieSimilarArgs;
