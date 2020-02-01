import { movieGenres } from './mediaGenres.stub';

export const rawMovie = {
  popularity: 222.017,
  vote_count: 1530,
  video: false,
  poster_path: '/poster_path.jpg',
  id: 530915,
  adult: false,
  backdrop_path: '/backdrop_path.jpg',
  original_language: 'original_language',
  original_title: 'original_title',
  genre_ids: movieGenres.map(({ id }) => id),
  title: 'title',
  vote_average: 8.1,
  overview: 'overview',
  release_date: 'release_date',
};

export const movie = {
  popularity: 222.017,
  vote_count: 1530,
  video: false,
  poster_path: '/poster_path.jpg',
  id: 530915,
  adult: false,
  backdrop_path: '/backdrop_path.jpg',
  original_language: 'original_language',
  original_title: 'original_title',
  genre_ids: movieGenres.map(({ name }) => name),
  title: 'title',
  vote_average: 8.1,
  overview: 'overview',
  release_date: 'release_date',
};
