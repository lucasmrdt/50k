// @flow

import React from 'react';
import { TextInput, View } from 'react-native';
import { createStyleSheet } from '@/utils';
import { COLORS } from '@/constants';

import { type TextInputProps } from 'react-native';

type Props = {
  icon: React.ComponentType<any>,
  label: string,
  onRef: (ref: React.Ref) => void,
  onStatusChange: (status: bool) => void,
  onEndInput: (value: string | number) => void,
  validator: (value) => bool,
  style: any,
  inputStyle: any,
} & TextInputProps;

type State = {
  value: string | number,
  isValid: bool,
};

class CustomTextInput extends React.PureComponent<Props, State> {

  static defaultProps: Props = {
    label: '',
    icon: null,
    style: null,
    inputStyle: null,
    validText: null,
    errorText: null,
    validator: () => true,
  };

  state: State = {
    value: null,
    isValid: false,
  };

  onChange = (value: string | number) => {
    const { onStatusChange, validator } = this.props;
    const isValid = validator(value);

    this.setState((state: State) => {
      if (isValid !== state.isValid) {
        onStatusChange(isValid);
      }
      return { isValid, value };
    });
  }

  onEndEditing = ({ nativeEvent }) => {
    const value = nativeEvent.text;
    const { onEndEditing } = this.props;
    onEndEditing(value);
  }

  render() {
    const { icon, style, inputStyle, onRef, ...props } = this.props;
    const { value } = this.state;

    return (
      <View
        style={[styles.wrapper, style]}
      >
        {icon}
        <TextInput
          {...props}
          ref={onRef}
          value={value}
          style={[styles.input, inputStyle]}
          onEndEditing={this.onEndEditing}
          onChangeText={this.onChange}
          autoCorrect={false}
          autoCapitalize='none'
          underlineColorAndroid='rgba(0, 0, 0, 0)'
          allowFontScaling
        />
      </View>
    );
  }

}

const styles = createStyleSheet({
  wrapper: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 200,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.PURPLE,
  },
  input: {
    position: 'absolute',
    left: 0,
    paddingLeft: 25,
    color: COLORS.DARK_GRAY,
    fontSize: 20,
    fontFamily: 'poppins-bold',
    width: '100%',
    height: '100%',
  },
});

export default CustomTextInput;
