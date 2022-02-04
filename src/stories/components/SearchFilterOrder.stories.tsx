import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SearchFilterOrder from '../../components/SearchFilterOrder';

export default {
  title: 'Components/SearchFilterOrder',
  component: SearchFilterOrder,
} as ComponentMeta<typeof SearchFilterOrder>;

const Template: ComponentStory<typeof SearchFilterOrder> = (args) => (
  <SearchFilterOrder {...args} />
);

export const Example = Template.bind({});
Example.args = {};
