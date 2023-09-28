import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  genreIds: Array<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  mediaType?: Maybe<Scalars['String']['output']>;
  originalLanguage?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  posterPath?: Maybe<Scalars['String']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Float']['output']>;
};


export type CastGenreIdsArgs = {
  language?: InputMaybe<Iso6391Language>;
};

export type CastMovie = Cast & {
  __typename?: 'CastMovie';
  adult?: Maybe<Scalars['Boolean']['output']>;
  backdropPath?: Maybe<Scalars['String']['output']>;
  character?: Maybe<Scalars['String']['output']>;
  creditId?: Maybe<Scalars['String']['output']>;
  genreIds: Array<Scalars['String']['output']>;
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


export type CastMovieGenreIdsArgs = {
  language?: InputMaybe<Iso6391Language>;
};

export type CastTvShow = Cast & {
  __typename?: 'CastTVShow';
  backdropPath?: Maybe<Scalars['String']['output']>;
  character?: Maybe<Scalars['String']['output']>;
  creditId?: Maybe<Scalars['String']['output']>;
  episodeCount?: Maybe<Scalars['Int']['output']>;
  firstAirDate?: Maybe<Scalars['String']['output']>;
  genreIds: Array<Scalars['String']['output']>;
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


export type CastTvShowGenreIdsArgs = {
  language?: InputMaybe<Iso6391Language>;
};

export type Famous = {
  __typename?: 'Famous';
  biography?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['String']['output']>;
  deathday?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  images: Array<Scalars['String']['output']>;
  knownForDepartment?: Maybe<Scalars['String']['output']>;
  moviesCast: Array<CastMovie>;
  name?: Maybe<Scalars['String']['output']>;
  placeOfBirth?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  profilePath?: Maybe<Scalars['String']['output']>;
  tvCast: Array<CastTvShow>;
};

export enum Iso6391Language {
  Aa = 'AA',
  Ab = 'AB',
  Af = 'AF',
  Am = 'AM',
  Ar = 'AR',
  Arae = 'ARAE',
  Arbh = 'ARBH',
  Ardz = 'ARDZ',
  Areg = 'AREG',
  Ariq = 'ARIQ',
  Arjo = 'ARJO',
  Arkw = 'ARKW',
  Arlb = 'ARLB',
  Arly = 'ARLY',
  Arma = 'ARMA',
  Arom = 'AROM',
  Arqa = 'ARQA',
  Arsa = 'ARSA',
  Arsy = 'ARSY',
  Artn = 'ARTN',
  Arye = 'ARYE',
  As = 'AS',
  Ay = 'AY',
  Az = 'AZ',
  Ba = 'BA',
  Be = 'BE',
  Bg = 'BG',
  Bh = 'BH',
  Bi = 'BI',
  Bn = 'BN',
  Bo = 'BO',
  Br = 'BR',
  Ca = 'CA',
  Co = 'CO',
  Cs = 'CS',
  Cy = 'CY',
  Da = 'DA',
  De = 'DE',
  Deat = 'DEAT',
  Dech = 'DECH',
  Deli = 'DELI',
  Delu = 'DELU',
  Div = 'DIV',
  Dz = 'DZ',
  El = 'EL',
  En = 'EN',
  Enau = 'ENAU',
  Enbz = 'ENBZ',
  Enca = 'ENCA',
  Engb = 'ENGB',
  Enie = 'ENIE',
  Enjm = 'ENJM',
  Ennz = 'ENNZ',
  Enph = 'ENPH',
  Entt = 'ENTT',
  Enus = 'ENUS',
  Enza = 'ENZA',
  Enzw = 'ENZW',
  Eo = 'EO',
  Es = 'ES',
  Esar = 'ESAR',
  Esbo = 'ESBO',
  Escl = 'ESCL',
  Esco = 'ESCO',
  Escr = 'ESCR',
  Esdo = 'ESDO',
  Esec = 'ESEC',
  Eses = 'ESES',
  Esgt = 'ESGT',
  Eshn = 'ESHN',
  Esmx = 'ESMX',
  Esni = 'ESNI',
  Espa = 'ESPA',
  Espe = 'ESPE',
  Espr = 'ESPR',
  Espy = 'ESPY',
  Essv = 'ESSV',
  Esus = 'ESUS',
  Esuy = 'ESUY',
  Esve = 'ESVE',
  Et = 'ET',
  Eu = 'EU',
  Fa = 'FA',
  Fi = 'FI',
  Fj = 'FJ',
  Fo = 'FO',
  Fr = 'FR',
  Frbe = 'FRBE',
  Frca = 'FRCA',
  Frch = 'FRCH',
  Frlu = 'FRLU',
  Frmc = 'FRMC',
  Fy = 'FY',
  Ga = 'GA',
  Gd = 'GD',
  Gl = 'GL',
  Gn = 'GN',
  Gu = 'GU',
  Ha = 'HA',
  He = 'HE',
  Hi = 'HI',
  Hr = 'HR',
  Hu = 'HU',
  Hy = 'HY',
  Ia = 'IA',
  Id = 'ID',
  Ie = 'IE',
  Ik = 'IK',
  In = 'IN',
  Is = 'IS',
  It = 'IT',
  Itch = 'ITCH',
  Iw = 'IW',
  Ja = 'JA',
  Ji = 'JI',
  Jw = 'JW',
  Ka = 'KA',
  Kk = 'KK',
  Kl = 'KL',
  Km = 'KM',
  Kn = 'KN',
  Ko = 'KO',
  Kok = 'KOK',
  Ks = 'KS',
  Ku = 'KU',
  Ky = 'KY',
  Kz = 'KZ',
  La = 'LA',
  Ln = 'LN',
  Lo = 'LO',
  Ls = 'LS',
  Lt = 'LT',
  Lv = 'LV',
  Mg = 'MG',
  Mi = 'MI',
  Mk = 'MK',
  Ml = 'ML',
  Mn = 'MN',
  Mo = 'MO',
  Mr = 'MR',
  Ms = 'MS',
  Mt = 'MT',
  My = 'MY',
  Na = 'NA',
  Nbno = 'NBNO',
  Ne = 'NE',
  Nl = 'NL',
  Nlbe = 'NLBE',
  Nnno = 'NNNO',
  No = 'NO',
  Oc = 'OC',
  Om = 'OM',
  Or = 'OR',
  Pa = 'PA',
  Pl = 'PL',
  Ps = 'PS',
  Pt = 'PT',
  Ptbr = 'PTBR',
  Qu = 'QU',
  Rm = 'RM',
  Rn = 'RN',
  Ro = 'RO',
  Romd = 'ROMD',
  Ru = 'RU',
  Rumd = 'RUMD',
  Rw = 'RW',
  Sa = 'SA',
  Sb = 'SB',
  Sd = 'SD',
  Sg = 'SG',
  Sh = 'SH',
  Si = 'SI',
  Sk = 'SK',
  Sl = 'SL',
  Sm = 'SM',
  Sn = 'SN',
  So = 'SO',
  Sq = 'SQ',
  Sr = 'SR',
  Ss = 'SS',
  St = 'ST',
  Su = 'SU',
  Sv = 'SV',
  Svfi = 'SVFI',
  Sw = 'SW',
  Sx = 'SX',
  Syr = 'SYR',
  Ta = 'TA',
  Te = 'TE',
  Tg = 'TG',
  Th = 'TH',
  Ti = 'TI',
  Tk = 'TK',
  Tl = 'TL',
  Tn = 'TN',
  To = 'TO',
  Tr = 'TR',
  Ts = 'TS',
  Tt = 'TT',
  Tw = 'TW',
  Uk = 'UK',
  Ur = 'UR',
  Us = 'US',
  Uz = 'UZ',
  Vi = 'VI',
  Vo = 'VO',
  Wo = 'WO',
  Xh = 'XH',
  Yi = 'YI',
  Yo = 'YO',
  Zh = 'ZH',
  Zhcn = 'ZHCN',
  Zhhk = 'ZHHK',
  Zhmo = 'ZHMO',
  Zhsg = 'ZHSG',
  Zhtw = 'ZHTW',
  Zu = 'ZU'
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
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Cast: ResolversInterfaceTypes<ResolversParentTypes>['Cast'];
  CastMovie: CastMovie;
  CastTVShow: CastTvShow;
  Famous: Famous;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  NewsArticle: NewsArticle;
  NewsResult: NewsResult;
  Query: {};
  QuizInput: QuizInput;
  QuizQuestion: QuizQuestion;
  String: Scalars['String']['output'];
};

export type CastResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cast'] = ResolversParentTypes['Cast']> = {
  __resolveType: TypeResolveFn<'CastMovie' | 'CastTVShow', ParentType, ContextType>;
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creditId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genreIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, Partial<CastGenreIdsArgs>>;
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
  genreIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, Partial<CastMovieGenreIdsArgs>>;
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
  genreIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, Partial<CastTvShowGenreIdsArgs>>;
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
  deathday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  knownForDepartment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  moviesCast?: Resolver<Array<ResolversTypes['CastMovie']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  placeOfBirth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  profilePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tvCast?: Resolver<Array<ResolversTypes['CastTVShow']>, ParentType, ContextType>;
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

export type Resolvers<ContextType = any> = {
  Cast?: CastResolvers<ContextType>;
  CastMovie?: CastMovieResolvers<ContextType>;
  CastTVShow?: CastTvShowResolvers<ContextType>;
  Famous?: FamousResolvers<ContextType>;
  NewsArticle?: NewsArticleResolvers<ContextType>;
  NewsResult?: NewsResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  QuizQuestion?: QuizQuestionResolvers<ContextType>;
};

