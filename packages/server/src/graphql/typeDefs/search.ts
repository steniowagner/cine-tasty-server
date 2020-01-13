import { gql } from 'apollo-server';

export default gql`
  enum SearchType {
    PERSON
    MOVIE
    TV
  }

  union SearchResultItem = BasePerson | BaseMovie | BaseTVShow

  type SearchResult {
    total_results: Int!
    items: [SearchResultItem!]!
    hasMore: Boolean!
  }

  extend type Query {
    search(
      page: Int!
      query: String!
      type: SearchType!
      language: ISO6391Language
    ): SearchResult
  }
`;
