import firebase from "firebase/app";
import 'firebase/firestore';
//api 驗證金鑰
const firebaseConfig = {
  apiKey: "AIzaSyAJk3PJyEaUBafsq5tudq6SPDWOZ48MHKs",
  authDomain: "trellofirebase.firebaseapp.com",
  projectId: "trellofirebase",
  storageBucket: "trellofirebase.appspot.com",
  messagingSenderId: "176938608888",
  appId: "1:176938608888:web:2f9b23b0569c67b689b30d",
  measurementId: "G-HZGH4Y7SRY"
};
// 驗證
firebase.initializeApp(firebaseConfig);
// 驗證完成後即可連線至 Firebase
const db = firebase.firestore();
export default db;
  