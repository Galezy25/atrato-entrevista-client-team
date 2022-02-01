import { useDispatch } from 'react-redux';

import { Card } from './Card';
import CardInfoDetails from './CardInfoDetails';
import LoadingElement from './LoadingElement';

import { modifyUser } from '../actions/users.actions';
import useLoadingStatus from '../hooks/useLoadingStatus.hook';
import { STATUS_LABEL, User, UserStatus } from '../types/user';

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
  const { status: reqStatus, createLoadingControl } = useLoadingStatus();
  const handleChangeStatus = (newStatus: UserStatus) => {
    if (newStatus !== status) {
      dispatch(
        modifyUser(createLoadingControl(), id, {
          status: newStatus,
        })
      );
    }
  };

  return (
    <LoadingElement status={reqStatus}>
      <Card className="p-5 bg-white grid grid-cols-1 gap-4">
        <div className="flex flex-wrap flex-row">
          <div className="hidden sm:inline-block"></div>
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
            <button className="p-2 sm:hidden  inline-block rounded-md text-neutral-400">
              <i className="fas fa-pencil-alt"></i>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3">
          <div className="col-1 sm:col-span-2 grid grid-cols-2 gap-3">
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

              <p>{new Date(birthday).toLocaleDateString()}</p>
            </div>

            <div>
              <p className="text-neutral-400 sm:hidden">ANALISTA</p>
              <p className="text-neutral-400 hidden sm:block">
                ANALISTA ASIGNADO
              </p>
              <p>{analyst}</p>
            </div>
          </div>
          <div className="border-t-2 border-t-neutral-400 flex pt-3 sm:pt-0 sm:justify-end sm:border-t-0 sm:border-l-2 sm:border-l-neutral-400">
            <CardInfoDetails {...cardInfo} />
          </div>
        </div>
        <div className="flex justify-end">
          <SelectStatus
            className="sm:hidden inline-block"
            status={status}
            onChange={handleChangeStatus}
          />
          <button className="p-2 hidden sm:inline-block rounded-md text-neutral-400">
            EDITAR <i className="fas fa-pencil-alt"></i>
          </button>
        </div>
      </Card>
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
