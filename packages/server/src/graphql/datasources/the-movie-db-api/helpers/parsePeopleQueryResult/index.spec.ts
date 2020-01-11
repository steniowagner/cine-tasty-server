import { tvGenres, movieGenres } from '../../../../../__tests__/mocks/mediaGenres.stub';
import { rawPerson, person } from '../../../../../__tests__/mocks/people.stub';
import parsePeopleQueryResult from '.';

describe('[parsePeopleQueryResult]', () => {
  it('should parse the result object correctly', () => {
    expect(
      parsePeopleQueryResult(rawPerson, {
        movie: movieGenres,
        tv: tvGenres,
      }),
    ).toEqual(person);
  });
});
