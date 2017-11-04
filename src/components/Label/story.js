import React from 'react';
import { storiesOf } from '@storybook/react';
import Label from './';

storiesOf('Label', module)
	.add('base', () =>
		<Label>Component</Label>
	);
