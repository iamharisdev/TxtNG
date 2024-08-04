import {View, SafeAreaView, FlatList, Alert, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {useTheme} from 'react-native-paper';
import {
  AddContactCard,
  AppLoader,
  ContactBox,
  ContactHistoryCard,
  MyStatusBar,
  SearchInput,
  UserContactsCard,
} from '../../../../components';
var FormData = require('form-data');
import {
  appIcons,
  checkConnected,
  commonStyles,
  contact_headings,
  createConversation,
  networkText,
  profile_uri,
  scrWidth,
  spacing,
  _onAudioButtonPress,
  _onGroupAudioButtonPress,
  _onVideoButtonPress,
  _onVideoGroupButtonPress,
  _requestAudioPermission,
  _requestCameraPermission,
} from '../../../../shared/exporter';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/core';
import {
  delete_contact,
  get_contacts,
  get_favorite_contact,
  delete_favorite_contact,
  get_groups,
  get_group_contacts,
  delete_group,
  check_connected_account,
  save_fcm_token_request,
  getAllCallHistory,
  blockUser,
  recentCallLogs,
  clearSpecificCallLogs,
} from '../../../../redux/actions';

import moment from 'moment';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {onCreateGroupConversation} from '../../../../shared/utilities/CallHandler';

const Contacts = ({navigation, Nobar}) => {
  const {colors} = useTheme();
  const [selected, setSelected] = useState('Contact');
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [contacts, setContacts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [allCallHistories, setallCallHistories] = useState([]);
  const [isRecent, setIsRecent] = useState([]);
  const [groups, setGroups] = useState([]);
  const [filterGroups, setFilterGroups] = useState([]);
  const [filterFavorites, setFilterFavorites] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [filteredCallHistories, setfilteredCallHistories] = useState([]);
  const [isFilteredRecent, setIsFilteredRecent] = useState([]);

  const isFocus = useIsFocused();
  const dispatch = useDispatch(null);

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

  const copyToClipboard = res => {
    Clipboard.setString(JSON.stringify(res));
    alert('TextNG number copied successfully');
  };

  //Send FCM Token
  useEffect(() => {
    if (isFocus) {
      getAllRequest();
      // getConnectAccount();
      sendFCMToken();
    }
  }, [isFocus]);

  const getConnectAccount = async () => {
    const check = await checkConnected();
    if (check) {
      dispatch(check_connected_account('', res => {}));
    } else {
      Alert.alert('Error', networkText);
    }
  };

  const getAllRequest = () => {
    if (selected == 'Contact') {
      get_all_contacts();
    } else if (selected == 'Recents') {
      getAllRecentCall();
    } else if (selected == 'Favorites') {
      getFavorites();
    } else if (selected == 'Groups') {
      getAllGroups();
    } else if (selected == 'History') {
      getAllHistories();
    }
  };
  //Get all Contacts
  const get_all_contacts = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const onSuccess = res => {
        setContacts(res);
        setFilteredContacts(res);
        setLoading(false);
        console.log('On Get Contact Success');
      };
      const onFailure = res => {
        setLoading(false);
        console.log('On Get Contact Failure', res);
      };
      dispatch(get_contacts(onSuccess, onFailure));
    } else {
      Alert.alert('Error', networkText);
    }
  };
  //Get Favorites
  const getFavorites = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const onSuccess = res => {
        setLoading(false);
        setFavorites(res);
        setFilterFavorites(res);
        console.log('On Get Favorites Success');
      };
      const onFailure = res => {
        setLoading(false);
        console.log('On Get Favorites Failure', res);
      };
      dispatch(get_favorite_contact(onSuccess, onFailure));
    } else {
      Alert.alert('Error', networkText);
    }
  };
  //Delete Contact
  const deleteContact = async (item, index) => {
    const check = await checkConnected();
    if (check) {
      const requestBody = {
        number: item?.companion?.textng_number,
        id: item?.companion?.id,
      };
      setLoading(true);
      const onSuccess = res => {
        setLoading(false);
        console.log('On Delete Contact Success');
        const filteredItem = contacts?.filter(fitem => {
          return fitem?.companion?.id != item?.companion?.id;
        });
        setContacts([...filteredItem]);
      };
      const onFailure = res => {
        setLoading(false);
        console.log('On Delete Contact Failure', res);
      };
      dispatch(delete_contact(requestBody, onSuccess, onFailure));
    } else {
      Alert.alert('Error', networkText);
    }
  };
  //Delete Favorites
  const deleteFavoriteContact = async (item, index) => {
    const check = await checkConnected();
    if (check) {
      const requestBody = {
        contact_id: item?.id,
        id: item?.companion?.id,
      };
      setLoading(true);
      const onSuccess = res => {
        setLoading(false);
        console.log('On Delete Favourite Success');
        const filteredItem = favorites?.filter(fitem => {
          return fitem?.companion?.id != item?.companion?.id;
        });
        setFavorites([...filteredItem]);
      };
      const onFailure = res => {
        setLoading(false);
        console.log('On Delete Favorite Failure', res);
      };
      dispatch(delete_favorite_contact(requestBody, onSuccess, onFailure));
    } else {
      Alert.alert('Error', networkText);
    }
  };

  //Get All Groups
  const getAllGroups = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const onSuccess = res => {
        setLoading(false);
        setGroups(res);
        setFilterGroups(res);
        console.log('On Get Groups Success', res);
      };
      const onFailure = res => {
        setLoading(false);
        console.log('On Get Groups Failure', res);
      };
      dispatch(get_groups(onSuccess, onFailure));
    } else {
      Alert.alert('Error', networkText);
    }
  };

  //on Delete Group
  const deleteGroupHanlder = async (item, index) => {
    const check = await checkConnected();
    if (check) {
      const requestBody = {
        name: item?.name,
        id: item?.id,
      };
      setLoading(true);
      const onSuccess = res => {
        setLoading(false);
        console.log('On Delete Group Success');
        const filteredItem = groups?.filter(fitem => {
          return fitem?.id != item?.id;
        });
        setGroups([...filteredItem]);
      };
      const onFailure = res => {
        setLoading(false);
        console.log('On Delete Group Failure', res);
      };
      dispatch(delete_group(requestBody, onSuccess, onFailure));
    } else {
      Alert.alert('Error', networkText);
    }
  };

  //Search Items
  const searchItem = async (getlist, search) => {
    const list = await getlist();
    setSearchText(search);
    let searchData = [];
    if (selected == 'History' || selected == 'Recents') {
      searchData = list?.filter(item => {
        return item?.participant_name
          ?.toUpperCase()
          .includes(search.toUpperCase());
      });
    } else {
      searchData = list?.filter(item => {
        return item?.name?.toUpperCase().includes(search.toUpperCase());
      });
    }
    switch (selected) {
      case 'Contact':
        setContacts(searchData);
        break;
      case 'Recents':
        setIsRecent(searchData);
        break;
      case 'Favorites':
        setFavorites(searchData);
        break;
      case 'Groups':
        setGroups(searchData);
        break;
      case 'History':
        setallCallHistories(searchData);
        break;
      default:
        break;
    }
  };

  const checkList = () => {
    if (selected == 'Contact') {
      return filteredContacts;
    } else if (selected == 'Recents') {
      return isFilteredRecent;
    } else if (selected == 'Favorites') {
      return filterFavorites;
    } else if (selected == 'Groups') {
      return filterGroups;
    } else if (selected == 'History') {
      return filteredCallHistories;
    }
  };

  //on Seelect Tab
  const onSelectTab = item => {
    setSelected(item?.text);
    if (item?.text == 'Contact') {
      get_all_contacts();
      setSearchText('');
    } else if (item?.text == 'Recents') {
      getAllRecentCall();
      setSearchText('');
    } else if (item?.text == 'Favorites') {
      setSearchText('');
      getFavorites();
    } else if (item?.text == 'Groups') {
      setSearchText('');
      getAllGroups();
    } else if (item?.text == 'History') {
      getAllHistories();
      setSearchText('');
    }
  };

  const sendFCMToken = async () => {
    const cbSuccess = res => {
      console.log('FCM TOKEN SAVED');
    };
    const cbFailure = msg => {
      Alert.alert('Failed', msg);
    };
    AsyncStorage.getItem('fcmToken').then(token => {
      const body = {
        mobile_token: token,
      };
      dispatch(save_fcm_token_request(body, cbSuccess, cbFailure));
    });
  };

  //All Call Histories
  const getAllHistories = async () => {
    setLoading(true);
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const onSuccess = async res => {
        setLoading(false);
        setallCallHistories(res.history);
        setfilteredCallHistories(res.history);
        setLoading(false);
      };
      const onFailure = async res => {
        setLoading(false);
        Alert.alert('Error', res || 'Something went wrong!');
      };
      dispatch(getAllCallHistory(null, onSuccess, onFailure));
    } else {
      setLoading(false);
      Alert.alert('Error', networkText);
    }
  };

  const onPressMenu = (res, item, index) => {
    switch (res?.id) {
      case 0:
        BlockUser(item, index);
        break;
      case 1:
        DeleteSpecificCallLog(item?.room_id, 'history');
        break;
      case 2:
        copyToClipboard(item?.receiver_txng_number);
        break;
      default:
        break;
    }
  };

  const DeleteSpecificCallLog = async (id, type) => {
    const connect = await checkConnected();
    setLoading(true);
    const data = new FormData();
    data.append('room_id', id);
    const onSuccess = res => {
      Alert.alert('Success', res?.message, [
        {
          text: 'OK',
          onPress: () => {
            if (type == 'history') {
              let temp = allCallHistories.filter(i => i?.room_id != id);
              setallCallHistories(temp);
            } else {
              let temp = isRecent.filter(i => i?.room_id != id);
              setIsRecent(temp);
            }
            setLoading(false);
          },
        },
      ]);
    };
    const onFial = res => {
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
      dispatch(clearSpecificCallLogs(data, onSuccess, onFial, ''));
    } else {
      alert('Network is not available');
    }
  };
  // All recent Call History
  const getAllRecentCall = () => {
    setLoading(true);
    const onSuccess = res => {
      setIsRecent(res.history);
      setIsFilteredRecent(res.history);
      setLoading(false);
    };
    const onFail = res => {
      setLoading(false);
    };

    dispatch(recentCallLogs(onSuccess, onFail));
  };

  const BlockUser = async (item, index) => {
    const connect = await checkConnected();
    setLoading(true);
    const data = new FormData();
    data.append('contact_id', item?.contacts?.contact_id);
    console.log(data);
    const onSuccess = res => {
      allCallHistories[index].contacts.blocked =
        !allCallHistories[index].contacts.blocked;
      setallCallHistories([...allCallHistories]);
      Alert.alert('Success', res?.message);
      setLoading(false);
    };
    const onFail = res => {
      alert(res?.message || 'Something went wrong');
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

  const handleItemClick = (res, item) => {
    if (res?.id == 1) {
      if (item?.group_id) {
        _onGroupAudioButtonPress(navigation, dispatch, item, setLoading);
      } else {
        _onAudioButtonPress(navigation, dispatch, item, setLoading);
      }
    } else if (res?.id == 2) {
      if (item?.group_id) {
        onCreateGroupConversation(navigation, item);
      } else {
        createConversation(navigation, dispatch, item, setLoading);
      }
    } else if (res?.id == 3) {
      if (item?.group_id) {
        _onVideoGroupButtonPress(navigation, dispatch, item, setLoading);
      } else {
        _onVideoButtonPress(navigation, dispatch, item, setLoading);
      }
    }
  };

  //Handle Group Call
  const onHandleGroupCall = (res, item) => {
    if (res?.id == 1) {
      _onGroupAudioButtonPress(navigation, dispatch, item, setLoading);
    } else if (res?.id == 2) {
      onCreateGroupConversation(navigation, item);
    } else if (res?.id == 3) {
      _onVideoGroupButtonPress(navigation, dispatch, item, setLoading);
    }
  };

  // Handle Sigle call
  const onHandleSigleCall = (res, item) => {
    if (res?.id == 1) {
      _onAudioButtonPress(navigation, dispatch, item, setLoading);
    } else if (res?.id == 2) {
      createConversation(navigation, dispatch, item, setLoading);
    } else if (res?.id == 3) {
      _onVideoButtonPress(navigation, dispatch, item, setLoading);
    }
  };

  return (
    <>
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: colors.app_color,
          },
        ]}>
        {!Nobar && <MyStatusBar backgroundColor={colors.app_color} />}
        <View style={styles.contentContainer}>
          <SearchInput
            onChangeText={text => {
              searchItem(checkList, text);
            }}
            onPressIcon={() => {
              navigation?.navigate('DialPad');
            }}
            value={searchText}
            inputWidth={scrWidth / 1.12}
          />

          <View style={styles.aiRow}>
            {contact_headings.map((item, index) => {
              return (
                <View key={index}>
                  <ContactBox
                    icon={item?.img}
                    title={item?.text}
                    onPress={() => {
                      onSelectTab(item);
                    }}
                    selected={selected}
                  />
                </View>
              );
            })}
          </View>
          {selected != 'History' && (
            <AddContactCard
              title={selected == 'Groups' ? 'Add a Group' : 'Add a Contact'}
              onPress={() => {
                if (selected == 'Groups') {
                  dispatch(
                    get_group_contacts([], () => {
                      navigation?.navigate('CreateGroup');
                    }),
                  );
                } else {
                  navigation?.navigate('AddContact');
                }
              }}
            />
          )}
          {selected == 'Contact' && (
            <View style={commonStyles.flex1}>
              <FlatList
                data={contacts}
                renderItem={({item, index}) => {
                  if (item) {
                    return (
                      <UserContactsCard
                        onPressDelete={() => {
                          deleteContact(item);
                        }}
                        country={item?.country}
                        swipeable={true}
                        onPress={() => {
                          navigation?.navigate('ContactDetail', {
                            contact_detail: item,
                          });
                        }}
                        img={item?.image_url}
                        workStation={item?.companion?.profile_status}
                        username={item?.name || 'username'}
                        time={moment(item?.created_at).format('hh:mm A')}
                        onPressButton={res => {
                          handleItemClick(res, item);
                        }}
                      />
                    );
                  }
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
          {selected == 'Recents' && (
            <View style={commonStyles.flex1}>
              <FlatList
                data={isRecent}
                renderItem={({item, index}) => {
                  if (item) {
                    return (
                      <UserContactsCard
                        swipeable={true}
                        onPressDelete={() => {
                          DeleteSpecificCallLog(item?.room_id, 'recent');
                        }}
                        onPress={() => {}}
                        group={
                          item?.room_mode === 'Group Audio Call' ||
                          item?.room_mode === 'Group Video Call'
                            ? true
                            : false
                        }
                        groupImg1={item?.receiver_image[0]}
                        groupImg2={item?.receiver_image[1]}
                        img={item?.contacts?.image_url}
                        workStation={item?.profile_status}
                        username={
                          item?.contacts?.name || item?.participant_name || ''
                        }
                        id={item?.id}
                        time={moment(item?.created_at).format('hh:mm A')}
                        onPressCall={() => {}}
                        onPressButton={res => {
                          handleItemClick(res, item);
                        }}
                        country={
                          item?.contacts?.country || item?.receiver_country
                        }
                      />
                    );
                  }
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
          {selected == 'Favorites' && (
            <View style={commonStyles.flex1}>
              <FlatList
                data={favorites}
                renderItem={({item, index}) => {
                  return (
                    <UserContactsCard
                      id={item}
                      onPressDelete={() => {
                        deleteFavoriteContact(item, index);
                      }}
                      onPress={() => {
                        navigation?.navigate('ContactDetail', {
                          contact_detail: item,
                        });
                      }}
                      country={item?.country}
                      img={item?.image_url}
                      workStation={item?.companion?.profile_status}
                      username={item?.name || 'username'}
                      key={item}
                      time={moment(item?.created_at).format('hh:mm A')}
                      onPressButton={res => {
                        onHandleSigleCall(res, item);
                      }}
                    />
                  );
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
          {selected == 'Groups' && (
            <View style={commonStyles.flex1}>
              <FlatList
                data={groups}
                renderItem={({item, index}) => {
                  if (item) {
                    return (
                      <UserContactsCard
                        groupImg1={item?.group_logo[0] || item?.user?.image_url}
                        groupImg2={item?.group_logo[1]}
                        onPressDelete={() => {
                          deleteGroupHanlder(item, index);
                        }}
                        country={item?.conversation?.country}
                        username={item?.name}
                        time={moment(item?.updated_at).format('hh:mm A')}
                        workStation={item?.status}
                        onPress={() => {
                          dispatch(
                            get_group_contacts([], () => {
                              navigation?.navigate('GroupDetail', {
                                group_detail: item,
                              });
                            }),
                          );
                        }}
                        onPressButton={res => {
                          onHandleGroupCall(res, item);
                        }}
                        img={item?.image_url}
                        group={true}
                        id={item}
                      />
                    );
                  }
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
          {selected == 'History' && (
            <View style={[commonStyles.flex1, spacing.my2]}>
              <FlatList
                data={allCallHistories}
                renderItem={({item, index}) => {
                  if (item) {
                    return (
                      <ContactHistoryCard
                        username={
                          item?.contacts?.name || item?.participant_name || ''
                        }
                        iconType={
                          item?.room_mode === 'Audio Call' ||
                          item?.room_mode === 'Group Audio Call'
                            ? item?.call_status == 'Outgoing'
                              ? appIcons.caller
                              : appIcons.outgoing
                            : appIcons.video1
                        }
                        group={
                          item?.room_mode === 'Group Audio Call' ||
                          item?.room_mode === 'Group Video Call'
                            ? true
                            : false
                        }
                        groupImg1={item?.receiver_image[0]}
                        groupImg2={item?.receiver_image[1]}
                        profile_img={item?.contacts?.image_url}
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
                        country={
                          item?.contacts?.country || item?.receiver_country
                        }
                        blocked={item?.contacts?.blocked}
                      />
                    );
                  }
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
        </View>
        <AppLoader loading={loading} />
      </SafeAreaView>
    </>
  );
};

export default Contacts;
