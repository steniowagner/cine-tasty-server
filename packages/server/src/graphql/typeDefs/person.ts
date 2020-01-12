import { gql } from 'apollo-server';

export default gql`
  type KnownFor {
    originalTitle: String
    overview: String
    releaseDate: String
    posterImage: String
    originalLanguage: String
    voteAverage: Float
    isAdult: Boolean
    backdropImage: String
    genres: [String!]!
    voteCount: Int
    mediaType: String
    title: String
    id: ID
  }

  type PeopleQueryItem {
    knownForDepartment: String
    adult: Boolean
    profileImage: String
    popularity: Float
    name: String
    knownFor: [KnownFor!]!
    gender: Int
    id: ID
  }

  type PeopleQueryResult {
    items: [PeopleQueryItem!]!
    hasMore: Boolean!
  }

  interface Cast {
    character: String
    backdropImage: String
    overview: String
    voteAverage: Float
    mediaType: String
    posterImage: String
    popularity: Float
    originalLanguage: String
    genres: [String!]!
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
    backdropImage: String
    genres: [String!]!
    overview: String
    voteAverage: Float
    mediaType: String
    posterImage: String
    popularity: Float
    originalLanguage: String
    voteCount: Float
    creditId: String
    id: Int
  }

  type CastTV implements Cast {
    episodeCount: Int
    originCountry: [String!]!
    originalName: String
    name: String
    firstAirDate: String
    character: String
    backdropImage: String
    genres: [String!]!
    overview: String
    voteAverage: Float
    mediaType: String
    posterImage: String
    popularity: Float
    originalLanguage: String
    voteCount: Float
    creditId: String
    id: Int
  }

  type Person {
    alsoKnownAs: [String!]!
    placeOfBirth: String
    birthday: String
    name: String
    biography: String
    popularity: Float
    homepage: String
    knownForDepartment: String
    deathday: String
    imagesGallery: [String!]!
    cast: [Cast!]!
    adult: Boolean
    profileImage: String
    gender: Int
    imbdId: String
    id: Int
  }

  extend type Query {
    people(page: Int!, language: ISO6391Language): PeopleQueryResult!
    person(id: Int!, language: ISO6391Language): Person
  }
`;
