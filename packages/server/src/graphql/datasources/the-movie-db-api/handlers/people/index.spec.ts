const mockRestDataSourceGet = jest.fn();

import { rawPeopleItem } from '../../../../../__tests__/mocks/people.stub';
import PeopleHandler from '.';

const POPULAR_PERSON_ENDPOINT = '/popular';
const PERSON_ENDPOINT = '/person';

const endpoint = `${PERSON_ENDPOINT}${POPULAR_PERSON_ENDPOINT}`;

const peopleHandler = new PeopleHandler(mockRestDataSourceGet);

describe('Unity: People', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPopularPeople() ', () => {
    it('return the list of trending famous people correctly', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({
        total_pages: 1,
        total_results: 1,
        results: [rawPeopleItem],
      });

      const result = await peopleHandler.getPopularPeople({ page: 1 });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        endpoint,
        { page: 1 },
        undefined,
      );
      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);
      expect(result.items).toMatchSnapshot();
      expect(result.hasMore).toEqual(false);
      expect(result.total_pages).toEqual(1);
      expect(result.total_results).toEqual(1);
    });

    it('return the hasMore field as true when has more items to be paginated', async () => {
      mockRestDataSourceGet.mockReturnValueOnce({
        total_pages: 2,
        total_results: 2,
        results: [rawPeopleItem],
      });

      const result = await peopleHandler.getPopularPeople({ page: 1 });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        endpoint,
        { page: 1 },
        undefined,
      );
      expect(mockRestDataSourceGet.mock.calls.length).toBe(1);
      expect(result.items).toMatchSnapshot();
      expect(result.hasMore).toEqual(true);
      expect(result.total_pages).toEqual(2);
      expect(result.total_results).toEqual(2);
    });
  });
});
