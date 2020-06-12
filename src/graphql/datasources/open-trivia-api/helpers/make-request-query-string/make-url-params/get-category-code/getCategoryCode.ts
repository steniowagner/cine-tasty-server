import { QuestionCategory } from '@lib/types';

import CONSTANTS from '../../../../utils/constants';

const getCategoryCode = (category: QuestionCategory): number => {
  if (category.toLowerCase() === QuestionCategory.Movie.toLowerCase()) {
    return CONSTANTS.MOVIE_CATEGORY_CODE;
  }

  return CONSTANTS.TV_CATEGORY_CODE;
};

export default getCategoryCode;
