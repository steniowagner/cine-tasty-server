export default `#graphql
  interface BaseFamousCast {
    backdropPath: String
    character: String
    creditId: String
    id: Int!
    genres(language: ISO6391Language): [String!]!
    mediaType: String
    originalLanguage: String
    overview: String
    popularity: Float
    posterPath: String
    voteAverage: Float
    voteCount: Float
  }

  type FamousCastMovie implements BaseFamousCast {
    adult: Boolean
    backdropPath: String
    character: String
    creditId: String
    genres(language: ISO6391Language): [String!]!
    id: Int!
    originalLanguage: String
    originalTitle: String
    popularity: Float
    posterPath: String
    mediaType: String
    overview: String
    releaseDate: String
    title: String
    video: Boolean
    voteAverage: Float
    voteCount: Float
  }

  type FamousCastTVShow implements BaseFamousCast {
    backdropPath: String
    character: String
    creditId: String
    episodeCount: Int
    firstAirDate: String
    genres(language: ISO6391Language): [String!]!
    id: Int!
    mediaType: String
    name: String
    originalLanguage: String
    originalName: String
    originCountry: [String!]!
    overview: String
    popularity: Float
    posterPath: String
    voteAverage: Float
    voteCount: Float
  }

  type MediaCast {
    adult: Boolean
    id: Int!
    knownForDepartment: String
    name: String
    originalName: String
    popularity: Float
    profilePath: String
    character: String
    creditId: String
    order: Int
  }
`;
