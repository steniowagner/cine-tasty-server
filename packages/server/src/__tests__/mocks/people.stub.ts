import { KnownForResult, BasePersonResponse } from '../../types';
import { KnownFor, PeopleQueryItem } from '../../lib/types';
import { movieGenres, tvGenres } from './mediaGenres.stub';

const rawKnowForWithOriginalTitle: KnownForResult = {
  original_title: 'original_title',
  original_language: 'original_language',
  backdrop_path: 'backdrop_path',
  release_date: 'release_date',
  poster_path: 'poster_path',
  vote_average: 1.2,
  media_type: 'tv',
  adult: true,
  video: false,
  overview: 'overview',
  genre_ids: tvGenres.map(genre => genre.id),
  vote_count: 12,
  title: 'title',
  id: 1,
};

const knowForWithOriginalTitle: KnownFor = {
  originalTitle: 'original_title',
  originalLanguage: 'original_language',
  backdropImage: 'backdrop_path',
  releaseDate: 'release_date',
  posterImage: 'poster_path',
  voteAverage: 1.2,
  mediaType: 'tv',
  isAdult: true,
  overview: 'overview',
  genres: tvGenres.map(genre => genre.name),
  voteCount: 12,
  title: 'title',
  id: '1',
};

const rawKnownForWithOriginalName: KnownForResult = {
  original_name: 'original_name',
  original_language: 'original_language',
  backdrop_path: 'backdrop_path',
  release_date: 'release_date',
  poster_path: 'poster_path',
  vote_average: 1.2,
  media_type: 'movie',
  adult: true,
  overview: 'overview',
  genre_ids: movieGenres.map(genre => genre.id),
  video: false,
  vote_count: 12,
  name: 'name',
  id: 2,
};

const knownForWithOriginalName: KnownFor = {
  originalTitle: 'original_name',
  originalLanguage: 'original_language',
  backdropImage: 'backdrop_path',
  releaseDate: 'release_date',
  posterImage: 'poster_path',
  voteAverage: 1.2,
  mediaType: 'movie',
  isAdult: true,
  overview: 'overview',
  genres: movieGenres.map(genre => genre.name),
  voteCount: 12,
  title: 'name',
  id: '2',
};

export const personQueryResult: BasePersonResponse = {
  known_for_department: 'known_for_department',
  profile_path: 'profile_path',
  known_for: [rawKnownForWithOriginalName, rawKnowForWithOriginalTitle],
  popularity: 123,
  adult: true,
  name: 'name',
  gender: 1,
  id: 3,
};

export const person: PeopleQueryItem = {
  knownForDepartment: 'known_for_department',
  profileImage: 'profile_path',
  knownFor: [knownForWithOriginalName, knowForWithOriginalTitle],
  popularity: 123,
  adult: true,
  name: 'name',
  gender: 1,
  id: '3',
};
