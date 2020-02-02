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

  type ReviewItem {
    author: String
    content: String
    id: ID
    url: String
  }

  type MovieTrailerThumbnail {
    extra_small: String
    small: String
    medium: String
    large: String
    extra_large: String
  }

  type MovieTrailer {
    thumbnail: MovieTrailerThumbnail
    key: String
    name: String
    site: String
    id: ID
  }

  type ProductionCompanyItem {
    id: ID
    logo_path: String
    name: String
    origin_country: String
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
    similar: [BaseMovie!]!
    reviews: [ReviewItem!]!
    cast: [CastItem!]!
    crew: [CrewItem!]!
    trailers: [MovieTrailer!]!
  }
`;
