import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SearchFilterOrder from '../../components/SearchFilterOrder';

export default {
  title: 'Components/SearchFilterOrder',
  component: SearchFilterOrder,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof SearchFilterOrder>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchFilterOrder> = (args) => (
  <SearchFilterOrder {...args} />
);

export const Example = Template.bind({});
Example.args = {
};
