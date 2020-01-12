export type MediaGenre = {
  id: number;
  name: string;
};

export type Genres = {
  movie: MediaGenre[];
  tv: MediaGenre[];
};

export interface BasePersonResponse {
  popularity?: number;
  known_for_department?: string;
  gender?: number;
  id?: number;
  profile_path?: string;
  adult?: boolean;
  known_for?: KnownForResult[];
  name?: string;
}

type GetPersonImagesResultProfile = {
  vote_average?: number;
  width: number;
  aspect_ratio: number;
  file_path: string;
  height: number;
  vote_count: number;
};

export interface GetPersonImagesResult {
  profiles: GetPersonImagesResultProfile[];
}

export interface GetPersonDetailsResult extends BasePersonResponse {
  images: GetPersonImagesResult;
  success?: boolean;
  also_known_as: string[];
  place_of_birth?: string;
  homepage?: string;
  biography: string;
  birthday?: string;
  deathday?: string;
  imdb_id: string;
}

export interface BaseMovieResponse {
  poster_path?: string;
  vote_count?: number;
  video?: boolean;
  id?: number;
  adult?: boolean;
  backdrop_path?: string;
  original_language?: string;
  original_title?: string;
  genre_ids?: number[];
  title?: string;
  vote_average?: number;
  overview?: string;
  release_date?: string;
}

export interface SearchMovieResponse extends BaseMovieResponse {
  popularity: number;
}

export interface GetPersonCastResultType extends BaseMovieResponse {
  media_type?: string;
  popularity?: number;
  character?: string;
  credit_id?: string;
}

export interface KnownForResult extends BaseMovieResponse {
  original_name?: string;
  media_type?: string;
  name?: string;
}

export interface GetArticlesResultItem {
  description?: string;
  content?: string;
  urlToImage?: string;
  author?: string;
  publishedAt?: string | null;
  source: {
    name?: string;
    id?: string | null;
  };
  url?: string;
  title?: string;
}

interface BaseCast {
  id?: number;
  character?: string;
  overview?: string;
  media_type?: string;
  poster_path?: string;
  backdrop_path?: string;
  popularity?: number;
  original_language?: string;
  vote_count?: number;
  vote_average?: number;
  genre_ids?: number[];
  credit_id?: string;
}

export interface CastMovieResult extends BaseCast {
  original_title?: string;
  video?: boolean;
  title?: string;
  adult?: boolean;
  release_date?: string;
}

export interface CastTVResult extends BaseCast {
  episode_count?: number;
  origin_country?: string[];
  original_name?: string;
  name?: string;
  first_air_date?: string;
}

export type CastResultType = (CastMovieResult | CastTVResult)[];

export interface CastResult {
  cast: CastResultType;
}
