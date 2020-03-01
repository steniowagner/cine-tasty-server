import 'styled-components';

import { ThemeID } from '../types';

declare module 'styled-components' {
  export interface DefaultTheme {
    id: ThemeID;
    colors: {
      primary: string;
      secondaryColor: string;
      backgroundColor: string;
      textColor: string;
      subTextColor: string;
      androidToolbarColor: string;
      inactiveWhite: string;
    };
    metrics: {
      getHeightFromDP: (heightPercentage: string) => number;
      getWidthFromDP: (widthPercentage: string) => number;
      navigationHeaderFontSize: number;
      extraSmallSize: number;
      extraLargeSize: number;
      smallSize: number;
      mediumSize: number;
      largeSize: number;
      width: number;
      height: number;
    };
  }
}
