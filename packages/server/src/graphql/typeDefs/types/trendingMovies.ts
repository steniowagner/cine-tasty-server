import { gql } from 'apollo-server';

export default gql`
  input TrendingMoviesInput {
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
    now_playing(input: TrendingMoviesInput!): TrendingMoviesQueryResult!
    popular(input: TrendingMoviesInput!): TrendingMoviesQueryResult!
    top_rated(input: TrendingMoviesInput!): TrendingMoviesQueryResult!
    upcoming(input: TrendingMoviesInput!): TrendingMoviesQueryResult!
  }
`;
