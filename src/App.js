import { useState } from "react";
import TweetForm from "./components/TweetForm";
import TweetFeed from "./components/TweetFeed";

import "./App.css";

function App() {
	const [createTweet, setCreateTweet] = useState();
	const [sentTweet, setSentTweet] = useState([]);

	return (
		<div className='App'>
			<TweetForm
				sentTweet={sentTweet}
				setSentTweet={setSentTweet}
				createTweet={createTweet}
				setCreateTweet={setCreateTweet}
			/>
			<TweetFeed sentTweet={sentTweet} />
		</div>
	);
}

export default App;
