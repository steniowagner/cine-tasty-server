export default `#graphql
  enum NewsLanguage {
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

  type NewsArticle {
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

  type NewsResult {
    items: [NewsArticle!]!
    hasMore: Boolean!
  }
`;
