import { compose, lifecycle } from 'recompose';
import {connect} from 'react-redux';
import CartScreen from './AddCardView';
import foodCore from "../../core/food";

export default compose(
    connect(
        state => ({
          carts: foodCore.selectors.getCarts(state),
        }),
        dispatch => ({
          addCart: (data) => dispatch(foodCore.actions.addCart(data)),
          deleteCart: (data) => dispatch(foodCore.actions.deleteCart(data)),
          clearCart: (data) => dispatch(foodCore.actions.clearCart(data)),
          addToOrder: (data) => dispatch(foodCore.actions.addToOrder(data)),
          clearAllCart: () => dispatch(foodCore.actions.clearAllCart()),
        }),
    ),
    lifecycle({
    }),
)(
  CartScreen,
);
