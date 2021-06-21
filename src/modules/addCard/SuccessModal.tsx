import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Platform,
  Image,
  Dimensions,
  Text
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import SMContent from "../../components/SMContent";
import {colors} from '../../styles';
import {Button} from "native-base";


export default function SuccessModal({modalVisible, closeModal}) {
  return (
    <Modal
      animationType={null} transparent={true}
      visible={modalVisible}
      onRequestClose={() => { console.log("Modal has been closed.") }}
    >
      <SMContent noPadding>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: Dimensions.get('window').height - 150}}>
          <MapView
            style={{height: Dimensions.get('window').height / 1.5, width: '100%'}}
            mapType="standard"
            initialCamera={{
              center: {latitude: 48.290165, longitude: 18.10167},
              pitch: 5,
              heading: 5,
              altitude: 1200,
              zoom: 12
            }}
          >
            <Marker
              coordinate={{
                latitude: 48.290165,
                longitude: 18.10167,
              }}
            />
          </MapView>
          <Text style={{color: colors.green, fontSize: 25, fontWeight: 'bold'}}>Payment Success!</Text>
          <Text style={{color: colors.textInputColor, fontSize: 15}}>Your order will be delivered soon.</Text>
          <Button full rounded style={{backgroundColor: colors.yellowDark, marginVertical: 10}} onPress={() => closeModal()}>
            <Text style={{color: colors.ButtonTextColor}}>Close</Text>
          </Button>
        </View>
      </SMContent>
    </Modal>
  );
}
