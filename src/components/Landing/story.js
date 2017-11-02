import React from 'react';
import { storiesOf } from '@storybook/react';
import Landing from './';

storiesOf('Landing', module)
	.add('base', () =>
		<Landing>Component</Landing>
	);
