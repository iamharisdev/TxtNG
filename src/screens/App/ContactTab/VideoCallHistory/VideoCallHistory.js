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
var FormData = require('form-data');
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
  _onVideoButtonPress,
  _onVideoGroupButtonPress,
} from '../../../../shared/exporter';
import {useDispatch} from 'react-redux';
import {
  blockUser,
  clearSpecificCallLogs,
  get_Video_Call_History,
} from '../../../../redux/actions';
import moment from 'moment';
import Clipboard from '@react-native-clipboard/clipboard';

const VideoCallHistory = ({navigation}) => {
  const dispatch = useDispatch();
  const [isList, setIsList] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
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
    getVideoCallHistory();
  }, []);

  const getVideoCallHistory = () => {
    setLoading(true);
    const onSuccess = res => {
      setLoading(false);
      setIsList(res?.history);
      setSearchData(res?.history);
    };
    const onFial = res => {
      setLoading(false);
      console.log('Fail:  => ', res);
    };
    dispatch(get_Video_Call_History(onSuccess, onFial));
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
        copyToClipboard(item?.user_textng_number);
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
    const connect = await checkConnected();
    setLoading(true);
    const data = new FormData();
    data.append('contact_id', item?.contacts?.contact_id);
    const onSuccess = res => {
      Alert.alert('Success', res?.message, [
        {
          text: 'OK',
          onPress: () => {
            searchData[index].contacts.blocked =
              !searchData[index].contacts.blocked;
            setSearchData([...searchData]);
            setLoading(false);
          },
        },
      ]);
    };
    const onFail = res => {
      Alert.alert('Error', res?.message || 'Something went wrong!');
      setLoading(false);
    };
    if (connect) {
      if (item?.contacts?.blocked) {
        dispatch(blockUser(data, onSuccess, onFail, 'unBlock'));
      } else {
        dispatch(blockUser(data, onSuccess, onFail, 'block'));
      }
    } else {
      alert('Network is not available');
    }
  };
  //Delete specific call log
  const DeleteSpecificCallLog = async id => {
    const connect = await checkConnected();
    setLoading(true);
    const data = new FormData();
    data.append('room_id', id);
    const onSuccess = res => {
      console.log('Success:   ', res);
      Alert.alert('Success', res?.message, [
        {
          text: 'OK',
          onPress: () => {
            let temp = searchData.filter(i => i.room_id != id);
            setSearchData(temp);
            setLoading(false);
          },
        },
      ]);
    };
    const onFial = res => {
      console.log('Fail:  => ', res);
      Alert.alert('Error', res, [
        {
          text: 'OK',
          onPress: () => {
            setLoading(false);
          },
        },
      ]);
    };
    if (connect) {
      dispatch(clearSpecificCallLogs(data, onSuccess, onFial, 'video'));
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
        title={'Video Call History'}
        onPressRight={() => {
          navigation?.navigate('DialPad');
        }}
        marginTop={10}
        // rightIcon={<Image source={appIcons.dial} style={[styles.iconStyle]} />}
      />
      <View style={styles.contentContainer}>
        <SearchInput
          inputWidth={scrWidth / 1.12}
          onChangeText={text => {
            if (text != '') {
              let term = text.toLowerCase();
              let obj = isList.filter(
                item => item?.participant_name.toLowerCase().indexOf(term) > -1,
              );
              setSearchData(obj);
            } else {
              setSearchData(isList);
            }
          }}
        />
        <View style={commonStyles.flex1}>
          <FlatList
            data={searchData}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              if (item) {
                return (
                  <ContactHistoryCard
                    iconType={appIcons.video1}
                    username={
                      item?.contacts?.name || item?.participant_name || ''
                    }
                    profile_img={
                      item?.contacts?.image_url || item?.receiver_image
                    }
                    time={moment(item?.created_at).format('hh:mm A')}
                    lastTime={moment(item?.created_at).fromNow()}
                    onSelect={res => {
                      onPressMenu(res, item, index);
                    }}
                    group={item?.group_id ? true : false}
                    groupImg1={item?.receiver_image[0]}
                    groupImg2={item?.receiver_image[1]}
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
                      if (item?.room_mode == 'Group Video Call') {
                        _onVideoGroupButtonPress(
                          navigation,
                          dispatch,
                          item,
                          setLoading,
                        );
                      } else {
                        _onVideoButtonPress(
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

export default VideoCallHistory;
