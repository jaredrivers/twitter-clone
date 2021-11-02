import React from "react";
import styled from "styled-components";

const List = styled.ul`
	width: 50%;
	display: flex;
	flex-direction: column;
	margin: auto;
`;

const TweetDiv = styled.div`
	border-radius: 8px;
	padding: 0.5rem 0.5rem 0 0.5rem;
	background-color: #f5eadd;
	border: 3px solid #710117;
	margin: 0.4rem 0;
`;

const Upper = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 0.8rem;
	margin: 0.3rem 0;
	width: 100%;
`;

const Username = styled.p``;

const Tvalue = styled.p`
	margin: 0.5rem 0.5rem 1rem 0.5rem;
`;

function TweetFeed({ sentTweet }) {
	return (
		<List>
			{sentTweet.map((tweet) => {
				return (
					<TweetDiv key={tweet.key}>
						<Upper>
							<Username>{tweet.username}</Username>
							<p>{tweet.timeStamp}</p>
						</Upper>
						<Tvalue>{tweet.value}</Tvalue>
					</TweetDiv>
				);
			})}
		</List>
	);
}

export default TweetFeed;
