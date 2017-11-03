import React from 'react';
import styled from 'react-emotion';
import { compose, withProps } from 'recompose';
import { Field, reduxForm } from 'redux-form'
import { func, bool } from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
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
	
	> * {
		&:first-child {
		}
	}
	`;

const Email = styled(Field)`
	padding: 1rem;
	margin-right: 0;
`;

const Label = styled.label`
	padding: inherit;
	padding-bottom: 0;
	display: flex;
	flex-direction: column;
	> * {
		font-size: 1.5rem;
	}
`;

const For = styled.h4`
	align-self: flex-start;
	color: #ffffff;
	padding-bottom: 1rem;
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
`;

const newUserMutation = gql`
	mutation createEntry($isPublished: Boolean!, $email: String, $name: String, $dreamDestination: String) {
		createPerson(isPublished: $isPublished, email: $email, name: $name, dreamDestination: $dreamDestination) {
			id
			createdAt
			updatedAt
			isPublished
			email
			name
			dreamDestination
		}
	}
`;

const enhance = compose(
	reduxForm({
		form: 'contact'
	}),
	graphql(
		newUserMutation
	),
	withProps(({ mutate, ...props }) => ({
		addInterstedUser: (values) => {
			console.log(mutate({
				variables: {
					isPublished: true,
					...values
				}
			}))
		},
		...props
	}))
)

const Landing = ({ addInterstedUser, handleSubmit, submitting, mutate, ...props}) => (
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
				<Label>
					<For>email</For>
					<Email name="email" component="input" type="email" placeholder="wander@youme.world"/>
				</Label>
				<Label>
					<For>name</For>
					<Email name="name" component="input" type="text" placeholder="Fresh Prince"/>
				</Label>
				<Label>
					<For>Dream Vacation</For>
					<Email name="dreamDestination" component="input" type="text" placeholder="mars"/>
				</Label>
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