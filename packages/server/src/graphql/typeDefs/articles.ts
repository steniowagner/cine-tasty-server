import { gql } from 'apollo-server';

export default gql`
  type Article {
    url: String!
    title: String!
  }

  extend type Query {
    articles: Article!
  }
`;
