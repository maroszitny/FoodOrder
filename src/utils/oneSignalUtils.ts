// import OneSignal from 'react-native-onesignal'
import AsyncStorage from '@react-native-community/async-storage';
const oneSignalAppKey = "9597b582-aa20-4ee9-b605-5801d19bffe2";

class OneSignalServices {
  constructor() {
    // OneSignal.init(oneSignalAppKey, {kOSSettingsKeyAutoPrompt : false});
  }
  registerDeviceToken = () => {
    // OneSignal.addEventListener('ids', async (device) => {
    //   await AsyncStorage.setItem('pushNotificationDeviceToken', JSON.stringify(device));
    // });
  };
  messageReceived = (callback) => {
    // OneSignal.addEventListener('opened', (openResult) => {
    //   callback(openResult);
    // });
  };
  getDeviceToken = async () => {
    try {
      const token = await AsyncStorage.getItem('pushNotificationDeviceToken');
      return JSON.parse(token);
    } catch (e) {
      console.log('FCM device token Error:', e);
      return null;
    }
  };
}
export const OneSignalUtils = new OneSignalServices();
