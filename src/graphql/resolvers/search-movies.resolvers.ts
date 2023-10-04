import { SearchMovieItemGenresArgs, Iso6391Language } from "@generated-types";
import { SearchMoviesTypes } from "@tmdb-api/handlers/search-movies";
import { mediaGenresHandler } from "@tmdb-api/handlers/media-genres";
import { Context } from "@types";

export const resolvers = {
  SearchMovieItem: {
    backdropPath: (parent: SearchMoviesTypes.Result) => parent.backdrop_path,
    genres: async (
      parent: SearchMoviesTypes.Result,
      params: SearchMovieItemGenresArgs,
      context: Context,
    ) =>
      mediaGenresHandler.handle({
        language: params.input.language as Iso6391Language,
        cacheHandler: context.cacheHandler,
        mediaType: "movie",
        tmdbAPI: context.tmdbAPI,
        genreIds: parent.genre_ids,
      }),
    originalLanguage: (parent: SearchMoviesTypes.Result) => parent.original_language,
    originalTitle: (parent: SearchMoviesTypes.Result) => parent.original_title,
    posterPath: (parent: SearchMoviesTypes.Result) => parent.poster_path,
    releaseDate: (parent: SearchMoviesTypes.Result) => parent.release_date,
    voteAverage: (parent: SearchMoviesTypes.Result) => parent.vote_average,
    voteCount: (parent: SearchMoviesTypes.Result) => parent.vote_count,
  },
};
