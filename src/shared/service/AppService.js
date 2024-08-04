import axios from 'axios';
import {HTTP_CLIENT, ENDPOINTS, BASE_URL} from '../exporter';
import {GetToken} from '../utilities/headers';

export const getAllThemes = async () => {
  const token = await GetToken();
  return HTTP_CLIENT.get(`${ENDPOINTS.THEME_CONST}/all_themes`);
};
export const getAllBurnNumbers = () => {
  return HTTP_CLIENT.post(`${ENDPOINTS.TEXTNG_NUMBER}/all_burn_numbers`);
};
export const burnNumber = parmas => {
  return HTTP_CLIENT.post(`${ENDPOINTS.TEXTNG_NUMBER}/burn_user_number`);
};
export const deleteNumber = params => {
  return HTTP_CLIENT.post(
    `${ENDPOINTS.TEXTNG_NUMBER}/delete_permenatly`,
    params,
  );
};

export const getConversationApi = () => {
  return HTTP_CLIENT.get(`${ENDPOINTS.PROFILE}/conversations`);
};

export const getCurrentConversationApi = params => {
  return HTTP_CLIENT.get(`${ENDPOINTS.PROFILE}/conversations/${params}`);
};

export const createConversationApi = params => {
  return HTTP_CLIENT.post(`${ENDPOINTS.PROFILE}/conversations`, params);
};

export const sendMessageApi = async params => {
  const token = await GetToken();
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.PROFILE}/messages`,
    params,
    {
      headers: {
        // 'Accept-Encoding': 'gzip, deflate, br',
        'x-amz-acl': 'authenticated-read',
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const readMessageApi = params => {
  return HTTP_CLIENT.get(
    `${ENDPOINTS.PROFILE}/conversations/${params}/change_read_status`,
  );
};

export const getMessageApi = params => {
  return HTTP_CLIENT.get(`${ENDPOINTS.PROFILE}/conversations/${params}`);
};

export const deleteConversationApi = params => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.PROFILE}/conversations/${params}`);
};

export const GetTransHistory = async () => {
  const token = await GetToken();

  return HTTP_CLIENT.post(`${ENDPOINTS.TRANSACTION_HISTORY}`);
};
