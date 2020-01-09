const rawKnowForWithOriginalTitle = {
  original_title: 'original_title',
  original_language: 'original_language',
  backdrop_path: 'backdrop_path',
  release_date: 'release_date',
  poster_path: 'poster_path',
  vote_average: 1.2,
  media_type: 'tv',
  adult: true,
  overview: 'overview',
  genre_ids: [16, 35],
  vote_count: 12,
  title: 'title',
  id: 'id',
};

const knowForWithOriginalTitle = {
  originalTitle: 'original_title',
  originalLanguage: 'original_language',
  backdropImage: 'backdrop_path',
  releaseDate: 'release_date',
  posterImage: 'poster_path',
  voteAverage: 1.2,
  mediaType: 'tv',
  isAdult: true,
  overview: 'overview',
  genres: ['Animation', 'Comedy'],
  voteCount: 12,
  title: 'title',
  id: 'id',
};

const rawKnowForWithOriginalName = {
  original_name: 'original_name',
  original_language: 'original_language',
  backdrop_path: 'backdrop_path',
  release_date: 'release_date',
  poster_path: 'poster_path',
  vote_average: 1.2,
  media_type: 'movie',
  adult: true,
  overview: 'overview',
  genre_ids: [28, 12],
  vote_count: 12,
  name: 'name',
  id: 'id',
};


const knowForWithOriginalName = {
  originalTitle: 'original_name',
  originalLanguage: 'original_language',
  backdropImage: 'backdrop_path',
  releaseDate: 'release_date',
  posterImage: 'poster_path',
  voteAverage: 1.2,
  mediaType: 'movie',
  isAdult: true,
  overview: 'overview',
  genres: ['Action', 'Adventure'],
  voteCount: 12,
  title: 'name',
  id: 'id',
};

export const rawPerson = {
  known_for_department: 'known_for_department',
  profile_path: 'profile_path',
  known_for: [rawKnowForWithOriginalName, rawKnowForWithOriginalTitle],
  popularity: 123,
  adult: true,
  name: 'name',
  gender: 1,
  id: 'id',
};

export const person = {
  knownForDepartment: 'known_for_department',
  profileImage: 'profile_path',
  knownFor: [knowForWithOriginalName, knowForWithOriginalTitle],
  popularity: 123,
  adult: true,
  name: 'name',
  gender: 1,
  id: 'id',
}
