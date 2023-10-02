export default `#graphql
  type TrendingFamousKnownForTVShow {
    backdropPath: String
    firstAirDate: String
    genres(language: ISO6391Language): [String!]!
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

  type TrendingFamousKnownForMovie {
    adult: Boolean
    backdropPath: String
    genres(language: ISO6391Language): [String!]!
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

  union TrendingFamousKnownFor = TrendingFamousKnownForTVShow | TrendingFamousKnownForMovie

  type TrendingFamousItem {
    adult: Boolean
    gender: Int
    id: Int
    knownFor: [TrendingFamousKnownFor!]!
    knownForDepartment: String
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
