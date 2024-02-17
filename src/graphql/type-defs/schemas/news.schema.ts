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
    "Publication date"
    publishedAt: String
    "Description"
    description: String
    "Content"
    content: String
    "Source"
    source: String
    "Author"
    author: String
    "Title"
    title: String
    "Image"
    image: String
    "URL to the article source"
    url: String
    "Id attached to the Article"
    id: ID
  }

  type NewsResult {
    "Response array"
    items: [NewsArticle!]!
    "Indicates if there is more items to be fetched"
    hasMore: Boolean!
  }
`;
