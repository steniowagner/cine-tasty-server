export default `#graphql
  type MovieProductionCompany {
    id: Int!
    logoPath: String
    name: String
    originCountry: String
  }

  type MovieBelongsToCollection {
    id: Int!
    name: String
    posterPath: String
    backdropPath: String
  }

  type SimilarMovie {
    adult: Boolean
    backdropPath: String
    id: Int!
    originalLanguage: String
    originalTitle: String
    overview: String
    popularity: Float
    posterPath: String
    releaseDate: String
    title: String
    voteAverage: Float
    voteCount: Int
  }

  type Movie {
    adult: Boolean
    backdropPath: String
    belongsToCollection: MovieBelongsToCollection
    budget: Float
    genres: [String!]!
    homepage: String
    id: Int!
    imdbId: String
    originalLanguage: String
    originalTitle: String
    overview: String
    popularity: Float
    posterPath: String
    productionCompanies: [MovieProductionCompany!]!
    productionCountries: [String!]!
    releaseDate: String
    revenue: Float
    runtime: Int
    spokenLanguages: [String!]!
    status: String
    tagline: String
    title: String
    video: Boolean
    voteAverage: Float
    voteCount: Int
    similar(id: Int!, language: ISO6391Language): [SimilarMovie!]!
    videos(id: Int!, language: ISO6391Language): [MediaVideo!]!
    images(id: Int!, language: ISO6391Language): [String!]!
    cast: [MediaCast!]!
    crew: [MediaCrew!]!
  }
`;
