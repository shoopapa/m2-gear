import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

export const defaultBackgroundColor = '#FFFFFF';

export const globalStyles = StyleSheet.create({
  navigatorContent: {
    backgroundColor: defaultBackgroundColor,
  },
  scrollcontainer: {
    flex: 1,
    backgroundColor: defaultBackgroundColor,
    alignItems: 'center',
  },
  container: {
    backgroundColor: defaultBackgroundColor,
    flex: 1,
    paddingTop: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  TextInputWrapper: {
    width: '80%',
    height: 60,
    flex: 0,
  },
});

export const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#19489f',
    warningYellow: '#f69220',
    primaryByOpacity: (v: number) => {
      return `rgba(25, 72, 159, 1)`;
    },
    disabledPrimary: '#19489fa6',
    accent: '#6595ed',
    gray: '#f1f3f3',
    darkgray: '#242424',
    success: '#66bb6a',
  },
};

export type ThemeType = typeof theme;
