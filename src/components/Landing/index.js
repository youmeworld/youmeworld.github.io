import React from 'react';
import styled from 'react-emotion';
import { compose, withProps } from 'recompose';
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { func, bool } from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { FormInput, ErrorText, WarningText, SearchBox } from '../'

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	height: 80vh;
`;

const FormWrapper = styled.div`
	text-align: center;
	padding: 0.5rem;
	margin-bottom: 0;
`;

const Nav = styled.div`
	text-align: center;
	color: white;
`;

const AppName = styled.h1`
	font-size: calc(5vw + 5vh);
`;

const Appeal = styled.h2`
	padding: 0 2rem;
`;

const Logo = styled.h1`
`;

const Cta = styled.h3`
	color: white;
	margin-bottom: 1rem;
`;

const Form = styled.form`
	margin: 0.5rem;
	padding: 0.5rem;
	cursor: pointer;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;

	@media screen and (max-width: 560px) {
		flex-direction: column;
	}

	&:first-child {
		margin-right: 0;
	}
`;

const InputField = styled.input`
	padding: 1rem;
	margin: 0;	
`;

const Label = styled.label`
	flex: 1;
	margin-right: 1rem;
	display: flex;
	flex-direction: column;
	&:last-of-type {
		margin-right: 0;
	}

	
	@media screen and (max-width: 630px) {
		margin-right: 1rem;
		&:nth-of-type(2) {
			margin-right: 0;
		}
	}
	@media screen and (max-width: 560px) {
		margin-right: 0rem;
	}
	
	> * {
		font-size: 1.5rem;
	}
`;

const Submit = styled.button`
	color: #fff;
	background: rgba(150, 200, 130, 1);
	padding: 1.15rem;
	margin-top: 1rem;
	font-size: 1.5rem;
	
	border: none;
	outline: none;
	cursor: pointer;
	align-self: flex-end;
	width: 100%;
`;

const newUserMutation = gql`
	mutation createEntry($isPublished: Boolean!, $email: String, $name: String, $dreamDestination: String, $geometry: Json) {
		createPerson(isPublished: $isPublished, email: $email, name: $name, dreamDestination: $dreamDestination, geometry: $geometry) {
			id
			createdAt
			updatedAt
			isPublished
			email
			name
			dreamDestination
			geometry
		}
	}
`;

const warn = values => {
  const warnings = {}
  // if (!values.email) {
  //   warnings.email = 'Did you type an email?'
  // }
  return warnings
}
const validate = values => {
	const errors = {}
	if (values.email){
		if (!values.email.match(emailRegex))
			errors.email = 'Not a valid email! 🙃'
	}
  return errors
}

const enhance = compose(
	reduxForm({
		form: 'contact',
		warn,
		validate
	}),
	graphql(
		newUserMutation
	),
	withProps(({ mutate, reset, ...props }) => ({
		addInterstedUser: (values) => {
			console.log(props);
			if (!values.email) {
				return new SubmissionError({
					email: 'Please enter your email',
					_error: 'Login failed!'
				})
			} 
			reset();
			mutate({
				variables: {
					isPublished: true,
					...values
				}
			})
		},
		...props
	}))
)

const HiddenField = styled(Field)`
	display: none;
	visibility: hidden;
`; 

const Landing = ({ addInterstedUser, handleSubmit, submitting, mutate, change, reset, ...props }) => console.log(props) || (
	<Wrapper>
		<Nav>
			<AppName>youme.world</AppName>
			<Appeal>Trip planning for busy wanderers.</Appeal>
		</Nav>
		<Logo>
			<span role="img" aria-label="img"> 	
				🌍📌
			</span>
		</Logo>
		<FormWrapper>
			<Cta>Earn passive income traveling and blogging!</Cta>
			<Form onSubmit={handleSubmit(addInterstedUser)}>
				<Field 
					label="Email"
					name="email"
					component={FormInput}
					type="email"
					placeholder="wander@youme.world"
				/>
				<Field 
					label="Name"
					name="name"
					type="text"
					component={FormInput}
					placeholder="Fresh Prince"
				/>
				<HiddenField label="geo" name="geometry" type="text" component="input" />
				<Field
					label="Dream Destination"
					name="dreamDestination"
					type="text"
					change={change}
					reset={reset}
					component={SearchBox}
				/>
				<Submit type="submit" disabled={submitting}>Lets Go!</Submit>
			</Form>
		</FormWrapper>
	</Wrapper>
);

Landing.propTypes = {
	handleSubmit: func.isRequired,
	submitting: bool.isRequired,
};

export default enhance(Landing);