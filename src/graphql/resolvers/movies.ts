/* eslint-disable @typescript-eslint/camelcase */

import MediaGenresHandler from '../datasources/the-movie-db-api/handlers/media-genres/MediaGenresHandler';

import * as TMDBPITypes from '@tmdb-api-types';
import * as LibTypes from '@lib/types';
import { Context } from '@types';

const mediaGenres = new MediaGenresHandler();

type MovieVideos = {
  results: LibTypes.MediaVideo[];
};

type SimilarMovies = {
  results: LibTypes.BaseMovie[];
};

type MovieReview = TMDBPITypes.BasePaginationResponse & { results: LibTypes.Review[] };

const BASE_VIDEO_THHUMBNAIL_URL = 'https://img.youtube.com/vi';

const resolvers: LibTypes.QueryResolvers = {
  Query: {
    trendingMovies: (): {} => ({}),

    movie: (
      _: {},
      args: LibTypes.QueryMovieArgs,
      { dataSources }: Context,
    ): Promise<LibTypes.MovieResponse | null> => dataSources.tmdb.getMovie(args),
  },

  BaseMovie: {
    genreIds: (
      { genre_ids }: TMDBPITypes.MediaItem,
      { language }: LibTypes.BaseMovieGenreIdsArgs,
    ): Promise<string[]> =>
      mediaGenres.handle({
        mediaType: LibTypes.MediaType.Movie,
        genresIds: genre_ids,
        language,
      }),

    backdropPath: ({
      backdrop_path,
    }: LibTypes.BaseMovieResponse): string | undefined | null => backdrop_path,

    originalTitle: ({
      original_title,
    }: LibTypes.BaseMovieResponse): string | undefined | null => original_title,

    releaseDate: ({
      release_date,
    }: LibTypes.BaseMovieResponse): string | undefined | null => release_date,

    voteAverage: ({
      vote_average,
    }: LibTypes.BaseMovieResponse): number | undefined | null => vote_average,

    voteCount: ({ vote_count }: LibTypes.BaseMovieResponse): number | undefined | null =>
      vote_count,

    mediaType: ({ media_type }: LibTypes.BaseMovieResponse): string | undefined | null =>
      media_type,

    posterPath: ({
      poster_path,
    }: LibTypes.BaseMovieResponse): string | undefined | null => poster_path,

    originalLanguage: ({
      original_language,
    }: LibTypes.BaseMovieResponse): string | undefined | null => original_language,
  },

  ProductionCompany: {
    logoPath: ({
      logo_path,
    }: LibTypes.ProductionCompanyResponse): string | undefined | null => logo_path,

    originCountry: ({
      origin_country,
    }: LibTypes.ProductionCompanyResponse): string | undefined | null => origin_country,
  },

  Movie: {
    backdropPath: ({
      backdrop_path,
    }: LibTypes.MovieResponse): string | undefined | null => backdrop_path,

    releaseDate: ({ release_date }: LibTypes.MovieResponse): string | undefined | null =>
      release_date,

    originalLanguage: ({
      original_language,
    }: LibTypes.MovieResponse): string | undefined | null => original_language,

    originalTitle: ({
      original_title,
    }: LibTypes.MovieResponse): string | undefined | null => original_title,

    posterPath: ({ poster_path }: LibTypes.MovieResponse): string | undefined | null =>
      poster_path,

    voteAverage: ({ vote_average }: LibTypes.MovieResponse): number | undefined | null =>
      vote_average,

    voteCount: ({ vote_count }: LibTypes.MovieResponse): number | undefined | null =>
      vote_count,

    productionCompanies: ({
      production_companies,
    }: LibTypes.MovieResponse): LibTypes.ProductionCompanyResponse[] =>
      production_companies,

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

    cast: ({ credits }: { credits: TMDBPITypes.MediaCredits }): LibTypes.CastItem[] =>
      credits.cast.map(castItem => ({
        name: castItem.name,
        profilePath: castItem.profile_path,
        id: castItem.id,
        character: castItem.character,
      })),

    crew: ({ credits }: { credits: TMDBPITypes.MediaCredits }): LibTypes.CrewItem[] =>
      credits.crew.map(castItem => ({
        profilePath: castItem.profile_path,
        department: castItem.department,
        id: castItem.id,
        job: castItem.job,
        name: castItem.name,
      })),

    images: (
      _: {},
      { id }: LibTypes.MovieImagesArgs,
      { dataSources }: Context,
    ): Promise<string[]> => dataSources.tmdb.getMovieImages(id),

    reviews: ({ reviews }: { reviews: MovieReview }): LibTypes.Review[] =>
      reviews.results,

    similar: ({ similar }: { similar: SimilarMovies }): LibTypes.BaseMovie[] =>
      similar.results,

    videos: ({ videos }: { videos: MovieVideos }): LibTypes.MediaVideo[] =>
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

    genres: (
      { genres }: { genres: Array<TMDBPITypes.MediaGenre> },
      { language }: LibTypes.MovieGenresArgs,
    ): Promise<string[]> => {
      const genresIds = genres.map(({ id }) => id);

      return mediaGenres.handle({
        mediaType: LibTypes.MediaType.Movie,
        genresIds,
        language,
      });
    },
  },

  TrendingMovies: {
    nowPlaying: (
      _: {},
      { args }: LibTypes.TrendingMoviesNowPlayingArgs,
      { dataSources }: Context,
    ): Promise<LibTypes.TrendingMoviesQueryResult> =>
      dataSources.tmdb.getTrendingMovies(
        args,
        TMDBPITypes.TrendingMoviesEndpoints.NowPlaying,
      ),

    popular: (
      _: {},
      { args }: LibTypes.TrendingMoviesPopularArgs,
      { dataSources }: Context,
    ): Promise<LibTypes.TrendingMoviesQueryResult> =>
      dataSources.tmdb.getTrendingMovies(
        args,
        TMDBPITypes.TrendingMoviesEndpoints.Popular,
      ),

    topRated: (
      _: {},
      { args }: LibTypes.TrendingMoviesTopRatedArgs,
      { dataSources }: Context,
    ): Promise<LibTypes.TrendingMoviesQueryResult> =>
      dataSources.tmdb.getTrendingMovies(
        args,
        TMDBPITypes.TrendingMoviesEndpoints.TopRated,
      ),

    upcoming: (
      _: {},
      { args }: LibTypes.TrendingMoviesUpcomingArgs,
      { dataSources }: Context,
    ): Promise<LibTypes.TrendingMoviesQueryResult> =>
      dataSources.tmdb.getTrendingMovies(
        args,
        TMDBPITypes.TrendingMoviesEndpoints.Upcoming,
      ),
  },
};

export default resolvers;
