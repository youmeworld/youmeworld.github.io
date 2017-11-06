import styled from 'react-emotion';
import { easeInOut } from '../../animations';

const SubmitSucceeded = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;

	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 2rem;

	color: #ffffff;
	background-color: rgba(100, 255, 5, .9);
	margin: 3rem;
	animation: ${easeInOut} 1s ease-in-out 1;
`;

export default SubmitSucceeded;
