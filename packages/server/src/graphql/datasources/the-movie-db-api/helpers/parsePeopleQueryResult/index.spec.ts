import { rawPerson, person } from '../../../../../__tests__/mocks/people.stub';
import { MediaGenre } from '../../../../../types';
import parsePeopleQueryResult from '.';

const tvShowGenres: MediaGenre[] = [
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
];

const movieGenres: MediaGenre[] = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
];

describe('[parsePeopleQueryResult]', () => {
  it('should parse the result object correctly', () => {
    expect(
      parsePeopleQueryResult(rawPerson, { movie: movieGenres, tv: tvShowGenres }),
    ).toEqual(person);
  });
});
