import { Language } from '../../../../../lib/types';
import env from '../../../../../config/environment';
import { getDateParam } from '..';

const QUERY = 'cinema';
const PAGE_SIZE = 12;

type RequestParams = {
  pageSize: number;
  page: number;
  from: string;
  to: string;
  q: string;
};

const getRequestParams = (
  page: number,
  language?: Language | null,
): RequestParams & { language?: string | null } => {
  const dateParam = getDateParam();

  const params = {
    apiKey: env.NEWS_API_KEY,
    pageSize: PAGE_SIZE,
    from: dateParam,
    to: dateParam,
    q: QUERY,
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
