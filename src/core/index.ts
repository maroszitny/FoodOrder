import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import FilesystemStorage from '@react-native-community/async-storage';

// ## Generator Reducer Imports
import main from './main';
import category from './food';

import {State as FoodState} from "./food/interfaces";
import {State as MainState} from "./main/interfaces";
const appReducer = combineReducers({
  // ## Generator Reducers
  firestore:  persistReducer(
    { key: 'firestoreState', storage: FilesystemStorage, stateReconciler: hardSet },
    firestoreReducer
  ),
  firebase: persistReducer(
    { key: 'firebaseState', storage: FilesystemStorage, stateReconciler: hardSet },
    firebaseReducer
  ),
  [main.constants.NAME]: main.reducer,
  [category.constants.NAME]: category.reducer,
});
const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export type RootState = {
  firestore: any,
  firebase: any,
  [main.constants.NAME]: MainState,
  [category.constants.NAME]: FoodState,
};

export default rootReducer;
