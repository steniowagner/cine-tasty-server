import { OpenTriviaQueryParams } from '@types';

export const makeQueryString = (queryParams: OpenTriviaQueryParams): string => {
  return Object.entries(queryParams)
    .reduce((accumulator: string[], current) => {
      const [key, value] = current;

      return [...accumulator, `${key}=${String(value).toLowerCase()}`];
    }, [])
    .join('&');
};
