import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyCRtjYclq4c7RNNrPgsar1yajq5ouzv4cM",
//     authDomain: "voice-chat-app-storage.firebaseapp.com",
//     projectId: "voice-chat-app-storage",
//     storageBucket: "voice-chat-app-storage.appspot.com",
//     messagingSenderId: "764808987412",
//     appId: "1:764808987412:web:f51642fbd5b1a8355eb801"
// };

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


