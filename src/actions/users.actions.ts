import { Action } from 'redux';

import { httpApi } from '../services/httpApi';
import { ActionRequest } from '../types/actionRequest';
import { User } from '../types/user';

export interface SetUsersAction extends Action {
  type: 'users/set';
  toSet: User[];
}

export interface AddUserAction extends Action {
  type: 'users/add';
  toAdd: User;
}

export interface ModifyUserAction extends Action {
  type: 'users/modify';
  id: string;
  toModify: any;
}

export interface RemoveUserAction extends Action {
  type: 'users/remove';
  id: string;
}

export type UsersActions =
  | SetUsersAction
  | AddUserAction
  | ModifyUserAction
  | RemoveUserAction;

export function setUsersAction(users: User[]): SetUsersAction {
  return {
    type: 'users/set',
    toSet: users,
  };
}

export function addUserAction(user: User): AddUserAction {
  return {
    type: 'users/add',
    toAdd: user,
  };
}

export function modifyUserAction(id: string, toModify: any): ModifyUserAction {
  return {
    type: 'users/modify',
    id,
    toModify,
  };
}

export function removeUserAction(id: string): RemoveUserAction {
  return {
    type: 'users/remove',
    id,
  };
}

export const getUsers: ActionRequest<UsersActions> =
  ({ setLoading, setError }) =>
  async (dispatch) => {
    try {
      setLoading(true);
      const users = await (
        await httpApi('users')({
          method: 'GET',
        })
      ).json();

      dispatch(setUsersAction(users));
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

export const createUser: ActionRequest<UsersActions> =
  ({ setLoading, setError }, user: any) =>
  async (dispatch) => {
    try {
      setLoading(true);
      const newUser = await (
        await httpApi('users')({
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-type': 'application/json',
          },
        })
      ).json();
      dispatch(setUsersAction(newUser));
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

export const modifyUser: ActionRequest<UsersActions> =
  ({ setLoading, setError }, id: string, toModify: any) =>
  async (dispatch) => {
    try {
      setLoading(true);
      await (
        await httpApi(`users/${id}`)({
          method: 'PATCH',
          body: JSON.stringify(toModify),
          headers: {
            'Content-type': 'application/json',
          },
        })
      ).json();
      dispatch(modifyUserAction(id, toModify));
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };


  export const removeUser: ActionRequest<UsersActions> =
  ({ setLoading, setError }, id: string) =>
  async (dispatch) => {
    try {
      setLoading(true);
      await (
        await httpApi(`users/${id}`)({
          method: 'DELETE'
        })
      ).json();
      dispatch(removeUserAction(id));
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

export default {
  getUsers,
  createUser,
  modifyUser,
  removeUser,
};
