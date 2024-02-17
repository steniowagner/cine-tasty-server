export default `#graphql
  "Describes the TV-Show-Episode guest-star of a TV-Show-Season-Episode"
  type TVShowEpisodeGuestStar {
    "TV-Show-Season-Episode guest-star character"
    character: String
    "TV-Show-Season-Episode guest-star credit-id"
    creditId: String
    "TV-Show-Season-Episode guest-star order"
    order: Int
    "Indicates if the TV-Show-Season-Episode is adult"
    adult: Boolean
    "TV-Show-Season-Episode gender"
    gender: Int
    "TV-Show-Season-Episode id"
    id: Int!
    "Department in which the TV-Show-Season-Episode-Crew member works (filming, acting...)"
    knownForDepartment: String
    "TV-Show-Season-Episode name"
    name: String
    "TV-Show-Season-Episode original name"
    originalName: String
    "Number indicating the popularity of the TV-Show-Season-Episode-Crew member"
    popularity: Float
    "Profile image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    profilePath: String
  }

  "Describes the Crew-member of a TV-Show-Season-Episode"
  type TVShowEpisodeCrew {
    "TV-Show-Season-Episode crew-member job"
    job: String
    "Deparment in which the crew-member works (filming, acting, directing...)"
    department: String
    "TV-Show-Season-Episode-Crew member id"
    creditId: String
    "Indicates if the TV-Show-Season-Episode-Crew member member is adult"
    adult: Boolean
    "TV-Show-Season-Episode-Crew member gender"
    gender: Int
    "TV-Show-Season-Episode-Crew member id"
    id: Int!
    "Department in which the TV-Show-Season-Episode-Crew member works (filming, acting...)"
    knownForDepartment: String
    "TV-Show-Season-Episode-Crew member name"
    name: String
    "TV-Show-Season-Episode-Crew member original name"
    originalName: String
    "Number indicating the popularity of the TV-Show-Season-Episode-Crew member"
    popularity: Float
    "Profile image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    profilePath: String
  }

  "Describes a TV-Show-Season Episode"
  type Episode {
    "TV-Show-Season-Episode air-date (MM-DD-YYYY)"
    airDate: String
    "TV-Show-Season-Episode number"
    episodeNumber: Int
    "TV-Show-Season-Episode type"
    episodeType: String
    "TV-Show-Season-Episode id"
    id: Int!
    "TV-Show-Season-Episode crew"
    crew: [TVShowEpisodeCrew!]!
    "TV-Show-Season-Episode guests stars"
    guestStars: [TVShowEpisodeGuestStar!]!
    "TV-Show-Season-Episode name"
    name: String
    "TV-Show-Season-Episode overview"
    overview: String
    "TV-Show-Season-Episode production code"
    productionCode: String
    "TV-Show-Season-Episode runtime"
    runtime: Int
    "TV-Show-Season-Episode season number"
    seasonNumber: Int
    "TV-Show-Season-Episode TV-Show id"
    showId: Int
    "Still image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    stillPath: String
    "Number indicating the average of votes for the Episode"
    voteAverage: Float
    "Number indicating how many votes the Episode has"
    voteCount: Int
  }

  "Describes a TV-Show-Season"
  type TVShowSeason {
    "TV-Show-Season id"
    _id: ID!
    "Tv-Show-Season air-date (MM-DD-YYYY)"
    airDate: String
    "TV-Show-Season episodes"
    episodes: [Episode!]!
    "TV-Show-Season name"
    name: String
    "TV-Show-Season overview"
    overview: String,
    "TV-Show-Season id"
    id: Int
    "Poster image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    posterPath: String
    "TV-Show-Season number"
    seasonNumber: Int
    "Number indicating the average of votes for the Searched Movie"
    voteAverage: Float
  }

  "Describes the Input used for TV-Show-Season-Details"
  input TVShowSeasonInput {
    "TV-Show id"
    id: Int!
    "TV-Show season"
    season: Int!
    "Language in which the results should be presented"
    language: ISO6391Language
  }
`;
