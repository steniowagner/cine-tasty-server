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

  extend type Query {
    articles(page: Int!): [Article!]!
  }
`;
