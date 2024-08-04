import {takeLatest, put} from 'redux-saga/effects';
import {responseValidator} from '../../../shared/exporter';
import {
  burnNumber,
  createConversationApi,
  deleteNumber,
  getAllBurnNumbers,
  getAllThemes,
  getConversationApi,
  getCurrentConversationApi,
  getMessageApi,
  GetTransHistory,
  readMessageApi,
  sendMessageApi,
} from '../../../shared/service/AppService';

import * as types from '../../actions/types';

// *************Get Theme Sega**************
export function* getThemesRequest() {
  yield takeLatest(types.GET_THEME_LIST_REQUEST, getThemes);
}
function* getThemes(params) {
  try {
    const res = yield getAllThemes();
    if (res) {
      yield put({
        type: types.GET_THEME_LIST_SUCCESS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_THEME_LIST_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

//Get All Burn Numbers

export function* getBurnNumbersRequest() {
  yield takeLatest(types.GET_BURN_NUMBERS_REQUEST, getBurnNum);
}
function* getBurnNum(params) {
  try {
    const res = yield getAllBurnNumbers();
    if (res) {
      yield put({
        type: types.GET_BURN_NUMBERS_SUCCESS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_BURN_NUMBERS_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

//Get All Burn Numbers

export function* burnNumberRequest() {
  yield takeLatest(types.BURN_NUMBER_REQUEST, burnNum);
}
function* burnNum(params) {
  try {
    const res = yield burnNumber();
    if (res) {
      yield put({
        type: types.BURN_NUMBER_SUCCESS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.BURN_NUMBER_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

//Get All Burn Numbers

export function* setCurrentItemRequest() {
  yield takeLatest(types.SET_ITEM_DETAIL_REQUEST, currentChecout);
}
function* currentChecout(params) {
  try {
    yield put({
      type: types.SET_ITEM_DETAIL_SUCCESS,
      payload: params?.params,
    });
    params?.cbSuccess(params?.params);
  } catch (error) {
    console.log(error);
  }
}

//delete  Burn Numbers

export function* delNumberRequest() {
  yield takeLatest(types.DELETE_NUMBER_REQUEST, delNum);
}
function* delNum(params) {
  try {
    const res = yield deleteNumber(params?.params);
    if (res) {
      yield put({
        type: types.DELETE_NUMBER_SUCCESS,
        payload: params?.params?.burn_number_id,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.DELETE_NUMBER_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// **********************Conversation Module
// Get Conversation

export function* getConversationRequest() {
  yield takeLatest(types.GET_ALL_CONVERSATION_REQUEST, getConversation);
}
function* getConversation(params) {
  try {
    const res = yield getConversationApi();
    if (res) {
      yield put({
        type: types.GET_ALL_CONVERSATION_SUCCESS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_ALL_CONVERSATION_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

export function* getCurrentConversationSega() {
  yield takeLatest(types.GET_CONVERSATION_REQUEST, getCurrentConversation);
}
function* getCurrentConversation(params) {
  try {
    const res = yield getCurrentConversationApi(params?.params);
    if (res) {
      yield put({
        type: types.GET_CONVERSATION_SUCCESS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_CONVERSATION_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// Create Conversation

export function* createConversationRequest() {
  yield takeLatest(types.CREATE_CONVERSATION_REQUEST, createConversation);
}
function* createConversation(params) {
  try {
    const res = yield createConversationApi(params?.params);
    if (res) {
      yield put({
        type: types.CREATE_CONVERSATION_SUCCESS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.CREATE_CONVERSATION_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// Send Messages

export function* sendMessagesRequest() {
  yield takeLatest(types.SEND_MESSAGE_REQUEST, sendMessages);
}
function* sendMessages(params) {
  try {
    const res = yield sendMessageApi(params?.params);
    if (res) {
      yield put({
        type: types.SEND_MESSAGE_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.SEND_MESSAGE_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// Read all Messages

export function* readAllMessageRequest() {
  yield takeLatest(types.READ_ALL_MESSAGES_REQUEST, readMessages);
}
function* readMessages(params) {
  try {
    const res = yield readMessageApi(params?.params);
    if (res?.data) {
      yield put({
        type: types.READ_ALL_MESSAGES_SUCCESS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.READ_ALL_MESSAGES_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// Send Messages

export function* getMessagesRequest() {
  yield takeLatest(types.GET_MESSAGE_REQUEST, getMessages);
}
function* getMessages(params) {
  try {
    const res = yield getMessageApi(params?.params);
    if (res?.data) {
      for (let i = 0; i < res?.data?.messages.length; i++) {
        res.data.messages[i]['play'] = false;
        res.data.messages[i]['loading'] = false;
        res.data.messages[i]['progress'] = 0;
      }
      yield put({
        type: types.GET_MESSAGE_SUCCESS,
        payload: res?.data?.messages?.sort((a, b) => a?.id - b?.id),
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_MESSAGE_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// Send Messages

export function* setMessageRequest() {
  yield takeLatest(types.SET_MESSAGE_REQUEST, setMessages);
}
function* setMessages(params) {
  try {
    yield put({
      type: types.SET_MESSAGE_SUCCESS,
      payload: params?.params,
    });
    params?.cbSuccess();
  } catch (error) {
    console.log(error);
  }
}

// Send Messages

export function* setCurrentMessageRequest() {
  yield takeLatest(types.CURRENT_MESSAGE_REQUEST, setCurrentMessages);
}
function* setCurrentMessages(params) {
  try {
    yield put({
      type: types.CURRENT_MESSAGE_SUCCESS,
      payload: params?.params,
    });
  } catch (error) {
    console.log(error);
  }
}

// Stop Play Messages

export function* setStopPlayRequest() {
  yield takeLatest(types.STOP_PLAY_REQUEST, setStopPlay);
}
function* setStopPlay(params) {
  try {
    yield put({
      type: types.STOP_PLAY_SUCCESS,
      payload: params?.params,
    });
  } catch (error) {
    console.log(error);
  }
}

// Set App Loading

export function* setloadPlayRequest() {
  yield takeLatest(types.SET_AUDIO_LOADING_REQUEST, setloadPlay);
}
function* setloadPlay(params) {
  try {
    yield put({
      type: types.SET_AUDIO_LOADING_SUCCESS,
      payload: params?.params,
    });
  } catch (error) {
    console.log(error);
  }
}

// Set Duration

export function* setdurationRequest() {
  yield takeLatest(types.SET_AUDIO_DURATION_REQUEST, setduration);
}
function* setduration(params) {
  try {
    const requestBody = {
      id: params?.params,
      progress: params?.progress,
    };
    yield put({
      type: types.SET_AUDIO_DURATION_SUCCESS,
      payload: requestBody,
    });
  } catch (error) {
    console.log(error);
  }
}

// Get Trans History
export function* TransHistory() {
  yield takeLatest(types.GET_TRANSACTION_HISTORY, getTransHistoryfun);
}

function* getTransHistoryfun(params) {
  try {
    const res = yield GetTransHistory();

    if (res) {
      yield put({
        type: types.GET_TRANSACTION_HISTORY_SUCCESS,
        payload: res,
      });

      params?.cbSuccess(res);
    }
  } catch (error) {
    yield put({
      type: types.GET_TRANSACTION_HISTORY_FAIL,
      payload: null,
    });

    let msg = responseValidator(error.response.status, error?.response?.data);
    console.log('ERROR:   ', error.message);
    params?.cbFailure(msg);
  }
}
