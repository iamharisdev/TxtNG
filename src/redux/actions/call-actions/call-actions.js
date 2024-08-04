import * as TYPES from '../types';

//GET ALL Call HISTORY
export const getAllCallHistory = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_ALL_CALL_HISTORY,
    params,
    cbSuccess,
    cbFailure,
  };
};

// GET Recent Call History

export const recentCallLogs = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_RECENT_CALL_LOGS,
    cbSuccess,
    cbFailure,
  };
};

// Blocker USer

export const blockUser = (params, cbSuccess, cbFailure, type1) => {
  return {
    type: TYPES.BLOCK_USER,
    params,
    cbSuccess,
    cbFailure,
    type1,
  };
};

// Clear all call logs

export const clearAllCallLogs = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.CLEAR_ALL_CALL_LOGS,
    params,
    cbSuccess,
    cbFailure,
  };
};

export const clearSpecificCallLogs = (params, cbSuccess, cbFailure, type1) => {
  return {
    type: TYPES.CLEAR_SPECIFIC_CALL_LOGS,
    params,
    cbSuccess,
    cbFailure,
    type1,
  };
};

// Initialize  call service

export const initialize_call_service = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.INITIALIZE_CALL_SERVICE_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Destroy  call service

export const destroy_call_service = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.DESTROY_CALL_SERVICE_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

// Initialize video  call service

export const initialize_video_call_service = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.INITIALIZE_VIDEO_CALL_SERVICE_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
export const get_Voice_Call_History = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_AUDIO_CALL_HISTORY,
    cbSuccess,
    cbFailure,
  };
};

// Destroy video call service

export const destroy_video_call_service = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.DESTROY_VIDEO_CALL_SERVICE_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
export const get_Video_Call_History = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_VIDEO_CALL_HISTORY,
    cbSuccess,
    cbFailure,
  };
};

// ***********Group Call*************
export const initialize_group_voice_call_service = (
  params,
  cbSuccess,
  cbFailure,
) => {
  return {
    type: TYPES.INITIATE_GROUP_VOICE_CALL_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

export const initialize_group_video_call_service = (
  params,
  cbSuccess,
  cbFailure,
) => {
  return {
    type: TYPES.INITIATE_GROUP_VIDEO_CALL_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

export const destroy_group_voice_call_service = (
  params,
  cbSuccess,
  cbFailure,
) => {
  return {
    type: TYPES.DESTROY_GROUP_VOICE_CALL_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

export const destroy_group_video_call_service = (
  params,
  cbSuccess,
  cbFailure,
) => {
  return {
    type: TYPES.DESTROY_GROUP_VIDEO_CALL_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
