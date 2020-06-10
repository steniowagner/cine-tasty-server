/* eslint-disable @typescript-eslint/no-explicit-any */

import { GetTMDBApiRequest } from '@types';

abstract class TheMovieDBHandler<P> {
  constructor(public get: GetTMDBApiRequest) {}

  abstract handle(params: P): Promise<any>;
}

export default TheMovieDBHandler;
