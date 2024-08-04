import {Alert, FlatList, Image, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {useTheme} from 'react-native-paper';
import {
  AppHeader,
  AppLoader,
  BHistoryModal,
  BurnCard,
  BurnNumberCard,
  NeumorphDivider,
  PaymentRecord,
  SearchInput,
  ThemeCard,
  TopTab,
} from '../../../../../components';
import {
  checkConnected,
  commonStyles,
  networkText,
  scrWidth,
  spacing,
  themes_list,
} from '../../../../../shared/exporter';
import {Icon} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/core';
import {
  delete_number_Request,
  get_all_theme_Request,
  get_burn_numbers_Request,
  get_Tran_History,
  setAppTheme,
} from '../../../../../redux/actions';
import moment from 'moment';
const TransactionHistory = ({navigation}) => {
  const {colors} = useTheme();
  //comment
  const tab_list = [
    {id: 0, title: 'Themes'},
    {id: 1, title: 'Burn Numbers'},
    {id: 2, title: 'Money Transfer'},
  ];

  const menu_list = [
    {id: 0, title: 'View History'},
    {id: 1, title: 'Delete Permanently'},
  ];

  const [selectedTab, setSelectedTab] = useState({id: 0, title: 'Themes'});
  const [openBHistoryModal, setOpenBHistoryModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState('');

  const dispatch = useDispatch(null);
  const isFocus = useIsFocused();
  const {all_themes, burn_numbers} = useSelector(state => state?.appReducer);
  const {profile_info} = useSelector(state => state?.auth);
  const {app_theme} = useSelector(state => state.persistReducer);
  const [searchText, setSearchText] = useState('');
  const [themes, setThemes] = useState([]);
  const [filteredThemes, setFilteredThemes] = useState([]);
  const [transferHistory, setTransferHistory] = useState([]);
  const [filteredTransferHistory, setfilteredTransferHistory] = useState([]);

  useEffect(() => {
    if (isFocus) {
      get_themes();
    }
  }, [isFocus]);

  //Get all burn Numbers
  const get_burn_numbers = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      try {
        const onSuccess = async res => {
          console.log('Get Burn Success');
          setLoading(false);
        };
        const onFailure = async () => {
          console.log('Get Burn Failure');
          setLoading(false);
        };

        dispatch(get_burn_numbers_Request(onSuccess, onFailure));
      } catch (error) {
        console.log('Get Theme', error);
      }
    } else {
    }
  };

  //Get All Themes
  const get_themes = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      try {
        const onSuccess = async res => {
          console.log('Get Theme Success:  =>  ', res);
          setLoading(false);
          setThemes(res);
          setFilteredThemes(res);
        };
        const onFailure = async () => {
          console.log('Get Theme Failure');
          setLoading(false);
        };

        dispatch(get_all_theme_Request(onSuccess, onFailure));
      } catch (error) {
        console.log('Get Theme', error);
      }
    } else {
    }
  };

  //Label
  const Label = ({text}) => {
    return (
      <View
        style={[
          styles.labelCon,
          {
            backgroundColor: colors?.pur4,
          },
        ]}>
        <Icon
          color={colors.pur2}
          name={'info'}
          type={'feather'}
          size={18}
          style={spacing.mr2}
        />
        <Text style={[styles.labelText, {color: colors.g17}]}>{text}</Text>
      </View>
    );
  };

  //onPress Dots
  const onPressDots = (res, item) => {
    if (res.id == 0) {
      setCurrentItem(item);
      setOpenBHistoryModal(true);
    } else if (res?.id == 1) {
      deleteBurnContact(item);
    }
  };
  // Use Current Theme
  const useCurrentTheme = item => {
    dispatch(
      setAppTheme(item?.selected_theme, () => {
        console.log('Theme Selected');
      }),
    );
  };

  //Search Items
  const searchItem = search => {
    setSearchText(search);
    let searchData = [];
    if (selectedTab?.id === 2) {
      searchData = filteredTransferHistory?.filter(item => {
        return item?.method?.toUpperCase().includes(search.toUpperCase());
      });
      setTransferHistory(searchData);
    } else {
      searchData = filteredThemes?.filter(item => {
        return item?.title?.toUpperCase().includes(search.toUpperCase());
      });
      setThemes(searchData);
    }
  };

  // Delete Burn Contact
  const deleteBurnContact = async item => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const requestBody = {
        burn_number_id: item?.id,
      };
      const onSuccess = res => {
        setLoading(false);
        console.log('On Delete Burn Number Success');
      };
      const onFailure = res => {
        setLoading(false);
        console.log('On Delete Burn Number Failure');
      };
      dispatch(delete_number_Request(requestBody, onSuccess, onFailure));
    } else {
      Alert.alert('Error', networkText);
    }
  };

  const GetALLTranHistory = () => {
    const onSuccess = async res => {
      setTransferHistory(res?.data);
      setfilteredTransferHistory(res?.data);
      setLoading(false);
    };
    const onFailure = async () => {
      console.log('Failure');
      setLoading(false);
    };
    dispatch(get_Tran_History(onSuccess, onFailure));
  };

  const onPressTab = async item => {
    setSelectedTab(item);
    const check = await checkConnected();
    if (check) {
      if (item?.id == 0) {
        get_themes();
      } else if (item?.id == 1) {
        get_burn_numbers();
      } else {
        GetALLTranHistory();
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
        title={'Transaction History'}
        neumorph={false}
      />
      <TopTab
        tabList={tab_list}
        setSelectedTab={item => {
          onPressTab(item);
        }}
        selectedTab={selectedTab}
      />

      <View style={styles.contentContainer}>
        {selectedTab?.id == 0 && (
          <View style={[spacing.py4, commonStyles.flex1]}>
            <SearchInput
              onChangeText={text => {
                searchItem(text);
              }}
              inputWidth={scrWidth / 1.13}
              value={searchText}
            />
            <Label text={'You are using the default theme of TextNG'} />
            <View style={commonStyles.flex1}>
              <FlatList
                data={themes.filter(item => item?.status)}
                numColumns={3}
                renderItem={({item}) => {
                  return (
                    <View style={styles.itemConCard}>
                      <ThemeCard
                        onPress={() => {
                          useCurrentTheme(item);
                        }}
                        h1={item.price}
                        h2={item.title}
                        img={item.image_url}
                        h3={item.edition}
                        btnColor={
                          item?.selected_theme == app_theme
                            ? colors.pur4
                            : item?.btn_color
                        }
                        btnTextColor={
                          item?.selected_theme == app_theme
                            ? item?.btn_color
                            : colors?.white
                        }
                        btnText={
                          item?.selected_theme == app_theme
                            ? 'Applied'
                            : 'Use Now'
                        }
                        disabled={
                          item?.selected_theme == app_theme ? true : false
                        }
                      />
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        )}

        {selectedTab?.id == 1 && (
          <View style={[spacing.py4, commonStyles.flex1]}>
            <Label
              text={`${
                profile_info?.user?.country?.country_code || '1'
              } (${profile_info?.user?.textng_number?.slice(
                0,
                2,
              )}) ${profile_info?.user?.textng_number?.slice(
                2,
                profile_info?.user?.textng_number?.length,
              )} is your current number`}
            />
            <View style={[commonStyles.flex1, spacing.my2]}>
              <FlatList
                data={burn_numbers}
                renderItem={({item}) => {
                  return (
                    <View style={[styles.itemCon]}>
                      <BurnCard
                        onPress={res => {
                          onPressDots(res, item);
                        }}
                        menu_list={menu_list}
                        title={`(${item?.burn_number?.slice(
                          0,
                          2,
                        )}) ${item?.burn_number?.slice(
                          2,
                          item?.burn_number?.length,
                        )}`}
                        subtitle={`Bought Last ${moment(
                          item?.created_at,
                        ).format('MMM DD, YYYY')}`}
                      />
                    </View>
                  );
                }}
                ItemSeparatorComponent={() => {
                  return <NeumorphDivider />;
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        )}
        {selectedTab?.id == 2 && (
          <View style={[spacing.py4, commonStyles.flex1]}>
            <SearchInput
              onChangeText={text => {
                searchItem(text);
              }}
              value={searchText}
              inputWidth={scrWidth / 1.13}
            />
            <View style={commonStyles.flex1}>
              <FlatList
                data={transferHistory}
                renderItem={({item}) => {
                  return (
                    <View>
                      <PaymentRecord
                        h1={item?.payment_on_type || 'Burn Number'}
                        h2={moment(item?.created_at).format('DD. MM, YYYY')}
                        h3={`$${item?.amount}`}
                        h4={item?.source_type}
                      />
                    </View>
                  );
                }}
                ItemSeparatorComponent={() => {
                  return <NeumorphDivider />;
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        )}
      </View>
      {openBHistoryModal && (
        <BHistoryModal
          show={openBHistoryModal}
          onPressHide={() => {
            setOpenBHistoryModal(false);
          }}
          data={currentItem}
        />
      )}
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default TransactionHistory;
