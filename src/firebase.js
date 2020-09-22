import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBPrnnXtOtOxv8-QLhq3i7xqdsN43Qu9xo",
  authDomain: "instagram-clone-5a8c6.firebaseapp.com",
  databaseURL: "https://instagram-clone-5a8c6.firebaseio.com",
  projectId: "instagram-clone-5a8c6",
  storageBucket: "instagram-clone-5a8c6.appspot.com",
  messagingSenderId: "545119809395",
  appId: "1:545119809395:web:1d6b46b4bd192063945f06",
  measurementId: "G-8E0C0JJFRS",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
