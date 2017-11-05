import React from 'react';
import styled from 'react-emotion';
import { Label, InputField, ErrorText, WarningText } from '../';
// import PropTypes from 'prop-types';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	align-items: flex-start;
	
	flex: 1;
	margin-top: 1rem;
`;

const FormInput = ({
 placeholder, label, meta: { touched, error, warning }, input, type,
}) => (
  <Wrapper>
    <Label error={touched && error} label={label}>
      {label}
      {touched &&
        ((error && <ErrorText>{error}</ErrorText>) ||
          (warning && <WarningText>{warning}</WarningText>))}
    </Label>
    <InputField {...input} placeholder={placeholder} type={type} />
  </Wrapper>
	);

// FormInput.propTypes = {};

export default FormInput;
