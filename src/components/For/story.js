import React from 'react';
import { storiesOf } from '@storybook/react';
import For from './';

storiesOf('For', module)
	.add('base', () =>
		<For>Component</For>
	);
