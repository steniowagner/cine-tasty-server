import {
  GetPersonCastResultType,
  GetPersonDetailsResult,
  GetPersonImagesResult,
  MediaGenre,
} from '../../../../../types';
import { Person } from '../../../../../lib/types';
import parsePersonQueryResult from '.';

const tvShowGenres: MediaGenre[] = [
  {
    id: 16,
    name: 'Animation',
  },
];

const movieGenres: MediaGenre[] = [
  {
    id: 28,
    name: 'Action',
  },
];

const details: GetPersonDetailsResult = {
  known_for_department: 'knownForDepartment',
  also_known_as: ['aka1', 'aka2'],
  place_of_birth: 'earth',
  profile_path: '/img.png',
  popularity: 10.1,
  homepage: 'www.com',
  biography: 'lorem ipsum',
  birthday: '1994-02-21',
  deathday: 'not-yet',
  imdb_id: 'imdbId',
  gender: 1,
  adult: true,
  name: 'myself',
  id: 123,
};

const castDetails: GetPersonCastResultType[] = [
  {
    original_language: 'pt-br',
    original_title: 'original_title',
    backdrop_path: 'backdrop_path',
    poster_path: 'poster_path',
    vote_average: 123,
    media_type: 'tv',
    genre_ids: [16],
    release_date: '1994-02-21',
    vote_count: 12,
    popularity: 12.12,
    character: 'character',
    credit_id: '123',
    overview: 'overview',
    adult: true,
    video: false,
    title: 'title',
    id: 123,
  },
  {
    original_language: 'pt-br',
    original_title: 'original_title',
    backdrop_path: 'backdrop_path',
    poster_path: 'poster_path',
    vote_average: 123,
    media_type: 'movie',
    genre_ids: [28],
    release_date: '1994-02-21',
    vote_count: 12,
    popularity: 12.12,
    character: 'character',
    credit_id: '123',
    overview: 'overview',
    adult: true,
    video: false,
    title: 'title',
    id: 123,
  },
];

const images: GetPersonImagesResult = {
  id: 123,
  profiles: [
    {
      vote_average: 123,
      aspect_ratio: 123.0033,
      vote_count: 123,
      file_path: '/123.jpg',
      height: 123,
      width: 123,
    },
    {
      vote_average: 321,
      aspect_ratio: 321.0033,
      vote_count: 321,
      file_path: '/321.png',
      height: 321,
      width: 321,
    },
  ],
};

const person: Person = {
  knownForDepartment: 'knownForDepartment',
  imagesGallery: ['/123.jpg', '/321.png'],
  alsoKnownAs: ['aka1', 'aka2'],
  placeOfBirth: 'earth',
  profileImage: '/img.png',
  biography: 'lorem ipsum',
  homepage: 'www.com',
  popularity: 10.1,
  birthday: '1994-02-21',
  deathday: 'not-yet',
  cast: [
    {
      originalLanguage: 'pt-br',
      originalTitle: 'original_title',
      backdropImage: 'backdrop_path',
      releaseDate: '1994-02-21',
      poster: 'poster_path',
      genres: ['Animation'],
      voteAvarage: 123,
      popularity: 12.12,
      character: 'character',
      mediaType: 'tv',
      overview: 'overview',
      voteCount: 12,
      video: false,
      adult: true,
      title: 'title',
      creditId: '123',
      id: 123,
    },
    {
      originalLanguage: 'pt-br',
      originalTitle: 'original_title',
      backdropImage: 'backdrop_path',
      releaseDate: '1994-02-21',
      poster: 'poster_path',
      genres: ['Action'],
      voteAvarage: 123,
      popularity: 12.12,
      character: 'character',
      mediaType: 'movie',
      overview: 'overview',
      voteCount: 12,
      video: false,
      adult: true,
      title: 'title',
      creditId: '123',
      id: 123,
    },
  ],
  imbdId: 'imdbId',
  adult: true,
  name: 'myself',
  gender: 1,
  id: 123,
};

describe('[parsePersonQueryResult]', () => {
  it('should parse the result object correctly', () => {
    const params = {
      images,
      genres: {
        tv: tvShowGenres,
        movie: movieGenres,
      },
      details,
      castDetails,
    };

    expect(parsePersonQueryResult(params)).toEqual(person);
  });
});
