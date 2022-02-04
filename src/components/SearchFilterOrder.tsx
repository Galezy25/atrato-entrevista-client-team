import { ChangeEvent, FormEvent, useState } from 'react';
import { STATUS_LABEL, UserStatus } from '../types/user';
import { Card } from './Card';

export interface SearchFilterOrderProps {
  onSubmitHandler: (values: {
    status?: string;
    _search?: string;
    _sortBy?: string;
    _sortOrder?: string;
  }) => void | Promise<any>;
  initialValues?: {
    _search?: string;
    _sortBy?: string;
    _sortOrder?: string;
    status?: string;
  };
  hasFilterSort?: boolean;
}

const INITIAL_VALUES = {
  _search: '',
  _sortBy: '',
  _sortOrder: '',
  status: '',
};

export function SearchFilterOrder({
  onSubmitHandler,
  initialValues = {},
  hasFilterSort,
}: SearchFilterOrderProps) {
  const [showMore, setShowMore] = useState(false);
  const [values, setValues] = useState({ ...INITIAL_VALUES, ...initialValues });

  const onChangeHandler = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleShowMoreClick = () => {
    setShowMore((prev) => !prev);
  };

  const _onSubmitHandler = (ev: FormEvent<HTMLFormElement>, toValues?: any) => {
    ev.preventDefault();

    let returnValues: any = toValues ? { ...toValues } : { ...values };
    Object.getOwnPropertyNames(returnValues).forEach((key) => {
      if (!returnValues[key]) {
        delete returnValues[key];
      }
    });
    onSubmitHandler(returnValues);
    if (toValues) {
      setValues(toValues);
    }
    setShowMore(false);
  };

  return (
    <div>
      <form
        className="flex max-w-fit min-w-fit z-30"
        onSubmit={_onSubmitHandler}
        onReset={(ev) => {
          _onSubmitHandler(ev, INITIAL_VALUES);
        }}
      >
        <input
          className="p-2 bg-gray-200 rounded-md border-b-2 border-gray-500"
          name="_search"
          type="search"
          placeholder="Buscar"
          onChange={onChangeHandler}
          value={values._search}
        />
        {showMore && (
          <div
            className="fixed min-w-full z-50 top-0 left-0 min-h-screen bg-neutral-600 opacity-25"
            onClick={() => setShowMore(false)}
          ></div>
        )}
        <div className="relative z-50">
          <button
            type="button"
            title="Mas opciones"
            className={
              'p-2 m-1 rounded-md min-w-max hover:bg-gray-500 hover:text-neutral-400 ' +
              (hasFilterSort
                ? 'bg-secondary-500 text-white'
                : 'bg-white text-neutral-400')
            }
            onClick={handleShowMoreClick}
          >
            <i className="fas fa-filter"></i>
            <i className="fas fa-sort"></i>
          </button>
          <Card
            className={`absolute right-0 mt-4 min-w-max grid grid-cols-1 gap-2 top-full p-4 bg-white z-30 ${
              showMore || 'hidden'
            }`}
          >
            <h6>Filtrar por:</h6>
            <select
              className="p-2 bg-gray-200 rounded-md border-b-2 border-gray-500"
              name="status"
              onChange={onChangeHandler}
              value={values.status}
            >
              <option value="">---------</option>
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
            <hr />
            <h6>Ordenar por:</h6>
            <select
              className="p-2 bg-gray-200 rounded-md border-b-2 border-gray-500"
              name="_sortBy"
              onChange={onChangeHandler}
              value={values._sortBy}
            >
              <option value="">---------</option>
              <option value="fullName">Nombre</option>
              <option value="id">ID</option>
              <option value="status">Estatus</option>
            </select>
            <select
              name="_sortOrder"
              className="p-2 bg-gray-200 w-full rounded-md border-b-2 border-gray-500"
              onChange={onChangeHandler}
              value={values._sortOrder}
            >
              <option value="ASC">ASC</option>
              <option value="DESC">DESC</option>
            </select>
            <div>
              <button
                className="bg-primary-500 hover:bg-primary-700 text-white p-2"
                type="submit"
              >
                Aplicar
              </button>
              <button
                className="bg-secondary-500 hover:bg-secondary-700 text-white p-2"
                type="reset"
              >
                Limpiar
              </button>
            </div>
          </Card>
        </div>
      </form>
      
    </div>
  );
}

export default SearchFilterOrder;
