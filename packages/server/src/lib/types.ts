import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Upload: any,
};


export type Article = {
   __typename?: 'Article',
  publishedAt?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  source?: Maybe<Scalars['String']>,
  author?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  url?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['ID']>,
};

export type ArticleQueryResult = {
   __typename?: 'ArticleQueryResult',
  items: Array<Article>,
  hasMore: Scalars['Boolean'],
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Cast = {
  character?: Maybe<Scalars['String']>,
  backdropImage?: Maybe<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  voteAverage?: Maybe<Scalars['Float']>,
  mediaType?: Maybe<Scalars['String']>,
  posterImage?: Maybe<Scalars['String']>,
  popularity?: Maybe<Scalars['Float']>,
  originalLanguage?: Maybe<Scalars['String']>,
  genres: Array<Scalars['String']>,
  voteCount?: Maybe<Scalars['Float']>,
  creditId?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['Int']>,
};

export type CastMovie = Cast & {
   __typename?: 'CastMovie',
  originalTitle?: Maybe<Scalars['String']>,
  video?: Maybe<Scalars['Boolean']>,
  title?: Maybe<Scalars['String']>,
  adult?: Maybe<Scalars['Boolean']>,
  releaseDate?: Maybe<Scalars['String']>,
  character?: Maybe<Scalars['String']>,
  backdropImage?: Maybe<Scalars['String']>,
  genres: Array<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  voteAverage?: Maybe<Scalars['Float']>,
  mediaType?: Maybe<Scalars['String']>,
  posterImage?: Maybe<Scalars['String']>,
  popularity?: Maybe<Scalars['Float']>,
  originalLanguage?: Maybe<Scalars['String']>,
  voteCount?: Maybe<Scalars['Float']>,
  creditId?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['Int']>,
};

export type CastTv = Cast & {
   __typename?: 'CastTV',
  episodeCount?: Maybe<Scalars['Int']>,
  originCountry: Array<Scalars['String']>,
  originalName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  firstAirDate?: Maybe<Scalars['String']>,
  character?: Maybe<Scalars['String']>,
  backdropImage?: Maybe<Scalars['String']>,
  genres: Array<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  voteAverage?: Maybe<Scalars['Float']>,
  mediaType?: Maybe<Scalars['String']>,
  posterImage?: Maybe<Scalars['String']>,
  popularity?: Maybe<Scalars['Float']>,
  originalLanguage?: Maybe<Scalars['String']>,
  voteCount?: Maybe<Scalars['Float']>,
  creditId?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['Int']>,
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

export type KnownFor = {
   __typename?: 'KnownFor',
  originalTitle?: Maybe<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  releaseDate?: Maybe<Scalars['String']>,
  posterImage?: Maybe<Scalars['String']>,
  originalLanguage?: Maybe<Scalars['String']>,
  voteAverage?: Maybe<Scalars['Float']>,
  isAdult?: Maybe<Scalars['Boolean']>,
  backdropImage?: Maybe<Scalars['String']>,
  genres: Array<Scalars['String']>,
  voteCount?: Maybe<Scalars['Int']>,
  mediaType?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['ID']>,
};

export enum Language {
  Ar = 'AR',
  De = 'DE',
  En = 'EN',
  Es = 'ES',
  Fr = 'FR',
  He = 'HE',
  It = 'IT',
  Nl = 'NL',
  No = 'NO',
  Pt = 'PT',
  Ru = 'RU',
  Se = 'SE',
  Ud = 'UD',
  Zh = 'ZH'
}

export enum MediaType {
  Movie = 'MOVIE',
  Tv = 'TV'
}

export type PeopleQueryItem = {
   __typename?: 'PeopleQueryItem',
  knownForDepartment?: Maybe<Scalars['String']>,
  adult?: Maybe<Scalars['Boolean']>,
  profileImage?: Maybe<Scalars['String']>,
  popularity?: Maybe<Scalars['Float']>,
  name?: Maybe<Scalars['String']>,
  knownFor: Array<KnownFor>,
  gender?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['ID']>,
};

export type PeopleQueryResult = {
   __typename?: 'PeopleQueryResult',
  items: Array<PeopleQueryItem>,
  hasMore: Scalars['Boolean'],
};

export type Person = {
   __typename?: 'Person',
  alsoKnownAs: Array<Scalars['String']>,
  placeOfBirth?: Maybe<Scalars['String']>,
  birthday?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  biography?: Maybe<Scalars['String']>,
  popularity?: Maybe<Scalars['Float']>,
  homepage?: Maybe<Scalars['String']>,
  knownForDepartment?: Maybe<Scalars['String']>,
  deathday?: Maybe<Scalars['String']>,
  imagesGallery: Array<Scalars['String']>,
  cast: Array<Cast>,
  adult?: Maybe<Scalars['Boolean']>,
  profileImage?: Maybe<Scalars['String']>,
  gender?: Maybe<Scalars['Int']>,
  imbdId?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['Int']>,
};

export type Query = {
   __typename?: 'Query',
  _?: Maybe<Scalars['String']>,
  articles: ArticleQueryResult,
  people: PeopleQueryResult,
  person?: Maybe<Person>,
};


export type QueryArticlesArgs = {
  page: Scalars['Int'],
  language?: Maybe<Language>
};


export type QueryPeopleArgs = {
  page: Scalars['Int'],
  language?: Maybe<Iso6391Language>
};


export type QueryPersonArgs = {
  id: Scalars['Int'],
  language?: Maybe<Iso6391Language>
};


export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Language: Language,
  ArticleQueryResult: ResolverTypeWrapper<ArticleQueryResult>,
  Article: ResolverTypeWrapper<Article>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  ISO6391Language: Iso6391Language,
  PeopleQueryResult: ResolverTypeWrapper<PeopleQueryResult>,
  PeopleQueryItem: ResolverTypeWrapper<PeopleQueryItem>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  KnownFor: ResolverTypeWrapper<KnownFor>,
  Person: ResolverTypeWrapper<Person>,
  Cast: ResolverTypeWrapper<Cast>,
  CacheControlScope: CacheControlScope,
  CastMovie: ResolverTypeWrapper<CastMovie>,
  CastTV: ResolverTypeWrapper<CastTv>,
  MediaType: MediaType,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  String: Scalars['String'],
  Int: Scalars['Int'],
  Language: Language,
  ArticleQueryResult: ArticleQueryResult,
  Article: Article,
  ID: Scalars['ID'],
  Boolean: Scalars['Boolean'],
  ISO6391Language: Iso6391Language,
  PeopleQueryResult: PeopleQueryResult,
  PeopleQueryItem: PeopleQueryItem,
  Float: Scalars['Float'],
  KnownFor: KnownFor,
  Person: Person,
  Cast: Cast,
  CacheControlScope: CacheControlScope,
  CastMovie: CastMovie,
  CastTV: CastTv,
  MediaType: MediaType,
  Upload: Scalars['Upload'],
}>;

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = {   maxAge?: Maybe<Maybe<Scalars['Int']>>,
  scope?: Maybe<Maybe<CacheControlScope>> }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ArticleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article']> = ResolversObject<{
  publishedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
}>;

export type ArticleQueryResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArticleQueryResult'] = ResolversParentTypes['ArticleQueryResult']> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['Article']>, ParentType, ContextType>,
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type CastResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cast'] = ResolversParentTypes['Cast']> = ResolversObject<{
  __resolveType: TypeResolveFn<'CastMovie' | 'CastTV', ParentType, ContextType>,
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  backdropImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  mediaType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  posterImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  voteCount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  creditId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type CastMovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['CastMovie'] = ResolversParentTypes['CastMovie']> = ResolversObject<{
  originalTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  video?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  releaseDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  backdropImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  mediaType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  posterImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  voteCount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  creditId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type CastTvResolvers<ContextType = any, ParentType extends ResolversParentTypes['CastTV'] = ResolversParentTypes['CastTV']> = ResolversObject<{
  episodeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  originCountry?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  originalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  firstAirDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  backdropImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  mediaType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  posterImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  voteCount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  creditId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type KnownForResolvers<ContextType = any, ParentType extends ResolversParentTypes['KnownFor'] = ResolversParentTypes['KnownFor']> = ResolversObject<{
  originalTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  releaseDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  posterImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  isAdult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  backdropImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  voteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  mediaType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
}>;

export type PeopleQueryItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['PeopleQueryItem'] = ResolversParentTypes['PeopleQueryItem']> = ResolversObject<{
  knownForDepartment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  profileImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  knownFor?: Resolver<Array<ResolversTypes['KnownFor']>, ParentType, ContextType>,
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
}>;

export type PeopleQueryResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['PeopleQueryResult'] = ResolversParentTypes['PeopleQueryResult']> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['PeopleQueryItem']>, ParentType, ContextType>,
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type PersonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Person'] = ResolversParentTypes['Person']> = ResolversObject<{
  alsoKnownAs?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  placeOfBirth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  birthday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  biography?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  homepage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  knownForDepartment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  deathday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  imagesGallery?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  cast?: Resolver<Array<ResolversTypes['Cast']>, ParentType, ContextType>,
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  profileImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  imbdId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  articles?: Resolver<ResolversTypes['ArticleQueryResult'], ParentType, ContextType, RequireFields<QueryArticlesArgs, 'page'>>,
  people?: Resolver<ResolversTypes['PeopleQueryResult'], ParentType, ContextType, RequireFields<QueryPeopleArgs, 'page'>>,
  person?: Resolver<Maybe<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<QueryPersonArgs, 'id'>>,
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type Resolvers<ContextType = any> = ResolversObject<{
  Article?: ArticleResolvers<ContextType>,
  ArticleQueryResult?: ArticleQueryResultResolvers<ContextType>,
  Cast?: CastResolvers,
  CastMovie?: CastMovieResolvers<ContextType>,
  CastTV?: CastTvResolvers<ContextType>,
  KnownFor?: KnownForResolvers<ContextType>,
  PeopleQueryItem?: PeopleQueryItemResolvers<ContextType>,
  PeopleQueryResult?: PeopleQueryResultResolvers<ContextType>,
  Person?: PersonResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Upload?: GraphQLScalarType,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>,
}>;


/**
* @deprecated
* Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
*/
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;