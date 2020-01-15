import { movieGenres, tvGenres } from '../../../../../__tests__/mocks/mediaGenres.stub';
import { rawPerson, person, rawCast } from '../../../../../__tests__/mocks/person.stub';
import PersonHandler from '.';

const COMBINED_CREDITS_ENDPOINT = '/combined_credits';
const APPEND_TO_RESPONSE_IMAGES_KEY = 'images';
const PERSON_ENDPOINT = '/person';

describe('[Person]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get a person profile with certain id', async () => {
    const mockRestDataSourceGet = jest
      .fn()
      .mockReturnValueOnce(rawPerson)
      .mockReturnValueOnce(rawCast);

    const personHandler = new PersonHandler(mockRestDataSourceGet);

    const result = await personHandler.getPerson(
      { id: 1 },
      {
        movie: movieGenres,
        tv: tvGenres,
      },
    );

    expect(mockRestDataSourceGet).toHaveBeenCalledWith(
      `${PERSON_ENDPOINT}/1`,
      { append_to_response: APPEND_TO_RESPONSE_IMAGES_KEY },
      undefined,
    );

    expect(mockRestDataSourceGet).toHaveBeenLastCalledWith(
      `${PERSON_ENDPOINT}/1${COMBINED_CREDITS_ENDPOINT}`,
      {},
      undefined,
    );

    expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

    expect(result).toEqual(person);
  });
});
