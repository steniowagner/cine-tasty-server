import { gql } from 'apollo-server';

export default gql`
  type Article {
    publishedAt: String
    description: String
    content: String
    source: String
    author: String
    title: String
    image: String
    url: String
    id: ID
  }
`;
