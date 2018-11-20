// @flow

import React from 'react';
import { Touchable, Footer } from '@/components/fragments';
import { createStyleSheet } from '@/utils';
import { STYLES } from '@/constants';

import { type StylesheetType } from '@/types/rnTypes';
import {
  type _TabBarBottomProps,
  type NavigationRoute,
} from 'react-navigation';

const ICON_OPACITY = .5;
const ICON_SCALE = 1;
const SELECTED_ICON_OPACITY = 1;
const SELECTED_ICON_SCALE = 1.3;

type Props = _TabBarBottomProps;

class BottomTabBar extends React.Component<Props> {
  // The bottom tab bar should never update, only his childs
  // can update.
  shouldComponentUpdate = () => false;

  renderTabBarButton = (route: NavigationRoute, index: number) => {
    const {
      navigation,
      renderIcon,
      position,
    } = this.props;
    const currentIndex = navigation.state.index;
    const routes = navigation.state.routes;
    const focused = (currentIndex === index);
    const inputRange = [-1, ...routes.map((_, i) => i)];
    const outputScaleRange = [...inputRange.map(i =>
      i === index ? SELECTED_ICON_SCALE : ICON_SCALE
    )];
    const outputOpacityRange = [...inputRange.map(i =>
      i === index ? SELECTED_ICON_OPACITY : ICON_OPACITY
    )];

    const scale = position.interpolate({
      inputRange,
      outputRange: outputScaleRange,
    });
    const opacity = position.interpolate({
      inputRange,
      outputRange: outputOpacityRange,
    });

    const style: Array<StylesheetType> = [
      styles.icon,
      {
        opacity,
        width: `${100 / routes.length}%`,
      },
    ];

    return (
      <Touchable
        style={style}
        scale={{ x: scale, y: scale }}
        onPress={() => navigation.navigate(route.routeName)}
        key={route.routeName}
      >
        {renderIcon({ route, focused, index })}
      </Touchable>
    );
  }

  render() {
    const { navigation, style } = this.props;
    const tabBarButtons = navigation.state.routes.map(this.renderTabBarButton);

    return (
      <Footer style={style}>
        {tabBarButtons}
      </Footer>
    );
  }
}

const styles = createStyleSheet({
  icon: {
    ...STYLES.CENTER_CHILDS,
    height: '100%',
    position: 'relative',
  },
});

export default BottomTabBar;
