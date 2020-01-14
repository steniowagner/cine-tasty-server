import { gql } from 'apollo-server';

export default gql`
  enum MediaType {
    MOVIE
    TV
  }

  type BasePerson {
    profile_path: String
    adult: Boolean
    id: Int
    popularity: Float
    known_for: [PersonKnowFor!]!
    name: String
  }

  type PersonDetails {
    birthday: String
    known_for_department: String
    deathday: String
    id: Int
    name: String
    also_known_as: [String!]
    gender: Int
    biography: String
    popularity: Float
    place_of_birth: String
    profile_path: String
    adult: Boolean
    imdb_id: String
    homepage: String
  }

  union PersonKnowFor = BaseMovie | BaseTVShow

  type BaseMovie {
    original_title: String
    video: Boolean
    title: String
    adult: Boolean
    release_date: String
    backdrop_path: String
    genres: [String!]!
    overview: String
    vote_average: Float
    media_type: String
    poster_path: String
    popularity: Float
    original_language: String
    vote_count: Float
    id: Int
  }

  type BaseTVShow {
    origin_country: [String!]!
    original_name: String
    name: String
    first_air_date: String
    backdrop_path: String
    genres: [String!]!
    overview: String
    vote_average: Float
    media_type: String
    poster_path: String
    popularity: Float
    original_language: String
    vote_count: Float
    id: Int
  }

  type Query {
    _: String
  }
`;
