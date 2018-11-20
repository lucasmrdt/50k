// @flow

import React from 'react';
import Touchable from './Touchable';
import { createStyleSheet } from '@/utils';

import { type Props as TouchableProps } from './Touchable';

type Props = {
  leftIcon: React.ComponentType<void>,
  rightIcon: React.ComponentType<void>,
  icon: React.ComponentType<void>,
} & TouchableProps;

class Button extends React.PureComponent<Props> {

  static defaultProps: Props = {
    leftIcon: null,
    rightIcon: null,
    icon: null,
    style: null,
  };

  render() {
    const {
      leftIcon,
      rightIcon,
      children,
      style,
      ...props
    } = this.props;

    return (
      <Touchable style={[styles.wrapper, style]} {...props}>
        {leftIcon}
        {icon ? icon : children}
        {rightIcon}
      </Touchable>
    );
  }

}

const styles = createStyleSheet({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Button;
