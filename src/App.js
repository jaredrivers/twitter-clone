import { useState } from "react";
import Profile from "./components/Profile";
import Home from "./components/Home";
import "./App.css";
import { ProfileContext } from "./contexts/ProfileContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
	const [profileName, setProfileName] = useState("");

	return (
		<Router>
			<div className='App'>
				<AuthProvider>
					<Switch>
						<Route exeact path='/login' component={Login} />
						<ProfileContext.Provider
							value={{
								profileName: profileName,
								setProfileName: setProfileName,
							}}>
							<Route exeact path='/signup' component={Signup} />
							<PrivateRoute exact path='/' component={Home} />
							<PrivateRoute exact path='/profile' component={Profile} />
						</ProfileContext.Provider>
					</Switch>
				</AuthProvider>
			</div>
		</Router>
	);
}

export default App;
