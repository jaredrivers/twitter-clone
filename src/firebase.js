import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "@firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const app = firebase.initializeApp({
	apiKey: "AIzaSyAp6J3VNvKeHIvxNv8qAXLImDbpP8_Zc0U",
	authDomain: "reactproject2-e2b07.firebaseapp.com",
	projectId: "reactproject2-e2b07",
	storageBucket: "reactproject2-e2b07.appspot.com",
	messagingSenderId: "730309309814",
	appId: "1:730309309814:web:113d1a36a042a62b3f7657",
});

export const db = getFirestore(app);
export const auth = app.auth();
export default app;
