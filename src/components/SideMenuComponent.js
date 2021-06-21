import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {AppRegistry, Image, StatusBar, ImageBackground, Platform, View, TouchableOpacity} from "react-native";
import {Text, List, ListItem, Left, Body} from "native-base";
import colors from '../themes/dark/colors';
import {useDispatch, useSelector} from "react-redux";
import Icon from "./Icon";

const routes = [
  {displayName: "Locations", route: "Home", icon: "restaurant-menu", iconModel: 'MaterialIcons', defaultExist: true},
  {displayName: "Carts", route: "Cart", icon: "shopping-cart", iconModel: 'FontAwesome', key: "cart", defaultExist: true},
  {displayName: "Orders", route: "Orders", icon: "clock-out", iconModel: 'MaterialCommunityIcons', key: "orders", defaultExist: true},
  {displayName: "Favorites", route: "Favorites", icon: "hearto", iconModel: 'AntDesign', key: "favorite", defaultExist: true},
  {displayName: "Profile", route: "Profile", icon: "user-o", iconModel: 'FontAwesome', key: "profile", defaultExist: true},
  {displayName: "Logout", route: "logout", icon: "logout", iconModel: 'AntDesign', key: "logout", defaultExist: true},
];

const SideMenu = ({navigation}) => {
  const currentUser = useSelector(({ firebase: { auth } }) => auth);
  const dispatch = useDispatch();
  const action = (route) => {
    navigation.closeDrawer();
    if (route === 'logout') {
      navigation.navigate('LoginScreen');
    } else navigation.navigate(route)
  };
  return (
    <ImageBackground
      source={require('../themes/dark/background.png')}
      style={{ flex: 1, paddingTop: 50}}
      resizeMode="cover"
    >
      <TouchableOpacity style={{alignItems: 'center', marginTop: 0}} onPress={() => action('Profile')}>
        <View style={{
          padding: 6,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          alignItems: 'center',
          borderRadius: 43,
          justifyContent: 'center'}}>
          <Image
            source={{uri: currentUser.photoURL}}
            resizeMode={'center'}
            style={{
              ...Platform.select({
                ios: {
                  borderRadius: 40,
                },
                android: {
                  borderRadius: 40,
                },
              }),
              width: 80,
              height: 80,
              borderWidth: 2,
              resizeMode: 'contain'
            }}
          />
        </View>
        <Text style={{color: colors.secondaryButtonText}}>{currentUser.displayName}</Text>
      </TouchableOpacity>
      <View style={{marginTop: 30}}>
        <List
          dataArray={routes}
          renderRow={data => (
            <ListItem
              button
              icon
              key={data.route}
              id={data.route}
              underlayColor={colors.darkRed}
              onPress={() => action(data.route)}>
              <Left>
                <Icon name={data.icon} module={data.iconModel} size={19}/>
              </Left>
              <Body>
              <Text style={{color: colors.secondaryButtonText}}>{data.displayName}</Text>
              </Body>
            </ListItem>
          )}
          keyExtractor={item => item.route}
        />
      </View>

    </ImageBackground>
  );
};

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;
