export default `#graphql
  type SearchTVShowItem {
    adult: Boolean
    backdropPath: String
    genres(language: ISO6391Language): [String!]!
    id: Int!
    originCountry: [String!]!
    originalLanguage: String
    originalName: String
    overview: String
    popularity: Float
    posterPath: String
    firstAirDate: String
    name: String
    voteAverage: Float
    voteCount: Int
  }

  type SearchTVShowsResult {
    totalResults: Int!
    totalPages: Int!
    items: [SearchTVShowItem!]!
    hasMore: Boolean!
  }
`;