import MediaGenresHandler from '../datasources/the-movie-db-api/handlers/media-genres';
import {
  TrendingTvShowsOn_The_AirArgs as TrendingTvShowsOnTheAirArgs,
  BaseTvShowGenre_IdsArgs as BaseTvShowGenreIdsArgs,
  TrendingTvShowsTop_RatedArgs as TrendingTvShowsTopRatedArgs,
  QueryResolvers,
  MediaType,
  TrendingTvShowsQueryResult,
  TrendingTvShowsPopularArgs,
} from '../../lib/types';
import { MediaItem, Context, TVShowsEndpoints } from '../../types';

const mediaGenres = new MediaGenresHandler();

const resolvers: QueryResolvers = {
  Query: {
    trending_tv_shows: (): {} => ({}),
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
      dataSources.tmdb.getTrendingTVShowsItem(args, TVShowsEndpoints.OnTheAir),

    popular: (
      _: {},
      { args }: TrendingTvShowsPopularArgs,
      { dataSources }: Context,
    ): Promise<TrendingTvShowsQueryResult> =>
      dataSources.tmdb.getTrendingTVShowsItem(args, TVShowsEndpoints.Popular),

    top_rated: (
      _: {},
      { args }: TrendingTvShowsTopRatedArgs,
      { dataSources }: Context,
    ): Promise<TrendingTvShowsQueryResult> =>
      dataSources.tmdb.getTrendingTVShowsItem(args, TVShowsEndpoints.TopRated),
  },
};

export default resolvers;
