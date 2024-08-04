import * as TYPES from '../types';

//Email Validation Action
export const updateStatusRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.UPDATE_STATUS_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

// ***************Payments***************

//get Payment Cards
export const get_payment_cards_request = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_CARD_LIST_REQUEST,
    cbSuccess,
    cbFailure,
  };
};
//Set Payment
export const add_card_request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ADD_CARD_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Edit Payment
export const edit_card_request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.EDIT_CARD_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Set Default Payment
export const default_card_request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ADD_DEFAULT_CARD_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Set Payment
export const delete_card_request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.DELETE_CARD_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Pay with Debit
export const get_default_card_request = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_DEFAULT_CARD_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

//Set Payment
export const add_bank_request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ADD_BANK_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Edit Payment
export const edit_bank_request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.EDIT_BANK_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Set Default Payment
export const default_bank_request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ADD_DEFAULT_BANK_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Set Payment
export const delete_bank_request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.DELETE_BANK_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Pay with Debit
export const get_default_bank_request = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_DEFAULT_BANK_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

//get Payment Banks
export const get_payment_bank_request = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_BANK_LIST_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

//Pay with Debit
export const pay_with_debit_request = (route, params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.PAY_WITH_DEBIT_REQUEST,
    route,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Pay with Google
export const pay_with_social_request = (
  payment_type,
  params,
  cbSuccess,
  cbFailure,
) => {
  return {
    type: TYPES.PAY_WITH_SOCIAL_REQUEST,
    payment_type,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Pay with Debit
export const payment_method_request = (params, cbSuccess) => {
  return {
    type: TYPES.PAYMENT_METHOD_REQUEST,
    params,
    cbSuccess,
  };
};

//Check Connected Account
export const check_connected_account = (params, cbSuccess) => {
  return {
    type: TYPES.CHECK_CONNECTED_ACCOUNT_REQUEST,
    params,
    cbSuccess,
  };
};

//Check Connected Account
export const set_checkout_data = (params, cbSuccess) => {
  return {
    type: TYPES.SET_CHECKOUT_DATA_REQUEST,
    params,
    cbSuccess,
  };
};

//Pay with Debit
export const add_wallet_amount_request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.TOP_UP_ACCOUNT_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
//Withdraw
export const withdraw_wallet_amount_request = (
  params,
  cbSuccess,
  cbFailure,
) => {
  return {
    type: TYPES.WITHDRAW_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Withdraw
export const transfer_wallet_amount_request = (
  params,
  cbSuccess,
  cbFailure,
) => {
  return {
    type: TYPES.TRANSFER_PAYMENT_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Get Privacy Policy
export const get_privacy_policy = cbSuccess => {
  return {
    type: TYPES.GET_PRIVACY_POLICY,
    cbSuccess,
  };
};

//Get Terms & Conditions
export const get_Terms_And_Conditions = cbSuccess => {
  return {
    type: TYPES.GET_TERMS_AND_CONDITIONS,
    cbSuccess,
  };
};

//GET FAQS
export const get_Faqs = cbSuccess => {
  return {
    type: TYPES.GET_FAQS,
    cbSuccess,
  };
};

// ***************End Payments***************
//GET SUPPORT
export const get_Support = cbSuccess => {
  return {
    type: TYPES.GET_SUPPORT,
    cbSuccess,
  };
};

//Post Ticket
export const Post_Ticket = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.POST_TICKET,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Save FCM Token
export const save_fcm_token_request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SAVE_FCM_TOKEN_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
