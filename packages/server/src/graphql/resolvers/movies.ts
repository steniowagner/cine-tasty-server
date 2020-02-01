import {
  QueryResolvers,
  TrendingMoviesQueryResult,
  TrendingMoviesNow_PlayingArgs as TrendingMoviesNowPlayingArgs,
  TrendingMoviesPopularArgs,
} from '../../lib/types';
import { Context } from '../../types';

const resolvers: QueryResolvers = {
  Query: {
    trending_movies: (): {} => ({}),
  },
  TrendingMovies: {
    now_playing: (
      _: {},
      { input }: TrendingMoviesNowPlayingArgs,
      { dataSources }: Context,
    ): Promise<TrendingMoviesQueryResult> =>
      dataSources.tmdb.getTrendingMoviesItem(input, 'now_playing'),
    popular: (
      _: {},
      { input }: TrendingMoviesPopularArgs,
      { dataSources }: Context,
    ): Promise<TrendingMoviesQueryResult> =>
      dataSources.tmdb.getTrendingMoviesItem(input, 'popular'),
    top_rated: (
      _: {},
      { input }: TrendingMoviesPopularArgs,
      { dataSources }: Context,
    ): Promise<TrendingMoviesQueryResult> =>
      dataSources.tmdb.getTrendingMoviesItem(input, 'top_rated'),
  },
};

export default resolvers;
