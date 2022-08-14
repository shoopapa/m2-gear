import {StyleSheet, Dimensions} from 'react-native';
import {DefaultTheme} from 'react-native-paper';

export const globalStyles = StyleSheet.create({
  scrollcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop:0,
    backgroundColor: '#fff',
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
    primaryByOpacity: (v: number) =>{
      return `rgba(25, 72, 159, 1)`
    },
    disabledPrimary: '#19489fa6',
    accent: '#6595ed',
    gray: '#f1f3f3',
    darkgray: '#242424',
    success: '#66bb6a',
  },
};

export type ThemeType = typeof theme
