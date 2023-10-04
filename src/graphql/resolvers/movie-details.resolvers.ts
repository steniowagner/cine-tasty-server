import { movieDetailsHandler, MovieDetailsTypes } from "@tmdb-api/handlers/movie-details";
import { QueryMovieArgs } from "@generated-types";
import { Context } from "@/types";

export const resolvers = {
  Query: {
    movie: async (_parent: undefined, params: QueryMovieArgs, context: Context) =>
      movieDetailsHandler.handle(params, context.tmdbAPI),
  },

  MovieProductionCompany: {
    logoPath: (parent: MovieDetailsTypes.ProductionCompany) => parent.logo_path,
    originCountry: (parent: MovieDetailsTypes.ProductionCompany) => parent.origin_country,
  },

  MovieBelongsToCollection: {
    posterPath: (parent: MovieDetailsTypes.BelongsToCollection) => parent.poster_path,
    backdropPath: (parent: MovieDetailsTypes.BelongsToCollection) => parent.backdrop_path,
  },

  Movie: {
    backdropPath: (parent: MovieDetailsTypes.Response) => parent.backdrop_path,
    belongsToCollection: (parent: MovieDetailsTypes.Response) =>
      parent.belongs_to_collection,
    genres: (parent: MovieDetailsTypes.Response) =>
      parent.genres.map((genre) => genre.name),
    imdbId: (parent: MovieDetailsTypes.Response) => parent.imdb_id,
    originalLanguage: (parent: MovieDetailsTypes.Response) => parent.original_language,
    originalTitle: (parent: MovieDetailsTypes.Response) => parent.original_title,
    posterPath: (parent: MovieDetailsTypes.Response) => parent.poster_path,
    productionCompanies: (parent: MovieDetailsTypes.Response) =>
      parent.production_companies,
    productionCountries: (parent: MovieDetailsTypes.Response) =>
      parent.production_countries.map((productionCountry) => productionCountry.name),
    releaseDate: (parent: MovieDetailsTypes.Response) => parent.release_date,
    spokenLanguages: (parent: MovieDetailsTypes.Response) =>
      parent.spoken_languages.map((spokenLanguage) => spokenLanguage.name),
    voteAverage: (parent: MovieDetailsTypes.Response) => parent.vote_average,
    voteCount: (parent: MovieDetailsTypes.Response) => parent.vote_count,
  },
};
