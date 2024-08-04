import * as firebase from 'src/shared/service/firebase';
import {firebaseConfig} from './firebase-config';

let instance = null;
class FirebaseService {
  init() {
    if (!instance) {
      this.app = firebase.initializeApp(firebaseConfig);
      instance = this;
    }
  }

  login(params) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(params.email, param.password);
  }

  signup(params) {
    // console.log(params);
    return firebase
      .auth()
      .createUserWithEmailAndPassword(params.email, params.password);
  }

  saveUserInfo(params) {
    return firebase.database().ref('Users').child(params.uid).set(params);
  }
}

const firebaseService = new FirebaseService();

export default firebaseService;
