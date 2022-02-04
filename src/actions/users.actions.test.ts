import fetchMock from 'fetch-mock-jest';
import {
  setUsersAction,
  addUserAction,
  modifyUserAction,
  removeUserAction,
  getUsers,
  createUser,
  modifyUser,
  removeUser,
} from './users.actions';

let mockDispatch = jest.fn();
let mockSetLoading = jest.fn();
let mockSetError = jest.fn();

describe('users.actions', () => {
  const USER_TEST = {
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

  beforeEach(() => {
    mockDispatch.mockReset();
    mockSetError.mockReset();
    mockSetLoading.mockReset();
    fetchMock.mockReset();
  });

  test('setUsersAction', () => {
    expect(setUsersAction([USER_TEST])).toMatchObject({
      type: 'users/set',
      toSet: [USER_TEST],
    });
  });
  test('addUserAction', () => {
    expect(addUserAction(USER_TEST)).toMatchObject({
      type: 'users/add',
      toAdd: USER_TEST,
    });
  });
  test('modifyUserAction', () => {
    expect(modifyUserAction('123456789', { status: 3 })).toMatchObject({
      type: 'users/modify',
      id: '123456789',
      toModify: { status: 3 },
    });
  });
  test('removeUserAction', () => {
    expect(removeUserAction('123456789')).toMatchObject({
      type: 'users/remove',
      id: '123456789',
    });
  });
  test('getUsers success', async () => {
    fetchMock.get('/users', [USER_TEST, USER_TEST]);
    await getUsers({
      setError: mockSetError,
      setLoading: mockSetLoading,
    })(mockDispatch, () => ({}), {});
    expect(mockDispatch.mock.calls[0][0]).toMatchObject({
      type: 'users/set',
      toSet: [USER_TEST, USER_TEST],
    });
    expect(mockSetLoading.mock.calls[0][0]).toBe(true);
    expect(mockSetLoading.mock.calls[1][0]).toBe(false);
    expect(fetchMock).toHaveLastFetched('/users', 'get');
  });
  test('getUsers error', async () => {
    fetchMock.get('/users', () => 400);
    await getUsers({
      setError: mockSetError,
      setLoading: mockSetLoading,
    })(mockDispatch, () => ({}), {});
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockSetError.mock.calls[0][0]).toBeDefined();
    expect(fetchMock).toHaveLastFetched('/users', 'get');
  });

  test('createUser success', async () => {
    fetchMock.post('/users', () => USER_TEST);
    await createUser(
      {
        setError: mockSetError,
        setLoading: mockSetLoading,
      },
      USER_TEST
    )(mockDispatch, () => ({}), {});

    expect(mockDispatch.mock.calls[0][0]).toMatchObject({
      type: 'users/add',
      toAdd: USER_TEST,
    });
    expect(mockSetLoading.mock.calls[0][0]).toBe(true);
    expect(mockSetLoading.mock.calls[1][0]).toBe(false);
    expect(fetchMock).toHaveLastFetched('/users', 'post');
  });
  test('createUser error', async () => {
    fetchMock.post('/users', () => 400);
    await createUser(
      {
        setError: mockSetError,
        setLoading: mockSetLoading,
      },
      USER_TEST
    )(mockDispatch, () => ({}), {});
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockSetError.mock.calls[0][0]).toBeDefined();
    expect(fetchMock).toHaveLastFetched('/users', 'post');
  });


  test('modifyUser success', async () => {
    fetchMock.patch('/users/' + USER_TEST.id,USER_TEST);
    await modifyUser(
      {
        setError: mockSetError,
        setLoading: mockSetLoading,
      },
      USER_TEST.id, USER_TEST
    )(mockDispatch, () => ({}), {});

    expect(mockDispatch.mock.calls[0][0]).toMatchObject({
      type: 'users/modify',
      id: USER_TEST.id,
      toModify: USER_TEST,
    });
    expect(mockSetLoading.mock.calls[0][0]).toBe(true);
    expect(mockSetLoading.mock.calls[1][0]).toBe(false);
    expect(fetchMock).toHaveLastFetched('/users/' + USER_TEST.id, 'patch');
  });
  test('modifyUser error', async () => {
    fetchMock.patch('/users/' + USER_TEST.id, () => 400);
    await modifyUser(
      {
        setError: mockSetError,
        setLoading: mockSetLoading,
      },
      USER_TEST.id,
      USER_TEST
    )(mockDispatch, () => ({}), {});
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockSetError.mock.calls[0][0]).toBeDefined();
    expect(fetchMock).toHaveLastFetched('/users/' + USER_TEST.id, 'patch');
  });


  test('removeUser success', async () => {
    fetchMock.delete('/users/' + USER_TEST.id, () => 200);
    await removeUser(
      {
        setError: mockSetError,
        setLoading: mockSetLoading,
      },
      USER_TEST.id
    )(mockDispatch, () => ({}), {});

    expect(mockDispatch.mock.calls[0][0]).toMatchObject({
      type: 'users/remove',
      id: USER_TEST.id,
    });
    expect(mockSetLoading.mock.calls[0][0]).toBe(true);
    expect(mockSetLoading.mock.calls[1][0]).toBe(false);
    expect(fetchMock).toHaveLastFetched('/users/' + USER_TEST.id, 'delete');
  });
  test('removeUser error', async () => {
    fetchMock.delete('/users/' + USER_TEST.id, () => 400);
    await removeUser(
      {
        setError: mockSetError,
        setLoading: mockSetLoading,
      },
      USER_TEST.id,
      USER_TEST
    )(mockDispatch, () => ({}), {});
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockSetError.mock.calls[0][0]).toBeDefined();
    expect(fetchMock).toHaveLastFetched('/users/' + USER_TEST.id, 'delete');
  });
});
