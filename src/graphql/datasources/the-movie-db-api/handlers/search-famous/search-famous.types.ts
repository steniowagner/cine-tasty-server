export type KnownForTVShow = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
};

export type KnownForMovie = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type SearchFamousResultItem = {
  adult: boolean;
  id: number;
  gender: number;
  known_for: (KnownForTVShow | KnownForMovie)[];
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
};
