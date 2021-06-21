import {
  createAction,
  createSetTypes,
} from '../../utils/actions';
import {reduce, get, sortBy, min, max, map, find} from 'lodash';
import {trimPrice} from "utils/helper";

const SELECTED_CATEGORY = createSetTypes('FO_SELECTED_CATEGORY');
const GET_CATEGORY = createSetTypes('FO_GET_CATEGORY');
const GET_FOODS = createSetTypes('FO_GET_FOODS');
const GET_VARIATIONS = createSetTypes('FO_GET_VARIATIONS');
const GET_MODIFIERTYPES = createSetTypes('FO_GET_MODIFIERTYPES');
const ADD_FAVORITE = createSetTypes('FO_ADD_FAVORITE');
const DELETE_FAVORITE = createSetTypes('FO_DELETE_FAVORITE');
const ADD_CART = createSetTypes('FO_ADD_CART');
const EDIT_CART = createSetTypes('FO_EDIT_CART');
const DELETE_CART = createSetTypes('FO_DELETE_CART');
const CLEAR_CART = createSetTypes('FO_CLEAR_CART');
const CLEAR_ALL_CART = createSetTypes('FO_CLEAR_ALL_CART');
const ADD_TO_ORDER = createSetTypes('FO_ADD_TO_ORDER');
const DELETE_ORDER = createSetTypes('FO_DELETE_ORDER');
const IS_LOADING = createSetTypes('FO_IS_LOADING');
// const payload = require('../../config/payload.init');

const setCategory = (data) => async dispatch => {
    const action = {
        set: () => createAction(SELECTED_CATEGORY.SET, {data}),
        clear: () => createAction(SELECTED_CATEGORY.CLEAR, {}),
    };
    try {
        dispatch(action.set(data));
    } catch (e) {
        dispatch(action.clear());
    }
};
const getFoods = (location) => async dispatch => {
  const action = {
    loading: () => createAction(IS_LOADING.SET, true),
    set: (foods) => createAction(GET_FOODS.SET, {foods}),
    clear: () => createAction(GET_FOODS.CLEAR, {}),
  };
  try {
    dispatch(action.loading());
    const favorites = get(location, 'location.metadata.--stats--.globalItems') || {}
    const is = get(location, 'location.catalog.ITEM')
    const foods = sortBy(
      reduce(
        is,
        (all, item) => {
          const meta = get(location, `location.metadata.${item.id}`)
          const image = item.image_id && get(location, `location.metadata.${item.image_id}.publicUrl`)
          const variationId = get(item, 'item_data.variations[0].id')
          const points = get(location, `location.metadata.${variationId}.points`)
          const variations = get(item, 'item_data.variations')
          const taxIds = get(item, 'item_data.tax_ids')
          const variationIds = map(variations, 'id')
          const variationPrices = map(variationIds, id => get(location, `location.catalog.ITEM_VARIATION.${id}.item_variation_data.price_money.amount`))
          const priceMin = trimPrice(min(variationPrices));
          const priceMax = trimPrice(max(variationPrices));
          const rank = favorites[item.id] || 0
          const priority = get(meta, 'priority')
          if ((!meta || !meta.hidden) && priceMin && priceMax) {
            all.push({
              id: item.id,
              categoryId: get(item, 'item_data.category_id'),
              name: get(item, 'item_data.name'),
              description: get(item, 'item_data.description'),
              modifierListInfo: get(item, 'item_data.modifier_list_info'),
              image,
              priority: priority === 0 ? 0 : (priority || 99),
              points,
              taxIds,
              priceMin,
              priceMax,
              rank
            })
          }
          return all
        },
        []
      ),
      ['priority']
    );
    console.log(foods);
    dispatch(action.set(foods));
  } catch (e) {
    dispatch(action.clear());
  }
};
const getCategory = (payload) => async dispatch => {
  const action = {
    set: (categories) => createAction(GET_CATEGORY.SET, {categories}),
    clear: () => createAction(GET_CATEGORY.CLEAR, {}),
  };
  try {
    const cs = get(payload, 'location.catalog.CATEGORY')
    const categories = sortBy(
      reduce(
        cs,
        (all, category) => {
          const meta = get(payload, `location.metadata.${category.id}`)
          if (!meta || !meta.hidden) {
            all.push({
              id: category.id,
              name: get(category, 'category_data.name'),
              image: get(category, 'category_data.image'),
              priority: get(meta, 'priority')
            })
          }
          return all
        },
        []
      ),
      ['priority']
    )
    dispatch(action.set(categories));
  } catch (e) {
    dispatch(action.clear());
  }
};

const getVariations = (payload) => async dispatch => {
  const action = {
    set: (variations) => createAction(GET_VARIATIONS.SET, {variations}),
    clear: () => createAction(GET_VARIATIONS.CLEAR, {}),
  };
  try {
    const is = get(payload, 'location.catalog.ITEM_VARIATION')
    const variations = sortBy(
      reduce(
        is,
        (all, itemVariation) => {
          const itemId = get(itemVariation, 'item_variation_data.item_id')
          const meta = get(this, `location.metadata.${itemVariation.id}`)
          all.push({
            id: itemVariation.id,
            itemId,
            name: get(itemVariation, 'item_variation_data.name'),
            price: (get(itemVariation, 'item_variation_data.price_money.amount') / 100) || 0,
            priority: get(meta, 'priority') || 99
          })
          return all
        },
        []
      ),
      ['priority']
    )
    dispatch(action.set(variations));
  } catch (e) {
    dispatch(action.clear());
  }
};

const getModifierTypes = (selectedItem, payload) => dispatch => {
  const action = {
    set: (modifiedTypes) => createAction(GET_MODIFIERTYPES.SET, {modifiedTypes}),
    clear: () => createAction(GET_MODIFIERTYPES.CLEAR, {}),
  };
  try {
    const list = get(selectedItem, 'modifierListInfo')
    const mls = get(payload, 'location.catalog.MODIFIER_LIST')
    const modifiedTypes = reduce(list, (allModifierTypes, modifierType) => {
      if (modifierType.enabled) {
        const modifierOverrides = modifierType.modifier_overrides
        const id = modifierType.modifier_list_id
        const max = modifierType.max_selected_modifiers
        const min = modifierType.min_selected_modifiers
        const modifierListData = mls[id]
        const modifierSpec = get(modifierListData, 'modifier_list_data.modifiers')
        const modifiers = sortBy(reduce(modifierSpec, (all, modifier) => {
          if (!modifier.is_deleted) {
            const modifierOverride = find(modifierOverrides, ['modifier_id', modifier.id])
            all.push({
              id: modifier.id,
              name: get(modifier, 'modifier_data.name'),
              ordinal: get(modifier, 'modifier_data.ordinal'),
              price: (get(modifier, 'modifier_data.price_money.amount') / 100) || 0,
              on_by_default: get(modifierOverride, 'on_by_default')
            })
          }
          return all
        }, []), 'ordinal')
        const isMultiple = get(modifierListData, 'modifier_list_data.selection_type') === 'MULTIPLE'
        allModifierTypes.push({
          max: (max === -1) ? modifiers.length : max,
          min: (min === -1) ? (isMultiple ? 0 : 1) : min,
          id,
          name: get(modifierListData, 'modifier_list_data.name'),
          isMultiple,
          modifiers,
          priority: 99
        })
      }
      return allModifierTypes
    }, [])
    dispatch(action.set(modifiedTypes));
    return modifiedTypes;
  } catch (e) {
    dispatch(action.clear());
  }
};

const addFavorite = (data) => async dispatch => {
  const action = {
    set: () => createAction(ADD_FAVORITE.SET, {data}),
    clear: () => createAction(ADD_FAVORITE.CLEAR, {}),
  };
  try {
    dispatch(action.set());
  } catch (e) {
    dispatch(action.clear());
  }
}

const deleteFavorite = (key) => async dispatch => {
  dispatch(createAction(DELETE_FAVORITE.SET, {key}));
}

const addCart = (data) => async dispatch => {
  const action = {
    set: () => createAction(ADD_CART.SET, {data}),
    clear: () => createAction(ADD_CART.CLEAR, {}),
  };
  try {
    dispatch(action.set());
  } catch (e) {
    dispatch(action.clear());
  }
};

const editCart = (key, data) => async dispatch => {
  const action = {
    set: () => createAction(EDIT_CART.SET, {key, data}),
    clear: () => createAction(EDIT_CART.CLEAR, {}),
  };
  try {
    dispatch(action.set());
  } catch (e) {
    dispatch(action.clear());
  }
};

const addToOrder = (data) => async dispatch => {
  const action = {
    set: () => createAction(ADD_TO_ORDER.SET, {data}),
    clear: () => createAction(ADD_TO_ORDER.CLEAR, {}),
  };
  try {
    dispatch(action.set());
  } catch (e) {
    dispatch(action.clear());
  }
};
const deleteOrder = (key) => async dispatch => {
  dispatch(createAction(DELETE_ORDER.SET, {key}));
}
const clearAllCart = () => async dispatch => {
  const action = {
    set: () => createAction(CLEAR_ALL_CART.SET, {}),
    clear: () => createAction(CLEAR_ALL_CART.CLEAR, {}),
  };
  try {
    dispatch(action.set());
  } catch (e) {
    dispatch(action.clear());
  }
};

const clearCart = (data) => async dispatch => {
  const action = {
    set: () => createAction(CLEAR_CART.SET, {data}),
    clear: () => createAction(CLEAR_CART.CLEAR, {}),
  };
  try {
    dispatch(action.set(data));
  } catch (e) {
    dispatch(action.clear());
  }
};

const deleteCart = (data) => async dispatch => {
  const action = {
    set: () => createAction(DELETE_CART.SET, {data}),
    clear: () => createAction(DELETE_CART.CLEAR, {}),
  };
  try {
    dispatch(action.set(data));
  } catch (e) {
    dispatch(action.clear());
  }
};


export {
  SELECTED_CATEGORY,
  GET_FOODS,
  GET_CATEGORY,
  GET_VARIATIONS,
  GET_MODIFIERTYPES,
  ADD_FAVORITE,
  DELETE_FAVORITE,
  ADD_CART,
  EDIT_CART,
  DELETE_CART,
  CLEAR_CART,
  CLEAR_ALL_CART,
  ADD_TO_ORDER,
  DELETE_ORDER,
  IS_LOADING,
  setCategory,
  getCategory,
  addFavorite,
  deleteFavorite,
  addCart,
  editCart,
  deleteCart,
  clearCart,
  clearAllCart,
  getFoods,
  getVariations,
  getModifierTypes,
  addToOrder,
  deleteOrder
};
