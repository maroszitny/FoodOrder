import { compose, lifecycle } from 'recompose';
import {connect} from 'react-redux';
import HomeScreen from './HomeView';
import foodCore from "../../core/food";

export default compose(
    connect(
        state => ({
        }),
        dispatch => ({
          selectCategory: (data) => dispatch(foodCore.actions.setCategory(data)),
        }),
    ),
    lifecycle({
      componentDidMount() {
      },
    }),
)(
  HomeScreen,
);
