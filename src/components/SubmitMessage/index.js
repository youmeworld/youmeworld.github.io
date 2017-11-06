import styled from 'react-emotion';
import { easeInOut } from '../../animations';

const SubmitMessage = styled.h1`
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;

	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 3rem;

	color: #ffffff;
	background-color: ${({ color }) => ((color) || 'rgba(100, 255, 5, .9)')};
	margin: 2rem;
	padding: 2rem;
	animation: ${easeInOut} 1s ease-in-out 1;
`;

export default SubmitMessage;
