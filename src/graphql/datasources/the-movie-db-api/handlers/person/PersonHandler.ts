import { GetPersonImagesResult, GetTMDBApiRequest } from '@tmdb-api-types';
import { PersonResponse, QueryPersonArgs, Cast } from '@lib/types';

import { getPersonProfileImages } from '../../helpers';
import TheMovieDBHandler from '../TheMovieDBHandler';
import CONSTANTS from '../../utils/constants';

type GetPersonResponse = Omit<PersonResponse, 'images'> & {
  images: GetPersonImagesResult;
  success?: boolean;
};

type GetCastResponse = {
  cast: Cast[];
};

class PersonHandler extends TheMovieDBHandler<QueryPersonArgs> {
  constructor(getRequest: GetTMDBApiRequest) {
    super(getRequest);
  }

  async handle({ language, id }: QueryPersonArgs): Promise<PersonResponse | null> {
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
