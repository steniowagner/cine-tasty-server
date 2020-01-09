const rawKnowForWithOriginalTitle = {
  original_title: 'original_title',
  original_language: 'original_language',
  backdrop_path: 'backdrop_path',
  release_date: 'release_date',
  poster_path: 'poster_path',
  vote_average: 1.2,
  media_type: 'media_type',
  adult: true,
  overview: 'overview',
  genre_ids: [1, 2, 3],
  vote_count: 12,
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
  media_type: 'media_type',
  adult: true,
  overview: 'overview',
  genre_ids: [1, 2, 3],
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
  mediaType: 'media_type',
  isAdult: true,
  overview: 'overview',
  genreIds: [1, 2, 3],
  voteCount: 12,
  title: 'title',
  id: 'id',
};

const knowForWithOriginalName = {
  originalTitle: 'original_name',
  originalLanguage: 'original_language',
  backdropImage: 'backdrop_path',
  releaseDate: 'release_date',
  posterImage: 'poster_path',
  voteAverage: 1.2,
  mediaType: 'media_type',
  isAdult: true,
  overview: 'overview',
  genreIds: [1, 2, 3],
  voteCount: 12,
  title: 'title',
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
