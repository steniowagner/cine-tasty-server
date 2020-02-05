import { ApolloError } from 'apollo-server';

export class ResourceNotFound extends ApolloError {
  constructor() {
    super('The resource requested could not be found.');
  }
}
