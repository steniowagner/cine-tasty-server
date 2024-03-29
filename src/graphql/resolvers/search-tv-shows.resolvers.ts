import { SearchTvShowItemGenresArgs, Iso6391Language, MediaType } from "@generated-types";
import { mediaGenresHandler } from "@tmdb-api/handlers/media-genres";
import { SearchTVShowsTypes } from "@tmdb-api/handlers/search-tv-shows";
import { Context } from "@types";

export const resolvers = {
  SearchTVShowItem: {
    backdropPath: (parent: SearchTVShowsTypes.Result) => parent.backdrop_path,
    genres: async (
      parent: SearchTVShowsTypes.Result,
      params: SearchTvShowItemGenresArgs,
      context: Context,
    ) =>
      mediaGenresHandler.handle({
        language: params.input.language as Iso6391Language,
        cacheHandler: context.cacheHandler,
        mediaType: MediaType.Tv,
        tmdbAPI: context.tmdbAPI,
        genreIds: parent.genre_ids,
      }),
    posterPath: (parent: SearchTVShowsTypes.Result) => parent.poster_path,
    originCountry: (parent: SearchTVShowsTypes.Result) => parent.origin_country,
    originalLanguage: (parent: SearchTVShowsTypes.Result) => parent.original_language,
    originalName: (parent: SearchTVShowsTypes.Result) => parent.original_name,
    firstAirDate: (parent: SearchTVShowsTypes.Result) => parent.first_air_date,
    voteAverage: (parent: SearchTVShowsTypes.Result) => parent.vote_average,
    voteCount: (parent: SearchTVShowsTypes.Result) => parent.vote_count,
  },
};
