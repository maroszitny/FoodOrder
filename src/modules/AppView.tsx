import { compose, lifecycle } from 'recompose';
import { Platform, UIManager, StatusBar } from 'react-native';

import AppNavigator from "./navigation/RootNavigation";
import React from "react";

const App: React.FC = () => (<AppNavigator uriPrefix="/app"/>);

export default compose(
  lifecycle({
    UNSAFE_componentWillMount () {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    },
  }),
)(App);
