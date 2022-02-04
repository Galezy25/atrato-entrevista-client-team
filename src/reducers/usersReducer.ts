import { Reducer } from 'react';

import { UsersActions } from '../actions/users.actions';
import { User } from '../types/user';

export type UsersState = User[];

const usersReducer: Reducer<UsersState, UsersActions> = (
  state = [],
  action
) => {
  switch (action.type) {
    case 'users/set':
      state = [...action.toSet, ...state].filter(
        (elA, i, ar) => i === ar.findIndex((elB) => elA.id === elB.id)
      );
      break;
    case 'users/add':
      state = [action.toAdd, ...state].filter(
        (elA, i, ar) => i === ar.findIndex((elB) => elA.id === elB.id)
      );
      break;
    case 'users/modify':
      state = state.map((oldUser) =>
        oldUser.id === action.id
          ? {
              ...oldUser,
              ...action.toModify,
            }
          : oldUser
      );
      break;
    case 'users/remove':
      state = state.filter((user) => user.id !== action.id);
      break;
    default:
      break;
  }
  return state;
};

export default usersReducer;
