import { useState } from "react";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Home from "./components/Home";
import "./App.css";
import { ProfileContext } from "./Contexts/ProfileContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
	const localPName = JSON.parse(localStorage.getItem("profileName"));

	const [profileName, setProfileName] = useState(
		localPName ? localPName : "default"
	);

	return (
		<Router>
			<div className='App'>
				<Navbar />
				<Switch>
					<ProfileContext.Provider
						value={{
							profileName: profileName,
							setProfileName: setProfileName,
						}}>
						<Route path='/' exact component={Home} />
						<Route path='/profile' component={Profile} />
					</ProfileContext.Provider>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
