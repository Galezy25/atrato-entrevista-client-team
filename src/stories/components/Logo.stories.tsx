import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Logo } from '../../components/Logo';

export default {
  title: 'Components/Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>;

export const Example: ComponentStory<typeof Logo> = (args) => (
  <Logo/>
);

