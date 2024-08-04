import {
  Alert,
  FlatList,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {
  AuthHeader,
  ProfileButton,
  SimpleButton,
  StatusModal,
  UserProfileImageBox,
} from '../../../../components';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  appIcons,
  capitalizeFirstLetter,
  checkConnected,
  commonStyles,
  networkText,
  profile_uri,
  WP,
} from '../../../../shared/exporter';
import {LoginManager} from 'react-native-fbsdk-next';
import {
  check_connected_account,
  getUserProfile,
  logoutRequset,
  updateStatusRequest,
} from '../../../../redux/actions';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useIsFocused} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {createConnectedURL} from '../../../../shared/service/SettingService';

const Settings = ({navigation}) => {
  const {profile_info, userInfo} = useSelector(state => state?.auth);
  const {updateStatus, connected_account} = useSelector(
    state => state?.settings,
  );

  const dispatch = useDispatch(null);

  const {colors} = useTheme();
  const isFocus = useIsFocused(null);
  const [showStatusModal, setshowStatusModal] = useState(false);
  const [openEmojiModal, setopenEmojiModal] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [loading, setloading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const profileList = [
    {
      id: 1,
      title: 'Account Details',
      icon: appIcons.user1,
      iconStyle: [styles.profileStyle, {tintColor: colors.pur2}],
      onPress: () => {
        navigation?.navigate('EditProfile');
      },
    },
    {
      id: 2,
      title: 'Change Language & Country',
      icon: appIcons.gmessage,
      iconStyle: [styles.messageStyle, {tintColor: colors.pur2}],
      onPress: () => {
        navigation?.navigate('ChangeCountry');
      },
    },
    {
      id: 3,
      title: 'Change Password',
      icon: appIcons.lock,
      iconStyle: [styles.messageStyle, {tintColor: colors.pur2}],
      onPress: () => {
        navigation?.navigate('Auth', {
          screen: 'ForgotPassword',
          params: {
            title: 'Change Password',
          },
        });
      },
    },
    {
      id: 4,
      title: 'Wallet',
      icon: appIcons.wallet1,
      iconStyle: [styles.messageStyle, {tintColor: colors.pur2}],
      onPress: () => {
        navigation?.navigate('Wallet');
      },
    },
    {
      id: 5,
      title: 'Refer Friends & Family',
      icon: appIcons.share1,
      iconStyle: [styles.icon21, {tintColor: colors.pur2}],
      onPress: () => {
        navigation?.navigate('AffiliateLink');
      },
    },
    {
      id: 6,
      title: 'Transaction History',
      icon: appIcons.history,
      iconStyle: [styles.icon19, {tintColor: colors.pur2}],
      onPress: () => {
        navigation?.navigate('TransactionHistory');
      },
    },

    {
      id: 7,
      title: 'Payment Method',
      icon: appIcons.cards,
      iconStyle: [styles.icon19, {tintColor: colors.pur2}],
      onPress: () => {
        navigation?.navigate('PaymentMethods');
      },
    },

    {
      id: 8,
      title: 'TextNG Store',
      icon: appIcons.store,
      iconStyle: [styles.icon21, {tintColor: colors.pur2}],
      onPress: () => {
        navigation?.navigate('Store');
      },
    },
    {
      id: 9,
      title: 'Support',
      icon: appIcons.userGroup1,
      iconStyle: [styles.icon20, {tintColor: colors.pur2}],
      onPress: () => {
        navigation?.navigate('Support');
      },
    },
    {
      id: 10,
      title: 'Privacy Settings',
      icon: appIcons.privacy,
      iconStyle: [styles.icon19, {tintColor: colors.pur2}],
      onPress: () => {
        navigation?.navigate('Privacy');
      },
    },
    {
      id: 11,
      title: 'FAQs',
      icon: appIcons.paper,
      iconStyle: [styles.icon20, {tintColor: colors.pur2}],
      onPress: () => {
        navigation?.navigate('Faqs');
      },
    },
    {
      id: 12,
      title: 'Terms & Condition',
      icon: appIcons.paper,
      iconStyle: [styles.icon20, {tintColor: colors.pur2}],
      onPress: () => {
        navigation?.navigate('TermsCondition', {isRegister: true});
      },
    },

    {
      id: 13,
      title: 'Logout',
      icon: appIcons.logout,
      iconStyle: [styles.icon19, {tintColor: colors.pur2}],
      onPress: () => {
        dispatch(
          logoutRequset(null, () => {
            navigation?.replace('Auth');
            LoginManager.logOut();
            GoogleSignin.signOut();
            AsyncStorage.removeItem('usertoken');
          }),
        );
      },
    },
  ];
  useEffect(() => {
    if (isFocus) {
      initLinks();
      dispatch(
        getUserProfile(
          res => {
            console.log('get profile Success');
          },
          res => {
            // console.log('get Profile error', res);
          },
        ),
      );
    }
  }, [isFocus]);

  //Update Status
  const onUpdateStatus = async () => {
    const check = await checkConnected();
    if (check) {
      if (statusText != '') {
        setloading(true);
        const body = {
          status: statusText,
        };
        const updateStatusSuccess = async res => {
          setopenEmojiModal(false);
          setshowStatusModal(false);
          setStatusText('');
          setloading(false);
        };
        const updateStatusFailure = async res => {
          setloading(false);
          Alert.alert('Error', res);
        };

        dispatch(
          updateStatusRequest(body, updateStatusSuccess, updateStatusFailure),
        );
      } else {
        Alert.alert('Error', 'Type something please!');
      }
    } else {
      Alert.alert('Error', networkText);
    }
  };

  const openModal = async () => {
    const check = await checkConnected();
    if (check) {
      try {
        setModalLoading(true);
        dispatch(
          getUserProfile(
            res => {
              setshowStatusModal(true);
              setStatusText(res?.user?.profile_status);
              setModalLoading(false);
              // console.log('get profile', res);
            },
            res => {
              setModalLoading(false);
              // console.log('get Profile error', res);
            },
          ),
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Error', networkText);
    }
  };

  //Unmount Data
  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  //init links
  const initLinks = () => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (link?.url === 'https://textng.page.link/qL6j') {
        }
      });
  };

  //Create Account
  const create_Connected_Account = async () => {
    const check = await checkConnected();
    if (check) {
      try {
        setloading(true);
        const res = await createConnectedURL();
        if (res.data) {
          setloading(false);
          Linking.openURL(res?.data?.link);
        }
      } catch (error) {
        setloading(false);
        console.log(error);
      }
    } else {
      Alert.alert('Error', networkText);
    }
  };

  // Handle Dynamic Link
  const handleDynamicLink = link => {
    try {
      // Handle dynamic link inside your own application
      if (link?.url === 'https://textng.page.link/qL6j') {
        console.log('Dynamic link', link?.url);
        dispatch(
          check_connected_account('', res => {
            console.log('Check Account', res);
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AuthHeader
        backIcon={true}
        barColor={colors.app_color}
        onPressBack={() => {
          navigation?.goBack();
        }}
        paddingVertical={WP('2')}
      />
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.app_color,
          },
        ]}>
        <View style={styles.contentContainer}>
          <View style={styles.imgCon}>
            <UserProfileImageBox
              country={profile_info?.user?.country}
              img={profile_info?.profile_image || profile_uri}
            />
            <Text style={[styles.textStyle, {color: colors.b1}]}>
              {capitalizeFirstLetter(profile_info?.user?.name || 'Username')}
            </Text>
            <TouchableOpacity
              onPress={() => {
                openModal();
              }}
              style={[
                styles.statusBtnCon,
                {
                  backgroundColor: colors.g26,
                },
              ]}>
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      updateStatus?.user?.profile_status ||
                      profile_info?.user?.profile_status
                        ? colors.pur2
                        : colors.g25,
                  },
                ]}>
                {updateStatus?.user?.profile_status ||
                  profile_info?.user?.profile_status ||
                  'Update Status'}
              </Text>
              {modalLoading ? (
                <ActivityIndicator color={colors.pur2} />
              ) : (
                <Image source={appIcons.edit} style={styles.profileStyle} />
              )}
            </TouchableOpacity>
          </View>
          {!connected_account?.account?.details_submitted &&
            !connected_account?.disabled_reason && (
              <SimpleButton
                loading={loading}
                disabled={loading}
                onPress={create_Connected_Account}
                bgColor={colors.r3}
                textColor={colors.white}
                alignItems={'center'}
                justifyContent={'center'}
                title={'Create Connected Account'}
              />
            )}
          <View style={commonStyles.flex1}>
            <FlatList
              data={
                userInfo?.type == 'social'
                  ? profileList.slice(0, 2).concat(profileList.slice(3, 13))
                  : profileList
              }
              renderItem={({item}) => {
                return (
                  <View>
                    <ProfileButton
                      onPress={item?.onPress}
                      title={item.title}
                      icon={item.icon}
                      iconStyle={item.iconStyle}
                    />
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
      <StatusModal
        loading={loading}
        show={showStatusModal}
        onPressHide={() => {
          setshowStatusModal(false);
          setopenEmojiModal(false);
        }}
        title={'Set Status'}
        openEmojiModal={openEmojiModal}
        setopenEmojiModal={() => {
          setopenEmojiModal(!openEmojiModal);
        }}
        statusText={statusText}
        onChangeText={text => {
          setStatusText(text);
        }}
        onPressEmoji={item => {
          let text = statusText?.concat(item);
          setStatusText(text);
        }}
        onPressUpdate={() => {
          onUpdateStatus();
        }}
      />
    </>
  );
};

export default Settings;
