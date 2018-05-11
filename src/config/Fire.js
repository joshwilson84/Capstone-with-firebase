import firebase from 'firebase';

const config = { 
    apiKey: "AIzaSyAQs3MIjAvMwivDGhBJKpnaPbEsWZJeo1Q",
    authDomain: "home-tracker-927d1.firebaseapp.com",
    databaseURL: "https://home-tracker-927d1.firebaseio.com",
    projectId: "home-tracker-927d1",
    storageBucket: "home-tracker-927d1.appspot.com",
    messagingSenderId: "1053318301453" 
};
const fire = firebase.initializeApp(config);
export default fire;