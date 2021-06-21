import {RootState} from "../";
import * as constants from './interfaces';
import {notEmpty} from "utils/helper";
import get from 'lodash/get'

export const _isFirst = (state: RootState): Object => {
  return (notEmpty(state[constants.NAME].isFirst)) ? state[constants.NAME].isFirst : false;
};

export const _status = (state: RootState): Object => {
  return state[constants.NAME].status;
};

export const _loading = (state: RootState): Object => {
  return state[constants.NAME].isLoading;
};

export const _user = (state: RootState): Object => {
  return (notEmpty(state[constants.NAME].user)) ? state[constants.NAME].user : null;
};

export const getLocations = (state: RootState): Object => {
  return get(state, `${constants.NAME}.locations`, [])
};
