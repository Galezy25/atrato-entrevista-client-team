import { useDispatch } from 'react-redux';

import moment from 'moment'

import { Card } from './Card';
import CardInfoDetails from './CardInfoDetails';
import LoadingElement from './LoadingElement';

import { modifyUser, removeUser } from '../actions/users.actions';
import useLoadingStatus from '../hooks/useLoadingStatus.hook';
import { STATUS_LABEL, User, UserStatus } from '../types/user';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface CardUserProps extends User {}

export const CardUser = ({
  analyst,
  birthday,
  cardInfo,
  email,
  firstName,
  id,
  middleName,
  phone,
  status,
  surnames,
}: CardUserProps) => {
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  const [showRemove, setShowRemove] = useState<boolean>(false);

  const {
    status: reqStatus,
    createLoadingControl,
    setStatus,
  } = useLoadingStatus();
  const handleChangeStatus = (newStatus: UserStatus) => {
    if (newStatus !== status) {
      dispatch(
        modifyUser(
          createLoadingControl((error) => {
            if (error) {
              console.error(error);
            }
            setTimeout(() => {
              setStatus('none');
            }, 500);
          }),
          id,
          {
            status: newStatus,
          }
        )
      );
    }
  };

  const handleRemove = () => {
    dispatch(
      removeUser(
        createLoadingControl((error) => {
          if (error) {
            console.error(error);
          }
          setTimeout(() => {
            setStatus('none');
          }, 500);
        }),
        id
      )
    );
  };

  return (
    <LoadingElement status={reqStatus}>
      <Card
        className={
          'p-5 bg-white grid grid-cols-1 gap-4 max-w-[620px] ' +
          (showRemove && 'opacity-50')
        }
      >
        <div className="flex flex-wrap flex-row">
          <div className="hidden sm:inline-block text-neutral-400">
            <i className="fas fa-user-circle fa-3x"></i>
          </div>
          <div className="w-auto">
            <h5 className="text-primary-700">{`${firstName}${
              middleName ? ' ' + middleName : ''
            } ${surnames}`}</h5>
            <p className="text-neutral-400">ID: {id}</p>
          </div>
          <div className="ml-auto">
            <SelectStatus
              className="hidden sm:inline-block"
              status={status}
              onChange={handleChangeStatus}
            />
            <Link to={`/user/edit/${id}`}>
              <button className="p-2 sm:hidden  inline-block rounded-md text-neutral-400">
                <i className="fas fa-pencil-alt"></i>
              </button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="col-1 grid grid-cols-2 gap-3">
            <div className="col-span-2 order-first">
              <p className="text-neutral-400">MAIL</p>
              <p>{email}</p>
            </div>
            <div className="col-span-2">
              <p className="text-neutral-400">TELÉFONO</p>
              <p>{phone}</p>
            </div>
            <div className="sm:col-span-2 sm:-order-1">
              <p className="text-neutral-400 sm:hidden">F. NACIMIENTO</p>
              <p className="text-neutral-400 hidden sm:block">
                FECHA DE NACIMIENTO
              </p>

              <p>{moment(birthday).format('YYYY/MM/DD')}</p>
            </div>

            <div>
              <p className="text-neutral-400 sm:hidden">ANALISTA</p>
              <p className="text-neutral-400 hidden sm:block">
                ANALISTA ASIGNADO
              </p>
              <p>{analyst}</p>
            </div>
          </div>
          <div className="border-t-2 border-t-neutral-400 flex flex-wrap pt-3 sm:pt-0 sm:justify-end sm:border-t-0 sm:border-l-2 sm:border-l-neutral-400">
            <div className="w-full block sm:hidden mb-2">
              <button
                className="p-2 border-neutral-400 rounded-md border-2 text-neutral-400"
                onClick={() => setShowMore((prev) => !prev)}
              >
                Ver más
              </button>
            </div>
            <CardInfoDetails
              className={(!showMore && 'hidden') + ' sm:grid'}
              {...cardInfo}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <SelectStatus
            className="sm:hidden inline-block"
            status={status}
            onChange={handleChangeStatus}
          />
          <Link to={`/user/edit/${id}`}>
            <button className="p-2 hidden sm:inline-block rounded-md text-neutral-400">
              EDITAR <i className="fas fa-pencil-alt"></i>
            </button>
          </Link>
          <button
            onClick={() => setShowRemove(true)}
            className="p-2 mx-3 rounded-md text-red-400 "
          >
            ELIMINAR <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </Card>
      {showRemove && (
        <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-white grid grid-cols-1 gap-3">
          <h5>¿Desea eliminar este usuario?</h5>
          <div>
            <button
              className="p-2 bg-red-500 text-white hover:bg-red-700 rounded-md border-2"
              onClick={() => handleRemove()}
            >
              ELIMINAR
            </button>
            <button
              className="p-2 bg-white text-neutral-400 border-neutral-400 hover:bg-gray-500 rounded-md"
              onClick={() => setShowRemove(false)}
            >
              Cancelar
            </button>
          </div>
        </Card>
      )}
    </LoadingElement>
  );
};

const SelectStatus = ({
  className,
  status,
  onChange,
}: {
  className: string;
  status: UserStatus;
  onChange: (status: UserStatus) => void;
}) => (
  <select
    className={`p-2 rounded-md bg-primary-500 hover:bg-primary-700 text-white ${className}`}
    value={status}
    onChange={(ev) => {
      onChange(+ev.target.value);
    }}
  >
    <option value={UserStatus.PENDING}>
      {STATUS_LABEL[UserStatus.PENDING]}
    </option>
    <option value={UserStatus.IN_PROCESS}>
      {STATUS_LABEL[UserStatus.IN_PROCESS]}
    </option>
    <option value={UserStatus.COMPLETED}>
      {STATUS_LABEL[UserStatus.COMPLETED]}
    </option>
  </select>
);
