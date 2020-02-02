import MediaGenresHandler from '../datasources/the-movie-db-api/handlers/media-genres';

import {
  QueryResolvers,
  TrendingMoviesQueryResult,
  TrendingMoviesNow_PlayingArgs as TrendingMoviesNowPlayingArgs,
  TrendingMoviesPopularArgs,
  QueryMovieArgs,
  BaseMovieGenre_IdsArgs as BaseMovieGenreIdsArgs,
  Movie,
  MediaType,
  CastItem,
  CrewItem,
  BaseMovie,
  MovieVideo,
  MovieReviewsArgs,
  ReviewsQueryResultResolvers,
} from '../../lib/types';
import { Context, MediaGenre } from '../../types';

const mediaGenres = new MediaGenresHandler();

type MovieCredits = {
  cast: CastItem[];
  crew: CrewItem[];
};

type MoviesSimilar = {
  results: BaseMovie[];
};

type MovieVideos = {
  results: MovieVideo[];
};

const BASE_VIDEO_THHUMBNAIL_URL = 'https://img.youtube.com/vi';

const resolvers: QueryResolvers = {
  Query: {
    trending_movies: (): {} => ({}),

    movie: (_: {}, params: QueryMovieArgs, { dataSources }: Context): Promise<Movie> =>
      dataSources.tmdb.getMovie(params),
  },
  Movie: {
    spoken_languages: ({
      spoken_languages,
    }: {
      spoken_languages: Array<{ name: string }>;
    }): string[] => spoken_languages.map(({ name }) => name),

    production_countries: ({
      production_countries,
    }: {
      production_countries: Array<{ name: string }>;
    }): string[] => production_countries.map(({ name }) => name),

    cast: ({ credits }: { credits: MovieCredits }): CastItem[] =>
      credits.cast.map(castItem => ({
        name: castItem.name,
        profile_path: castItem.profile_path,
        id: castItem.id,
        character: castItem.character,
      })),

    crew: ({ credits }: { credits: MovieCredits }): CrewItem[] =>
      credits.crew.map(castItem => ({
        profile_path: castItem.profile_path,
        department: castItem.department,
        id: castItem.id,
        job: castItem.job,
        name: castItem.name,
      })),

    reviews: (
      _: {},
      params: MovieReviewsArgs,
      { dataSources }: Context,
    ): ReviewsQueryResultResolvers => dataSources.tmdb.getMovieReviews(params),

    similar: ({ similar }: { similar: MoviesSimilar }): BaseMovie[] => similar.results,

    videos: ({ videos }: { videos: MovieVideos }): MovieVideo[] =>
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
      { language }: BaseMovieGenreIdsArgs,
    ): Promise<string[]> => {
      const genreIds = genres.map(({ id }) => id);

      return mediaGenres.getMediaGenres(
        genreIds,
        MediaType.Movie.toLowerCase(),
        language,
      );
    },
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

    upcoming: (
      _: {},
      { input }: TrendingMoviesPopularArgs,
      { dataSources }: Context,
    ): Promise<TrendingMoviesQueryResult> =>
      dataSources.tmdb.getTrendingMoviesItem(input, 'upcoming'),
  },
};

export default resolvers;
