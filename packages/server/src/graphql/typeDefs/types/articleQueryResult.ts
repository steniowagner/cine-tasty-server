import { gql } from 'apollo-server';

export default gql`
  type ArticleQueryResult {
    items: [Article!]!
    hasMore: Boolean!
  }
`;
