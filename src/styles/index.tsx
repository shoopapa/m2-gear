import {StyleSheet} from 'react-native';
import {DefaultTheme} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    success: '#66bb6a',
  },
};
