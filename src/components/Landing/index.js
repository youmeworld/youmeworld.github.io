import React from 'react';
import styled from 'react-emotion';
import { Field, reduxForm } from 'redux-form'
// import PropTypes from 'prop-types';
import submit from './submit'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
`;

const FormWrapper = styled.div`
	text-align: center;
	padding: 0.5rem;
`;

const Nav = styled.div`
	text-align: center;
	color: white;
`;

const AppName = styled.h1`
	font-size: 14vw;
	padding: 0;
	margin: 0;
`;

const Appeal = styled.h3`
	padding: 0 20rem;
`;

const Cta = styled.h4`
	color: white;
	margin-bottom: 1rem;
`;

const Form = styled.form`
	margin: 0.5rem;
	padding: 0.5rem;
	cursor: pointer;
	display: flex;
	justify-content: center;

	> * {
		&:first-child {
		}
	}
`;

const Email = styled(Field)`
	padding: 1rem;
	font-size: 1em;
	line-height: 1.27777778em;
`;

const Submit = styled.button`
	padding: 1rem;
	font-size: 1em;
	line-height: 1.27777778em;
	
	border: none;
	outline: none;
	cursor: pointer;
`;

const Landing = ({ handleSubmit, submitting}) => (
	<Wrapper>
		<Nav>
			<AppName>youme.world</AppName>
			<Appeal>Premium trip planning designed for busy wanderers.</Appeal>
		</Nav>
		<h2>🌍📌</h2>
		<FormWrapper>
			<Cta>Earn passive 💵💰💸  while traveling and blogging!</Cta>
			<Form onSubmit={handleSubmit(submit)}>
				<Email name="email" component="input" type="text" placeholder="wander@youme.world"/>
				<Submit type="submit" disabled={submitting}>Intersted</Submit>
			</Form>
		</FormWrapper>
	</Wrapper>
);

// Landing.propTypes = {};

export default reduxForm({
  form: 'contact'
})(Landing);
