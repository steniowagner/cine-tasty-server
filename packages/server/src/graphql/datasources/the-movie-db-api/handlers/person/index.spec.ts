const mockRestDataSourceGet = jest.fn();

import { rawPerson, rawCast } from '../../../../../__tests__/mocks/person.stub';
import PersonHandler from '.';

const COMBINED_CREDITS_ENDPOINT = '/combined_credits';
const APPEND_TO_RESPONSE_IMAGES_KEY = 'images';
const PERSON_ENDPOINT = '/person';
const PERSON_ID = 1;

describe('Unity: Person', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPerson()', () => {
    it('should get a person profile with certain id', async () => {
      mockRestDataSourceGet.mockReturnValueOnce(rawPerson).mockReturnValueOnce(rawCast);

      const personHandler = new PersonHandler(mockRestDataSourceGet);

      const result = await personHandler.getPerson({ id: PERSON_ID });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${PERSON_ENDPOINT}/${PERSON_ID}`,
        { append_to_response: APPEND_TO_RESPONSE_IMAGES_KEY },
        undefined,
      );

      expect(mockRestDataSourceGet).toHaveBeenLastCalledWith(
        `${PERSON_ENDPOINT}/1${COMBINED_CREDITS_ENDPOINT}`,
        {},
        undefined,
      );

      expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

      expect(result).toMatchSnapshot();
    });

    it("should return null when the person with the id doesn't exist", async () => {
      mockRestDataSourceGet.mockReturnValueOnce({ success: false });

      const personHandler = new PersonHandler(mockRestDataSourceGet);

      const result = await personHandler.getPerson({ id: PERSON_ID });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${PERSON_ENDPOINT}/${PERSON_ID}`,
        { append_to_response: APPEND_TO_RESPONSE_IMAGES_KEY },
        undefined,
      );

      expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

      expect(result).toBeNull();
    });
  });
});
