import React, { createContext } from 'react';
import { ThemeProvider } from 'styled-components';

import useThemeContextProvider from './useThemeContextProvider';

type ThemeContextProps = {
  onToggleTheme: () => void;
};

type Props = {
  children: JSX.Element;
};

const ThemeContext = createContext<ThemeContextProps>({ onToggleTheme: () => {} });

const ThemeContextProvider = ({ children }: Props) => {
  const { onToggleTheme, appTheme } = useThemeContextProvider();

  return (
    <ThemeContext.Provider
      value={{
        onToggleTheme,
      }}>
      <ThemeProvider theme={appTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContextProvider };

export default ThemeContext;
