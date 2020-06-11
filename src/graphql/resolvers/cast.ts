/* eslint-disable @typescript-eslint/camelcase */

import { MediaItem } from '@tmdb-api-types';
import * as LibTypes from '@lib/types';

import MediaGenresHandler from '../datasources/the-movie-db-api/handlers/media-genres/MediaGenresHandler';

type CastType = {
  media_type: 'tv' | 'movie';
};

type ProfilePath = {
  profile_path?: string;
  profilePath?: string;
};

const mediaGenres = new MediaGenresHandler();

const resolveCastType = (cast: CastType): string | null => {
  if (cast.media_type === LibTypes.MediaType.Movie.toLowerCase()) {
    return 'CastMovie';
  }

  if (cast.media_type === LibTypes.MediaType.Tv.toLowerCase()) {
    return 'CastTVShow';
  }

  return null;
};

const resolveCastResponseType = (cast: CastType): string | null => {
  if (cast.media_type === LibTypes.MediaType.Movie.toLowerCase()) {
    return 'LibTypes.CastMovieResponse';
  }

  if (cast.media_type === LibTypes.MediaType.Tv.toLowerCase()) {
    return 'CastTVShowResponse';
  }

  return null;
};

const resolveTypes: LibTypes.QueryResolvers = {
  Cast: {
    __resolveType(cast: CastType): string | null {
      return resolveCastType(cast);
    },
  },

  CastResponse: {
    __resolveType(cast: CastType): string | null {
      return resolveCastResponseType(cast);
    },
  },

  CrewItem: {
    profilePath: ({
      profilePath,
      profile_path,
    }: ProfilePath): string | null | undefined => profile_path || profilePath,
  },

  CastItem: {
    profilePath: ({
      profile_path,
      profilePath,
    }: ProfilePath): string | null | undefined => profile_path || profilePath,
  },

  CastMovie: {
    genreIds: (
      { genre_ids }: MediaItem,
      { language }: LibTypes.CastMovieGenreIdsArgs,
    ): Promise<string[]> =>
      mediaGenres.handle({
        mediaType: LibTypes.MediaType.Movie,
        genresIds: genre_ids,
        language,
      }),

    originalTitle: ({
      original_title,
    }: LibTypes.CastMovieResponse): string | null | undefined => original_title,

    releaseDate: ({
      release_date,
    }: LibTypes.CastMovieResponse): string | null | undefined => release_date,

    voteAverage: ({
      vote_average,
    }: LibTypes.CastMovieResponse): number | null | undefined => vote_average,

    voteCount: ({ vote_count }: LibTypes.CastMovieResponse): number | null | undefined =>
      vote_count,

    mediaType: ({ media_type }: LibTypes.CastMovieResponse): string | null | undefined =>
      media_type,

    creditId: ({ credit_id }: LibTypes.CastMovieResponse): string | null | undefined =>
      credit_id,

    posterPath: ({
      poster_path,
    }: LibTypes.CastMovieResponse): string | null | undefined => poster_path,

    originalLanguage: ({
      original_language,
    }: LibTypes.CastMovieResponse): string | null | undefined => original_language,

    backdropPath: ({
      backdrop_path,
    }: LibTypes.CastMovieResponse): string | null | undefined => backdrop_path,
  },

  CastTVShow: {
    genreIds: (
      { genre_ids }: MediaItem,
      { language }: LibTypes.CastTvShowGenreIdsArgs,
    ): Promise<string[]> =>
      mediaGenres.handle({
        mediaType: LibTypes.MediaType.Tv,
        genresIds: genre_ids,
        language,
      }),

    episodeCount: ({
      episode_count,
    }: LibTypes.CastTvShowResponse): number | null | undefined => episode_count,

    voteAverage: ({
      vote_average,
    }: LibTypes.CastTvShowResponse): number | null | undefined => vote_average,

    originCountry: ({
      origin_country,
    }: LibTypes.CastTvShowResponse): string[] | null | undefined => origin_country,

    originalName: ({
      original_name,
    }: LibTypes.CastTvShowResponse): string | null | undefined => original_name,

    firstAirDate: ({
      first_air_date,
    }: LibTypes.CastTvShowResponse): string | null | undefined => first_air_date,

    backdropPath: ({
      backdrop_path,
    }: LibTypes.CastTvShowResponse): string | null | undefined => backdrop_path,

    mediaType: ({ media_type }: LibTypes.CastTvShowResponse): string | null | undefined =>
      media_type,

    posterPath: ({
      poster_path,
    }: LibTypes.CastTvShowResponse): string | null | undefined => poster_path,

    originalLanguage: ({
      original_language,
    }: LibTypes.CastTvShowResponse): string | null | undefined => original_language,

    voteCount: ({ vote_count }: LibTypes.CastTvShowResponse): number | null | undefined =>
      vote_count,

    creditId: ({ credit_id }: LibTypes.CastTvShowResponse): string | null | undefined =>
      credit_id,
  },
};

export default resolveTypes;
