import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Fade } from 'react-reveal';

const Wrapper = styled.h1`
	display: inline-flex;
`;

const Logo = props => (
  <Wrapper>
    <Fade up delay={1000}>
      <span role="img" aria-label="img">
					🌍📌
      </span>
    </Fade>
  </Wrapper>
);

Logo.propTypes = {};
Logo.defaultProps = {};

export default Logo;
