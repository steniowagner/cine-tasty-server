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

export type Cast = {
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


export type CastGenresArgs = {
  language?: InputMaybe<Iso6391Language>;
};

export type CastMovie = Cast & {
  __typename?: 'CastMovie';
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


export type CastMovieGenresArgs = {
  language?: InputMaybe<Iso6391Language>;
};

export type CastTvShow = Cast & {
  __typename?: 'CastTVShow';
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


export type CastTvShowGenresArgs = {
  language?: InputMaybe<Iso6391Language>;
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
  moviesCast: Array<CastMovie>;
  tvShowsCast: Array<CastTvShow>;
};

export enum Iso6391Language {
  En = 'en',
  Es = 'es',
  Pt = 'pt'
}

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

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['String']['output']>;
  famous?: Maybe<Famous>;
  news: NewsResult;
  quiz: Array<QuizQuestion>;
  searchFamous: SearchFamousResult;
  trendingFamous: TrendingFamousResult;
};


export type QueryFamousArgs = {
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


export type QueryTrendingFamousArgs = {
  language?: InputMaybe<Iso6391Language>;
  page: Scalars['Int']['input'];
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

export type TrendingFamousItem = {
  __typename?: 'TrendingFamousItem';
  adult?: Maybe<Scalars['Boolean']['output']>;
  gender?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  knownFor: Array<TrendingFamousKnownFor>;
  name?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  profilePath?: Maybe<Scalars['String']['output']>;
};

export type TrendingFamousKnowForMovie = {
  __typename?: 'TrendingFamousKnowForMovie';
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


export type TrendingFamousKnowForMovieGenresArgs = {
  language?: InputMaybe<Iso6391Language>;
};

export type TrendingFamousKnowForTvShow = {
  __typename?: 'TrendingFamousKnowForTVShow';
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


export type TrendingFamousKnowForTvShowGenresArgs = {
  language?: InputMaybe<Iso6391Language>;
};

export type TrendingFamousKnownFor = TrendingFamousKnowForMovie | TrendingFamousKnowForTvShow;

export type TrendingFamousResult = {
  __typename?: 'TrendingFamousResult';
  hasMore: Scalars['Boolean']['output'];
  items: Array<TrendingFamousItem>;
  totalPages: Scalars['Int']['output'];
  totalResults: Scalars['Int']['output'];
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
  TrendingFamousKnownFor: ( TrendingFamousKnowForMovie ) | ( TrendingFamousKnowForTvShow );
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  Cast: ( CastMovie ) | ( CastTvShow );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Cast: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Cast']>;
  CastMovie: ResolverTypeWrapper<CastMovie>;
  CastTVShow: ResolverTypeWrapper<CastTvShow>;
  Famous: ResolverTypeWrapper<Famous>;
  FamousCast: ResolverTypeWrapper<FamousCast>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  ISO6391Language: Iso6391Language;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  NewsArticle: ResolverTypeWrapper<NewsArticle>;
  NewsLanguage: NewsLanguage;
  NewsResult: ResolverTypeWrapper<NewsResult>;
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
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TrendingFamousItem: ResolverTypeWrapper<Omit<TrendingFamousItem, 'knownFor'> & { knownFor: Array<ResolversTypes['TrendingFamousKnownFor']> }>;
  TrendingFamousKnowForMovie: ResolverTypeWrapper<TrendingFamousKnowForMovie>;
  TrendingFamousKnowForTVShow: ResolverTypeWrapper<TrendingFamousKnowForTvShow>;
  TrendingFamousKnownFor: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['TrendingFamousKnownFor']>;
  TrendingFamousResult: ResolverTypeWrapper<TrendingFamousResult>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Cast: ResolversInterfaceTypes<ResolversParentTypes>['Cast'];
  CastMovie: CastMovie;
  CastTVShow: CastTvShow;
  Famous: Famous;
  FamousCast: FamousCast;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  NewsArticle: NewsArticle;
  NewsResult: NewsResult;
  Query: {};
  QuizInput: QuizInput;
  QuizQuestion: QuizQuestion;
  SearchFamousItem: Omit<SearchFamousItem, 'knownFor'> & { knownFor: Array<ResolversParentTypes['SearchFamousKnownFor']> };
  SearchFamousKnownFor: ResolversUnionTypes<ResolversParentTypes>['SearchFamousKnownFor'];
  SearchFamousKnownForMovie: SearchFamousKnownForMovie;
  SearchFamousKnownForTVShow: SearchFamousKnownForTvShow;
  SearchFamousResult: SearchFamousResult;
  SearchInput: SearchInput;
  String: Scalars['String']['output'];
  TrendingFamousItem: Omit<TrendingFamousItem, 'knownFor'> & { knownFor: Array<ResolversParentTypes['TrendingFamousKnownFor']> };
  TrendingFamousKnowForMovie: TrendingFamousKnowForMovie;
  TrendingFamousKnowForTVShow: TrendingFamousKnowForTvShow;
  TrendingFamousKnownFor: ResolversUnionTypes<ResolversParentTypes>['TrendingFamousKnownFor'];
  TrendingFamousResult: TrendingFamousResult;
};

export type CastResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cast'] = ResolversParentTypes['Cast']> = {
  __resolveType: TypeResolveFn<'CastMovie' | 'CastTVShow', ParentType, ContextType>;
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creditId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, Partial<CastGenresArgs>>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  mediaType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type CastMovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['CastMovie'] = ResolversParentTypes['CastMovie']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creditId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, Partial<CastMovieGenresArgs>>;
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

export type CastTvShowResolvers<ContextType = any, ParentType extends ResolversParentTypes['CastTVShow'] = ResolversParentTypes['CastTVShow']> = {
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creditId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episodeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  firstAirDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, Partial<CastTvShowGenresArgs>>;
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
  moviesCast?: Resolver<Array<ResolversTypes['CastMovie']>, ParentType, ContextType>;
  tvShowsCast?: Resolver<Array<ResolversTypes['CastTVShow']>, ParentType, ContextType>;
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

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  famous?: Resolver<Maybe<ResolversTypes['Famous']>, ParentType, ContextType, RequireFields<QueryFamousArgs, 'id'>>;
  news?: Resolver<ResolversTypes['NewsResult'], ParentType, ContextType, RequireFields<QueryNewsArgs, 'language' | 'page'>>;
  quiz?: Resolver<Array<ResolversTypes['QuizQuestion']>, ParentType, ContextType, RequireFields<QueryQuizArgs, 'input'>>;
  searchFamous?: Resolver<ResolversTypes['SearchFamousResult'], ParentType, ContextType, RequireFields<QuerySearchFamousArgs, 'input'>>;
  trendingFamous?: Resolver<ResolversTypes['TrendingFamousResult'], ParentType, ContextType, RequireFields<QueryTrendingFamousArgs, 'page'>>;
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

export type TrendingFamousItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingFamousItem'] = ResolversParentTypes['TrendingFamousItem']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  knownFor?: Resolver<Array<ResolversTypes['TrendingFamousKnownFor']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  profilePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrendingFamousKnowForMovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingFamousKnowForMovie'] = ResolversParentTypes['TrendingFamousKnowForMovie']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, Partial<TrendingFamousKnowForMovieGenresArgs>>;
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

export type TrendingFamousKnowForTvShowResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingFamousKnowForTVShow'] = ResolversParentTypes['TrendingFamousKnowForTVShow']> = {
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstAirDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, Partial<TrendingFamousKnowForTvShowGenresArgs>>;
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

export type TrendingFamousKnownForResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingFamousKnownFor'] = ResolversParentTypes['TrendingFamousKnownFor']> = {
  __resolveType: TypeResolveFn<'TrendingFamousKnowForMovie' | 'TrendingFamousKnowForTVShow', ParentType, ContextType>;
};

export type TrendingFamousResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingFamousResult'] = ResolversParentTypes['TrendingFamousResult']> = {
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['TrendingFamousItem']>, ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalResults?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Cast?: CastResolvers<ContextType>;
  CastMovie?: CastMovieResolvers<ContextType>;
  CastTVShow?: CastTvShowResolvers<ContextType>;
  Famous?: FamousResolvers<ContextType>;
  FamousCast?: FamousCastResolvers<ContextType>;
  NewsArticle?: NewsArticleResolvers<ContextType>;
  NewsResult?: NewsResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  QuizQuestion?: QuizQuestionResolvers<ContextType>;
  SearchFamousItem?: SearchFamousItemResolvers<ContextType>;
  SearchFamousKnownFor?: SearchFamousKnownForResolvers<ContextType>;
  SearchFamousKnownForMovie?: SearchFamousKnownForMovieResolvers<ContextType>;
  SearchFamousKnownForTVShow?: SearchFamousKnownForTvShowResolvers<ContextType>;
  SearchFamousResult?: SearchFamousResultResolvers<ContextType>;
  TrendingFamousItem?: TrendingFamousItemResolvers<ContextType>;
  TrendingFamousKnowForMovie?: TrendingFamousKnowForMovieResolvers<ContextType>;
  TrendingFamousKnowForTVShow?: TrendingFamousKnowForTvShowResolvers<ContextType>;
  TrendingFamousKnownFor?: TrendingFamousKnownForResolvers<ContextType>;
  TrendingFamousResult?: TrendingFamousResultResolvers<ContextType>;
};

