import { compose, lifecycle } from 'recompose';
import {connect} from 'react-redux';
import FoodOrdersScreen from './foodOrdersView';
import foodCore from "../../core/food";

export default compose(
    connect(
        state => ({
          orders: foodCore.selectors.getOrders(state),
        }),
        dispatch => ({
        }),
    ),
    lifecycle({
    }),
)(
  FoodOrdersScreen,
);
