import { movieGenres, tvGenres } from '../../../../../__tests__/mocks/mediaGenres.stub';
import { getGenres } from '..';

describe('[getGenres]', () => {
  it('should get the genres of a movie correctly', () => {
    expect(getGenres(movieGenres, [2])).toEqual(movieGenres.map(({ name }) => name));
  });

  it('should get the genres of a tv show correctly', () => {
    expect(getGenres(tvGenres, [1])).toEqual(tvGenres.map(({ name }) => name));
  });

  it('should return an empty array when the genre is not found', () => {
    expect(getGenres(movieGenres, [3])).toEqual([]);
  });

  it('should return an empty array when the genre is not found', () => {
    expect(getGenres(tvGenres, [3])).toEqual([]);
  });
});
