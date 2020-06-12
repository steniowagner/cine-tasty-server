import { QuizInput } from '@lib/types';

import makeQueryString from './make-query-string/makeQueryString';
import makeURLParams from './make-url-params/makeURLParams';

export const makeRequestQueryString = (input: QuizInput): string => {
  const urlParams = makeURLParams(input);

  const queryString = makeQueryString(urlParams);

  return queryString;
};
