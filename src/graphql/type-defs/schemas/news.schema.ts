export default `#graphql
  enum NewsLanguage {
    "Arabic"
    AR
    "German"
    DE
    "English"
    EN
    "Spanish"
    ES
    "French"
    FR
    "Hebrew"
    HE
    "Italian"
    IT
    "Dutch"
    NL
    "Norwegian"
    NO
    "Portuguese"
    PT
    "Russian"
    RU
    "Northern Sami"
    SE
    "Mandarim"
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
