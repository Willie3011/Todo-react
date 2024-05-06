import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl39A9Vkia8cTcJNYfBR9Oc2OSS2xUkms",
  authDomain: "react-todo-1b219.firebaseapp.com",
  projectId: "react-todo-1b219",
  storageBucket: "react-todo-1b219.appspot.com",
  messagingSenderId: "425556678244",
  appId: "1:425556678244:web:5acd3d879b810301db7171"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

