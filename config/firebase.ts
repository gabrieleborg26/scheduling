import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

let firebaseConfig;

firebaseConfig = {
    apiKey: "AIzaSyD0_4GIW8P7ku4-JoWZd73GyHnzqddBYJY",
    authDomain: "shecduling.firebaseapp.com",
    projectId: "shecduling",
    storageBucket: "shecduling.appspot.com",
    messagingSenderId: "463101118330",
    appId: "1:463101118330:web:dcec17cb5477e3620178c3",
    measurementId: "G-FLT1P3RL5H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
export {auth}