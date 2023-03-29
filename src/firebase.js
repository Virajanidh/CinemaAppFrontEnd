import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBwVMKMt1Np_0BDxZa10hhBAfEEGeoK7y4",
    authDomain: "smart-door-ded99.firebaseapp.com",
    databaseURL: "https://smart-door-ded99-default-rtdb.firebaseio.com",
    projectId: "smart-door-ded99",
    storageBucket: "smart-door-ded99.appspot.com",
    messagingSenderId: "662893544401",
    appId: "1:662893544401:web:dcb30b04dc60ef4b6956f0",
    measurementId: "G-8H9MFJNMLY"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const db= firebase.firestore();

export { storage,db, firebase as default };