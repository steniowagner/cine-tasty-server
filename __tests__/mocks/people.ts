import { movieGenres, tvGenres } from './mediaGenres';

export const rawKnowForMovie = {
  release_date: 'release_date',
  id: 123,
  vote_count: 123,
  video: false,
  media_type: 'movie',
  vote_average: 5.8,
  title: 'title',
  genre_ids: movieGenres.map(genre => genre.id),
  popularity: 1,
  original_title: 'original_title',
  original_language: 'original_language',
  adult: false,
  backdrop_path: '/backdrop_path.jpg',
  overview: 'overview',
  poster_path: '/poster_path.jpg',
};

export const rawKnowForTVShow = {
  original_name: 'original_name',
  id: 79574,
  origin_country: [],
  name: 'name',
  backdrop_path: '/backdrop_path.jpg',
  original_language: 'original_language',
  first_air_date: 'first_air_date',
  genre_ids: tvGenres.map(genre => genre.id),
  popularity: 1,
  vote_count: 2,
  media_type: 'tv',
  vote_average: 8,
  overview: 'overview',
  poster_path: '/poster_path.jpg',
};

export const rawPeopleItem = {
  profile_path: 'profile_path',
  known_for: [rawKnowForMovie, rawKnowForTVShow],
  popularity: 123,
  adult: true,
  name: 'name',
  id: 3,
};

export const knowForMovie = {
  releaseDate: 'release_date',
  id: 123,
  voteCount: 123,
  video: false,
  mediaType: 'movie',
  voteAverage: 5.8,
  title: 'title',
  popularity: 1,
  originalTitle: 'original_title',
  originalLanguage: 'original_language',
  adult: false,
  backdropPath: '/backdrop_path.jpg',
  overview: 'overview',
  posterPath: '/poster_path.jpg',
  genreIds: movieGenres.map(genre => genre.name),
};

export const knowForTVShow = {
  originalName: 'original_name',
  id: 79574,
  originCountry: [],
  name: 'name',
  backdropPath: '/backdrop_path.jpg',
  originalLanguage: 'original_language',
  firstAirDate: 'first_air_date',
  popularity: 1,
  voteCount: 2,
  mediaType: 'tv',
  voteAverage: 8,
  overview: 'overview',
  posterPath: '/poster_path.jpg',
  genreIds: tvGenres.map(genre => genre.name),
};

export const peopleItem = {
  profilePath: 'profile_path',
  knownFor: [knowForMovie, knowForTVShow],
  popularity: 123,
  adult: true,
  name: 'name',
  id: 3,
};
