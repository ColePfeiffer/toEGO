import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBK521Zh0AtzPUMBfbggY6o583IEPbpv6Q",
  authDomain: "toego---diary-app.firebaseapp.com",
  projectId: "toego---diary-app",
  storageBucket: "toego---diary-app.appspot.com",
  messagingSenderId: "98064654113",
  appId: "1:98064654113:web:6e9e996f05a070dafe6860",
  measurementId: "G-CGDVL0EGFL",
  databaseURL:
    "https://toego---diary-app-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDb = getDatabase(firebaseApp);
//const analytics = getAnalytics(firebaseApp);

export { firebaseApp, firebaseAuth, firebaseDb };
