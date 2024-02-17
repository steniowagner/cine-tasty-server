export default `#graphql
  type FamousCast {
    "Movies in which the actor/actress is in the cast"
    moviesCast: [FamousCastMovie!]!
    "TV-Shows in which the actor/actress is in the cast"
    tvShowsCast: [FamousCastTVShow!]!
  }

  type Famous {
    "Biography"
    biography: String
    "Birthday (MM-DD-YYYY)"
    birthday: String
    "Deathday (MM-DD-YYYY)"
    deathday: String
    "Id"
    id: Int!
    "Images gallery"
    images: [String!]!
    "Departments in which the actor/actress works (acting, directing...)"
    knownForDepartment: String
    "Name"
    name: String
    "Place of Birth"
    placeOfBirth: String
    "Number indicating popularity"
    popularity: Float
    "Profile image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    profilePath: String
    "Movies and TV-Shows in which the actor/actress is in the cast"
    cast(language: ISO6391Language): FamousCast!
  }
`;
