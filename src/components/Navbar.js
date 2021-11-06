import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

function Navbar() {
	const linkStyle = {
		"text-decoration": "none",
		color: "white",
	};

	return (
		<Nav>
			<Links>
				<Link to='/' style={linkStyle}>
					<Navlink>Home</Navlink>
				</Link>
				<Link to='/profile' style={linkStyle}>
					<Navlink>Profile</Navlink>
				</Link>
			</Links>
		</Nav>
	);
}

export default Navbar;
