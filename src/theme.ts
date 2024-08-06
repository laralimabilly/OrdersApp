// theme.ts
import { Theme } from '@react-native-material/core';

const theme: Theme = {
  palette: {
    primary: {
      main: '#e01ca3',
      on: 'change'
    },
    secondary: {
      main: '#fff',
      on: 'change'
    },
  },
  typography: {
    h1: { fontSize: 24, fontWeight: '700' },
    h2: { fontSize: 20, fontWeight: '700' },
    h3: { fontSize: 18, fontWeight: '700' },
    h4: { fontSize: 16, fontWeight: '700' },
    h5: { fontSize: 14, fontWeight: '700' },
    h6: { fontSize: 12, fontWeight: '700' },
    subtitle1: { fontSize: 16, fontWeight: '500' },
    subtitle2: { fontSize: 14, fontWeight: '500' },
    body1: { fontSize: 14, fontWeight: '400' },
    body2: { fontSize: 12, fontWeight: '400' },
    button: { fontSize: 14, fontWeight: '500' },
    caption: { fontSize: 12, fontWeight: '400' },
    overline: { fontSize: 10, fontWeight: '400' },
  },
  colorScheme: 'dark',
};

export default theme;
