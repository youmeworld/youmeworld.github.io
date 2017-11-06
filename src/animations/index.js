import { keyframes } from 'react-emotion';

export const slideInOut = keyframes`
  0% {
    top: -50px;
  }
  100% {
    top: 0;
  }
`;

export const easeInOut = keyframes`
  0% { 
    opacity: 0;
    top: 100%;
  }
  50% { 
    top: 50%;
  }
  100% { 
    opacity: 1;
    top: 0%;
  }
`;
