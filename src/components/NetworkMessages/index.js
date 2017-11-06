import React from 'react';
import { bool } from 'prop-types';
import { Loader, SubmitMessage } from '../';

const NetworkMessages = ({
 loading, submitSucceeded, submitFailed, pristine, valid,
}) => (
  <div>
    {loading && <Loader />}
    {(submitSucceeded) &&
    <SubmitMessage>
				Thank you for your submission, you will recieve an invite once the beta releases!
    </SubmitMessage>}
    {/* {((submitFailed && !pristine) && submitSucceeded) &&
    <SubmitMessage color="rgba(255, 0, 51, 0.8)">
				Something went wrong! Try again later.
    </SubmitMessage>} */}
  </div>
);

NetworkMessages.propTypes = {
	loading: bool,
	submitSucceeded: bool,
	submitFailed: bool,
	pristine: bool,
	inValid: bool,
};

NetworkMessages.defaultProps = {
	loading: false,
	submitSucceeded: false,
	submitFailed: false,
	pristine: false,
	inValid: false,
};

export default NetworkMessages;
