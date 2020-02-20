import { renderHook, cleanup, act } from '@testing-library/react-hooks';

import useThemeContextProvider from './useThemeContextProvider';
import CONSTANTS from '../../utils/constants';
import { ThemeID } from '../../types';

jest.mock('../../utils/async-storage-adapter/AsyncStorageAdapter');

jest.useFakeTimers();

const {
  getItemFromStorage,
  persistItemInStorage,
} = require('../../utils/async-storage-adapter/AsyncStorageAdapter');

describe('Testing useThemeContextProvider hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);
  /*
  describe('Testing the first time that the app is launched', () => {
    it('should have the Dark-theme set by default', () => {
      const { result } = renderHook(useThemeContextProvider);

      act(() => {
        jest.runAllTimers();
      });

      expect(result.current.appTheme.id).toEqual(ThemeID.DARK);
    });
  });

  describe("Testing the iterations when there's a theme set already", () => {
    it('should return Dark-theme when the last theme set was Dark-Theme', () => {
      getItemFromStorage.mockImplementationOnce(() => ThemeID.DARK);

      const { result } = renderHook(useThemeContextProvider);

      act(() => {
        jest.runAllTimers();
      });

      expect(result.current.appTheme.id).toEqual(ThemeID.DARK);

      expect(getItemFromStorage).toHaveBeenCalledTimes(1);

      expect(getItemFromStorage).toHaveBeenCalledWith(CONSTANTS.KEYS.APP_THEME, null);
    });

    it('should return Light-theme when the last theme set was Light-Theme', () => {
      getItemFromStorage.mockImplementationOnce(() => ThemeID.LIGHT);

      const { result } = renderHook(useThemeContextProvider);

      act(() => {
        jest.runAllTimers();
      });

      expect(result.current.appTheme.id).toEqual(ThemeID.LIGHT);

      expect(getItemFromStorage).toHaveBeenCalledTimes(1);

      expect(getItemFromStorage).toHaveBeenCalledWith(CONSTANTS.KEYS.APP_THEME, null);
    });
  });
*/

  describe('Testing the onToggleTheme()', () => {
    /* it("should get the Dark-theme when there's no theme set", async () => {
      persistItemInStorage.mockImplementationOnce(() => {});

      const { result } = renderHook(() => useThemeContextProvider());

      act(() => {
        jest.runAllTimers();

        result.current.onToggleTheme();
      });

      expect(result.current.appTheme.id).toBe(ThemeID.DARK);

      expect(persistItemInStorage).toHaveBeenCalledTimes(1);

      expect(persistItemInStorage).toHaveBeenCalledWith(CONSTANTS.KEYS.APP_THEME, ThemeID.DARK);
    }); */

    it('should toggle the theme to Light-theme when the current theme is Dark-theme', async () => {
      getItemFromStorage.mockImplementationOnce(() => ThemeID.DARK);

      persistItemInStorage.mockImplementationOnce(() => {});

      const { result } = renderHook(() => useThemeContextProvider());

      act(() => {
        jest.runAllTimers();

        result.current.onToggleTheme();
        console.log('97: ', result.current.appTheme.id);
      });
      console.log('99: ', result.current.appTheme.id);

      expect(result.current.appTheme.id).toBe(ThemeID.LIGHT);

      expect(getItemFromStorage).toHaveBeenCalledTimes(1);

      expect(getItemFromStorage).toHaveBeenCalledWith(CONSTANTS.KEYS.APP_THEME, null);

      expect(persistItemInStorage).toHaveBeenCalledTimes(1);

      expect(persistItemInStorage).toHaveBeenCalledWith(
        CONSTANTS.KEYS.APP_THEME,
        ThemeID.LIGHT,
      );
    });

    /* it('should toggle the theme to Dark-theme when the current theme is Light-theme', async () => {
      getItemFromStorage.mockImplementationOnce(() => ThemeID.LIGHT);

      persistItemInStorage.mockImplementationOnce(() => {});

      const { result } = renderHook(() => useThemeContextProvider());

      act(() => {
        jest.runAllTimers();

        result.current.onToggleTheme();
      });

      expect(result.current.appTheme.id).toBe(ThemeID.DARK);

      expect(getItemFromStorage).toHaveBeenCalledTimes(1);

      expect(getItemFromStorage).toHaveBeenCalledWith(CONSTANTS.KEYS.APP_THEME, null);

      expect(persistItemInStorage).toHaveBeenCalledTimes(1);

      expect(persistItemInStorage).toHaveBeenCalledWith(CONSTANTS.KEYS.APP_THEME, ThemeID.DARK);
    }); */
  });
});
