import React from 'react';
import { storiesOf } from '@storybook/react';
import SubmitMessage from './';

storiesOf('SubmitMessage', module)
	.add('base', () =>
		<SubmitMessage>Component</SubmitMessage>
	);
