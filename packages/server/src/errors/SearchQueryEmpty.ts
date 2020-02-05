import { ApolloError } from 'apollo-server';

export class SearchQueryEmpty extends ApolloError {
  constructor() {
    super('Search query cannot be empty.');
  }
}
