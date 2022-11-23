import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthParamsList } from '../index';
import { TabParamList } from '../root-screen';
import { ThemeType } from '../styles/theme';

export type SubNavigatorProps<
  T extends ParamListBase,
  K extends string,
  P extends keyof TabParamList,
> = CompositeScreenProps<
  StackScreenProps<T, K>,
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, P>,
    StackScreenProps<AuthParamsList, 'MainScreen'>
  >
> & {
  theme: ThemeType;
};
