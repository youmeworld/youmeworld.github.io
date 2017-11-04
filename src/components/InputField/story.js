import React from 'react';
import { storiesOf } from '@storybook/react';
import InputField from './';

storiesOf('InputField', module)
	.add('base', () =>
		<InputField>Component</InputField>
	);
