import { useState } from "react";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Home from "./components/Home";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className='App'>
				<Navbar />
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/profile' component={Profile} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
