import {ISFIRST, SMUSER, GET_LOCATION, GET_LOCATIONS} from './actions';
import {State} from "./interfaces";

const InitialState: State = {
  currentLocation: null,
  isFirst: false,
  user: null,
  isLoading: false,
  status: null,
};

export default (state = InitialState, action) => {
  let newState = state;
  switch (action.type) {
    case ISFIRST.SET:
      newState = Object.assign({}, newState, {isFirst: true});
      break;

    case ISFIRST.CLEAR:
      newState = Object.assign({}, newState, {isFirst: false});
      break;

    case SMUSER.SET:
      newState = Object.assign({}, newState, {user: action.data});
      break;

    case SMUSER.CLEAR:
      newState = Object.assign({}, newState, {user: null});
      break;

    case GET_LOCATION.DO:
      newState = Object.assign({}, newState, {locationLoading: GET_LOCATION.DO});
      break;

    case GET_LOCATION.SUCCESS:
      newState = Object.assign({}, newState, {locationLoading: GET_LOCATION.SUCCESS});
      newState = Object.assign({}, newState, {currentLocation: action.data});
      break;

    case GET_LOCATION.FAILED:
      newState = Object.assign({}, newState, {locationLoading: GET_LOCATION.FAILED});
      break;

    case GET_LOCATIONS.SET:
      newState = Object.assign({}, newState, {
        locations: action.locations,
      });
      break;
    case GET_LOCATIONS.CLEAR:
      newState = Object.assign({}, newState, {
        locations: null,
      });
      break;
  
  }
  return newState;
};
