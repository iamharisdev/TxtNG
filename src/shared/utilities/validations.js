import * as yup from 'yup';

import {emailRegex} from './constant';

export const signupFormFields = {
  fullname: '',
  email: '',
  password: '',
};
export const addCardFormField = {
  fullname: '',
};

export const ticketMessage = {
  message: '',
};

export const addBankAccountFormField = {
  account_number: '',
  fullname: '',
  routing_number: '',
};
export const editBankAccountFormField = {
  fullname: '',
};

export const Step1FormFields = {
  fullname: '',
  email: '',
  password: '',
  confirmPassword: '',
  address1: '',
  address2: '',
};

export const SocialStep1FormFields = {
  fullname: '',
  email: '',
  address1: '',
  address2: '',
};

export const loginFormFields = {
  email: '',
  password: '',
};

export const updateFormFields = {
  fullname: '',
  email: '',
  image: '',
  phone: '',
};

export const resetFormFields = {
  password: '',
  confirmPassword: '',
};
export const forgotFormFields = {
  email: '',
};
export const phoneFormFields = {
  phone: '',
};
export const codeFormFields = {
  code: '',
};
export const setp2FormFields = {
  id: '',
  idType: '',
  frontId: '',
  backId: '',
};
export const updateEmailField = {
  old_email: '',
  new_email: '',
  password: '',
};
export const addContactForm = {
  fullname: '',
  image: '',
  phone: '',
};
export const createGroupForm = {
  groupName: '',
  groupStatus: '',
};

export const LoginVS = yup.object().shape({
  email: yup
    .string()
    .required('Email Required')
    .email('Please provide a valid email address'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password Required'),
});

export const SignUpVS = yup.object().shape({
  fullname: yup.string().required('Name Required').label('fullname'),
  email: yup
    .string()
    .required('Email Required')
    .email('Please provide a valid email address'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password Required'),
});

export const ResetPasswordVS = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('New Password Required'),

  confirmPassword: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Confirm New Password Required')
    .oneOf([yup.ref('password'), null], 'New Passwords do not match'),
});

export const ForgotPasswordVS = yup.object().shape({
  email: yup
    .string()
    .required('Email Required')
    .email('Please provide a valid email address'),
});

export const step2VS = yup.object().shape({
  id: yup
    .number()
    .typeError('Id should be a number')
    .required('ID No. Required'),
  idType: yup.object().shape().optional(),
  frontId: yup.object().shape().required('Front Id Required'),
  backId: yup.object().shape().required('Back Id Required'),
});
export const phoneVS = yup.object().shape({
  phone: yup
    .number()
    .typeError('Phone should be a number')
    .required('Phone Required'),
});
export const CodeVS = yup.object().shape({
  code: yup
    .string()
    .required('OTP Required')
    .matches(/^[0-9]+$/, 'OTP must be only digits')
    .min(6, 'OTP must be exactly 6 digits')
    .max(6, 'OTP must be exactly 6 digits'),
});

export const UpdateVS = yup.object().shape({
  fullname: yup.string().required('Name Required'),
  email: yup
    .string()
    .required('Email Required')
    .email('Please provide a valid email address'),
  phone: yup
    .number()
    .typeError('Phone should be a number')
    .optional('Phone Required'),

  image: yup.object().shape().required('Front Id Required'),
});

export const Step1SignUpVS = yup.object().shape({
  fullname: yup.string().required('Name Required').label('fullname'),
  email: yup
    .string()
    .required('Email Required')
    .email('Please provide a valid email address'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password Required'),
  confirmPassword: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Confirm New Password Required')
    .oneOf([yup.ref('password'), null], 'New Passwords do not match'),
  address1: yup.string().label('address1').required('Adrees Line 1 Required'),
  address2: yup.string().label('address2').optional(),
});

export const ScoialStep1SignUpVS = yup.object().shape({
  fullname: yup.string().required('Name Required').label('fullname'),
  email: yup
    .string()
    .required('Email Required')
    .email('Please provide a valid email address'),
  address1: yup.string().label('address1').required('Adrees Line 1 Required'),
  address2: yup.string().label('address2').optional(),
});

export const updateEmailVS = yup.object().shape({
  old_email: yup
    .string()
    .required('Old Email Required')
    .email('Please provide a valid email address'),
  new_email: yup
    .string()
    .required('New Email Required')
    .email('Please provide a valid email address'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password Required'),
});

export const addContactVS = yup.object().shape({
  fullname: yup.string().required('Name Required').label('fullname'),

  phone: yup
    .number()
    .typeError('Phone should be a number')
    .required('Phone Required'),
  image: yup.object().shape().required('Profile Image Required'),
});

export const addCardVS = yup.object().shape({
  fullname: yup.string().required('Name Required').label('fullname'),
});

export const messageTicket = yup.object().shape({
  message: yup.string().required('Message  Required').label('message'),
});

export const editBankAccountVS = yup.object().shape({
  fullname: yup
    .string()
    .required('Account Holder Name Required')
    .label('fullname'),
});
export const bankAccountVS = yup.object().shape({
  account_number: yup
    .number()
    .typeError('Account Number Invalid')
    .required('Account Number Required'),
  fullname: yup
    .string()
    .required('Account Holder Name Required')
    .label('fullname'),
  routing_number: yup.string().required('Routing Number Required'),
});

export const createGroupVS = yup.object().shape({
  groupName: yup.string().required('Group Name Required').label('groupName'),
  groupStatus: yup
    .string()
    .required('Group Status Required')
    .label('groupStatus'),
});
