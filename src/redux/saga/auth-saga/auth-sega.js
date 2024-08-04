import AsyncStorage from '@react-native-async-storage/async-storage';
import {takeLatest, put} from 'redux-saga/effects';
import {responseValidator} from '../../../shared/exporter';
import {
  loginUser,
  registerUser,
  resetPassword,
  socialLogin,
  OTPVerify,
  forgotPassword,
  getPhoneNumberList,
  resendOTP,
  updateEmail,
  updateProfile,
  getProfile,
  signOut,
} from '../../../shared/service/AuthService';
import * as types from '../../actions/types';

// *************Login Sega**************
export function* loginRequest() {
  yield takeLatest(types.LOGIN_REQUEST_REQUEST, login);
}
function* login(params) {
  try {
    const res = yield loginUser(params?.params);
    if (res) {
      yield put({
        type: types.LOGIN_REQUEST_SUCCESS,
        payload: res,
      });
      AsyncStorage.setItem('usertoken', JSON.stringify(res?.token));
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.LOGIN_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Social Login Login Sega**************
export function* socialLoginRequest() {
  yield takeLatest(types.SOCIAL_LOGIN_REQUEST_REQUEST, socialLoginUser);
}
function* socialLoginUser(params) {
  try {
    const res = yield socialLogin(params?.params);
    if (res.data) {
      yield put({
        type: types.SOCIAL_LOGIN_REQUEST_SUCCESS,
        payload: res.data,
      });
      AsyncStorage.setItem('usertoken', JSON.stringify(res?.data?.token));
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    yield put({
      type: types.SOCIAL_LOGIN_REQUEST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status);
    params?.cbFailure(msg);
  }
}

// *************Sign Up Sega**************
export function* signUpRequest() {
  yield takeLatest(types.SIGNUP_REQUEST, signUp);
}

function* signUp(params) {
  try {
    const res = yield registerUser(params.params, params.item);

    if (res) {
      yield put({
        type: types.SIGNUP_SUCCESS,
        payload: res,
      });
      AsyncStorage.setItem('usertoken', JSON.stringify(res?.token));
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.SIGNUP_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    console.log('ERROR:   ', error);
    params?.cbFailure(msg);
  }
}

// *************Forgot Sega**************
export function* forgotPassRequest() {
  yield takeLatest(types.FORGOT_PASSWORD_REQUEST, forgot);
}

function* forgot(params) {
  try {
    const body = {
      email: params?.params?.forgotRes?.email,
    };
    const res = yield forgotPassword(body);
    if (res.data) {
      yield put({
        type: types.FORGOT_PASSWORD_SUCCESS,
        payload: params?.params,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    yield put({
      type: types.FORGOT_PASSWORD_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Verify OTP Sega**************
export function* OTPVerifyRequest() {
  yield takeLatest(types.OTP_VERIFY_REQUEST, verifyOTP);
}

function* verifyOTP(params) {
  try {
    const res = yield OTPVerify(params?.params);
    if (res.data) {
      yield put({
        type: types.OTP_VERIFY_SUCCESS,
        payload: res?.data,
      });
      AsyncStorage.setItem('usertoken', JSON.stringify(res?.data?.token));
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    yield put({
      type: types.OTP_VERIFY_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Resend OTP  Sega**************
export function* resendOTPRequestSega() {
  yield takeLatest(types.RESEND_OTP_REQUEST, resend_otp);
}

function* resend_otp(params) {
  try {
    const res = yield resendOTP(params?.params);
    console.log(res);
    if (res) {
      yield put({
        type: types.RESEND_OTP_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.RESEND_OTP_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Reset Password Sega**************
export function* resetPassRequest() {
  yield takeLatest(types.RESET_PASSWORD_REQUEST, resetPass);
}

function* resetPass(params) {
  try {
    const res = yield resetPassword(params?.params);
    if (res.data) {
      yield put({
        type: types.RESET_PASSWORD_SUCCESS,
        payload: res.data,
      });
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    yield put({
      type: types.RESET_PASSWORD_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

export function* setAppThemeRequest() {
  yield takeLatest(types.SET_APP_THEME_REQUEST, setAppTheme);
}
function* setAppTheme(params) {
  try {
    yield put({
      type: types.SET_APP_THEME_SUCCESS,
      payload: params?.params,
    });
    params.cbSuccess();
  } catch (error) {}
}

//************* Logout **************
export function* logoutRequestSega() {
  yield takeLatest(types.LOGOUT_REQUEST_REQUEST, logout);
}
function* logout(params) {
  try {
    const res = yield signOut(params?.params);
    if (res.data) {
      yield put({
        type: types.LOGOUT_REQUEST_SUCCESS,
        payload: params,
      });
      params.callBack();
    }
  } catch (error) {
    console.log(error);
  }
}

//************* Save Sign Up Data **************
export function* saveSignUpRequestSega() {
  yield takeLatest(types.SAVE_SIGNUP_DATA_REQUEST, saveSignup);
}
function* saveSignup(params) {
  try {
    yield put({
      type: types.SAVE_SIGNUP_DATA_SUCCESS,
      payload: params.params,
    });
    params.cbSuccess();
  } catch (error) {
    console.log(error);
  }
}

//************* Save Sign Up Data **************
export function* getPhoneNumerRequestSega() {
  yield takeLatest(types.GET_PHONE_NUMBER_REQUEST, getPhones);
}
function* getPhones(params) {
  try {
    const res = yield getPhoneNumberList();
    if (res?.data) {
      yield put({
        type: types.GET_PHONE_NUMBER_SUCCESS,
        payload: res.data,
      });
      params.cbSuccess();
    }
  } catch (error) {
    console.log(error);
  }
}

// *************Update Profile Sega**************
export function* updateProfileRequest() {
  yield takeLatest(types.UPDATE_PROFILE_REQUEST, update_profile);
}
function* update_profile(params) {
  try {
    const res = yield updateProfile(params?.params);
    if (res) {
      yield put({
        type: types.UPDATE_PROFILE_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.UPDATE_PROFILE_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Update Profile Sega**************
export function* updateEmailRequest() {
  yield takeLatest(types.UPDATE_EMAIL_REQUEST, update_email);
}
function* update_email(params) {
  try {
    const res = yield updateEmail(params?.params);
    if (res) {
      yield put({
        type: types.UPDATE_EMAIL_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.UPDATE_EMAIL_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

//************* Save Sign Up Data **************
export function* getProfileRequestSega() {
  yield takeLatest(types.GET_PROFILE_REQUEST, get_profile);
}
function* get_profile(params) {
  try {
    const res = yield getProfile();
    if (res?.data) {
      yield put({
        type: types.GET_PROFILE_SUCCESS,
        payload: res.data,
      });
      params.cbSuccess(res?.data);
    }
  } catch (error) {
    yield put({
      type: types.GET_PROFILE_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

//************* SET Sign Up Data **************
export function* setTabsSega() {
  yield takeLatest(types.SET_OPEN_TABS_REQUEST, set_tabs);
}
function* set_tabs(params) {
  try {
    yield put({
      type: types.SET_OPEN_TABS_SUCCESS,
      payload: params?.params,
    });
    params.cbSuccess();
  } catch (error) {}
}
