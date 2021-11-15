import React, { useContext, useEffect, useRef, useState } from "react";
import { ProfileContext } from "../contexts/ProfileContext";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { getAuth, updateProfile } from "firebase/auth";
import Navbar from "./Navbar";
import updateUser from "../functions/updateUser";
import { db } from "../firebase";
import { onSnapshot, collection, doc, getDoc } from "@firebase/firestore";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import { getApp } from "firebase/app";

const PageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 60%;
	margin: auto;
	align-items: center;
	height: 100vh;
`;

const Title = styled.p`
	font-size: 2rem;
	color: white;
	margin: 2rem 0 1rem 0;
`;
const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 50%;
	justify-content: center;
	border-left: 1px solid grey;
	padding: 2rem;
	margin-left: 1rem;
`;
const Input = styled.input`
	border: 2px solid #cccccc;
	background-color: #15202b;
	border-radius: 6px;
	padding: 1rem;
	color: white;
	font-size: 1rem;
	margin: 0.7rem 0;
	outline: none;
`;
const Button = styled.button`
	background-color: #007bff;
	border-radius: 4px;
	border: none;
	color: white;
	margin-right: 0.7rem;
	cursor: pointer;
	font-size: 1rem;
	padding: 0.5rem;
	width: 70%;
	:disabled {
		opacity: 50%;
		cursor: auto;
		:hover {
			background-color: #007bff;
		}
	}
	:hover {
		background-color: #006ee5;
	}
`;
const Subtitle = styled.p`
	color: white;
	font-size: 1.2rem;
	margin-top: 0.7rem;
`;
const PhotoDiv = styled.div`
	margin: 1rem;
	display: flex;
	border: 2px solid #cccccc;
	color: white;
	border-radius: 6px;
	width: 50%;
	flex-direction: column;
	height: 15rem;
	justify-content: center;
	height: auto;
	width: auto;
`;
const ImgDiv = styled.div`
	display: flex;
	padding: 1rem;
	height: auto;
	width: auto;
	> img {
		height: auto;
		width: auto;
		max-width: 200px;
		max-height: 200px;
		margin: auto;
	}
`;

const UpperDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

function Profile() {
	const firebaseApp = getApp();
	const { currentUser } = useAuth();
	const auth = getAuth();
	const user = auth.currentUser;
	const { profileName, setProfileName } = useContext(ProfileContext);
	const profileRef = useRef();
	const [submit, setSubmit] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [img, setImg] = useState(null);
	const [url, setURL] = useState("");
	const storage = getStorage();

	const submitHandler = (e) => {
		e.preventDefault();
		setDisabled(true);
		setSubmit(true);
		updateProfile(auth.currentUser, {
			displayName: profileRef.current.value,
		})
			.then(() => {
				setSubmit(false);
				setDisabled(false);
			})
			.catch((error) => {
				error(error);
				setSubmit(false);
				setDisabled(false);
			});
	};
	const changeHandler = (e) => {
		if (e.target.value.length > 0) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	};

	const photoChangeHandler = (e) => {
		if (e.target.files[0]) {
			setImg(e.target.files[0]);
		}
	};

	async function uploadHandler() {
		setSubmit(true);
		const storageRef = ref(storage, `users/${user.uid}/profileImg`);
		const uploadTask = uploadBytesResumable(storageRef, img);
		uploadTask.on(
			"state_changed",
			(snapshot) => {},
			(error) => {
				console.log(error, error.message);
				setSubmit(false);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					updateProfile(auth.currentUser, {
						photoURL: downloadURL,
					});
					setURL(downloadURL);
					console.log(url);
					setSubmit(false);
				});
			}
		);
	}

	useEffect(() => {
		{
			!url && setURL(user.photoURL);
		}
	}, []);

	return (
		<>
			<Navbar />
			<PageWrapper>
				<UpperDiv>
					<Title>My Profile</Title>
					<hr style={{ color: "#cccccc", width: "80vw" }} />
				</UpperDiv>
				<div style={{ display: "flex", "margin-top": "7rem" }}>
					<PhotoDiv>
						<ImgDiv>
							{url && (
								<img src={url} alt='profile photo' name='profile photo' />
							)}
						</ImgDiv>
						<div
							style={{
								marginTop: "auto",
								display: "flex",
								"flex-direction": "column",
							}}>
							<label for='file-upload'>
								{url ? "Change profile photo" : "Upload a profile photo"}
							</label>
							<input
								id='file-upload'
								type='file'
								onChange={photoChangeHandler}
								disabled={submit}
							/>
						</div>
						<button disabled={submit} onClick={uploadHandler}>
							Upload
						</button>
					</PhotoDiv>
					<Form>
						{user.displayName ? (
							<h3 style={{ color: "white" }}>Username: {user.displayName}</h3>
						) : (
							<h3 style={{ color: "white" }}>Username: None</h3>
						)}
						<Input
							name='input'
							text='change photo'
							placeholder={
								user.displayName ? user.displayName : "Please set username..."
							}
							ref={profileRef}
							onChange={changeHandler}
							autocomplete='off'></Input>
						<Button type='submit' onClick={submitHandler} disabled={disabled}>
							{user.displayName ? "Change username" : "Set username"}
						</Button>
					</Form>
				</div>
			</PageWrapper>
		</>
	);
}

export default Profile;
