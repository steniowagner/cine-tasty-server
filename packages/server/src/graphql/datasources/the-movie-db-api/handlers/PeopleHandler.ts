import { GetPersonImagesResult, MediaItem, Genres } from '../../../../types';
import {
  getPersonProfileImages,
  attachKnownForToPeople,
  attachGenresToMedia,
} from '../helpers';
import {
  PeopleQueryResult,
  Iso6391Language,
  PersonProfile,
  BasePerson,
  QueryPeopleArgs,
  QueryPersonArgs,
} from '../../../../lib/types';

const COMBINED_CREDITS_ENDPOINT = '/combined_credits';
const APPEND_TO_RESPONSE_IMAGES_KEY = 'images';
const POPULAR_PERSON_ENDPOINT = '/popular';
const PERSON_ENDPOINT = '/person';

type GetPeopleResponse = {
  results: BasePerson[];
  total_pages: number;
  page: number;
  total_results: number;
};

type GetPersonResponse = Omit<PersonProfile, 'images_gallery'> & {
  images: GetPersonImagesResult;
  success?: boolean;
};

type GetCastResponse = {
  cast: MediaItem[];
};

type GetRequest = <T>(
  endpoint: string,
  params: {} | { append_to_response: string } | { page: number },
  language?: Iso6391Language | null,
) => Promise<T>;

export interface Props {
  getPopularPeople: (
    params: QueryPeopleArgs,
    genres: Genres,
  ) => Promise<PeopleQueryResult>;
  getPerson: (params: QueryPersonArgs, genres: Genres) => Promise<PersonProfile | null>;
  get: GetRequest;
}

class PeopleHandler implements Props {
  get: GetRequest;

  constructor(execGetRequest: GetRequest) {
    this.get = execGetRequest;
  }

  attachKnownForToPeopleResult(people: BasePerson[], mediaGenres: Genres): BasePerson[] {
    return people.map(person => attachKnownForToPeople(person, mediaGenres));
  }

  async getPopularPeople(
    { language, page }: QueryPeopleArgs,
    mediaGenres: Genres,
  ): Promise<PeopleQueryResult> {
    const endpoint = `${PERSON_ENDPOINT}${POPULAR_PERSON_ENDPOINT}`;

    const { total_pages: totalPages, total_results, results } = await this.get<
      Promise<GetPeopleResponse>
    >(endpoint, { page }, language);

    const items = this.attachKnownForToPeopleResult(results, mediaGenres);

    return {
      hasMore: page < totalPages,
      total_pages: totalPages,
      total_results,
      items: items,
    };
  }

  async getPerson(
    { language, id }: QueryPersonArgs,
    genres: Genres,
  ): Promise<PersonProfile | null> {
    const [result, { cast }] = await Promise.all<GetPersonResponse, GetCastResponse>([
      this.get(
        `${PERSON_ENDPOINT}/${id}`,
        { append_to_response: APPEND_TO_RESPONSE_IMAGES_KEY },
        language,
      ),
      this.get(`${PERSON_ENDPOINT}/${id}${COMBINED_CREDITS_ENDPOINT}`, {}, language),
    ]);

    if (result.success === false) {
      return null;
    }

    return {
      ...result,
      images_gallery: getPersonProfileImages(result.images),
      cast: attachGenresToMedia(cast, genres),
    };
  }
}

export default PeopleHandler;
