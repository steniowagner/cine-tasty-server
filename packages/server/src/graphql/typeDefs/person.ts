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

  type CastTV implements Cast {
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

  type PersonProfile {
    birthday: String
    known_for_department: String
    deathday: String
    id: Int
    name: String
    also_known_as: [String!]!
    place_of_birth: String
    profile_path: String
    adult: Boolean
    imdb_id: String
    homepage: String
    biography: String
    popularity: Float
    images: [String!]!
    gender: Int
    cast: [Cast!]!
  }

  extend type Query {
    person(id: Int!, language: ISO6391Language): PersonProfile
  }
`;
