import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { TweetContext } from "../contexts/TweetContext";
import {
	doc,
	getDoc,
	setDoc,
	collection,
	getDocs,
	query,
	orderBy,
	limit,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

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
	display: flex;
	flex-direction: column;
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
	margin: 0.5rem 0.5rem 0 0.5rem;
`;

const HeartButton = styled.button`
	align-self: flex-end;
	background-color: #343a40;
	border: none;
	font-size: 1.2rem;
	:hover {
		cursor: pointer;
	}
`;

function TweetFeed() {
	const { sentTweet, setSentTweet, submitState } = useContext(TweetContext);
	const [limitNumber, setLimitNumber] = useState(6);
	const [likedTweets, setLikedTweets] = useState([]);
	const auth = getAuth();
	const user = auth.currentUser;
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
				setSentTweet(
					querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
				);
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
			try {
			} catch (err) {
				console.log(err.message);
			}
			setSentTweet(
				querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		tweetFetch();
	}, [submitState]);

	async function clickHandler(userId, tweetId, username, date, content) {
		const tweetInfo = {
			user: userId,
			id: tweetId,
			user: username,
			date: date,
			content: content,
		};
		try {
			const docRef = doc(db, "users", userId, "liked_tweets", tweetId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				await deleteDoc(doc(db, "users", userId, "liked_tweets", tweetId));
			} else {
				setDoc(doc(db, "users", userId, "liked_tweets", tweetId), tweetInfo);
			}
			const querySnapshot = await getDocs(
				collection(db, "users", user.uid, "liked_tweets")
			);

			setLikedTweets(querySnapshot.docs.map((tweet) => tweet.id));
		} catch (err) {
			console.log(err.message, err);
		}
	}

	//sets which hearts should be colored on page load
	async function loadHearts() {
		const querySnapshot = await getDocs(
			collection(db, "users", user.uid, "liked_tweets")
		);

		setLikedTweets(querySnapshot.docs.map((tweet) => tweet.id));
	}
	useEffect(() => {
		loadHearts();
	}, []);

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
							<HeartButton
								onClick={() =>
									clickHandler(
										user.uid,
										tweet.id,
										tweet.userName,
										tweet.date,
										tweet.content
									)
								}>
								<FontAwesomeIcon
									icon={faHeart}
									className={
										likedTweets.includes(tweet.id) ? "liked" : "not-liked"
									}
								/>
							</HeartButton>
						</TweetDiv>
					);
				})}
		</List>
	);
}

export default TweetFeed;
