import React from 'react';
import { storiesOf } from '@storybook/react';
import FormInput from './';

storiesOf('FormInput', module)
	.add('base', () =>
		<FormInput>Component</FormInput>
	);
