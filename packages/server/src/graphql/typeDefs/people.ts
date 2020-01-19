import { gql } from 'apollo-server';

export default gql`
  type PeopleQueryResult {
    total_results: Int!
    total_pages: Int!
    items: [BasePerson!]!
    hasMore: Boolean!
  }

  extend type Query {
    people(page: Int!, language: ISO6391Language): PeopleQueryResult!
  }
`;
