import {
  SafeAreaView,
  View,
  FlatList,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import {
  AppButton,
  AppHeader,
  AppHeading,
  AppLoader,
  DelPaymentCard,
  PayMethodCards,
} from '../../../../../components';
import {
  appIcons,
  card_list,
  checkConnected,
  commonStyles,
  networkText,
} from '../../../../../shared/exporter';
import {useDispatch, useSelector} from 'react-redux';
import {
  delete_bank_request,
  delete_card_request,
  get_default_bank_request,
  get_default_card_request,
  pay_with_social_request,
  set_checkout_data,
} from '../../../../../redux/actions';
import {useIsFocused} from '@react-navigation/core';
import {
  createGooglePayPaymentMethod,
  initGooglePay,
  presentApplePay,
  useApplePay,
  useGooglePay,
} from '@stripe/stripe-react-native';

const PaymentMethods = ({navigation, route}) => {
  const {colors} = useTheme();
  const {checkout_detail} = useSelector(state => state?.appReducer);
  const {userInfo} = useSelector(state => state?.auth);
  const {connected_account} = useSelector(state => state?.settings);
  //Stripe Initialization
  const {isApplePaySupported} = useApplePay();
  const {initGooglePay} = useGooglePay();
  const [googlePayError, setgooglePayError] = useState('');

  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  //States
  const [loading, setLoading] = useState(false);
  const [currentCard, setcurrentCard] = useState(null);
  const [currentBank, setcurrentBank] = useState(null);

  const [checkedItem, setCheckedItem] = useState({
    id: 0,
    icon: appIcons.card,
    title: 'Credit Card',
    subtitle: '**** **** **** 3456 Visa',
  });
  const [show, setShow] = useState(false);
  const [showBank, setShowBank] = useState(false);

  //Get Data
  useEffect(() => {
    if (isFocus) {
      getDefaultCard();
      getDefaultAccountNumber();
      //Init google Pay
      if (Platform.OS == 'android') {
        initializeGooglePay();
      }
    }
  }, [isFocus]);

  //Init handler
  const initializeGooglePay = async () => {
    const {error} = await initGooglePay({
      testEnv: true,
      merchantName: '70000-APITEST-AP',
      countryCode: 'US',
      existingPaymentMethodRequired: true,
    });

    if (error) {
      console.log(error);
      setgooglePayError(error.message);
      return;
    }
  };

  //Proceed With Apple Pay
  const applePay = async () => {
    const checkInternet = await checkConnected();
    if (checkInternet) {
      setLoading(true);
      if (!isApplePaySupported) return;
      const {error, paymentMethod} = await presentApplePay({
        cartItems: [
          {
            label: 'hell',
            amount: '10',
          },
        ],
        country: 'US',
        currency: 'USD',
        requiredBillingContactFields: ['phoneNumber', 'name'],
      });
      if (error) {
        setLoading(false);
        // handle error
      } else {
        if (paymentMethod) {
          console.log(paymentMethod);
          const onSuccessApplePay = async res => {
            // console.log('Apple Pay Success', res);
            const {error} = await confirmApplePayPayment(
              res?.Apple?.client_secret,
            );
            if (error) {
              Alert.alert('Error', 'Unable to proceed payment');
              setLoading(false);
            } else {
              setShowSuccess(true);
              setLoading(false);
            }
          };
          const onFailedApplePay = res => {
            console.log(res);
            console.log('Apple Pay Failed');
            setLoading(false);
          };

          // //Apple Pay Request Sending
          // const requestBody = {};

          // dispatch(
          //   pay_with_social_request(
          //     'apple',
          //     requestBody,
          //     onSuccessApplePay,
          //     onFailedApplePay,
          //   ),
          // );
        }
      }
    } else {
      Alert.alert('Error', networkText);
    }
  };

  //Proceed With Google Pay
  const googlePay = async () => {
    console.log('Google Pay');
    const {error, paymentMethod} = await createGooglePayPaymentMethod({
      amount: 10,
      currencyCode: 'USD',
    });

    if (error) {
      Alert.alert(error.code, error.message);
      return;
    } else if (paymentMethod) {
      const onSuccessGooglePay = async res => {
        // console.log('Google Pay Success', res);
        setShowSuccess(true);
        setLoading(false);
      };
      const onFailedGooglePay = res => {
        console.log(res);
        console.log('Google Pay Failed');
        setLoading(false);
      };

      //Apple Pay Request Sending
      // const requestBody = {
      //   event_id: event_detail?.id,
      //   team_id: join_team_event?.name != 'None' ? join_team_event?.id : null,
      // };

      // dispatch(
      //   pay_with_social_request(
      //     'google',
      //     requestBody,
      //     onSuccessGooglePay,
      //     onFailedGooglePay,
      //   ),
      // );
    }
  };

  const selectCheckoutMethod = () => {
    if (checkedItem.id == 0) {
      if (currentCard) {
        const requestBody = {
          pay_with_card: true,
          card_detail: currentCard,
        };
        dispatch(
          set_checkout_data(requestBody, () => {
            navigation?.navigate('Checkout');
          }),
        );
      } else {
        navigation?.navigate('PaymentCardList');
      }
    } else if (checkedItem?.id == 1) {
      if (currentBank) {
        const requestBody = {
          pay_with_account: true,
          bank_detail: currentBank,
        };
        dispatch(
          set_checkout_data(requestBody, () => {
            navigation?.navigate('Checkout');
          }),
        );
      } else {
        if (connected_account?.account?.details_submitted) {
          navigation?.navigate('PaymentBankList');
        } else {
          Alert.alert('Error', 'Please create connect account first!');
        }
      }
    } else {
      const requestBody = {
        pay_with_wallet: true,
      };
      dispatch(
        set_checkout_data(requestBody, () => {
          navigation?.navigate('Checkout');
        }),
      );
    }
  };

  //Get Default Card
  const getDefaultAccountNumber = async () => {
    const check = await checkConnected();
    if (check) {
      try {
        // setLoading(true);
        const onSuccess = res => {
          setLoading(false);
          setcurrentBank(res);
          console.log('On Default Bank Success');
        };
        const onFailure = res => {
          setLoading(false);
          Alert.alert('Error', res);
          console.log('On Default Bank Failure', res);
        };
        dispatch(get_default_bank_request(onSuccess, onFailure));
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setLoading(false);
      Alert.alert('Error', networkText);
    }
  };

  //Get Default Account Number
  const getDefaultCard = async () => {
    const check = await checkConnected();
    if (check) {
      try {
        // setLoading(true);
        const onSuccess = res => {
          setLoading(false);
          setcurrentCard(res);
          console.log('On Default Card Success');
        };
        const onFailure = res => {
          setLoading(false);
          Alert.alert('Error', res);
          console.log('On Default Card Failure', res);
        };
        dispatch(get_default_card_request(onSuccess, onFailure));
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setLoading(false);
      Alert.alert('Error', networkText);
    }
  };

  //onPress Del
  const onPressDelete = async () => {
    const isConnected = await checkConnected();
    if (isConnected) {
      setLoading(true);
      const onSuccess = res => {
        setShow(false);
        setLoading(false);
        getDefaultCard();
        console.log('On DEL Card Success');
      };
      const onFailure = res => {
        setShow(false);
        setLoading(false);
        Alert.alert('Error', res || 'Unable to Delete Card');
        console.log('On DEL Card Failure', res);
      };
      const requestBody = {
        card_id: currentCard?.id,
      };
      dispatch(delete_card_request(requestBody, onSuccess, onFailure));
    } else {
      setLoading(false);
      Alert.alert('Error', networkText);
    }
  };

  //onPress Delete Bank
  const onPressDeleteBank = async () => {
    const isConnected = await checkConnected();
    if (isConnected) {
      setLoading(true);
      const onSuccess = res => {
        setShowBank(false);
        setLoading(false);
        getDefaultAccountNumber();
        console.log('On DEL Bank Success');
      };
      const onFailure = res => {
        setShowBank(false);
        setLoading(false);
        Alert.alert('Error', res || 'Unable to Delete Bank');
        console.log('On DEL Bank Failure', res);
      };
      const requestBody = {
        bank_id: currentBank?.id,
      };
      dispatch(delete_bank_request(requestBody, onSuccess, onFailure));
    } else {
      setLoading(false);
      Alert.alert('Error', networkText);
    }
  };

  //Select Payment Method
  const selectPaymentMethod = () => {
    if (checkedItem?.title == 'Credit Card') {
      navigation?.navigate('PaymentCardList');
    } else if (checkedItem?.title == 'TextNG Wallet') {
      navigation?.navigate('Wallet');
    } else if (checkedItem?.title == 'Apple Pay') {
      alert('coming soon');
      // applePay();
    } else if (checkedItem?.title == 'Google Pay') {
      alert('coming soon');
      // googlePay();
    } else if (checkedItem?.title == 'Bank Account') {
      if (connected_account?.account?.details_submitted) {
        navigation?.navigate('PaymentBankList');
      } else {
        Alert.alert('Error', 'Please create connect account first!');
      }
    }
  };

  //Check Platform
  const checkPlatform = index => {
    if (index == 4 && Platform.OS != 'android') {
      return 'none';
    } else if (index == 3 && Platform.OS != 'ios') {
      return 'none';
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
        title={'Payment Method'}
        neumorph={false}
      />
      <View style={styles.contentContainer}>
        <AppHeading title={'Select Default Method'} />
        <View style={commonStyles.flex1}>
          <FlatList
            data={card_list}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    display: checkPlatform(index),
                  }}>
                  <PayMethodCards
                    onPressCardEdit={() => {
                      if (index == 0) {
                        if (currentCard) {
                          navigation?.navigate('EditCard', {
                            card_detail: currentCard,
                          });
                        }
                      } else if (index == 1) {
                        if (currentBank) {
                          navigation?.navigate('EditBankAccount', {
                            bank_detail: currentBank,
                          });
                        }
                      } else {
                        Alert.alert('Errro', 'No Card Selected');
                      }
                    }}
                    onPressDel={() => {
                      if (index == 0) {
                        if (currentCard) {
                          setShow(true);
                        }
                      } else if (index == 1) {
                        if (currentBank) {
                          setShowBank(true);
                        }
                      } else {
                        Alert.alert('Error', 'No Account Selected');
                      }
                    }}
                    swipeable={index == 0 || (index == 1 && true)}
                    setChecked={() => {
                      setCheckedItem(item);
                    }}
                    checked={item?.id == checkedItem?.id ? true : false}
                    icon={item?.icon}
                    subtitle={
                      index == 0
                        ? currentCard?.cvc
                          ? `**** **** **** ${currentCard?.cvc} Visa`
                          : 'No card selected'
                        : index == 1
                        ? currentBank?.account_number
                          ? `${currentBank?.account_number}`
                          : 'No account selected'
                        : item?.subtitle || userInfo?.user?.email
                    }
                    title={item?.title}
                  />
                </View>
              );
            }}
          />
        </View>

        <AppButton
          onPress={() => {
            if (route?.params?.screenName) {
              selectCheckoutMethod();
            } else {
              selectPaymentMethod();
            }
          }}
          textColor={'white'}
          title={
            route?.params?.screenName
              ? `Pay $${checkout_detail?.price}`
              : 'Submit'
          }
        />
        {show && (
          <DelPaymentCard
            expiry_date={`${currentCard?.expiry_month}/${currentCard?.expiry}`}
            cvc={`Ending in ${currentCard?.cvc}`}
            brand={currentCard?.brand_name}
            show={show}
            onPressHide={() => {
              setShow(false);
            }}
            onPress={() => {
              onPressDelete();
            }}
          />
        )}

        {showBank && (
          <DelPaymentCard
            title={'Remove Account'}
            subtitle={'Are you sure you want to remove account?'}
            expiry_date={`Routing Number : ${currentBank?.routing_number}`}
            cvc={`A/C number : ${currentBank?.account_number}`}
            bankName={`Bank Name : ${currentBank?.bank_name}`}
            show={showBank}
            onPressHide={() => {
              setShowBank(false);
            }}
            onPress={() => {
              onPressDeleteBank();
            }}
          />
        )}
        <AppLoader loading={loading} />
      </View>
    </SafeAreaView>
  );
};

export default PaymentMethods;
