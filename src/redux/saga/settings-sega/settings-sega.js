import {takeLatest, put} from 'redux-saga/effects';
import {responseValidator} from '../../../shared/exporter';
import {
  addBankAccount,
  addDebitCard,
  checkConnectedAccount,
  delBankAccount,
  delDebitCard,
  editBankAccount,
  editDebitCard,
  getAllPaymentBanks,
  getAllPaymentCards,
  getDefaultBankData,
  getDefaultCard,
  payWithDebitCard,
  updateStatus,
  getPrivacyPolicy,
  getTermsAndConditions,
  getFaqs,
  getSupport,
  PostSupportTicket,
  topUpAccount,
  withdrawAccount,
  transferAccount,
  saveFCMTokenApi,
} from '../../../shared/service/SettingService';
import * as types from '../../actions/types';

// *************Login Sega**************
export function* updateStatusRequestSega() {
  yield takeLatest(types.UPDATE_STATUS_REQUEST, update_status);
}
function* update_status(params) {
  try {
    const res = yield updateStatus(params?.params);
    if (res?.data) {
      yield put({
        type: types.UPDATE_STATUS_SUCCESS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    yield put({
      type: types.UPDATE_STATUS_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

//************************************Payments*************************

// *************ADD CARD SEGA**************
export function* addcardRequest() {
  yield takeLatest(types.ADD_CARD_REQUEST, addCard);
}
function* addCard(params) {
  try {
    const res = yield addDebitCard(params?.params);
    if (res.data) {
      yield put({
        type: types.ADD_CARD_SUCCESS,
        payload: res.data,
      });
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.ADD_CARD_FAILURE,
      payload: null,
    });

    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************EDIT CARD SEGA**************
export function* editcardRequest() {
  yield takeLatest(types.EDIT_CARD_REQUEST, editCard);
}
function* editCard(params) {
  try {
    const res = yield editDebitCard(params?.params);
    if (res.data) {
      yield put({
        type: types.EDIT_CARD_SUCCESS,
        payload: res.data,
      });
      console.log(res.data);
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.EDIT_CARD_FAILURE,
      payload: null,
    });

    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************GET PAYMENT CARD SEGA**************
export function* getPaymentCardRequest() {
  yield takeLatest(types.GET_CARD_LIST_REQUEST, paymentsCards);
}
function* paymentsCards(params) {
  try {
    const res = yield getAllPaymentCards();
    if (res.data) {
      yield put({
        type: types.GET_CARD_LIST_SUCCESS,
        payload: res.data,
      });
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    console.log(error?.response?.status);
    yield put({
      type: types.GET_CARD_LIST_FAILURE,
      payload: null,
    });

    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************GET PAYMENT BANK SEGA**************
export function* getPaymentBankRequest() {
  yield takeLatest(types.GET_BANK_LIST_REQUEST, paymentsBanks);
}
function* paymentsBanks(params) {
  try {
    const res = yield getAllPaymentBanks();
    if (res.data) {
      yield put({
        type: types.GET_BANK_LIST_SUCCESS,
        payload: res.data,
      });
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    console.log(error?.response?.status);
    yield put({
      type: types.GET_BANK_LIST_FAILURE,
      payload: null,
    });

    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************PAY WITH DEBIT SEGA**************
export function* payWithDebitRequest() {
  yield takeLatest(types.PAY_WITH_DEBIT_REQUEST, payWithDebit);
}
function* payWithDebit(params) {
  try {
    const res = yield payWithDebitCard(params?.route, params?.params);
    if (res.data) {
      yield put({
        type: types.PAY_WITH_DEBIT_SUCCESS,
        payload: res.data,
      });
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.PAY_WITH_DEBIT_FAILURE,
      payload: null,
    });

    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************PAY WITH SOCIAL SEGA**************
export function* payWithSocialAccountRequest() {
  yield takeLatest(types.PAY_WITH_SOCIAL_REQUEST, payWithSocial);
}
function* payWithSocial(params) {
  try {
    const res = yield payWithSocialCard(params?.payment_type, params?.params);
    if (res.data) {
      yield put({
        type: types.PAY_WITH_SOCIAL_SUCCESS,
        payload: res.data,
      });
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.PAY_WITH_SOCIAL_FAILURE,
      payload: null,
    });

    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Delete CARD SEGA**************
export function* delCardRequest() {
  yield takeLatest(types.DELETE_CARD_REQUEST, delCard);
}
function* delCard(params) {
  try {
    const res = yield delDebitCard(params?.params);
    if (res.data) {
      yield put({
        type: types.DELETE_CARD_SUCCESS,
        payload: params?.params,
      });
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.DELETE_CARD_FAILURE,
      payload: null,
    });

    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************DEFAULT CARD SEGA**************
export function* defaultCardRequest() {
  yield takeLatest(types.ADD_DEFAULT_CARD_REQUEST, defaultCard);
}
function* defaultCard(params) {
  try {
    console.log(params?.params?.card?.id);
    const res = yield editDebitCard({
      card_id: params?.params?.card?.id,
      default: true,
    });
    if (res.data) {
      yield put({
        type: types.ADD_DEFAULT_CARD_SUCCESS,
        payload: params?.params,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.ADD_DEFAULT_CARD_FAILURE,
      payload: null,
    });

    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************GET DEFAULT CARD SEGA**************
export function* getdefaultCardRequest() {
  yield takeLatest(types.GET_DEFAULT_CARD_REQUEST, getdefaultCard);
}
function* getdefaultCard(params) {
  try {
    const res = yield getDefaultCard();

    yield put({
      type: types.GET_DEFAULT_CARD_SUCCESS,
      payload: res?.data,
    });
    params?.cbSuccess(res?.data);
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_DEFAULT_CARD_FAILURE,
      payload: null,
    });

    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

//******************Banks **************** */

// *************ADD PAYMENT BANK SEGA**************
export function* addPaymentBankRequest() {
  yield takeLatest(types.ADD_BANK_REQUEST, addBank);
}
function* addBank(params) {
  try {
    const res = yield addBankAccount(params?.params);
    if (res.data) {
      yield put({
        type: types.ADD_BANK_SUCCESS,
        payload: res.data,
      });
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    console.log(error?.response?.status);
    yield put({
      type: types.ADD_BANK_FAILURE,
      payload: null,
    });

    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}
//Edit Bank

export function* editBankRequest() {
  yield takeLatest(types.EDIT_BANK_REQUEST, editBank);
}
function* editBank(params) {
  try {
    const body = {
      account_holder_name: params?.params?.account_holder_name,
    };
    const res = yield editBankAccount(params?.params?.bank_id, body);
    if (res.data) {
      yield put({
        type: types.EDIT_BANK_SUCCESS,
        payload: res.data,
      });
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.EDIT_BANK_FAILURE,
      payload: null,
    });

    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************DEFAULT Bank SEGA**************
export function* defaultBankRequest() {
  yield takeLatest(types.ADD_DEFAULT_BANK_REQUEST, defaultBank);
}
function* defaultBank(params) {
  try {
    const body = {
      default: 'true',
    };
    const res = yield editBankAccount(params?.params?.bank_id, body);
    if (res.data) {
      yield put({
        type: types.ADD_DEFAULT_BANK_SUCCESS,
        payload: params?.params,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.ADD_DEFAULT_BANK_FAILURE,
      payload: null,
    });

    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************GET DEFAULT Bank SEGA**************
export function* getdefaultbankRequest() {
  yield takeLatest(types.GET_DEFAULT_BANK_REQUEST, getdefaultbank);
}
function* getdefaultbank(params) {
  try {
    const res = yield getDefaultBankData();
    yield put({
      type: types.GET_DEFAULT_BANK_SUCCESS,
      payload: res?.data,
    });
    params?.cbSuccess(res?.data);
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_DEFAULT_BANK_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Delete CARD SEGA**************
export function* delAcoountRequest() {
  yield takeLatest(types.DELETE_BANK_REQUEST, delAccount);
}
function* delAccount(params) {
  try {
    const res = yield delBankAccount(params?.params);
    if (res.data) {
      yield put({
        type: types.DELETE_CARD_SUCCESS,
        payload: params?.params,
      });
      params?.cbSuccess(res.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.DELETE_CARD_FAILURE,
      payload: null,
    });

    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Payment Method SEGA**************
export function* setPaymentMethodRequest() {
  yield takeLatest(types.PAYMENT_METHOD_REQUEST, paymentMethod);
}
function* paymentMethod(params) {
  try {
    yield put({
      type: types.PAYMENT_METHOD_SUCCESS,
      payload: params?.params,
    });
    params?.cbSuccess(params?.params);
  } catch (error) {
    console.log(error);
  }
}

// *************Connected Account SEGA**************
export function* checkConnectedRequest() {
  yield takeLatest(types.CHECK_CONNECTED_ACCOUNT_REQUEST, checkConnected);
}
function* checkConnected(params) {
  try {
    const res = yield checkConnectedAccount();
    if (res?.data) {
      yield put({
        type: types.CHECK_CONNECTED_ACCOUNT_SUCCESS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    let msg = responseValidator(error?.response?.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

export function* setCheckoutDataRequest() {
  yield takeLatest(types.SET_CHECKOUT_DATA_REQUEST, setCheckoutData);
}
function* setCheckoutData(params) {
  try {
    yield put({
      type: types.SET_CHECKOUT_DATA_SUCCESS,
      payload: params?.params,
    });
    params?.cbSuccess(params?.params);
  } catch (error) {
    console.log(error);
  }
}
// Top Up Amount
export function* topUpAccountRequest() {
  yield takeLatest(types.TOP_UP_ACCOUNT_REQUEST, setTopUp);
}
function* setTopUp(params) {
  try {
    const res = yield topUpAccount(params?.params);
    if (res) {
      yield put({
        type: types.TOP_UP_ACCOUNT_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.TOP_UP_ACCOUNT_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// Withdraw Amount
export function* withdrawAccountRequest() {
  yield takeLatest(types.WITHDRAW_REQUEST, setwithdraw);
}
function* setwithdraw(params) {
  try {
    const res = yield withdrawAccount(params?.params);
    if (res) {
      yield put({
        type: types.WITHDRAW_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.WITHDRAW_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// Transfer Amount
export function* TransferAccountRequest() {
  yield takeLatest(types.TRANSFER_PAYMENT_REQUEST, setTransfer);
}
function* setTransfer(params) {
  try {
    const res = yield transferAccount(params?.params);
    if (res) {
      yield put({
        type: types.TRANSFER_PAYMENT_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.TRANSFER_PAYMENT_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

//************************************Payments End*************************
// *********************** Get Privacy Policy ***********************
export function* getPrivacyPolicyRequest() {
  yield takeLatest(types.GET_PRIVACY_POLICY, getPrivacyPolicyFun);
}
function* getPrivacyPolicyFun(params) {
  try {
    const res = yield getPrivacyPolicy();
    if (res) {
      yield put({
        type: types.GET_PRIVACY_POLICY_PASS,
        payload: res?.data?.description || '',
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_PRIVACY_POLICY_FAIL,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *********************** Get TERMS AND CONDITIONS ***********************
export function* getTermsAndConditionRequest() {
  yield takeLatest(types.GET_TERMS_AND_CONDITIONS, getTermsAndConditionFun);
}
function* getTermsAndConditionFun(params) {
  try {
    const res = yield getTermsAndConditions();
    if (res) {
      yield put({
        type: types.GET_TERMS_AND_CONDITIONS_PASS,
        payload: res?.data?.description || '',
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_TERMS_AND_CONDITIONS_FAIL,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *********************** Get TERMS AND CONDITIONS ***********************
export function* saveFCMTokenRequest() {
  yield takeLatest(types.SAVE_FCM_TOKEN_REQUEST, saveFCMToken);
}
function* saveFCMToken(params) {
  try {
    const res = yield saveFCMTokenApi(params?.params);
    if (res) {
      yield put({
        type: types.SAVE_FCM_TOKEN_SUCCESS,
        payload: res?.data || '',
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.SAVE_FCM_TOKEN_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *********************** Get FAQS ***********************
export function* getFaqsRequest() {
  yield takeLatest(types.GET_FAQS, getFaqsFun);
}
function* getFaqsFun(params) {
  try {
    const res = yield getFaqs();
    if (res?.data) {
      for (let i = 0; i < res?.data.length; i++) {
        res.data[i]['expanded'] = false;
      }
      yield put({
        type: types.GET_FAQS_PASS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_FAQS_FAIL,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ******************************* GET Support ****************************
export function* getSupportRequest() {
  yield takeLatest(types.GET_SUPPORT, getSupportFun);
}

function* getSupportFun(params) {
  try {
    const res = yield getSupport();
    if (res) {
      yield put({
        type: types.GET_SUPPORT_PASS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_SUPPORT_FAIL,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************************************* POST SUPPORT TICKET *********************************

// *************Login Sega**************
export function* CreateTicketRequest() {
  yield takeLatest(types.POST_TICKET, create_Ticket);
}
function* create_Ticket(params) {
  try {
    const res = yield PostSupportTicket(params?.params);
    console.log(res);
    if (res) {
      yield put({
        type: types.POST_TICKET_PASS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.POST_TICKET_FAIL,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}
