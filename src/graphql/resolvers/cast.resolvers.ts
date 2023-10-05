import { mediaGenresHandler } from "@tmdb-api/handlers/media-genres";
import { CastGenresArgs, Iso6391Language, MediaType } from "@generated-types";
import { FamousCastTypes } from "@tmdb-api/handlers/famous-cast";
import { Context } from "@types";

export const resolvers = {
  CastMovie: {
    backdropPath: (parent: FamousCastTypes.MovieCast) => parent.backdrop_path,
    creditId: (parent: FamousCastTypes.MovieCast) => parent.credit_id,
    genres: (
      parent: FamousCastTypes.MovieCast,
      params: CastGenresArgs,
      context: Context,
    ) =>
      mediaGenresHandler.handle({
        cacheHandler: context.cacheHandler,
        tmdbAPI: context.tmdbAPI,
        genreIds: parent.genre_ids,
        language: params.language as Iso6391Language,
        mediaType: MediaType.Movie,
      }),
    mediaType: (parent: FamousCastTypes.MovieCast) => parent.media_type,
    originalLanguage: (parent: FamousCastTypes.MovieCast) => parent.original_language,
    originalTitle: (parent: FamousCastTypes.MovieCast) => parent.original_title,
    posterPath: (parent: FamousCastTypes.MovieCast) => parent.poster_path,
    releaseDate: (parent: FamousCastTypes.MovieCast) => parent.release_date,
    voteAverage: (parent: FamousCastTypes.MovieCast) => parent.vote_average,
    voteCount: (parent: FamousCastTypes.MovieCast) => parent.vote_count,
  },

  CastTVShow: {
    backdropPath: (parent: FamousCastTypes.TvShowCast) => parent.backdrop_path,
    genres: (
      parent: FamousCastTypes.TvShowCast,
      params: CastGenresArgs,
      context: Context,
    ) =>
      mediaGenresHandler.handle({
        language: params.language as Iso6391Language,
        cacheHandler: context.cacheHandler,
        tmdbAPI: context.tmdbAPI,
        genreIds: parent.genre_ids,
        mediaType: MediaType.Tv,
      }),
    originCountry: (parent: FamousCastTypes.TvShowCast) => parent.origin_country,
    originalLanguage: (parent: FamousCastTypes.TvShowCast) => parent.original_language,
    originalName: (parent: FamousCastTypes.TvShowCast) => parent.original_name,
    posterPath: (parent: FamousCastTypes.TvShowCast) => parent.poster_path,
    firstAirDate: (parent: FamousCastTypes.TvShowCast) => parent.first_air_date,
    voteAverage: (parent: FamousCastTypes.TvShowCast) => parent.vote_average,
    voteCount: (parent: FamousCastTypes.TvShowCast) => parent.vote_count,
    creditId: (parent: FamousCastTypes.TvShowCast) => parent.credit_id,
    episodeCount: (parent: FamousCastTypes.TvShowCast) => parent.episode_count,
    mediaType: (parent: FamousCastTypes.TvShowCast) => parent.media_type,
  },
};
