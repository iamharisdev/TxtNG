import {Image, View, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from 'react-native-twilio-video-webrtc';
import React, {useState, useRef, useEffect} from 'react';
import {
  appIcons,
  commonStyles,
  floating_icon_list,
  profile_uri,
  scrWidth,
  spacing,
  WP,
} from '../../../shared/exporter';
import styles from './styles';

import {
  AppHeader,
  FloatingMenu,
  NeumorphBox,
  NeumorphDivider,
} from '../../../components';
import {useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {destroy_video_call_service} from '../../../redux/actions';
const VideoCall = ({navigation, route}) => {
  const [status, setStatus] = useState('disconnected');
  const [videoTracks, setVideoTracks] = useState(new Map());
  const [isSpeaker, setIsSpeaker] = useState(true);

  const twilioRef = useRef(null);
  const [floatMenu, setfloatMenu] = useState(false);
  const {colors} = useTheme();
  const dispatch = useDispatch(null);
  const {service_data} = useSelector(state => state?.callReducer);

  useEffect(() => {
    twilioRef.current.connect({
      roomName: service_data?.links?.room_sid,
      accessToken: service_data?.token_user,
      enableVideo: true,
    });

    return () => {
      _onEndButtonPress();
    };
  }, []);

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
      console.log('Failed End Video call', res);
    };
    dispatch(destroy_video_call_service(body, onSuccess, onFailure));
  };

  const _onSpeakerButtonPress = () => {
    twilioRef?.current?.toggleSoundSetup(isSpeaker);
  };

  const _onFlipButtonPress = () => {
    twilioRef.current.flipCamera();
  };

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

  const _onParticipantAddedVideoTrack = ({participant, track}) => {
    console.log('onParticipantAddedVideoTrack: ', participant, track);
    setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track.trackSid,
          {participantSid: participant.sid, videoTrackSid: track.trackSid},
        ],
      ]),
    );
  };

  const _onParticipantRemovedVideoTrack = ({participant, track}) => {
    console.log('onParticipantRemovedVideoTrack: ', participant, track);

    const videoTracksLocal = videoTracks;
    videoTracksLocal.delete(track.trackSid);

    setVideoTracks(videoTracksLocal);
  };
  const _onNetworkLevelChanged = ({participant, isLocalUser, quality}) => {
    console.log(
      'Participant',
      participant,
      'isLocalUser',
      isLocalUser,
      'quality',
      quality,
    );
  };

  const CallBtn = ({icon, height, width, onPress, tintColor}) => {
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
            style={[
              styles.iconStyle,
              {height: height, width: width, tintColor: tintColor},
            ]}
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

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.app_color}]}>
      <AppHeader backIcon={true} title={'Video Call'} />
      <View style={styles.contentContainer}>
        <View />

        <View>
          <NeumorphDivider width={scrWidth} />
          <View style={styles.callCon}>
            <CallBtn
              icon={appIcons.flipCamera}
              height={24}
              width={24}
              tintColor={colors.g39}
              onPress={_onFlipButtonPress}
            />
            <SimpleCallBtn
              onPress={() => {
                _onEndButtonPress();
              }}
              icon={appIcons.cutCall}
              height={19}
              width={19}
            />
            <CallBtn
              icon={isSpeaker ? appIcons.speaker : appIcons.mute}
              height={24}
              width={24}
              onPress={() => {
                setIsSpeaker(!isSpeaker);
                _onSpeakerButtonPress();
              }}
              tintColor={colors.g39}
            />
          </View>
        </View>
      </View>

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

      {status === 'connected' || status === 'connecting' ? (
        <View style={styles.callContainer}>
          {status === 'connected' && (
            <View style={styles.remoteGrid}>
              {Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                return (
                  <TwilioVideoParticipantView
                    style={styles.remoteVideo}
                    key={trackSid}
                    trackIdentifier={trackIdentifier}
                  />
                );
              })}
            </View>
          )}
          <View style={styles.optionsContainer}>
            <TwilioVideoLocalView enabled={true} style={styles.localVideo} />
            <View />
          </View>
        </View>
      ) : null}

      <TwilioVideo
        ref={twilioRef}
        onRoomDidConnect={_onRoomDidConnect}
        onRoomDidDisconnect={_onRoomDidDisconnect}
        onRoomDidFailToConnect={_onRoomDidFailToConnect}
        onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
        onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
        onNetworkQualityLevelsChanged={_onNetworkLevelChanged}
      />
    </SafeAreaView>
  );
};

export default VideoCall;