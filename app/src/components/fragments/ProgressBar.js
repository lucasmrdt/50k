// @flow

import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { createStyleSheet } from '@/utils';
import { SIZES } from '@/constants';

type Props = {
  progress: Animated.Value,
  width: number,
  height: number,
  style: {
    wrapper?: any,
    progress?: any,
  },
};

class ProgressBar extends React.Component<Props, State> {

  state = {};

  static defaultProps: Props = {
    width: SIZES.WIDTH,
    height: 30,
    style: {},
  };

  shouldComponentUpdate = () => false;

  render() {
    const { height, width, progress } = this.props;
    const translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width],
    });

    const wrapperStyle = StyleSheet.flatten(
      styles.wrapper,
      { height, width },
    );
    const progressStyle = StyleSheet.flatten(
      styles.progress,
      { transform: [{ translateX }] },
    );

    return (
      <View style={wrapperStyle}>
        <Animated.View style={progressStyle} />
      </View>
    );
  }
};

const styles = createStyleSheet({
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
  },
  progress: {
    ...StyleSheet.absoluteFillObject,
    width: '101%', // Fix border issue on android
    borderRadius: 100,
    height: '100%',
    left: '-100.5%',
  },
});

export default ProgressBar;
