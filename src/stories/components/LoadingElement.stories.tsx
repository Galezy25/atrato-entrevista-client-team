import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LoadingElement from '../../components/LoadingElement';

export default {
  title: 'Components/LoadingElement',
  component: LoadingElement,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    colorError: { control: 'color' },
    colorLoading: { control: 'color' },
    colorSuccess: { control: 'color' },
  },
} as ComponentMeta<typeof LoadingElement>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LoadingElement> = (args) => (
  <LoadingElement {...args}>
    <div
      style={{
        backgroundColor: '#ddd',
      }}
      className="rounded-lg"
    >
      <h1 className="text-3xl font-bold">Hello world</h1>
    </div>
  </LoadingElement>
);

export const Status_loading = Template.bind({});
Status_loading.args = {
  status: 'loading',
};

export const Status_error = Template.bind({});
Status_error.args = {
  status: 'error',
};

export const Status_success = Template.bind({});
Status_success.args = {
  status: 'success',
};
