import * as TYPES from '../types';

//Email Validation Action
export const loginRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.LOGIN_REQUEST_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
//Social Login Action
export const socialLoginRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SOCIAL_LOGIN_REQUEST_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
//Sign up obj Action
export const signUpRequest = (item, params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SIGNUP_REQUEST,
    item,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Forgot Password Action
export const forgotPassRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.FORGOT_PASSWORD_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
//Reset Password Action
export const resetPassRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.RESET_PASSWORD_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
//Verify OTP Action
export const verifyOTPRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.OTP_VERIFY_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//get phone number list
export const getPhoneNumberRequest = (params, cbSuccess) => {
  return {
    type: TYPES.GET_PHONE_NUMBER_REQUEST,
    params,
    cbSuccess,
  };
};

//Resend OTP Action
export const resendOTPRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.RESEND_OTP_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Set Theme
export const setAppTheme = (params, cbSuccess) => {
  return {
    type: TYPES.SET_APP_THEME_REQUEST,
    params,
    cbSuccess,
  };
};

//Logout
export const logoutRequset = (params, callBack) => {
  return {
    type: TYPES.LOGOUT_REQUEST_REQUEST,
    params,
    callBack,
  };
};

//Set Walkthrough Action
export const saveSignUpDataRequset = (params, cbSuccess) => {
  return {
    type: TYPES.SAVE_SIGNUP_DATA_REQUEST,
    params,
    cbSuccess,
  };
};

// Get User Profile
export const getUserProfile = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_PROFILE_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

// Update User Profile
export const updateUserProfile = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.UPDATE_PROFILE_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Update Email
export const updateUserEmail = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.UPDATE_EMAIL_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

export const setOpenTabs = (params, cbSuccess) => {
  return {
    type: TYPES.SET_OPEN_TABS_REQUEST,
    params,
    cbSuccess,
  };
};

export const logoutUser = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.LOGOUT,
    params,
    cbSuccess,
    cbFailure,
  };
};
