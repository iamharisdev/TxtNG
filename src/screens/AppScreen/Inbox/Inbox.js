import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  AppHeader,
  AppLoader,
  BlankField,
  InboxCard,
  SearchInput,
} from '../../../components';
import {useTheme} from 'react-native-paper';
import {
  appIcons,
  BASE_URL,
  CABLE_BASE_URL,
  checkConnected,
  commonStyles,
  networkText,
  profile_uri,
  responseValidator,
  scrWidth,
} from '../../../shared/exporter';
import styles from './styles';
import {useIsFocused} from '@react-navigation/core';
import {
  get_conversation_Request,
  read_all_message_request,
} from '../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {deleteConversationApi} from '../../../shared/service/AppService';
import {useActionCable, useChannel} from '../../../shared/Hooks';
import {
  onCreateGroupConversation,
  createConversation,
  get_conversation,
} from '../../../shared/utilities/CallHandler';
const Inbox = ({navigation}) => {
  const isFocus = useIsFocused();
  // States
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [allConversations, setallConversations] = useState([]);
  const [filteredConversation, setFilteredConversation] = useState([]);
  const {profile_info, userInfo} = useSelector(state => state?.auth);

  const {actionCable} = useActionCable(
    `${CABLE_BASE_URL}cable/${userInfo?.user?.id}`,
  );
  const {subscribe, unsubscribe, send, connected} = useChannel(actionCable);

  const {colors} = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocus) {
      getConversations();
    }
  }, [isFocus]);

  //Initialize channel
  useEffect(() => {
    try {
      subscribe(
        {
          channel: `DashboardChannel`,
          channel_key: `dashboard_channel_${userInfo?.user?.id}`,
        },
        {
          received: msg => {
            setallConversations(msg?.body?.conversations);
            setFilteredConversation(msg?.body?.conversations);
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

  //Get Conversations
  const getConversations = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const onSuccess = res => {
        setallConversations(res?.conversations);
        setFilteredConversation(res?.conversations);
        setLoading(false);
        console.log('On Get Conversation Success');
      };
      const onFailure = res => {
        setFilteredConversation([]);
        setallConversations([]);
        setLoading(false);
        console.log('On Get Conversation Failure', res);
      };
      dispatch(get_conversation_Request(onSuccess, onFailure));
    } else {
      Alert.alert('Error', networkText);
    }
  };

  //Delete Conversation
  const deleteConversation = async (item, index) => {
    const check = await checkConnected();
    if (check) {
      try {
        setLoading(true);
        const res = await deleteConversationApi(item?.id);
        if (res?.data) {
          const filteredItem = allConversations?.filter(fitem => {
            return fitem?.id != item?.id;
          });
          setallConversations([...filteredItem]);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        let msg = responseValidator(
          error.response.status,
          error?.response?.data,
        );
        Alert.alert('Error', msg);
      }
    } else {
      Alert.alert('Error', networkText);
    }
  };

  //Search Items
  const searchItem = async search => {
    setSearchText(search);
    let searchData = [];
    searchData = filteredConversation?.filter(item => {
      return item?.title?.toUpperCase().includes(search.toUpperCase());
    });
    setallConversations(searchData);
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
        title={'Inbox'}
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
            searchItem(text);
          }}
        />
        <View style={commonStyles.flex1}>
          {allConversations != '' ? (
            <FlatList
              data={allConversations}
              refreshControl={
                <RefreshControl
                  colors={[colors?.pur2, colors?.pur3]}
                  refreshing={false}
                  onRefresh={() => {
                    getConversations();
                  }}
                />
              }
              renderItem={({item, index}) => {
                return (
                  <InboxCard
                    country={item?.country}
                    profileImg={item?.image_url}
                    username={item?.contact?.name || item?.title}
                    onPressDelete={() => {
                      deleteConversation(item);
                    }}
                    onPress={() => {
                      if (item?.group) {
                        onCreateGroupConversation(navigation, {
                          conversation: item,
                        });
                      } else {
                        get_conversation(
                          navigation,
                          dispatch,
                          item,
                          setLoading,
                        );
                      }
                    }}
                    key={item?.id}
                    comments={item?.last_message?.message}
                    time={item?.last_message?.created_at}
                    unread_message={item?.unread_messages}
                    group={item?.group > 0 ? true : false}
                    groupImg1={item?.group_logo[0]}
                    groupImg2={item?.group_logo[1]}
                  />
                );
              }}
              keyExtractor={(item, index) => index?.toString()}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <BlankField title={'No Conversation Found'} />
          )}
        </View>
      </View>
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default Inbox;
