import { gql } from 'apollo-server';

export default gql`
  enum Language {
    AR
    DE
    EN
    ES
    FR
    HE
    IT
    NL
    NO
    PT
    RU
    SE
    UD
    ZH
  }

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

  type ArticleQueryResult {
    items: [Article!]!
    hasMore: Boolean!
  }

  extend type Query {
    articles(page: Int!, language: Language): ArticleQueryResult!
  }
`;
