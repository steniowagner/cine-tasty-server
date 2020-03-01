import { DefaultTheme } from 'styled-components';

import { ThemeID } from '../../types';
import metrics from '../metrics';

const dark: DefaultTheme = {
  id: ThemeID.DARK,
  colors: {
    primary: '#f0f',
    secondaryColor: '#111',
    backgroundColor: '#222',
    textColor: '#FFF',
    subTextColor: 'rgba(255, 255, 255, 0.5)',
    androidToolbarColor: '#222',
    inactiveWhite: '#bbb',
  },
  metrics,
};

export default dark;
