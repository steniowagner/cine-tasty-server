import { gql } from 'apollo-server';

export default gql`
  type CreatorResponse {
    id: ID
    credit_id: String
    name: String
    gender: Int
    profile_path: String
  }

  type Creator {
    id: ID
    creditId: String
    name: String
    gender: Int
    profilePath: String
  }

  type LastEpisodeToAirResponse {
    air_date: String
    episode_number: Int
    id: ID
    name: String
    overview: String
    production_code: String
    season_number: Int
    show_id: String
    still_path: String
    vote_average: Float
    vote_count: Int
  }

  type LastEpisodeToAir {
    airDate: String
    episodeNumber: Int
    id: ID
    name: String
    overview: String
    productionCode: String
    seasonNumber: Int
    showId: String
    stillPath: String
    voteAverage: Float
    voteCount: Int
  }

  type NetworkResponse {
    name: String
    id: ID
    logo_path: String
    origin_country: String
  }

  type Network {
    name: String
    id: ID
    logoPath: String
    originCountry: String
  }

  type SeasonResponse {
    air_date: String
    episode_count: Int
    id: ID
    name: String
    overview: String
    poster_path: String
    season_number: Int
  }

  type Season {
    airDate: String
    episodeCount: Int
    id: ID
    name: String
    overview: String
    posterPath: String
    seasonNumber: Int
  }

  type TVShowResponse {
    seasons: [Season!]!
    last_episode_to_air: LastEpisodeToAirResponse
    backdrop_path: String
    created_by: [CreatorResponse!]!
    networks: [NetworkResponse!]!
    episode_run_time: [Int!]!
    first_air_date: String
    homepage: String
    id: String
    in_production: Boolean
    languages: [String!]!
    last_air_date: String
    genres(language: ISO6391Language): [String!]!
    name: String
    status: String
    type: String
    vote_average: Float
    vote_count: Int
    production_companies: [ProductionCompanyResponse!]!
    original_language: String
    original_name: String
    overview: String
    videos: [MediaVideo!]!
    popularity: Float
    poster_path: String
    cast: [CastItemResponse!]!
    crew: [CrewItemResponse!]!
    number_of_episodes: Int
    number_of_seasons: Int
    origin_country: [String!]!
    similar: [BaseTVShowResponse!]!
    images(id: ID!): [String!]!
    reviews: [Review!]!
  }

  type TVShow {
    seasons: [Season!]!
    lastEpisodeToAir: LastEpisodeToAir
    backdropPath: String
    createdBy: [Creator!]!
    networks: [Network!]!
    episodeRunTime: [Int!]!
    firstAirDate: String
    homepage: String
    id: String
    inProduction: Boolean
    languages: [String!]!
    lastAirDate: String
    genres(language: ISO6391Language): [String!]!
    name: String
    status: String
    type: String
    voteAverage: Float
    voteCount: Int
    productionCompanies: [ProductionCompany!]!
    originalLanguage: String
    originalName: String
    overview: String
    videos: [MediaVideo!]!
    popularity: Float
    posterPath: String
    cast: [CastItem!]!
    crew: [CrewItem!]!
    numberOfEpisodes: Int
    numberOfSeasons: Int
    originCountry: [String!]!
    similar: [BaseTVShow!]!
    images(id: ID!): [String!]!
    reviews: [Review!]!
  }

  type BaseTVShowResponse {
    origin_country: [String!]!
    original_name: String
    name: String
    first_air_date: String
    backdrop_path: String
    genre_ids(language: ISO6391Language): [String!]!
    overview: String
    vote_average: Float
    media_type: String
    poster_path: String
    popularity: Float
    original_language: String
    vote_count: Int
    id: Int
  }

  type BaseTVShow {
    originCountry: [String!]!
    originalName: String
    name: String
    firstAirDate: String
    backdropPath: String
    genreIds(language: ISO6391Language): [String!]!
    overview: String
    voteAverage: Float
    mediaType: String
    posterPath: String
    popularity: Float
    originalLanguage: String
    voteCount: Int
    id: Int
  }

  type TrendingTVShowsQueryResult {
    totalResults: Int!
    totalPages: Int!
    items: [BaseTVShow!]!
    hasMore: Boolean!
  }

  input TrendingTVShowsArgs {
    language: ISO6391Language
    page: Int!
  }

  type TrendingTVShows {
    onTheAir(args: TrendingTVShowsArgs!): TrendingTVShowsQueryResult!
    popular(args: TrendingTVShowsArgs!): TrendingTVShowsQueryResult!
    topRated(args: TrendingTVShowsArgs!): TrendingTVShowsQueryResult!
  }
`;
