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

  type Articles {
    items: [Article!]!
    hasMore: Boolean!
  }

  type ArticlesResult {
    items: [ArticleResponse!]!
    hasMore: Boolean!
  }

  type Source {
    name: String
    id: String
  }

  type ArticleResponse {
    description: String
    content: String
    urlToImage: String
    author: String
    publishedAt: String
    source: Source!
    url: String
    title: String
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
