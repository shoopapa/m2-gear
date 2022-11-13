import React from 'react';
import { useEffect, useState } from 'react';
import { Appearance, StyleSheet } from 'react-native';
import { getTheme, ThemeType } from './theme';

export const getStyles = (theme: ThemeType) =>{
  return StyleSheet.create({
    TabHeaderContent: {
      color: 'white',
      backgroundColor: theme.colors.defaultBackgroundColor,
    },
    navigatorContent: {
      backgroundColor: theme.colors.defaultBackgroundColor,
    },
    scrollcontainer: {
      flex: 1,
      backgroundColor: theme.colors.defaultBackgroundColor,
      alignItems: 'center',
    },
    container: {
      backgroundColor: theme.colors.defaultBackgroundColor,
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
    centeredView: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      width: '80%',
      margin: 20,
      backgroundColor: theme.colors.defaultBackgroundColor,
      borderRadius: 15,
      padding: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 10,
        height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      textTransform: 'uppercase',
      margin: 15,
      textAlign: 'center',
    },
  })

};

const defaultTheme = 'light'
export const useStyle = () => {
  const [styles, setstyles] = useState(getStyles(getTheme(Appearance.getColorScheme() ?? defaultTheme)))
  Appearance.addChangeListener(({colorScheme})=> {
    const x = colorScheme ?? defaultTheme
    setstyles(getStyles(getTheme(x)))
  })
  useEffect(() => {
  }, [Appearance.getColorScheme()])
  return styles
}

export const StyleContext = React.createContext<ReturnType<typeof getStyles>>(getStyles(getTheme(defaultTheme)))
