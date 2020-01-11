import {
  images,
  castDetails,
  details,
  person,
} from '../../../../../__tests__/mocks/person.stub';
import { movieGenres, tvGenres } from '../../../../../__tests__/mocks/mediaGenres.stub';
import parsePersonQueryResult from '.';

describe('[parsePersonQueryResult]', () => {
  it('should parse the result object correctly', () => {
    const params = {
      images,
      genres: {
        tv: tvGenres,
        movie: movieGenres,
      },
      details,
      cast: castDetails.cast,
    };

    expect(parsePersonQueryResult(params)).toEqual(person);
  });
});
