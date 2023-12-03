import { movieDetails } from "@/graphql/datasources/the-movie-db-api/handlers/movies";
import { QueryMovieArgs } from "@generated-types";
import { Context } from "@/types";

export const resolvers = {
  Query: {
    movie: async (_parent: undefined, params: QueryMovieArgs, context: Context) =>
      movieDetails.handler(params, context.tmdbAPI),
  },

  MovieProductionCompany: {
    logoPath: (parent: movieDetails.types.ProductionCompany) => parent.logo_path,
    originCountry: (parent: movieDetails.types.ProductionCompany) =>
      parent.origin_country,
  },

  MovieBelongsToCollection: {
    posterPath: (parent: movieDetails.types.BelongsToCollection) => parent.poster_path,
    backdropPath: (parent: movieDetails.types.BelongsToCollection) =>
      parent.backdrop_path,
  },

  Movie: {
    backdropPath: (parent: movieDetails.types.Response) => parent.backdrop_path,
    belongsToCollection: (parent: movieDetails.types.Response) =>
      parent.belongs_to_collection,
    genres: (parent: movieDetails.types.Response) =>
      parent.genres.map((genre) => genre.name),
    imdbId: (parent: movieDetails.types.Response) => parent.imdb_id,
    originalLanguage: (parent: movieDetails.types.Response) => parent.original_language,
    originalTitle: (parent: movieDetails.types.Response) => parent.original_title,
    posterPath: (parent: movieDetails.types.Response) => parent.poster_path,
    productionCompanies: (parent: movieDetails.types.Response) =>
      parent.production_companies,
    productionCountries: (parent: movieDetails.types.Response) =>
      parent.production_countries.map((productionCountry) => productionCountry.name),
    releaseDate: (parent: movieDetails.types.Response) => parent.release_date,
    spokenLanguages: (parent: movieDetails.types.Response) =>
      parent.spoken_languages.map((spokenLanguage) => spokenLanguage.name),
    voteAverage: (parent: movieDetails.types.Response) => parent.vote_average,
    voteCount: (parent: movieDetails.types.Response) => parent.vote_count,
  },
};
