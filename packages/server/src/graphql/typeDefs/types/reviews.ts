import { gql } from 'apollo-server';

export default gql`
  type ReviewItem {
    author: String
    content: String
    id: ID
    url: String
  }

  type ReviewsQueryResult {
    total_results: Int!
    total_pages: Int!
    items: [ReviewItem!]!
    hasMore: Boolean!
  }
`;
