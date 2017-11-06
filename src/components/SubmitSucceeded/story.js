import React from 'react';
import { storiesOf } from '@storybook/react';
import SubmitSucceeded from './';

storiesOf('SubmitSucceeded', module)
	.add('base', () =>
		<SubmitSucceeded>Component</SubmitSucceeded>
	);
