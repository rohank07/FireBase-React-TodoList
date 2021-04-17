// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import config from "./config.js"

  import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: config.apiKey,
    authDomain: "todo-app-2fb49.firebaseapp.com",
    projectId: "todo-app-2fb49",
    storageBucket: "todo-app-2fb49.appspot.com",
    messagingSenderId: "422778139217",
    appId: "1:422778139217:web:09b6fbcc66778ef06c3e70",
    measurementId: "G-63JMW3EESB"
  });

  const db = firebaseApp.firestore();
  export default db;
