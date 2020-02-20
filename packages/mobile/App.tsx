import React from 'react';
import styled from 'styled-components/native';

import { ThemeContextProvider } from './src/styles/theme-context-provider/ThemeContextProvider';

const Welcome = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const App = () => (
  <ThemeContextProvider>
    <Welcome />
  </ThemeContextProvider>
);

export default App;
