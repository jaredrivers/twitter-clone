import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { TweetContext } from "../contexts/TweetContext";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import renderTweets from "../functions/renderTweets";

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

function TweetFeed() {
	const { sentTweet, setSentTweet, submitState } = useContext(TweetContext);
	const [limitNumber, setLimitNumber] = useState(6);

	//Pageination
	window.onscroll = function () {
		if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
			console.log("bottom");
			setLimitNumber((prev) => prev + 5);
			console.log(limitNumber);
		}
	};

	useEffect(() => {
		const getTweets = async () => {
			try {
				const querySnapshot = await getDocs(
					query(
						collection(db, "tweets"),
						orderBy("date", "desc"),
						limit(limitNumber)
					)
				);
				const tweets = querySnapshot.docs.map((doc) => {
					return doc.data();
				});
				const tweetList = tweets;
				setSentTweet(tweetList);
			} catch (err) {
				console.log(err);
			}
		};
		getTweets();
	}, [limitNumber]);

	///set list of tweets to what is in database to be mapped over
	const tweetFetch = async () => {
		try {
			const querySnapshot = await getDocs(
				query(
					collection(db, "tweets"),
					orderBy("date", "desc"),
					limit(limitNumber)
				)
			);
			const tweets = querySnapshot.docs.map((doc) => {
				return doc.data();
			});
			const tweetList = tweets;
			setSentTweet(tweetList);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		tweetFetch();
	}, [submitState]);

	return (
		<List>
			{sentTweet &&
				sentTweet.map((tweet) => {
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
