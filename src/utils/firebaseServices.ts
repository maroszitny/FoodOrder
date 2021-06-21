import firestore from '@react-native-firebase/firestore';

class FirebaseServices {
  userRef: any;
  chatRef: any;
  constructor() {
    this.userRef = firestore().collection('user');
    this.chatRef = firestore().collection('chat');
  }
}
export const FirebaseUtils = new FirebaseServices();
