import {
  Image,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
  FlatList,
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
import {destroy_group_voice_call_service} from '../../../redux/actions';
const GroupVoiceCall = ({navigation, route}) => {
  const [floatMenu, setfloatMenu] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const {colors} = useTheme();
  const twilioRef = useRef(null);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const {group_service_data} = useSelector(state => state?.callReducer);
  const [status, setStatus] = useState('disconnected');
  const dispatch = useDispatch(null);
  const {item} = route?.params;

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
    if (group_service_data?.token_user) {
      // setshowModal(true);
      twilioRef.current.connect({
        roomName: 'room',
        accessToken: group_service_data?.token_user,
        enableAudio: true,
      });
    }
    return () => {
      twilioRef?.current?.disconnect();
    };
  }, []);

  const choseNavigatedScreen = res => {
    setfloatMenu(false);
    switch (res?.id) {
      case 0:
        navigation?.navigate('AddContact');
        break;
      case 1:
        navigation?.navigate('VoiceCall');
        break;
      case 2:
        navigation?.navigate('VideoCall');
        break;
      case 3:
        navigation?.navigate('Wallet');
        break;
      case 4:
        navigation?.navigate('TranslateLang');
        break;

      default:
        break;
    }
  };

  //Audio Call

  const _onRoomDidConnect = ({roomName, error}) => {
    console.log('onRoomDidConnect: ', roomName);
    setStatus('connected');
  };

  const _onRoomDidDisconnect = ({roomName, error}) => {
    console.log('[Disconnect]ERROR: ', error);

    setStatus('disconnected');
  };

  const _onRoomDidFailToConnect = error => {
    console.log('[FailToConnect]ERROR: ', error);

    setStatus('disconnected');
  };

  const _onEndButtonPress = () => {
    const body = {
      room_uname: group_service_data?.room_sid,
    };
    const onSuccess = async res => {
      twilioRef.current.disconnect();
      navigation.replace('App');
      console.log('Connecting End');
    };

    const onFailure = async res => {
      console.log('Failed Group End Audio call>>', res);
      // Alert.alert('Error', res || 'Something went wrong!');
    };
    dispatch(destroy_group_voice_call_service(body, onSuccess, onFailure));
  };

  const _onSpeakerButtonPress = () => {
    setIsSpeaker(!isSpeaker);
    twilioRef?.current?.toggleSoundSetup(isSpeaker);
  };
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.app_color}]}>
      <AppHeader
        barColor={colors.app_color}
        onPressBack={() => {
          navigation?.replace('App');
        }}
        backIcon={true}
        title={'Voice Call'}
      />
      <TouchableOpacity
        style={[styles.rightCon]}
        onPress={() => {
          setfloatMenu(!floatMenu);
        }}>
        <NeumorphBox
          width={44}
          height={44}
          alignItems={'center'}
          justifyContent={'center'}>
          <Image
            style={[
              styles.imageStyle,
              {
                tintColor: colors.pur2,
              },
            ]}
            source={appIcons.global}
          />
          <Image source={appIcons.world} style={styles.imgStyle1} />
        </NeumorphBox>
      </TouchableOpacity>

      {floatMenu && (
        <FloatingMenu
          onPressIcon={item => {
            choseNavigatedScreen(item);
          }}
          list={floating_icon_list}
        />
      )}

      <View style={styles.contentContainer}>
        <View />
        <View style={styles.aiCenter}>
          <FlatList
            data={item}
            renderItem={({item}) => {
              return (
                <View style={styles.profileCon}>
                  <FastImage
                    source={{
                      uri: item?.image || item?.image_url || profile_uri,
                    }}
                    style={[styles.profileImg, {backgroundColor: colors.g10}]}
                  />
                  <Text style={[styles.titleStyle, {color: colors.b1}]}>
                    {item?.user?.name || item?.name || item?.title || ''}
                  </Text>
                </View>
              );
            }}
            numColumns={2}
          />
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

export default GroupVoiceCall;
