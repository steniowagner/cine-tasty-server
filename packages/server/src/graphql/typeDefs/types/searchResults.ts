import { gql } from 'apollo-server';

export default gql`
  union SearchResultItem = BasePerson | BaseMovie | BaseTVShow

  type SearchResult {
    total_results: Int!
    items: [SearchResultItem!]!
    hasMore: Boolean!
  }
`;
