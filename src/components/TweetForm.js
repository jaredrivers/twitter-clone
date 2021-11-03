import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react";

const Form = styled.form`
	border: none;
	background-color: #e7e7e7;
	border-radius: 8px;
`;

const Textarea = styled.textarea`
	height: 5rem;
	padding: 1rem;
	border: none;
	resize: none;
	width: 100%;
	height: 7rem;
	background-color: #e7e7e7;
	color: black;
	border-radius: 8px;
	outline: none;
	font-size: 1.2rem;
`;

const Button = styled.button`
	align-self: end;
	padding: 0.5rem;
	margin: 1rem;
	border: none;
	font-size: 1rem;
	border-radius: 5px;
	color: white;
	font-weight: 550;
	background-color: #710117;
	cursor: pointer;
	margin-left: auto;
`;
const LowerDiv = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
`;
const Warning = styled.div`
	flex-grow: 1;
	text-align: center;
	color: red;
`;

function TweetForm({ createTweet, setCreateTweet, sentTweet, setSentTweet }) {
	const [warn, setWarn] = useState(false);

	const changeHandler = (e) => {
		if (e.target.value.length > 140) {
			setWarn(true);
		} else {
			setWarn(false);
		}
		setCreateTweet(e.target.value);
	};

	const submitHandler = () => {
		const date = new Date().toISOString();

		setSentTweet([
			...sentTweet,
			{
				content: createTweet,
				userName: "jaredriver",
				date: date,
			},
		]);
		axios.post(serverURL, sentTweet[sentTweet.length - 1]);
		setCreateTweet("");
	};

	const serverURL =
		"https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet";

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
					onClick={submitHandler}>
					Tweet
				</Button>
			</LowerDiv>
		</div>
	);
}

export default TweetForm;
