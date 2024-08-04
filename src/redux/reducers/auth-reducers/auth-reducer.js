import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  isSuccess: false,
  isFailure: false,
  userInfo: null,
  forgotPassRes: null,
  resetPassRes: null,
  signup_data: null,
  phone_list: [],
  resendData: null,
  profile_info: null,
  openTab: false,
};
const authReducer = (state = initialState, actions) => {
  const {type, payload} = actions;
  switch (type) {
    //************Login Sates*************
    case TYPES.LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        userInfo: payload,
      };

    case TYPES.LOGIN_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        userInfo: null,
      };

    //************Verify OTP Sates*************
    case TYPES.OTP_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        userInfo: payload,
      };

    case TYPES.OTP_VERIFY_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        userInfo: null,
      };
    //************Social Login Sates*************

    case TYPES.SOCIAL_LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        userInfo: payload,
        signup_data: null,
      };

    case TYPES.SOCIAL_LOGIN_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        userInfo: null,
        signup_data: null,
      };

    //************SignUp Sates*************

    case TYPES.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        userInfo: payload,
      };
    case TYPES.SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        userInfo: null,
      };

    //************Forgot Password Sates*************

    case TYPES.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: true,
        isSuccess: true,
        isFailure: false,
        forgotPassRes: payload,
      };
    case TYPES.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        forgotPassRes: null,
      };

    //************Resend OTP  Sates*************

    case TYPES.RESEND_OTP_SUCCESS:
      return {
        ...state,
        loading: true,
        isSuccess: true,
        isFailure: false,
        resendData: payload,
      };
    case TYPES.RESEND_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        resendData: null,
      };

    //************Reset Password Sates*************

    case TYPES.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: true,
        isSuccess: true,
        isFailure: false,
        resetPassRes: payload,
      };
    case TYPES.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        resetPassRes: null,
      };

    //************Logout Sates*************
    case TYPES.LOGOUT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        userInfo: null,
        profile_info: null,
      };

    case TYPES.LOGOUT_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        userInfo: null,
        profile_info: null,
      };

    //************Phone List Sates*************
    case TYPES.GET_PHONE_NUMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        phone_list: payload,
      };

    case TYPES.GET_PHONE_NUMBER_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        phone_list: null,
      };

    //************Get Profile Info Sates*************

    case TYPES.GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: true,
        isSuccess: true,
        isFailure: false,
        profile_info: payload,
      };
    case TYPES.GET_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        profile_info: null,
      };

    //************Profile Info Sates*************

    case TYPES.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: true,
        isSuccess: true,
        isFailure: false,
        profile_info: payload,
      };
    case TYPES.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        profile_info: null,
      };

    //************Email Update  Sates*************

    case TYPES.UPDATE_EMAIL_SUCCESS:
      state.profile_info.user.email = payload?.user?.email;
      return {
        ...state,
        loading: true,
        isSuccess: true,
        isFailure: false,
        profile_info: state?.profile_info,
      };
    case TYPES.UPDATE_EMAIL_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };

    //************SignUp Sates*************

    case TYPES.SAVE_SIGNUP_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        signup_data: payload,
      };

    //************Tabs Sates*************

    case TYPES.SET_OPEN_TABS_SUCCESS:
      return {
        ...state,
        loading: false,
        openTab: payload,
      };

    default:
      return state;
  }
};
export default authReducer;
