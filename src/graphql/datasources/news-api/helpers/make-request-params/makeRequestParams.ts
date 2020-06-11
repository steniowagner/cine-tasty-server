import { ArticleLanguage } from '@lib/types';
import env from '@config/environment';

import CONSTANTS from '../../utils/constants';
import { makeDateParam } from '..';

type RequestParams = {
  pageSize: number;
  page: number;
  from: string;
  to: string;
  q: string;
};

export const makeRequestParams = (
  page: number,
  language?: ArticleLanguage | undefined | null,
): RequestParams & { language?: string | undefined | null } => {
  const dateParam = makeDateParam();

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
