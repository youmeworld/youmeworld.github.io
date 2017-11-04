import React from 'react';
import { Label, For, InputField, ErrorText, WarningText } from '../';
// import PropTypes from 'prop-types';

const FormInput = ({ placeholder, label, meta: { touched, error, warning }, input, type }) => {
	return (
		<Label>
			{touched &&
        ((error && <ErrorText>{error}</ErrorText>) ||
          (warning && <WarningText>{warning}</WarningText>))}
			<For>{label}</For>
			<InputField {...input} placeholder={placeholder} type={type} />
		</Label>
	)
}

// FormInput.propTypes = {};

export default FormInput;
