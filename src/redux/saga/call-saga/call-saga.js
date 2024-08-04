import {responseValidator} from '../../../shared/exporter';
import {
  BlockUserfun,
  BlockUserfunApi,
  ClearLogsfun,
  ClearSpecificCallLogfun,
  destroyCallApi,
  destroyGroupVideoCallApi,
  destroyGroupVoiceCallApi,
  destroyVideoCallApi,
  GetAllCallLogsFun,
  GetAllRecentCallLogsFun,
  GetAudioCallLogsFun,
  GetVideoCallLogsFun,
  initializeCallApi,
  initializeGroupAudioCallApi,
  initializeGroupVideoCallApi,
  initializeVideoCallApi,
} from '../../../shared/service/CallServices';
import {takeLatest, put} from 'redux-saga/effects';
import * as types from '../../actions/types';

// ************* Get All Call Logs **************
export function* GetAllCallHistorySega() {
  yield takeLatest(types.GET_ALL_CALL_HISTORY, getAllHistory);
}
function* getAllHistory(params) {
  try {
    const res = yield GetAllCallLogsFun();
    if (res?.data) {
      yield put({
        type: types.GET_ALL_CALL_HISTORY_SUCCESS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_ALL_CALL_HISTORY_FAIL,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Get VOICE  Call Logs **************
export function* GetVoiceCallLogs() {
  yield takeLatest(types.GET_AUDIO_CALL_HISTORY, getAudioLogs);
}
function* getAudioLogs(params) {
  try {
    const res = yield GetAudioCallLogsFun();
    if (res) {
      // yield put({
      //   type: types.GET_ALL_CALL_HISTORY_SUCCESS,
      //   payload: res?.data,
      // });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(error);
    // yield put({
    //   type: types.GET_AUDIO_CALL_HISTORY_FAIL,
    //   payload: null,
    // });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Get VIdeo  Call Logs **************
export function* GetVideoCallLogs() {
  yield takeLatest(types.GET_VIDEO_CALL_HISTORY, getVideoLogs);
}
function* getVideoLogs(params) {
  try {
    const res = yield GetVideoCallLogsFun();
    if (res) {
      // yield put({
      //   type: types.GET_ALL_CALL_HISTORY_SUCCESS,
      //   payload: res?.data,
      // });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(error);
    // yield put({
    //   type: types.GET_AUDIO_CALL_HISTORY_FAIL,
    //   payload: null,
    // });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Get All Recent Call Logs **************
export function* GetAllRecentsCallLogs() {
  yield takeLatest(types.GET_RECENT_CALL_LOGS, getAllRecentLogs);
}
function* getAllRecentLogs(params) {
  try {
    const res = yield GetAllRecentCallLogsFun();
    if (res) {
      // yield put({
      //   type: types.GET_RECENT_CALL_LOGS_SUCCESS,
      //   payload: res?.data,
      // });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(error);
    // yield put({
    //   type: types.GET_RECENT_CALL_LOGS_FAIL,
    //   payload: null,
    // });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Clear All Call Logs **************
export function* ClearLogs() {
  yield takeLatest(types.CLEAR_ALL_CALL_LOGS, clearLogs);
}
function* clearLogs(params) {
  try {
    const res = yield ClearLogsfun(params);
    if (res) {
      yield put({
        type: types.CLEAR_ALL_CALL_LOGS_SUCCESS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.CLEAR_ALL_CALL_LOGS_FAIL,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Clear Specific Call Logs **************
export function* ClearSpecificLogs() {
  yield takeLatest(types.CLEAR_SPECIFIC_CALL_LOGS, clearLogsfun);
}
function* clearLogsfun(params) {
  try {
    const res = yield ClearSpecificCallLogfun(params?.params, params?.type1);

    if (res?.data) {
      // yield put({
      //   type: types.CLEAR_SPECIFIC_LOGS_SUCCESS,
      //   payload: res?.data,
      // });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    // yield put({
    //   type: types.CLEAR_ALL_CALL_LOGS_FAIL,
    //   payload: null,
    // });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* BLock USER **************
export function* BlockUser() {
  yield takeLatest(types.BLOCK_USER, blockUserfun);
}
function* blockUserfun(params) {
  try {
    const res = yield BlockUserfunApi(params?.params, params?.type1);

    if (res?.data) {
      // yield put({
      //   type: types.BLOCK_USER_SUCCESS,
      //   payload: res?.data,
      // });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    // yield put({
    //   type: types.BLOCK_USER_FAIL,
    //   payload: null,
    // });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Initialize Call **************
export function* initializeCallSega() {
  yield takeLatest(types.INITIALIZE_CALL_SERVICE_REQUEST, initializeCall);
}
function* initializeCall(params) {
  try {
    const res = yield initializeCallApi(params?.params);
    if (res?.data) {
      yield put({
        type: types.INITIALIZE_CALL_SERVICE_SUCCESS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.INITIALIZE_CALL_SERVICE_FAIL,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Initialize Call **************
export function* initializeVideoCallSega() {
  yield takeLatest(
    types.INITIALIZE_VIDEO_CALL_SERVICE_REQUEST,
    initializeVideoCall,
  );
}
function* initializeVideoCall(params) {
  try {
    const res = yield initializeVideoCallApi(params?.params);
    if (res?.data) {
      yield put({
        type: types.INITIALIZE_VIDEO_CALL_SERVICE_SUCCESS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.INITIALIZE_VIDEO_CALL_SERVICE_FAIL,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Destroy Call **************
export function* destroyVideoCallSega() {
  yield takeLatest(types.DESTROY_VIDEO_CALL_SERVICE_REQUEST, destroyVideoCall);
}
function* destroyVideoCall(params) {
  try {
    const res = yield destroyVideoCallApi(params?.params);
    if (res?.data) {
      yield put({
        type: types.DESTROY_VIDEO_CALL_SERVICE_SUCCESS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.DESTROY_VIDEO_CALL_SERVICE_FAIL,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Destroy Call **************
export function* destroyCallSega() {
  yield takeLatest(types.DESTROY_CALL_SERVICE_REQUEST, destroyCall);
}
function* destroyCall(params) {
  try {
    const res = yield destroyCallApi(params?.params);
    if (res?.data) {
      yield put({
        type: types.DESTROY_CALL_SERVICE_SUCCESS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.DESTROY_CALL_SERVICE_FAIL,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

//  Group call*************************************

// ************* Initialize Call **************
export function* initializeGroupCallSega() {
  yield takeLatest(
    types.INITIATE_GROUP_VOICE_CALL_REQUEST,
    initializeGroupVoiceCall,
  );
}
function* initializeGroupVoiceCall(params) {
  try {
    const res = yield initializeGroupAudioCallApi(params?.params);
    if (res) {
      yield put({
        type: types.INITIATE_GROUP_VOICE_CALL_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.INITIATE_GROUP_VOICE_CALL_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// ************* Initialize Call **************
export function* initializeGroupVideoSega() {
  yield takeLatest(
    types.INITIATE_GROUP_VIDEO_CALL_REQUEST,
    initializeGroupVideoCall,
  );
}
function* initializeGroupVideoCall(params) {
  try {
    const res = yield initializeGroupVideoCallApi(params?.params);
    if (res) {
      yield put({
        type: types.INITIATE_GROUP_VIDEO_CALL_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.INITIATE_GROUP_VIDEO_CALL_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Destroy Call **************
export function* destroyGroupVideoCallSega() {
  yield takeLatest(
    types.DESTROY_GROUP_VIDEO_CALL_REQUEST,
    destroyGroupVideoCall,
  );
}
function* destroyGroupVideoCall(params) {
  try {
    const res = yield destroyGroupVideoCallApi(params?.params);
    if (res?.data) {
      yield put({
        type: types.DESTROY_GROUP_VIDEO_CALL_SUCCESS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.DESTROY_GROUP_VIDEO_CALL_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Destroy Call **************
export function* destroyGroupVoiceCallSega() {
  yield takeLatest(
    types.DESTROY_GROUP_VOICE_CALL_REQUEST,
    destroyGroupVoiceCall,
  );
}
function* destroyGroupVoiceCall(params) {
  try {
    const res = yield destroyGroupVoiceCallApi(params?.params);
    if (res?.data) {
      yield put({
        type: types.DESTROY_GROUP_VOICE_CALL_SUCCESS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.DESTROY_GROUP_VOICE_CALL_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}
