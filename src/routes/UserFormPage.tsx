import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { createUser, modifyUser } from '../actions/users.actions';

import { Card } from '../components/Card';
import { Logo } from '../components/Logo';
import { NavBarCenter, NavBarLeft } from '../components/NavBar';
import UserForm from '../components/UserForm';
import useLoadingStatus from '../hooks/useLoadingStatus.hook';
import { RootState } from '../store';
import { User } from '../types/user';

export function UserFormPage() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { status, createLoadingControl, setStatus } = useLoadingStatus();
  let { id } = useParams();
  let user = useSelector<RootState, User | undefined>((root) =>
    id ? root.users.find((user) => user.id === id) : undefined
  );

  const onSubmitHandler = (newValues: any) => {
    if (newValues.id) delete newValues.id;
    if (user) {
      for (let key in newValues) {
        if (newValues[key] === (user as any)[key]) {
          delete newValues[key];
        }
      }

      dispatch(
        modifyUser(
          createLoadingControl((error) => {
            if (error) {
              console.error(error);
              setTimeout(() => {
                setStatus('none');
              }, 500);
            } else {
              setTimeout(() => {
                navigate('/users', {
                  replace: true,
                });
              }, 500);
            }
          }),
          id,
          newValues
        )
      );
    } else {
      dispatch(
        createUser(
          createLoadingControl((error) => {
            if (error) {
              console.error(error);
              setTimeout(() => {
                setStatus('none');
              }, 500);
            } else {
              setTimeout(() => {
                navigate('/users', {
                  replace: true,
                });
              }, 500);
            }
          }),
          newValues
        )
      );
    }
  };
  return (
    <>
      <NavBarLeft>
        <button
          onClick={() => {
            navigate('/users', {
              replace: true,
            });
          }}
          className=" bg-white hover:bg-gray-200 m-1 text-neutral-400"
        >
          <i className="fas fa-arrow-left fa-2x"></i>
        </button>
      </NavBarLeft>
      <NavBarCenter>
        <Logo />
      </NavBarCenter>
      <Card className="p-3 m-1 bg-white">
        {((id && user) || !id) && (
          <UserForm prev={user} status={status} onSubmit={onSubmitHandler} />
        )}
      </Card>
    </>
  );
}
