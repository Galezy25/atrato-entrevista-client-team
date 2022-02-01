import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { STATUS_LABEL, UserStatus } from '../types/user';
import { Card } from './Card';

export interface SearchFilterOrderProps {
  onSubmitHandler: (values: {
    status?: string;
    _search?: string;
    _sortBy?: string;
    _sortOrder?: string;
  }) => void | Promise<any>;
  initialValues: {
    status?: string;
    _search?: string;
    _sortBy?: string;
    _sortOrder?: string;
  };
}

export function SearchFilterOrder({
  onSubmitHandler,
  initialValues,
}: SearchFilterOrderProps) {
  const [showMore, setShowMore] = useState(false);

  const handleShowMoreClick = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <Card className="bg-white p-2 max-w-fit">
      <Formik initialValues={initialValues} onSubmit={onSubmitHandler}>
        {() => (
          <Form className="flex">
            <Field
              className="p-2 bg-gray-200 rounded-md border-b-2 border-gray-500"
              name="_search"
              type="search"
              defaultValue=""
              placeholder="Buscar"
            />
            {showMore && (
              <div
                className="fixed min-w-full z-30 min-h-screen bg-transparent"
                onClick={() => setShowMore(false)}
              ></div>
            )}
            <div className="relative z-30">
              <button
                type="button"
                title="Mas opciones"
                className="p-2 bg-white hover:bg-gray-200 m-1 text-neutral-400"
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
                <Field
                  className="p-2 bg-gray-200 rounded-md border-b-2 border-gray-500"
                  name="status"
                  as="select"
                  defaultValue=""
                >
                  <option value="">--Selecciona--</option>
                  <option value={UserStatus.PENDING}>
                    {STATUS_LABEL[UserStatus.PENDING]}
                  </option>
                  <option value={UserStatus.IN_PROCESS}>
                    {STATUS_LABEL[UserStatus.IN_PROCESS]}
                  </option>
                  <option value={UserStatus.COMPLETED}>
                    {STATUS_LABEL[UserStatus.COMPLETED]}
                  </option>
                </Field>
                <hr />
                <h6>Ordenar por:</h6>
                <Field
                  className="p-2 bg-gray-200 rounded-md border-b-2 border-gray-500"
                  name="_sortBy"
                  as="select"
                  defaultValue=""
                >
                  <option value="">--Selecciona--</option>
                  <option value="fullname">Nombre</option>
                  <option value="id">ID</option>
                  <option value="status">Estado</option>
                </Field>
                <Field
                  as="select"
                  name="_sortOrder"
                  defaultValue=""
                  className="p-2 bg-gray-200 w-full rounded-md border-b-2 border-gray-500"
                >
                  <option value="ASC">ASC</option>
                  <option value="DESC">DESC</option>
                </Field>
                <div>
                  <button
                    className="bg-primary-500 hover:bg-primary-700 text-white p-2"
                    type="submit"
                  >
                    Aplicar
                  </button>
                </div>
              </Card>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default SearchFilterOrder;
