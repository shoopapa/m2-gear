import { useEffect, useState } from 'react';
import { Appearance, StyleSheet } from 'react-native';
import { DefaultTheme, DarkTheme } from 'react-native-paper';

export const defaultBackgroundColor = '#FFFFFF';


export type ThemeType = typeof DefaultTheme & {
  roundness: number,
  colors: {
    text: string,
    defaultBackgroundColor: string
    primary: string
    warningYellow: string
    primaryByOpacity: () => string
    disabledPrimary: string,
    accent: string,
    gray: string,
    success: string,
  },
}

export const darkTheme: ThemeType = {
  ...DarkTheme,
  roundness: 5,
  colors: {
    ...DarkTheme.colors,
    defaultBackgroundColor: 'black',
    primary: '#19489f',
    warningYellow: '#f69220',
    primaryByOpacity: () => {
      return 'rgba(25, 72, 159, 1)';
    },
    disabledPrimary: '#19489fa6',
    accent: '#6595ed',
    gray: '#282c34',
    error: '#9c2121',
    success: '#66bb6a',
  },
};

export const lightTheme: ThemeType = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    defaultBackgroundColor: 'white',
    primary: '#19489f',
    warningYellow: '#f69220',
    primaryByOpacity: () => {
      return 'rgba(25, 72, 159, 1)';
    },
    disabledPrimary: '#19489fa6',
    accent: '#6595ed',
    gray: '#f1f3f3',

    success: '#66bb6a',
  },
};


export const getTheme = (mode: 'light' | 'dark' | undefined | null) => {
  if( mode === 'dark') {
    return darkTheme
  }
  return lightTheme
}



const defaultTheme = 'dark'
export const useTheme = () => {
  const [theme, settheme] = useState(getTheme(Appearance.getColorScheme() ?? defaultTheme))
  Appearance.addChangeListener(({colorScheme})=> {
    const x = colorScheme ?? defaultTheme
    settheme(getTheme(x))
  })
  return theme
}



