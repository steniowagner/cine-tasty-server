import { OpenTriviaQueryParams } from '@open-trivia-api-types';

const makeQueryString = (queryParams: OpenTriviaQueryParams): string => {
  return Object.entries(queryParams)
    .reduce((accumulator: string[], current) => {
      const [key, value] = current;

      return [...accumulator, `${key}=${String(value).toLowerCase()}`];
    }, [])
    .join('&');
};

export default makeQueryString;
