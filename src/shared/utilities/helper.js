import NetInfo from '@react-native-community/netinfo';
import {createContext, useContext, useEffect} from 'react';
import {appIcons, WP} from '../exporter';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {PermissionsAndroid} from 'react-native';

export const checkConnected = () => {
  return NetInfo.fetch().then(state => {
    return state.isConnected;
  });
};
const OnlineStatusContext = createContext(true);
export const OnlineStatusProvider = ({children}) => {
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });
    return () => removeNetInfoSubscription();
  }, []);
  return (
    <OnlineStatusContext.Provider value={isOffline}>
      {children}
    </OnlineStatusContext.Provider>
  );
};
export const useOnlineStatus = () => {
  const store = useContext(OnlineStatusContext);
  return store;
};
export const capitalizeFirstLetter = string => {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
};
export const responseValidator = (response, errorMsg) => {
  let errorCode = response;
  if (errorCode == 401) {
    if (errorMsg) {
      const msg = errorMsg?.message;
      return msg;
    } else {
      return 'Something went wrong!';
    }
  } else if (errorCode == 400) {
    if (errorMsg) {
      const msg = errorMsg?.message;
      return msg;
    } else {
      return 'Something went wrong!';
    }
  } else if (errorCode == 404) {
    if (errorMsg) {
      const msg = errorMsg?.message;
      return msg;
    } else {
      return 'Something went wrong!';
    }
  } else if (errorCode == 500) {
    if (errorMsg) {
      const msg = errorMsg?.message;
      return msg;
    } else {
      return 'Internal Server Error Please Try Again!';
    }
  } else {
  }
};
export const checkBrand = param => {
  if (param == 'Visa') {
    return appIcons.visa;
  } else {
    appIcons.visa;
  }
};

export const LinkHelper = async () => {
  const link = await dynamicLinks().buildShortLink({
    link: `https://textng.page.link/qL6j`,
    // domainUriPrefix is created in your Firebase console
    domainUriPrefix: 'https://textng.page.link',
    // optional setup which updates Firebase analytics campaign
    // "banner". This also needs setting up before hand
    analytics: {
      campaign: 'banner',
    },
    android: {
      packageName: 'com.textng',
    },
  });
  return link;
};

export const millisToMinutesAndSeconds = millis => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const _requestAudioPermission = () => {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    {
      title: 'Need permission to access microphone',
      message: 'To run this demo we need permission to access your microphone',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
};

export const _requestCameraPermission = () => {
  return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
    title: 'Need permission to access camera',
    message: 'To run this demo we need permission to access your camera',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK',
  });
};

export const calculateHeight = item => {
  switch (item) {
    case 0:
      return '100%';
      break;
    case 1:
      return '50%';
      break;
    case 2:
      return '50%';
      break;
    case 3:
      return '50%';
      break;
    case 4:
      return '50%';
      break;
    case 5:
      return '15%';
      break;
    case 6:
      return '15%';
      break;
    case 7:
      return '15%';
      break;
    case 8:
      return '15%';
      break;
    default:
      return '50%';
      break;
  }
};
export const calculateWidth = item => {
  switch (item) {
    case 0:
      return '100%';
      break;
    case 1:
      return '100%';
      break;
    case 2:
      return '50%';
      break;
    case 3:
      return '33.3%';
      break;
    case 4:
      return '33.3%';
      break;
    case 5:
      return '20%';
      break;
    case 6:
      return '15%';
      break;
    default:
      return '100%';
      break;
  }
};
