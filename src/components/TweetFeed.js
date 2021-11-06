import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const List = styled.ul`
	width: 50%;
	display: flex;
	flex-direction: column;
	margin: auto;
	overflow-x: hidden;
`;

const TweetDiv = styled.div`
	border-radius: 8px;
	padding: 1rem 2rem;
	background-color: #343a40;
	margin: 0.4rem 0;
	color: white;
	height: 100px;
`;

const Upper = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 0.8rem;
	margin: 0.3rem 0;
	width: 100%;
`;

const Username = styled.p`
	color: #6c757d;
`;
const TDate = styled.p`
	color: #6c757d;
`;
const Tvalue = styled.p`
	margin: 0.5rem 0.5rem 1rem 0.5rem;
`;

function TweetFeed({ sentTweet, setSentTweet }) {
	const [displayedTweets, setDisplayedTweets] = useState([]);

	const tweetFetch = async () => {
		try {
			const tweetObject = await axios.get(
				`https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet`
			);
			const tweetList = tweetObject.data.tweets;
			setDisplayedTweets(tweetList);
		} catch {}
	};

	useEffect(() => {
		tweetFetch();
	}, []);

	return (
		<List>
			{displayedTweets.map((tweet) => {
				return (
					<TweetDiv key={tweet.id}>
						<Upper>
							<Username>{tweet.userName}</Username>
							<TDate>{tweet.date}</TDate>
						</Upper>
						<Tvalue>{tweet.content}</Tvalue>
					</TweetDiv>
				);
			})}
		</List>
	);
}

export default TweetFeed;
