// import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
// import { db } from "../firebase";
// import { TweetContext } from "../contexts/TweetContext";
// import { useContext } from "react";

// const { sentTweet, setSentTweet, submitState } = useContext(TweetContext);

// export default tweetFetch = async () => {
// 	try {
// 		const querySnapshot = await getDocs(
// 			query(
// 				collection(db, "tweets"),
// 				orderBy("date", "desc"),
// 				limit(limitNumber)
// 			)
// 		);
// 		const tweets = querySnapshot.docs.map((doc) => {
// 			return doc.data();
// 		});
// 		const tweetList = tweets;
// 		setSentTweet(tweetList);
// 	} catch (err) {
// 		console.log(err);
// 	}
// };
