import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Label = styled.label`
	font-weight: 500;
  margin-bottom: 0.5rem;
  letter-spacing: .09em;
  text-transform: uppercase;
  color: ${({ error }) => ((error) ? 'rgba(255, 0, 51, 1)' : '#fff')};
  font-size: 1.5rem;
  transition: color 400ms ease-in;
`;

export default Label;
