import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {checkConnected} from './helper';
import {Alert, Platform} from 'react-native';
import {get_current_conversation} from '../../redux/actions';
import {networkText} from './constant';

export async function requestNotificationPermission() {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus == messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus == messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      let token = await getFcmToken();
      console.log(`FCM TOKEN:  ${Platform.OS}`, await getFcmToken());
      return token;
    }
  } catch (error) {
    // User has rejected permissions
    console.log('token permission rejected');
  }
}

const getFcmToken = async () => {
  let oldToken = await AsyncStorage.getItem('fcmToken');
  if (oldToken == null) {
    try {
      messaging()
        .hasPermission()
        .then(async enabled => {
          if (enabled) {
            let token = await messaging().getToken();
            console.log('Token', token);
            AsyncStorage.setItem('fcmToken', token);
          } else {
            messaging()
              .requestPermission()
              .then(() => {
                console.log('+++ PERMISSION REQUESTED +++++');
              })
              .catch(error => {
                console.log(' +++++ ERROR RP ++++ ' + error);
              });
          }
        })
        .catch(error => {
          console.log(' +++++ ERROR +++++ ' + error);
        });
    } catch (err) {
      console.log(err);
    }
  } else {
    return oldToken;
  }
};

export const Notification_Listner = (dispatch, navigation) => {
  messaging().onNotificationOpenedApp(async remoteMessage => {
    onClickNotification(remoteMessage, dispatch, navigation);
  });
  messaging().onMessage(async remoteMessage => {
    LocalNotification(remoteMessage, dispatch, navigation);
  });
  messaging().getInitialNotification(async remoteMessage => {
    if (remoteMessage) {
      console.log('Initial Notification', remoteMessage.notification);
    }
  });
};

export const LocalNotification = (data, dispatch, navigation) => {
  PushNotification.localNotification({
    channelId: 'textng',
    title: data?.notification?.title || 'New Message Arrived',
    smallIcon: 'ic_notification',
    largeIcon: 'ic_launcher',
    message: data?.notification?.body || 'hello',
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
    autoCancel: true,
  });
  PushNotification.createChannel(
    {
      channelId: 'textng', // (required)
      channelName: 'Channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      if (
        data?.data?.type == 'Video Call' ||
        data?.data?.type == 'Audio Call' ||
        data?.data?.type == 'Reject Call' ||
        data?.data?.type == 'Group Video Call' ||
        data?.data?.type == 'Group Audio Call' ||
        data?.data?.type == 'User Left Audio Call' ||
        data?.data?.type == 'Group Audio Call' ||
        data?.data?.type == 'Everyone left the call'
      ) {
        onClickNotification(data, dispatch, navigation);
      }
    },
    onNotification: function (notification) {
      if (notification.userInteraction) {
        onClickNotification(data, dispatch, navigation);
      } else {
        console.log('User received notification');
      }
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    popInitialNotification: true,
    requestPermissions: true,
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
  });
};

const onClickNotification = (notify, dispatch, navigation) => {
  switch (notify?.data?.type) {
    case 'Video Call':
      navigation?.replace('IncomingCall', {item: notify});
      break;
    case 'Audio Call':
      navigation?.replace('IncomingCall', {item: notify});
      break;
    case 'Reject Call':
      navigation?.replace('App');
      break;
    case 'Everyone left the call':
      navigation?.replace('App');
      break;
    case 'User Left Audio Call':
      const receiver_data = JSON.parse(notify?.data?.participants);
      navigation?.replace('GroupVoiceCall', {item: receiver_data});
      break;
    case 'Group Video Call':
      navigation?.replace('IncomingCall', {item: notify});
      break;
    case 'Group Audio Call':
      navigation?.replace('IncomingCall', {item: notify});
      break;
    case 'Conversation':
      getConversation(dispatch, navigation, notify);
      break;
    default:
      break;
  }
};

const getConversation = async (dispatch, navigation, data) => {
  const check = await checkConnected();
  if (check) {
    const onSuccess = res => {
      navigation?.navigate('Chat', {
        channel_detail: {
          data: res,
        },
        groupImg: res?.conversation?.group_logo,
        type: res?.conversation?.group ? 'group' : '',
      });
      console.log('On Create Conversation Success');
    };
    const onFailure = res => {
      Alert.alert('Error', res);
    };
    dispatch(
      get_current_conversation(
        data?.data?.conversation_id,
        onSuccess,
        onFailure,
      ),
    );
  } else {
    Alert.alert('Error', networkText);
  }
};
