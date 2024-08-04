import {
  Image,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  appIcons,
  commonStyles,
  floating_icon_list,
  profile_uri,
  scrWidth,
  spacing,
} from '../../../shared/exporter';
import styles from './styles';
import {
  AppHeader,
  FloatingMenu,
  NeumorphBox,
  NeumorphDivider,
  WarningModal,
} from '../../../components';
import {useTheme} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {TwilioVideo} from 'react-native-twilio-video-webrtc';
import {destroy_call_service} from '../../../redux/actions';
const VoiceCall = ({navigation, route}) => {
  const [floatMenu, setfloatMenu] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const {colors} = useTheme();
  const twilioRef = useRef(null);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const {service_data} = useSelector(state => state?.callReducer);
  const [status, setStatus] = useState('disconnected');
  const {item} = route?.params;
  const dispatch = useDispatch(null);
  const CallBtn = ({icon, height, width, onPress}) => {
    return (
      <TouchableOpacity style={[spacing.mx3]} onPress={onPress}>
        <NeumorphBox
          alignItems={'center'}
          justifyContent={'center'}
          height={42}
          width={42}
          borderRadius={42}>
          <Image
            source={icon}
            style={[styles.iconStyle, {height: height, width: width}]}
          />
        </NeumorphBox>
      </TouchableOpacity>
    );
  };

  const SimpleCallBtn = ({icon, height, width, onPress}) => {
    return (
      <TouchableOpacity
        style={[styles.simBtn, {backgroundColor: colors.r4}, spacing.mx3]}
        onPress={onPress}>
        <Image
          source={icon}
          style={[styles.iconStyle, {height: height, width: width}]}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    // setshowModal(true);
    twilioRef.current.connect({
      roomName: service_data?.links?.room_sid,
      accessToken: service_data?.token_user,
      enableAudio: true,
    });
    return () => {
      _onEndButtonPress();
    };
  }, []);

  //Audio Call

  const _onRoomDidConnect = ({roomName, error}) => {
    console.log('onRoomDidConnect: ', roomName);
    setStatus('connected');
  };

  const _onRoomDidDisconnect = ({roomName, error}) => {
    console.log('[Disconnect]ERROR: ', error);
    navigation.goBack();
    setStatus('disconnected');
  };

  const _onRoomDidFailToConnect = error => {
    console.log('[FailToConnect]ERROR: ', error);
    navigation.goBack();
    setStatus('disconnected');
  };

  const _onEndButtonPress = () => {
    const body = {
      room_uname: service_data?.room_sid,
    };
    const onSuccess = async res => {
      twilioRef.current.disconnect();
      navigation?.replace('App');
      console.log('Connecting End');
    };

    const onFailure = async res => {
      // Alert.alert('Error', res || 'Something went wrong!');
      console.log('Failed End Audio call', res);
    };
    dispatch(destroy_call_service(body, onSuccess, onFailure));
  };

  const _onSpeakerButtonPress = () => {
    setIsSpeaker(!isSpeaker);
    twilioRef?.current?.toggleSoundSetup(isSpeaker);
  };
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.app_color}]}>
      <AppHeader
        backIcon={true}
        title={'Voice Call'}
        barColor={colors.app_color}
      />

      <View style={styles.contentContainer}>
        <View />
        <View style={spacing.mb10}>
          <View style={styles.profileCon}>
            <FastImage
              source={{
                uri:
                  item?.image_url ||
                  item?.contacts?.image_url ||
                  item?.receiver_image ||
                  profile_uri,
              }}
              style={styles.profileImg}
            />
          </View>
          <Text style={[styles.titleStyle, {color: colors.b1}]}>
            {item?.name ||
              item?.title ||
              item?.contacts?.name ||
              item?.participant_name}
          </Text>
        </View>

        <View>
          <NeumorphDivider width={scrWidth} />
          <View style={styles.callCon}>
            <CallBtn
              icon={isSpeaker ? appIcons.speaker : appIcons.mute}
              height={24}
              width={24}
              onPress={() => {
                _onSpeakerButtonPress();
              }}
              tintColor={colors.g39}
            />
            <SimpleCallBtn
              onPress={() => {
                _onEndButtonPress();
              }}
              icon={appIcons.cutCall}
              height={19}
              width={19}
            />
          </View>
        </View>
      </View>
      {showModal && (
        <WarningModal
          title={'Reminder'}
          subtitle={
            'This  voice call will have atleast 10-30 seconds delay to generate the necessary translation of the conversation '
          }
          show={showModal}
          onPressHide={() => {
            setshowModal(false);
          }}
        />
      )}

      {floatMenu && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setfloatMenu(false);
          }}
          style={[
            commonStyles?.bgOverlay,
            {
              backgroundColor: colors.b8,
            },
          ]}
        />
      )}
      <TwilioVideo
        ref={twilioRef}
        onRoomDidConnect={_onRoomDidConnect}
        onRoomDidDisconnect={_onRoomDidDisconnect}
        onRoomDidFailToConnect={_onRoomDidFailToConnect}
      />
    </SafeAreaView>
  );
};

export default VoiceCall;
