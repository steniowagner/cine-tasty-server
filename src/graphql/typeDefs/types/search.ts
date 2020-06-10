import { gql } from 'apollo-server';

export default gql`
  enum SearchType {
    PERSON
    MOVIE
    TV
  }

  union SearchResultItem = BasePerson | BaseMovie | BaseTVShow

  type SearchQueryResult {
    totalResults: Int!
    items: [SearchResultItem!]!
    hasMore: Boolean!
  }

  input SearchInput {
    page: Int!
    query: String!
    type: SearchType!
    language: ISO6391Language
  }
`;
