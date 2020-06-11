const mockRestDataSourceGet = jest.fn();

import { rawPerson, rawCast } from '../../../../../../__tests__/mocks/person';
import CONSTANTS from '../../utils/constants';
import PersonHandler from './PersonHandler';

let personHandler: PersonHandler = null;
const id = 1;

describe('Unity: DataSources/TheMovieDBAPI/handlers/PersonHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    personHandler = new PersonHandler(mockRestDataSourceGet);
  });

  describe('handle()', () => {
    it('should get the profile of a person with a certain id', async () => {
      mockRestDataSourceGet.mockReturnValueOnce(rawPerson).mockReturnValueOnce(rawCast);

      const result = await personHandler.handle({ id });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${CONSTANTS.PERSON_ENDPOINT}/1`,
        { append_to_response: CONSTANTS.APPEND_TO_RESPONSE_IMAGES_KEY },
        undefined,
      );

      expect(mockRestDataSourceGet).toHaveBeenLastCalledWith(
        `${CONSTANTS.PERSON_ENDPOINT}/${id}${CONSTANTS.COMBINED_CREDITS_ENDPOINT}`,
        {},
        undefined,
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(2);

      expect(result).toEqual({
        ...rawPerson,
        images: rawPerson.images.profiles.map(profile => profile.file_path),
        cast: rawCast.cast,
      });
    });

    it("should return null when the field 'success' is 'false'", async () => {
      mockRestDataSourceGet.mockReturnValueOnce({ success: false });

      const result = await personHandler.handle({ id });

      expect(mockRestDataSourceGet).toHaveBeenCalledWith(
        `${CONSTANTS.PERSON_ENDPOINT}/${id}`,
        { append_to_response: CONSTANTS.APPEND_TO_RESPONSE_IMAGES_KEY },
        undefined,
      );

      expect(mockRestDataSourceGet).toHaveBeenCalledTimes(2);

      expect(result).toBeNull();
    });
  });
});
