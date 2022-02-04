import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';

import { createStoreToStories, EXAMPLE_USER } from '../store';
import { NavBar } from '../../components/NavBar';
import { UserFormPage } from '../../routes/UserFormPage';
import { ChangeLocationListener } from '../ChangeLocationListener';

export default {
  title: 'Routes/UserFormPage',
  component: UserFormPage,
  argTypes: {},
} as ComponentMeta<typeof UserFormPage>;

export const Example_new: ComponentStory<typeof UserFormPage> = (args) => (
  <MemoryRouter>
    <ChangeLocationListener />
    <Provider store={createStoreToStories()}>
      <NavBar />
      <UserFormPage />
    </Provider>
  </MemoryRouter>
);
export const Example_update: ComponentStory<typeof UserFormPage> = (args) => (
  <MemoryRouter initialEntries={['/users/edit/' + EXAMPLE_USER.id]}>
    <Provider store={createStoreToStories()}>
      <ChangeLocationListener defaultPath={'/users/edit/' + EXAMPLE_USER.id} />
      <NavBar />
      <Routes>
        <Route path="users/edit/:id" element={<UserFormPage />} />
        <Route path="*" element={<Navigate to={'/users/edit/' + EXAMPLE_USER.id} />} />
      </Routes>
    </Provider>
  </MemoryRouter>
);
