// @flow

import React from 'react';
import { Text } from 'react-native';
import { Wrapper } from '@/components/fragments';
import { createStyleSheet } from '@/utils';

import { type NavigationType } from '@/types/rnTypes';
import { type TaskType } from '@/types/dataTypes';

export type ReduxProps = {
  onSelectTask: (taskId: string) => void,
  tasks: Array<TaskType>,
};

type Props = ReduxProps & {
  navigation: NavigationType
};

class HomeScreen extends React.Component<Props> {

  shouldComponentUpdate = () => false;

  render() {
    return (
      <Wrapper>
        <Text>bonjour</Text>
      </Wrapper>
    );
  }
}

const styles = createStyleSheet({
  wrapper: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default HomeScreen;
