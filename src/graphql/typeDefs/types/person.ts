import { gql } from 'apollo-server';

export default gql`
  union PersonKnowFor = BaseMovie | BaseTVShow

  type PersonResponse {
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
    cast: [CastResponse!]!
  }

  type Person {
    birthday: String
    knownForDepartment: String
    deathday: String
    id: Int
    name: String
    alsoKnownAs: [String!]!
    placeOfBirth: String
    profilePath: String
    adult: Boolean
    imdbId: String
    homepage: String
    biography: String
    popularity: Float
    images: [String!]!
    gender: Int
    moviesCast: [CastMovie!]!
    tvCast: [CastTVShow!]!
  }

  type BasePersonResponse {
    profile_path: String
    adult: Boolean
    id: Int
    popularity: Float
    known_for: [PersonKnowFor!]!
    name: String
  }

  type BasePerson {
    profilePath: String
    adult: Boolean
    id: Int
    popularity: Float
    knownFor: [PersonKnowFor!]!
    name: String
  }

  type PeopleQueryResultResponse {
    total_results: Int!
    total_pages: Int!
    items: [BasePerson!]!
    hasMore: Boolean!
  }

  type PeopleQueryResult {
    totalResults: Int!
    totalPages: Int!
    items: [BasePerson!]!
    hasMore: Boolean!
  }
`;
