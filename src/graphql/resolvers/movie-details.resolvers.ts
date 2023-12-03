import { MovieImagesArgs } from "@generated-types";
import * as movies from "@/graphql/datasources/the-movie-db-api/handlers/movies";
import { QueryMovieArgs } from "@generated-types";
import { Context } from "@/types";

export const resolvers = {
  Query: {
    movie: async (_parent: undefined, params: QueryMovieArgs, context: Context) =>
      movies.details.handler(params, context.tmdbAPI),
  },

  MovieProductionCompany: {
    logoPath: (parent: movies.details.types.ProductionCompany) => parent.logo_path,
    originCountry: (parent: movies.details.types.ProductionCompany) =>
      parent.origin_country,
  },

  MovieBelongsToCollection: {
    posterPath: (parent: movies.details.types.BelongsToCollection) => parent.poster_path,
    backdropPath: (parent: movies.details.types.BelongsToCollection) =>
      parent.backdrop_path,
  },

  Movie: {
    backdropPath: (parent: movies.details.types.Response) => parent.backdrop_path,
    belongsToCollection: (parent: movies.details.types.Response) =>
      parent.belongs_to_collection,
    genres: (parent: movies.details.types.Response) =>
      parent.genres.map((genre) => genre.name),
    imdbId: (parent: movies.details.types.Response) => parent.imdb_id,
    originalLanguage: (parent: movies.details.types.Response) => parent.original_language,
    originalTitle: (parent: movies.details.types.Response) => parent.original_title,
    posterPath: (parent: movies.details.types.Response) => parent.poster_path,
    productionCompanies: (parent: movies.details.types.Response) =>
      parent.production_companies,
    productionCountries: (parent: movies.details.types.Response) =>
      parent.production_countries.map((productionCountry) => productionCountry.name),
    releaseDate: (parent: movies.details.types.Response) => parent.release_date,
    spokenLanguages: (parent: movies.details.types.Response) =>
      parent.spoken_languages.map((spokenLanguage) => spokenLanguage.name),
    voteAverage: (parent: movies.details.types.Response) => parent.vote_average,
    voteCount: (parent: movies.details.types.Response) => parent.vote_count,
    videos: (
      _: movies.details.types.Response,
      params: movies.videos.types.Params,
      context: Context,
    ) => movies.videos.handler(params, context.tmdbAPI),
    images: (
      _: movies.details.types.Response,
      params: MovieImagesArgs,
      context: Context,
    ): Promise<string[]> => movies.images.handler(params, context.tmdbAPI),
    cast: (parent: movies.details.types.Response) => parent.credits.cast,
    crew: (parent: movies.details.types.Response) => parent.credits.crew,
  },
};
