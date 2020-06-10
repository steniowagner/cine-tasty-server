import { gql } from 'apollo-server';

export default gql`
  interface CastResponse {
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

  type CastMovieResponse implements CastResponse {
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

  type CastTVShowResponse implements CastResponse {
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

  interface Cast {
    character: String
    backdropPath: String
    overview: String
    voteAverage: Float
    mediaType: String
    posterPath: String
    popularity: Float
    originalLanguage: String
    genreIds(language: ISO6391Language): [String!]!
    voteCount: Float
    creditId: String
    id: Int
  }

  type CastMovie implements Cast {
    originalTitle: String
    video: Boolean
    title: String
    adult: Boolean
    releaseDate: String
    character: String
    backdropPath: String
    genreIds(language: ISO6391Language): [String!]!
    overview: String
    voteAverage: Float
    mediaType: String
    posterPath: String
    popularity: Float
    originalLanguage: String
    voteCount: Float
    creditId: String
    id: Int
  }

  type CastTVShow implements Cast {
    episodeCount: Int
    originCountry: [String!]!
    originalName: String
    name: String
    firstAirDate: String
    character: String
    backdropPath: String
    genreIds(language: ISO6391Language): [String!]!
    overview: String
    voteAverage: Float
    mediaType: String
    posterPath: String
    popularity: Float
    originalLanguage: String
    voteCount: Float
    creditId: String
    id: Int
  }

  type CastItemResponse {
    name: String
    profile_path: String
    id: ID
    character: String
    gender: Int
    order: Int
  }

  type CastItem {
    name: String
    profilePath: String
    id: ID
    character: String
    gender: Int
    order: Int
  }

  type CrewItemResponse {
    department: String
    id: ID
    job: String
    name: String
    gender: Int
    profile_path: String
  }

  type CrewItem {
    department: String
    id: ID
    job: String
    name: String
    gender: Int
    profilePath: String
  }
`;
