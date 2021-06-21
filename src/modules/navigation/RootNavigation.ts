import React from 'react';
import {Easing, Animated} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MenuContainer from './Menu';
import StartupScreen from '../main';
import FoodMenuViewContainer from "../foodMenu/FoodMenuViewContainer";
import FoodDetailViewContainer from "../foodDetail/FoodDetailViewContainer";

const AppNavigator = createStackNavigator(
  {
    Main: {
        screen: MenuContainer,
        navigationOptions: {
            header: null,
        },
    },
    FoodMenuScreen: {
      screen: FoodMenuViewContainer,
      navigationOptions: {header: null}
    },
    FoodDetailScreen: {
      screen: FoodDetailViewContainer,
      navigationOptions: {header: null}
    },
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const {layout, position, scene} = sceneProps;
        const {index} = scene;

        const width = layout.initWidth;
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [width, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return {opacity, transform: [{translateX: translateX}]};
      },
    })
  },
);

const AuthNavigator = createSwitchNavigator(
  {
    StartupScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'StartupScreen'
  },
);

const AppContainer = createSwitchNavigator(
  {
    App: AppNavigator,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(AppContainer);
