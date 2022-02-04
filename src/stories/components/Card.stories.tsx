import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Card } from '../../components/Card';

export default {
  title: 'Components/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => (
  <Card {...args}>
    <h1 className="text-3xl font-bold">Hello world</h1>
  </Card>
);

export const Example = Template.bind({});
Example.args = {
  className: 'bg-gray-50 p-2',
};
