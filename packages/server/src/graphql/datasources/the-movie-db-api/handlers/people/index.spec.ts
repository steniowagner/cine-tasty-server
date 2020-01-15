import { movieGenres, tvGenres } from '../../../../../__tests__/mocks/mediaGenres.stub';
import { rawPeopleItem, peopleItem } from '../../../../../__tests__/mocks/people.stub';
import PeopleHandler from '.';

const POPULAR_PERSON_ENDPOINT = '/popular';
const PERSON_ENDPOINT = '/person';

const endpoint = `${PERSON_ENDPOINT}${POPULAR_PERSON_ENDPOINT}`;

describe('[People]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('return the list of trending famous people correctly', async () => {
    const mockRestDataSourceGet = jest.fn().mockReturnValueOnce({
      total_pages: 1,
      total_results: 1,
      results: [rawPeopleItem],
    });

    const peopleHandler = new PeopleHandler(mockRestDataSourceGet);

    const result = await peopleHandler.getPopularPeople(
      { page: 1 },
      {
        movie: movieGenres,
        tv: tvGenres,
      },
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(endpoint, { page: 1 }, undefined);
    expect(mockRestDataSourceGet.mock.calls.length).toBe(1);
    expect(result.items).toEqual([peopleItem]);
    expect(result.hasMore).toEqual(false);
    expect(result.total_pages).toEqual(1);
    expect(result.total_results).toEqual(1);
  });
});
