import 'styled-components';

import { ThemeID } from '../types';

declare module 'styled-components' {
  export interface DefaultTheme {
    id: ThemeID;
    colors: {
      primary: string;
    };
  }
}
