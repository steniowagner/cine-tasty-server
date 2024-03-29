import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type BaseFamousCast = {
  backdropPath?: Maybe<Scalars['String']['output']>;
  character?: Maybe<Scalars['String']['output']>;
  creditId?: Maybe<Scalars['String']['output']>;
  genres: Array<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  mediaType?: Maybe<Scalars['String']['output']>;
  originalLanguage?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  posterPath?: Maybe<Scalars['String']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Float']['output']>;
};


export type BaseFamousCastGenresArgs = {
  language?: InputMaybe<Iso6391Language>;
};

export type CreatedBy = {
  __typename?: 'CreatedBy';
  creditId?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  profilePath?: Maybe<Scalars['String']['output']>;
};

export type Episode = {
  __typename?: 'Episode';
  airDate?: Maybe<Scalars['String']['output']>;
  crew: Array<TvShowEpisodeCrew>;
  episodeNumber?: Maybe<Scalars['Int']['output']>;
  episodeType?: Maybe<Scalars['String']['output']>;
  guestStars: Array<TvShowEpisodeGuestStar>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  productionCode?: Maybe<Scalars['String']['output']>;
  runtime?: Maybe<Scalars['Int']['output']>;
  seasonNumber?: Maybe<Scalars['Int']['output']>;
  showId?: Maybe<Scalars['Int']['output']>;
  stillPath?: Maybe<Scalars['String']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Int']['output']>;
};

export type Famous = {
  __typename?: 'Famous';
  biography?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['String']['output']>;
  cast: FamousCast;
  deathday?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  images: Array<Scalars['String']['output']>;
  knownForDepartment?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  placeOfBirth?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  profilePath?: Maybe<Scalars['String']['output']>;
};


export type FamousCastArgs = {
  language?: InputMaybe<Iso6391Language>;
};

export type FamousCast = {
  __typename?: 'FamousCast';
  moviesCast: Array<FamousCastMovie>;
  tvShowsCast: Array<FamousCastTvShow>;
};

export type FamousCastMovie = BaseFamousCast & {
  __typename?: 'FamousCastMovie';
  adult?: Maybe<Scalars['Boolean']['output']>;
  backdropPath?: Maybe<Scalars['String']['output']>;
  character?: Maybe<Scalars['String']['output']>;
  creditId?: Maybe<Scalars['String']['output']>;
  genres: Array<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  mediaType?: Maybe<Scalars['String']['output']>;
  originalLanguage?: Maybe<Scalars['String']['output']>;
  originalTitle?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  posterPath?: Maybe<Scalars['String']['output']>;
  releaseDate?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Scalars['Boolean']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Float']['output']>;
};


export type FamousCastMovieGenresArgs = {
  language?: InputMaybe<Iso6391Language>;
};

export type FamousCastTvShow = BaseFamousCast & {
  __typename?: 'FamousCastTVShow';
  backdropPath?: Maybe<Scalars['String']['output']>;
  character?: Maybe<Scalars['String']['output']>;
  creditId?: Maybe<Scalars['String']['output']>;
  episodeCount?: Maybe<Scalars['Int']['output']>;
  firstAirDate?: Maybe<Scalars['String']['output']>;
  genres: Array<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  mediaType?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  originCountry: Array<Scalars['String']['output']>;
  originalLanguage?: Maybe<Scalars['String']['output']>;
  originalName?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  posterPath?: Maybe<Scalars['String']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Float']['output']>;
};


export type FamousCastTvShowGenresArgs = {
  language?: InputMaybe<Iso6391Language>;
};

export enum Iso6391Language {
  En = 'en',
  Es = 'es',
  Pt = 'pt'
}

export type LastEpisodeToAir = {
  __typename?: 'LastEpisodeToAir';
  airDate?: Maybe<Scalars['String']['output']>;
  episodeNumber?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  productionCode?: Maybe<Scalars['String']['output']>;
  runtime?: Maybe<Scalars['Int']['output']>;
  seasonNumber?: Maybe<Scalars['Int']['output']>;
  showId?: Maybe<Scalars['Int']['output']>;
  stillPath?: Maybe<Scalars['String']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Int']['output']>;
};

export type MediaCast = {
  __typename?: 'MediaCast';
  adult?: Maybe<Scalars['Boolean']['output']>;
  character?: Maybe<Scalars['String']['output']>;
  creditId?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  knownForDepartment?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  originalName?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  profilePath?: Maybe<Scalars['String']['output']>;
};

export type MediaCrew = {
  __typename?: 'MediaCrew';
  department?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  job?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  profilePath?: Maybe<Scalars['String']['output']>;
};

export type MediaGenre = {
  __typename?: 'MediaGenre';
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export enum MediaType {
  Movie = 'MOVIE',
  Tv = 'TV'
}

export type MediaVideo = {
  __typename?: 'MediaVideo';
  id?: Maybe<Scalars['ID']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  site?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Thumbnail>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Movie = {
  __typename?: 'Movie';
  adult?: Maybe<Scalars['Boolean']['output']>;
  backdropPath?: Maybe<Scalars['String']['output']>;
  belongsToCollection?: Maybe<MovieBelongsToCollection>;
  budget?: Maybe<Scalars['Float']['output']>;
  cast: Array<MediaCast>;
  crew: Array<MediaCrew>;
  genres: Array<Scalars['String']['output']>;
  homepage?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  images: Array<Scalars['String']['output']>;
  imdbId?: Maybe<Scalars['String']['output']>;
  originalLanguage?: Maybe<Scalars['String']['output']>;
  originalTitle?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  posterPath?: Maybe<Scalars['String']['output']>;
  productionCompanies: Array<MovieProductionCompany>;
  productionCountries: Array<Scalars['String']['output']>;
  releaseDate?: Maybe<Scalars['String']['output']>;
  revenue?: Maybe<Scalars['Float']['output']>;
  runtime?: Maybe<Scalars['Int']['output']>;
  similar: Array<SimilarMovie>;
  spokenLanguages: Array<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tagline?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Scalars['Boolean']['output']>;
  videos: Array<MediaVideo>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Int']['output']>;
};


export type MovieGenresArgs = {
  language?: InputMaybe<Iso6391Language>;
};


export type MovieImagesArgs = {
  id: Scalars['Int']['input'];
  language?: InputMaybe<Iso6391Language>;
};


export type MovieSimilarArgs = {
  id: Scalars['Int']['input'];
  language?: InputMaybe<Iso6391Language>;
};


export type MovieVideosArgs = {
  id: Scalars['Int']['input'];
  language?: InputMaybe<Iso6391Language>;
};

export type MovieBelongsToCollection = {
  __typename?: 'MovieBelongsToCollection';
  backdropPath?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  posterPath?: Maybe<Scalars['String']['output']>;
};

export type MovieProductionCompany = {
  __typename?: 'MovieProductionCompany';
  id: Scalars['Int']['output'];
  logoPath?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  originCountry?: Maybe<Scalars['String']['output']>;
};

export type Networks = {
  __typename?: 'Networks';
  id: Scalars['Int']['output'];
  logoPath?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  originCountry?: Maybe<Scalars['String']['output']>;
};

export type NewsArticle = {
  __typename?: 'NewsArticle';
  author?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export enum NewsLanguage {
  /** Arabic */
  Ar = 'AR',
  /** German */
  De = 'DE',
  /** English */
  En = 'EN',
  /** Spanish */
  Es = 'ES',
  /** French */
  Fr = 'FR',
  /** Hebrew */
  He = 'HE',
  /** Italian */
  It = 'IT',
  /** Dutch */
  Nl = 'NL',
  /** Norwegian */
  No = 'NO',
  /** Portuguese */
  Pt = 'PT',
  /** Russian */
  Ru = 'RU',
  /** Northern Sami */
  Se = 'SE',
  /** Mandarim */
  Zh = 'ZH'
}

export type NewsResult = {
  __typename?: 'NewsResult';
  hasMore: Scalars['Boolean']['output'];
  items: Array<NewsArticle>;
};

export type ProductionCompanies = {
  __typename?: 'ProductionCompanies';
  id: Scalars['Int']['output'];
  logoPath?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  originCountry?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['String']['output']>;
  famous: Famous;
  mediaGenres: Array<MediaGenre>;
  movie: Movie;
  news: NewsResult;
  quiz: Array<QuizQuestion>;
  searchFamous: SearchFamousResult;
  searchMovies: SearchMoviesResult;
  searchTVShows: SearchTvShowsResult;
  trendingFamous: TrendingFamousResult;
  trendingMovies: TrendingMovies;
  trendingTVShows: TrendingTvShows;
  tvShow: TvShow;
  tvShowSeason: TvShowSeason;
};


export type QueryFamousArgs = {
  id: Scalars['Int']['input'];
  language?: InputMaybe<Iso6391Language>;
};


export type QueryMediaGenresArgs = {
  language?: InputMaybe<Iso6391Language>;
  mediaType: MediaType;
};


export type QueryMovieArgs = {
  id: Scalars['Int']['input'];
  language?: InputMaybe<Iso6391Language>;
};


export type QueryNewsArgs = {
  language: NewsLanguage;
  page: Scalars['Int']['input'];
};


export type QueryQuizArgs = {
  input: QuizInput;
};


export type QuerySearchFamousArgs = {
  input: SearchInput;
};


export type QuerySearchMoviesArgs = {
  input: SearchInput;
};


export type QuerySearchTvShowsArgs = {
  input: SearchInput;
};


export type QueryTrendingFamousArgs = {
  language?: InputMaybe<Iso6391Language>;
  page: Scalars['Int']['input'];
};


export type QueryTrendingMoviesArgs = {
  language?: InputMaybe<Iso6391Language>;
};


export type QueryTrendingTvShowsArgs = {
  language?: InputMaybe<Iso6391Language>;
};


export type QueryTvShowArgs = {
  id: Scalars['Int']['input'];
  language?: InputMaybe<Iso6391Language>;
};


export type QueryTvShowSeasonArgs = {
  input: TvShowSeasonInput;
};

export type QuizInput = {
  category: QuizQuestionCategory;
  difficulty: QuizQuestionDifficulty;
  numberOfQuestions: Scalars['Int']['input'];
  type: QuizQuestionType;
};

export type QuizQuestion = {
  __typename?: 'QuizQuestion';
  category: Scalars['String']['output'];
  correctAnswer: Scalars['String']['output'];
  difficulty: Scalars['String']['output'];
  options: Array<Scalars['String']['output']>;
  question: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export enum QuizQuestionCategory {
  Mixed = 'MIXED',
  Movie = 'MOVIE',
  Tv = 'TV'
}

export enum QuizQuestionDifficulty {
  Easy = 'EASY',
  Hard = 'HARD',
  Medium = 'MEDIUM',
  Mixed = 'MIXED'
}

export enum QuizQuestionType {
  Boolean = 'BOOLEAN',
  Mixed = 'MIXED',
  Multiple = 'MULTIPLE'
}

export type SearchFamousItem = {
  __typename?: 'SearchFamousItem';
  adult?: Maybe<Scalars['Boolean']['output']>;
  gender?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  knownFor: Array<SearchFamousKnownFor>;
  knownForDepartment?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  originalName?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  profilePath?: Maybe<Scalars['String']['output']>;
};

export type SearchFamousKnownFor = SearchFamousKnownForMovie | SearchFamousKnownForTvShow;

export type SearchFamousKnownForMovie = {
  __typename?: 'SearchFamousKnownForMovie';
  adult?: Maybe<Scalars['Boolean']['output']>;
  backdropPath?: Maybe<Scalars['String']['output']>;
  genres: Array<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  mediaType?: Maybe<Scalars['String']['output']>;
  originalLanguage?: Maybe<Scalars['String']['output']>;
  originalTitle?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  posterPath?: Maybe<Scalars['String']['output']>;
  releaseDate?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Scalars['Boolean']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Int']['output']>;
};


export type SearchFamousKnownForMovieGenresArgs = {
  input: SearchInput;
};

export type SearchFamousKnownForTvShow = {
  __typename?: 'SearchFamousKnownForTVShow';
  adult?: Maybe<Scalars['Boolean']['output']>;
  backdropPath?: Maybe<Scalars['String']['output']>;
  firstAirDate?: Maybe<Scalars['String']['output']>;
  genres: Array<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  mediaType?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  originCountry: Array<Scalars['String']['output']>;
  originalLanguage?: Maybe<Scalars['String']['output']>;
  originalName?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  posterPath?: Maybe<Scalars['String']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Int']['output']>;
};


export type SearchFamousKnownForTvShowGenresArgs = {
  input: SearchInput;
};

export type SearchFamousResult = {
  __typename?: 'SearchFamousResult';
  hasMore: Scalars['Boolean']['output'];
  items: Array<SearchFamousItem>;
  totalPages: Scalars['Int']['output'];
  totalResults: Scalars['Int']['output'];
};

export type SearchInput = {
  language?: InputMaybe<Iso6391Language>;
  page: Scalars['Int']['input'];
  query: Scalars['String']['input'];
};

export type SearchMovieItem = {
  __typename?: 'SearchMovieItem';
  adult?: Maybe<Scalars['Boolean']['output']>;
  backdropPath?: Maybe<Scalars['String']['output']>;
  genres: Array<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  originalLanguage?: Maybe<Scalars['String']['output']>;
  originalTitle?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  posterPath?: Maybe<Scalars['String']['output']>;
  releaseDate?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Scalars['Boolean']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Int']['output']>;
};


export type SearchMovieItemGenresArgs = {
  input: SearchInput;
};

export type SearchMoviesResult = {
  __typename?: 'SearchMoviesResult';
  hasMore: Scalars['Boolean']['output'];
  items: Array<SearchMovieItem>;
  totalPages: Scalars['Int']['output'];
  totalResults: Scalars['Int']['output'];
};

export type SearchTvShowItem = {
  __typename?: 'SearchTVShowItem';
  adult?: Maybe<Scalars['Boolean']['output']>;
  backdropPath?: Maybe<Scalars['String']['output']>;
  firstAirDate?: Maybe<Scalars['String']['output']>;
  genres: Array<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  originCountry: Array<Scalars['String']['output']>;
  originalLanguage?: Maybe<Scalars['String']['output']>;
  originalName?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  posterPath?: Maybe<Scalars['String']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Int']['output']>;
};


export type SearchTvShowItemGenresArgs = {
  input: SearchInput;
};

export type SearchTvShowsResult = {
  __typename?: 'SearchTVShowsResult';
  hasMore: Scalars['Boolean']['output'];
  items: Array<SearchTvShowItem>;
  totalPages: Scalars['Int']['output'];
  totalResults: Scalars['Int']['output'];
};

export type Seasons = {
  __typename?: 'Seasons';
  airDate?: Maybe<Scalars['String']['output']>;
  episodeCount?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  posterPath?: Maybe<Scalars['String']['output']>;
  seasonNumber?: Maybe<Scalars['Int']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
};

export type SimilarMovie = {
  __typename?: 'SimilarMovie';
  adult?: Maybe<Scalars['Boolean']['output']>;
  backdropPath?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  originalLanguage?: Maybe<Scalars['String']['output']>;
  originalTitle?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  posterPath?: Maybe<Scalars['String']['output']>;
  releaseDate?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Int']['output']>;
};

export type SimilarTvShow = {
  __typename?: 'SimilarTVShow';
  adult?: Maybe<Scalars['Boolean']['output']>;
  backdropPath?: Maybe<Scalars['String']['output']>;
  firstAirDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  originCountry: Array<Scalars['String']['output']>;
  originalLanguage?: Maybe<Scalars['String']['output']>;
  originalName?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  posterPath?: Maybe<Scalars['String']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Int']['output']>;
};

export type TvShow = {
  __typename?: 'TVShow';
  adult?: Maybe<Scalars['Boolean']['output']>;
  backdropPath?: Maybe<Scalars['String']['output']>;
  cast: Array<MediaCast>;
  createdBy: Array<CreatedBy>;
  crew: Array<MediaCrew>;
  episodeRunTime: Array<Scalars['Int']['output']>;
  firstAirDate?: Maybe<Scalars['String']['output']>;
  genres: Array<Scalars['String']['output']>;
  homepage?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  images: Array<Scalars['String']['output']>;
  inProduction?: Maybe<Scalars['Boolean']['output']>;
  languages: Array<Scalars['String']['output']>;
  lastAirDate?: Maybe<Scalars['String']['output']>;
  lastEpisodeToAir?: Maybe<LastEpisodeToAir>;
  name?: Maybe<Scalars['String']['output']>;
  networks: Array<Networks>;
  nextEpisodeToAir?: Maybe<Scalars['String']['output']>;
  numberOfEpisodes?: Maybe<Scalars['Int']['output']>;
  numberOfSeasons?: Maybe<Scalars['Int']['output']>;
  originCountry: Array<Scalars['String']['output']>;
  originalLanguage?: Maybe<Scalars['String']['output']>;
  originalName?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  posterPath?: Maybe<Scalars['String']['output']>;
  productionCompanies: Array<ProductionCompanies>;
  productionCountries: Array<Scalars['String']['output']>;
  seasons: Array<Seasons>;
  similar: Array<SimilarTvShow>;
  spokenLanguages: Array<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tagline?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  videos: Array<MediaVideo>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Int']['output']>;
};


export type TvShowGenresArgs = {
  language?: InputMaybe<Iso6391Language>;
};


export type TvShowImagesArgs = {
  id: Scalars['Int']['input'];
  language?: InputMaybe<Iso6391Language>;
};


export type TvShowSimilarArgs = {
  id: Scalars['Int']['input'];
  language?: InputMaybe<Iso6391Language>;
};


export type TvShowVideosArgs = {
  id: Scalars['Int']['input'];
  language?: InputMaybe<Iso6391Language>;
};

export type TvShowEpisodeCrew = {
  __typename?: 'TVShowEpisodeCrew';
  adult?: Maybe<Scalars['Boolean']['output']>;
  creditId?: Maybe<Scalars['String']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  job?: Maybe<Scalars['String']['output']>;
  knownForDepartment?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  originalName?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  profilePath?: Maybe<Scalars['String']['output']>;
};

export type TvShowEpisodeGuestStar = {
  __typename?: 'TVShowEpisodeGuestStar';
  adult?: Maybe<Scalars['Boolean']['output']>;
  character?: Maybe<Scalars['String']['output']>;
  creditId?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  knownForDepartment?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  originalName?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  profilePath?: Maybe<Scalars['String']['output']>;
};

export type TvShowSeason = {
  __typename?: 'TVShowSeason';
  _id: Scalars['ID']['output'];
  airDate?: Maybe<Scalars['String']['output']>;
  episodes: Array<Episode>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  posterPath?: Maybe<Scalars['String']['output']>;
  seasonNumber?: Maybe<Scalars['Int']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
};

export type TvShowSeasonInput = {
  id: Scalars['Int']['input'];
  language?: InputMaybe<Iso6391Language>;
  season: Scalars['Int']['input'];
};

export type Thumbnail = {
  __typename?: 'Thumbnail';
  /** 1280x720 */
  extraLarge?: Maybe<Scalars['String']['output']>;
  /** 120x90 */
  extraSmall?: Maybe<Scalars['String']['output']>;
  /** 640x480 */
  large?: Maybe<Scalars['String']['output']>;
  /** 480x360 */
  medium?: Maybe<Scalars['String']['output']>;
  /** 320x180 */
  small?: Maybe<Scalars['String']['output']>;
};

export type TrendingFamousItem = {
  __typename?: 'TrendingFamousItem';
  adult?: Maybe<Scalars['Boolean']['output']>;
  gender?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  knownFor: Array<TrendingFamousKnownFor>;
  knownForDepartment?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  profilePath?: Maybe<Scalars['String']['output']>;
};

export type TrendingFamousKnownFor = TrendingFamousKnownForMovie | TrendingFamousKnownForTvShow;

export type TrendingFamousKnownForMovie = {
  __typename?: 'TrendingFamousKnownForMovie';
  adult?: Maybe<Scalars['Boolean']['output']>;
  backdropPath?: Maybe<Scalars['String']['output']>;
  genres: Array<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  mediaType?: Maybe<Scalars['String']['output']>;
  originalLanguage?: Maybe<Scalars['String']['output']>;
  originalTitle?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  posterPath?: Maybe<Scalars['String']['output']>;
  releaseDate?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Scalars['Boolean']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Int']['output']>;
};


export type TrendingFamousKnownForMovieGenresArgs = {
  language?: InputMaybe<Iso6391Language>;
};

export type TrendingFamousKnownForTvShow = {
  __typename?: 'TrendingFamousKnownForTVShow';
  backdropPath?: Maybe<Scalars['String']['output']>;
  firstAirDate?: Maybe<Scalars['String']['output']>;
  genres: Array<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  mediaType?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  originCountry: Array<Scalars['String']['output']>;
  originalLanguage?: Maybe<Scalars['String']['output']>;
  originalName?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  posterPath?: Maybe<Scalars['String']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Int']['output']>;
};


export type TrendingFamousKnownForTvShowGenresArgs = {
  language?: InputMaybe<Iso6391Language>;
};

export type TrendingFamousResult = {
  __typename?: 'TrendingFamousResult';
  hasMore: Scalars['Boolean']['output'];
  items: Array<TrendingFamousItem>;
  totalPages: Scalars['Int']['output'];
  totalResults: Scalars['Int']['output'];
};

export type TrendingMovie = {
  __typename?: 'TrendingMovie';
  adult?: Maybe<Scalars['Boolean']['output']>;
  backdropPath?: Maybe<Scalars['String']['output']>;
  genres: Array<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  originalLanguage?: Maybe<Scalars['String']['output']>;
  originalTitle?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  posterPath?: Maybe<Scalars['String']['output']>;
  releaseDate?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Scalars['Boolean']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Int']['output']>;
};


export type TrendingMovieGenresArgs = {
  language?: InputMaybe<Iso6391Language>;
};

export type TrendingMovies = {
  __typename?: 'TrendingMovies';
  nowPlaying: Array<TrendingMovie>;
  popular: Array<TrendingMovie>;
  topRated: Array<TrendingMovie>;
  upcoming: Array<TrendingMovie>;
};


export type TrendingMoviesNowPlayingArgs = {
  language?: InputMaybe<Iso6391Language>;
};


export type TrendingMoviesPopularArgs = {
  language?: InputMaybe<Iso6391Language>;
};


export type TrendingMoviesTopRatedArgs = {
  language?: InputMaybe<Iso6391Language>;
};


export type TrendingMoviesUpcomingArgs = {
  language?: InputMaybe<Iso6391Language>;
};

export type TrendingTvShow = {
  __typename?: 'TrendingTVShow';
  backdropPath?: Maybe<Scalars['String']['output']>;
  firstAirDate?: Maybe<Scalars['String']['output']>;
  genres: Array<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  originCountry: Array<Scalars['String']['output']>;
  originalLanguage?: Maybe<Scalars['String']['output']>;
  originalName?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  posterPath?: Maybe<Scalars['String']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Int']['output']>;
};


export type TrendingTvShowGenresArgs = {
  language?: InputMaybe<Iso6391Language>;
};

export type TrendingTvShows = {
  __typename?: 'TrendingTVShows';
  airingToday: Array<TrendingTvShow>;
  onTheAir: Array<TrendingTvShow>;
  popular: Array<TrendingTvShow>;
  topRated: Array<TrendingTvShow>;
};


export type TrendingTvShowsAiringTodayArgs = {
  language?: InputMaybe<Iso6391Language>;
};


export type TrendingTvShowsOnTheAirArgs = {
  language?: InputMaybe<Iso6391Language>;
};


export type TrendingTvShowsPopularArgs = {
  language?: InputMaybe<Iso6391Language>;
};


export type TrendingTvShowsTopRatedArgs = {
  language?: InputMaybe<Iso6391Language>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = {
  SearchFamousKnownFor: ( SearchFamousKnownForMovie ) | ( SearchFamousKnownForTvShow );
  TrendingFamousKnownFor: ( TrendingFamousKnownForMovie ) | ( TrendingFamousKnownForTvShow );
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  BaseFamousCast: ( FamousCastMovie ) | ( FamousCastTvShow );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BaseFamousCast: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['BaseFamousCast']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreatedBy: ResolverTypeWrapper<CreatedBy>;
  Episode: ResolverTypeWrapper<Episode>;
  Famous: ResolverTypeWrapper<Famous>;
  FamousCast: ResolverTypeWrapper<FamousCast>;
  FamousCastMovie: ResolverTypeWrapper<FamousCastMovie>;
  FamousCastTVShow: ResolverTypeWrapper<FamousCastTvShow>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  ISO6391Language: Iso6391Language;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LastEpisodeToAir: ResolverTypeWrapper<LastEpisodeToAir>;
  MediaCast: ResolverTypeWrapper<MediaCast>;
  MediaCrew: ResolverTypeWrapper<MediaCrew>;
  MediaGenre: ResolverTypeWrapper<MediaGenre>;
  MediaType: MediaType;
  MediaVideo: ResolverTypeWrapper<MediaVideo>;
  Movie: ResolverTypeWrapper<Movie>;
  MovieBelongsToCollection: ResolverTypeWrapper<MovieBelongsToCollection>;
  MovieProductionCompany: ResolverTypeWrapper<MovieProductionCompany>;
  Networks: ResolverTypeWrapper<Networks>;
  NewsArticle: ResolverTypeWrapper<NewsArticle>;
  NewsLanguage: NewsLanguage;
  NewsResult: ResolverTypeWrapper<NewsResult>;
  ProductionCompanies: ResolverTypeWrapper<ProductionCompanies>;
  Query: ResolverTypeWrapper<{}>;
  QuizInput: QuizInput;
  QuizQuestion: ResolverTypeWrapper<QuizQuestion>;
  QuizQuestionCategory: QuizQuestionCategory;
  QuizQuestionDifficulty: QuizQuestionDifficulty;
  QuizQuestionType: QuizQuestionType;
  SearchFamousItem: ResolverTypeWrapper<Omit<SearchFamousItem, 'knownFor'> & { knownFor: Array<ResolversTypes['SearchFamousKnownFor']> }>;
  SearchFamousKnownFor: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SearchFamousKnownFor']>;
  SearchFamousKnownForMovie: ResolverTypeWrapper<SearchFamousKnownForMovie>;
  SearchFamousKnownForTVShow: ResolverTypeWrapper<SearchFamousKnownForTvShow>;
  SearchFamousResult: ResolverTypeWrapper<SearchFamousResult>;
  SearchInput: SearchInput;
  SearchMovieItem: ResolverTypeWrapper<SearchMovieItem>;
  SearchMoviesResult: ResolverTypeWrapper<SearchMoviesResult>;
  SearchTVShowItem: ResolverTypeWrapper<SearchTvShowItem>;
  SearchTVShowsResult: ResolverTypeWrapper<SearchTvShowsResult>;
  Seasons: ResolverTypeWrapper<Seasons>;
  SimilarMovie: ResolverTypeWrapper<SimilarMovie>;
  SimilarTVShow: ResolverTypeWrapper<SimilarTvShow>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TVShow: ResolverTypeWrapper<TvShow>;
  TVShowEpisodeCrew: ResolverTypeWrapper<TvShowEpisodeCrew>;
  TVShowEpisodeGuestStar: ResolverTypeWrapper<TvShowEpisodeGuestStar>;
  TVShowSeason: ResolverTypeWrapper<TvShowSeason>;
  TVShowSeasonInput: TvShowSeasonInput;
  Thumbnail: ResolverTypeWrapper<Thumbnail>;
  TrendingFamousItem: ResolverTypeWrapper<Omit<TrendingFamousItem, 'knownFor'> & { knownFor: Array<ResolversTypes['TrendingFamousKnownFor']> }>;
  TrendingFamousKnownFor: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['TrendingFamousKnownFor']>;
  TrendingFamousKnownForMovie: ResolverTypeWrapper<TrendingFamousKnownForMovie>;
  TrendingFamousKnownForTVShow: ResolverTypeWrapper<TrendingFamousKnownForTvShow>;
  TrendingFamousResult: ResolverTypeWrapper<TrendingFamousResult>;
  TrendingMovie: ResolverTypeWrapper<TrendingMovie>;
  TrendingMovies: ResolverTypeWrapper<TrendingMovies>;
  TrendingTVShow: ResolverTypeWrapper<TrendingTvShow>;
  TrendingTVShows: ResolverTypeWrapper<TrendingTvShows>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BaseFamousCast: ResolversInterfaceTypes<ResolversParentTypes>['BaseFamousCast'];
  Boolean: Scalars['Boolean']['output'];
  CreatedBy: CreatedBy;
  Episode: Episode;
  Famous: Famous;
  FamousCast: FamousCast;
  FamousCastMovie: FamousCastMovie;
  FamousCastTVShow: FamousCastTvShow;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  LastEpisodeToAir: LastEpisodeToAir;
  MediaCast: MediaCast;
  MediaCrew: MediaCrew;
  MediaGenre: MediaGenre;
  MediaVideo: MediaVideo;
  Movie: Movie;
  MovieBelongsToCollection: MovieBelongsToCollection;
  MovieProductionCompany: MovieProductionCompany;
  Networks: Networks;
  NewsArticle: NewsArticle;
  NewsResult: NewsResult;
  ProductionCompanies: ProductionCompanies;
  Query: {};
  QuizInput: QuizInput;
  QuizQuestion: QuizQuestion;
  SearchFamousItem: Omit<SearchFamousItem, 'knownFor'> & { knownFor: Array<ResolversParentTypes['SearchFamousKnownFor']> };
  SearchFamousKnownFor: ResolversUnionTypes<ResolversParentTypes>['SearchFamousKnownFor'];
  SearchFamousKnownForMovie: SearchFamousKnownForMovie;
  SearchFamousKnownForTVShow: SearchFamousKnownForTvShow;
  SearchFamousResult: SearchFamousResult;
  SearchInput: SearchInput;
  SearchMovieItem: SearchMovieItem;
  SearchMoviesResult: SearchMoviesResult;
  SearchTVShowItem: SearchTvShowItem;
  SearchTVShowsResult: SearchTvShowsResult;
  Seasons: Seasons;
  SimilarMovie: SimilarMovie;
  SimilarTVShow: SimilarTvShow;
  String: Scalars['String']['output'];
  TVShow: TvShow;
  TVShowEpisodeCrew: TvShowEpisodeCrew;
  TVShowEpisodeGuestStar: TvShowEpisodeGuestStar;
  TVShowSeason: TvShowSeason;
  TVShowSeasonInput: TvShowSeasonInput;
  Thumbnail: Thumbnail;
  TrendingFamousItem: Omit<TrendingFamousItem, 'knownFor'> & { knownFor: Array<ResolversParentTypes['TrendingFamousKnownFor']> };
  TrendingFamousKnownFor: ResolversUnionTypes<ResolversParentTypes>['TrendingFamousKnownFor'];
  TrendingFamousKnownForMovie: TrendingFamousKnownForMovie;
  TrendingFamousKnownForTVShow: TrendingFamousKnownForTvShow;
  TrendingFamousResult: TrendingFamousResult;
  TrendingMovie: TrendingMovie;
  TrendingMovies: TrendingMovies;
  TrendingTVShow: TrendingTvShow;
  TrendingTVShows: TrendingTvShows;
};

export type BaseFamousCastResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseFamousCast'] = ResolversParentTypes['BaseFamousCast']> = {
  __resolveType: TypeResolveFn<'FamousCastMovie' | 'FamousCastTVShow', ParentType, ContextType>;
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creditId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, Partial<BaseFamousCastGenresArgs>>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  mediaType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type CreatedByResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatedBy'] = ResolversParentTypes['CreatedBy']> = {
  creditId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profilePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EpisodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Episode'] = ResolversParentTypes['Episode']> = {
  airDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  crew?: Resolver<Array<ResolversTypes['TVShowEpisodeCrew']>, ParentType, ContextType>;
  episodeNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  episodeType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  guestStars?: Resolver<Array<ResolversTypes['TVShowEpisodeGuestStar']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productionCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  runtime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  seasonNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  showId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  stillPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FamousResolvers<ContextType = any, ParentType extends ResolversParentTypes['Famous'] = ResolversParentTypes['Famous']> = {
  biography?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cast?: Resolver<ResolversTypes['FamousCast'], ParentType, ContextType, Partial<FamousCastArgs>>;
  deathday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  knownForDepartment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  placeOfBirth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  profilePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FamousCastResolvers<ContextType = any, ParentType extends ResolversParentTypes['FamousCast'] = ResolversParentTypes['FamousCast']> = {
  moviesCast?: Resolver<Array<ResolversTypes['FamousCastMovie']>, ParentType, ContextType>;
  tvShowsCast?: Resolver<Array<ResolversTypes['FamousCastTVShow']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FamousCastMovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['FamousCastMovie'] = ResolversParentTypes['FamousCastMovie']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creditId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, Partial<FamousCastMovieGenresArgs>>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  mediaType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  releaseDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FamousCastTvShowResolvers<ContextType = any, ParentType extends ResolversParentTypes['FamousCastTVShow'] = ResolversParentTypes['FamousCastTVShow']> = {
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creditId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episodeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  firstAirDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, Partial<FamousCastTvShowGenresArgs>>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  mediaType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originCountry?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LastEpisodeToAirResolvers<ContextType = any, ParentType extends ResolversParentTypes['LastEpisodeToAir'] = ResolversParentTypes['LastEpisodeToAir']> = {
  airDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episodeNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productionCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  runtime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  seasonNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  showId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  stillPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaCastResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaCast'] = ResolversParentTypes['MediaCast']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creditId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  knownForDepartment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  originalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  profilePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaCrewResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaCrew'] = ResolversParentTypes['MediaCrew']> = {
  department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  job?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profilePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaGenreResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaGenre'] = ResolversParentTypes['MediaGenre']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaVideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaVideo'] = ResolversParentTypes['MediaVideo']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  site?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<ResolversTypes['Thumbnail']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  belongsToCollection?: Resolver<Maybe<ResolversTypes['MovieBelongsToCollection']>, ParentType, ContextType>;
  budget?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  cast?: Resolver<Array<ResolversTypes['MediaCast']>, ParentType, ContextType>;
  crew?: Resolver<Array<ResolversTypes['MediaCrew']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, Partial<MovieGenresArgs>>;
  homepage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MovieImagesArgs, 'id'>>;
  imdbId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productionCompanies?: Resolver<Array<ResolversTypes['MovieProductionCompany']>, ParentType, ContextType>;
  productionCountries?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  releaseDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  revenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  runtime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  similar?: Resolver<Array<ResolversTypes['SimilarMovie']>, ParentType, ContextType, RequireFields<MovieSimilarArgs, 'id'>>;
  spokenLanguages?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  videos?: Resolver<Array<ResolversTypes['MediaVideo']>, ParentType, ContextType, RequireFields<MovieVideosArgs, 'id'>>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MovieBelongsToCollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MovieBelongsToCollection'] = ResolversParentTypes['MovieBelongsToCollection']> = {
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MovieProductionCompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['MovieProductionCompany'] = ResolversParentTypes['MovieProductionCompany']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  logoPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originCountry?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NetworksResolvers<ContextType = any, ParentType extends ResolversParentTypes['Networks'] = ResolversParentTypes['Networks']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  logoPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originCountry?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewsArticleResolvers<ContextType = any, ParentType extends ResolversParentTypes['NewsArticle'] = ResolversParentTypes['NewsArticle']> = {
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publishedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['NewsResult'] = ResolversParentTypes['NewsResult']> = {
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['NewsArticle']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductionCompaniesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductionCompanies'] = ResolversParentTypes['ProductionCompanies']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  logoPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originCountry?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  famous?: Resolver<ResolversTypes['Famous'], ParentType, ContextType, RequireFields<QueryFamousArgs, 'id'>>;
  mediaGenres?: Resolver<Array<ResolversTypes['MediaGenre']>, ParentType, ContextType, RequireFields<QueryMediaGenresArgs, 'mediaType'>>;
  movie?: Resolver<ResolversTypes['Movie'], ParentType, ContextType, RequireFields<QueryMovieArgs, 'id'>>;
  news?: Resolver<ResolversTypes['NewsResult'], ParentType, ContextType, RequireFields<QueryNewsArgs, 'language' | 'page'>>;
  quiz?: Resolver<Array<ResolversTypes['QuizQuestion']>, ParentType, ContextType, RequireFields<QueryQuizArgs, 'input'>>;
  searchFamous?: Resolver<ResolversTypes['SearchFamousResult'], ParentType, ContextType, RequireFields<QuerySearchFamousArgs, 'input'>>;
  searchMovies?: Resolver<ResolversTypes['SearchMoviesResult'], ParentType, ContextType, RequireFields<QuerySearchMoviesArgs, 'input'>>;
  searchTVShows?: Resolver<ResolversTypes['SearchTVShowsResult'], ParentType, ContextType, RequireFields<QuerySearchTvShowsArgs, 'input'>>;
  trendingFamous?: Resolver<ResolversTypes['TrendingFamousResult'], ParentType, ContextType, RequireFields<QueryTrendingFamousArgs, 'page'>>;
  trendingMovies?: Resolver<ResolversTypes['TrendingMovies'], ParentType, ContextType, Partial<QueryTrendingMoviesArgs>>;
  trendingTVShows?: Resolver<ResolversTypes['TrendingTVShows'], ParentType, ContextType, Partial<QueryTrendingTvShowsArgs>>;
  tvShow?: Resolver<ResolversTypes['TVShow'], ParentType, ContextType, RequireFields<QueryTvShowArgs, 'id'>>;
  tvShowSeason?: Resolver<ResolversTypes['TVShowSeason'], ParentType, ContextType, RequireFields<QueryTvShowSeasonArgs, 'input'>>;
};

export type QuizQuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['QuizQuestion'] = ResolversParentTypes['QuizQuestion']> = {
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  correctAnswer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  difficulty?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  options?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchFamousItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchFamousItem'] = ResolversParentTypes['SearchFamousItem']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  knownFor?: Resolver<Array<ResolversTypes['SearchFamousKnownFor']>, ParentType, ContextType>;
  knownForDepartment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  profilePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchFamousKnownForResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchFamousKnownFor'] = ResolversParentTypes['SearchFamousKnownFor']> = {
  __resolveType: TypeResolveFn<'SearchFamousKnownForMovie' | 'SearchFamousKnownForTVShow', ParentType, ContextType>;
};

export type SearchFamousKnownForMovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchFamousKnownForMovie'] = ResolversParentTypes['SearchFamousKnownForMovie']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<SearchFamousKnownForMovieGenresArgs, 'input'>>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  mediaType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  releaseDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchFamousKnownForTvShowResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchFamousKnownForTVShow'] = ResolversParentTypes['SearchFamousKnownForTVShow']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstAirDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<SearchFamousKnownForTvShowGenresArgs, 'input'>>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  mediaType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originCountry?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchFamousResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchFamousResult'] = ResolversParentTypes['SearchFamousResult']> = {
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['SearchFamousItem']>, ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalResults?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchMovieItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchMovieItem'] = ResolversParentTypes['SearchMovieItem']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<SearchMovieItemGenresArgs, 'input'>>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  releaseDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchMoviesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchMoviesResult'] = ResolversParentTypes['SearchMoviesResult']> = {
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['SearchMovieItem']>, ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalResults?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchTvShowItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchTVShowItem'] = ResolversParentTypes['SearchTVShowItem']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstAirDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<SearchTvShowItemGenresArgs, 'input'>>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originCountry?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchTvShowsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchTVShowsResult'] = ResolversParentTypes['SearchTVShowsResult']> = {
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['SearchTVShowItem']>, ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalResults?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeasonsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Seasons'] = ResolversParentTypes['Seasons']> = {
  airDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episodeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  seasonNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SimilarMovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['SimilarMovie'] = ResolversParentTypes['SimilarMovie']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  releaseDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SimilarTvShowResolvers<ContextType = any, ParentType extends ResolversParentTypes['SimilarTVShow'] = ResolversParentTypes['SimilarTVShow']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstAirDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originCountry?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TvShowResolvers<ContextType = any, ParentType extends ResolversParentTypes['TVShow'] = ResolversParentTypes['TVShow']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cast?: Resolver<Array<ResolversTypes['MediaCast']>, ParentType, ContextType>;
  createdBy?: Resolver<Array<ResolversTypes['CreatedBy']>, ParentType, ContextType>;
  crew?: Resolver<Array<ResolversTypes['MediaCrew']>, ParentType, ContextType>;
  episodeRunTime?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  firstAirDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, Partial<TvShowGenresArgs>>;
  homepage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<TvShowImagesArgs, 'id'>>;
  inProduction?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  languages?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  lastAirDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastEpisodeToAir?: Resolver<Maybe<ResolversTypes['LastEpisodeToAir']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  networks?: Resolver<Array<ResolversTypes['Networks']>, ParentType, ContextType>;
  nextEpisodeToAir?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  numberOfEpisodes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  numberOfSeasons?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  originCountry?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productionCompanies?: Resolver<Array<ResolversTypes['ProductionCompanies']>, ParentType, ContextType>;
  productionCountries?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  seasons?: Resolver<Array<ResolversTypes['Seasons']>, ParentType, ContextType>;
  similar?: Resolver<Array<ResolversTypes['SimilarTVShow']>, ParentType, ContextType, RequireFields<TvShowSimilarArgs, 'id'>>;
  spokenLanguages?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videos?: Resolver<Array<ResolversTypes['MediaVideo']>, ParentType, ContextType, RequireFields<TvShowVideosArgs, 'id'>>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TvShowEpisodeCrewResolvers<ContextType = any, ParentType extends ResolversParentTypes['TVShowEpisodeCrew'] = ResolversParentTypes['TVShowEpisodeCrew']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  creditId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  job?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  knownForDepartment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  profilePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TvShowEpisodeGuestStarResolvers<ContextType = any, ParentType extends ResolversParentTypes['TVShowEpisodeGuestStar'] = ResolversParentTypes['TVShowEpisodeGuestStar']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creditId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  knownForDepartment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  originalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  profilePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TvShowSeasonResolvers<ContextType = any, ParentType extends ResolversParentTypes['TVShowSeason'] = ResolversParentTypes['TVShowSeason']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  airDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episodes?: Resolver<Array<ResolversTypes['Episode']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  seasonNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThumbnailResolvers<ContextType = any, ParentType extends ResolversParentTypes['Thumbnail'] = ResolversParentTypes['Thumbnail']> = {
  extraLarge?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  extraSmall?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  large?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  medium?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  small?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrendingFamousItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingFamousItem'] = ResolversParentTypes['TrendingFamousItem']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  knownFor?: Resolver<Array<ResolversTypes['TrendingFamousKnownFor']>, ParentType, ContextType>;
  knownForDepartment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  profilePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrendingFamousKnownForResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingFamousKnownFor'] = ResolversParentTypes['TrendingFamousKnownFor']> = {
  __resolveType: TypeResolveFn<'TrendingFamousKnownForMovie' | 'TrendingFamousKnownForTVShow', ParentType, ContextType>;
};

export type TrendingFamousKnownForMovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingFamousKnownForMovie'] = ResolversParentTypes['TrendingFamousKnownForMovie']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, Partial<TrendingFamousKnownForMovieGenresArgs>>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  mediaType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  releaseDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrendingFamousKnownForTvShowResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingFamousKnownForTVShow'] = ResolversParentTypes['TrendingFamousKnownForTVShow']> = {
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstAirDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, Partial<TrendingFamousKnownForTvShowGenresArgs>>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  mediaType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originCountry?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrendingFamousResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingFamousResult'] = ResolversParentTypes['TrendingFamousResult']> = {
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['TrendingFamousItem']>, ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalResults?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrendingMovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingMovie'] = ResolversParentTypes['TrendingMovie']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, Partial<TrendingMovieGenresArgs>>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  releaseDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrendingMoviesResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingMovies'] = ResolversParentTypes['TrendingMovies']> = {
  nowPlaying?: Resolver<Array<ResolversTypes['TrendingMovie']>, ParentType, ContextType, Partial<TrendingMoviesNowPlayingArgs>>;
  popular?: Resolver<Array<ResolversTypes['TrendingMovie']>, ParentType, ContextType, Partial<TrendingMoviesPopularArgs>>;
  topRated?: Resolver<Array<ResolversTypes['TrendingMovie']>, ParentType, ContextType, Partial<TrendingMoviesTopRatedArgs>>;
  upcoming?: Resolver<Array<ResolversTypes['TrendingMovie']>, ParentType, ContextType, Partial<TrendingMoviesUpcomingArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrendingTvShowResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingTVShow'] = ResolversParentTypes['TrendingTVShow']> = {
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstAirDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, Partial<TrendingTvShowGenresArgs>>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originCountry?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrendingTvShowsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingTVShows'] = ResolversParentTypes['TrendingTVShows']> = {
  airingToday?: Resolver<Array<ResolversTypes['TrendingTVShow']>, ParentType, ContextType, Partial<TrendingTvShowsAiringTodayArgs>>;
  onTheAir?: Resolver<Array<ResolversTypes['TrendingTVShow']>, ParentType, ContextType, Partial<TrendingTvShowsOnTheAirArgs>>;
  popular?: Resolver<Array<ResolversTypes['TrendingTVShow']>, ParentType, ContextType, Partial<TrendingTvShowsPopularArgs>>;
  topRated?: Resolver<Array<ResolversTypes['TrendingTVShow']>, ParentType, ContextType, Partial<TrendingTvShowsTopRatedArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BaseFamousCast?: BaseFamousCastResolvers<ContextType>;
  CreatedBy?: CreatedByResolvers<ContextType>;
  Episode?: EpisodeResolvers<ContextType>;
  Famous?: FamousResolvers<ContextType>;
  FamousCast?: FamousCastResolvers<ContextType>;
  FamousCastMovie?: FamousCastMovieResolvers<ContextType>;
  FamousCastTVShow?: FamousCastTvShowResolvers<ContextType>;
  LastEpisodeToAir?: LastEpisodeToAirResolvers<ContextType>;
  MediaCast?: MediaCastResolvers<ContextType>;
  MediaCrew?: MediaCrewResolvers<ContextType>;
  MediaGenre?: MediaGenreResolvers<ContextType>;
  MediaVideo?: MediaVideoResolvers<ContextType>;
  Movie?: MovieResolvers<ContextType>;
  MovieBelongsToCollection?: MovieBelongsToCollectionResolvers<ContextType>;
  MovieProductionCompany?: MovieProductionCompanyResolvers<ContextType>;
  Networks?: NetworksResolvers<ContextType>;
  NewsArticle?: NewsArticleResolvers<ContextType>;
  NewsResult?: NewsResultResolvers<ContextType>;
  ProductionCompanies?: ProductionCompaniesResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  QuizQuestion?: QuizQuestionResolvers<ContextType>;
  SearchFamousItem?: SearchFamousItemResolvers<ContextType>;
  SearchFamousKnownFor?: SearchFamousKnownForResolvers<ContextType>;
  SearchFamousKnownForMovie?: SearchFamousKnownForMovieResolvers<ContextType>;
  SearchFamousKnownForTVShow?: SearchFamousKnownForTvShowResolvers<ContextType>;
  SearchFamousResult?: SearchFamousResultResolvers<ContextType>;
  SearchMovieItem?: SearchMovieItemResolvers<ContextType>;
  SearchMoviesResult?: SearchMoviesResultResolvers<ContextType>;
  SearchTVShowItem?: SearchTvShowItemResolvers<ContextType>;
  SearchTVShowsResult?: SearchTvShowsResultResolvers<ContextType>;
  Seasons?: SeasonsResolvers<ContextType>;
  SimilarMovie?: SimilarMovieResolvers<ContextType>;
  SimilarTVShow?: SimilarTvShowResolvers<ContextType>;
  TVShow?: TvShowResolvers<ContextType>;
  TVShowEpisodeCrew?: TvShowEpisodeCrewResolvers<ContextType>;
  TVShowEpisodeGuestStar?: TvShowEpisodeGuestStarResolvers<ContextType>;
  TVShowSeason?: TvShowSeasonResolvers<ContextType>;
  Thumbnail?: ThumbnailResolvers<ContextType>;
  TrendingFamousItem?: TrendingFamousItemResolvers<ContextType>;
  TrendingFamousKnownFor?: TrendingFamousKnownForResolvers<ContextType>;
  TrendingFamousKnownForMovie?: TrendingFamousKnownForMovieResolvers<ContextType>;
  TrendingFamousKnownForTVShow?: TrendingFamousKnownForTvShowResolvers<ContextType>;
  TrendingFamousResult?: TrendingFamousResultResolvers<ContextType>;
  TrendingMovie?: TrendingMovieResolvers<ContextType>;
  TrendingMovies?: TrendingMoviesResolvers<ContextType>;
  TrendingTVShow?: TrendingTvShowResolvers<ContextType>;
  TrendingTVShows?: TrendingTvShowsResolvers<ContextType>;
};

