import People from '../../../../../graphql/datasources/the-movie-db-api/handlers/People';
import { HTTPCache } from 'apollo-datasource-rest';

import { rawPerson, person } from '../fixtures/parseResult.stub';

const datasource = new People(new HTTPCache());

describe('[TMDBAPI.People.getFormatedLanguage]', () => {
  it('should return en-us when no language is provided', () => {
    expect(datasource.getFormatedLanguage()).toEqual('en-us');
  });

  it('should return en-us when null is provided', () => {
    expect(datasource.getFormatedLanguage(null)).toEqual('en-us');
  });

  it('should return en-us when undefined is provided', () => {
    expect(datasource.getFormatedLanguage()).toEqual('en-us');
  });

  it("should format the language in lower-case and separate it in two groups of two characters separated by a '-' when the language size is 4", () => {
    expect(datasource.getFormatedLanguage('PTBR')).toEqual('pt-br');
  });

  it("should format the language in lower-case when the language size is 2", () => {
    expect(datasource.getFormatedLanguage('NL')).toEqual('nl');
  });
});

describe('[TMDBAPI.People.parseResult]', () => {
  it('should parse the result object correctly', () => {
    expect(datasource.parseResult(rawPerson)).toEqual(person);
  });
});
