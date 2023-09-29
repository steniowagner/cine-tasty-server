export default `#graphql
  extend type Query {
    quiz(input: QuizInput!): [QuizQuestion!]!
    news(page: Int!, language: NewsLanguage!): NewsResult!
    famous(id: Int!, language: ISO6391Language): Famous
  }
`;
