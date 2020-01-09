import { getGenres } from '../../../../../graphql/datasources/the-movie-db-api/helpers';

const movieGenres = [{
  id: 1,
  name: 'Action',
}];

const tvGenres = [{
  id: 2,
  name: 'Drama',
}];

describe('[getGenres]', () => {
  it('should the genres of movies correctly', () => {
    expect(getGenres({
      tvShowGenres: tvGenres,
      movieGenres: movieGenres,
      genresIds: [1],
      mediaTypes: 'movie'
    })).toEqual(['Action']);
  });

  it('should the genres of tv shows correctly', () => {
    expect(getGenres({
      tvShowGenres: tvGenres,
      movieGenres: movieGenres,
      genresIds: [2],
      mediaTypes: 'tv'
    })).toEqual(['Drama']);
  });

  it('should the genres of movies correctly when the genre is not found', () => {
    expect(getGenres({
      tvShowGenres: tvGenres,
      movieGenres: movieGenres,
      genresIds: [3],
      mediaTypes: 'movie'
    })).toEqual([]);
  });

  it('should the genres of tv shows correctly  when the genre is not found', () => {
    expect(getGenres({
      tvShowGenres: tvGenres,
      movieGenres: movieGenres,
      genresIds: [3],
      mediaTypes: 'tv'
    })).toEqual([]);
  });
});
