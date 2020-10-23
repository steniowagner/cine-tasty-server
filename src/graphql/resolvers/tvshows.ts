/* eslint-disable @typescript-eslint/camelcase */

import * as TMDBAPITypes from '@tmdb-api-types';
import * as LibTypes from '@lib/types';
import { Context } from '@types';

import MediaGenresHandler from '../datasources/the-movie-db-api/handlers/media-genres/MediaGenresHandler';

const mediaGenres = new MediaGenresHandler();

const BASE_VIDEO_THHUMBNAIL_URL = 'https://img.youtube.com/vi';

type TVReview = {
  reviews: TMDBAPITypes.BasePaginationResponse & { results: LibTypes.Review[] };
};

type TVShowVideos = {
  results: LibTypes.MediaVideo[];
};

type SimilarTVShows = {
  results: LibTypes.BaseTvShow[];
};

const resolvers: LibTypes.QueryResolvers = {
  Query: {
    trendingTvShows: (): {} => ({}),

    tvShow: (
      _: {},
      args: LibTypes.QueryTvShowArgs,
      { dataSources }: Context,
    ): Promise<LibTypes.TvShowResponse | null> => dataSources.tmdb.getTVShow(args),

    tvShowSeason: (
      _: {},
      args: LibTypes.QueryTvShowSeasonArgs,
      { dataSources }: Context,
    ): Promise<LibTypes.TvShowSeasonResponse | null> =>
      dataSources.tmdb.getTVShowSeason(args),
  },

  TVShowSeason: {
    airDate: ({ air_date }: LibTypes.TvShowSeasonResponse): string | null | undefined =>
      air_date,

    posterPath: ({
      poster_path,
    }: LibTypes.TvShowSeasonResponse): string | null | undefined => poster_path,

    seasonNumber: ({
      season_number,
    }: LibTypes.TvShowSeasonResponse): number | null | undefined => season_number,
  },

  TVShowSeasonEpisode: {
    airDate: ({
      air_date,
    }: LibTypes.TvShowSeasonEpisodeResponse): string | null | undefined => air_date,

    episodeNumber: ({
      episode_number,
    }: LibTypes.TvShowSeasonEpisodeResponse): number | null | undefined => episode_number,

    productionCode: ({
      production_code,
    }: LibTypes.TvShowSeasonEpisodeResponse): string | null | undefined =>
      production_code,

    seasonNumber: ({
      season_number,
    }: LibTypes.TvShowSeasonEpisodeResponse): number | null | undefined => season_number,

    voteAverage: ({
      vote_average,
    }: LibTypes.TvShowSeasonEpisodeResponse): number | null | undefined => vote_average,

    voteCount: ({
      vote_count,
    }: LibTypes.TvShowSeasonEpisodeResponse): number | null | undefined => vote_count,

    stillPath: ({
      still_path,
    }: LibTypes.TvShowSeasonEpisodeResponse): string | null | undefined => still_path,

    guestStars: ({
      guest_stars,
    }: LibTypes.TvShowSeasonEpisodeResponse): LibTypes.GuestStarResponse[] => guest_stars,
  },

  GuestStar: {
    creditId: ({ credit_id }: LibTypes.GuestStarResponse): string | null | undefined =>
      credit_id,

    profilePath: ({
      profile_path,
    }: LibTypes.GuestStarResponse): string | null | undefined => profile_path,
  },

  Creator: {
    creditId: ({ credit_id }: LibTypes.CreatorResponse): string | null | undefined =>
      credit_id,

    profilePath: ({
      profile_path,
    }: LibTypes.CreatorResponse): string | null | undefined => profile_path,
  },

  Network: {
    logoPath: ({ logo_path }: LibTypes.NetworkResponse): string | null | undefined =>
      logo_path,

    originCountry: ({
      origin_country,
    }: LibTypes.NetworkResponse): string | null | undefined => origin_country,
  },

  Season: {
    airDate: ({ air_date }: LibTypes.SeasonResponse): string | null | undefined =>
      air_date,

    episodeCount: ({
      episode_count,
    }: LibTypes.SeasonResponse): number | null | undefined => episode_count,

    posterPath: ({ poster_path }: LibTypes.SeasonResponse): string | null | undefined =>
      poster_path,

    seasonNumber: ({
      season_number,
    }: LibTypes.SeasonResponse): number | null | undefined => season_number,
  },

  LastEpisodeToAir: {
    airDate: ({
      air_date,
    }: LibTypes.LastEpisodeToAirResponse): string | null | undefined => air_date,

    episodeNumber: ({
      episode_number,
    }: LibTypes.LastEpisodeToAirResponse): number | null | undefined => episode_number,

    productionCode: ({
      production_code,
    }: LibTypes.LastEpisodeToAirResponse): string | null | undefined => production_code,

    seasonNumber: ({
      season_number,
    }: LibTypes.LastEpisodeToAirResponse): number | null | undefined => season_number,

    showId: ({ show_id }: LibTypes.LastEpisodeToAirResponse): string | null | undefined =>
      show_id,

    stillPath: ({
      still_path,
    }: LibTypes.LastEpisodeToAirResponse): string | null | undefined => still_path,

    voteAverage: ({
      vote_average,
    }: LibTypes.LastEpisodeToAirResponse): number | null | undefined => vote_average,

    voteCount: ({
      vote_count,
    }: LibTypes.LastEpisodeToAirResponse): number | null | undefined => vote_count,
  },

  TVShow: {
    videos: ({ videos }: { videos: TVShowVideos }): LibTypes.MediaVideo[] =>
      videos.results
        .filter(({ site }) => site === 'YouTube')
        .map(video => ({
          key: video.key,
          name: video.name,
          site: video.site,
          id: `${video.id}`,
          type: video.type,
          thumbnail: {
            extraSmall: `${BASE_VIDEO_THHUMBNAIL_URL}/${video.key}/default.jpg`,
            small: `${BASE_VIDEO_THHUMBNAIL_URL}/${video.key}/mqdefault.jpg`,
            medium: `${BASE_VIDEO_THHUMBNAIL_URL}/${video.key}/hqdefault.jpg`,
            large: `${BASE_VIDEO_THHUMBNAIL_URL}/${video.key}/sddefault.jpg`,
            extraLarge: `${BASE_VIDEO_THHUMBNAIL_URL}/${video.key}/maxresdefault.jpg`,
          },
        })),

    cast: ({ credits }: { credits: TMDBAPITypes.MediaCredits }): LibTypes.CastItem[] =>
      credits.cast.map(castItem => ({
        name: castItem.name,
        profilePath: castItem.profile_path,
        id: castItem.id,
        gender: castItem.gender,
        character: castItem.character,
        order: castItem.order,
      })),

    crew: ({ credits }: { credits: TMDBAPITypes.MediaCredits }): LibTypes.CrewItem[] =>
      credits.crew.map(castItem => ({
        profilePath: castItem.profile_path,
        department: castItem.department,
        gender: castItem.gender,
        id: castItem.id,
        job: castItem.job,
        name: castItem.name,
      })),

    genres: (
      { genres }: { genres: TMDBAPITypes.MediaGenre[] },
      { language }: LibTypes.TvShowGenresArgs,
    ): Promise<string[]> => {
      const genresIds = genres.map(({ id }) => id);

      return mediaGenres.handle({
        mediaType: LibTypes.MediaType.Tv,
        genresIds,
        language,
      });
    },

    images: (
      _: {},
      { id }: LibTypes.TvShowImagesArgs,
      { dataSources }: Context,
    ): Promise<string[]> => dataSources.tmdb.getTVShowImages(id),

    posterPath: ({ poster_path }: LibTypes.TvShowResponse): string | null | undefined =>
      poster_path,

    reviews: ({ reviews }: TVReview): LibTypes.Review[] => reviews.results,

    similar: ({ similar }: { similar: SimilarTVShows }): LibTypes.BaseTvShow[] =>
      similar.results,

    lastEpisodeToAir: ({
      last_episode_to_air,
    }: LibTypes.TvShowResponse): LibTypes.LastEpisodeToAirResponse | null | undefined =>
      last_episode_to_air,

    backdropPath: ({
      backdrop_path,
    }: LibTypes.TvShowResponse): string | null | undefined => backdrop_path,

    createdBy: ({
      created_by,
    }: LibTypes.TvShowResponse): LibTypes.CreatorResponse[] | null | undefined =>
      created_by,

    episodeRunTime: ({
      episode_run_time,
    }: LibTypes.TvShowResponse): number[] | null | undefined => episode_run_time,

    firstAirDate: ({
      first_air_date,
    }: LibTypes.TvShowResponse): string | null | undefined => first_air_date,

    inProduction: ({
      in_production,
    }: LibTypes.TvShowResponse): boolean | null | undefined => in_production,

    lastAirDate: ({
      last_air_date,
    }: LibTypes.TvShowResponse): string | null | undefined => last_air_date,

    voteAverage: ({ vote_average }: LibTypes.TvShowResponse): number | null | undefined =>
      vote_average,

    voteCount: ({ vote_count }: LibTypes.TvShowResponse): number | null | undefined =>
      vote_count,

    productionCompanies: ({
      production_companies,
    }: LibTypes.TvShowResponse):
      | LibTypes.ProductionCompanyResponse[]
      | null
      | undefined => production_companies,

    originalLanguage: ({
      original_language,
    }: LibTypes.TvShowResponse): string | null | undefined => original_language,

    originalName: ({
      original_name,
    }: LibTypes.TvShowResponse): string | null | undefined => original_name,

    numberOfEpisodes: ({
      number_of_episodes,
    }: LibTypes.TvShowResponse): number | null | undefined => number_of_episodes,

    numberOfSeasons: ({
      number_of_seasons,
    }: LibTypes.TvShowResponse): number | null | undefined => number_of_seasons,

    originCountry: ({
      origin_country,
    }: LibTypes.TvShowResponse): string[] | null | undefined => origin_country,
  },

  BaseTVShow: {
    genreIds: (
      { genre_ids }: TMDBAPITypes.MediaItem,
      { language }: LibTypes.BaseTvShowGenreIdsArgs,
    ): Promise<string[]> =>
      mediaGenres.handle({
        mediaType: LibTypes.MediaType.Tv,
        genresIds: genre_ids,
        language,
      }),

    originCountry: ({ origin_country }: LibTypes.BaseTvShowResponse): string[] =>
      origin_country,

    originalName: ({
      original_name,
    }: LibTypes.BaseTvShowResponse): string | null | undefined => original_name,

    firstAirDate: ({
      first_air_date,
    }: LibTypes.BaseTvShowResponse): string | null | undefined => first_air_date,

    backdropPath: ({
      backdrop_path,
    }: LibTypes.BaseTvShowResponse): string | null | undefined => backdrop_path,

    voteAverage: ({
      vote_average,
    }: LibTypes.BaseTvShowResponse): number | null | undefined => vote_average,

    mediaType: ({ media_type }: LibTypes.BaseTvShowResponse): string | null | undefined =>
      media_type,

    posterPath: ({
      poster_path,
    }: LibTypes.BaseTvShowResponse): string | null | undefined => poster_path,

    originalLanguage: ({
      original_language,
    }: LibTypes.BaseTvShowResponse): string | null | undefined => original_language,

    voteCount: ({ vote_count }: LibTypes.BaseTvShowResponse): number | null | undefined =>
      vote_count,
  },

  TrendingTVShows: {
    onTheAir: (
      _: {},
      { args }: LibTypes.TrendingTvShowsOnTheAirArgs,
      { dataSources }: Context,
    ): Promise<LibTypes.TrendingTvShowsQueryResult> =>
      dataSources.tmdb.getTrendingTVShows(
        args,
        TMDBAPITypes.TrendingTVShowsEndpoints.OnTheAir,
      ),

    popular: (
      _: {},
      { args }: LibTypes.TrendingTvShowsPopularArgs,
      { dataSources }: Context,
    ): Promise<LibTypes.TrendingTvShowsQueryResult> =>
      dataSources.tmdb.getTrendingTVShows(
        args,
        TMDBAPITypes.TrendingTVShowsEndpoints.Popular,
      ),

    topRated: (
      _: {},
      { args }: LibTypes.TrendingTvShowsTopRatedArgs,
      { dataSources }: Context,
    ): Promise<LibTypes.TrendingTvShowsQueryResult> =>
      dataSources.tmdb.getTrendingTVShows(
        args,
        TMDBAPITypes.TrendingTVShowsEndpoints.TopRated,
      ),
  },
};

export default resolvers;
