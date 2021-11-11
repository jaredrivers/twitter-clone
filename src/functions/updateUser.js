import { db } from "../firebase";
import { setDoc, doc } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

export default async function updateUser(id, email, username) {
	const auth = getAuth();
	const user = auth.currentUser;
	const docRef = doc(db, "users", id);
	const payload = { id: id, email: email, username: username };
	await setDoc(docRef, payload);
}
