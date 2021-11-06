import React from "react";
import { useState } from "react";
import TweetFeed from "./TweetFeed";
import TweetForm from "./TweetForm";

function Home() {
	const [createTweet, setCreateTweet] = useState();
	const [sentTweet, setSentTweet] = useState([]);

	return (
		<div>
			<TweetForm
				sentTweet={sentTweet}
				setSentTweet={setSentTweet}
				createTweet={createTweet}
				setCreateTweet={setCreateTweet}
			/>
			<TweetFeed sentTweet={sentTweet} setSentTweet={setSentTweet} />
		</div>
	);
}

export default Home;
