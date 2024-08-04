import {HTTP_CLIENT, ENDPOINTS, BASE_URL} from '../exporter';
import axios from 'axios';
import {GetToken} from '../utilities/headers';

export const getAllContacts = () => {
  return HTTP_CLIENT.get(`${ENDPOINTS.CONTACT_CONST}/all_contact`);
};
export const editGroupData = async params => {
  const token = await GetToken();
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.GROUP_CONST}/edit_group_contacts`,
    params,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const removeGroupMember = async params => {
  console.log('data', params);
  const token = await GetToken();
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.GROUP_CONST}/remove_from_group`,
    params,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};
export const getMutualContacts = () => {
  return HTTP_CLIENT.post(
    `${ENDPOINTS.GROUP_CONST}/mutual_contacts_create_group`,
  );
};
export const getDMutualContacts = async params => {
  const token = await GetToken();
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.GROUP_CONST}/mutual_contacts_edit_group`,
    {group_id: params},
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;

  // return HTTP_CLIENT.get(
  //   `${ENDPOINTS.GROUP_CONST}/not_in_group?group_id=${params}`,
  // );
};

export const addUserContact = async params => {
  const token = await GetToken();
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.CONTACT_CONST}/create_contact`,
    params,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const DELUserContact = params => {
  return HTTP_CLIENT.post(`${ENDPOINTS.CONTACT_CONST}/delete_contact`, params);
};

export const deleteFavContact = params => {
  return HTTP_CLIENT.post(
    `${ENDPOINTS.CONTACT_CONST}/remove_from_favourite`,
    params,
  );
};

export const addFavoriteContact = async params => {
  const token = await GetToken();
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.CONTACT_CONST}/add_to_favourite`,
    params,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const getFavoriteContact = () => {
  return HTTP_CLIENT.get(`${ENDPOINTS.CONTACT_CONST}/all_favourite`);
};

export const getGroups = () => {
  return HTTP_CLIENT.get(`${ENDPOINTS.GROUP_CONST}/user_groups`);
};

export const createGroup = async params => {
  console.log(params);
  const token = await GetToken();
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.GROUP_CONST}/create_group`,
    params,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const deleteGroup = params => {
  return HTTP_CLIENT.post(`${ENDPOINTS.GROUP_CONST}/delete_group`, params);
};
