import env from '@config/environment';
import { Iso6391Language } from '@lib/types';
import { formatLanguage } from '..';

type RequestParams<P> = P & {
  language?: Iso6391Language | null;
  api_key?: string;
};

export const makeRequestParams = <P>(
  params: P,
  language?: Iso6391Language | null,
): RequestParams<P> => {
  let requestParams = {
    ...params,
    api_key: env.THE_MOVIE_DB_API_KEY,
  };

  if (language !== null) {
    requestParams = {
      ...requestParams,
      language: formatLanguage(language),
    };
  }

  return requestParams;
};
