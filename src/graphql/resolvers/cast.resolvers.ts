import {
  mediaGenresMoviesHandler,
  // mediaGenresTVShowsHandler,
} from "@tmdb-api/handlers/media-genres";
import { CastGenreIdsArgs } from "@generated-types";
import { FamousCastTypes } from "@tmdb-api/handlers/famous-cast";
import { Context } from "@types";

export const resolvers = {
  CastMovie: {
    backdropPath: (parent: FamousCastTypes.MovieCast) => parent.backdrop_path,
    creditId: (parent: FamousCastTypes.MovieCast) => parent.credit_id,
    genreIds: (
      parent: FamousCastTypes.MovieCast,
      params: CastGenreIdsArgs,
      context: Context,
    ) =>
      mediaGenresMoviesHandler.handle({
        tmdbAPI: context.tmdbAPI,
        genreIds: parent.genre_ids,
        language: params.language,
      }),
    mediaType: (parent: FamousCastTypes.MovieCast) => parent.media_type,
    originalLanguage: (parent: FamousCastTypes.MovieCast) => parent.original_language,
    originalTitle: (parent: FamousCastTypes.MovieCast) => parent.original_title,
    posterPath: (parent: FamousCastTypes.MovieCast) => parent.poster_path,
    releaseDate: (parent: FamousCastTypes.MovieCast) => parent.release_date,
    voteAverage: (parent: FamousCastTypes.MovieCast) => parent.vote_average,
    voteCount: (parent: FamousCastTypes.MovieCast) => parent.vote_count,
  },

  // CastTVShow: {
  //   backdropPath: (parent: CastResponse) => parent.backdrop_path,
  //   creditId: (parent: CastResponse) => parent.credit_id,
  //   episodeCount: Int
  //   firstAirDate: String
  //   genreIds(language: ISO6391Language): [String!]!
  //   mediaType: String
  //   originalLanguage: String
  //   originalName: String
  //   originCountry: [String!]!
  //   posterPath: String
  //   voteAverage: Float
  //   voteCount: Float
  // },
};
