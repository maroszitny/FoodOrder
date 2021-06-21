import {createDrawerNavigator} from 'react-navigation-drawer'
import SideMenuComponent from '../../components/SideMenuComponent';
import React from "react";
import {createAppContainer} from "react-navigation";
import HomeViewContainer from "../home/HomeViewContainer";
import FoodMenuViewContainer from "../foodMenu/FoodMenuViewContainer";
import FoodOrdersViewContainer from "../foodOrders/foodOrdersViewContainer";
import FavoritesViewContainer from "../foodFavorites/foodFavoritesViewContainer";
import AddCardViewContainer from "../addCard/AddCardViewContainer";
import ProfileView from "../profile/ProfileView";

export const routeConfigs = {
  "Home": {screen: HomeViewContainer},
  "FoodMenu": {screen: FoodMenuViewContainer},
  "Orders": {screen: FoodOrdersViewContainer},
  "Profile": {screen: ProfileView},
  "Cart": {screen: AddCardViewContainer},
  "Favorites": {screen: FavoritesViewContainer},
};

const Menu = createAppContainer(createDrawerNavigator(
  routeConfigs,
  {
    initialRouteName: 'Home',
    drawerWidth: 250,
    unmountInactiveRoutes: true,
    drawerPosition: 'left',
    keyboardDismissMode: 'none',
    drawerType: "slide",
    contentComponent: SideMenuComponent,
  }
));

export default Menu;
