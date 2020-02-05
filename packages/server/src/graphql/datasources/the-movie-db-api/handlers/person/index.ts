import { Person, QueryPersonArgs } from '../../../../../lib/types';
import {
  GetPersonImagesResult,
  MediaItem,
  GetTMDBApiRequest,
} from '../../../../../types';
import { getPersonProfileImages } from '../../helpers';

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

export interface Props {
  getPerson: (params: QueryPersonArgs) => Promise<Person | null>;
}

class PersonHandler implements Props {
  get: GetTMDBApiRequest;

  constructor(execGetRequest: GetTMDBApiRequest) {
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
