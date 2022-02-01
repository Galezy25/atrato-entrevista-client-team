import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import UserForm from '../../components/UserForm';

export default {
  title: 'Components/UserForm',
  component: UserForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof UserForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UserForm> = (args) => (
  <UserForm {...args} />
);

export const Create = Template.bind({});
Create.args = {};



export const Update = Template.bind({});
Update.args = {
  prev: {
    id: '1234AB',
    firstName: 'Example',
    middleName: '',
    surnames: 'Tester',
    birthday: '1990-12-31',
    email: 'example.tester@test.t',
    phone: '1234567890',
    analyst: 'Test Analist',
    cardInfo: {
      fullName: 'Example Tester',
      cardNumber: '1234567890123456',
      cvv: '456',
      date: new Date(Date.now() + 126144000000).toLocaleDateString(),
      pin: '1234',
      type: 'TEST',
    },
    status: 1,
  }
};