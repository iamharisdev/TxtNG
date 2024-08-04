import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Vibration,
  Platform,
  Alert,
} from 'react-native';
import styles from './styles';
import {TouchableOpacity} from 'react-native';
import {AppHeader} from '../../../components';
import {useTheme} from 'react-native-paper';
import {
  checkConnected,
  networkText,
  profile_uri,
  _requestAudioPermission,
  _requestCameraPermission,
} from '../../../shared/exporter';
import FastImage from 'react-native-fast-image';
import {Icon} from '@rneui/themed';
import {
  destroy_call_service,
  destroy_group_video_call_service,
  destroy_group_voice_call_service,
  destroy_video_call_service,
  initialize_call_service,
  initialize_group_video_call_service,
  initialize_group_voice_call_service,
  initialize_video_call_service,
} from '../../../redux/actions';
import {useDispatch} from 'react-redux';

const IncomingCall = ({navigation, route}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch(null);
  const {item} = route?.params;
  const [receiverData, setReceiverData] = useState(null);
  const [senderData, setSenderData] = useState(null);
  let callResponse = useRef('reject');

  useEffect(() => {
    if (item) {
      if (
        item?.data?.type == 'Group Video Call' ||
        item?.data?.type == 'Group Audio Call'
      ) {
        const receiver_data = JSON.parse(item?.data?.participants);
        setReceiverData(receiver_data);
        const sender_data = JSON.parse(item?.data?.group);
        setSenderData(sender_data);
      } else {
        const receiver_data = JSON.parse(item?.data?.receiver);
        setReceiverData(receiver_data);
        const sender_data = JSON.parse(item?.data?.user);
        setSenderData(sender_data);
      }
    }
  }, []);

  useEffect(() => {
    Vibration.vibrate(200);
    const timer = setTimeout(() => {
      if (callResponse?.current == 'reject') {
        _onRejectCall();
      }
    }, 15000);
    return () => {
      Vibration.cancel();
      clearTimeout(timer);
    };
  }, []);

  //On Accept Call
  const _onAcceptCall = async () => {
    callResponse.current = 'accept';
    const check = await checkConnected();
    if (check) {
      if (Platform.OS === 'android') {
        await _requestAudioPermission();
        await _requestCameraPermission();
      }

      const onSuccess = async res => {
        senderData.image_url = item?.data?.user_image;
        switch (item?.data?.type) {
          case 'Video Call':
            navigation?.replace('VideoCall', {item: senderData});
            break;
          case 'Audio Call':
            navigation?.replace('VoiceCall', {item: senderData});
            break;
          case 'Reject Call':
            navigation?.replace('App');
            break;
          case 'Group Video Call':
            navigation?.replace('GroupVideoCall', {item: receiverData});
            break;
          case 'Group Audio Call':
            navigation?.replace('GroupVoiceCall', {item: receiverData});
            break;
          default:
            break;
        }
        console.log('Connecting Success');
      };

      const onFailure = async res => {
        Alert.alert('Error', res || 'Something went wrong!');
      };
      const body = {
        room_uname: item?.data?.room_name,
      };
      switch (item?.data?.type) {
        case 'Video Call':
          dispatch(initialize_video_call_service(body, onSuccess, onFailure));
          break;
        case 'Audio Call':
          dispatch(initialize_call_service(body, onSuccess, onFailure));
          break;
        case 'Group Audio Call':
          dispatch(
            initialize_group_voice_call_service(body, onSuccess, onFailure),
          );
          break;
        case 'Group Video Call':
          dispatch(
            initialize_group_video_call_service(body, onSuccess, onFailure),
          );
          break;
        default:
          break;
      }
    } else {
      Alert.alert('Error', networkText);
    }
  };
  //On Reject Call
  const _onRejectCall = async () => {
    const check = await checkConnected();
    if (check) {
      const body = {
        room_uname: item?.data?.room_name,
      };
      const onSuccess = async res => {
        navigation.replace('App');
        console.log('Connecting End');
      };

      const onFailure = async res => {
        console.log('Call Rejection', res);
        navigation?.replace('App');
        // Alert.alert('Error', res || 'Something went wrong!');
      };

      switch (item?.data?.type) {
        case 'Audio Call':
          dispatch(destroy_call_service(body, onSuccess, onFailure));
          break;
        case 'Video Call':
          dispatch(destroy_video_call_service(body, onSuccess, onFailure));
          break;
        case 'Group Video Call':
          dispatch(
            destroy_group_video_call_service(body, onSuccess, onFailure),
          );
          break;
        case 'Group Audio Call':
          dispatch(
            destroy_group_voice_call_service(body, onSuccess, onFailure),
          );
          break;
        default:
          break;
      }
    } else {
      Alert.alert('Error', networkText);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.app_color,
        },
      ]}>
      <AppHeader barColor={colors.app_color} />
      <View style={styles.contentContainer}>
        <View style={styles.view1}>
          {item?.data?.type == 'Group Video Call' ||
          item?.data?.type == 'Group Audio Call' ? (
            <>
              {receiverData?.length > 0 && (
                <View style={{marginVertical: 5}}>
                  <FastImage
                    source={{
                      uri: receiverData[0]?.image || profile_uri,
                      priority: FastImage.priority.high,
                    }}
                    style={[
                      styles.imageStyle1,
                      {
                        backgroundColor: colors.g10,
                        position:
                          receiverData.length > 1 ? 'absolute' : 'relative',
                      },
                    ]}
                  />
                  {receiverData[1]?.image ? (
                    <FastImage
                      source={{
                        uri: receiverData[1]?.image || profile_uri,
                        priority: FastImage.priority.high,
                      }}
                      style={styles.imageStyle2}
                    />
                  ) : null}
                </View>
              )}
            </>
          ) : (
            <View style={styles.imgCon}>
              <FastImage
                style={[
                  styles.imageStyle,
                  {
                    backgroundColor: colors.g10,
                  },
                ]}
                source={{
                  uri: item?.data?.user_image || profile_uri,
                }}
              />
            </View>
          )}
          <Text style={[styles.username, {color: colors.b1}]}>
            {senderData?.name || ''}
          </Text>
        </View>
        <View style={styles.card_container}>
          <View style={styles.aiRow}>
            <TouchableOpacity
              onPress={() => {
                _onAcceptCall();
                Vibration.vibrate(200);
              }}
              style={[styles.btnCon, {backgroundColor: colors.gr1}]}>
              <Icon
                type={'Ionicons'}
                name={'call'}
                size={30}
                color={colors.white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                _onRejectCall();
                Vibration.vibrate(200);
                navigation?.replace('App');
              }}
              style={[styles.btnCon, {backgroundColor: colors.r2}]}>
              <Icon
                type={'Ionicons'}
                name={'call-end'}
                size={30}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default IncomingCall;
