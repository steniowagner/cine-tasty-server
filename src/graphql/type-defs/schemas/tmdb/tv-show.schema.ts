export default `#graphql
  type Seasons {
    airDate: String
    episodeCount: Int
    id: Int
    name: String
    overview: String
    posterPath: String
    seasonNumber: Int
    voteAverage: Float
  }

  type ProductionCompanies {
    id: Int!
    logoPath: String
    name: String
    originCountry: String
  }

  type Networks {
    id: Int!
    logoPath: String
    name: String
    originCountry: String
  }

  type LastEpisodeToAir {
    id: Int!
    name: String
    overview: String
    voteAverage: Float
    voteCount: Int
    airDate: String
    episodeNumber: Int
    productionCode: String
    runtime: Int
    seasonNumber: Int
    showId: Int
    stillPath: String
  }

  type CreatedBy {
    id: Int!
    creditId: String
    name: String
    gender: Int
    profilePath: String
  }

  type TVShow {
    adult: Boolean
    backdropPath: String
    createdBy: [CreatedBy!]!
    episodeRunTime: [Int!]!
    firstAirDate: String
    genres(language: ISO6391Language): [String!]!
    homepage: String
    id: Int!
    inProduction: Boolean
    languages: [String!]!
    lastAirDate: String
    lastEpisodeToAir: LastEpisodeToAir
    name: String
    nextEpisodeToAir: String
    networks: [Networks!]!
    numberOfEpisodes: Int
    numberOfSeasons: Int
    originCountry: [String!]!
    originalLanguage: String
    originalName: String,
    overview: String
    popularity: Float
    posterPath: String
    productionCompanies: [ProductionCompanies!]!
    productionCountries: [String!]!
    seasons: [Seasons!]!
    spokenLanguages: [String!]!
    status: String
    tagline: String
    type: String
    voteAverage: Float
    voteCount: Int
  }
`;
