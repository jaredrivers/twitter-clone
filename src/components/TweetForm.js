import React, { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { TweetContext } from "../contexts/TweetContext";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const Form = styled.form`
	border: none;
	background-color: #15202b;
	border-radius: 6px;
`;

const Textarea = styled.textarea`
	height: 5rem;
	padding: 1rem;
	resize: none;
	width: 100%;
	height: 7rem;
	background-color: #15202b;
	color: white;
	border-radius: 6px;
	outline: none;
	font-size: 1.2rem;
	border: none;
	::placeholder {
		color: #cccccc;
	}
`;

const Button = styled.button`
	align-self: end;
	padding: 0.5rem;
	margin: 1rem;
	border: none;
	font-size: 1rem;
	border-radius: 4px;
	color: white;
	font-weight: 550;
	background-color: #007bff;
	cursor: pointer;
	margin-left: auto;
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
const LowerDiv = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	background-color: #15202b;
	border-radius: 0 0 6px 6px;
`;
const Warning = styled.div`
	flex-grow: 1;
	text-align: center;
	color: red;
`;

function TweetForm() {
	const auth = getAuth();
	const user = auth.currentUser;
	const {
		createTweet,
		setCreateTweet,
		sentTweet,
		setSentTweet,
		setSubmitState,
	} = useContext(TweetContext);
	const [warn, setWarn] = useState(false);
	const [disabled, setDisabled] = useState(true);

	const changeHandler = (e) => {
		console.log(e.target.value.length);
		if (e.target.value.length === 0) {
			setDisabled(true);
		} else if (e.target.value.length > 140) {
			setWarn(true);
			setDisabled(true);
		} else {
			setWarn(false);
			setDisabled(false);
		}
		setCreateTweet(e.target.value);
	};
	const submitHandler = async () => {
		setDisabled(true);
		const date = new Date().toISOString();

		setSentTweet([
			...sentTweet,
			{ content: createTweet, userName: user.displayName, date: date },
		]);

		try {
			const docRef = await addDoc(collection(db, "tweets"), {
				content: createTweet,
				userName: user.displayName,
				date: date,
			});
		} catch (err) {
			console.log(err.response);
		}
		setCreateTweet("");
		setSubmitState((prev) => !prev);
		setDisabled(false);
	};

	return (
		<div className='formWrapper'>
			<Form className='tweetForm' name='tweetForm' id='tweetForm'>
				<Textarea
					className='textArea'
					id='textArea'
					name='textarea'
					placeholder='What do you have in mind...'
					onChange={changeHandler}
					required
					value={createTweet}></Textarea>
			</Form>
			<LowerDiv>
				{warn && <Warning>Tweet has exceeded 140 characters...</Warning>}
				<Button
					type='submit'
					name='sendTweet'
					className='sendTweet'
					id='sendTweet'
					disabled={disabled}
					onClick={submitHandler}>
					Tweet
				</Button>
			</LowerDiv>
		</div>
	);
}

export default TweetForm;
