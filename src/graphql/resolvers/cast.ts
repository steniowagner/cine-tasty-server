/* eslint-disable @typescript-eslint/camelcase */
import { MediaItem } from '@types';
import {
  QueryResolvers,
  MediaType,
  CastMovieGenre_IdsArgs as CastMovieGenreIdsArgs,
  CastTvShowGenre_IdsArgs as CastTvGenreIdsArgs,
  CastMovieResponse,
  CastTvShowResponse,
} from '@lib/types';

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
  if (cast.media_type === MediaType.Movie.toLowerCase()) {
    return 'CastMovie';
  }

  if (cast.media_type === MediaType.Tv.toLowerCase()) {
    return 'CastTVShow';
  }

  return null;
};

const resolveCastResponseType = (cast: CastType): string | null => {
  if (cast.media_type === MediaType.Movie.toLowerCase()) {
    return 'CastMovieResponse';
  }

  if (cast.media_type === MediaType.Tv.toLowerCase()) {
    return 'CastTVShowResponse';
  }

  return null;
};

const resolveTypes: QueryResolvers = {
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
      { language }: CastMovieGenreIdsArgs,
    ): Promise<string[]> =>
      mediaGenres.handle({
        mediaType: MediaType.Movie,
        genresIds: genre_ids,
        language,
      }),

    originalTitle: ({ original_title }: CastMovieResponse): string | null | undefined =>
      original_title,

    releaseDate: ({ release_date }: CastMovieResponse): string | null | undefined =>
      release_date,

    voteAverage: ({ vote_average }: CastMovieResponse): number | null | undefined =>
      vote_average,

    voteCount: ({ vote_count }: CastMovieResponse): number | null | undefined =>
      vote_count,

    mediaType: ({ media_type }: CastMovieResponse): string | null | undefined =>
      media_type,

    creditId: ({ credit_id }: CastMovieResponse): string | null | undefined => credit_id,

    posterPath: ({ poster_path }: CastMovieResponse): string | null | undefined =>
      poster_path,

    originalLanguage: ({
      original_language,
    }: CastMovieResponse): string | null | undefined => original_language,

    backdropPath: ({ backdrop_path }: CastMovieResponse): string | null | undefined =>
      backdrop_path,
  },

  CastTVShow: {
    genreIds: (
      { genre_ids }: MediaItem,
      { language }: CastTvGenreIdsArgs,
    ): Promise<string[]> =>
      mediaGenres.handle({
        mediaType: MediaType.Tv,
        genresIds: genre_ids,
        language,
      }),

    episodeCount: ({ episode_count }: CastTvShowResponse): number | null | undefined =>
      episode_count,

    voteAverage: ({ vote_average }: CastTvShowResponse): number | null | undefined =>
      vote_average,

    originCountry: ({
      origin_country,
    }: CastTvShowResponse): string[] | null | undefined => origin_country,

    originalName: ({ original_name }: CastTvShowResponse): string | null | undefined =>
      original_name,

    firstAirDate: ({ first_air_date }: CastTvShowResponse): string | null | undefined =>
      first_air_date,

    backdropPath: ({ backdrop_path }: CastTvShowResponse): string | null | undefined =>
      backdrop_path,

    mediaType: ({ media_type }: CastTvShowResponse): string | null | undefined =>
      media_type,

    posterPath: ({ poster_path }: CastTvShowResponse): string | null | undefined =>
      poster_path,

    originalLanguage: ({
      original_language,
    }: CastTvShowResponse): string | null | undefined => original_language,

    voteCount: ({ vote_count }: CastTvShowResponse): number | null | undefined =>
      vote_count,

    creditId: ({ credit_id }: CastTvShowResponse): string | null | undefined => credit_id,
  },
};

export default resolveTypes;
