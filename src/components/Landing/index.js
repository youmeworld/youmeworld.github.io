import React from 'react';
import { get } from 'lodash';
import { func, bool } from 'prop-types';
import styled, { css, keyframes } from 'react-emotion';
import { compose, withProps, lifecycle } from 'recompose';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Fade } from 'react-reveal';
import Typist from 'react-typist';

import { allPersonsQuery, newPersonMutation } from '../../graphql';
import { FormInput, SearchBox, Logo, NetworkMessages } from '../';

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

const warn = (values) => {
	const warnings = {};
	if (!values.name) {
		warnings.name = 'Please enter your name!';
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

	if (!values.dreamDestination) {
		errors.dreamDestination = 'Select location';
	}
	return errors;
};

const enhance = compose(
	graphql(allPersonsQuery),
	reduxForm({
		form: 'contact',
		warn,
		validate,
	}),
	graphql(newPersonMutation),
	lifecycle({
		componentDidMount: () => {
		},
	}),
	withProps(({
 mutate, reset, data, ...props
}) => ({
		invitesNum: get(data, 'allPersons', [].length).length,
		loading: get(data, 'loading', false),
		submitSucceeded: get(data, 'submitSucceeded', false),
		submitFailed: get(data, 'submitFailed', false),
		timer: () => setInterval(() => true, 3000),
		addInterstedUser: (values) => {
			console.log('the values: ', values);
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

const slideInOut = keyframes`
	0% {
		top: -50px;
		/* transform: translateY(-500px); */
	}
	100% {
		top: 0;
		/* transform: translateY(0px); */
	}

`;

const InviteBanner = styled.div`
	position: fixed;
	top: -50px;
	padding: 1rem;
	width: 100%;
	display: flex;
	justify-content: center;

	background-color: rgba(255, 170, 34, 0.8);
	font-size: 1.45rem;
	padding: 0.5rem;
	color: #fff;

	animation: ${slideInOut} 5s ease-in-out 2;
	animation-direction: alternate;
	animation-delay: 1500ms;
`;

const Landing = ({
	addInterstedUser,
	handleSubmit,
	submitting,
	mutate,
	change,
	reset,
	invitesNum,
	timer,
	loading,
	submitSucceeded,
	submitFailed,
	valid,
	inValid,
	pristine,
	...props
 }) => console.log(`
				addInterstedUser: ${addInterstedUser}
				handleSubmit: ${handleSubmit}
				submitting: ${submitting}
				mutate: ${mutate}
				change: ${change}
				reset: ${reset}
				invitesNum: ${invitesNum}
				timer: ${timer}
				loading: ${loading}
				submitSucceeded: ${submitSucceeded}
				submitFailed: ${submitFailed}
				valid: ${valid}
				inValid: ${inValid}
				pristine: ${pristine}
				props: ${JSON.stringify(props, null, 3)}				
				`) || (
<Wrapper>
  <InviteBanner>
				Less than {(invitesNum) ? 200 - invitesNum : 0} invites Remaining
  </InviteBanner>
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
          label="geometry"
          name="geometry"
          type="text"
          component="input"
        />
        <Submit type="submit" disabled={submitting}>Get invited!</Submit>
      </Fade>
    </Form>

    <NetworkMessages
      pristine={pristine}
      loading={loading}
      inValid={props.inValid}
      valid={valid}
      submitFailed={submitFailed}
      submitSucceeded={submitSucceeded}
    />

  </FormWrapper>
</Wrapper>
);

Landing.propTypes = {
	handleSubmit: func.isRequired,
	submitting: bool.isRequired,
};

export default enhance(Landing);
