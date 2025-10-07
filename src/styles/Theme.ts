import {DefaultTheme, Theme} from '@react-navigation/native';
import {Platform} from 'react-native';
import {MODE_THEME} from '~/constants';
import {scale, verticalScale, horizontalScale} from '~/utils/scaleScreen';

/**
How to add colors?
1. Declare type or interface
2. Set color at light theme and dark theme
3. Use it
*/

type Sizes = {
  h1?: number;
  h2?: number;
  h3?: number;
  h4?: number;
  h5?: number;
  h6?: number;
  h7?: number;
  icon_12?: number;
  icon_18?: number;
  icon_20?: number;
  icon_24?: number;
  icon_26?: number;
  icon_28?: number;
  icon_30?: number;
  pic_80: number;
  pic_100: number;
  vertical_8?: number;
  vertical_10?: number;
  vertical_13?: number;
  horizontal_8?: number;
  horizontal_10?: number;
  horizontal_13?: number;
  input_padding?: number;
  mg5?: number;
  mg10?: number;
  mg15?: number;
  mg20?: number;
  mg25?: number;
  pd2?: number;
  pd5?: number;
  pd10?: number;
  pd15?: number;
  pd20?: number;
  pd25?: number;
  pd30?: number;
  pd50?: number;
  landscape_horzital?: number;
};

type Colors = {
  primary: string;
  background: string;
  card: string;
  text: {
    primary: string;
    secondary: string;
    titleTable: string;
    placeHolder: string;
  };
  border: string;
  line: string;
  notification: string;
  text_button?: string;
  disable?: string;
  online?: string;
  offline?: string;
  warning?: string;
  error?: string;
  blue_1?: string;
  background_2?: string;
  white?: string;
  black?: string;
  slide: {
    button: string;
    background: string;
  };
  bottomNavigator: {
    ic_active: string;
    ic_disable: string;
    border: string;
  };
  button: {
    background: string;
  };
  icon: {
    background: string;
    background_dark: string;
  };
  hashtag: string;
  itemCard: {
    unlock: string;
    lock: string;
  };
  table: {
    background: string;
  };
  bookmark: string;
  input: {
    background: string;
  };
  app: {
    background: string;
  };
  message: {
    background: string;
  };
  shadow: string;
  transparent: {
    black_0: string;
    black_40: string;
  };
  statusFile: {
    signed: string;
    unsign: string;
  };
  sidebar: {
    blue: string;
    darkBlue: string;
  };
  title_login: string;
  statusBar_login: string;
  statistical: {
    statistical_1: string;
    statistical_2: string;
    statistical_3: string;
    statistical_4: string;
    statistical_5: string;
  };
  fab: {
    darkGray: string;
    purple: string;
    teal: string;
    darkBlue: string;
    coralRed: string;
    darkRed: string;
    orange: string;
    oliveGreen: string;
    forestGreen: string;
    brown: string;
  };
};

type Fonts = {
  regular: string;
  medium: string;
  semibold: string;
  bold: string;
  extraBold: string;
};

type Radius = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

export interface AppTheme extends Theme {
  colors: Colors;
  sizes: Sizes;
  fonts: Fonts;
  radius: Radius;
}

//
export const Sizes = {
  h1: scale(32),
  h2: scale(24),
  h3: scale(18),
  h4: scale(16),
  h5: scale(14),
  h6: scale(12),
  h7: scale(9),
  icon_12: scale(12),
  icon_18: scale(18),
  icon_20: scale(20),
  icon_24: scale(24),
  icon_26: scale(26),
  icon_28: scale(28),
  icon_30: scale(30),
  pic_80: scale(80),
  pic_100: scale(100),
  vertical_8: verticalScale(8),
  vertical_10: verticalScale(10),
  vertical_13: verticalScale(13),
  horizontal_8: horizontalScale(8),
  horizontal_10: horizontalScale(10),
  horizontal_13: horizontalScale(13),
  input_padding: Platform.OS === 'android' ? scale(5) : scale(10),
  mg5: scale(5),
  mg10: scale(10),
  mg15: scale(15),
  mg20: scale(20),
  mg25: scale(25),
  pd2: scale(2),
  pd5: scale(5),
  pd10: scale(10),
  pd15: scale(15),
  pd20: scale(20),
  pd25: scale(25),
  pd30: scale(30),
  pd50: scale(50),
  landscape_horzital: horizontalScale(60),
};

export const fonts = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,
};

export const radius = {
  xs: scale(10),
  sm: scale(12),
  md: scale(14),
  lg: scale(16),
  xl: scale(18),
  xxl: scale(22),
};

export const DarkTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    primary: '#226E90',
    background: '#ECF0EF',
    card: '#f5f5f5',
    border: '#D3D3D3',
    line: '#E0E0E0',
    text: {
      primary: '#3C3737',
      secondary: '#666666',
      titleTable: '#EAEAEA',
      placeHolder: '#9E9E9E',
    },
    white: '#ffffff',
    black: '#000000',
    slide: {
      background: '#226E90',
      button: '#226E90',
    },
    bottomNavigator: {
      ic_active: '#226E90',
      ic_disable: '#666666',
      border: '#cccccc',
    },
    message: {
      background: '#E9F0F4',
    },
    button: {
      background: '#F0FBFF',
    },
    icon: {
      background: '#F3EFEF',
      background_dark: '#D3E2E9',
    },
    bookmark: '#F55456',
    hashtag: '#D6F3FF',
    itemCard: {
      unlock: '#226E90',
      lock: '#B2191D',
    },
    table: {
      background: '#F0FBFF',
    },
    input: {
      background: '#F9F9F9',
    },
    app: {
      background: '#F2F2F7',
    },
    shadow: '#D0DAD8',
    transparent: {
      black_0: 'transparent',
      black_40: 'rgba(0, 0, 0, 0.4)',
    },
    statusFile: {
      signed: '#226E90',
      unsign: '#B2191D',
    },
    sidebar: {
      blue: '#297091',
      darkBlue: '#12415A',
    },
    title_login: '#FFFFFF',
    statusBar_login: '#226E90',
    statistical: {
      statistical_1: '#8272EC',
      statistical_2: '#87D6EE',
      statistical_3: '#C0EAF6',
      statistical_4: '#C9A0F3',
      statistical_5: '#E4D0F9',
    },
    fab: {
      darkGray: '#616161',
      purple: '#6A1B9A',
      teal: '#00838F',
      darkBlue: '#1565C0',
      coralRed: '#E35D5B',
      darkRed: '#B71C1C',
      orange: '#EF6C00',
      oliveGreen: '#7DA838',
      forestGreen: '#0B8C04',
      brown: '#724E00',
      yellow: '#FFC107',
    },
  },
  sizes: Sizes,
  fonts: fonts,
  radius: radius,
};

export const LightTheme = {
  ...DarkTheme,
  dark: false,
};

export const ThemeApp = {
  [MODE_THEME.LIGHT]: LightTheme,
  [MODE_THEME.DARK]: DarkTheme,
};
