import axios from 'axios';
import {BASE_URL, ENDPOINTS, header, HTTP_CLIENT} from '../exporter';
import {GetToken} from '../utilities/headers';

export const GetAllCallLogsFun = async () => {
  return HTTP_CLIENT.get(`${ENDPOINTS?.ALLLOGS}`);
};

export const GetAudioCallLogsFun = async () => {
  const res = await axios.get(`${BASE_URL}${ENDPOINTS.AUDIO_CALL_HISTORY}`, {
    headers: {
      Authorization: `Bearer ${await GetToken()}`,
    },
  });
  return res.data;
};

export const GetVideoCallLogsFun = async () => {
  const token = await GetToken();
  const res = await axios.get(`${BASE_URL}${ENDPOINTS.VIDEO_CALL_HISTORY}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const GetAllRecentCallLogsFun = async params => {
  const token = await GetToken();
  const res = await axios.get(`${BASE_URL}${ENDPOINTS.RECENTLOGS}`, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const ClearLogsfun = async params => {
  const res = await axios.get(`${BASE_URL}${ENDPOINTS.CLEARLOGS}`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const ClearSpecificCallLogfun = async (params, type) => {
  const token = await GetToken();

  let url;
  // if (type == 'video') {
  //   url = `${BASE_URL}${ENDPOINTS.REMOVE_VIDEO_CALL_LOG}`;
  // } else if (type == 'audio') {
  //   url = `${BASE_URL}${ENDPOINTS.REMOVE_AUDIO_CALL_LOG}`;
  // } else {
  url = `${BASE_URL}${ENDPOINTS.REMOVE_ANY_CALL_LOG}`;
  // }

  var config = {
    method: 'delete',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: params,
  };

  const response = await axios(config);
  return response;
};
export const BlockUserfunApi = async (params, type) => {
  let url;
  if (type == 'unBlock') {
    url = `${ENDPOINTS.CONTACT_CONST}/unblock_contact`;
  } else {
    url = `${ENDPOINTS.CONTACT_CONST}/block_contact`;
  }

  console.log('url:   ', url, params);

  return HTTP_CLIENT.post(url, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const initializeCallApi = async params => {
  return HTTP_CLIENT.post(`${ENDPOINTS.AUDIO_CALL_SERVICE}`, params);
};

export const destroyCallApi = async params => {
  return HTTP_CLIENT.post(`audio_destroy_room`, params);
};

export const initializeVideoCallApi = async params => {
  return HTTP_CLIENT.post(`${ENDPOINTS.VIDEO_CALL_SERVICE}`, params);
};
export const destroyVideoCallApi = async params => {
  return HTTP_CLIENT.post(`video_call_destroy_room`, params);
};

//Group Call Service
export const initializeGroupVideoCallApi = async params => {
  const token = await GetToken();
  const res = await axios.post(BASE_URL + `group_video_call`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const initializeGroupAudioCallApi = async params => {
  const token = await GetToken();
  const res = await axios.post(BASE_URL + `group_audio_call`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const destroyGroupVideoCallApi = async params => {
  return HTTP_CLIENT.post(BASE_URL + `group_video_call_destory_room`, params);
};

export const destroyGroupVoiceCallApi = async params => {
  return HTTP_CLIENT.post(BASE_URL + `group_auio_call_destory_room`, params);
};
