import { gql } from 'apollo-server';

export default gql`
  type PeopleQueryResult {
    total_results: Int!
    total_pages: Int!
    items: [BasePerson!]!
    hasMore: Boolean!
  }
`;
