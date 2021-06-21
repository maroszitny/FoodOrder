import { compose, lifecycle } from 'recompose';
import {connect} from 'react-redux';
import FoodMenuScreen from './FoodDetailView';
import foodCore from "../../core/food";

export default compose(
    connect(
        state => ({
          selectCategory: foodCore.selectors.getSelectedCategory(state),
        }),
        dispatch => ({
          addCart: (data) => dispatch(foodCore.actions.addCart(data)),
          editCart: (key, data) => dispatch(foodCore.actions.editCart(key, data)),
        }),
    ),
    lifecycle({
    }),
)(
  FoodMenuScreen,
);
