import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {useTheme} from 'react-native-paper';
import {
  AppHeader,
  AppHeading,
  AppInput,
  AppLoader,
  ErrorModal,
  NeumorphDivider,
  SimpleButton,
  WalletCard,
  WalletScreenCard,
} from '../../../../../components';
import {
  appIcons,
  appImages,
  checkConnected,
  commonStyles,
  networkText,
  scrWidth,
  spacing,
} from '../../../../../shared/exporter';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  get_contacts,
  payment_method_request,
} from '../../../../../redux/actions';
import {getAccountBalanceApi} from '../../../../../shared/service/SettingService';
import {useIsFocused} from '@react-navigation/core';

const Wallet = ({navigation}) => {
  const {colors} = useTheme();
  const [selectedItem, setselectedItem] = useState('Top-Up');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [friednList, setFriednList] = useState([]);
  const [selectedFrined, setselectedFrined] = useState('');
  const [showFriends, setshowFriends] = useState(false);
  const [loading, setLoading] = useState(false);
  const [balanceDetail, setBalanceDetail] = useState(0);
  const {connected_account} = useSelector(state => state?.settings);
  const dispatch = useDispatch(null);
  const isFocus = useIsFocused(null);
  //Set List
  useEffect(() => {
    if (isFocus) {
      get_all_contacts();
      getAccountBalance();
    }
  }, [isFocus]);

  //Get all Contacts
  const get_all_contacts = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const onSuccess = res => {
        setFriednList(res);
        setFilteredFriends(res);
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

  // On Press Friends
  const onPressFriend = (item, index) => {
    setselectedFrined(item);
    setshowFriends(false);
  };

  //Friend
  const FriendsCard = ({title, number, onPress, selected}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.btnCon,
          {backgroundColor: selected ? colors.pur2 : colors.g37},
        ]}>
        <View style={[commonStyles.aiRow, spacing.mx2]}>
          <Image style={styles.iconStyle} source={appImages.splashBg} />
          <Text
            style={[
              styles.textStyle,
              {
                color: selected ? colors.white : colors.g3,
              },
            ]}>
            {title}
          </Text>
        </View>
        <Text
          style={[
            styles.subtitleStyle,
            {
              color: selected ? colors.white : colors.g3,
            },
          ]}>
          {number}
        </Text>
      </TouchableOpacity>
    );
  };

  //Search Items
  const searchItem = async search => {
    setSearchText(search);
    let searchData = filteredFriends?.filter(item => {
      return item?.name?.toUpperCase().includes(search.toUpperCase());
    });
    setFriednList(searchData);
  };

  //onPress Cards
  const onPressCardAccount = async () => {
    setSelectedMethod('Credit/Debit Card');
    if (selectedItem == 'Transfer' && selectedFrined == '') {
      Alert.alert('Error', 'Please select someone to transfer money!');
    } else {
      if (connected_account?.account?.details_submitted) {
        dispatch(
          payment_method_request('card', () => {
            navigation?.navigate('AddWalletAmount', {
              type: selectedItem,
              selectedFriend: selectedFrined,
              balanceDetail: balanceDetail,
            });
          }),
        );
      } else {
        Alert.alert('Error', 'Please create connect account first!');
      }
    }
  };

  //Get Account Balance
  const getAccountBalance = async () => {
    const check = await checkConnected();
    if (check) {
      try {
        setLoading(true);
        const res = await getAccountBalanceApi();
        if (res) {
          setBalanceDetail(res);
          setLoading(false);
        }
      } catch (error) {
        console.log('Error', error);
        setLoading(false);
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
      <AppHeader
        barColor={colors.app_color}
        backIcon={true}
        title={'Wallet'}
        neumorph={false}
      />
      <KeyboardAwareScrollView>
        <View style={styles.contentContainer}>
          <View style={spacing.py4}>
            <WalletCard item={balanceDetail} />
          </View>
          <View>
            <View style={commonStyles.aiRow}>
              <WalletScreenCard
                onPress={() => {
                  setselectedItem('Withdraw');
                }}
                icon={appIcons.withdraw}
                title={'Withdraw'}
                selectedItem={selectedItem}
              />
              <WalletScreenCard
                onPress={() => {
                  setselectedItem('Top-Up');
                }}
                icon={appIcons.topUp}
                title={'Top-Up'}
                selectedItem={selectedItem}
              />
              <WalletScreenCard
                onPress={() => {
                  setselectedItem('Transfer');
                }}
                icon={appIcons.transfer}
                title={'Transfer'}
                selectedItem={selectedItem}
              />
            </View>
            <View style={spacing.mt4}>
              <NeumorphDivider />
            </View>
            {selectedItem == 'Withdraw' && (
              <>
                <AppHeading title={'Choose Withdraw Method'} />
              </>
            )}

            {selectedItem == 'Top-Up' && (
              <>
                <AppHeading title={'Choose Top Up Method'} />
              </>
            )}
            {selectedItem == 'Transfer' && (
              <>
                <AppInput
                  onChangeText={text => {
                    setshowFriends(true);
                    searchItem(text);
                  }}
                  placeholder={selectedFrined?.name || 'Search'}
                  width={scrWidth / 1.13}
                  value={searchText}
                />
                <AppHeading title={'Choose Transfer Money Method'} />

                {showFriends && (
                  <View style={[styles.listCon, {backgroundColor: colors.g37}]}>
                    <FlatList
                      data={friednList}
                      nestedScrollEnabled={true}
                      renderItem={({item, index}) => {
                        return (
                          <FriendsCard
                            title={item?.name}
                            number={`${
                              item?.companion?.country?.country_code || '1'
                            } (${item?.textng_number?.slice(
                              0,
                              2,
                            )}) ${item?.textng_number?.slice(
                              2,
                              item?.textng_number?.length,
                            )}`}
                            onPress={() => {
                              onPressFriend(item, index);
                              setSearchText(item?.name);
                            }}
                            selected={selectedFrined == item}
                          />
                        );
                      }}
                    />
                  </View>
                )}
              </>
            )}
            <View>
              <SimpleButton
                selectedItem={selectedMethod}
                onPress={() => {
                  onPressCardAccount();
                }}
                title={'Credit/Debit Card'}
                justifyContent={'center'}
              />
            </View>
          </View>
        </View>
        <AppLoader loading={loading} />
      </KeyboardAwareScrollView>
      <ErrorModal
        show={false}
        title={'Insufficient Funds.'}
        onPressHide={() => {}}
      />
    </SafeAreaView>
  );
};

export default Wallet;
