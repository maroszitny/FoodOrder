import {
  createTypes,
  createAction,
  createSetTypes,
} from 'utils/actions';

import {getCurrentLocation} from "utils/misc";
import {GeoLocationService} from "utils/geolocation";
import {reduce, get, sortBy, filter} from 'lodash';

const GET_LOCATION = createTypes('GET_LOCATION');
const GET_LOCATIONS = createSetTypes('GET_LOCATIONS');
const ISFIRST = createSetTypes('SMCOSMINC_ISFIRST');
const SMUSER = createSetTypes('SMCOSMINC_SMUSER');

const setIsFirst = () => async dispatch => {
  const setLocationAction = {
    setData: () => createAction(ISFIRST.SET, true),
    clearData: () => createAction(ISFIRST.CLEAR, null)
  };
  try {
    dispatch(setLocationAction.setData());
  } catch (e) {
    dispatch(setLocationAction.clearData());
  }
};

const setUser = (data) => async dispatch => {
  const setLocationAction = {
    setData: () => createAction(SMUSER.SET, {data}),
    clearData: () => createAction(SMUSER.CLEAR, null)
  };
  try {
    dispatch(setLocationAction.setData());
  } catch (e) {
    dispatch(setLocationAction.clearData());
  }
};

const getLocations = ({ merchant }) => async dispatch => {
  const action = {
    set: (locations) => createAction(GET_LOCATIONS.SET, {locations}),
    clear: () => createAction(GET_LOCATIONS.CLEAR, {}),
  };
  try {
    const ls = get(merchant, 'data.locations', [])
    const lsMetadata = get(merchant, 'data.locationsMetadata', {})
    const locations =  reduce(ls, (filtered, l) => {
      const md = lsMetadata[l.id]
      md && md.enabled && filtered.push({
        ...md,
        locationData: l,
      })
      return filtered
    }, [])
    dispatch(action.set(locations));
  } catch (e) {
    dispatch(action.clear());
  }
};

const getLocation = () => async dispatch => {
  const actions = {
    do: () => createAction(GET_LOCATION.DO, {}),
    success: data => createAction(GET_LOCATION.SUCCESS, {data}),
    failed: () => createAction(GET_LOCATION.FAILED, {}),
  };
  try {
    dispatch(actions.do());
    let currentLocation: any = await getCurrentLocation();
    currentLocation['address'] = await GeoLocationService.getAddress(currentLocation.lat, currentLocation.lng);
    dispatch(actions.success(currentLocation));
  } catch (e) {
    dispatch(actions.failed());
  }
};

export {
  ISFIRST,
  SMUSER,
  GET_LOCATION,
  GET_LOCATIONS,
  setIsFirst,
  getLocation,
  setUser,
  getLocations,
};
