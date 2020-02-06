import MediaGenresHandler from '../datasources/the-movie-db-api/handlers/media-genres';
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
  QueryTv_ShowArgs as QueryTvShowArgs,
  MediaVideo,
  CastItem,
  CrewItem,
  BaseTvShow,
  TvShowReviewsArgs,
  ReviewsQueryResultResolvers,
} from '../../lib/types';
import {
  TrendingTVShowsEndpoints,
  MediaItem,
  Context,
  MediaGenre,
  MediaCredits,
} from '../../types';

const mediaGenres = new MediaGenresHandler();

const BASE_VIDEO_THHUMBNAIL_URL = 'https://img.youtube.com/vi';

type TVShowVideos = {
  results: MediaVideo[];
};

type SimilarTVShows = {
  results: BaseTvShow[];
};

const resolvers: QueryResolvers = {
  Query: {
    trending_tv_shows: (): {} => ({}),

    tv_show: (
      _: {},
      args: QueryTvShowArgs,
      { dataSources }: Context,
    ): Promise<TvShow | null> => dataSources.tmdb.getTVShow(args),
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

    genres: (
      { genres }: { genres: Array<MediaGenre> },
      { language }: TvShowGenresArgs,
    ): Promise<string[]> => {
      const genreIds = genres.map(({ id }) => id);

      return mediaGenres.getMediaGenres(genreIds, MediaType.Tv.toLowerCase(), language);
    },

    reviews: (
      _: {},
      args: TvShowReviewsArgs,
      { dataSources }: Context,
    ): ReviewsQueryResultResolvers => dataSources.tmdb.getTVShowReviews(args),

    similar: ({ similar }: { similar: SimilarTVShows }): BaseTvShow[] => similar.results,

    images: (
      _: {},
      { id }: TvShowImagesArgs,
      { dataSources }: Context,
    ): Promise<string[]> => dataSources.tmdb.getTVShowImages(id),

    cast: ({ credits }: { credits: MediaCredits }): CastItem[] =>
      credits.cast.map(castItem => ({
        name: castItem.name,
        profile_path: castItem.profile_path,
        id: castItem.id,
        gender: castItem.gender,
        character: castItem.character,
        order: castItem.order,
      })),

    crew: ({ credits }: { credits: MediaCredits }): CrewItem[] =>
      credits.crew.map(castItem => ({
        profile_path: castItem.profile_path,
        department: castItem.department,
        gender: castItem.gender,
        id: castItem.id,
        job: castItem.job,
        name: castItem.name,
      })),
  },

  BaseTVShow: {
    genre_ids: (
      { genre_ids }: MediaItem,
      { language }: BaseTvShowGenreIdsArgs,
    ): Promise<string[]> =>
      mediaGenres.getMediaGenres(genre_ids, MediaType.Tv.toLowerCase(), language),
  },

  TrendingTVShows: {
    on_the_air: (
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

    top_rated: (
      _: {},
      { args }: TrendingTvShowsTopRatedArgs,
      { dataSources }: Context,
    ): Promise<TrendingTvShowsQueryResult> =>
      dataSources.tmdb.getTrendingTVShowsItem(args, TrendingTVShowsEndpoints.TopRated),
  },
};

export default resolvers;
