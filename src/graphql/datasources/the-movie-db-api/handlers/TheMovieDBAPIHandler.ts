/* eslint-disable @typescript-eslint/no-explicit-any */

import { GetTMDBApiRequest } from '@tmdb-api-types';

abstract class TheMovieDBAPIHandler<P> {
  constructor(public get: GetTMDBApiRequest) {}

  abstract handle(params: P): Promise<any>;
}

export default TheMovieDBAPIHandler;
