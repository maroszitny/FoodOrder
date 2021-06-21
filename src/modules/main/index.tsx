import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import {compose, lifecycle} from "recompose";
import mainCore from "../../core/main";
import foodCore from "../../core/food";
import {RootState} from "core";
import RenderView from "./view";
import {docId, merchantId} from "../../config/config";
import {notEmpty} from "utils/helper";

const locationQuery = {
  collection: 'cache',
  doc: docId,
  storeAs: 'cacheData',
};
const appQuery = {
  collection: 'apps',
  doc: merchantId,
  storeAs: 'merchantData'
};
const screen = props => {
  useEffect(() => {
    const subscriber = firestore()
      .collection('cache')
      .doc(docId)
      .onSnapshot(documentSnapshot => {
        const cacheData = documentSnapshot.data();
        console.log('locationData', cacheData);
        if (notEmpty(cacheData)) {
          let promiseQueue = [];
          promiseQueue.push(props.getFoods({location: cacheData}));
          promiseQueue.push(props.getCategory({location: cacheData}));
          promiseQueue.push(props.getVariations({location: cacheData}));
          Promise.all(promiseQueue).then(() => props.navigation.navigate('App'));
        }
      });

    // Stop listening for updates when no longer required
    // return () => subscriber();
  }, []);
  return (
    <RenderView/>
  );
};


export default compose(
  connect(
    (state: RootState) => ({
      isFirst: mainCore.selectors._isFirst(state),
      users: state.firebase.ordered.user,
      status: mainCore.selectors._status(state),
    }),
    (dispatch: any) => ({
      getLocation: () => dispatch(mainCore.actions.getLocation()),
      getFoods: (location) => dispatch(foodCore.actions.getFoods(location)),
      getCategory: (location) => dispatch(foodCore.actions.getCategory(location)),
      getVariations: (location) => dispatch(foodCore.actions.getVariations(location)),
    }),
  ),
  lifecycle({
    async componentDidMount() {
    },
  }),
)(screen);
