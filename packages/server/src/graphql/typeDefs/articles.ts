import { gql } from 'apollo-server';

export default gql`
  type Article {
    publishedAt: String!
    source: String!
    author: String!
    title: String!
    image: String!
    url: String!
    id: ID!
  }

  type Articles {
    items: [Article!]!
    hasMore: Boolean!
  }

  extend type Query {
    articles(page: Int!): Articles!
  }
`;
