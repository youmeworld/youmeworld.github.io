import React from 'react';
import { storiesOf } from '@storybook/react';
import NetworkMessages from './';

storiesOf('NetworkMessages', module)
	.add('base', () =>
		<NetworkMessages>Component</NetworkMessages>
	);
