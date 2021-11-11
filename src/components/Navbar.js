import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Nav = styled.div`
	display: flex;
	margin: 0 0 1rem 0;
	background-color: #343a40;
	width: 70%;
	margin: auto;
	border-radius: 6px;
`;
const Links = styled.ul`
	display: flex;
`;
const Navlink = styled.p`
	text-decoration: none;
	margin: 0 1rem;
	padding: 1rem;
`;

const Log = styled.button`
	margin: 0 1rem 0 auto;
	border: none;
	background-color: #343a40;
	color: white;
	font-size: 1rem;
	> svg {
		margin-right: 0.3rem;
	}
	:hover {
		cursor: pointer;
	}
`;

function Navbar() {
	const linkStyle = {
		textDecoration: "none",
		color: "white",
	};
	const [error, setError] = useState("");
	const { logout } = useAuth();
	const history = useHistory();
	async function logoutHandler() {
		setError("");
		try {
			await logout();
			history.push("/login");
		} catch {
			setError("Failed to log out.");
		}
	}

	return (
		<Nav>
			<Links>
				<Link to='/' style={linkStyle}>
					<Navlink>Home</Navlink>
				</Link>
				<Link to='/profile' style={linkStyle}>
					<Navlink>Profile</Navlink>
				</Link>
				<Link to='/profile'></Link>
			</Links>
			<Log onClick={logoutHandler}>
				<FontAwesomeIcon icon={faSignOutAlt} />
				Log Out
			</Log>
		</Nav>
	);
}

export default Navbar;
