export {appImages, appIcons, appLogos, appSvgs, appJSON} from './theme/assets';

export {colors} from './theme/colors';
export {size, family, appRadius, fontConfig} from './theme/sizes';
export {spacing} from './theme/spacing';
export {
  WP,
  HP,
  RF,
  scrHeight,
  scrWidth,
  platformOrientedCode,
} from './theme/responsive';

export {
  LoginVS,
  loginFormFields,
  signupFormFields,
  SignUpVS,
  forgotFormFields,
  ForgotPasswordVS,
  resetFormFields,
  ResetPasswordVS,
  updateFormFields,
  UpdateVS,
  updateEmailField,
  Step1FormFields,
  Step1SignUpVS,
  setp2FormFields,
  step2VS,
  codeFormFields,
  CodeVS,
  updateEmailVS,
  addContactForm,
  addContactVS,
  addCardFormField,
  addCardVS,
  createGroupForm,
  createGroupVS,
  bankAccountVS,
  addBankAccountFormField,
  editBankAccountFormField,
  editBankAccountVS,
  ScoialStep1SignUpVS,
  SocialStep1FormFields,
} from './utilities/validations';
export {
  StatusBarHeight,
  DimensionsWindowHeight,
  DimensionsWindowWidth,
} from './theme/statusBarHeight';

export {setupAxios, HTTP_CLIENT, initialConfig} from './utilities/config';
export {BASE_URL, CABLE_BASE_URL, ENDPOINTS} from './utilities/endpoints';
export {
  ANDROID,
  IOS,
  emailRegex,
  web_client_id,
  image_options,
  profile_uri,
  stripe_publishableKey,
  video_url,
  slidesData,
  languages,
  floating_icon_list,
  idList,
  contact_headings,
  contact_list_media,
  dial_list,
  store_list,
  themes_list,
  networkText,
  emojiArray,
  card_list,
  wallet_amount,
  facebookID,
} from './utilities/constant';
export {header, authHeader} from './utilities/headers';
export {
  checkConnected,
  capitalizeFirstLetter,
  responseValidator,
  checkBrand,
  calculateDateDiff,
  checkExerciseItemOrder,
  convertNumberSystem,
  calculateCurrentDateDiff,
  best_set,
  setDigitSize,
  LinkHelper,
  millisToMinutesAndSeconds,
  _requestAudioPermission,
  _requestCameraPermission,
  calculateHeight,
  calculateWidth,
} from './utilities/helper';
export {themeSelector} from './utilities/themeSelector';
export {commonStyles} from './theme/commonStyles';
export {
  onAppleLogin,
  onGoogleLogin,
  onFacebookLogin,
} from './utilities/socialLogin';

export {
  _onAudioButtonPress,
  _onGroupAudioButtonPress,
  _onVideoButtonPress,
  _onVideoGroupButtonPress,
  createConversation,
  get_conversation,
} from './utilities/CallHandler';
export {useChannel, useActionCable, useAppState} from './Hooks';
export {checkPermission, requestPermission} from './utilities/AppPermissions';
export {
  Notification_Listner,
  requestNotificationPermission,
  LocalNotification,
} from './utilities/NotificationHandler';
