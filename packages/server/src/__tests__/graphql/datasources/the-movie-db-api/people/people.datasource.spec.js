import People from '../../../../../graphql/datasources/the-movie-db-api/handlers/People';

import { rawPerson, person } from '../fixtures/parseResult.stub';

const tvShowGenres = [{
  id: 16,
  name: 'Animation'
},
{
  id: 35,
  name: 'Comedy'
}];

const movieGenres = [
  {
    id: 28,
    name: 'Action'
  },
  {
    id: 12,
    name: 'Adventure'
  },
];

const datasource = new People(() => {}, tvShowGenres, movieGenres);

describe('[TMDBAPI.People.parseResult]', () => {
  it('should parse the result object correctly', () => {
    expect(datasource.parseResult(rawPerson)).toEqual(person);
  });
});
