export default `#graphql
  "Definition of the Base-type of the FamousCast"
  interface BaseFamousCast {
    "Backdrop image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    backdropPath: String
    "Character name"
    character: String
    "Credit id"
    creditId: String
    "Cast id"
    id: Int!
    "TV-Show/Movie genres"
    genres(language: ISO6391Language): [String!]!
    "Indicates if the media is TV-Show or Movie"
    mediaType: String
    "TV-Show/Movie original language"
    originalLanguage: String
    "TV-Show/Movie overview"
    overview: String
    "Number indicating the popularity of the TV-Show/Movie"
    popularity: Float
    "Poster image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    posterPath: String
    "Number indicating the average of votes for the TV-Show/Movie"
    voteAverage: Float
    "Number indicating how many votes the TV-Show/Movie has"
    voteCount: Float
  }

  "Describes the Movies in which the Actor/Actress is in the cast"
  type FamousCastMovie implements BaseFamousCast {
    "Indicates if the movie has the 'adult' classification"
    adult: Boolean
    "Backdrop image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    backdropPath: String
    "Movie character name"
    character: String
    "Movie credit id"
    creditId: String
    "Movie genres"
    genres(language: ISO6391Language): [String!]!
    "Movie id"
    id: Int!
    "Movie original language"
    originalLanguage: String
    "Movie original title"
    originalTitle: String
    "Number indicating the popularity of the Movie"
    popularity: Float
    "Movie Poster image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    posterPath: String
    "For Movies, this value will always be 'movie'"
    mediaType: String
    "Movie overview"
    overview: String
    "Movie release date (MM-DD-YYYY)"
    releaseDate: String
    "Movie title"
    title: String
    "Indicates if the Movie has some video"
    video: Boolean
    "Number indicating the average of votes for the Movie"
    voteAverage: Float
    "Number indicating how many votes the Movie has"
    voteCount: Float
  }

  "Describes the TV-Shows in which the Actor/Actress is in the cast"
  type FamousCastTVShow implements BaseFamousCast {
    "Backdrop image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    backdropPath: String
    "TV-Show character"
    character: String
    "TV-Show credit id"
    creditId: String
    "Indicates how many episodes the TV-Show has so far"
    episodeCount: Int
    "TV-Show first air date (MM-DD-YYYY)"
    firstAirDate: String
    "TV-Show genres"
    genres(language: ISO6391Language): [String!]!
    "TV-Show id"
    id: Int!
    "For TV-Show, this value will always be 'tv-show'"
    mediaType: String
    "TV-Show name"
    name: String
    "TV-Show original language"
    originalLanguage: String
    "TV-Show original name"
    originalName: String
    "TV-Show origin countries"
    originCountry: [String!]!
    "TV-Show overview"
    overview: String
    "Number indicating the popularity of the TV-Show"
    popularity: Float
    "Poster image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    posterPath: String
    "Number indicating the average of votes for the TV-Show"
    voteAverage: Float
    "Number indicating how many votes the TV-Show has"
    voteCount: Float
  }

  "Describes the cast of a Movie or TV-Show"
  type MediaCast {
    "Indicates if the TV-Show/Moive has the 'adult' classification"
    adult: Boolean
    "TV-Shw/Moive id"
    id: Int!
    "Departments in which the actor/actress works (acting, directing...)"
    knownForDepartment: String
    "Actor/Actress name"
    name: String
    "TV-Shw/Moive original name"
    originalName: String
    "Number indicating the popularity of the TV-Show/Movie"
    popularity: Float
    "Actor/Actress profile image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    profilePath: String
    "Actor/Actress character"
    character: String
    "TV-Shw/Moive original credit-id"
    creditId: String
    "TV-Shw/Moive original order"
    order: Int
  }
`;
