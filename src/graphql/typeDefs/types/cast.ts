import { gql } from 'apollo-server';

export default gql`
  interface Cast {
    character: String
    backdrop_path: String
    overview: String
    vote_average: Float
    media_type: String
    poster_path: String
    popularity: Float
    original_language: String
    genre_ids(language: ISO6391Language): [String!]!
    vote_count: Float
    credit_id: String
    id: Int
  }

  type CastMovie implements Cast {
    original_title: String
    video: Boolean
    title: String
    adult: Boolean
    release_date: String
    character: String
    backdrop_path: String
    genre_ids(language: ISO6391Language): [String!]!
    overview: String
    vote_average: Float
    media_type: String
    poster_path: String
    popularity: Float
    original_language: String
    vote_count: Float
    credit_id: String
    id: Int
  }

  type CastTVShow implements Cast {
    episode_count: Int
    origin_country: [String!]!
    original_name: String
    name: String
    first_air_date: String
    character: String
    backdrop_path: String
    genre_ids(language: ISO6391Language): [String!]!
    overview: String
    vote_average: Float
    media_type: String
    poster_path: String
    popularity: Float
    original_language: String
    vote_count: Float
    credit_id: String
    id: Int
  }

  type CastItem {
    name: String
    profile_path: String
    id: ID
    character: String
    gender: Int
    order: Int
  }

  type CrewItem {
    department: String
    id: ID
    job: String
    name: String
    gender: Int
    profile_path: String
  }
`;
