import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Card } from '../../components/Card';

export default {
  title: 'Components/Card',
  component: Card,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Card>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Card> = (args) => (
  <Card {...args}>
    <h1 className="text-3xl font-bold">Hello world</h1>
  </Card>
);

export const Example = Template.bind({});
Example.args = {
  className: 'bg-gray-50 p-2',
};
