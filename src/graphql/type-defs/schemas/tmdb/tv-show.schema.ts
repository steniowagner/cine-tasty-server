export default `#graphql
  "Describes TV-Show Season"
  type Seasons {
    "TV-Show-Season air-date (MM-DD-YYYY)"
    airDate: String
    "TV-Show-Season episode count"
    episodeCount: Int
    "TV-Show-Season id"
    id: Int
    "TV-Show-Season name"
    name: String
    "TV-Show-Season overview"
    overview: String
    "Poster image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    posterPath: String
    "TV-Show-Season season number"
    seasonNumber: Int
    "Number indicating the average of votes for the TV-Show-Season"
    voteAverage: Float
  }

  "Describe the TV-Show Production companies"
  type ProductionCompanies {
    "TV-Show-Production-Companies id"
    id: Int!
    "Logo image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    logoPath: String
    "TV-Show-Production-Companies name"
    name: String
    "TV-Show-Production-Companies origin country"
    originCountry: String
  }

  "Describe the TV-Show Networks"
  type Networks {
    "TV-Show-Network id"
    id: Int!
    "Logo image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    logoPath: String
    "TV-Show-Network name"
    name: String
    "TV-Show-Network origin country"
    originCountry: String
  }

  "Describes the TV-Show last episode to air"
  type LastEpisodeToAir {
    "TV-Show-Last-Episode-To-Air id"
    id: Int!
    "TV-Show-Last-Episode-To-Air name"
    name: String
    "TV-Show-Last-Episode-To-Air overview"
    overview: String
    "Number indicating the average of votes for the TV-Show-Last-Episode"
    voteAverage: Float
    "Number indicating how many votes the TV-Show-Last-Episode has"
    voteCount: Int
    "TV-Show-Last-Episode-To-Air air-date (MM-DD-YYYY)"
    airDate: String
    "TV-Show-Last-Episode-To-Air episode number"
    episodeNumber: Int
    productionCode: String
    "TV-Show-Last-Episode-To-Air runtime"
    runtime: Int
    "TV-Show-Last-Episode-To-Air season number"
    seasonNumber: Int
    "TV-Show-Last-Episode-To-Air TV-Show id"
    showId: Int
    "Still image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    stillPath: String
  }

  "Describes TV-Show creators"
  type CreatedBy {
    "TV-Show creator id"
    id: Int!
    "TV-Show creator credit-id"
    creditId: String
    "TV-Show creator name"
    name: String
    "TV-Show creator gender"
    gender: Int
    "Profile image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    profilePath: String
  }

  "Describes a Similar-TV-Show"
  type SimilarTVShow {
    "Indicates if the Similar-TV-Show has the 'adult' classification"
    adult: Boolean
    "Backdrop image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    backdropPath: String
    "Similar-TV-Show id"
    id: Int!
    "Similar-TV-Show origin country"
    originCountry: [String!]!
    "Similar-TV-Show original language"
    originalLanguage: String
    "Similar-TV-Show original name"
    originalName: String
    "Similar-TV-Show overview"
    overview: String
    "Number indicating the popularity of the Similar-TV-Show"
    popularity: Float
    "Poster image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    posterPath: String
    "Similar-TV-Show first-air-date (MM-DD-YYYY)"
    firstAirDate: String
    "Similar-TV-Show name"
    name: String
    "Number indicating the average of votes for the Similar-TV-Show"
    voteAverage: Float
    "Number indicating how many votes the Similar-TV-Show has"
    voteCount: Int
  }

  "Describes a TV-Show"
  type TVShow {
    "Indicates if the TV-Show has the 'adult' classification"
    adult: Boolean
    "Backdrop image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    backdropPath: String
    "TV-Show creators"
    createdBy: [CreatedBy!]!
    "TV-Show runtime"
    episodeRunTime: [Int!]!
    "TV-Show first-air-date (MM-DD-YYYY)"
    firstAirDate: String
    "TV-Show genres"
    genres(language: ISO6391Language): [String!]!
    "TV-Show homepage"
    homepage: String
    "TV-Show id"
    id: Int!
    "Indicates if the TV-Show is in production"
    inProduction: Boolean
    "TV-Show languages"
    languages: [String!]!
    "TV-Show last-air-date (MM-DD-YYYY)"
    lastAirDate: String
    "TV-Show last episode to air"
    lastEpisodeToAir: LastEpisodeToAir
    "TV-Show name"
    name: String
    "TV-Show next episode to air"
    nextEpisodeToAir: String
    "TV-Show networks"
    networks: [Networks!]!
    "TV-Show number of episodes"
    numberOfEpisodes: Int
    "TV-Show number of seasons"
    numberOfSeasons: Int
    "TV-Show origin countries"
    originCountry: [String!]!
    "TV-Show original language"
    originalLanguage: String
    "TV-Show original name"
    originalName: String,
    "TV-Show overview"
    overview: String
    "Number indicating the popularity of the TV-Show"
    popularity: Float
    "Poster image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    posterPath: String
    "TV-Show production companies"
    productionCompanies: [ProductionCompanies!]!
    "TV-Show production countries"
    productionCountries: [String!]!
    "TV-Show seasons"
    seasons: [Seasons!]!
    "TV-Show spoken languages"
    spokenLanguages: [String!]!
    "TV-Show status"
    status: String
    "TV-Show tagline"
    tagline: String
    "TV-Show type"
    type: String
    "Number indicating the average of votes for the TV-Show"
    voteAverage: Float
    "Number indicating how many votes the TV-Show has"
    voteCount: Int
    "TV-Show images"
    images(id: Int!, language: ISO6391Language): [String!]!
    "Similar-TV-Shows"
    similar(id: Int!, language: ISO6391Language): [SimilarTVShow!]!
    "TV-Show videos"
    videos(id: Int!, language: ISO6391Language): [MediaVideo!]!
    "TV-Show cast"
    cast: [MediaCast!]!
    "TV-Show crew"
    crew: [MediaCrew!]!
  }
`;
