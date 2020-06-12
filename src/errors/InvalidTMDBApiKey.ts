import { ApolloError } from 'apollo-server';

export class InvalidTMDBApiKeyError extends ApolloError {
  constructor() {
    super('Invalid API key: You must be granted a valid key.');
  }
}
