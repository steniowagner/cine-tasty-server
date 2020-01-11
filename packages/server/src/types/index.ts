export type MediaGenre = {
  id: number;
  name: string;
};

export interface RawKnownFor {
  original_language: string;
  backdrop_path: string;
  original_title?: string;
  original_name?: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
  media_type: string;
  adult: boolean;
  overview: string;
  genre_ids: number[];
  vote_count: number;
  video: boolean;
  title?: string;
  name?: string;
  id: number;
}

export interface RawPerson {
  popularity: number;
  known_for_department: string;
  gender: number;
  id: number;
  profile_path: string;
  adult: boolean;
  known_for: RawKnownFor[];
  name: string;
}

export type Genres = {
  movie: MediaGenre[];
  tv: MediaGenre[];
};

export interface GetPersonDetailsResult {
  known_for_department: string;
  also_known_as: string[];
  place_of_birth?: string;
  profile_path?: string;
  popularity: number;
  homepage?: string;
  biography: string;
  birthday?: string;
  deathday?: string;
  imdb_id: string;
  gender: number;
  adult: boolean;
  name: string;
  id: number;
}

export type GetPersonCastResultType = {
  original_language: string;
  original_title: string;
  backdrop_path?: string;
  poster_path?: string;
  vote_average: number;
  media_type: string;
  genre_ids: number[];
  release_date: string;
  vote_count: number;
  popularity: number;
  character: string;
  credit_id: string;
  overview: string;
  adult: boolean;
  video: boolean;
  title: string;
  id: number;
};

export interface GetPersonCastResult {
  cast: GetPersonCastResultType[];
}

type GetPersonImagesResultProfile = {
  vote_average?: number;
  aspect_ratio: number;
  vote_count: number;
  file_path: string;
  height: number;
  width: number;
};

export interface GetPersonImagesResult {
  profiles: GetPersonImagesResultProfile[];
  id: number;
}

export interface GetArticlesResultItem {
  publishedAt?: string | null;
  description?: string;
  urlToImage?: string;
  content?: string;
  author?: string;
  source: {
    name?: string;
    id?: string | null;
  };
  title?: string;
  url?: string;
}
