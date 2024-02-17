export default `#graphql
  "Describes the Input used for Search"
  input SearchInput {
    "Search-page"
    page: Int!
    "Search-query"
    query: String!
    "In which language the results should be presented"
    language: ISO6391Language
  }
`;
