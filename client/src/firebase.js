import firebase from 'firebase/app';
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBpoHtUCl-0T4Mp04nXM-OJ5aPDOKKz3ks",
    authDomain: "ecommerce-9a3d1.firebaseapp.com",
    projectId: "ecommerce-9a3d1",
    storageBucket: "ecommerce-9a3d1.appspot.com",
    messagingSenderId: "232984534919",
    appId: "1:232984534919:web:22acc78b1bf9dab366fd22"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //export 
  export const auth = firebase.auth();
  export const googleAuthProvider=new firebase.auth.GoogleAuthProvider();

  

