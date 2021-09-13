import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyDDPVcUsPPQbxS-yIk11QT5qxioSH0ISoM",
   authDomain: "text-me-9f5b4.firebaseapp.com",
   projectId: "text-me-9f5b4",
   storageBucket: "text-me-9f5b4.appspot.com",
   messagingSenderId: "599759636206",
   appId: "1:599759636206:web:af569ce13cef04315c95ff",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
