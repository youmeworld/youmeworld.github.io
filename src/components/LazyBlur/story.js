import React from 'react';
import { storiesOf } from '@storybook/react';
import LazyBlur from './';

storiesOf('LazyBlur', module)
	.add('base', () =>
		<LazyBlur>Component</LazyBlur>
	);
