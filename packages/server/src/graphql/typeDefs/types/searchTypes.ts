import { gql } from 'apollo-server';

export default gql`
  enum SearchType {
    PERSON
    MOVIE
    TV
  }
`;
