import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const input = props => {
  let template = null;

  switch (props.type) {
    case 'textinput':
      template = (
        <TextInput
          {...props}
          underlineColorAndroid="transparent"
          style={[props.overrideStyle]}
        />
      );
      break;
    default:
      return template;
  }
  return template;
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    fontSize: 16,
    marginTop: 10,
    padding: 5,
  },
});

export default input;
