import React from "react";
import { useState } from "react";
import TweetFeed from "./TweetFeed";
import TweetForm from "./TweetForm";
import { TweetContext } from "../contexts/TweetContext";
import Navbar from "./Navbar";

function Home() {
	const [createTweet, setCreateTweet] = useState();
	const [sentTweet, setSentTweet] = useState([]);
	const [submitState, setSubmitState] = useState(false);

	return (
		<>
			<Navbar />
			<TweetContext.Provider
				value={{
					createTweet: createTweet,
					setCreateTweet: setCreateTweet,
					sentTweet: sentTweet,
					setSentTweet: setSentTweet,
					submitState: submitState,
					setSubmitState: setSubmitState,
				}}>
				<TweetForm />
				<TweetFeed />
			</TweetContext.Provider>
		</>
	);
}

export default Home;
