import usersReducer from './usersReducer';

describe('usersReducer', () => {
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
  const USER_TEST_2 = {...USER_TEST, id: '789456'}
  let USERS_STATE = [USER_TEST, USER_TEST_2];
  
  test('@@INIT', () => {
    const resultState = usersReducer(undefined as any, {
      type: '@@INIT',
    } as any);
    expect(resultState).toMatchObject([]);
  });
  test('users/set', () => {
    const resultState = usersReducer(USERS_STATE, {
      type: 'users/set',
      toSet: [USER_TEST],
    });
    expect(resultState).toMatchObject([USER_TEST, USER_TEST_2]);
  });
  test('users/add', () => {
    const resultState = usersReducer(USERS_STATE, {
      type: 'users/add',
      toAdd: USER_TEST,
    });
    expect(resultState).toMatchObject([USER_TEST, USER_TEST_2]);
  });
  test('users/modify', () => {
    const resultState = usersReducer(USERS_STATE, {
      type: 'users/modify',
      id: USER_TEST.id,
      toModify: {
        middleName: 'Testing',
      },
    });
    expect(resultState).toMatchObject([
      { ...USER_TEST, middleName: 'Testing' },
      USER_TEST_2,
    ]);
  });
  test('users/remove', () => {
    const resultState = usersReducer(USERS_STATE, {
      type: 'users/remove',
      id: USER_TEST.id,
    });
    expect(resultState).toMatchObject([USER_TEST_2]);
  });
});
