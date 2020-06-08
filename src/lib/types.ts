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
  /** The `Upload` scalar type represents a file upload. */
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
  originalTitle?: Maybe<Scalars['String']>,
  video?: Maybe<Scalars['Boolean']>,
  title?: Maybe<Scalars['String']>,
  adult?: Maybe<Scalars['Boolean']>,
  releaseDate?: Maybe<Scalars['String']>,
  backdropPath?: Maybe<Scalars['String']>,
  genreIds: Array<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  voteAverage?: Maybe<Scalars['Float']>,
  mediaType?: Maybe<Scalars['String']>,
  posterPath?: Maybe<Scalars['String']>,
  popularity?: Maybe<Scalars['Float']>,
  originalLanguage?: Maybe<Scalars['String']>,
  voteCount?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['Int']>,
};


export type BaseMovieGenreIdsArgs = {
  language?: Maybe<Iso6391Language>
};

export type BaseMovieResponse = {
   __typename?: 'BaseMovieResponse',
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


export type BaseMovieResponseGenre_IdsArgs = {
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
  originCountry: Array<Scalars['String']>,
  originalName?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  firstAirDate?: Maybe<Scalars['String']>,
  backdropPath?: Maybe<Scalars['String']>,
  genreIds: Array<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  voteAverage?: Maybe<Scalars['Float']>,
  mediaType?: Maybe<Scalars['String']>,
  posterPath?: Maybe<Scalars['String']>,
  popularity?: Maybe<Scalars['Float']>,
  originalLanguage?: Maybe<Scalars['String']>,
  voteCount?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['Int']>,
};


export type BaseTvShowGenreIdsArgs = {
  language?: Maybe<Iso6391Language>
};

export type BaseTvShowResponse = {
   __typename?: 'BaseTVShowResponse',
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


export type BaseTvShowResponseGenre_IdsArgs = {
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
  profilePath?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['ID']>,
  character?: Maybe<Scalars['String']>,
  gender?: Maybe<Scalars['Int']>,
  order?: Maybe<Scalars['Int']>,
};

export type CastItemResponse = {
   __typename?: 'CastItemResponse',
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
  creditId?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  gender?: Maybe<Scalars['Int']>,
  profilePath?: Maybe<Scalars['String']>,
};

export type CreatorResponse = {
   __typename?: 'CreatorResponse',
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
  profilePath?: Maybe<Scalars['String']>,
};

export type CrewItemResponse = {
   __typename?: 'CrewItemResponse',
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
  airDate?: Maybe<Scalars['String']>,
  episodeNumber?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  productionCode?: Maybe<Scalars['String']>,
  seasonNumber?: Maybe<Scalars['Int']>,
  showId?: Maybe<Scalars['String']>,
  stillPath?: Maybe<Scalars['String']>,
  voteAverage?: Maybe<Scalars['Float']>,
  voteCount?: Maybe<Scalars['Int']>,
};

export type LastEpisodeToAirResponse = {
   __typename?: 'LastEpisodeToAirResponse',
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
  backdropPath?: Maybe<Scalars['String']>,
  genres: Array<Scalars['String']>,
  id?: Maybe<Scalars['ID']>,
  originalLanguage?: Maybe<Scalars['String']>,
  originalTitle?: Maybe<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  posterPath?: Maybe<Scalars['String']>,
  popularity?: Maybe<Scalars['Float']>,
  video?: Maybe<Scalars['Boolean']>,
  title?: Maybe<Scalars['String']>,
  voteAverage?: Maybe<Scalars['Float']>,
  releaseDate?: Maybe<Scalars['String']>,
  productionCompanies: Array<ProductionCompany>,
  voteCount?: Maybe<Scalars['Float']>,
  runtime?: Maybe<Scalars['Float']>,
  spokenLanguages: Array<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  tagline?: Maybe<Scalars['String']>,
  budget?: Maybe<Scalars['Float']>,
  homepage?: Maybe<Scalars['String']>,
  revenue?: Maybe<Scalars['Float']>,
  productionCountries: Array<Scalars['String']>,
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

export type MovieResponse = {
   __typename?: 'MovieResponse',
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
  production_companies: Array<ProductionCompanyResponse>,
  vote_count?: Maybe<Scalars['Float']>,
  runtime?: Maybe<Scalars['Float']>,
  spoken_languages: Array<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  tagline?: Maybe<Scalars['String']>,
  budget?: Maybe<Scalars['Float']>,
  homepage?: Maybe<Scalars['String']>,
  revenue?: Maybe<Scalars['Float']>,
  production_countries: Array<Scalars['String']>,
  cast: Array<CastItemResponse>,
  crew: Array<CrewItemResponse>,
  videos: Array<MediaVideo>,
  images: Array<Scalars['String']>,
  similar: Array<BaseMovieResponse>,
  reviews: Array<Review>,
};


export type MovieResponseGenresArgs = {
  language?: Maybe<Iso6391Language>
};


export type MovieResponseImagesArgs = {
  id: Scalars['ID']
};

export type Network = {
   __typename?: 'Network',
  name?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['ID']>,
  logoPath?: Maybe<Scalars['String']>,
  originCountry?: Maybe<Scalars['String']>,
};

export type NetworkResponse = {
   __typename?: 'NetworkResponse',
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
  logoPath?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  originCountry?: Maybe<Scalars['String']>,
};

export type ProductionCompanyResponse = {
   __typename?: 'ProductionCompanyResponse',
  id?: Maybe<Scalars['ID']>,
  logo_path?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  origin_country?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  _?: Maybe<Scalars['String']>,
  search: SearchQueryResult,
  trendingMovies: TrendingMovies,
  trendingTvShows: TrendingTvShows,
  tvShow?: Maybe<TvShow>,
  movie?: Maybe<Movie>,
  articles: ArticleQueryResult,
  people: PeopleQueryResult,
  person?: Maybe<Person>,
  quiz: Array<Question>,
};


export type QuerySearchArgs = {
  input: SearchInput,
  genresLanguage?: Maybe<Iso6391Language>
};


export type QueryTvShowArgs = {
  id: Scalars['ID'],
  language?: Maybe<Iso6391Language>
};


export type QueryMovieArgs = {
  id: Scalars['ID'],
  language?: Maybe<Iso6391Language>
};


export type QueryArticlesArgs = {
  page: Scalars['Int'],
  language: ArticleLanguage
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

export type Question = {
   __typename?: 'Question',
  options: Array<Scalars['String']>,
  category: Scalars['String'],
  type: Scalars['String'],
  difficulty: Scalars['String'],
  question: Scalars['String'],
  correctAnswer: Scalars['String'],
};

export enum QuestionCategory {
  Movie = 'MOVIE',
  Tv = 'TV',
  Mixed = 'MIXED'
}

export enum QuestionDifficulty {
  Easy = 'EASY',
  Medium = 'MEDIUM',
  Hard = 'HARD',
  Mixed = 'MIXED'
}

export enum QuestionType {
  Multiple = 'MULTIPLE',
  Boolean = 'BOOLEAN',
  Mixed = 'MIXED'
}

export type QuizInput = {
  difficulty: QuestionDifficulty,
  type: QuestionType,
  category: QuestionCategory,
  numberOfQuestions: Scalars['Int'],
};

export type Review = {
   __typename?: 'Review',
  author?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['ID']>,
  url?: Maybe<Scalars['String']>,
};

export type SearchInput = {
  page: Scalars['Int'],
  query: Scalars['String'],
  type: SearchType,
  language?: Maybe<Iso6391Language>,
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
  airDate?: Maybe<Scalars['String']>,
  episodeCount?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  posterPath?: Maybe<Scalars['String']>,
  seasonNumber?: Maybe<Scalars['Int']>,
};

export type SeasonResponse = {
   __typename?: 'SeasonResponse',
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
  /** 120x90 */
  extra_small?: Maybe<Scalars['String']>,
  /** 320x180 */
  small?: Maybe<Scalars['String']>,
  /** 480x360 */
  medium?: Maybe<Scalars['String']>,
  /** 640x480 */
  large?: Maybe<Scalars['String']>,
  /** 1280x720 */
  extra_large?: Maybe<Scalars['String']>,
};

export type TrendingMovies = {
   __typename?: 'TrendingMovies',
  nowPlaying: TrendingMoviesQueryResult,
  popular: TrendingMoviesQueryResult,
  topRated: TrendingMoviesQueryResult,
  upcoming: TrendingMoviesQueryResult,
};


export type TrendingMoviesNowPlayingArgs = {
  args: TrendingMoviesArgs
};


export type TrendingMoviesPopularArgs = {
  args: TrendingMoviesArgs
};


export type TrendingMoviesTopRatedArgs = {
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
  totalResults: Scalars['Int'],
  totalPages: Scalars['Int'],
  items: Array<BaseMovie>,
  hasMore: Scalars['Boolean'],
};

export type TrendingTvShows = {
   __typename?: 'TrendingTVShows',
  onTheAir: TrendingTvShowsQueryResult,
  popular: TrendingTvShowsQueryResult,
  topRated: TrendingTvShowsQueryResult,
};


export type TrendingTvShowsOnTheAirArgs = {
  args: TrendingTvShowsArgs
};


export type TrendingTvShowsPopularArgs = {
  args: TrendingTvShowsArgs
};


export type TrendingTvShowsTopRatedArgs = {
  args: TrendingTvShowsArgs
};

export type TrendingTvShowsArgs = {
  language?: Maybe<Iso6391Language>,
  page: Scalars['Int'],
};

export type TrendingTvShowsQueryResult = {
   __typename?: 'TrendingTVShowsQueryResult',
  totalResults: Scalars['Int'],
  totalPages: Scalars['Int'],
  items: Array<BaseTvShow>,
  hasMore: Scalars['Boolean'],
};

export type TvShow = {
   __typename?: 'TVShow',
  seasons: Array<Season>,
  lastEpisodeToAir?: Maybe<LastEpisodeToAir>,
  backdropPath?: Maybe<Scalars['String']>,
  createdBy: Array<Creator>,
  networks: Array<Network>,
  episodeRunTime: Array<Scalars['Int']>,
  firstAirDate?: Maybe<Scalars['String']>,
  homepage?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>,
  inProduction?: Maybe<Scalars['Boolean']>,
  languages: Array<Scalars['String']>,
  lastAirDate?: Maybe<Scalars['String']>,
  genres: Array<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  voteAverage?: Maybe<Scalars['Float']>,
  voteCount?: Maybe<Scalars['Int']>,
  productionCompanies: Array<ProductionCompany>,
  originalLanguage?: Maybe<Scalars['String']>,
  originalName?: Maybe<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  videos: Array<MediaVideo>,
  popularity?: Maybe<Scalars['Float']>,
  posterPath?: Maybe<Scalars['String']>,
  cast: Array<CastItem>,
  crew: Array<CrewItem>,
  numberOfEpisodes?: Maybe<Scalars['Int']>,
  numberOfSeasons?: Maybe<Scalars['Int']>,
  originCountry: Array<Scalars['String']>,
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

export type TvShowResponse = {
   __typename?: 'TVShowResponse',
  seasons: Array<Season>,
  last_episode_to_air?: Maybe<LastEpisodeToAirResponse>,
  backdrop_path?: Maybe<Scalars['String']>,
  created_by: Array<CreatorResponse>,
  networks: Array<NetworkResponse>,
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
  production_companies: Array<ProductionCompanyResponse>,
  original_language?: Maybe<Scalars['String']>,
  original_name?: Maybe<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  videos: Array<MediaVideo>,
  popularity?: Maybe<Scalars['Float']>,
  poster_path?: Maybe<Scalars['String']>,
  cast: Array<CastItemResponse>,
  crew: Array<CrewItemResponse>,
  number_of_episodes?: Maybe<Scalars['Int']>,
  number_of_seasons?: Maybe<Scalars['Int']>,
  origin_country: Array<Scalars['String']>,
  similar: Array<BaseTvShowResponse>,
  images: Array<Scalars['String']>,
  reviews: Array<Review>,
};


export type TvShowResponseGenresArgs = {
  language?: Maybe<Iso6391Language>
};


export type TvShowResponseImagesArgs = {
  id: Scalars['ID']
};


export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

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
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  SearchInput: SearchInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  SearchType: SearchType;
  ISO6391Language: Iso6391Language;
  SearchQueryResult: ResolverTypeWrapper<Omit<SearchQueryResult, 'items'> & { items: Array<ResolversTypes['SearchResultItem']> }>;
  SearchResultItem: ResolversTypes['BasePerson'] | ResolversTypes['BaseMovie'] | ResolversTypes['BaseTVShow'];
  BasePerson: ResolverTypeWrapper<Omit<BasePerson, 'known_for'> & { known_for: Array<ResolversTypes['PersonKnowFor']> }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  PersonKnowFor: ResolversTypes['BaseMovie'] | ResolversTypes['BaseTVShow'];
  BaseMovie: ResolverTypeWrapper<BaseMovie>;
  BaseTVShow: ResolverTypeWrapper<BaseTvShow>;
  TrendingMovies: ResolverTypeWrapper<TrendingMovies>;
  TrendingMoviesArgs: TrendingMoviesArgs;
  TrendingMoviesQueryResult: ResolverTypeWrapper<TrendingMoviesQueryResult>;
  TrendingTVShows: ResolverTypeWrapper<TrendingTvShows>;
  TrendingTVShowsArgs: TrendingTvShowsArgs;
  TrendingTVShowsQueryResult: ResolverTypeWrapper<TrendingTvShowsQueryResult>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  TVShow: ResolverTypeWrapper<TvShow>;
  Season: ResolverTypeWrapper<Season>;
  LastEpisodeToAir: ResolverTypeWrapper<LastEpisodeToAir>;
  Creator: ResolverTypeWrapper<Creator>;
  Network: ResolverTypeWrapper<Network>;
  ProductionCompany: ResolverTypeWrapper<ProductionCompany>;
  MediaVideo: ResolverTypeWrapper<MediaVideo>;
  Thumbnail: ResolverTypeWrapper<Thumbnail>;
  CastItem: ResolverTypeWrapper<CastItem>;
  CrewItem: ResolverTypeWrapper<CrewItem>;
  Review: ResolverTypeWrapper<Review>;
  Movie: ResolverTypeWrapper<Movie>;
  ArticleLanguage: ArticleLanguage;
  ArticleQueryResult: ResolverTypeWrapper<ArticleQueryResult>;
  Article: ResolverTypeWrapper<Article>;
  PeopleQueryResult: ResolverTypeWrapper<PeopleQueryResult>;
  Person: ResolverTypeWrapper<Person>;
  Cast: ResolversTypes['CastMovie'] | ResolversTypes['CastTVShow'];
  QuizInput: QuizInput;
  QuestionDifficulty: QuestionDifficulty;
  QuestionType: QuestionType;
  QuestionCategory: QuestionCategory;
  Question: ResolverTypeWrapper<Question>;
  MovieResponse: ResolverTypeWrapper<MovieResponse>;
  ProductionCompanyResponse: ResolverTypeWrapper<ProductionCompanyResponse>;
  CastItemResponse: ResolverTypeWrapper<CastItemResponse>;
  CrewItemResponse: ResolverTypeWrapper<CrewItemResponse>;
  BaseMovieResponse: ResolverTypeWrapper<BaseMovieResponse>;
  CreatorResponse: ResolverTypeWrapper<CreatorResponse>;
  LastEpisodeToAirResponse: ResolverTypeWrapper<LastEpisodeToAirResponse>;
  NetworkResponse: ResolverTypeWrapper<NetworkResponse>;
  SeasonResponse: ResolverTypeWrapper<SeasonResponse>;
  TVShowResponse: ResolverTypeWrapper<TvShowResponse>;
  BaseTVShowResponse: ResolverTypeWrapper<BaseTvShowResponse>;
  CastMovie: ResolverTypeWrapper<CastMovie>;
  CastTVShow: ResolverTypeWrapper<CastTvShow>;
  MediaType: MediaType;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  String: Scalars['String'];
  SearchInput: SearchInput;
  Int: Scalars['Int'];
  SearchType: SearchType;
  ISO6391Language: Iso6391Language;
  SearchQueryResult: Omit<SearchQueryResult, 'items'> & { items: Array<ResolversParentTypes['SearchResultItem']> };
  SearchResultItem: ResolversParentTypes['BasePerson'] | ResolversParentTypes['BaseMovie'] | ResolversParentTypes['BaseTVShow'];
  BasePerson: Omit<BasePerson, 'known_for'> & { known_for: Array<ResolversParentTypes['PersonKnowFor']> };
  Boolean: Scalars['Boolean'];
  Float: Scalars['Float'];
  PersonKnowFor: ResolversParentTypes['BaseMovie'] | ResolversParentTypes['BaseTVShow'];
  BaseMovie: BaseMovie;
  BaseTVShow: BaseTvShow;
  TrendingMovies: TrendingMovies;
  TrendingMoviesArgs: TrendingMoviesArgs;
  TrendingMoviesQueryResult: TrendingMoviesQueryResult;
  TrendingTVShows: TrendingTvShows;
  TrendingTVShowsArgs: TrendingTvShowsArgs;
  TrendingTVShowsQueryResult: TrendingTvShowsQueryResult;
  ID: Scalars['ID'];
  TVShow: TvShow;
  Season: Season;
  LastEpisodeToAir: LastEpisodeToAir;
  Creator: Creator;
  Network: Network;
  ProductionCompany: ProductionCompany;
  MediaVideo: MediaVideo;
  Thumbnail: Thumbnail;
  CastItem: CastItem;
  CrewItem: CrewItem;
  Review: Review;
  Movie: Movie;
  ArticleLanguage: ArticleLanguage;
  ArticleQueryResult: ArticleQueryResult;
  Article: Article;
  PeopleQueryResult: PeopleQueryResult;
  Person: Person;
  Cast: ResolversParentTypes['CastMovie'] | ResolversParentTypes['CastTVShow'];
  QuizInput: QuizInput;
  QuestionDifficulty: QuestionDifficulty;
  QuestionType: QuestionType;
  QuestionCategory: QuestionCategory;
  Question: Question;
  MovieResponse: MovieResponse;
  ProductionCompanyResponse: ProductionCompanyResponse;
  CastItemResponse: CastItemResponse;
  CrewItemResponse: CrewItemResponse;
  BaseMovieResponse: BaseMovieResponse;
  CreatorResponse: CreatorResponse;
  LastEpisodeToAirResponse: LastEpisodeToAirResponse;
  NetworkResponse: NetworkResponse;
  SeasonResponse: SeasonResponse;
  TVShowResponse: TvShowResponse;
  BaseTVShowResponse: BaseTvShowResponse;
  CastMovie: CastMovie;
  CastTVShow: CastTvShow;
  MediaType: MediaType;
  CacheControlScope: CacheControlScope;
  Upload: Scalars['Upload'];
}>;

export type ArticleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article']> = ResolversObject<{
  publishedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ArticleQueryResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArticleQueryResult'] = ResolversParentTypes['ArticleQueryResult']> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['Article']>, ParentType, ContextType>;
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type BaseMovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseMovie'] = ResolversParentTypes['BaseMovie']> = ResolversObject<{
  originalTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  releaseDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genreIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<BaseMovieGenreIdsArgs, never>>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  mediaType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type BaseMovieResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseMovieResponse'] = ResolversParentTypes['BaseMovieResponse']> = ResolversObject<{
  original_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  release_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre_ids?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<BaseMovieResponseGenre_IdsArgs, never>>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  media_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type BasePersonResolvers<ContextType = any, ParentType extends ResolversParentTypes['BasePerson'] = ResolversParentTypes['BasePerson']> = ResolversObject<{
  profile_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  known_for?: Resolver<Array<ResolversTypes['PersonKnowFor']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type BaseTvShowResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseTVShow'] = ResolversParentTypes['BaseTVShow']> = ResolversObject<{
  originCountry?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  originalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstAirDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genreIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<BaseTvShowGenreIdsArgs, never>>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  mediaType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type BaseTvShowResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseTVShowResponse'] = ResolversParentTypes['BaseTVShowResponse']> = ResolversObject<{
  origin_country?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  original_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  first_air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre_ids?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<BaseTvShowResponseGenre_IdsArgs, never>>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  media_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CastResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cast'] = ResolversParentTypes['Cast']> = ResolversObject<{
  __resolveType: TypeResolveFn<'CastMovie' | 'CastTVShow', ParentType, ContextType>;
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  media_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre_ids?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<CastGenre_IdsArgs, never>>;
  vote_count?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  credit_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type CastItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['CastItem'] = ResolversParentTypes['CastItem']> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profilePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CastItemResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CastItemResponse'] = ResolversParentTypes['CastItemResponse']> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CastMovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['CastMovie'] = ResolversParentTypes['CastMovie']> = ResolversObject<{
  original_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  release_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre_ids?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<CastMovieGenre_IdsArgs, never>>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  media_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  credit_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CastTvShowResolvers<ContextType = any, ParentType extends ResolversParentTypes['CastTVShow'] = ResolversParentTypes['CastTVShow']> = ResolversObject<{
  episode_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  origin_country?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  original_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  first_air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre_ids?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<CastTvShowGenre_IdsArgs, never>>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  media_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  credit_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CreatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Creator'] = ResolversParentTypes['Creator']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  creditId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  profilePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CreatorResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatorResponse'] = ResolversParentTypes['CreatorResponse']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  credit_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  profile_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CrewItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['CrewItem'] = ResolversParentTypes['CrewItem']> = ResolversObject<{
  department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  job?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  profilePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CrewItemResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CrewItemResponse'] = ResolversParentTypes['CrewItemResponse']> = ResolversObject<{
  department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  job?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  profile_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LastEpisodeToAirResolvers<ContextType = any, ParentType extends ResolversParentTypes['LastEpisodeToAir'] = ResolversParentTypes['LastEpisodeToAir']> = ResolversObject<{
  airDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episodeNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productionCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  seasonNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  showId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stillPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type LastEpisodeToAirResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LastEpisodeToAirResponse'] = ResolversParentTypes['LastEpisodeToAirResponse']> = ResolversObject<{
  air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episode_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  production_code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  season_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  show_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  still_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MediaVideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaVideo'] = ResolversParentTypes['MediaVideo']> = ResolversObject<{
  thumbnail?: Resolver<Maybe<ResolversTypes['Thumbnail']>, ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  site?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = ResolversObject<{
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MovieGenresArgs, never>>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  releaseDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productionCompanies?: Resolver<Array<ResolversTypes['ProductionCompany']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  runtime?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  spokenLanguages?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  budget?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  homepage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  revenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  productionCountries?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  cast?: Resolver<Array<ResolversTypes['CastItem']>, ParentType, ContextType>;
  crew?: Resolver<Array<ResolversTypes['CrewItem']>, ParentType, ContextType>;
  videos?: Resolver<Array<ResolversTypes['MediaVideo']>, ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MovieImagesArgs, 'id'>>;
  similar?: Resolver<Array<ResolversTypes['BaseMovie']>, ParentType, ContextType>;
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type MovieResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MovieResponse'] = ResolversParentTypes['MovieResponse']> = ResolversObject<{
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MovieResponseGenresArgs, never>>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  original_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  release_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  production_companies?: Resolver<Array<ResolversTypes['ProductionCompanyResponse']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  runtime?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  spoken_languages?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  budget?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  homepage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  revenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  production_countries?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  cast?: Resolver<Array<ResolversTypes['CastItemResponse']>, ParentType, ContextType>;
  crew?: Resolver<Array<ResolversTypes['CrewItemResponse']>, ParentType, ContextType>;
  videos?: Resolver<Array<ResolversTypes['MediaVideo']>, ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MovieResponseImagesArgs, 'id'>>;
  similar?: Resolver<Array<ResolversTypes['BaseMovieResponse']>, ParentType, ContextType>;
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type NetworkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Network'] = ResolversParentTypes['Network']> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  logoPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originCountry?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type NetworkResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['NetworkResponse'] = ResolversParentTypes['NetworkResponse']> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  logo_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin_country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PeopleQueryResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['PeopleQueryResult'] = ResolversParentTypes['PeopleQueryResult']> = ResolversObject<{
  total_results?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total_pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['BasePerson']>, ParentType, ContextType>;
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PersonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Person'] = ResolversParentTypes['Person']> = ResolversObject<{
  birthday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  known_for_department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deathday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  also_known_as?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  place_of_birth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  imdb_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  homepage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  biography?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  cast?: Resolver<Array<ResolversTypes['Cast']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type PersonKnowForResolvers<ContextType = any, ParentType extends ResolversParentTypes['PersonKnowFor'] = ResolversParentTypes['PersonKnowFor']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BaseMovie' | 'BaseTVShow', ParentType, ContextType>;
}>;

export type ProductionCompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductionCompany'] = ResolversParentTypes['ProductionCompany']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  logoPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originCountry?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ProductionCompanyResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductionCompanyResponse'] = ResolversParentTypes['ProductionCompanyResponse']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  logo_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin_country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  search?: Resolver<ResolversTypes['SearchQueryResult'], ParentType, ContextType, RequireFields<QuerySearchArgs, 'input'>>;
  trendingMovies?: Resolver<ResolversTypes['TrendingMovies'], ParentType, ContextType>;
  trendingTvShows?: Resolver<ResolversTypes['TrendingTVShows'], ParentType, ContextType>;
  tvShow?: Resolver<Maybe<ResolversTypes['TVShow']>, ParentType, ContextType, RequireFields<QueryTvShowArgs, 'id'>>;
  movie?: Resolver<Maybe<ResolversTypes['Movie']>, ParentType, ContextType, RequireFields<QueryMovieArgs, 'id'>>;
  articles?: Resolver<ResolversTypes['ArticleQueryResult'], ParentType, ContextType, RequireFields<QueryArticlesArgs, 'page' | 'language'>>;
  people?: Resolver<ResolversTypes['PeopleQueryResult'], ParentType, ContextType, RequireFields<QueryPeopleArgs, 'page'>>;
  person?: Resolver<Maybe<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<QueryPersonArgs, 'id'>>;
  quiz?: Resolver<Array<ResolversTypes['Question']>, ParentType, ContextType, RequireFields<QueryQuizArgs, 'input'>>;
}>;

export type QuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']> = ResolversObject<{
  options?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  difficulty?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  correctAnswer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = ResolversObject<{
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SearchQueryResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchQueryResult'] = ResolversParentTypes['SearchQueryResult']> = ResolversObject<{
  total_results?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['SearchResultItem']>, ParentType, ContextType>;
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SearchResultItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchResultItem'] = ResolversParentTypes['SearchResultItem']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BasePerson' | 'BaseMovie' | 'BaseTVShow', ParentType, ContextType>;
}>;

export type SeasonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Season'] = ResolversParentTypes['Season']> = ResolversObject<{
  airDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episodeCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  seasonNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type SeasonResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SeasonResponse'] = ResolversParentTypes['SeasonResponse']> = ResolversObject<{
  air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episode_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  season_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type ThumbnailResolvers<ContextType = any, ParentType extends ResolversParentTypes['Thumbnail'] = ResolversParentTypes['Thumbnail']> = ResolversObject<{
  extra_small?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  small?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  medium?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  large?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  extra_large?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TrendingMoviesResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingMovies'] = ResolversParentTypes['TrendingMovies']> = ResolversObject<{
  nowPlaying?: Resolver<ResolversTypes['TrendingMoviesQueryResult'], ParentType, ContextType, RequireFields<TrendingMoviesNowPlayingArgs, 'args'>>;
  popular?: Resolver<ResolversTypes['TrendingMoviesQueryResult'], ParentType, ContextType, RequireFields<TrendingMoviesPopularArgs, 'args'>>;
  topRated?: Resolver<ResolversTypes['TrendingMoviesQueryResult'], ParentType, ContextType, RequireFields<TrendingMoviesTopRatedArgs, 'args'>>;
  upcoming?: Resolver<ResolversTypes['TrendingMoviesQueryResult'], ParentType, ContextType, RequireFields<TrendingMoviesUpcomingArgs, 'args'>>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TrendingMoviesQueryResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingMoviesQueryResult'] = ResolversParentTypes['TrendingMoviesQueryResult']> = ResolversObject<{
  totalResults?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['BaseMovie']>, ParentType, ContextType>;
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TrendingTvShowsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingTVShows'] = ResolversParentTypes['TrendingTVShows']> = ResolversObject<{
  onTheAir?: Resolver<ResolversTypes['TrendingTVShowsQueryResult'], ParentType, ContextType, RequireFields<TrendingTvShowsOnTheAirArgs, 'args'>>;
  popular?: Resolver<ResolversTypes['TrendingTVShowsQueryResult'], ParentType, ContextType, RequireFields<TrendingTvShowsPopularArgs, 'args'>>;
  topRated?: Resolver<ResolversTypes['TrendingTVShowsQueryResult'], ParentType, ContextType, RequireFields<TrendingTvShowsTopRatedArgs, 'args'>>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TrendingTvShowsQueryResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingTVShowsQueryResult'] = ResolversParentTypes['TrendingTVShowsQueryResult']> = ResolversObject<{
  totalResults?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['BaseTVShow']>, ParentType, ContextType>;
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TvShowResolvers<ContextType = any, ParentType extends ResolversParentTypes['TVShow'] = ResolversParentTypes['TVShow']> = ResolversObject<{
  seasons?: Resolver<Array<ResolversTypes['Season']>, ParentType, ContextType>;
  lastEpisodeToAir?: Resolver<Maybe<ResolversTypes['LastEpisodeToAir']>, ParentType, ContextType>;
  backdropPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Array<ResolversTypes['Creator']>, ParentType, ContextType>;
  networks?: Resolver<Array<ResolversTypes['Network']>, ParentType, ContextType>;
  episodeRunTime?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  firstAirDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  homepage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  inProduction?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  languages?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  lastAirDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<TvShowGenresArgs, never>>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voteAverage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  voteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  productionCompanies?: Resolver<Array<ResolversTypes['ProductionCompany']>, ParentType, ContextType>;
  originalLanguage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videos?: Resolver<Array<ResolversTypes['MediaVideo']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  posterPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cast?: Resolver<Array<ResolversTypes['CastItem']>, ParentType, ContextType>;
  crew?: Resolver<Array<ResolversTypes['CrewItem']>, ParentType, ContextType>;
  numberOfEpisodes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  numberOfSeasons?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  originCountry?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  similar?: Resolver<Array<ResolversTypes['BaseTVShow']>, ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<TvShowImagesArgs, 'id'>>;
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type TvShowResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['TVShowResponse'] = ResolversParentTypes['TVShowResponse']> = ResolversObject<{
  seasons?: Resolver<Array<ResolversTypes['Season']>, ParentType, ContextType>;
  last_episode_to_air?: Resolver<Maybe<ResolversTypes['LastEpisodeToAirResponse']>, ParentType, ContextType>;
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_by?: Resolver<Array<ResolversTypes['CreatorResponse']>, ParentType, ContextType>;
  networks?: Resolver<Array<ResolversTypes['NetworkResponse']>, ParentType, ContextType>;
  episode_run_time?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  first_air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  homepage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  in_production?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  languages?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  last_air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<TvShowResponseGenresArgs, never>>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  production_companies?: Resolver<Array<ResolversTypes['ProductionCompanyResponse']>, ParentType, ContextType>;
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  original_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videos?: Resolver<Array<ResolversTypes['MediaVideo']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cast?: Resolver<Array<ResolversTypes['CastItemResponse']>, ParentType, ContextType>;
  crew?: Resolver<Array<ResolversTypes['CrewItemResponse']>, ParentType, ContextType>;
  number_of_episodes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  number_of_seasons?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  origin_country?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  similar?: Resolver<Array<ResolversTypes['BaseTVShowResponse']>, ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<TvShowResponseImagesArgs, 'id'>>;
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = ResolversObject<{
  Article?: ArticleResolvers<ContextType>;
  ArticleQueryResult?: ArticleQueryResultResolvers<ContextType>;
  BaseMovie?: BaseMovieResolvers<ContextType>;
  BaseMovieResponse?: BaseMovieResponseResolvers<ContextType>;
  BasePerson?: BasePersonResolvers<ContextType>;
  BaseTVShow?: BaseTvShowResolvers<ContextType>;
  BaseTVShowResponse?: BaseTvShowResponseResolvers<ContextType>;
  Cast?: CastResolvers;
  CastItem?: CastItemResolvers<ContextType>;
  CastItemResponse?: CastItemResponseResolvers<ContextType>;
  CastMovie?: CastMovieResolvers<ContextType>;
  CastTVShow?: CastTvShowResolvers<ContextType>;
  Creator?: CreatorResolvers<ContextType>;
  CreatorResponse?: CreatorResponseResolvers<ContextType>;
  CrewItem?: CrewItemResolvers<ContextType>;
  CrewItemResponse?: CrewItemResponseResolvers<ContextType>;
  LastEpisodeToAir?: LastEpisodeToAirResolvers<ContextType>;
  LastEpisodeToAirResponse?: LastEpisodeToAirResponseResolvers<ContextType>;
  MediaVideo?: MediaVideoResolvers<ContextType>;
  Movie?: MovieResolvers<ContextType>;
  MovieResponse?: MovieResponseResolvers<ContextType>;
  Network?: NetworkResolvers<ContextType>;
  NetworkResponse?: NetworkResponseResolvers<ContextType>;
  PeopleQueryResult?: PeopleQueryResultResolvers<ContextType>;
  Person?: PersonResolvers<ContextType>;
  PersonKnowFor?: PersonKnowForResolvers;
  ProductionCompany?: ProductionCompanyResolvers<ContextType>;
  ProductionCompanyResponse?: ProductionCompanyResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  SearchQueryResult?: SearchQueryResultResolvers<ContextType>;
  SearchResultItem?: SearchResultItemResolvers;
  Season?: SeasonResolvers<ContextType>;
  SeasonResponse?: SeasonResponseResolvers<ContextType>;
  Thumbnail?: ThumbnailResolvers<ContextType>;
  TrendingMovies?: TrendingMoviesResolvers<ContextType>;
  TrendingMoviesQueryResult?: TrendingMoviesQueryResultResolvers<ContextType>;
  TrendingTVShows?: TrendingTvShowsResolvers<ContextType>;
  TrendingTVShowsQueryResult?: TrendingTvShowsQueryResultResolvers<ContextType>;
  TVShow?: TvShowResolvers<ContextType>;
  TVShowResponse?: TvShowResponseResolvers<ContextType>;
  Upload?: GraphQLScalarType;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
