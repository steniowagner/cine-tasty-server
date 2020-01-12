import { tvGenres, movieGenres } from '../../../../../__tests__/mocks/mediaGenres.stub';
import { personQueryResult, person } from '../../../../../__tests__/mocks/people.stub';
import parsePeopleQueryResult from '.';

describe('[parsePeopleQueryResult]', () => {
  it('should parse the result object correctly', () => {
    expect(
      parsePeopleQueryResult(personQueryResult, {
        movie: movieGenres,
        tv: tvGenres,
      }),
    ).toEqual(person);
  });
});
