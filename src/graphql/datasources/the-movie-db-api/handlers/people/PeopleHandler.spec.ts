const mockRestDataSourceGet = jest.fn();

import { rawPeopleItem } from '../../../../../../__tests__/mocks/people';
import { Iso6391Language } from '../../../../../lib/types';
import CONSTANTS from '../../utils/constants';
import PeopleHandler from './PeopleHandler';

const endpoint = `${CONSTANTS.PERSON_ENDPOINT}${CONSTANTS.POPULAR_PERSON_ENDPOINT}`;

let peopleHandler: PeopleHandler = null;

describe('Unity: DataSources/TheMovieDBAPI/handlers/PeopleHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    peopleHandler = new PeopleHandler(mockRestDataSourceGet);
  });

  describe('handle() ', () => {
    it('should return the list of trending famous people correctly', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({
        total_pages: 1,
        total_results: 1,
        results: [rawPeopleItem],
      });

      const result = await peopleHandler.handle({
        language: Iso6391Language.Ptbr,
        page: 1,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        endpoint,
        { page: 1 },
        Iso6391Language.Ptbr,
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

      expect(result.items).toEqual([rawPeopleItem]);

      expect(result.hasMore).toEqual(false);

      expect(result.totalPages).toEqual(1);

      expect(result.totalResults).toEqual(1);
    });

    it('should return the "hasMore" field as "true" when has more items to be paginated', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({
        total_pages: 2,
        total_results: 2,
        results: [rawPeopleItem],
      });

      const result = await peopleHandler.handle({
        language: Iso6391Language.Ptbr,
        page: 1,
      });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        endpoint,
        { page: 1 },
        Iso6391Language.Ptbr,
      );
      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(1);

      expect(result.items).toEqual([rawPeopleItem]);

      expect(result.hasMore).toEqual(true);

      expect(result.totalPages).toEqual(2);

      expect(result.totalResults).toEqual(2);
    });
  });
});
