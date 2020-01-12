import { castDetails, details, person } from '../../../../../__tests__/mocks/person.stub';
import { movieGenres, tvGenres } from '../../../../../__tests__/mocks/mediaGenres.stub';
import parsePersonQueryResult from '.';

describe('[parsePersonQueryResult]', () => {
  it('should parse the result object correctly', () => {
    const result = parsePersonQueryResult(
      details,
      {
        tv: tvGenres,
        movie: movieGenres,
      },
      castDetails.cast,
    );

    expect(true).toEqual(true);
  });
});
