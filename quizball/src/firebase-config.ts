// firebase-config.ts
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDN3u-nLXGHHqwgNgs-jlqLXUQ5-CqJGZY",
    authDomain: "quizball-project.firebaseapp.com",
    databaseURL: "https://quizball-project-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "quizball-project",
    storageBucket: "quizball-project.appspot.com",
    messagingSenderId: "642081605780",
    appId: "1:642081605780:web:7dd71b31e9135595ea0c81",
    measurementId: "G-NSJ9LYP634"
  };

  const app = initializeApp(firebaseConfig);

export const storage: any = getStorage(app);
