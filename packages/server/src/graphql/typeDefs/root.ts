import { gql } from 'apollo-server';

export default gql`
  enum MediaType {
    MOVIE
    TV
  }

  type Query {
    _: String
  }
`;
