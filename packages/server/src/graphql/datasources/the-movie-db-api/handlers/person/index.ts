import { GetPersonImagesResult, MediaItem } from '../../../../../types';
import { getPersonProfileImages } from '../../helpers';
import { Iso6391Language, Person, QueryPersonArgs } from '../../../../../lib/types';

const COMBINED_CREDITS_ENDPOINT = '/combined_credits';
const APPEND_TO_RESPONSE_IMAGES_KEY = 'images';
const PERSON_ENDPOINT = '/person';

type GetPersonResponse = Omit<Person, 'images'> & {
  images: GetPersonImagesResult;
  success?: boolean;
};

type GetCastResponse = {
  cast: MediaItem[];
};

type GetRequest = <T>(
  endpoint: string,
  params: { append_to_response: string } | {},
  language?: Iso6391Language | null,
) => Promise<T>;

export interface Props {
  getPerson: (params: QueryPersonArgs) => Promise<Person | null>;
  get: GetRequest;
}

class PersonHandler implements Props {
  get: GetRequest;

  constructor(execGetRequest: GetRequest) {
    this.get = execGetRequest;
  }

  async getPerson({ language, id }: QueryPersonArgs): Promise<Person | null> {
    const [result, castData] = await Promise.all<GetPersonResponse, GetCastResponse>([
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
      images: getPersonProfileImages(result.images),
      cast: castData.cast,
    };
  }
}

export default PersonHandler;
