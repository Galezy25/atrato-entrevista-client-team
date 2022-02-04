import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getUsers } from './actions/users.actions';
import LoadingElement from './components/LoadingElement';

import { NavBar } from './components/NavBar';
import useLoadingStatus from './hooks/useLoadingStatus.hook';
import { UsersState } from './reducers/usersReducer';
import { routes } from './routes';
import { RootState } from './store';

const App = () => {
  let dispatch = useDispatch();
  let users = useSelector<RootState, UsersState>((root) => root.users);
  let { status, createLoadingControl } = useLoadingStatus();

  useEffect(() => {
    if (status === 'none' && !users.length) {
      dispatch(getUsers(createLoadingControl()));
    }
  }, [users, status, dispatch, createLoadingControl]);
  return (
    <LoadingElement status={status === 'success' ? 'none' : status}>
      <NavBar />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.element?.toString() || Date.now().toString(36)}
            {...route}
          />
        ))}
        <Route path="*" element={<Navigate to="users" replace />} />
      </Routes>
    </LoadingElement>
  );
};

export default App;
