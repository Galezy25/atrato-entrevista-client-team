import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from 'redux';
import thunk from 'redux-thunk';

import usersReducer, { UsersState } from './reducers/usersReducer';

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  users: usersReducer,
});

export type RootState = {
  users: UsersState;
};

export const store: Store<RootState> = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
