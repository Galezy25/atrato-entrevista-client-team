import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';

import { CardUser } from '../components/CardUser';
import { Logo } from '../components/Logo';
import { NavBarCenter, NavBarLeft, NavBarRight } from '../components/NavBar';
import SearchFilterOrder from '../components/SearchFilterOrder';
import useDataControl from '../hooks/useDataControl.hook';
import { UsersState } from '../reducers/usersReducer';
import { RootState } from '../store';
import { STATUS_LABEL } from '../types/user';

export function ListUsersPage() {
  let [search, setSearch] = useSearchParams();
  let users = useSelector<RootState, UsersState>((root) => root.users);
  let { data: toRender, filter, setAllData, sort } = useDataControl(users);
  let searchAsObject = useMemo(
    () => Object.fromEntries(new URLSearchParams(search)),
    [search]
  );

  useEffect(() => {
    setAllData(users);
  }, [users, setAllData]);

  useEffect(() => {
    let restart = true;
    if (searchAsObject._search) {
      restart = false;
      const searchWords = searchAsObject._search
        .split(' ')
        .map((word) => word.toUpperCase());
      filter(
        (element) =>
          !!searchWords.filter(
            (word) =>
              element.firstName.toUpperCase().includes(word) ||
              element.middleName.toUpperCase().includes(word) ||
              element.surnames.toUpperCase().includes(word) ||
              element.id.toUpperCase().includes(word) ||
              STATUS_LABEL[element.status].includes(word)
          ).length
      );
    }
    if (searchAsObject.status) {
      restart = false;
      filter((element) => element.status === +searchAsObject.status);
    }

    if (searchAsObject._sortBy) {
      restart = false;
      sort(({ firstName, middleName, surnames, id, status }) => {
        switch (searchAsObject._sortBy) {
          case 'fullName':
            return `${firstName} ${middleName} ${surnames}`;
          case 'id':
            return id;
          case 'status':
            return status;

          default:
            console.log(searchAsObject._sortBy);
            return '';
        }
      }, (searchAsObject._sortOrder as any) || 'ASC');
    }
    if (restart) {
      filter(() => true);
    }
  }, [searchAsObject, filter, sort, users]);

  return (
    <>
      <NavBarLeft>
        <Logo />
      </NavBarLeft>
      <NavBarCenter>
        <Link to="/user/new">
          <button className="p-2 m-1 rounded-md bg-primary-500 hover:bg-primary-700 text-white">
            Nuevo usuario
          </button>
        </Link>
      </NavBarCenter>
      <NavBarRight>
        <SearchFilterOrder
          hasFilterSort={!!Object.getOwnPropertyNames(searchAsObject).length}
          initialValues={searchAsObject}
          onSubmitHandler={setSearch}
        />
      </NavBarRight>

      <div className="m-2 mx-auto max-w-fit grid grid-cols-1 lg:grid-cols-2 gap-3">
        {toRender.map((user) => (
          <CardUser key={user.id} {...user} />
        ))}
      </div>
    </>
  );
}
