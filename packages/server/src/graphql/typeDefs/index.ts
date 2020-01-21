import ISO6391Language from './types/ISO6391Language';
import root from './root';
import baseMovie from './types/baseMovie';
import basePerson from './types/basePerson';
import baseTVShow from './types/baseTVShow';
import cast from './types/cast';
import castMovie from './types/castMovie';
import castTV from './types/castTVShow';
import articleLanguage from './types/articleLanguage';
import personKnownFor from './types/personKnownFor';
import mediaType from './types/mediaType';
import article from './types/articleLanguage';
import articleQueryResult from './types/articleQueryResult';
import peopleQueryResult from './types/peopleQueryResult';
import person from './types/person';
import searchResults from './types/searchResults';
import searchTypes from './types/searchTypes';
import queries from './queries';

export default [
  root,
  queries,
  article,
  peopleQueryResult,
  searchTypes,
  articleQueryResult,
  articleLanguage,
  searchResults,
  baseMovie,
  basePerson,
  baseTVShow,
  cast,
  person,
  mediaType,
  castMovie,
  castTV,
  personKnownFor,
  person,
  ISO6391Language,
];
