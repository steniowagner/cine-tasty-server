import { DefaultTheme } from 'styled-components';

import { ThemeID } from '../../types';
import metrics from '../metrics';

const light: DefaultTheme = {
  id: ThemeID.LIGHT,
  colors: {
    primary: '#f00',
    secondaryColor: '#FFF',
    backgroundColor: '#F2F2F2',
    textColor: 'rgba(0, 0, 0, 0.8)',
    subTextColor: 'rgba(0, 0, 0, 0.4)',
    androidToolbarColor: '#F2F2F2',
    inactiveWhite: '#bbb',
  },
  metrics,
};

export default light;
