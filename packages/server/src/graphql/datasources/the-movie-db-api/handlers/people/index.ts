import {
  Genres,
  RawPerson,
  GetPersonDetailsResult,
  GetPersonImagesResult,
  GetPersonCastResult,
} from '../../../../../types';
import {
  getFormatedLanguage,
  parsePeopleQueryResult,
  parsePersonQueryResult,
} from '../../helpers';
import { PeopleQueryResult, Iso6391Language, Person } from '../../../../../lib/types';

const COMBINED_CREDITS_ENDPOINT = '/combined_credits';
const POPULAR_PERSON_ENDPOINT = '/popular';
const PERSON_ENDPOINT = '/person';
const IMAGES_ENDPOINT = '/images';

interface GetPeopleParams {
  page: number;
}

type GetRequestParams = { language: string } & GetPeopleParams;

type GetPopularPeopleResult = {
  results: RawPerson[];
  total_pages: number;
};

type GetRequest = <T>(
  endpoint: string,
  params: { language: string } | GetRequestParams,
) => Promise<T>;

export interface IPeopleHandler {
  getPopularPeople: (
    page: number,
    genres: Genres,
    language?: Iso6391Language | null,
  ) => Promise<PeopleQueryResult>;
  getPerson: (
    id: number,
    genres: Genres,
    language?: Iso6391Language | null,
  ) => Promise<Person | null>;
  get: GetRequest;
}

class PeopleHandler implements IPeopleHandler {
  get: GetRequest;

  constructor(execGetRequest: GetRequest) {
    this.get = execGetRequest;
  }

  async getPopularPeople(
    page: number,
    genres: Genres,
    language?: Iso6391Language | null,
  ): Promise<PeopleQueryResult> {
    const { total_pages, results } = await (<Promise<GetPopularPeopleResult>>this.get(
      `${PERSON_ENDPOINT}/${POPULAR_PERSON_ENDPOINT}`,
      {
        language: getFormatedLanguage(language),
        page,
      },
    ));

    const people = results.map(result => parsePeopleQueryResult(result, genres));

    return {
      hasMore: page < total_pages,
      items: people,
    };
  }

  async getPerson(
    id: number,
    genres: Genres,
    language?: Iso6391Language | null,
  ): Promise<Person | null> {
    const params = {
      language: getFormatedLanguage(language),
    };

    const [details, { cast: castDetails }, images] = await Promise.all<
      GetPersonDetailsResult,
      GetPersonCastResult,
      GetPersonImagesResult
    >([
      this.get(`${PERSON_ENDPOINT}/${id}`, params),
      this.get(`${PERSON_ENDPOINT}/${id}${COMBINED_CREDITS_ENDPOINT}`, params),
      this.get(`${PERSON_ENDPOINT}/${id}${IMAGES_ENDPOINT}`, params),
    ]);

    const person = parsePersonQueryResult({ genres, details, castDetails, images });

    return person;
  }
}

export default PeopleHandler;
