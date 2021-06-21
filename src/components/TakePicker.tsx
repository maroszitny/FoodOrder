import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Picker, Dimensions, Image} from 'react-native';
import {Text, Button, Tab, Tabs, CardItem, Card} from 'native-base';
import Modal from 'react-native-modal';
import {colors} from '../styles';
import Icon from "react-native-vector-icons/AntDesign";

export default function TakePicker(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('PICKUP');
  const [scheduleTime, setScheduleTime] = useState('');
  const [selectedType, setSelectedType] = useState('Takeout');
  const {style, title, subtitle, label, onCancel, onChange} = props;

  const openModal = () => {
    setModalVisible(true);
  };

  const onSelect = (select) => {
    setModalVisible(false);
    onChange(select);
  };

  const onApply = () => {
    const selected = option.filter((item) => item.checked);
    if (selected.length > 0) {
      setModalVisible(false);
      onChange(selected[0]);
    }
  };

  return (
    <View>
      <Modal
        isVisible={modalVisible}
        onSwipeComplete={() => {
          setModalVisible(false);
          onCancel();
        }}
        swipeDirection={['down']}
        style={styles.bottomModal}>
        <View
          style={[styles.contentFilterBottom, {backgroundColor: colors.background}]}>
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown}/>
          </View>
          <View style={styles.contentHeader}>
            <Tabs
              tabBarUnderlineStyle={{backgroundColor: colors.green}}
              tabContainerStyle={{
                elevation: 0
              }}>
              <Tab
                heading={'PICKUP'}
                tabStyle={{backgroundColor: colors.background}}
                activeTabStyle={{backgroundColor: colors.background}}
                textStyle={{color: colors.textInputColor}}
                activeTextStyle={{color: colors.textInputColor}}
              >
              </Tab>
              <Tab
                heading={'DELIVERY'}
                tabStyle={{backgroundColor: colors.background}}
                activeTabStyle={{backgroundColor: colors.background}}
                textStyle={{color: colors.textInputColor}}
                activeTextStyle={{color: colors.textInputColor}}
              >
                <View>
                  <Text>Tab2</Text>
                </View>
              </Tab>
            </Tabs>
          </View>
          <View style={styles.contentBody}>
            <View style={{height: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{flex: 0.5, marginEnd: 10}}>Schedule Time</Text>
              <Picker
                selectedValue={scheduleTime}
                style={{height: 40, flex: 0.5}}
                onValueChange={(itemValue, itemIndex) => setScheduleTime(itemValue)}
              >
                <Picker.Item label="ASAP" value="ASAP"/>
                <Picker.Item label="11:15 AM" value="11:15 AM"/>
                <Picker.Item label="11:30 AM" value="11:30 AM"/>
                <Picker.Item label="11:45 AM" value="11:45 AM"/>
                <Picker.Item label="12:00 PM" value="12:00 PM"/>
              </Picker>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Button
                style={[styles.takeButton, selectedType === 'Takeout' ? styles.activeTakeButton: null]}
                onPress={() => setSelectedType('Takeout')}>
                <Icon name={'edit'} color={colors.darkRed} size={19} />
                <Text style={styles.takeButtonText}>Takeout</Text>
              </Button>
              <Button
                style={[styles.takeButton, selectedType === 'Tableseat' ? styles.activeTakeButton: null]}
                onPress={() => setSelectedType('Tableseat')}>
                <Icon name={'edit'} color={colors.darkRed} size={19} />
                <Text style={styles.takeButtonText}>Tableseat</Text>
              </Button>
              <Button
                style={[styles.takeButton, selectedType === 'Curbside' ? styles.activeTakeButton: null]}
                onPress={() => setSelectedType('Curbside')}>
                <Icon name={'edit'} color={colors.darkRed} size={19} />
                <Text style={styles.takeButtonText}>Curbside</Text>
              </Button>
            </View>
          </View>

          <Button
            full
            rounded
            style={{marginTop: 10, marginBottom: 20, backgroundColor: colors.yellowDark}}
            onPress={() => setModalVisible(false)}>
            <Text style={{color: colors.ButtonTextColor}}>Confirm</Text>
          </Button>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.contentForm, {
          backgroundColor: colors.background,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }, style]}
        onPress={() => openModal()}>
        <Card style={{marginBottom: 10}}>
          <CardItem>
            <View style={{backgroundColor: colors.white, flexDirection: 'row'}}>
              <Image
                source={{uri: 'https://storage.googleapis.com/fav-ordering.appspot.com/6D6Z5BD6F1WBK/H4JVSYWVE11XW/logo.png'}}
                style={{width: 65, height: 65}}
              />
              <View style={{flex: 1, marginHorizontal: 10, justifyContent: 'space-between'}}>
                <View style={{}}>
                  <Text>{selectedTab}</Text>
                  <Text>{scheduleTime}</Text>
                  <Text>{selectedType}</Text>
                </View>
              </View>
            </View>
          </CardItem>
        </Card>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  contentForm: {
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'flex-start',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  contentFilterBottom: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 20,
  },
  contentSwipeDown: {
    paddingTop: 10,
    alignItems: 'center',
  },
  contentHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'flex-start',
    marginTop: 20
  },
  contentSubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  contentBodyIcon: {
    width: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentBody: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 10,
    height: 250
  },
  takeButton: {
    margin: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width / 3 - 30,
    height: Dimensions.get('screen').width / 3 - 30,
    backgroundColor: colors.background
  },
  activeTakeButton : {
    backgroundColor: colors.yellow,
  },
  takeButtonText: {
    color: colors.textInputColor,
    fontSize: 12,
  },
  contentBodyTailer: {},
  lineSwipeDown: {
    width: 30,
    height: 2.5,
    backgroundColor: colors.gray,
  },
  contentActionModalBottom: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
});

const pickerSelectStyles = (colors) => StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderColor: colors.textInputColor,
    borderRadius: 4,
    color: colors.textInputColor,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 0,
    borderColor: colors.textInputColor,
    borderRadius: 8,
    color: colors.textInputColor,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 18,
    right: 5,
  },
});
