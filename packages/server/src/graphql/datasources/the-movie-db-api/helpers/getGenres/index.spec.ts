import { MediaGenre, Genres } from '../../../../../types';
import { getGenres } from '..';

const movieGenres: MediaGenre[] = [
  {
    id: 1,
    name: 'Action',
  },
];

const tvGenres: MediaGenre[] = [
  {
    id: 2,
    name: 'Drama',
  },
];

const genres: Genres = {
  movie: movieGenres,
  tv: tvGenres,
};

describe('[getGenres]', () => {
  it('should get the genres of a movie correctly', () => {
    expect(getGenres(genres, [1], 'movie')).toEqual(['Action']);
  });

  it('should get the genres of a tv show correctly', () => {
    expect(getGenres(genres, [2], 'tv')).toEqual(['Drama']);
  });

  it('should return an empty array when the genre is not found', () => {
    expect(getGenres(genres, [3], 'movie')).toEqual([]);
  });

  it('should return an empty array when the genre is not found', () => {
    expect(getGenres(genres, [3], 'tv')).toEqual([]);
  });
});
