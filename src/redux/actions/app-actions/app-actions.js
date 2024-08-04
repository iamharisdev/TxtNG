import * as TYPES from '../types';

//Get Theme List
export const get_all_theme_Request = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_THEME_LIST_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

//Get Theme List
export const get_burn_numbers_Request = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_BURN_NUMBERS_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

//Get burn List
export const burn_number_Request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.BURN_NUMBER_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//DELETE burn List
export const delete_number_Request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.DELETE_NUMBER_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//SET Current Checkout Item
export const current_checkout_request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SET_ITEM_DETAIL_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Chat Module

//Get Conversation
export const get_conversation_Request = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_ALL_CONVERSATION_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

//Get Conversation
export const create_conversation_Request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.CREATE_CONVERSATION_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//DELETE Conversation
export const delete_conversation_Request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.DELETE_CONVERSATION_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Send messages
export const send_message_request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SEND_MESSAGE_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Read All messages
export const read_all_message_request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.READ_ALL_MESSAGES_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
//Get messages
export const get_message_request = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_MESSAGE_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Get messages
export const set_message_request = (params, cbSuccess) => {
  return {
    type: TYPES.SET_MESSAGE_REQUEST,
    params,
    cbSuccess,
  };
};

//Current messages
export const set_current_message_request = params => {
  return {
    type: TYPES.CURRENT_MESSAGE_REQUEST,
    params,
  };
};

//Stop Play
export const set_stop_playing_request = params => {
  return {
    type: TYPES.STOP_PLAY_REQUEST,
    params,
  };
};

//Stop Play
export const set_audio_loading_request = params => {
  return {
    type: TYPES.SET_AUDIO_LOADING_REQUEST,
    params,
  };
};

//Set Duration
export const set_audio_duration_request = (params, progress) => {
  return {
    type: TYPES.SET_AUDIO_DURATION_REQUEST,
    params,
    progress,
  };
};

//GET Tran History
export const get_Tran_History = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_TRANSACTION_HISTORY,
    cbSuccess,
    cbFailure,
  };
};

//GET Tran History
export const get_current_conversation = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_CONVERSATION_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
