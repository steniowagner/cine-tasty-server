import { movieGenres } from './mediaGenres.stub';

export const movieCast = {
  cast_id: 4,
  character: 'character',
  credit_id: 'credit_id',
  gender: 1,
  id: 1,
  name: 'name',
  order: 0,
  profile_path: '/profile_path.jpg',
};

export const movieCrew = {
  credit_id: 'credit_id',
  department: 'department',
  gender: 2,
  id: 2,
  job: 'job',
  name: 'Dname',
  profile_path: 'profile_path',
};

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

export const rawMovieDetail = {
  adult: false,
  backdrop_path: '/backdrop_path.jpg',
  budget: 123,
  genres: movieGenres,
  homepage: 'homepage',
  id: 123,
  original_language: 'original_language',
  original_title: 'original_title',
  overview: 'overview',
  popularity: 1,
  poster_path: 'poster_path',
  production_companies: [
    {
      id: 123,
      logo_path: '/logo_path.png',
      name: 'name',
      origin_country: 'origin_country',
    },
  ],
  production_countries: [
    {
      iso_3166_1: 'iso_3166_1',
      name: 'name',
    },
  ],
  release_date: 'release_date',
  revenue: 123,
  runtime: 123,
  spoken_languages: [
    {
      iso_639_1: 'iso_639_1',
      name: 'name',
    },
  ],
  status: 'status',
  tagline: 'tagline',
  title: 'title',
  video: false,
  vote_average: 1.8,
  vote_count: 3439,
  credits: {
    cast: [movieCast],
    crew: [movieCrew],
  },
  videos: {
    results: [
      {
        id: 'id',
        iso_639_1: 'iso_639_1',
        iso_3166_1: 'iso_3166_1',
        key: 'key',
        name: 'name',
        site: 'YouTube',
        size: 1080,
        type: 'type',
      },
      {
        id: 'id',
        iso_639_1: 'iso_639_1',
        iso_3166_1: 'iso_3166_1',
        key: 'key',
        name: 'name',
        site: 'Other',
        size: 1080,
        type: 'type',
      },
    ],
  },
};

export const movieDetail = {
  adult: false,
  backdrop_path: '/backdrop_path.jpg',
  budget: 123,
  genres: movieGenres.map(({ name }) => name),
  homepage: 'homepage',
  id: '123',
  original_language: 'original_language',
  original_title: 'original_title',
  overview: 'overview',
  popularity: 1,
  poster_path: 'poster_path',
  production_companies: [
    {
      id: '123',
      logo_path: '/logo_path.png',
      name: 'name',
      origin_country: 'origin_country',
    },
  ],
  production_countries: ['name'],
  release_date: 'release_date',
  revenue: 123,
  runtime: 123,
  spoken_languages: ['name'],
  status: 'status',
  tagline: 'tagline',
  title: 'title',
  video: false,
  vote_average: 1.8,
  vote_count: 3439,
  cast: [
    {
      name: movieCast.name,
      profile_path: movieCast.profile_path,
      id: `${movieCast.id}`,
      character: movieCast.character,
    },
  ],
  crew: [
    {
      department: movieCrew.department,
      id: `${movieCrew.id}`,
      job: movieCrew.job,
      name: movieCrew.name,
      profile_path: movieCrew.profile_path,
    },
  ],
  videos: [
    {
      id: 'id',
      key: 'key',
      name: 'name',
      site: 'YouTube',
      type: 'type',
      thumbnail: {
        extra_small: 'https://img.youtube.com/vi/key/default.jpg',
        small: 'https://img.youtube.com/vi/key/mqdefault.jpg',
        medium: 'https://img.youtube.com/vi/key/hqdefault.jpg',
        large: 'https://img.youtube.com/vi/key/sddefault.jpg',
        extra_large: 'https://img.youtube.com/vi/key/maxresdefault.jpg',
      },
    },
  ],
};
