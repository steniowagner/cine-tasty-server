import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export enum ArticleLanguage {
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

export type ArticleQueryResult = {
   __typename?: 'ArticleQueryResult',
  items: Array<Article>,
  hasMore: Scalars['Boolean'],
};

export type BaseMovie = {
   __typename?: 'BaseMovie',
  original_title?: Maybe<Scalars['String']>,
  video?: Maybe<Scalars['Boolean']>,
  title?: Maybe<Scalars['String']>,
  adult?: Maybe<Scalars['Boolean']>,
  release_date?: Maybe<Scalars['String']>,
  backdrop_path?: Maybe<Scalars['String']>,
  genre_ids: Array<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  vote_average?: Maybe<Scalars['Float']>,
  media_type?: Maybe<Scalars['String']>,
  poster_path?: Maybe<Scalars['String']>,
  popularity?: Maybe<Scalars['Float']>,
  original_language?: Maybe<Scalars['String']>,
  vote_count?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['Int']>,
};


export type BaseMovieGenre_IdsArgs = {
  language?: Maybe<Iso6391Language>
};

export type BasePerson = {
   __typename?: 'BasePerson',
  profile_path?: Maybe<Scalars['String']>,
  adult?: Maybe<Scalars['Boolean']>,
  id?: Maybe<Scalars['Int']>,
  popularity?: Maybe<Scalars['Float']>,
  known_for: Array<PersonKnowFor>,
  name?: Maybe<Scalars['String']>,
};

export type BaseTvShow = {
   __typename?: 'BaseTVShow',
  origin_country: Array<Scalars['String']>,
  original_name?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  first_air_date?: Maybe<Scalars['String']>,
  backdrop_path?: Maybe<Scalars['String']>,
  genre_ids: Array<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  vote_average?: Maybe<Scalars['Float']>,
  media_type?: Maybe<Scalars['String']>,
  poster_path?: Maybe<Scalars['String']>,
  popularity?: Maybe<Scalars['Float']>,
  original_language?: Maybe<Scalars['String']>,
  vote_count?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['Int']>,
};


export type BaseTvShowGenre_IdsArgs = {
  language?: Maybe<Iso6391Language>
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Cast = {
  character?: Maybe<Scalars['String']>,
  backdrop_path?: Maybe<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  vote_average?: Maybe<Scalars['Float']>,
  media_type?: Maybe<Scalars['String']>,
  poster_path?: Maybe<Scalars['String']>,
  popularity?: Maybe<Scalars['Float']>,
  original_language?: Maybe<Scalars['String']>,
  genre_ids: Array<Scalars['String']>,
  vote_count?: Maybe<Scalars['Float']>,
  credit_id?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['Int']>,
};


export type CastGenre_IdsArgs = {
  language?: Maybe<Iso6391Language>
};

export type CastItem = {
   __typename?: 'CastItem',
  name?: Maybe<Scalars['String']>,
  profile_path?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['ID']>,
  character?: Maybe<Scalars['String']>,
  gender?: Maybe<Scalars['Int']>,
  order?: Maybe<Scalars['Int']>,
};

export type CastMovie = Cast & {
   __typename?: 'CastMovie',
  original_title?: Maybe<Scalars['String']>,
  video?: Maybe<Scalars['Boolean']>,
  title?: Maybe<Scalars['String']>,
  adult?: Maybe<Scalars['Boolean']>,
  release_date?: Maybe<Scalars['String']>,
  character?: Maybe<Scalars['String']>,
  backdrop_path?: Maybe<Scalars['String']>,
  genre_ids: Array<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  vote_average?: Maybe<Scalars['Float']>,
  media_type?: Maybe<Scalars['String']>,
  poster_path?: Maybe<Scalars['String']>,
  popularity?: Maybe<Scalars['Float']>,
  original_language?: Maybe<Scalars['String']>,
  vote_count?: Maybe<Scalars['Float']>,
  credit_id?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['Int']>,
};


export type CastMovieGenre_IdsArgs = {
  language?: Maybe<Iso6391Language>
};

export type CastTvShow = Cast & {
   __typename?: 'CastTVShow',
  episode_count?: Maybe<Scalars['Int']>,
  origin_country: Array<Scalars['String']>,
  original_name?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  first_air_date?: Maybe<Scalars['String']>,
  character?: Maybe<Scalars['String']>,
  backdrop_path?: Maybe<Scalars['String']>,
  genre_ids: Array<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  vote_average?: Maybe<Scalars['Float']>,
  media_type?: Maybe<Scalars['String']>,
  poster_path?: Maybe<Scalars['String']>,
  popularity?: Maybe<Scalars['Float']>,
  original_language?: Maybe<Scalars['String']>,
  vote_count?: Maybe<Scalars['Float']>,
  credit_id?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['Int']>,
};


export type CastTvShowGenre_IdsArgs = {
  language?: Maybe<Iso6391Language>
};

export type Creator = {
   __typename?: 'Creator',
  id?: Maybe<Scalars['ID']>,
  credit_id?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  gender?: Maybe<Scalars['Int']>,
  profile_path?: Maybe<Scalars['String']>,
};

export type CrewItem = {
   __typename?: 'CrewItem',
  department?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['ID']>,
  job?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  gender?: Maybe<Scalars['Int']>,
  profile_path?: Maybe<Scalars['String']>,
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

export type LastEpisodeToAir = {
   __typename?: 'LastEpisodeToAir',
  air_date?: Maybe<Scalars['String']>,
  episode_number?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  production_code?: Maybe<Scalars['String']>,
  season_number?: Maybe<Scalars['Int']>,
  show_id?: Maybe<Scalars['String']>,
  still_path?: Maybe<Scalars['String']>,
  vote_average?: Maybe<Scalars['Float']>,
  vote_count?: Maybe<Scalars['Int']>,
};

export enum MediaType {
  Movie = 'MOVIE',
  Tv = 'TV'
}

export type MediaVideo = {
   __typename?: 'MediaVideo',
  thumbnail?: Maybe<Thumbnail>,
  key?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  site?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['ID']>,
  type?: Maybe<Scalars['String']>,
};

export type Movie = {
   __typename?: 'Movie',
  adult?: Maybe<Scalars['Boolean']>,
  backdrop_path?: Maybe<Scalars['String']>,
  genres: Array<Scalars['String']>,
  id?: Maybe<Scalars['ID']>,
  original_language?: Maybe<Scalars['String']>,
  original_title?: Maybe<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  poster_path?: Maybe<Scalars['String']>,
  popularity?: Maybe<Scalars['Float']>,
  video?: Maybe<Scalars['Boolean']>,
  title?: Maybe<Scalars['String']>,
  vote_average?: Maybe<Scalars['Float']>,
  release_date?: Maybe<Scalars['String']>,
  production_companies: Array<ProductionCompany>,
  vote_count?: Maybe<Scalars['Float']>,
  runtime?: Maybe<Scalars['Float']>,
  spoken_languages: Array<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  tagline?: Maybe<Scalars['String']>,
  budget?: Maybe<Scalars['Float']>,
  homepage?: Maybe<Scalars['String']>,
  revenue?: Maybe<Scalars['Float']>,
  production_countries: Array<Scalars['String']>,
  cast: Array<CastItem>,
  crew: Array<CrewItem>,
  videos: Array<MediaVideo>,
  images: Array<Scalars['String']>,
  similar: Array<BaseMovie>,
  reviews: Array<Review>,
};


export type MovieGenresArgs = {
  language?: Maybe<Iso6391Language>
};


export type MovieImagesArgs = {
  id: Scalars['ID']
};

export type Network = {
   __typename?: 'Network',
  name?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['ID']>,
  logo_path?: Maybe<Scalars['String']>,
  origin_country?: Maybe<Scalars['String']>,
};

export type PeopleQueryResult = {
   __typename?: 'PeopleQueryResult',
  total_results: Scalars['Int'],
  total_pages: Scalars['Int'],
  items: Array<BasePerson>,
  hasMore: Scalars['Boolean'],
};

export type Person = {
   __typename?: 'Person',
  birthday?: Maybe<Scalars['String']>,
  known_for_department?: Maybe<Scalars['String']>,
  deathday?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  also_known_as: Array<Scalars['String']>,
  place_of_birth?: Maybe<Scalars['String']>,
  profile_path?: Maybe<Scalars['String']>,
  adult?: Maybe<Scalars['Boolean']>,
  imdb_id?: Maybe<Scalars['String']>,
  homepage?: Maybe<Scalars['String']>,
  biography?: Maybe<Scalars['String']>,
  popularity?: Maybe<Scalars['Float']>,
  images: Array<Scalars['String']>,
  gender?: Maybe<Scalars['Int']>,
  cast: Array<Cast>,
};

export type PersonKnowFor = BaseMovie | BaseTvShow;

export type ProductionCompany = {
   __typename?: 'ProductionCompany',
  id?: Maybe<Scalars['ID']>,
  logo_path?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  origin_country?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  _?: Maybe<Scalars['String']>,
  trending_movies: TrendingMovies,
  trending_tv_shows: TrendingTvShows,
  tv_show?: Maybe<TvShow>,
  movie?: Maybe<Movie>,
  articles: ArticleQueryResult,
  people: PeopleQueryResult,
  person?: Maybe<Person>,
  quiz: Array<Question>,
  search: SearchQueryResult,
};


export type QueryTv_ShowArgs = {
  id: Scalars['ID'],
  language?: Maybe<Iso6391Language>
};


export type QueryMovieArgs = {
  id: Scalars['ID'],
  language?: Maybe<Iso6391Language>
};


export type QueryArticlesArgs = {
  page: Scalars['Int'],
  language?: Maybe<ArticleLanguage>
};


export type QueryPeopleArgs = {
  page: Scalars['Int'],
  language?: Maybe<Iso6391Language>
};


export type QueryPersonArgs = {
  id: Scalars['Int'],
  language?: Maybe<Iso6391Language>
};


export type QueryQuizArgs = {
  input: QuizInput
};


export type QuerySearchArgs = {
  page: Scalars['Int'],
  query: Scalars['String'],
  type: SearchType,
  language?: Maybe<Iso6391Language>
};

export type Question = {
   __typename?: 'Question',
  incorrect_answers: Array<Scalars['String']>,
  category: Scalars['String'],
  type: Scalars['String'],
  difficulty: Scalars['String'],
  question: Scalars['String'],
  correct_answer: Scalars['String'],
};

export enum QuestionCategory {
  Movie = 'MOVIE',
  Tv = 'TV'
}

export enum QuestionDifficulty {
  Easy = 'EASY',
  Hard = 'HARD',
  Any = 'ANY'
}

export enum QuestionType {
  Multiple = 'MULTIPLE',
  Boolean = 'BOOLEAN',
  Any = 'ANY'
}

export type QuizInput = {
  difficulty: QuestionDifficulty,
  type: QuestionType,
  category: QuestionCategory,
  number_questions: Scalars['Int'],
};

export type Review = {
   __typename?: 'Review',
  author?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['ID']>,
  url?: Maybe<Scalars['String']>,
};

export type SearchQueryResult = {
   __typename?: 'SearchQueryResult',
  total_results: Scalars['Int'],
  items: Array<SearchResultItem>,
  hasMore: Scalars['Boolean'],
};

export type SearchResultItem = BasePerson | BaseMovie | BaseTvShow;

export enum SearchType {
  Person = 'PERSON',
  Movie = 'MOVIE',
  Tv = 'TV'
}

export type Season = {
   __typename?: 'Season',
  air_date?: Maybe<Scalars['String']>,
  episode_count?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  poster_path?: Maybe<Scalars['String']>,
  season_number?: Maybe<Scalars['Int']>,
};

export type Thumbnail = {
   __typename?: 'Thumbnail',
  extra_small?: Maybe<Scalars['String']>,
  small?: Maybe<Scalars['String']>,
  medium?: Maybe<Scalars['String']>,
  large?: Maybe<Scalars['String']>,
  extra_large?: Maybe<Scalars['String']>,
};

export type TrendingMovies = {
   __typename?: 'TrendingMovies',
  now_playing: TrendingMoviesQueryResult,
  popular: TrendingMoviesQueryResult,
  top_rated: TrendingMoviesQueryResult,
  upcoming: TrendingMoviesQueryResult,
};


export type TrendingMoviesNow_PlayingArgs = {
  args: TrendingMoviesArgs
};


export type TrendingMoviesPopularArgs = {
  args: TrendingMoviesArgs
};


export type TrendingMoviesTop_RatedArgs = {
  args: TrendingMoviesArgs
};


export type TrendingMoviesUpcomingArgs = {
  args: TrendingMoviesArgs
};

export type TrendingMoviesArgs = {
  language?: Maybe<Iso6391Language>,
  page: Scalars['Int'],
};

export type TrendingMoviesQueryResult = {
   __typename?: 'TrendingMoviesQueryResult',
  total_results: Scalars['Int'],
  total_pages: Scalars['Int'],
  items: Array<BaseMovie>,
  hasMore: Scalars['Boolean'],
};

export type TrendingTvShows = {
   __typename?: 'TrendingTVShows',
  on_the_air: TrendingTvShowsQueryResult,
  popular: TrendingTvShowsQueryResult,
  top_rated: TrendingTvShowsQueryResult,
};


export type TrendingTvShowsOn_The_AirArgs = {
  args: TrendingTvShowsArgs
};


export type TrendingTvShowsPopularArgs = {
  args: TrendingTvShowsArgs
};


export type TrendingTvShowsTop_RatedArgs = {
  args: TrendingTvShowsArgs
};

export type TrendingTvShowsArgs = {
  language?: Maybe<Iso6391Language>,
  page: Scalars['Int'],
};

export type TrendingTvShowsQueryResult = {
   __typename?: 'TrendingTVShowsQueryResult',
  total_results: Scalars['Int'],
  total_pages: Scalars['Int'],
  items: Array<BaseTvShow>,
  hasMore: Scalars['Boolean'],
};

export type TvShow = {
   __typename?: 'TVShow',
  seasons: Array<Season>,
  last_episode_to_air?: Maybe<LastEpisodeToAir>,
  backdrop_path?: Maybe<Scalars['String']>,
  created_by: Array<Creator>,
  networks: Array<Network>,
  episode_run_time: Array<Scalars['Int']>,
  first_air_date?: Maybe<Scalars['String']>,
  homepage?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>,
  in_production?: Maybe<Scalars['Boolean']>,
  languages: Array<Scalars['String']>,
  last_air_date?: Maybe<Scalars['String']>,
  genres: Array<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  vote_average?: Maybe<Scalars['Float']>,
  vote_count?: Maybe<Scalars['Int']>,
  production_companies: Array<ProductionCompany>,
  original_language?: Maybe<Scalars['String']>,
  original_name?: Maybe<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  videos: Array<MediaVideo>,
  popularity?: Maybe<Scalars['Float']>,
  poster_path?: Maybe<Scalars['String']>,
  cast: Array<CastItem>,
  crew: Array<CrewItem>,
  number_of_episodes?: Maybe<Scalars['Int']>,
  number_of_seasons?: Maybe<Scalars['Int']>,
  origin_country: Array<Scalars['String']>,
  similar: Array<BaseTvShow>,
  images: Array<Scalars['String']>,
  reviews: Array<Review>,
};


export type TvShowGenresArgs = {
  language?: Maybe<Iso6391Language>
};


export type TvShowImagesArgs = {
  id: Scalars['ID']
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
  TrendingMovies: ResolverTypeWrapper<TrendingMovies>,
  TrendingMoviesArgs: TrendingMoviesArgs,
  ISO6391Language: Iso6391Language,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  TrendingMoviesQueryResult: ResolverTypeWrapper<TrendingMoviesQueryResult>,
  BaseMovie: ResolverTypeWrapper<BaseMovie>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  TrendingTVShows: ResolverTypeWrapper<TrendingTvShows>,
  TrendingTVShowsArgs: TrendingTvShowsArgs,
  TrendingTVShowsQueryResult: ResolverTypeWrapper<TrendingTvShowsQueryResult>,
  BaseTVShow: ResolverTypeWrapper<BaseTvShow>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  TVShow: ResolverTypeWrapper<TvShow>,
  Season: ResolverTypeWrapper<Season>,
  LastEpisodeToAir: ResolverTypeWrapper<LastEpisodeToAir>,
  Creator: ResolverTypeWrapper<Creator>,
  Network: ResolverTypeWrapper<Network>,
  ProductionCompany: ResolverTypeWrapper<ProductionCompany>,
  MediaVideo: ResolverTypeWrapper<MediaVideo>,
  Thumbnail: ResolverTypeWrapper<Thumbnail>,
  CastItem: ResolverTypeWrapper<CastItem>,
  CrewItem: ResolverTypeWrapper<CrewItem>,
  Review: ResolverTypeWrapper<Review>,
  Movie: ResolverTypeWrapper<Movie>,
  ArticleLanguage: ArticleLanguage,
  ArticleQueryResult: ResolverTypeWrapper<ArticleQueryResult>,
  Article: ResolverTypeWrapper<Article>,
  PeopleQueryResult: ResolverTypeWrapper<PeopleQueryResult>,
  BasePerson: ResolverTypeWrapper<Omit<BasePerson, 'known_for'> & { known_for: Array<ResolversTypes['PersonKnowFor']> }>,
  PersonKnowFor: ResolversTypes['BaseMovie'] | ResolversTypes['BaseTVShow'],
  Person: ResolverTypeWrapper<Person>,
  Cast: ResolverTypeWrapper<Cast>,
  QuizInput: QuizInput,
  QuestionDifficulty: QuestionDifficulty,
  QuestionType: QuestionType,
  QuestionCategory: QuestionCategory,
  Question: ResolverTypeWrapper<Question>,
  SearchType: SearchType,
  SearchQueryResult: ResolverTypeWrapper<Omit<SearchQueryResult, 'items'> & { items: Array<ResolversTypes['SearchResultItem']> }>,
  SearchResultItem: ResolversTypes['BasePerson'] | ResolversTypes['BaseMovie'] | ResolversTypes['BaseTVShow'],
  CacheControlScope: CacheControlScope,
  CastMovie: ResolverTypeWrapper<CastMovie>,
  CastTVShow: ResolverTypeWrapper<CastTvShow>,
  MediaType: MediaType,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  String: Scalars['String'],
  TrendingMovies: TrendingMovies,
  TrendingMoviesArgs: TrendingMoviesArgs,
  ISO6391Language: Iso6391Language,
  Int: Scalars['Int'],
  TrendingMoviesQueryResult: TrendingMoviesQueryResult,
  BaseMovie: BaseMovie,
  Boolean: Scalars['Boolean'],
  Float: Scalars['Float'],
  TrendingTVShows: TrendingTvShows,
  TrendingTVShowsArgs: TrendingTvShowsArgs,
  TrendingTVShowsQueryResult: TrendingTvShowsQueryResult,
  BaseTVShow: BaseTvShow,
  ID: Scalars['ID'],
  TVShow: TvShow,
  Season: Season,
  LastEpisodeToAir: LastEpisodeToAir,
  Creator: Creator,
  Network: Network,
  ProductionCompany: ProductionCompany,
  MediaVideo: MediaVideo,
  Thumbnail: Thumbnail,
  CastItem: CastItem,
  CrewItem: CrewItem,
  Review: Review,
  Movie: Movie,
  ArticleLanguage: ArticleLanguage,
  ArticleQueryResult: ArticleQueryResult,
  Article: Article,
  PeopleQueryResult: PeopleQueryResult,
  BasePerson: Omit<BasePerson, 'known_for'> & { known_for: Array<ResolversParentTypes['PersonKnowFor']> },
  PersonKnowFor: ResolversParentTypes['BaseMovie'] | ResolversParentTypes['BaseTVShow'],
  Person: Person,
  Cast: Cast,
  QuizInput: QuizInput,
  QuestionDifficulty: QuestionDifficulty,
  QuestionType: QuestionType,
  QuestionCategory: QuestionCategory,
  Question: Question,
  SearchType: SearchType,
  SearchQueryResult: Omit<SearchQueryResult, 'items'> & { items: Array<ResolversParentTypes['SearchResultItem']> },
  SearchResultItem: ResolversParentTypes['BasePerson'] | ResolversParentTypes['BaseMovie'] | ResolversParentTypes['BaseTVShow'],
  CacheControlScope: CacheControlScope,
  CastMovie: CastMovie,
  CastTVShow: CastTvShow,
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

export type BaseMovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseMovie'] = ResolversParentTypes['BaseMovie']> = ResolversObject<{
  original_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  video?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  release_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  genre_ids?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, BaseMovieGenre_IdsArgs>,
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  media_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type BasePersonResolvers<ContextType = any, ParentType extends ResolversParentTypes['BasePerson'] = ResolversParentTypes['BasePerson']> = ResolversObject<{
  profile_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  known_for?: Resolver<Array<ResolversTypes['PersonKnowFor']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type BaseTvShowResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseTVShow'] = ResolversParentTypes['BaseTVShow']> = ResolversObject<{
  origin_country?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  original_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  first_air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  genre_ids?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, BaseTvShowGenre_IdsArgs>,
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  media_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type CastResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cast'] = ResolversParentTypes['Cast']> = ResolversObject<{
  __resolveType: TypeResolveFn<'CastMovie' | 'CastTVShow', ParentType, ContextType>,
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  media_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  genre_ids?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, CastGenre_IdsArgs>,
  vote_count?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  credit_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type CastItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['CastItem'] = ResolversParentTypes['CastItem']> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  profile_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type CastMovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['CastMovie'] = ResolversParentTypes['CastMovie']> = ResolversObject<{
  original_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  video?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  release_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  genre_ids?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, CastMovieGenre_IdsArgs>,
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  media_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  vote_count?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  credit_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type CastTvShowResolvers<ContextType = any, ParentType extends ResolversParentTypes['CastTVShow'] = ResolversParentTypes['CastTVShow']> = ResolversObject<{
  episode_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  origin_country?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  original_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  first_air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  genre_ids?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, CastTvShowGenre_IdsArgs>,
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  media_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  vote_count?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  credit_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type CreatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Creator'] = ResolversParentTypes['Creator']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  credit_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  profile_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type CrewItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['CrewItem'] = ResolversParentTypes['CrewItem']> = ResolversObject<{
  department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  job?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  profile_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type LastEpisodeToAirResolvers<ContextType = any, ParentType extends ResolversParentTypes['LastEpisodeToAir'] = ResolversParentTypes['LastEpisodeToAir']> = ResolversObject<{
  air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  episode_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  production_code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  season_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  show_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  still_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type MediaVideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaVideo'] = ResolversParentTypes['MediaVideo']> = ResolversObject<{
  thumbnail?: Resolver<Maybe<ResolversTypes['Thumbnail']>, ParentType, ContextType>,
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  site?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type MovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = ResolversObject<{
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, MovieGenresArgs>,
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  original_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  video?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  release_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  production_companies?: Resolver<Array<ResolversTypes['ProductionCompany']>, ParentType, ContextType>,
  vote_count?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  runtime?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  spoken_languages?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  budget?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  homepage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  revenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  production_countries?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  cast?: Resolver<Array<ResolversTypes['CastItem']>, ParentType, ContextType>,
  crew?: Resolver<Array<ResolversTypes['CrewItem']>, ParentType, ContextType>,
  videos?: Resolver<Array<ResolversTypes['MediaVideo']>, ParentType, ContextType>,
  images?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MovieImagesArgs, 'id'>>,
  similar?: Resolver<Array<ResolversTypes['BaseMovie']>, ParentType, ContextType>,
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>,
}>;

export type NetworkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Network'] = ResolversParentTypes['Network']> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  logo_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  origin_country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type PeopleQueryResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['PeopleQueryResult'] = ResolversParentTypes['PeopleQueryResult']> = ResolversObject<{
  total_results?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  total_pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  items?: Resolver<Array<ResolversTypes['BasePerson']>, ParentType, ContextType>,
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type PersonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Person'] = ResolversParentTypes['Person']> = ResolversObject<{
  birthday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  known_for_department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  deathday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  also_known_as?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  place_of_birth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  profile_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  imdb_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  homepage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  biography?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  images?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  cast?: Resolver<Array<ResolversTypes['Cast']>, ParentType, ContextType>,
}>;

export type PersonKnowForResolvers<ContextType = any, ParentType extends ResolversParentTypes['PersonKnowFor'] = ResolversParentTypes['PersonKnowFor']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BaseMovie' | 'BaseTVShow', ParentType, ContextType>
}>;

export type ProductionCompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductionCompany'] = ResolversParentTypes['ProductionCompany']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  logo_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  origin_country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  trending_movies?: Resolver<ResolversTypes['TrendingMovies'], ParentType, ContextType>,
  trending_tv_shows?: Resolver<ResolversTypes['TrendingTVShows'], ParentType, ContextType>,
  tv_show?: Resolver<Maybe<ResolversTypes['TVShow']>, ParentType, ContextType, RequireFields<QueryTv_ShowArgs, 'id'>>,
  movie?: Resolver<Maybe<ResolversTypes['Movie']>, ParentType, ContextType, RequireFields<QueryMovieArgs, 'id'>>,
  articles?: Resolver<ResolversTypes['ArticleQueryResult'], ParentType, ContextType, RequireFields<QueryArticlesArgs, 'page'>>,
  people?: Resolver<ResolversTypes['PeopleQueryResult'], ParentType, ContextType, RequireFields<QueryPeopleArgs, 'page'>>,
  person?: Resolver<Maybe<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<QueryPersonArgs, 'id'>>,
  quiz?: Resolver<Array<ResolversTypes['Question']>, ParentType, ContextType, RequireFields<QueryQuizArgs, 'input'>>,
  search?: Resolver<ResolversTypes['SearchQueryResult'], ParentType, ContextType, RequireFields<QuerySearchArgs, 'page' | 'query' | 'type'>>,
}>;

export type QuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']> = ResolversObject<{
  incorrect_answers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  difficulty?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  correct_answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
}>;

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = ResolversObject<{
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type SearchQueryResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchQueryResult'] = ResolversParentTypes['SearchQueryResult']> = ResolversObject<{
  total_results?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  items?: Resolver<Array<ResolversTypes['SearchResultItem']>, ParentType, ContextType>,
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type SearchResultItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchResultItem'] = ResolversParentTypes['SearchResultItem']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BasePerson' | 'BaseMovie' | 'BaseTVShow', ParentType, ContextType>
}>;

export type SeasonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Season'] = ResolversParentTypes['Season']> = ResolversObject<{
  air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  episode_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  season_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type ThumbnailResolvers<ContextType = any, ParentType extends ResolversParentTypes['Thumbnail'] = ResolversParentTypes['Thumbnail']> = ResolversObject<{
  extra_small?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  small?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  medium?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  large?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  extra_large?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type TrendingMoviesResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingMovies'] = ResolversParentTypes['TrendingMovies']> = ResolversObject<{
  now_playing?: Resolver<ResolversTypes['TrendingMoviesQueryResult'], ParentType, ContextType, RequireFields<TrendingMoviesNow_PlayingArgs, 'args'>>,
  popular?: Resolver<ResolversTypes['TrendingMoviesQueryResult'], ParentType, ContextType, RequireFields<TrendingMoviesPopularArgs, 'args'>>,
  top_rated?: Resolver<ResolversTypes['TrendingMoviesQueryResult'], ParentType, ContextType, RequireFields<TrendingMoviesTop_RatedArgs, 'args'>>,
  upcoming?: Resolver<ResolversTypes['TrendingMoviesQueryResult'], ParentType, ContextType, RequireFields<TrendingMoviesUpcomingArgs, 'args'>>,
}>;

export type TrendingMoviesQueryResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingMoviesQueryResult'] = ResolversParentTypes['TrendingMoviesQueryResult']> = ResolversObject<{
  total_results?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  total_pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  items?: Resolver<Array<ResolversTypes['BaseMovie']>, ParentType, ContextType>,
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type TrendingTvShowsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingTVShows'] = ResolversParentTypes['TrendingTVShows']> = ResolversObject<{
  on_the_air?: Resolver<ResolversTypes['TrendingTVShowsQueryResult'], ParentType, ContextType, RequireFields<TrendingTvShowsOn_The_AirArgs, 'args'>>,
  popular?: Resolver<ResolversTypes['TrendingTVShowsQueryResult'], ParentType, ContextType, RequireFields<TrendingTvShowsPopularArgs, 'args'>>,
  top_rated?: Resolver<ResolversTypes['TrendingTVShowsQueryResult'], ParentType, ContextType, RequireFields<TrendingTvShowsTop_RatedArgs, 'args'>>,
}>;

export type TrendingTvShowsQueryResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingTVShowsQueryResult'] = ResolversParentTypes['TrendingTVShowsQueryResult']> = ResolversObject<{
  total_results?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  total_pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  items?: Resolver<Array<ResolversTypes['BaseTVShow']>, ParentType, ContextType>,
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type TvShowResolvers<ContextType = any, ParentType extends ResolversParentTypes['TVShow'] = ResolversParentTypes['TVShow']> = ResolversObject<{
  seasons?: Resolver<Array<ResolversTypes['Season']>, ParentType, ContextType>,
  last_episode_to_air?: Resolver<Maybe<ResolversTypes['LastEpisodeToAir']>, ParentType, ContextType>,
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  created_by?: Resolver<Array<ResolversTypes['Creator']>, ParentType, ContextType>,
  networks?: Resolver<Array<ResolversTypes['Network']>, ParentType, ContextType>,
  episode_run_time?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>,
  first_air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  homepage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  in_production?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  languages?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  last_air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, TvShowGenresArgs>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  production_companies?: Resolver<Array<ResolversTypes['ProductionCompany']>, ParentType, ContextType>,
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  original_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  videos?: Resolver<Array<ResolversTypes['MediaVideo']>, ParentType, ContextType>,
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  cast?: Resolver<Array<ResolversTypes['CastItem']>, ParentType, ContextType>,
  crew?: Resolver<Array<ResolversTypes['CrewItem']>, ParentType, ContextType>,
  number_of_episodes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  number_of_seasons?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  origin_country?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  similar?: Resolver<Array<ResolversTypes['BaseTVShow']>, ParentType, ContextType>,
  images?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<TvShowImagesArgs, 'id'>>,
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>,
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type Resolvers<ContextType = any> = ResolversObject<{
  Article?: ArticleResolvers<ContextType>,
  ArticleQueryResult?: ArticleQueryResultResolvers<ContextType>,
  BaseMovie?: BaseMovieResolvers<ContextType>,
  BasePerson?: BasePersonResolvers<ContextType>,
  BaseTVShow?: BaseTvShowResolvers<ContextType>,
  Cast?: CastResolvers,
  CastItem?: CastItemResolvers<ContextType>,
  CastMovie?: CastMovieResolvers<ContextType>,
  CastTVShow?: CastTvShowResolvers<ContextType>,
  Creator?: CreatorResolvers<ContextType>,
  CrewItem?: CrewItemResolvers<ContextType>,
  LastEpisodeToAir?: LastEpisodeToAirResolvers<ContextType>,
  MediaVideo?: MediaVideoResolvers<ContextType>,
  Movie?: MovieResolvers<ContextType>,
  Network?: NetworkResolvers<ContextType>,
  PeopleQueryResult?: PeopleQueryResultResolvers<ContextType>,
  Person?: PersonResolvers<ContextType>,
  PersonKnowFor?: PersonKnowForResolvers,
  ProductionCompany?: ProductionCompanyResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Question?: QuestionResolvers<ContextType>,
  Review?: ReviewResolvers<ContextType>,
  SearchQueryResult?: SearchQueryResultResolvers<ContextType>,
  SearchResultItem?: SearchResultItemResolvers,
  Season?: SeasonResolvers<ContextType>,
  Thumbnail?: ThumbnailResolvers<ContextType>,
  TrendingMovies?: TrendingMoviesResolvers<ContextType>,
  TrendingMoviesQueryResult?: TrendingMoviesQueryResultResolvers<ContextType>,
  TrendingTVShows?: TrendingTvShowsResolvers<ContextType>,
  TrendingTVShowsQueryResult?: TrendingTvShowsQueryResultResolvers<ContextType>,
  TVShow?: TvShowResolvers<ContextType>,
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