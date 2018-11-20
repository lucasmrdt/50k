// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  TouchableWithoutFeedback,
  View,
  Easing,
} from 'react-native';
import { ANIMATIONS } from '@/constants';

import { type StylesheetType } from '@/types/rnTypes';

const EASING = Easing.out(Easing.back(1.5));
const SCALE_ONPRESS = 1.08;
const PRESS_RETENTION = 50;
const PRESS_RETENTION_OFFSET = {
  top: PRESS_RETENTION,
  bottom: PRESS_RETENTION,
  left: PRESS_RETENTION,
  right: PRESS_RETENTION,
};

export type Props = {
  children: any,
  id: string,
  disable: bool,
  style: any,
  scale: {
    x?: Animated.Value,
    y?: Animated.Value,
  },
  onPress: (id: string) => void,
  onPressOut: () => void,
  onPressIn: () => void,
};

class Touchable extends React.Component<Props> {

  scale = new Animated.Value(1);

  static defaultProps = {
    disable: false,
    id: null,
    style: null,
    scale: { x: 1, y: 1 },
    onPressOut: null,
    onPressIn: null,
  };

  static propTypes = {
    id: PropTypes.string,
    style: PropTypes.any,
  };

  shouldComponentUpdate(nextProps: Props) {
    const { children, style } = this.props;

    return (nextProps.children !== children
    || nextProps.style !== style);
  }

  onPressIn = () => {
    const { onPressIn } = this.props;

    if (onPressIn) {
      onPressIn();
    }

    Animated.timing(this.scale, {
      toValue: SCALE_ONPRESS,
      duration: 200,
      easing: EASING,
      useNativeDriver: true,
    }).start();
  }

  onPress = () => {
    const { onPress, id } = this.props;
    onPress(id);
  }

  onPressOut = () => {
    const { onPressOut } = this.props;

    onPressOut && onPressOut();

    Animated.timing(this.scale, {
      toValue: 1,
      duration: 200,
      easing: EASING,
      useNativeDriver: true,
    }).start();
  }

  computeStyle() {
    const { style, scale } = this.props;

    const computedStyle: Array<StylesheetType> = [
      style,
      {
        transform: [
          { scaleX: Animated.multiply(scale.x, this.scale) },
          { scaleY: Animated.multiply(scale.y, this.scale) },
        ],
      },
    ];

    return computedStyle;
  }

  renderChildren() {
    const { children } = this.props;
    const style = this.computeStyle();

    return (
      <Animated.View style={style}>
        {children}
      </Animated.View>
    );
  }

  render() {
    const { disable } = this.props;

    return (
      <TouchableWithoutFeedback
        disabled={disable}
        onPressIn={this.onPressIn}
        onPress={this.onPress}
        onPressOut={this.onPressOut}
        pressRetentionOffset={PRESS_RETENTION_OFFSET}
      >
        {this.renderChildren()}
      </TouchableWithoutFeedback>
    );
  }
};

export default Touchable;
