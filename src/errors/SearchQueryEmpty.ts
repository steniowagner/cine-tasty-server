import { ApolloError } from 'apollo-server';

export class SearchQueryEmptyError extends ApolloError {
  constructor() {
    super('Search query cannot be empty.');
  }
}
