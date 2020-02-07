import { gql } from 'apollo-server';

export default gql`
  type Creator {
    id: ID
    credit_id: String
    name: String
    gender: Int
    profile_path: String
  }

  type LastEpisodeToAir {
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

  type Network {
    name: String
    id: ID
    logo_path: String
    origin_country: String
  }

  type Season {
    air_date: String
    episode_count: Int
    id: ID
    name: String
    overview: String
    poster_path: String
    season_number: Int
  }

  type TVShow {
    seasons: [Season!]!
    last_episode_to_air: LastEpisodeToAir
    backdrop_path: String
    created_by: [Creator!]!
    networks: [Network!]!
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
    production_companies: [ProductionCompany!]!
    original_language: String
    original_name: String
    overview: String
    videos: [MediaVideo!]!
    popularity: Float
    poster_path: String
    cast: [CastItem!]!
    crew: [CrewItem!]!
    number_of_episodes: Int
    number_of_seasons: Int
    origin_country: [String!]!
    similar: [BaseTVShow!]!
    images(id: ID!): [String!]!

    reviews: [Review!]!
  }

  type BaseTVShow {
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

  type TrendingTVShowsQueryResult {
    total_results: Int!
    total_pages: Int!
    items: [BaseTVShow!]!
    hasMore: Boolean!
  }

  input TrendingTVShowsArgs {
    language: ISO6391Language
    page: Int!
  }

  type TrendingTVShows {
    on_the_air(args: TrendingTVShowsArgs!): TrendingTVShowsQueryResult!
    popular(args: TrendingTVShowsArgs!): TrendingTVShowsQueryResult!
    top_rated(args: TrendingTVShowsArgs!): TrendingTVShowsQueryResult!
  }
`;
