import { action } from '@storybook/addon-actions';
import { AnyAction, Dispatch, Observable, Store } from 'redux';
import fetchMock from 'fetch-mock';

const dispatchActionHandler = action('Store dispatch', {
  allowFunction: true,
});
const getStateActionHandler = action('Store getState', {
  allowFunction: true,
  allowUndefined: true,
});

const subscribeActionHandler = action('Store subscribe', {
  allowFunction: true,
});
const unsubscribeActionHandler = action('Store unsubscribe', {
  allowFunction: true,
});

let dispatchHandler = (arg: any) => {
  if (typeof arg === 'function') {
    arg(dispatchHandler);
  } else {
    dispatchActionHandler(arg);
  }
};

function createObservable<T = any>(): Observable<T> {
  return {
    subscribe: () => ({
      unsubscribe: () => {},
    }),
    [Symbol.observable]: () => createObservable<T>(),
  };
}

export const createStoreToStories = ({
  subscribe = false,
  unsubscribe = false,
  getState = false,
}: {
  subscribe?: boolean;
  unsubscribe?: boolean;
  getState?: boolean;
} = {}): Store => ({
  dispatch: dispatchHandler as Dispatch<AnyAction>,
  subscribe: (listener) => {
    if (subscribe) subscribeActionHandler(listener);
    return unsubscribe ? unsubscribeActionHandler : () => {};
  },
  getState: () => {
    if (getState) getStateActionHandler();
    return state;
  },
  replaceReducer: () => {},
  [Symbol.observable]: createObservable,
});

export default createStoreToStories;

export const EXAMPLE_USER = {
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

export const state = {
  users: [
    EXAMPLE_USER,
    { ...EXAMPLE_USER, id: '789456', status: 2 },
    { ...EXAMPLE_USER, id: '456789', status: 3 },
  ],
};

fetchMock
  .post(process.env.REACT_APP_URL_API + '/users', (_url, options) => {
    return options.body;
  })
  .patch(process.env.REACT_APP_URL_API + '/users/1234AB', () => 200)
  .delete(process.env.REACT_APP_URL_API + '/users/1234AB', () => 200)
  .patch(process.env.REACT_APP_URL_API + '/users/789456', () => 200)
  .delete(process.env.REACT_APP_URL_API + '/users/789456', () => 200)
  .patch(process.env.REACT_APP_URL_API + '/users/456789', () => 200)
  .delete(process.env.REACT_APP_URL_API + '/users/456789', () => 200);
