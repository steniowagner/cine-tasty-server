import { useEffect, useState } from 'react';
import { DefaultTheme } from 'styled-components';

import {
  getItemFromStorage,
  persistItemInStorage,
} from '../../utils/async-storage-adapter/AsyncStorageAdapter';
import { dark as darkTheme, light as lightTheme } from '../themes';
import CONSTANTS from '../../utils/constants';
import { ThemeID } from '../../types';

interface ThemeContextProviderState {
  onToggleTheme: () => void;
  appTheme: DefaultTheme;
}

const useThemeContextProvider = (): ThemeContextProviderState => {
  const [theme, setTheme] = useState<ThemeID>(null);

  const handleThemeSelection = async (): Promise<void> => {
    const themeSaved = await getItemFromStorage<ThemeID, null>(
      CONSTANTS.KEYS.APP_THEME,
      null,
    );

    if (!themeSaved) {
      setTheme(ThemeID.DARK);

      return;
    }

    setTheme(themeSaved);
  };

  useEffect(() => {
    handleThemeSelection();
  }, []);

  const onToggleTheme = () => {
    console.log('theme: ', theme);
    const themeSelected = theme === ThemeID.DARK ? ThemeID.LIGHT : ThemeID.DARK;
    console.log('themeSelected: ', themeSelected);
    setTheme(themeSelected);

    persistItemInStorage(CONSTANTS.KEYS.APP_THEME, themeSelected);
  };

  const getAppTheme = (): DefaultTheme => {
    const themeSelected = theme === ThemeID.DARK ? darkTheme : lightTheme;

    return {
      id: themeSelected.id,
      colors: {
        // ...appStyles.colors,
        ...themeSelected.colors,
      },
    };
  };

  return {
    appTheme: getAppTheme(),
    onToggleTheme,
  };
};

export default useThemeContextProvider;
