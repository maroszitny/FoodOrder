import {Provider} from 'react-redux';
import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';
import { enableScreens } from "react-native-screens";
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/core/store';
import AppView from './src/modules/AppView';
import ImageContent from "./src/components/ImageContent";
import SplashScreen from 'react-native-splash-screen'
enableScreens();
SplashScreen.hide();
const rrfProps = {
  firebase: firebase,
  config: {userProfile: 'users'},
  dispatch: store.dispatch,
  createFirestoreInstance
};
console.log('firebase init', firebase);
const App: React.ReactNode = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <PersistGate
          loading={
            <ImageContent style={styles.container}>
              <ActivityIndicator style={{margin: 'auto'}}/>
            </ImageContent>
          }
          persistor={persistor}>
          <AppView />
        </PersistGate>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
