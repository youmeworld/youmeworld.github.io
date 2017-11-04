import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Label = styled.label`
	flex: 1;
	margin-right: 1rem;
	display: flex;
	flex-direction: column;
	&:last-of-type {
		margin-right: 0;
	}
`;

export default Label;
