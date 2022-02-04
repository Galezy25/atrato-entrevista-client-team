import { Field, Form, Formik, FormikErrors, FormikProps } from 'formik';
import moment from 'moment';
import { STATUS_LABEL, User, UserStatus } from '../types/user';
import LoadingElement from './LoadingElement';
import validationSchema from './UserForm.validation';

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
  'rounded-md border-2 p-2 w-full bg-gray-200 border-gray-500 ';

export function UserForm({ prev, onSubmit, status = 'none' }: UserFormProps) {
  let disable = status !== 'none';
  if (prev) {
    prev = {
      ...prev,
      birthday: moment(prev.birthday).format('YYYY-MM-DD'),
      cardInfo: {
        ...prev.cardInfo,
        date: moment(prev.cardInfo.date).format('YYYY-MM'),
      },
    };
  }
  return (
    <Formik
      initialValues={{ ...initialValues, ...prev }}
      validationSchema={validationSchema}
      onSubmit={(values: any) => {
        values.status = +values.status;
        values.birthday = moment(values.birthday, 'YYYY-MM-DD').format();
        values.cardInfo.date = moment(values.cardInfo.date).format();
        onSubmit(values);
      }}
    >
      {({ errors, isValid }: FormikProps<any>) => (
        <LoadingElement status={status} iconSize="5x">
          <Form className="py-4 px-2 sm:px-4 grid grid-cols-1 gap-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              <div className="col-span-full sm:col-span-1 ">
                <label htmlFor="firstName">Nombre</label>
                <Field
                  disabled={disable}
                  className={
                    FIELD_CLASSNAME + (errors.firstName && ' border-red-500')
                  }
                  name="firstName"
                />
              </div>
              <div className="col-span-full sm:col-span-1 ">
                <label htmlFor="middleName">Segundo nombre</label>
                <Field
                  disabled={disable}
                  className={
                    FIELD_CLASSNAME + (errors.middleName && ' border-red-500')
                  }
                  name="middleName"
                />
              </div>
              <div className="col-span-full md:col-span-2 ">
                <label htmlFor="surnames">Apellidos</label>
                <Field
                  disabled={disable}
                  className={
                    FIELD_CLASSNAME + (errors.surnames && ' border-red-500')
                  }
                  name="surnames"
                />
              </div>
              <div className="col-span-full md:col-span-2 ">
                <label htmlFor="email">Correo</label>
                <Field
                  disabled={disable}
                  className={
                    FIELD_CLASSNAME + (errors.email && ' border-red-500')
                  }
                  name="email"
                  type="email"
                />
              </div>
              <div className="col-span-full md:col-span-2">
                <label htmlFor="phone">Teléfono</label>
                <Field
                  disabled={disable}
                  className={
                    FIELD_CLASSNAME + (errors.phone && ' border-red-500')
                  }
                  name="phone"
                  type="phone"
                />
              </div>
              <div className="col-span-full sm:col-span-1">
                <label htmlFor="birthday">Fecha de nacimiento</label>
                <Field
                  disabled={disable}
                  className={
                    FIELD_CLASSNAME + (errors.birthday && ' border-red-500')
                  }
                  name="birthday"
                  type="date"
                />
              </div>
              <div className="col-span-full sm:col-span-1">
                <label htmlFor="status">Estatus</label>
                <Field
                  disabled={disable}
                  as="select"
                  className={
                    FIELD_CLASSNAME + (errors.status && ' border-red-500')
                  }
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
                  className={
                    FIELD_CLASSNAME + (errors.analyst && ' border-red-500')
                  }
                  name="analyst"
                />
              </div>
            </div>
            <hr className="border-neutral-400 my-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              <h4 className="col-span-full">Información de la tarjeta</h4>
              <div className="col-span-full md:col-span-2">
                <label htmlFor="cardInfo.fullName">Nombre en tarjeta</label>
                <Field
                  disabled={disable}
                  className={
                    FIELD_CLASSNAME +
                    ((errors.cardInfo as FormikErrors<any> | undefined)
                      ?.fullName && ' border-red-500')
                  }
                  name="cardInfo.fullName"
                />
              </div>
              <div className="col-span-full md:col-span-2">
                <label htmlFor="cardInfo.cardNumber">Número de tarjeta</label>
                <Field
                  disabled={disable}
                  className={
                    FIELD_CLASSNAME +
                    ((errors.cardInfo as FormikErrors<any> | undefined)
                      ?.cardNumber && ' border-red-500')
                  }
                  name="cardInfo.cardNumber"
                />
              </div>
              <div>
                <label htmlFor="cardInfo.cvv">CVV</label>
                <Field
                  disabled={disable}
                  className={
                    FIELD_CLASSNAME +
                    ((errors.cardInfo as FormikErrors<any> | undefined)?.cvv &&
                      ' border-red-500')
                  }
                  name="cardInfo.cvv"
                />
              </div>
              <div>
                <label htmlFor="cardInfo.date">Fecha de vencimiento</label>
                <Field
                  disabled={disable}
                  className={
                    FIELD_CLASSNAME +
                    ((errors.cardInfo as FormikErrors<any> | undefined)?.date &&
                      ' border-red-500')
                  }
                  name="cardInfo.date"
                  type="month"
                />
              </div>
              <div>
                <label htmlFor="cardInfo.type">Proveedor de tarjeta</label>
                <Field
                  disabled={disable}
                  className={
                    FIELD_CLASSNAME +
                    ((errors.cardInfo as FormikErrors<any> | undefined)?.type &&
                      ' border-red-500')
                  }
                  name="cardInfo.type"
                />
              </div>
              <div>
                <label htmlFor="cardInfo.pin">PIN</label>
                <Field
                  disabled={disable}
                  className={
                    FIELD_CLASSNAME +
                    ((errors.cardInfo as FormikErrors<any> | undefined)?.pin &&
                      ' border-red-500')
                  }
                  name="cardInfo.pin"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                disabled={!isValid}
                type="submit"
                className="rounded-md bg-primary-500 hover:bg-primary-700 text-white font-bold p-2"
              >
                Enviar
              </button>
            </div>
          </Form>
        </LoadingElement>
      )}
    </Formik>
  );
}

export default UserForm;
