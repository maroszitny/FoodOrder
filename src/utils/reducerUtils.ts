import R from 'ramda';
// import Store from "react-native-fs-store";
import {persistName} from "../config/config";

// const AsyncStorage = new Store(persistName);

export async function clearReducers(baseReducer, currentState, currentAction, { except = [[]] } = {}) {
  let persistedState = {};
  // AsyncStorage.removeItem('persist:root');
  // except.forEach((path) => {
  //   const persistedValue = currentState[path];
  //   persistedState = R.assocPath(path, persistedValue, persistedState);
  // });
  return baseReducer(persistedState, currentAction);
}
