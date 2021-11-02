import React from "react";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";

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
`;

function TweetForm({ createTweet, setCreateTweet, sentTweet, setSentTweet }) {
	const changeHandler = (e) => {
		setCreateTweet(e.target.value);
	};

	const submitHandler = () => {
		const date = new Date().toISOString();

		setSentTweet([
			...sentTweet,
			{
				value: createTweet,
				username: "jaredriver",
				key: createTweet + Math.random() * 100,
				timeStamp: date,
			},
		]);
		setCreateTweet("");
	};

	return (
		<div className='formWrapper'>
			<Form className='tweetForm' name='tweetForm' id='tweetForm'>
				<Textarea
					className='textArea'
					id='textArea'
					name='textarea'
					maxlength='140'
					placeholder='What do you have in mind...'
					onChange={changeHandler}
					required
					value={createTweet}></Textarea>
			</Form>
			<Button
				type='submit'
				name='sendTweet'
				className='sendTweet'
				id='sendTweet'
				onClick={submitHandler}>
				Tweet
			</Button>
		</div>
	);
}

export default TweetForm;
