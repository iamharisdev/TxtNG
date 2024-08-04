import {fork} from 'redux-saga/effects';
import {
  burnNumberRequest,
  delNumberRequest,
  getBurnNumbersRequest,
  getThemesRequest,
  setCurrentItemRequest,
  getConversationRequest,
  createConversationRequest,
  sendMessagesRequest,
  getMessagesRequest,
  readAllMessageRequest,
  setMessageRequest,
  setCurrentMessageRequest,
  setStopPlayRequest,
  setloadPlayRequest,
  setPauseAduioRequest,
  setdurationRequest,
  TransHistory,
  getCurrentConversationSega,
} from './app-sega/app-sega';

import {
  forgotPassRequest,
  loginRequest,
  signUpRequest,
  resetPassRequest,
  socialLoginRequest,
  logoutRequestSega,
  OTPVerifyRequest,
  setAppThemeRequest,
  saveSignUpRequestSega,
  getPhoneNumerRequestSega,
  resendOTPRequestSega,
  updateEmailRequest,
  updateProfileRequest,
  getProfileRequestSega,
  setTabsSega,
} from './auth-saga/auth-sega';
import {
  addContactRequest,
  addFavoriteRequest,
  addGroupRequest,
  checkedContactRequest,
  delContactRequest,
  deleteGroupRequest,
  delFavoriteRequest,
  getContactsRequest,
  getFavoriteRequest,
  getGroupContactRequest,
  getGroupRequest,
  removeContactRequest,
  getMutualContactsRequest,
  getDMutualContactsRequest,
  removeGroupMemberRequest,
  editGroupRequest,
} from './contacts-sega/contacts-sega';
import {
  addcardRequest,
  defaultCardRequest,
  delCardRequest,
  editcardRequest,
  getPaymentCardRequest,
  updateStatusRequestSega,
  payWithDebitRequest,
  getdefaultCardRequest,
  setPaymentMethodRequest,
  checkConnectedRequest,
  getPaymentBankRequest,
  addPaymentBankRequest,
  editBankRequest,
  defaultBankRequest,
  getdefaultbankRequest,
  delAcoountRequest,
  setCheckoutDataRequest,
  getPrivacyPolicyRequest,
  getTermsAndConditionRequest,
  getFaqsRequest,
  getSupportRequest,
  CreateTicketRequest,
  topUpAccountRequest,
  TransferAccountRequest,
  withdrawAccountRequest,
  saveFCMTokenRequest,
} from './settings-sega/settings-sega';
import {
  GetAllRecentsCallLogs,
  ClearLogs,
  BlockUser,
  initializeCallSega,
  destroyCallSega,
  initializeVideoCallSega,
  destroyVideoCallSega,
  GetAllCallHistorySega,
  GetVoiceCallLogs,
  GetVideoCallLogs,
  initializeGroupCallSega,
  initializeGroupVideoSega,
  destroyGroupVideoCallSega,
  destroyGroupVoiceCallSega,
  ClearSpecificLogs,
} from './call-saga/call-saga';

export function* rootSaga() {
  yield fork(loginRequest);
  yield fork(signUpRequest);
  yield fork(forgotPassRequest);
  yield fork(resetPassRequest);
  yield fork(socialLoginRequest);
  yield fork(logoutRequestSega);
  yield fork(OTPVerifyRequest);
  yield fork(setAppThemeRequest);
  yield fork(saveSignUpRequestSega);
  yield fork(getPhoneNumerRequestSega);
  yield fork(resendOTPRequestSega);
  yield fork(updateEmailRequest);
  yield fork(updateProfileRequest);
  yield fork(getProfileRequestSega);
  yield fork(setTabsSega);
  yield fork(updateStatusRequestSega);
  //Contacts
  yield fork(getContactsRequest);
  yield fork(addContactRequest);
  yield fork(getThemesRequest);
  yield fork(getBurnNumbersRequest);
  yield fork(burnNumberRequest);
  yield fork(removeContactRequest);
  yield fork(addFavoriteRequest);
  yield fork(getFavoriteRequest);
  yield fork(delContactRequest);
  yield fork(delFavoriteRequest);
  yield fork(delNumberRequest);
  yield fork(getMutualContactsRequest);
  yield fork(getDMutualContactsRequest);
  yield fork(removeGroupMemberRequest);

  //groups
  yield fork(getGroupRequest);
  yield fork(addGroupRequest);
  yield fork(deleteGroupRequest);
  yield fork(editGroupRequest);

  //CHAT Module
  yield fork(getConversationRequest);
  yield fork(createConversationRequest);
  yield fork(sendMessagesRequest);
  yield fork(readAllMessageRequest);
  yield fork(getMessagesRequest);
  yield fork(getCurrentConversationSega);

  //Payments
  yield fork(addcardRequest);
  yield fork(getPaymentCardRequest);
  yield fork(delCardRequest);
  yield fork(defaultCardRequest);
  yield fork(editcardRequest);
  yield fork(checkedContactRequest);
  yield fork(getGroupContactRequest);
  yield fork(setCurrentItemRequest);
  yield fork(topUpAccountRequest);
  yield fork(TransferAccountRequest);
  yield fork(withdrawAccountRequest);

  yield fork(payWithDebitRequest);
  yield fork(getdefaultCardRequest);
  yield fork(setPaymentMethodRequest);
  yield fork(checkConnectedRequest);

  // Banks
  yield fork(getPaymentBankRequest);
  yield fork(addPaymentBankRequest);
  yield fork(editBankRequest);
  yield fork(defaultBankRequest);
  yield fork(getdefaultbankRequest);
  yield fork(delAcoountRequest);
  yield fork(setCheckoutDataRequest);
  yield fork(TransHistory);

  //Setting
  yield fork(getPrivacyPolicyRequest);
  yield fork(getTermsAndConditionRequest);
  yield fork(getFaqsRequest);
  yield fork(getSupportRequest);
  yield fork(CreateTicketRequest);
  yield fork(saveFCMTokenRequest);

  //Messages
  yield fork(setMessageRequest);
  yield fork(setCurrentMessageRequest);
  yield fork(setStopPlayRequest);
  yield fork(setloadPlayRequest);
  yield fork(setdurationRequest);

  //Call LOGS
  yield fork(GetAllCallHistorySega);
  yield fork(GetAllRecentsCallLogs);
  yield fork(BlockUser);
  yield fork(ClearLogs);
  yield fork(initializeCallSega);
  yield fork(destroyCallSega);
  yield fork(initializeVideoCallSega);
  yield fork(destroyVideoCallSega);
  yield fork(GetVoiceCallLogs);
  yield fork(GetVideoCallLogs);

  // Group
  yield fork(initializeGroupCallSega);
  yield fork(initializeGroupVideoSega);
  yield fork(destroyGroupVideoCallSega);
  yield fork(destroyGroupVoiceCallSega);
  yield fork(ClearSpecificLogs);
}
