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
  MovieVideo,
  MovieReviewsArgs,
  ReviewsQueryResultResolvers,
  SimilarMoviesQueryResultResolvers,
  MovieSimilarArgs,
} from '../../lib/types';
import { Context, MediaGenre, MediaItem } from '../../types';

const mediaGenres = new MediaGenresHandler();

type MovieCredits = {
  cast: CastItem[];
  crew: CrewItem[];
};

type MovieVideos = {
  results: MovieVideo[];
};

const BASE_VIDEO_THHUMBNAIL_URL = 'https://img.youtube.com/vi';

const resolvers: QueryResolvers = {
  Query: {
    trending_movies: (): {} => ({}),

    movie: (
      _: {},
      args: QueryMovieArgs,
      { dataSources }: Context,
    ): Promise<Movie | null> => dataSources.tmdb.getMovie(args),
  },

  BaseMovie: {
    genre_ids: (
      { genre_ids }: MediaItem,
      { language }: BaseMovieGenreIdsArgs,
    ): Promise<string[]> =>
      mediaGenres.getMediaGenres(genre_ids, MediaType.Movie.toLowerCase(), language),
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
      args: MovieReviewsArgs,
      { dataSources }: Context,
    ): ReviewsQueryResultResolvers => dataSources.tmdb.getMovieReviews(args),

    similar: (
      _: {},
      args: MovieSimilarArgs,
      { dataSources }: Context,
    ): SimilarMoviesQueryResultResolvers => dataSources.tmdb.getSimilarMovies(args),

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
      { args }: TrendingMoviesNowPlayingArgs,
      { dataSources }: Context,
    ): Promise<TrendingMoviesQueryResult> =>
      dataSources.tmdb.getTrendingMoviesItem(args, 'now_playing'),

    popular: (
      _: {},
      { args }: TrendingMoviesPopularArgs,
      { dataSources }: Context,
    ): Promise<TrendingMoviesQueryResult> =>
      dataSources.tmdb.getTrendingMoviesItem(args, 'popular'),

    top_rated: (
      _: {},
      { args }: TrendingMoviesPopularArgs,
      { dataSources }: Context,
    ): Promise<TrendingMoviesQueryResult> =>
      dataSources.tmdb.getTrendingMoviesItem(args, 'top_rated'),

    upcoming: (
      _: {},
      { args }: TrendingMoviesPopularArgs,
      { dataSources }: Context,
    ): Promise<TrendingMoviesQueryResult> =>
      dataSources.tmdb.getTrendingMoviesItem(args, 'upcoming'),
  },
};

export default resolvers;
