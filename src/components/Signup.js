import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { getAuth, updateProfile } from "@firebase/auth";
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
	margin: 2rem 0 1rem 0;
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
`;
const CPassword = styled.input`
	height: 3rem;
	border-radius: 6px;
	padding: 0.5rem;
	background-color: #15202b;
	outline: none;
	font-size: 1.3rem;
	color: white;
	border: 2px solid #cccccc;
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
	margin-bottom: 1.5rem;
`;
const Alert = styled.h2`
	color: red;
	font-size: 0.8rem;
	margin-top: 0.3rem;
`;
const Div = styled.div`
	height: 5rem;
`;
const Account = styled.p`
	margin: auto;
	text-align: center;
	color: white;
	> a {
		color: #007bff;
	}
`;
const Username = styled.input`
	height: 3rem;
	border-radius: 6px;
	padding: 0.5rem;
	background-color: #15202b;
	border: 2px solid #cccccc;
	font-size: 1.3rem;
	color: white;
`;

function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const auth = getAuth();
	const { signup } = useAuth();
	const { currentUser } = useAuth();
	const user = auth.currentUser;
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const [disabled, setDisabled] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match.");
			setLoading(false);
		}

		try {
			setError("");
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			// .then(auth => {
			//     firebase.storage().ref(`users/${auth.user.uid}/profile.jpg`).put(file).then(function () {
			//         console.log('successful')
			//     })
			// })
			history.push("/profile");
		} catch (err) {
			console.log(err.message);
			setError("Failed to create an account.");
		}
		setLoading(false);
	}
	const changeHandler = () => {
		setError("");
		setLoading(false);
	};
	return (
		<>
			<Card>
				<Header>Sign Up</Header>
				<Form onSubmit={handleSubmit} name='form'>
					<label style={labels} for='email'>
						Email
					</label>
					<Email
						type='email'
						id='email'
						placeholder='Email'
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
						onChange={changeHandler}
						required
					/>
					<label style={labels} for='confirmPassword'>
						Confirm Password
					</label>
					<Div>
						<CPassword
							type='password'
							id='confirmPassword'
							placeholder='Confirm Password'
							ref={passwordConfirmRef}
							onChange={changeHandler}
							required
						/>
						{error && <Alert>{error}</Alert>}
					</Div>

					<Submit disabled={error || loading} type='submit' name='submit'>
						Submit
					</Submit>
				</Form>
			</Card>
			<Account>
				Already have an account? <Link to='/login'>Log in</Link>
			</Account>
		</>
	);
}

export default Signup;
