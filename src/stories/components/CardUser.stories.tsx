import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CardUser } from '../../components/CardUser';
import { Provider } from 'react-redux';
import store from '../../store';

export default {
  title: 'Components/CardUser',
  component: CardUser,
} as ComponentMeta<typeof CardUser>;

const Template: ComponentStory<typeof CardUser> = (args) => (
  <Provider store={store}>
    <CardUser {...args} />
  </Provider>
);

export const Example = Template.bind({});
Example.args = {
  id: '1234AB',
  firstName: 'Example',
  middleName: '',
  surnames: 'Tester',
  birthday: '1990/12/31',
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
};
