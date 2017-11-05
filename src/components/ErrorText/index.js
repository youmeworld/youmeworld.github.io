import styled, { keyframes } from 'react-emotion';

const easeIn = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`;

const ErrorText = styled.span`
	background-color: rgba(255, 0, 51, 0.8);
	font-size: 1.45rem;
	padding: 0.5rem;
	color: #fff;
	right: 0;
	left: 0;
	bottom: 0;
	animation: ${easeIn} 1s ease infinite;
`;

export default ErrorText;
