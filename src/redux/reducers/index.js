import {combineReducers} from 'redux';

import authReducer from './auth-reducers/auth-reducer';
import settingsReducer from './settings-reducer/settings-reducer';
import persistReducer from './persist-reducer/persist-reducer';
import contactReducer from './contacts-reducers/contacts-reducers';
import appReducer from './app-reducers/app-reducers';
import callReducer from './call-reducer.js/call-reducer';

import * as types from '../actions/types';

const root_reducer = combineReducers({
  /* your app’s top-level reducers */
  auth: authReducer,
  settings: settingsReducer,
  persistReducer: persistReducer,
  contactReducer: contactReducer,
  appReducer: appReducer,
  callReducer: callReducer,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === types.LOGOUT_REQUEST_SUCCESS) {
    const {persistReducer} = state;
    state = {persistReducer};
  }

  return root_reducer(state, action);
};

export default rootReducer;
