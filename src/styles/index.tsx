import {StyleSheet, Dimensions} from 'react-native';
import {DefaultTheme} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  chartContainer: {
    // paddingTop: 5,
    // marginLeft: -Dimensions.get('window').width*.1,
  },
});

export default styles;

export const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#19489f',
    disabledPrimary: '#19489fa6',
    accent: '#6595ed',
    gray: '#f1f3f3',
    darkgray: '#242424',
    success: '#66bb6a',
  },
};

export type ThemeType = typeof theme
