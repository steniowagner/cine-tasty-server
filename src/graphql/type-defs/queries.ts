export default `#graphql
  extend type Query {
    news(page: Int!, language: NewsLanguage!): NewsResult!
  }
`;
