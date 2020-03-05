import { gql } from 'apollo-server';

export default gql`
  type Review {
    author: String
    content: String
    id: ID
    url: String
  }
`;
