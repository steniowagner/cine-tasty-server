import { Person, QueryPersonArgs } from '../../../../../lib/types';
import {
  GetPersonImagesResult,
  MediaItem,
  GetTMDBApiRequest,
} from '../../../../../types';
import { getPersonProfileImages } from '../../helpers';
import CONSTANTS from '../../utils/constants';

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
        `${CONSTANTS.PERSON_ENDPOINT}/${id}`,
        { append_to_response: CONSTANTS.APPEND_TO_RESPONSE_IMAGES_KEY },
        language,
      ),
      this.get(
        `${CONSTANTS.PERSON_ENDPOINT}/${id}${CONSTANTS.COMBINED_CREDITS_ENDPOINT}`,
        {},
        language,
      ),
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
