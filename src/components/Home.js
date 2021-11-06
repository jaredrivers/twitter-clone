import React from "react";
import { useState } from "react";
import TweetFeed from "./TweetFeed";
import TweetForm from "./TweetForm";
import { TweetContext } from "../Contexts/TweetContext";

function Home() {
	const [createTweet, setCreateTweet] = useState();
	const [sentTweet, setSentTweet] = useState([]);
	const [submitState, setSubmitState] = useState(false);

	return (
		<div>
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
		</div>
	);
}

export default Home;
