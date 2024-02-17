export default `#graphql
  "Describes a company that was part of the Movie-production"
  type MovieProductionCompany {
    "Company id"
    id: Int!
    "Company logo image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    logoPath: String
    "Company name"
    name: String
    "Company origin country"
    originCountry: String
  }

  "Describes a collection in which the movie is included"
  type MovieBelongsToCollection {
    "Collection id"
    id: Int!
    "Collection name"
    name: String
    "Collection poster path - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    posterPath: String
    "Backdrop image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    backdropPath: String
  }

  "Describe a Movie that is similar to other Movie"
  type SimilarMovie {
    "Indicates if the Similar-Moive has the 'adult' classification"
    adult: Boolean
    "Backdrop path - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    backdropPath: String
    "Similar-Movie id"
    id: Int!
    "Similar-Movie original language"
    originalLanguage: String
    "Similar-Movie original title"
    originalTitle: String
    "Similar-Movie overview"
    overview: String
    "Number indicating the popularity of the Similar-Movie"
    popularity: Float
    "Poster image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    posterPath: String
    "Similar-Movie release date (MM-DD-YYYY)"
    releaseDate: String
    "Similar-Movie title"
    title: String
    "Number indicating the average of votes for the Similar-Movie"
    voteAverage: Float
    "Number indicating how many votes the Similar-Movie has"
    voteCount: Int
  }

  "Describes a Movie"
  type Movie {
    "Indicates if the Movie has the 'adult' classification"
    adult: Boolean
    "Backdrop image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    backdropPath: String
    "Collection in which the Movie is included"
    belongsToCollection: MovieBelongsToCollection
    "Budget used in the Movie production"
    budget: Float
    "Movie genres"
    genres(language: ISO6391Language): [String!]!
    "Movie homepage"
    homepage: String
    "Movie id"
    id: Int!
    "Movie IMDB-id"
    imdbId: String
    "Movie original language"
    originalLanguage: String
    "Movie original title"
    originalTitle: String
    "Movie original overview"
    overview: String
    "Number indicating the popularity of the Movie"
    popularity: Float
    "Poster image - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    posterPath: String
    "Companies that produced the Movie"
    productionCompanies: [MovieProductionCompany!]!
    "Countries where the Movie was produced"
    productionCountries: [String!]!
    "Movie release data (MM-DD-YYYY)"
    releaseDate: String
    "Movie revenue"
    revenue: Float
    "Movie runtime"
    runtime: Int
    "Languages spoken in the Movie"
    spokenLanguages: [String!]!
    "Current Status of the Movie (released, filming...)"
    status: String
    "Movie tagline"
    tagline: String
    "Movie title"
    title: String
    "Indicates if the Movie has some video"
    video: Boolean
    "Number indicating the average of votes for the Movie"
    voteAverage: Float
    "Number indicating how many votes the Movie has"
    voteCount: Int
    "Similar Movies"
    similar(id: Int!, language: ISO6391Language): [SimilarMovie!]!
    "Movie videos"
    videos(id: Int!, language: ISO6391Language): [MediaVideo!]!
    "Movie images - only the TMDB resource-id (e.g whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg)"
    images(id: Int!, language: ISO6391Language): [String!]!
    "Movie cast"
    cast: [MediaCast!]!
    "Movie crew"
    crew: [MediaCrew!]!
  }
`;
