import React from 'react';
import PropTypes from 'prop-types';
import {Header, Left, Body, Right, Button} from 'native-base';
import {useSelector} from "react-redux";
import mainCore from "../core/main";
import {ImageBackground, ActivityIndicator, Text, View} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import colors from "../themes/dark/colors";

const SMHeader = (
  {
    navigation,
    title,
    isHome,
    isBack,
    isRefresh,
    hasTabs = false,
    isMenu = false,
    onGoBack = () => {},
    onRefresh = () => {},
    children=null,
    transparent=false
  }) => {
  const isLoading = useSelector(state => mainCore.selectors._loading(state));
  const {goBack} = navigation;
  const goHome = () => {
    navigation.navigate('Home');
  };

  const goToBack = () => {

    goBack(null);
  };

  const goMenu = () => {
    navigation.openDrawer()
  };

  const sync = async () => {
    if (onGoBack) onRefresh();
    else {
    }
  };
  if (transparent) {
    return (
      <View style={{height: 'auto', flex: 0}}>
        <Header transparent hasTabs={hasTabs}>
          <Left style={{width: 50, flex: 0,}}>
            {isMenu &&
            <Button transparent onPress={goMenu}>
              <Icon name='menu-fold' size={20} color={colors.textInputColor}/>
            </Button>
            }
            {isBack &&
            <Button transparent onPress={goToBack}>
              <Icon name='left' size={20} color={colors.textInputColor}/>
            </Button>
            }
          </Left>
          <Body style={{flex: 1, alignItems: 'flex-start'}}>
          <Text
            numberOfLines={1}
            style={{fontSize: 18, color: colors.textInputColor}}
          >
            {title}
          </Text>
          </Body>
          <Right style={{width: 100, flex: 0,}}>
            {isRefresh && !isLoading &&
            <Button transparent onPress={sync}>
              <Icon name='reload1' size={20} color={colors.textInputColor}/>
            </Button>
            }
            {isLoading &&
            <Button transparent>
              <ActivityIndicator color="#fff"/>
            </Button>
            }
            {isHome &&
            <Button transparent onPress={goHome}>
              <Icon name='home' size={20} color={colors.textInputColor}/>
            </Button>
            }
          </Right>
        </Header>
        {children}
      </View>

    );
  } else {
    return (
      <ImageBackground
        source={require('../themes/dark/topBarBg.png')}
        style={{height: 'auto', flex: 0}}
        resizeMode="cover"
      >
        <Header transparent>
          <Left style={{width: 50, flex: 0,}}>
            {isMenu &&
            <Button transparent onPress={goMenu}>
              <Icon name='menu-fold' size={20} color={colors.ButtonTextColor}/>
            </Button>
            }
            {isBack &&
            <Button transparent onPress={goToBack}>
              <Icon name='left' size={20} color={colors.ButtonTextColor}/>
            </Button>
            }
          </Left>
          <Body style={{flex: 1, alignItems: 'flex-start'}}>
          {/*<MarqueeText*/}
          {/*style={{ fontSize: 18, color: "#fff" }}*/}
          {/*duration={3000}*/}
          {/*marqueeOnStart*/}
          {/*loop*/}
          {/*marqueeDelay={1000}*/}
          {/*marqueeResetDelay={1000}*/}
          {/*>*/}
          {/*{title}*/}
          {/*</MarqueeText>*/}
          <Text
            numberOfLines={1}
            style={{fontSize: 18, color: colors.ButtonTextColor}}
          >
            {title}
          </Text>
          </Body>
          <Right style={{width: 100, flex: 0,}}>
            {isRefresh && !isLoading &&
            <Button transparent onPress={sync}>
              <Icon name='reload1' size={20} color={colors.ButtonTextColor}/>
            </Button>
            }
            {isLoading &&
            <Button transparent>
              <ActivityIndicator color="#fff"/>
            </Button>
            }
            {isHome &&
            <Button transparent onPress={goHome}>
              <Icon name='home' size={20} color={colors.ButtonTextColor}/>
            </Button>
            }
          </Right>
        </Header>
        {children}
      </ImageBackground>

    );
  }

};
SMHeader.propTypes = {
  isHome: PropTypes.bool,
  isBack: PropTypes.bool,
  isRefresh: PropTypes.bool,
  isMenu: PropTypes.bool,
  transparent: PropTypes.bool,
  title: PropTypes.string,
  navigation: PropTypes.object.isRequired,
  onGoBack: PropTypes.func,
  onRefresh: PropTypes.func,
};
SMHeader.defaultProps = {
  isHome: false,
  isBack: false,
  isRefresh: true,
  isMenu: true,
  transparent: false,
  title: ''
}
export default SMHeader
