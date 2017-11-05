import React from 'react';
import { func, bool } from 'prop-types';
import styled, { css } from 'react-emotion';
import { compose, withProps, lifecycle } from 'recompose';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Fade } from 'react-reveal';
import Typist from 'react-typist';
import { FormInput, SearchBox, Logo } from '../';

const orangeUnderlined = css`
	font-family: 'Pacifico', cursive;
	color: rgba(255, 141, 0, .9);
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	height: 100vh;
`;

const Nav = styled.div`
	text-align: center;
	color: white;
`;

const AppName = styled.h1`
	display: flex;
	justify-content: center;
	font-size: calc(4vw + 3vh);
`;

const Appeal = styled.h2`
	padding: 0 2rem;
	margin: 0;
`;

const Cta = styled.h2`
	${orangeUnderlined}
	margin-bottom: 1rem;
	text-decoration: underline;
`;

const FormWrapper = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	text-align: center;
`;

const Form = styled.form`
	position: relative;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	width: 100%;
`;

const Submit = styled.button`
	color: #fff;
	background: rgba(150, 200, 130, 1);
	padding: 1.15rem;
	margin-top: 1rem;
	margin-left: auto;
	font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: .09em;
	
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

const warn = (values) => {
	const warnings = {};
	if (!values.name) {
		warnings.name = 'Please enter your name!';
	}
	if (!values.dreamDestination) {
		warnings.dreamDestination = 'Please enter your dream destination!';
	}
	return warnings;
};

const validate = (values) => {
	const errors = {};
	if (!values.name) {
    errors.name = 'Required';
  }
	if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
	return errors;
};

const enhance = compose(
	reduxForm({
		form: 'contact',
		warn,
		validate,
	}),
	graphql(newUserMutation),
	lifecycle({
		componentDidMount: () => {
		},
	}),
	withProps(({ mutate, reset, ...props }) => ({
		addInterstedUser: (values) => {
			const error = [];
			if (!values.email) {
				error.push(new SubmissionError({
					email: 'Please enter your email',
					_error: 'No name entered',
				}));
			}
			if (!values.name) {
				error.push(new SubmissionError({
					email: 'Please enter your name',
					_error: 'No name entered',
				}));
			}
			if (!values.dreamDestination) {
				error.push(new SubmissionError({
					email: 'Please enter your dream destination',
					_error: 'No destination entered',
				}));
			}

			if (error.length) {
				return;
			}

			reset();
			mutate({
				variables: {
					isPublished: true,
					...values,
				},
			});
		},
		...props,
	})),
);

const HiddenField = styled(Field)`
	display: none;
	visibility: hidden;
`;

const Landing = ({
 addInterstedUser, handleSubmit, submitting, mutate, change, reset, ...props
 }) => (
   <Wrapper>
     <Nav>
       <AppName>
         <Fade up delay={200}>
           <span>youme.</span>
         </Fade>
         <Fade right delay={250}>
           <span>world</span>
         </Fade>
       </AppName>
       <Fade up delay={400}>
         <Appeal>
           <Typist
             cursor={{
							show: true,
							blink: true,
							element: '',
						}}
             delay={1000}
           >Trip planning for busy wanderers.
           </Typist>
         </Appeal>
       </Fade>
       <Logo />
     </Nav>
     <FormWrapper>
       <Fade up delay={2000}>
         <Cta>
            Earn money traveling and blogging.
         </Cta>
       </Fade>
       <Form onSubmit={handleSubmit(addInterstedUser)}>
         <Fade up delay={2500}>
           <Field
             label="Name"
             name="name"
             type="text"
             component={FormInput}
             placeholder="Fresh Prince"
           />
           <Field
             label="Email"
             name="email"
             component={FormInput}
             type="email"
             placeholder="wander@youme.world"
           />
           <Field
             label="Dream Destination"
             name="dreamDestination"
             type="text"
             change={change}
             reset={reset}
             component={SearchBox}
           />
           <HiddenField
             label="geo"
             name="geometry"
             type="text"
             component="input"
           />
           <Submit type="submit" disabled={submitting}>Get invited!</Submit>
         </Fade>
       </Form>
     </FormWrapper>
   </Wrapper>
);

Landing.propTypes = {
	handleSubmit: func.isRequired,
	submitting: bool.isRequired,
};

export default enhance(Landing);
