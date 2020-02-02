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

    similar: ({ similar }: { similar: MoviesSimilar }): BaseMovie[] => similar.results,

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
