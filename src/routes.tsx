import {
  IndexRouteProps,
  LayoutRouteProps,
  PathRouteProps,
} from 'react-router-dom';

import { ListUsersPage } from './routes/ListUsersPage';
import { UserFormPage } from './routes/UserFormPage';

export const routes: (PathRouteProps | LayoutRouteProps | IndexRouteProps)[] = [
  {
    path: 'users',
    element: <ListUsersPage/>,
  },
  {
    path: 'user/new',
    element: <UserFormPage/>,
  },
  {
    path: 'user/edit/:id',
    element: <UserFormPage/>,
  },
];
