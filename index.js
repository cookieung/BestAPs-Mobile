import { AppRegistry } from 'react-native';
import * as firebase from 'firebase';
import App from './App';
var config = {
    apiKey: "AIzaSyDHHEdGDvbIldPBO2iOycWkwf_pRdBVsUg",
    authDomain: "bestaps-ed78e.firebaseapp.com",
    databaseURL: "https://bestaps-ed78e.firebaseio.com",
    projectId: "bestaps-ed78e",
    storageBucket: "",
    messagingSenderId: "187026676531"
  };
  firebase.initializeApp(config);
AppRegistry.registerComponent('BestAp', () => App);
