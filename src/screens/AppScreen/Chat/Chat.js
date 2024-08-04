import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableOpacity,
  Keyboard,
  Alert,
  Linking,
  Vibration,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  appIcons,
  commonStyles,
  floating_icon_list,
  scrWidth,
  useActionCable,
  useChannel,
  BASE_URL,
  networkText,
  checkConnected,
  checkPermission,
  millisToMinutesAndSeconds,
  profile_uri,
  CABLE_BASE_URL,
  _onAudioButtonPress,
  _onVideoButtonPress,
  _onGroupAudioButtonPress,
  _onVideoGroupButtonPress,
} from '../../../shared/exporter';
import styles from './styles';
import {
  AppLoader,
  BlankField,
  ChatBox,
  ChatHeader,
  ChatInput,
  EmojiModal,
  FloatingMenu,
  InvitationModal,
  NeumorphBox,
  NeumorphDivider,
  PlayerBox,
} from '../../../components';
import {useTheme} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {
  send_message_request,
  get_message_request,
  set_message_request,
  set_current_message_request,
  set_stop_playing_request,
  set_audio_loading_request,
  read_all_message_request,
} from '../../../redux/actions';
import SoundRecorder from 'react-native-sound-recorder';
import SoundPlayer from 'react-native-sound-player';
import {SkypeIndicator} from 'react-native-indicators';

const Chat = ({navigation, route}) => {
  const {channel_detail, type, groupImg} = route?.params;
  const {colors} = useTheme();
  const [openEmojiModal, setopenEmojiModal] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [floatMenu, setfloatMenu] = useState(false);
  const [showmodal, setshowmodal] = useState(false);
  const [recording, setRecording] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [timer, setTimer] = useState(0);
  //References
  const isFocus = useIsFocused();
  const flatRef = useRef(null);
  let currentPlay = useRef(null);
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state?.auth);
  const {all_messages} = useSelector(state => state?.appReducer);
  const {actionCable} = useActionCable(
    `${CABLE_BASE_URL}cable/${userInfo?.user?.id}`,
  );
  const {subscribe, unsubscribe, send, connected} = useChannel(actionCable);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);

  //Sound Recorder
  var _onFinishedPlayingSubscription = null;
  var _onFinishedLoadingSubscription = null;
  var _onFinishedLoadingFileSubscription = null;
  var _onFinishedLoadingURLSubscription = null;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const choseNavigatedScreen = res => {
    setfloatMenu(false);
    switch (res?.id) {
      case 0:
        navigation?.navigate('AddContact');
        break;
      case 1:
        if (
          channel_detail?.data?.conversation?.group ||
          channel_detail?.group
        ) {
          _onGroupAudioButtonPress(
            navigation,
            dispatch,
            channel_detail?.data?.conversation || channel_detail,
            setIsLoading,
          );
        } else {
          _onAudioButtonPress(
            navigation,
            dispatch,
            channel_detail?.data?.conversation || channel_detail,
            setIsLoading,
          );
        }
        break;
      case 2:
        if (
          channel_detail?.data?.conversation?.group ||
          channel_detail?.group
        ) {
          _onVideoGroupButtonPress(
            navigation,
            dispatch,
            channel_detail?.data?.conversation || channel_detail,
            setIsLoading,
          );
        } else {
          _onVideoButtonPress(
            navigation,
            dispatch,
            channel_detail?.data?.conversation || channel_detail,
            setIsLoading,
          );
        }
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

  //Get Messages
  useEffect(() => {
    if (isFocus) {
      getGroupMessages();
      read_all_conversations();
    }
  }, [isFocus]);

  //Read All Messages
  const read_all_conversations = async () => {
    dispatch(
      read_all_message_request(
        channel_detail?.data?.conversation?.id || channel_detail?.id,
        res => {
          console.log(res);
        },
      ),
      res => {
        Alert.alert('Error', res);
      },
    );
  };

  useEffect(() => {
    try {
      subscribe(
        {
          channel: `ConversationsChannel`,
          channel_key: `conversations_channel_${channel_detail?.data?.conversation?.id}`,
        },
        {
          received: msg => {
            msg.body.message['audio_file'] = msg?.body?.audio_file;
            msg.body.message['loading'] = false;
            msg.body.message['play'] = false;
            msg.body.message['image_url'] = msg?.body?.image_url;
            dispatch(
              set_message_request(msg?.body?.message, () => {
                flatRef?.current?.scrollToOffset({animated: true, offset: 0});
              }),
            );
          },
          connected: () => {
            console.log('Connected');
          },
        },
      );
    } catch (err) {
      console.log('err', err);
    }
    return () => {
      unsubscribe();
    };
  }, []);

  //Get Messages
  const getGroupMessages = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      dispatch(
        get_message_request(
          channel_detail?.data?.conversation?.id || channel_detail?.id,
          res => {
            setLoading(false);
            flatRef?.current?.scrollToEnd({animated: false});
          },
          res => {
            setLoading(false);
            Alert.alert('Error', res);
          },
        ),
      );
    } else {
      Alert.alert('Error', networkText);
    }
  };

  //Send Messages
  const onSend = async () => {
    if (chatInput != '') {
      const check = await checkConnected();
      if (check) {
        const requestBody = {
          message: chatInput,
          user_id: userInfo?.user?.id,
          conversation_id:
            channel_detail?.data?.conversation?.id || channel_detail?.id,
        };
        dispatch(
          send_message_request(
            requestBody,
            res => {
              setChatInput('');
              setTimer(0);
              flatRef.current.scrollToOffset({animated: true, offset: 0});
            },
            err => {
              setTimer(0);
              Alert.alert('Error', err);
            },
          ),
        );
      } else {
        Alert.alert('Error', networkText);
      }
    }
  };

  // *************************Recorders****************
  // Start Record
  const onRecord = async () => {
    try {
      const check = await checkPermission('audio');
      if (check) {
        SoundRecorder.start(SoundRecorder.PATH_CACHE + `/${Math.random()}.mp4`)
          .then(function () {
            setRecording(true);
            console.log('started recording');
          })
          .catch(error => {
            console.log('Error', error);
          });
      } else {
        Alert.alert('Error', 'Please provide audio permission', [
          {
            text: 'OK',
            onPress: () => {
              Linking.openSettings();
            },
          },
        ]);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  //Stor Record
  const onStopRecord = async () => {
    try {
      SoundRecorder.stop().then(async function (result) {
        setRecording(false);
        setTimer(0);
        const check = await checkConnected();
        if (check) {
          setAudioLoading(true);
          const form = new FormData();
          form.append('user_id', userInfo?.user?.id || profile_info?.user?.id);
          form.append(
            'conversation_id',
            channel_detail?.data?.conversation?.id || channel_detail?.id,
          );
          const audio_obj = {
            name: `audio_file`,
            uri: `file://${result?.path}`,
            type: 'audio/mp4',
          };
          form.append('audio_file', audio_obj);
          form.append('duration', result?.duration);
          dispatch(
            send_message_request(
              form,
              res => {
                setAudioLoading(false);
                flatRef.current.scrollToOffset({animated: true, offset: 0});
              },
              err => {
                setAudioLoading(false);
                Alert.alert('Error', err);
              },
            ),
          );
        } else {
          Alert.alert('Error', networkText);
        }
      });
    } catch (error) {}
  };

  // Subscribe to event(s) you want when component mounted
  useEffect(() => {
    _onFinishedPlayingSubscription = SoundPlayer.addEventListener(
      'FinishedPlaying',
      ({success}) => {
        dispatch(set_stop_playing_request(currentPlay?.current));
      },
    );
    _onFinishedLoadingSubscription = SoundPlayer.addEventListener(
      'FinishedLoading',
      ({success}) => {
        if (success) {
          dispatch(set_audio_loading_request(currentPlay?.current));
        }
      },
    );
    _onFinishedLoadingFileSubscription = SoundPlayer.addEventListener(
      'FinishedLoadingFile',
      ({success, name, type}) => {
        if (success) {
          dispatch(set_audio_loading_request(currentPlay?.current));
        }
      },
    );
    _onFinishedLoadingURLSubscription = SoundPlayer.addEventListener(
      'FinishedLoadingURL',
      ({success, url}) => {
        if (success) {
          dispatch(set_audio_loading_request(currentPlay?.current));
        }
      },
    );

    return () => {
      SoundPlayer?.stop();
      _onFinishedPlayingSubscription.remove();
      _onFinishedLoadingSubscription.remove();
      _onFinishedLoadingURLSubscription.remove();
      _onFinishedLoadingFileSubscription.remove();
    };
  }, []);

  //Play Sound
  const onPlaySound = index => {
    currentPlay.current = index;
    if (all_messages.length > 0) {
      dispatch(set_current_message_request(index));
      if (all_messages[index]?.audio_file) {
        let str = all_messages[index]?.audio_file;
        str = str?.split('');
        str?.pop();
        const audio_file = str?.join('');
        SoundPlayer.playUrl(`${audio_file}`);
      }
    }
  };

  //Stop Sound
  const onPauseSound = index => {
    SoundPlayer.resume();
    dispatch(set_current_message_request(index));
    dispatch(set_audio_loading_request(index));
  };

  useEffect(() => {
    if (recording) {
      const timeout = setTimeout(() => {
        setTimer(timer + 1);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [timer, recording]);

  let minutes = Math.floor((timer / 60) % 60);
  let seconds = Math.floor(timer % 60);

  //Render Checkbox
  const RenderChatBox = ({item, receiver, index}) => {
    return (
      <>
        {item?.message ? (
          <ChatBox
            receiver={receiver}
            messages={item?.message}
            time={item?.created_at}
            isSeen={item?.read_status}
            img={item?.image_url}
          />
        ) : (
          <PlayerBox
            duration={millisToMinutesAndSeconds(item?.duration) || 0}
            progress={
              ((parseInt(item?.duration) % 60000) / 1000).toFixed(0) || 0
            }
            time={item?.created_at || 0}
            player={all_messages[index]?.play}
            onPlay={() => {
              onPlaySound(index);
            }}
            onPause={() => {
              onPauseSound(index);
            }}
            receiver={receiver}
            loading={all_messages[index]?.loading}
            isSeen={item?.read_status}
          />
        )}
      </>
    );
  };

  return (
    <>
      <ChatHeader
        group={type == 'group' && groupImg?.length > 1 ? true : false}
        profileImg={
          type != 'group'
            ? channel_detail?.data?.conversation?.image_url ||
              channel_detail?.image_url
            : groupImg
            ? groupImg[0]
            : profile_uri
        }
        profileImg1={groupImg ? groupImg[1] : userInfo?.profile_image}
        title={
          channel_detail?.data?.conversation?.contact?.name ||
          channel_detail?.data?.conversation?.title ||
          channel_detail?.title ||
          'username'
        }
        subtitle={'Online'}
        marginTop={10}
        barColor={colors.app_color}
        backIcon={true}
      />
      <TouchableOpacity
        style={[styles.rightCon]}
        onPress={() => {
          setfloatMenu(!floatMenu);
        }}>
        <NeumorphBox
          width={45}
          height={45}
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
      <KeyboardAvoidingView
        behavior={Platform.OS == 'android' ? null : 'padding'}
        style={{flex: 1, backgroundColor: colors.app_color}}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.app_color,
            },
          ]}>
          {!loading ? (
            <View style={[styles.contentContainer]}>
              {all_messages?.length > 0 ? (
                <View style={styles.listStyle}>
                  <FlatList
                    ref={flatRef}
                    data={all_messages}
                    extraData={all_messages}
                    contentContainerStyle={styles.pad5}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => {
                      if (userInfo?.user?.id != item?.user_id) {
                        return (
                          <RenderChatBox
                            item={item}
                            receiver={true}
                            index={index}
                          />
                        );
                      } else {
                        return (
                          <RenderChatBox
                            item={item}
                            receiver={false}
                            index={index}
                          />
                        );
                      }
                    }}
                    ListFooterComponent={<View />}
                    ListFooterComponentStyle={{
                      height: isKeyboardVisible ? 80 : 0,
                    }}
                    inverted={true}
                    keyExtractor={() => Math.random()}
                  />
                  <NeumorphDivider width={scrWidth} />
                </View>
              ) : (
                <BlankField title={'No Conversation'} />
              )}
              <View style={styles.pad5}>
                <ChatInput
                  loading={audioLoading}
                  onSubmitEditing={onSend}
                  value={chatInput}
                  onChangeText={text => {
                    setChatInput(text);
                  }}
                  onPressLeftIcon={() => {
                    setopenEmojiModal(!openEmojiModal);
                  }}
                  rightIcon={() => (
                    <TouchableOpacity
                      disabled={loading}
                      style={styles.sendBtnStyle}
                      onPress={onSend}>
                      <Image source={appIcons.send} style={styles.imgStyle} />
                    </TouchableOpacity>
                  )}
                  placeholder={'Type Something'}
                  placeholderTextColor={colors.g4}
                  onRecord={() => {
                    Vibration.vibrate(200);
                    onRecord();
                  }}
                  onStopRecord={() => {
                    onStopRecord();
                    Vibration.vibrate(50);
                  }}
                  recording={recording}
                  time={`${minutes < 10 ? `0${minutes}` : minutes} :  ${
                    seconds < 10 ? `0${seconds}` : seconds
                  }`}
                />
                {openEmojiModal && (
                  <EmojiModal
                    onPressHide={() => {
                      setopenEmojiModal(false);
                    }}
                    show={openEmojiModal}
                    onPressEmoji={item => {
                      let text = chatInput?.concat(item);
                      setChatInput(text);
                      setopenEmojiModal(false);
                    }}
                  />
                )}
              </View>
            </View>
          ) : (
            <SkypeIndicator />
          )}
        </View>
      </KeyboardAvoidingView>
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
      <InvitationModal
        show={showmodal}
        onPress={() => {
          setshowmodal(false);
        }}
        title={`Warning!
        Having multiple contacts might disable the translation capability of the app.`}
        btnText={'Got it!'}
      />
      <AppLoader loading={isLoading} />
    </>
  );
};

export default Chat;
