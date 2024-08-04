import AsyncStorage from '@react-native-async-storage/async-storage';
import {takeLatest, put} from 'redux-saga/effects';
import {responseValidator} from '../../../shared/exporter';
import {
  addFavoriteContact,
  addUserContact,
  createGroup,
  deleteFavContact,
  deleteGroup,
  DELUserContact,
  editGroupData,
  getAllContacts,
  getDMutualContacts,
  getFavoriteContact,
  getGroups,
  getMutualContacts,
  removeGroupMember,
} from '../../../shared/service/ContactsService';
import * as types from '../../actions/types';

//Remove Group Member Request
export function* removeGroupMemberRequest() {
  yield takeLatest(types.REMOVE_GROUP_MEMBER_REQUEST, removeMember);
}
function* removeMember(params) {
  try {
    const res = yield removeGroupMember(params?.params);
    if (res) {
      yield put({
        type: types.REMOVE_GROUP_MEMBER_SUCCESS,
        payload: params?.params,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.REMOVE_GROUP_MEMBER_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

//Get D Mutual Request
export function* getDMutualContactsRequest() {
  yield takeLatest(types.GET_DMUTUAL_CONTACTS_REQUEST, getDMutual);
}
function* getDMutual(params) {
  try {
    const res = yield getDMutualContacts(params?.params);
    if (res) {
      yield put({
        type: types.GET_DMUTUAL_CONTACTS_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_DMUTUAL_CONTACTS_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

//Get Mutual Request
export function* getMutualContactsRequest() {
  yield takeLatest(types.GET_MUTUAL_CONTACTS_REQUEST, getMutual);
}
function* getMutual(params) {
  try {
    const res = yield getMutualContacts();
    if (res?.data) {
      yield put({
        type: types.GET_MUTUAL_CONTACTS_SUCCESS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_MUTUAL_CONTACTS_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Login Sega**************
export function* getContactsRequest() {
  yield takeLatest(types.LIST_CONTACT_REQUEST, getContact);
}
function* getContact(params) {
  try {
    const res = yield getAllContacts();
    if (res?.data) {
      yield put({
        type: types.LIST_CONTACT_SUCCESS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.LIST_CONTACT_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Login Sega**************
export function* addContactRequest() {
  yield takeLatest(types.ADD_CONTACT_REQUEST, addContact);
}
function* addContact(params) {
  try {
    const res = yield addUserContact(params?.params);
    if (res) {
      yield put({
        type: types.ADD_CONTACT_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.ADD_CONTACT_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Delete Contact Sega**************
export function* delContactRequest() {
  yield takeLatest(types.DELETE_CONTACT_REQUEST, delContact);
}
function* delContact(params) {
  try {
    const requestBody = {
      number: params?.params?.number,
    };
    const res = yield DELUserContact(requestBody);
    if (res?.data) {
      yield put({
        type: types.DELETE_CONTACT_SUCCESS,
        payload: params?.params?.id,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.DELETE_CONTACT_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Set checked Contacts Sega**************
export function* removeContactRequest() {
  yield takeLatest(types.REMOVE_CONTACT_REQUEST, removeContact);
}
function* removeContact(params) {
  try {
    yield put({
      type: types.REMOVE_CONTACT_SUCCESS,
      payload: params?.params,
    });
  } catch (error) {
    console.log(error);
  }
}

// *************Get favorite  Contacts Sega**************

export function* getFavoriteRequest() {
  yield takeLatest(types.GET_FAVOURITE_REQUEST, getFavorite);
}
function* getFavorite(params) {
  try {
    const res = yield getFavoriteContact();
    if (res?.data) {
      yield put({
        type: types.GET_FAVOURITE_SUCCESS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_FAVOURITE_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

//Add to Favorite
export function* addFavoriteRequest() {
  yield takeLatest(types.ADD_TO_FAVOURITE_REQUEST, addFavorite);
}
function* addFavorite(params) {
  try {
    const res = yield addFavoriteContact(params?.params);
    if (res) {
      yield put({
        type: types.ADD_TO_FAVOURITE_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.ADD_TO_FAVOURITE_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

//delete to Favorite
export function* delFavoriteRequest() {
  yield takeLatest(types.DELETE_FAVOURITE_REQUEST, delFavoriteContact);
}
function* delFavoriteContact(params) {
  try {
    const body = {
      contact_id: params?.params?.contact_id,
    };
    const res = yield deleteFavContact(body);
    if (res?.data) {
      yield put({
        type: types.DELETE_FAVOURITE_SUCCESS,
        payload: params?.params?.id,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.DELETE_FAVOURITE_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}
// ****************Groups Sega*********************
// *************Set checked Contacts Sega**************
export function* getGroupContactRequest() {
  yield takeLatest(types.GET_GROUP_CONTACT_REQUEST, groupContact);
}
function* groupContact(params) {
  try {
    yield put({
      type: types.GET_GROUP_CONTACT_SUCCESS,
      payload: params?.params,
    });
    params?.cbSuccess();
  } catch (error) {
    console.log('GET GROUP', error);
    yield put({
      type: types.GET_GROUP_CONTACT_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

// *************Set checked Contacts Sega**************
export function* checkedContactRequest() {
  yield takeLatest(types.CHECKED_CONTACT_REQUEST, checkContacts);
}
function* checkContacts(params) {
  try {
    yield put({
      type: types.CHECKED_CONTACT_SUCCESS,
      payload: params?.params,
    });
    params?.cbSuccess(params?.params);
  } catch (error) {
    console.log(error);
  }
}

//get Groups
export function* getGroupRequest() {
  yield takeLatest(types.GET_GROUPS_REQUEST, getGroupsfun);
}
function* getGroupsfun(params) {
  try {
    const res = yield getGroups();
    if (res?.data) {
      yield put({
        type: types.GET_GROUPS_SUCCESS,
        payload: res?.data,
      });
      params?.cbSuccess(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_GROUPS_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

//Add Group
export function* addGroupRequest() {
  yield takeLatest(types.ADD_GROUP_CONTACT_REQUEST, addGroup);
}
function* addGroup(params) {
  try {
    const res = yield createGroup(params?.params);
    if (res) {
      yield put({
        type: types.ADD_GROUP_CONTACT_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.ADD_GROUP_CONTACT_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

//Delete Group
export function* deleteGroupRequest() {
  yield takeLatest(types.DELETE_GROUP_CONTACT_REQUEST, delGroup);
}
function* delGroup(params) {
  try {
    const body = {
      name: params?.params?.name,
    };
    const res = yield deleteGroup(body);
    if (res) {
      yield put({
        type: types.DELETE_GROUP_CONTACT_SUCCESS,
        payload: params?.params?.id,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.DELETE_GROUP_CONTACT_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}

//Edit Group
export function* editGroupRequest() {
  yield takeLatest(types.EDIT_GROUP_CONTACT_REQUEST, editGroup);
}
function* editGroup(params) {
  try {
    const res = yield editGroupData(params?.params);
    if (res) {
      yield put({
        type: types.EDIT_GROUP_CONTACT_SUCCESS,
        payload: res,
      });
      params?.cbSuccess(res);
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.EDIT_GROUP_CONTACT_FAILURE,
      payload: null,
    });
    let msg = responseValidator(error.response.status, error?.response?.data);
    params?.cbFailure(msg);
  }
}
