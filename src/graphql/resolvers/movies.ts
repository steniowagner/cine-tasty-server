/* eslint-disable @typescript-eslint/camelcase */
import MediaGenresHandler from '../datasources/the-movie-db-api/handlers/media-genres/MediaGenresHandler';

import {
  QueryResolvers,
  TrendingMoviesQueryResult,
  TrendingMoviesNow_PlayingArgs as TrendingMoviesNowPlayingArgs,
  TrendingMoviesPopularArgs,
  TrendingMoviesTop_RatedArgs as TrendingMoviesTopRatedArgs,
  TrendingMoviesUpcomingArgs,
  QueryMovieArgs,
  BaseMovieGenre_IdsArgs as BaseMovieGenreIdsArgs,
  MovieResponse,
  MovieGenresArgs,
  MediaType,
  CastItem,
  CastItemResponse,
  CrewItem,
  MediaVideo,
  MovieImagesArgs,
  ProductionCompanyResponse,
  Review,
  BaseMovie,
  BaseMovieResponse,
} from 'lib/types';
import {
  Context,
  MediaGenre,
  MediaItem,
  MediaCredits,
  TrendingMoviesEndpoints,
  BasePaginationResponse,
} from '@types';

const mediaGenres = new MediaGenresHandler();

type MovieVideos = {
  results: MediaVideo[];
};

type SimilarMovies = {
  results: BaseMovie[];
};

type MovieReview = BasePaginationResponse & { results: Review[] };

const BASE_VIDEO_THHUMBNAIL_URL = 'https://img.youtube.com/vi';

const resolvers: QueryResolvers = {
  Query: {
    trending_movies: (): {} => ({}),

    movie: (
      _: {},
      args: QueryMovieArgs,
      { dataSources }: Context,
    ): Promise<MovieResponse | null> => dataSources.tmdb.getMovie(args),
  },

  BaseMovie: {
    genreIds: (
      { genre_ids }: MediaItem,
      { language }: BaseMovieGenreIdsArgs,
    ): Promise<string[]> =>
      mediaGenres.handle({
        mediaType: MediaType.Movie,
        genresIds: genre_ids,
        language,
      }),

    backdropPath: ({ backdrop_path }: BaseMovieResponse): string | undefined | null =>
      backdrop_path,

    originalTitle: ({ original_title }: BaseMovieResponse): string | undefined | null =>
      original_title,

    releaseDate: ({ release_date }: BaseMovieResponse): string | undefined | null =>
      release_date,

    voteAverage: ({ vote_average }: BaseMovieResponse): number | undefined | null =>
      vote_average,

    voteCount: ({ vote_count }: BaseMovieResponse): number | undefined | null =>
      vote_count,

    mediaType: ({ media_type }: BaseMovieResponse): string | undefined | null =>
      media_type,

    posterPath: ({ poster_path }: BaseMovieResponse): string | undefined | null =>
      poster_path,

    originalLanguage: ({
      original_language,
    }: BaseMovieResponse): string | undefined | null => original_language,
  },

  ProductionCompany: {
    logoPath: ({ logo_path }: ProductionCompanyResponse): string | undefined | null =>
      logo_path,

    originCountry: ({
      origin_country,
    }: ProductionCompanyResponse): string | undefined | null => origin_country,
  },

  Movie: {
    backdropPath: ({ backdrop_path }: MovieResponse): string | undefined | null =>
      backdrop_path,

    releaseDate: ({ release_date }: MovieResponse): string | undefined | null =>
      release_date,

    originalLanguage: ({ original_language }: MovieResponse): string | undefined | null =>
      original_language,

    originalTitle: ({ original_title }: MovieResponse): string | undefined | null =>
      original_title,

    posterPath: ({ poster_path }: MovieResponse): string | undefined | null =>
      poster_path,

    voteAverage: ({ vote_average }: MovieResponse): number | undefined | null =>
      vote_average,

    voteCount: ({ vote_count }: MovieResponse): number | undefined | null => vote_count,

    productionCompanies: ({
      production_companies,
    }: MovieResponse): ProductionCompanyResponse[] => production_companies,

    spokenLanguages: ({
      spoken_languages,
    }: {
      spoken_languages: Array<{ name: string }>;
    }): string[] => spoken_languages.map(({ name }) => name),

    productionCountries: ({
      production_countries,
    }: {
      production_countries: Array<{ name: string }>;
    }): string[] => production_countries.map(({ name }) => name),

    cast: ({ credits }: { credits: MediaCredits }): CastItem[] =>
      credits.cast.map(castItem => ({
        name: castItem.name,
        profilePath: castItem.profile_path,
        id: castItem.id,
        character: castItem.character,
      })),

    crew: ({ credits }: { credits: MediaCredits }): CrewItem[] =>
      credits.crew.map(castItem => ({
        profilePath: castItem.profile_path,
        department: castItem.department,
        id: castItem.id,
        job: castItem.job,
        name: castItem.name,
      })),

    images: (
      _: {},
      { id }: MovieImagesArgs,
      { dataSources }: Context,
    ): Promise<string[]> => dataSources.tmdb.getMovieImages(id),

    reviews: ({ reviews }: { reviews: MovieReview }): Review[] => reviews.results,

    similar: ({ similar }: { similar: SimilarMovies }): BaseMovie[] => similar.results,

    videos: ({ videos }: { videos: MovieVideos }): MediaVideo[] =>
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
      { language }: MovieGenresArgs,
    ): Promise<string[]> => {
      const genresIds = genres.map(({ id }) => id);

      return mediaGenres.handle({
        mediaType: MediaType.Movie,
        genresIds,
        language,
      });
    },
  },

  TrendingMovies: {
    now_playing: (
      _: {},
      { args }: TrendingMoviesNowPlayingArgs,
      { dataSources }: Context,
    ): Promise<TrendingMoviesQueryResult> =>
      dataSources.tmdb.getTrendingMoviesItem(args, TrendingMoviesEndpoints.NowPlaying),

    popular: (
      _: {},
      { args }: TrendingMoviesPopularArgs,
      { dataSources }: Context,
    ): Promise<TrendingMoviesQueryResult> =>
      dataSources.tmdb.getTrendingMoviesItem(args, TrendingMoviesEndpoints.Popular),

    top_rated: (
      _: {},
      { args }: TrendingMoviesTopRatedArgs,
      { dataSources }: Context,
    ): Promise<TrendingMoviesQueryResult> =>
      dataSources.tmdb.getTrendingMoviesItem(args, TrendingMoviesEndpoints.TopRated),

    upcoming: (
      _: {},
      { args }: TrendingMoviesUpcomingArgs,
      { dataSources }: Context,
    ): Promise<TrendingMoviesQueryResult> =>
      dataSources.tmdb.getTrendingMoviesItem(args, TrendingMoviesEndpoints.Upcoming),
  },
};

export default resolvers;
