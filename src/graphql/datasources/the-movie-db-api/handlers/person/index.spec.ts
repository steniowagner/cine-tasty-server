const mockRestDataSourceGet = jest.fn();

import { rawPerson, rawCast } from '../../../../../__tests__/mocks/person.stub';
import CONSTANTS from '../../utils/constants';
import PersonHandler from '.';

const personHandler = new PersonHandler(mockRestDataSourceGet);

describe('Unity: Person', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPerson()', () => {
    it('should get a person profile with certain id', async () => {
      mockRestDataSourceGet.mockReturnValueOnce(rawPerson).mockReturnValueOnce(rawCast);

      const result = await personHandler.getPerson({ id: 1 });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${CONSTANTS.PERSON_ENDPOINT}/1`,
        { append_to_response: CONSTANTS.APPEND_TO_RESPONSE_IMAGES_KEY },
        undefined,
      );

      expect(mockRestDataSourceGet).toHaveBeenLastCalledWith(
        `${CONSTANTS.PERSON_ENDPOINT}/1${CONSTANTS.COMBINED_CREDITS_ENDPOINT}`,
        {},
        undefined,
      );

      expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

      expect(result).toMatchSnapshot();
    });

    it("should return null when the person with the id doesn't exist", async () => {
      mockRestDataSourceGet.mockReturnValueOnce({ success: false });

      const result = await personHandler.getPerson({ id: 1 });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${CONSTANTS.PERSON_ENDPOINT}/1`,
        { append_to_response: CONSTANTS.APPEND_TO_RESPONSE_IMAGES_KEY },
        undefined,
      );

      expect(mockRestDataSourceGet.mock.calls.length).toBe(2);

      expect(result).toBeNull();
    });
  });
});
