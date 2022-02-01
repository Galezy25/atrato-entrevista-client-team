import { Field, Form, Formik } from 'formik';
import { STATUS_LABEL, User, UserStatus } from '../types/user';
import LoadingElement from './LoadingElement';

export interface UserFormProps {
  prev?: User;
  onSubmit: (values: User) => void;
  status: 'none' | 'loading' | 'error' | 'success';
}

const initialValues = {
  id: '',
  firstName: '',
  middleName: '',
  surnames: '',
  email: '',
  phone: '',
  birthday: '',
  status: UserStatus.PENDING,
  analyst: '',
  cardInfo: {
    type: '',
    cardNumber: '',
    cvv: '',
    date: '',
    fullName: '',
    pin: '',
  },
};

const FIELD_CLASSNAME =
  'rounded-md border-2 p-2 w-full bg-gray-200 border-gray-500';

export function UserForm({ prev, onSubmit, status = 'none' }: UserFormProps) {
  let disable = status !== 'none';
  return (
    <LoadingElement status={status} iconSize="5x">
      <Formik
        initialValues={prev || initialValues}
        onSubmit={(values: any) => {
          console.log(values);
          onSubmit(values);
        }}
      >
        {() => (
          <Form className="py-4 px-2 sm:px-4 grid grid-cols-1 gap-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              <div className="col-span-full sm:col-span-1 ">
                <label htmlFor="firstName">Nombre</label>
                <Field
                  disabled={disable}
                  className={FIELD_CLASSNAME}
                  name="firstName"
                />
              </div>
              <div className="col-span-full sm:col-span-1 ">
                <label htmlFor="middleName">Segundo Nombre</label>
                <Field
                  disabled={disable}
                  className={FIELD_CLASSNAME}
                  name="middleName"
                />
              </div>
              <div className="col-span-full md:col-span-2 ">
                <label htmlFor="surnames">Apellidos</label>
                <Field
                  disabled={disable}
                  className={FIELD_CLASSNAME}
                  name="surnames"
                />
              </div>
              <div className="col-span-full md:col-span-2 ">
                <label htmlFor="email">Correo electronico</label>
                <Field
                  disabled={disable}
                  className={FIELD_CLASSNAME}
                  name="email"
                  type="email"
                />
              </div>
              <div className="col-span-full md:col-span-2">
                <label htmlFor="phone">Teléfono</label>
                <Field
                  disabled={disable}
                  className={FIELD_CLASSNAME}
                  name="phone"
                  type="phone"
                />
              </div>
              <div className="col-span-full sm:col-span-1">
                <label htmlFor="birthday">Fecha de Nacimiento</label>
                <Field
                  disabled={disable}
                  className={FIELD_CLASSNAME}
                  name="birthday"
                  type="date"
                />
              </div>
              <div className="col-span-full sm:col-span-1">
                <label htmlFor="birthday">Estado</label>
                <Field
                  disabled={disable}
                  as="select"
                  className={FIELD_CLASSNAME}
                  name="status"
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
                </Field>
              </div>
              <div className="col-span-full md:col-span-2">
                <label htmlFor="analyst">Analista asignado</label>
                <Field
                  disabled={disable}
                  className={FIELD_CLASSNAME}
                  name="analyst"
                />
              </div>
            </div>
            <hr className="border-neutral-400 my-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              <h4 className="col-span-full">Datos de la tarjeta</h4>
              <div className="col-span-full md:col-span-2">
                <label htmlFor="cardInfo.fullName">Nombre en tarjeta</label>
                <Field
                  disabled={disable}
                  className={FIELD_CLASSNAME}
                  name="cardInfo.fullName"
                />
              </div>
              <div className="col-span-full md:col-span-2">
                <label htmlFor="cardInfo.cardNumber">Numero</label>
                <Field
                  disabled={disable}
                  className={FIELD_CLASSNAME}
                  name="cardInfo.cardNumber"
                />
              </div>
              <div>
                <label htmlFor="cardInfo.cvv">CVV</label>
                <Field
                  disabled={disable}
                  className={FIELD_CLASSNAME}
                  name="cardInfo.cvv"
                />
              </div>
              <div>
                <label htmlFor="cardInfo.date">Fecha de vencimiento</label>
                <Field
                  disabled={disable}
                  className={FIELD_CLASSNAME}
                  name="cardInfo.date"
                  type="month"
                />
              </div>
              <div>
                <label htmlFor="cardInfo.type">Tipo</label>
                <Field
                  disabled={disable}
                  className={FIELD_CLASSNAME}
                  name="cardInfo.type"
                />
              </div>
              <div>
                <label htmlFor="cardInfo.pin">Pin</label>
                <Field
                  disabled={disable}
                  className={FIELD_CLASSNAME}
                  name="cardInfo.pin"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-primary-500 hover:bg-primary-700 text-white font-bold p-2"
              >
                Enviar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </LoadingElement>
  );
}

export default UserForm;
