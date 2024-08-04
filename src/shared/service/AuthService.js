import axios from 'axios';
import {BASE_URL, ENDPOINTS, header, HTTP_CLIENT} from '../exporter';
import {GetToken} from '../utilities/headers';

//Authentication Requests
//Sign Up
export const registerUser = async (params, item) => {
  if (item?.type == 'social') {
    const res = await axios.patch(`${BASE_URL}${ENDPOINTS.PROFILE}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${await GetToken()}`,
      },
    });
    return res.data;
  } else {
    const res = await axios.post(`${BASE_URL}${ENDPOINTS.REGISTER}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
    return res.data;
  }
};

//Login
export const loginUser = async params => {
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.LOGIN}`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};
export const socialLogin = params => {
  return HTTP_CLIENT.post(`${ENDPOINTS.SOCIAL_LOGIN}`, params);
};
export const forgotPassword = params => {
  return HTTP_CLIENT.post(ENDPOINTS.FORGOT_PASS, params);
};
export const checkEmailAccount = params => {
  return HTTP_CLIENT.post(
    `${ENDPOINTS.EMAIL_PRFOILE}/check_email_duplication`,
    params,
  );
};

export const resendOTP = async params => {
  const res = await axios.post(`${BASE_URL}${ENDPOINTS.RESEND_OTP}`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};
export const OTPVerify = params => {
  return HTTP_CLIENT.post(ENDPOINTS.VERIFY_OTP, params);
};
export const resetPassword = params => {
  return HTTP_CLIENT.post(ENDPOINTS.RESET_PASS, params);
};
export const logoutUser = () => {
  return HTTP_CLIENT.post(ENDPOINTS.LOGOUT);
};

export const getPhoneNumberList = () => {
  return HTTP_CLIENT.post(`${ENDPOINTS.TEXTNG_NUMBER}/index`);
};

export const getPhoneNumber = () => {
  return HTTP_CLIENT.post(`${ENDPOINTS.TEXTNG_NUMBER}/generate_random_number`);
};
//Create Phone Number
export const createPhoneNumber = params => {
  return HTTP_CLIENT.post(`${ENDPOINTS.TEXTNG_NUMBER}/create`, params);
};

export const updateProfile = async params => {
  console.log(params);
  const res = await axios.patch(`${BASE_URL}${ENDPOINTS.PROFILE}`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await GetToken()}`,
    },
  });

  return res.data;
};
export const updateEmail = async params => {
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.EMAIL_PRFOILE}/update_user_email`,
    params,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${await GetToken()}`,
      },
    },
  );
  return res.data;
};

export const getProfile = () => {
  return HTTP_CLIENT.post(ENDPOINTS.GET_PROFILE);
};

export const signOut = async () => {
  const token = await GetToken();

  return axios.delete(`${BASE_URL}${ENDPOINTS.LOGOUT}`, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};
