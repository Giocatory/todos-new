// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJyB00c8vJmlJhCQmJXoOLgIiiDuhmHLI",
  authDomain: "todos-f8f05.firebaseapp.com",
  projectId: "todos-f8f05",
  storageBucket: "todos-f8f05.appspot.com",
  messagingSenderId: "884776039092",
  appId: "1:884776039092:web:d1a69fb5e001751db65de1",
  measurementId: "G-4X3ZD6C0VN",
  databaseURL: "https://todos-f8f05-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;