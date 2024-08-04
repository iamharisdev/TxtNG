import axios from 'axios';
import {BASE_URL, ENDPOINTS, header, HTTP_CLIENT} from '../exporter';
import {GetToken} from '../utilities/headers';

//Login
export const updateStatus = async params => {
  return HTTP_CLIENT.post(ENDPOINTS.UPDATE_STATUS, params);
};

//Add Card Requests
export const addDebitCard = params => {
  return HTTP_CLIENT.post(`${ENDPOINTS.CARD_CONST}/add_card`, params);
};

//Edit
export const editDebitCard = params => {
  return HTTP_CLIENT.post(`${ENDPOINTS.CARD_CONST}/edit_card`, params);
};

//Get Default Card
export const getDefaultCard = () => {
  return HTTP_CLIENT.get(`${ENDPOINTS.CARD_CONST}/current_user_default_card`);
};

//Del Card Requests
export const delDebitCard = async params => {
  return HTTP_CLIENT.post(`${ENDPOINTS.CARD_CONST}/delete_card`, params);
};

//Get Card Requests
export const getAllPaymentCards = () => {
  return HTTP_CLIENT.post(`${ENDPOINTS.CARD_CONST}/all_cards`);
};

//Get Bank Requests
export const getAllPaymentBanks = () => {
  return HTTP_CLIENT.get(`${ENDPOINTS.BANK_CONST}`);
};

//Add Bank Requests
export const addBankAccount = params => {
  return HTTP_CLIENT.post(`${ENDPOINTS.BANK_CONST}`, params);
};

//Edit Bank Account
export const editBankAccount = (id, body) => {
  return HTTP_CLIENT.put(`${ENDPOINTS.BANK_CONST}/${id}`, body);
};

//Delete Bank Account
export const delBankAccount = params => {
  return HTTP_CLIENT.delete(`${ENDPOINTS.BANK_CONST}/${params?.bank_id}`);
};

//Default Bank Account
export const getDefaultBankData = () => {
  return HTTP_CLIENT.get(`${ENDPOINTS.BANK_CONST}/default`);
};

//Pay With Social Card Requests
export const payWithDebitCard = (route, params) => {
  return HTTP_CLIENT.post(`${ENDPOINTS.CHECKOUT_CONST}/${route}`, params);
};

//Pay With Social Card Requests
export const payWithSocialCard = (type, params) => {
  console.log('Payment Type', type);
  return HTTP_CLIENT.post(
    `${ENDPOINTS.CARD_CONST}/${type == 'apple' ? 'apple_pay' : 'google_pay'}`,
    params,
  );
};

//Check Connected Account Requests
export const checkConnectedAccount = () => {
  return HTTP_CLIENT.get(`users/stripe_connect/retrieve`);
};

//Create Connected Account url Requests
export const createConnectedURL = () => {
  return HTTP_CLIENT.get(`users/stripe_connect/connect`);
};

//Get Privacy Policy
export const getPrivacyPolicy = () => {
  return HTTP_CLIENT.get(`${ENDPOINTS.SETTINGS}/privacy_policy`);
};

//Get Terms And Conditions
export const getTermsAndConditions = () => {
  return HTTP_CLIENT.get(`${ENDPOINTS.SETTINGS}/terms_and_conditions`);
};

//Get Terms And Conditions
export const saveFCMTokenApi = params => {
  return HTTP_CLIENT.post(`notification_mobile_token`, params);
};

//Get FAQS
export const getFaqs = () => {
  return HTTP_CLIENT.get(`${ENDPOINTS.SETTINGS}/faqs`);
};

//Get Supports
export const getSupport = () => {
  return HTTP_CLIENT.get(`${ENDPOINTS.SETTINGS}/supports`);
};

//Post Support Ticket
export const PostSupportTicket = async params => {
  const token = await GetToken();
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.SETTINGS}/create_support`,
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

//Change lang and Country
export const changeLangCountryApi = async params => {
  const token = await GetToken();
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.SETTINGS}/update_language_and_country`,
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

//Top Up Amount
export const topUpAccount = async params => {
  const token = await GetToken();
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.TRANSACTION}/topup`,
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

//Top Up Amount
export const withdrawAccount = async params => {
  const token = await GetToken();
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.TRANSACTION}/withdraw`,
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

//Top Up Amount
export const transferAccount = async params => {
  const token = await GetToken();
  const res = await axios.post(
    `${BASE_URL}${ENDPOINTS.TRANSACTION}/transfer`,
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

//Top Up Amount
export const getAccountBalanceApi = async () => {
  const token = await GetToken();
  const res = await axios.get(
    `${BASE_URL}${ENDPOINTS.STRIPE_CONNECT}/check_balance`,

    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};
