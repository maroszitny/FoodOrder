import {RootState} from "../";
import * as constants from './interfaces';
import {notEmpty} from "utils/helper";

export const loading = (state: RootState): Object => {
  return (notEmpty(state[constants.NAME].isLoading)) ? state[constants.NAME].isLoading : false;
};

export const getSelectedCategory = (state: RootState): Object => {
  return (notEmpty(state[constants.NAME].seletedCategory)) ? state[constants.NAME].seletedCategory : null;
};

export const getCategories = (state: RootState): Object => {
  return (notEmpty(state[constants.NAME].categories)) ? state[constants.NAME].categories : [];
};

export const getFoods = (state: RootState): Object => {
  return (notEmpty(state[constants.NAME].foods)) ? state[constants.NAME].foods : [];
};

export const getVariations = (state: RootState): Object => {
  return (notEmpty(state[constants.NAME].variations)) ? state[constants.NAME].variations : [];
};

export const getCarts = (state: RootState): Object => {
  return (notEmpty(state[constants.NAME].cartData)) ? state[constants.NAME].cartData : {};
};

export const getFavorites = (state: RootState): Object => {
  return (notEmpty(state[constants.NAME].favorite)) ? state[constants.NAME].favorite : {};
};

export const getOrders = (state: RootState): Object => {
  return (notEmpty(state[constants.NAME].orders)) ? state[constants.NAME].orders : {};
};

