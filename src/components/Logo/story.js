import React from 'react';
import { storiesOf } from '@storybook/react';
import Logo from './';

storiesOf('Logo', module)
	.add('base', () =>
		<Logo>Component</Logo>
	);
