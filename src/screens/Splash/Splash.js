import React, {useEffect} from 'react';
import {View, StatusBar, Image, Text} from 'react-native';
import styles from './styles';
import {MyStatusBar} from '../../components';
import {
  appImages,
  colors,
  commonStyles,
  LocalNotification,
  Notification_Listner,
  requestNotificationPermission,
  requestPermission,
} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const Splash = ({navigation}) => {
  const {userInfo} = useSelector(state => state.auth);
  const {colors} = useTheme();
  const dispatch = useDispatch(null);

  useEffect(() => {
    handleAppEntry();
    handlerNotifications();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!');
    });
    return unsubscribe;
  }, []);

  const handleAppEntry = async () => {
    AsyncStorage.multiRemove(['form1', 'form2']);
    const isWalkthrough = await AsyncStorage.getItem('walkthrough');
    setTimeout(() => {
      if (isWalkthrough) {
        if (userInfo?.type == 'social' && userInfo?.profile_completed) {
          navigation.replace('App');
        } else if (userInfo?.type != 'social' && userInfo?.user?.verified) {
          navigation.replace('App');
        } else {
          navigation.replace('Auth');
        }
      } else {
        navigation.replace('Walkthrough');
      }
    }, 2500);
  };

  const handlerNotifications = () => {
    //Request Permissions and get Token
    requestNotificationPermission();
    requestPermission();
    //Notification Listner
    Notification_Listner(dispatch, navigation);
  };

  return (
    <>
      <MyStatusBar backgroundColor={colors.primary} />
      <View style={styles.container(colors.pur1)}>
        <View style={styles.contentContainer(colors.primary)}>
          <View style={[commonStyles.aiRow]}>
            <View style={styles.imgCon}>
              <Image source={appImages.splashBg} style={styles.imgStyle} />
            </View>
            <View style={styles.secondCon}>
              <Text style={styles.h1Style(colors.pur1)}>TextNG</Text>
              <Text style={styles.h2Style(colors.go_1)}>
                Text Next Generation
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.secondContainer(colors.pur1)}></View>
      </View>
    </>
  );
};

export default Splash;
