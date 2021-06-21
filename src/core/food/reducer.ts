import {
  SELECTED_CATEGORY,
  GET_CATEGORY,
  ADD_CART,
  DELETE_CART,
  CLEAR_CART,
  CLEAR_ALL_CART,
  GET_FOODS,
  GET_VARIATIONS, EDIT_CART, ADD_FAVORITE, DELETE_FAVORITE, ADD_TO_ORDER, DELETE_ORDER, IS_LOADING
} from './actions';
import {notEmpty} from "utils/helper";
import {CategoryState} from "./interfaces";

const InitialState: CategoryState = {
  seletedCategory: null,
  categories: null,
  variations: null,
  foods: [],
  favorite: {},
  orders: {},
  cartData: {},
  isLoading: false,
};

export default (state = InitialState, action) => {
  let cartData = state.cartData || {};
  let favorite = state.favorite || {};
  let orders = state.orders || {};
  let newState = state;
  switch (action.type) {
    case SELECTED_CATEGORY.SET:
      newState = Object.assign({}, newState, {
        seletedCategory: action.data,
      });
      break;
    case SELECTED_CATEGORY.CLEAR:
      newState = Object.assign({}, newState, {
        seletedCategory: null,
      });
      break;
    case GET_CATEGORY.SET:
      newState = Object.assign({}, newState, {
        categories: action.categories,
      });
      break;
    case GET_CATEGORY.CLEAR:
      newState = Object.assign({}, newState, {
        categories: null,
      });
      break;
    case IS_LOADING.SET:
      newState = Object.assign({}, newState, {
        isLoading: true,
      });
      break;
    case GET_FOODS.SET:
      newState = Object.assign({}, newState, {
        foods: action.foods,
        isLoading: false,
      });
      break;
    case GET_FOODS.CLEAR:
      newState = Object.assign({}, newState, {
        foods: null,
      });
      break;
    case GET_VARIATIONS.SET:
      newState = Object.assign({}, newState, {
        variations: action.variations,
      });
      break;
    case GET_VARIATIONS.CLEAR:
      newState = Object.assign({}, newState, {
        variations: null,
      });
      break;
    case ADD_CART.SET:
      cartData[action.data.id] = {
        ...action.data,
      };
      newState = Object.assign({}, newState, {
        seletedCategory: action.data,
        cartData
      });
      break;
    case ADD_CART.CLEAR:
      newState = Object.assign({}, newState, {
        seletedCategory: null,
        cartData: InitialState.cartData,
      });
      break;
    case ADD_FAVORITE.SET:
      favorite[action.data.id] = {
        ...action.data,
      };
      newState = Object.assign({}, newState, {favorite});
      break;
    case ADD_FAVORITE.CLEAR:
      newState = Object.assign({}, newState, {favorite: null});
      break;
    case ADD_TO_ORDER.SET:
      Object.keys(action.data).map(key => {
        orders[key] = {
          ...action.data[key],
          orderDate: new Date().getTime()
        };
      });
      newState = Object.assign({}, newState, {orders});
      break;
    case ADD_TO_ORDER.CLEAR:
      newState = Object.assign({}, newState, {orders: null});
      break;
    case DELETE_ORDER.SET:
      delete orders[action.key];
      newState = Object.assign({}, newState, {orders});
      break;
    case DELETE_FAVORITE.SET:
      delete favorite[action.key];
      newState = Object.assign({}, newState, {favorite});
      break;
    case EDIT_CART.SET:
      cartData[action.key] = {
        ...action.data,
      };
      newState = Object.assign({}, newState, {
        seletedCategory: action.data,
        cartData
      });
      break;
    case EDIT_CART.CLEAR:
      newState = Object.assign({}, newState, {
        seletedCategory: null,
        cartData: InitialState.cartData,
      });
      break;
    case DELETE_CART.SET:
      cartData[action.data.id] = {
        ...action.data,
        amount: notEmpty(cartData[action.data.id]) ? cartData[action.data.id].amount - 1 : 1
      };
      delete cartData[action.data.id];
      newState = Object.assign({}, newState, {
        seletedCategory: action.data,
        cartData
      });
      break;
    case DELETE_CART.CLEAR:
      newState = Object.assign({}, newState, {
        seletedCategory: null,
        cartData: InitialState.cartData,
      });
      break;
    case CLEAR_CART.SET:
      delete cartData[action.data.id];
      newState = Object.assign({}, newState, {
        seletedCategory: action.data,
        cartData
      });
      break;

    case CLEAR_CART.CLEAR:
      newState = Object.assign({}, newState, {
        seletedCategory: null,
        cartData: InitialState.cartData,
      });
      break;
    case CLEAR_ALL_CART.SET:
      newState = Object.assign({}, newState, {
        seletedCategory: action.data,
        cartData: InitialState.cartData,
      });
      break;

    case CLEAR_ALL_CART.CLEAR:
      newState = Object.assign({}, newState, {
        seletedCategory: null,
        cartData: InitialState.cartData,
      });
      break;
  }
  return newState;
};
