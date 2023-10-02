export default `#graphql
  type TrendingFamousKnowForTVShow {
    backdropPath: String
    firstAirDate: String
    genres(input: SearchInput!): [String!]!
    id: Int!
    mediaType: String
    name: String
    originCountry: [String!]!
    originalLanguage: String
    originalName: String
    overview: String
    posterPath: String
    voteAverage: Float
    voteCount: Int
  }

  type TrendingFamousKnowForMovie {
    adult: Boolean
    backdropPath: String
    genres(input: SearchInput!): [String!]!
    id: Int!
    mediaType: String
    originalLanguage: String
    originalTitle: String
    overview: String
    posterPath: String
    releaseDate: String
    title: String
    video: Boolean
    voteAverage: Float
    voteCount: Int
  }

  union TrendingFamousKnownFor = TrendingFamousKnowForTVShow | TrendingFamousKnowForMovie

  type TrendingFamousItem {
    adult: Boolean
    gender: Int
    id: Int
    knownFor: [TrendingFamousKnownFor!]!
    name: String
    popularity: Float
    profilePath: String
  }

  type TrendingFamousResult {
    totalResults: Int!
    totalPages: Int!
    items: [TrendingFamousItem!]!
    hasMore: Boolean!
  }
`;
