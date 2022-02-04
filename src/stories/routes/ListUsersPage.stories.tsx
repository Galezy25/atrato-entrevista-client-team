import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';

import { createStoreToStories } from '../store';
import { ListUsersPage } from '../../routes/ListUsersPage';
import { NavBar } from '../../components/NavBar';
import { ChangeLocationListener } from '../ChangeLocationListener';

export default {
  title: 'Routes/ListUsersPage',
  component: ListUsersPage,
  argTypes: {},
} as ComponentMeta<typeof ListUsersPage>;

const Template: ComponentStory<typeof ListUsersPage> = (args) => (
  <MemoryRouter>
    <Provider store={createStoreToStories()}>
      <ChangeLocationListener />
      <NavBar />
      <Routes>
        <Route path="/" element={<ListUsersPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Provider>
  </MemoryRouter>
);

export const Example = Template.bind({});
