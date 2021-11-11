import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Card = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	margin: 1rem auto;
	align-items: center;
	border: 1px solid white;
	border-radius: 6px;
`;
const Header = styled.h2`
	color: #007bff;
	font-size: 2rem;
	margin: 3rem 0;
`;
const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Email = styled.input`
	height: 3rem;
	border-radius: 6px;
	padding: 0.5rem;
	background-color: #15202b;
	border: 2px solid #cccccc;
	font-size: 1.3rem;
	color: white;
`;
const Password = styled.input`
	height: 3rem;
	border-radius: 6px;
	padding: 0.5rem;
	background-color: #15202b;
	border: 2px solid #cccccc;
	font-size: 1.3rem;
	color: white;
	margin-bottom: 2rem;
`;
const labels = {
	color: "white",
	fontSize: "1.6rem",
	margin: ".7rem 0",
	alignSelf: "flex-start",
};
const Submit = styled.button`
	background-color: #007bff;
	font-size: 1.3rem;
	padding: 0.5rem 1rem;
	border-radius: 4px;
	border: none;
	color: white;
	cursor: pointer;
	:disabled {
		opacity: 50%;
		cursor: auto;
		:hover {
			background-color: #007bff;
		}
	}
	:hover {
		background-color: #006ee5;
	}
	margin-bottom: 1rem;
`;
const Alert = styled.h2`
	color: red;
	font-size: 0.8rem;
	margin-top: 0.3rem;
`;
const Div = styled.p`
	margin: auto;
	text-align: center;
	color: white;
	> a {
		color: #007bff;
	}
`;

function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			history.push("/");
		} catch {
			setError("Failed to log in.");
		}
	}

	return (
		<>
			<Card>
				<Header>Log In</Header>
				<Form onSubmit={handleSubmit} name='form'>
					<label style={labels} for='email'>
						Email
					</label>
					<Email
						type='email'
						id='email'
						placeholder='Enter Email'
						ref={emailRef}
						required
					/>
					<label style={labels} for='password'>
						Password
					</label>
					<Password
						type='password'
						id='password'
						placeholder='Enter Password'
						ref={passwordRef}
						required
					/>
					<Submit disabled={error} type='submit' name='logIn'>
						Log In
					</Submit>
				</Form>
			</Card>
			<Div>
				Need an account? <Link to='/signup'>Sign Up</Link>
			</Div>
		</>
	);
}

export default Login;
