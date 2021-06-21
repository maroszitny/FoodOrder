import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, View, Text} from 'react-native';
import {TextInput, SMHeader, SMContent} from '../../components';
import {Button} from 'native-base';
import {fonts, colors} from '../../styles';
import mainCore from "../../core/main";
import {notEmpty} from "utils/helper";

const ProfileScreen = props => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => mainCore.selectors._user(state));
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const logoutHandler = async () => {
    dispatch(mainCore.actions.setUser(null));
    props.navigation.navigate('StartupScreen');
  };
  const registerHandler = async () => {
    if (notEmpty(username) && notEmpty(phoneNumber)) {
      dispatch(mainCore.actions.setUser({name: username, phonenumber: phoneNumber}));
      props.navigation.navigate('StartupScreen');
    }
  };
  return (
    <View style={styles.container}>
      <SMHeader title="Profile" navigation={props.navigation} isHome isRefresh={false}/>
        {notEmpty(currentUser) &&
          <SMContent>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <Text style={styles.title}>{currentUser.name}</Text>

            </View>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <Text style={styles.title}>{currentUser.phonenumber}</Text>

            </View>
            <View style={{alignItems: 'center', marginTop: 40}}>
              <Button
                rounded
                small
                style={{marginLeft: 20}}
                onPress={logoutHandler}
              >
                <Text>Logout</Text>
              </Button>
            </View>
          </SMContent>
        }
      {!notEmpty(currentUser) &&
        <SMContent>
          <View style={{alignItems: 'center', marginTop: 10}}>
            <Text style={styles.title}>Let's set your name and phone so Good Grounds will text you once ready</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TextInput
              placeholder="Name"
              autoCapitalize="none"
              type="bordered"
              placeholderTextColor={'#cecece'}
              value={username}
              keyboardType={'email-address'}
              style={{marginBottom: 10}}
              onChangeText={value => setUsername(value)}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <TextInput
              placeholder="Phone"
              autoCapitalize="none"
              type="bordered"
              placeholderTextColor={'#cecece'}
              value={phoneNumber}
              keyboardType={'email-address'}
              style={{marginBottom: 10}}
              onChangeText={value => setPhoneNumber(value)}
            />

          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={[styles.title, {fontSize: 10}]}>You will receive a text message when your order is ready and our store may contact you with questions or suggestions.</Text>
          </View>
          <View style={{alignItems: 'center', marginTop: 40}}>
            <Button
              rounded
              small
              style={{marginLeft: 20}}
              onPress={registerHandler}
            >
              <Text>Register</Text>
            </Button>
          </View>
        </SMContent>
      }
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 2,
    padding: 20,
  },
  section: {
    flex: 1,
    position: 'relative',
  },
  title: {
    color: colors.textInputColor,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
    letterSpacing: 0.04,
    marginBottom: 10,
  },
  lightText: {
    color: colors.white,
  },
  quickFacts: {
    height: 60,
    flexDirection: 'row',
  },
  quickFact: {
    flex: 1,
  },
  infoSection: {
    flex: 1,
  },
  infoRow: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  hr: {
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
    marginLeft: 20,
  },
  infoIcon: {
    marginRight: 20,
  },
  bottomRow: {
    height: 80,
    flexDirection: 'row',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  position: {
    color: colors.white,
    fontFamily: fonts.primaryLight,
    fontSize: 16,
    marginBottom: 3,
  },
  company: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 16,
  },
  quickInfoItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  quickInfoText: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
  },
  bottomImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
