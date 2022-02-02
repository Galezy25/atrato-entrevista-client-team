import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string().email().required('Email is required'),
  phone: Yup.string().min(10).required('Phone is required'),
  firstName: Yup.string().required('First name is required'),
  middleName: Yup.string().optional(),
  surnames: Yup.string().required('Surnames is required'),
  birthday: Yup.date()
    .max(new Date(Date.now()))
    .required('Birthday is required'),
  status: Yup.number().required('Status is required'),
  analyst: Yup.string().required('Analyst is required'),
  cardInfo: Yup.object({
    cardNumber: Yup.string()
      .min(16)
      .max(17)
      .trim()
      .matches(/\d+/)
      .required('Card number is required'),
    fullName: Yup.string().required('Full name is required'),
    cvv: Yup.string().min(3).max(4).required('CVV is required'),
    pin: Yup.string().required('Pin is required'),
    type: Yup.string().required('Type is required'),
    date: Yup.string().required('Expire date is required'),
  }),
});

export default validationSchema;
