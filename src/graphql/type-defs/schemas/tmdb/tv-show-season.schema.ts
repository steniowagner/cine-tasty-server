export default `#graphql
  type TVShowEpisodeGuestStar {
    character: String
    creditId: String
    order: Int
    adult: Boolean
    gender: Int
    id: Int!
    knownForDepartment: String
    name: String
    originalName: String
    popularity: Float
    profilePath: String
  }

  type TVShowEpisodeCrew {
    job: String
    department: String
    creditId: String
    adult: Boolean
    gender: Int
    id: Int!
    knownForDepartment: String
    name: String
    originalName: String
    popularity: Float
    profilePath: String
  }

  type Episode {
    airDate: String
    episodeNumber: Int
    episodeType: String
    id: Int!
    crew: [TVShowEpisodeCrew!]!
    guestStars: [TVShowEpisodeGuestStar!]!
    name: String
    overview: String
    productionCode: String
    runtime: Int
    seasonNumber: Int
    showId: Int
    stillPath: String
    voteAverage: Float
    voteCount: Int
  }

  type TVShowSeason {
    _id: ID!
    airDate: String
    episodes: [Episode!]!
    name: String
    overview: String,
    id: Int
    posterPath: String
    seasonNumber: Int
    voteAverage: Float
  }

  input TVShowSeasonInput {
    id: Int!
    season: Int!
    language: ISO6391Language
  }
`;
