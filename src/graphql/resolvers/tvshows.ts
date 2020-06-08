/* eslint-disable @typescript-eslint/camelcase */
import MediaGenresHandler from '../datasources/the-movie-db-api/handlers/media-genres/MediaGenresHandler';
import {
  TrendingTvShowsOn_The_AirArgs as TrendingTvShowsOnTheAirArgs,
  BaseTvShowGenre_IdsArgs as BaseTvShowGenreIdsArgs,
  TrendingTvShowsTop_RatedArgs as TrendingTvShowsTopRatedArgs,
  QueryResolvers,
  MediaType,
  TrendingTvShowsQueryResult,
  TrendingTvShowsPopularArgs,
  TvShow,
  TvShowImagesArgs,
  TvShowGenresArgs,
  CreatorResponse,
  BaseTVShowResponse,
  QueryTv_ShowArgs as QueryTvShowArgs,
  TvShowResponse,
  NetworkResponse,
  SeasonResponse,
  MediaVideo,
  CastItem,
  CrewItem,
  Review,
  LastEpisodeToAirResponse,
  BaseTvShow,
  BaseTvShowResponse,
  Creator,
  ProductionCompanyResponse,
} from '../../lib/types';
import {
  TrendingTVShowsEndpoints,
  BasePaginationResponse,
  MediaItem,
  Context,
  MediaGenre,
  MediaCredits,
} from '../../@types';

const mediaGenres = new MediaGenresHandler();

const BASE_VIDEO_THHUMBNAIL_URL = 'https://img.youtube.com/vi';

type TVReview = {
  reviews: BasePaginationResponse & { results: Review[] };
};

type TVShowVideos = {
  results: MediaVideo[];
};

type SimilarTVShows = {
  results: BaseTvShow[];
};

const resolvers: QueryResolvers = {
  Query: {
    trendingTvShows: (): {} => ({}),

    tvShow: (
      _: {},
      args: QueryTvShowArgs,
      { dataSources }: Context,
    ): Promise<TvShow | null> => dataSources.tmdb.getTVShow(args),
  },

  Creator: {
    creditId: ({ credit_id }: CreatorResponse): string | null | undefined => credit_id,

    profilePath: ({ profile_path }: CreatorResponse): string | null | undefined =>
      profile_path,
  },

  Network: {
    logoPath: ({ logo_path }: NetworkResponse): string | null | undefined => logo_path,

    originCountry: ({ origin_country }: NetworkResponse): string | null | undefined =>
      origin_country,
  },

  Season: {
    airDate: ({ air_date }: SeasonResponse): string | null | undefined => air_date,

    episodeCount: ({ episode_count }: SeasonResponse): number | null | undefined =>
      episode_count,

    posterPath: ({ poster_path }: SeasonResponse): string | null | undefined =>
      poster_path,

    seasonNumber: ({ season_number }: SeasonResponse): number | null | undefined =>
      season_number,
  },

  LastEpisodeToAir: {
    airDate: ({ air_date }: LastEpisodeToAirResponse): string | null | undefined =>
      air_date,

    episodeNumber: ({
      episode_number,
    }: LastEpisodeToAirResponse): number | null | undefined => episode_number,

    productionCode: ({
      production_code,
    }: LastEpisodeToAirResponse): string | null | undefined => production_code,

    seasonNumber: ({
      season_number,
    }: LastEpisodeToAirResponse): number | null | undefined => season_number,

    showId: ({ show_id }: LastEpisodeToAirResponse): string | null | undefined => show_id,

    stillPath: ({ still_path }: LastEpisodeToAirResponse): string | null | undefined =>
      still_path,

    voteAverage: ({
      vote_average,
    }: LastEpisodeToAirResponse): number | null | undefined => vote_average,

    voteCount: ({ vote_count }: LastEpisodeToAirResponse): number | null | undefined =>
      vote_count,
  },

  TVShow: {
    videos: ({ videos }: { videos: TVShowVideos }): MediaVideo[] =>
      videos.results
        .filter(({ site }) => site === 'YouTube')
        .map(video => ({
          key: video.key,
          name: video.name,
          site: video.site,
          id: `${video.id}`,
          type: video.type,
          thumbnail: {
            extra_small: `${BASE_VIDEO_THHUMBNAIL_URL}/${video.key}/default.jpg`,
            small: `${BASE_VIDEO_THHUMBNAIL_URL}/${video.key}/mqdefault.jpg`,
            medium: `${BASE_VIDEO_THHUMBNAIL_URL}/${video.key}/hqdefault.jpg`,
            large: `${BASE_VIDEO_THHUMBNAIL_URL}/${video.key}/sddefault.jpg`,
            extra_large: `${BASE_VIDEO_THHUMBNAIL_URL}/${video.key}/maxresdefault.jpg`,
          },
        })),

    cast: ({ credits }: { credits: MediaCredits }): CastItem[] =>
      credits.cast.map(castItem => ({
        name: castItem.name,
        profilePath: castItem.profile_path,
        id: castItem.id,
        gender: castItem.gender,
        character: castItem.character,
        order: castItem.order,
      })),

    crew: ({ credits }: { credits: MediaCredits }): CrewItem[] =>
      credits.crew.map(castItem => ({
        profilePath: castItem.profile_path,
        department: castItem.department,
        gender: castItem.gender,
        id: castItem.id,
        job: castItem.job,
        name: castItem.name,
      })),

    genres: (
      { genres }: { genres: MediaGenre[] },
      { language }: TvShowGenresArgs,
    ): Promise<string[]> => {
      const genresIds = genres.map(({ id }) => id);

      return mediaGenres.handle({
        mediaType: MediaType.Tv,
        genresIds,
        language,
      });
    },

    images: (
      _: {},
      { id }: TvShowImagesArgs,
      { dataSources }: Context,
    ): Promise<string[]> => dataSources.tmdb.getTVShowImages(id),

    posterPath: ({ poster_path }: TvShowResponse): string | null | undefined =>
      poster_path,

    reviews: ({ reviews }: TVReview): Review[] => reviews.results,

    similar: ({ similar }: { similar: SimilarTVShows }): BaseTvShow[] => similar.results,

    lastEpisodeToAir: ({
      last_episode_to_air,
    }: TvShowResponse): LastEpisodeToAirResponse | null | undefined =>
      last_episode_to_air,

    backdropPath: ({ backdrop_path }: TvShowResponse): string | null | undefined =>
      backdrop_path,

    createdBy: ({ created_by }: TvShowResponse): CreatorResponse[] | null | undefined =>
      created_by,

    episodeRunTime: ({ episode_run_time }: TvShowResponse): number[] | null | undefined =>
      episode_run_time,

    firstAirDate: ({ first_air_date }: TvShowResponse): string | null | undefined =>
      first_air_date,

    inProduction: ({ in_production }: TvShowResponse): boolean | null | undefined =>
      in_production,

    lastAirDate: ({ last_air_date }: TvShowResponse): string | null | undefined =>
      last_air_date,

    voteAverage: ({ vote_average }: TvShowResponse): number | null | undefined =>
      vote_average,

    voteCount: ({ vote_count }: TvShowResponse): number | null | undefined => vote_count,

    productionCompanies: ({
      production_companies,
    }: TvShowResponse): ProductionCompanyResponse[] | null | undefined =>
      production_companies,

    originalLanguage: ({
      original_language,
    }: TvShowResponse): string | null | undefined => original_language,

    originalName: ({ original_name }: TvShowResponse): string | null | undefined =>
      original_name,

    numberOfEpisodes: ({
      number_of_episodes,
    }: TvShowResponse): number | null | undefined => number_of_episodes,

    numberOfSeasons: ({ number_of_seasons }: TvShowResponse): number | null | undefined =>
      number_of_seasons,

    originCountry: ({ origin_country }: TvShowResponse): string[] | null | undefined =>
      origin_country,
  },

  BaseTVShow: {
    genreIds: (
      { genre_ids }: MediaItem,
      { language }: BaseTvShowGenreIdsArgs,
    ): Promise<string[]> =>
      mediaGenres.handle({
        mediaType: MediaType.Tv,
        genresIds: genre_ids,
        language,
      }),

    originCountry: ({ origin_country }: BaseTvShowResponse): string[] => origin_country,

    originalName: ({ original_name }: BaseTvShowResponse): string | null | undefined =>
      original_name,

    firstAirDate: ({ first_air_date }: BaseTvShowResponse): string | null | undefined =>
      first_air_date,

    backdropPath: ({ backdrop_path }: BaseTvShowResponse): string | null | undefined =>
      backdrop_path,

    voteAverage: ({ vote_average }: BaseTvShowResponse): number | null | undefined =>
      vote_average,

    mediaType: ({ media_type }: BaseTvShowResponse): string | null | undefined =>
      media_type,

    posterPath: ({ poster_path }: BaseTvShowResponse): string | null | undefined =>
      poster_path,

    originalLanguage: ({
      original_language,
    }: BaseTvShowResponse): string | null | undefined => original_language,

    voteCount: ({ vote_count }: BaseTvShowResponse): number | null | undefined =>
      vote_count,
  },

  TrendingTVShows: {
    onTheAir: (
      _: {},
      { args }: TrendingTvShowsOnTheAirArgs,
      { dataSources }: Context,
    ): Promise<TrendingTvShowsQueryResult> =>
      dataSources.tmdb.getTrendingTVShowsItem(args, TrendingTVShowsEndpoints.OnTheAir),

    popular: (
      _: {},
      { args }: TrendingTvShowsPopularArgs,
      { dataSources }: Context,
    ): Promise<TrendingTvShowsQueryResult> =>
      dataSources.tmdb.getTrendingTVShowsItem(args, TrendingTVShowsEndpoints.Popular),

    topRated: (
      _: {},
      { args }: TrendingTvShowsTopRatedArgs,
      { dataSources }: Context,
    ): Promise<TrendingTvShowsQueryResult> =>
      dataSources.tmdb.getTrendingTVShowsItem(args, TrendingTVShowsEndpoints.TopRated),
  },
};

export default resolvers;
