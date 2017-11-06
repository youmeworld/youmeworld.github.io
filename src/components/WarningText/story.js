import React from 'react';
import { storiesOf } from '@storybook/react';
import WarningText from './';

storiesOf('WarningText', module)
	.add('base', () =>
  <WarningText>Component</WarningText>,);
