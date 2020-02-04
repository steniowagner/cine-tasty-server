import { gql } from 'apollo-server';

export default gql`
  type CastItem {
    name: String
    profile_path: String
    id: ID
    character: String
  }

  type CrewItem {
    department: String
    id: ID
    job: String
    name: String
    profile_path: String
  }

  type MovieVideoThumbnail {
    "120x90"
    extra_small: String
    "320x180"
    small: String
    "480x360"
    medium: String
    "640x480"
    large: String
    "1280x720"
    extra_large: String
  }

  type MovieVideo {
    thumbnail: MovieVideoThumbnail
    key: String
    name: String
    site: String
    id: ID
    type: String
  }

  type ProductionCompanyItem {
    id: ID
    logo_path: String
    name: String
    origin_country: String
  }

  type ReviewItem {
    author: String
    content: String
    id: ID
    url: String
  }

  type ReviewsQueryResult {
    total_results: Int!
    total_pages: Int!
    items: [ReviewItem!]!
    hasMore: Boolean!
  }

  type SimilarMoviesQueryResult {
    total_results: Int!
    total_pages: Int!
    items: [BaseMovie!]!
    hasMore: Boolean!
  }

  type Movie {
    adult: Boolean
    backdrop_path: String
    genres(language: ISO6391Language): [String!]!
    id: ID
    original_language: String
    original_title: String
    overview: String
    poster_path: String
    popularity: Float
    video: Boolean
    title: String
    vote_average: Float
    release_date: String
    production_companies: [ProductionCompanyItem!]!
    vote_count: Float
    runtime: Float
    spoken_languages: [String!]!
    status: String
    tagline: String
    budget: Float
    homepage: String
    revenue: Float
    production_countries: [String!]!
    similar(
      id: ID!
      similarsPage: Int!
      language: ISO6391Language
    ): SimilarMoviesQueryResult!
    reviews(id: ID!, reviewsPage: Int!): ReviewsQueryResult!
    cast: [CastItem!]!
    crew: [CrewItem!]!
    videos: [MovieVideo!]!
  }

  type BaseMovie {
    original_title: String
    video: Boolean
    title: String
    adult: Boolean
    release_date: String
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

  input TrendingMoviesArgs {
    language: ISO6391Language
    page: Int!
  }

  type TrendingMoviesQueryResult {
    total_results: Int!
    total_pages: Int!
    items: [BaseMovie!]!
    hasMore: Boolean!
  }

  type TrendingMovies {
    now_playing(args: TrendingMoviesArgs!): TrendingMoviesQueryResult!
    popular(args: TrendingMoviesArgs!): TrendingMoviesQueryResult!
    top_rated(args: TrendingMoviesArgs!): TrendingMoviesQueryResult!
    upcoming(args: TrendingMoviesArgs!): TrendingMoviesQueryResult!
  }
`;
