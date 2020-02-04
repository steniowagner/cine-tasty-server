import { tvGenres } from './mediaGenres.stub';

export const rawTVShow = {
  poster_path: '/poster_path.jpg',
  popularity: 1.1,
  id: 1,
  backdrop_path: '/backdrop_path.jpg',
  vote_average: 1.1,
  overview: 'overview',
  first_air_date: 'first_air_date',
  origin_country: ['origin_country'],
  genre_ids: tvGenres.map(({ id }) => id),
  original_language: 'original_language',
  vote_count: 1,
  name: 'name',
  original_name: 'original_name',
};

export const tvshow = {
  poster_path: '/poster_path.jpg',
  popularity: 1.1,
  id: 1,
  backdrop_path: '/backdrop_path.jpg',
  vote_average: 1.1,
  overview: 'overview',
  first_air_date: 'first_air_date',
  origin_country: ['origin_country'],
  genre_ids: tvGenres.map(({ name }) => name),
  original_language: 'original_language',
  vote_count: 1,
  name: 'name',
  original_name: 'original_name',
};
