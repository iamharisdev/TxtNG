import {Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
export const PLATEFORM_AUDIO_PERMISSIONS = {
  ios: PERMISSIONS.IOS.MICROPHONE,
  android: PERMISSIONS.ANDROID.RECORD_AUDIO,
};
export const REQUEST_PERMISSION_TYPE = {
  audio: PLATEFORM_AUDIO_PERMISSIONS,
};

export const PERMISSION_TYPE = {
  audio: 'audio',
};

export const checkPermission = async type => {
  const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
  // if (!permissions) {
  //   return true;
  // }
  try {
    var result = await check(permissions);
    console.log('Result', result);
    if (result == RESULTS.GRANTED) {
      return true;
    } else {
      return requestPermission(permissions);
    }
  } catch (error) {
    console.log(error);
  }
};
export const requestPermission = async permissions => {
  try {
    var result = await request(permissions);
    if (result == 'granted') {
      return true;
    } else if (result == 'blocked') {
      return false;
    } else if (result == 'limited') {
      return false;
    } else if (result == 'unavailable') {
      return false;
    } else if (result == 'denied') {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
