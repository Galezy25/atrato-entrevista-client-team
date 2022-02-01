import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CardInfoDetails from '../../components/CardInfoDetails';

export default {
  title: 'Components/CardInfoDetails',
  component: CardInfoDetails,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    colorError: { control: 'color' },
    colorLoading: { control: 'color' },
    colorSuccess: { control: 'color' },
  },
} as ComponentMeta<typeof CardInfoDetails>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CardInfoDetails> = (args) => (
  <CardInfoDetails {...args} />
);

export const Example = Template.bind({});
Example.args = {
  cardNumber: '1234567890123456',
  cvv: '456',
  date: new Date(Date.now() + 126144000000).toLocaleDateString(),
  pin: '1234',
  type: 'TEST',
  fullName: 'Example Tester',
};
