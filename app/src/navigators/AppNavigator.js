// @flow

import React from 'react';
import { Text } from 'react-native';
import {
  createMaterialTopTabNavigator,
  createAppContainer,
} from 'react-navigation';
import { SIZES, COLORS } from '@/constants';

import BottomTabBar from '@/components/BottomTabBar';
import { Home } from '@/containers/screens';

const ICON_PROPS = {
  size: SIZES.TAB_BAR_ICON_SIZE,
  color: COLORS.PURPLE,
};

const routes = {
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: () => <Text>Home</Text>,
    },
  },
  Profile: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: () => <Text>Profile</Text>,
    },
  },
};

const AppNavigator = createMaterialTopTabNavigator(
  routes,
  {
    useNativeDriver: true,
    initialRouteName: 'Home',
    tabBarComponent: BottomTabBar,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      pressOpacity: 0,
      pressColor: 'rgba(0, 0, 0, 0)',
    },
  },
);

export default createAppContainer(AppNavigator);
