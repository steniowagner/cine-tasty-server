import { ApolloError } from 'apollo-server';

export class InvalidTMDBApiKey extends ApolloError {
  constructor() {
    super('Invalid API key: You must be granted a valid key.');
  }
}
