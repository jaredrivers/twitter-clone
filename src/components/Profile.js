import React from "react";
import styled from "styled-components";

const PageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 20rem;
`;
const Title = styled.p`
	font-size: 2rem;
	color: white;
	margin: 2rem 0;
`;
const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 50%;
`;
const Input = styled.input`
	border: 2px solid #cccccc;
	background-color: #15202b;
	border-radius: 6px;
	padding: 1rem;
	color: white;
	font-size: 1rem;
	margin: 0.7rem 0;
`;
const Button = styled.button`
	background-color: #007bff;
	padding: 0.6rem;
	width: 4rem;
	border-radius: 4px;
	border: none;
	color: white;
	align-self: flex-end;
	margin-right: 0.7rem;
`;
const Subtitle = styled.p`
	color: white;
	font-size: 1.2rem;
`;

function Profile() {
	return (
		<PageWrapper>
			<Title>Profile</Title>
			<Subtitle>User Name</Subtitle>
			<Form>
				<Input placeholder=''></Input>
				<Button>Save</Button>
			</Form>
		</PageWrapper>
	);
}

export default Profile;
