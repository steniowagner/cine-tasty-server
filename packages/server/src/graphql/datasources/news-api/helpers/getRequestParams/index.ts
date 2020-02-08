import { ArticleLanguage } from '../../../../../lib/types';
import env from '../../../../../config/environment';
import CONSTANTS from '../../utils/constants';
import { getDateParam } from '..';

type RequestParams = {
  pageSize: number;
  page: number;
  from: string;
  to: string;
  q: string;
};

const getRequestParams = (
  page: number,
  language?: ArticleLanguage | null,
): RequestParams & { language?: string | null } => {
  const dateParam = getDateParam();

  const params = {
    apiKey: env.NEWS_API_KEY,
    pageSize: CONSTANTS.PAGE_SIZE,
    from: dateParam,
    to: dateParam,
    q: CONSTANTS.QUERY,
    page,
  };

  if (language && typeof language === 'string') {
    return {
      ...params,
      language: language.toLowerCase(),
    };
  }

  return params;
};

export default getRequestParams;
