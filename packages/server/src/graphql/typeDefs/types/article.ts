import { gql } from 'apollo-server';

export default gql`
  enum ArticleLanguage {
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

  type ArticleQueryResult {
    items: [Article!]!
    hasMore: Boolean!
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
`;
