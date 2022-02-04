import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { CardUser } from '../../components/CardUser';
import { createStoreToStories, EXAMPLE_USER } from '../store';
import { ChangeLocationListener } from '../ChangeLocationListener';


export default {
  title: 'Components/CardUser',
  component: CardUser,
} as ComponentMeta<typeof CardUser>;


const Template: ComponentStory<typeof CardUser> = (args) => (
  <MemoryRouter>
    <ChangeLocationListener/>
    <Provider
      store={createStoreToStories()}
    >
      <CardUser {...args} />
    </Provider>
  </MemoryRouter>
);


export const Example = Template.bind({});
Example.args = EXAMPLE_USER;
