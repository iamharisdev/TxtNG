import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {useTheme} from 'react-native-paper';
import {
  AppHeader,
  AppLoader,
  ContactHistoryCard,
  SearchInput,
} from '../../../../components';
import {
  appIcons,
  checkConnected,
  commonStyles,
  scrWidth,
  _onAudioButtonPress,
  _onGroupAudioButtonPress,
} from '../../../../shared/exporter';
import {useDispatch} from 'react-redux';
import {
  blockUser,
  clearSpecificCallLogs,
  get_Voice_Call_History,
} from '../../../../redux/actions';
import moment from 'moment';
import Clipboard from '@react-native-clipboard/clipboard';

const VoiceCallHistory = ({navigation}) => {
  const [voiceCallHistory, setvoiceCallHistory] = useState([]);
  const [filterVoiceCallHistory, setfilterVoiceCallHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const {colors} = useTheme();
  const menu_list = [
    {
      id: 0,
      title: 'Block Number',
    },
    {
      id: 1,
      title: 'Clear Call Log',
    },
    {
      id: 2,
      title: 'Copy Number',
    },
  ];

  useEffect(() => {
    getAudioCallHistory();
  }, []);

  const getAudioCallHistory = () => {
    setLoading(true);
    const onSuccess = res => {
      setvoiceCallHistory(res?.history);
      setfilterVoiceCallHistory(res?.history);
      setLoading(false);
    };
    const onFial = res => {
      setLoading(false);
      Alert.alert('Error', res);
    };
    dispatch(get_Voice_Call_History(onSuccess, onFial));
  };

  const onPressMenu = (res, item, index) => {
    switch (res?.id) {
      case 0:
        BlockUser(item, index);
        break;
      case 1:
        DeleteSpecificCallLog(item?.room_id);
        break;
      case 2:
        copyToClipboard(item?.receiver_textng_number);
        break;
      default:
        break;
    }
  };

  const copyToClipboard = res => {
    Clipboard.setString(JSON.stringify(res));
    alert('TextNG number copied successfully');
  };

  const BlockUser = async (item, index) => {
    setLoading(true);
    const connet = await checkConnected();
    const data = new FormData();
    data.append('contact_id', item?.contacts?.contact_id);
    const onSuccess = res => {
      Alert.alert('Success', res?.message, [
        {
          text: 'OK',
          onPress: () => {
            filterVoiceCallHistory[index].contacts.blocked =
              !filterVoiceCallHistory[index].contacts.blocked;
            setfilterVoiceCallHistory([...filterVoiceCallHistory]);
            setLoading(false);
          },
        },
      ]);
    };
    const onFail = res => {
      alert(res?.message);
      setLoading(false);
    };
    if (connet) {
      if (item?.contacts?.blocked) {
        dispatch(blockUser(data, onSuccess, onFail, 'unBlock'));
      } else {
        dispatch(blockUser(data, onSuccess, onFail, 'block'));
      }
    } else {
      alert('Network is not available');
    }
  };

  const DeleteSpecificCallLog = async id => {
    const connet = await checkConnected();
    setLoading(true);
    const data = new FormData();
    data.append('room_id', id);
    const onSuccess = res => {
      console.log('Success:   ', res);
      Alert.alert('Error', res?.message, [
        {
          text: 'OK',
          onPress: () => {
            let temp = filterVoiceCallHistory.filter(i => i?.room_id != id);
            setfilterVoiceCallHistory(temp);
            setLoading(false);
          },
        },
      ]);
    };
    const onFial = res => {
      console.log('Fail:  => ', res);
      Alert.alert('Error', res);
      setLoading(false);
    };
    if (connet) {
      dispatch(clearSpecificCallLogs(data, onSuccess, onFial, 'audio'));
    } else {
      alert('Network is not available');
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
      <AppHeader
        barColor={colors.app_color}
        backIcon={true}
        title={'Voice Call History'}
        onPressRight={() => {
          navigation?.navigate('DialPad');
        }}
        marginTop={10}
        // rightIcon={<Image source={appIcons.dial} style={[styles.iconStyle]} />}
      />
      <View style={styles.contentContainer}>
        <SearchInput
          inputWidth={scrWidth / 1.12}
          onPressIcon={() => {
            navigation?.navigate('DialPad');
          }}
          onChangeText={text => {
            if (text != '') {
              let term = text.toLowerCase();
              let obj = voiceCallHistory.filter(
                item => item?.participant_name.toLowerCase().indexOf(term) > -1,
              );
              setfilterVoiceCallHistory(obj);
            } else {
              setfilterVoiceCallHistory(voiceCallHistory);
            }
          }}
        />
        <View style={commonStyles.flex1}>
          <FlatList
            data={filterVoiceCallHistory}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              if (item) {
                return (
                  <ContactHistoryCard
                    iconType={
                      item?.room_mode === 'Audio Call' ||
                      item?.room_mode === 'Group Audio Call'
                        ? item?.call_status == 'Outgoing'
                          ? appIcons.caller
                          : appIcons.outgoing
                        : appIcons.video1
                    }
                    username={
                      item?.contacts?.name || item?.participant_name || ''
                    }
                    profile_img={
                      item?.contacts?.image_url || item?.receiver_image
                    }
                    group={item?.group_id ? true : false}
                    groupImg1={item?.receiver_image[0]}
                    groupImg2={item?.receiver_image[1]}
                    time={moment(item?.created_at).format('hh:mm A')}
                    lastTime={moment(item?.created_at).fromNow()}
                    onSelect={res => {
                      onPressMenu(res, item, index);
                    }}
                    menu_list={
                      item?.group_id
                        ? menu_list.slice(1, 2)
                        : item?.contacts?.blocked_by
                        ? menu_list
                        : menu_list.slice(1, 3)
                    }
                    country={item?.contacts?.country || item?.receiver_country}
                    key={index}
                    blocked={item?.contacts?.blocked}
                    onPress={() => {
                      if (item?.room_mode == 'Group Audio Call') {
                        _onGroupAudioButtonPress(
                          navigation,
                          dispatch,
                          item,
                          setLoading,
                        );
                      } else {
                        _onAudioButtonPress(
                          navigation,
                          dispatch,
                          item,
                          setLoading,
                        );
                      }
                    }}
                  />
                );
              }
            }}
          />
        </View>
      </View>
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default VoiceCallHistory;
