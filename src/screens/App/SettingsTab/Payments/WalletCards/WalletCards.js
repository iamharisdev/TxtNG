import {Alert, FlatList, SafeAreaView, Image, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {useTheme} from 'react-native-paper';
import {
  AppButton,
  AppHeader,
  AppHeading,
  AppLoader,
  NeumorphBox,
  NeumorphDivider,
  PayCard,
  PaymentDetailModal,
} from '../../../../../components';
import {
  appIcons,
  checkConnected,
  commonStyles,
  networkText,
  spacing,
} from '../../../../../shared/exporter';
import {useDispatch, useSelector} from 'react-redux';
import {
  add_wallet_amount_request,
  get_payment_cards_request,
} from '../../../../../redux/actions';
import {useIsFocused} from '@react-navigation/core';
const WalletCards = ({navigation, route}) => {
  const {colors} = useTheme();
  const {amount} = route?.params;
  //States
  const [loading, setLoading] = useState(false);
  const [currentCard, setcurrentCard] = useState(null);
  const [checkedItem, setCheckedItem] = useState({
    id: 0,
    icon: appIcons.card,
    title: 'Credit Card',
    subtitle: '**** **** **** 3456 Visa',
  });
  const [show, setShow] = useState(false);
  const {payment_card_list} = useSelector(state => state?.settings);
  const dispatch = useDispatch(null);
  const isFocus = useIsFocused(null);

  useEffect(() => {
    getCards();
  }, [isFocus]);

  //Get Cards
  const getCards = async () => {
    const isConnected = await checkConnected();
    if (isConnected) {
      setLoading(true);
      const onSuccess = res => {
        setLoading(false);
        console.log('On Get Card Success');
        setLoading(false);
      };
      const onFailure = res => {
        setLoading(false);
        Alert.alert('Error', res);
        console.log('On Get Card Failure', res);
        setLoading(false);
      };
      dispatch(get_payment_cards_request(onSuccess, onFailure));
    } else {
      Alert.alert('Error', networkText);
    }
  };

  const onSelectPayment = async () => {
    onTopUpWallet();
  };

  //on Top Up Wallet
  const onTopUpWallet = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const requestBody = {
        amount: amount || 0,
        card_id: currentCard?.id,
      };
      const onSuccess = res => {
        setLoading(false);
        navigation?.navigate('TransactionDetail', {
          type: 'Top-Up',
          item: res,
          current_card: currentCard,
        });
      };
      const onFailure = res => {
        setLoading(false);
        Alert.alert('Error', res || 'Something went wrong!');
      };
      dispatch(add_wallet_amount_request(requestBody, onSuccess, onFailure));
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
      <View style={styles.contentContainer}>
        <View>
          <View style={styles.header}>
            <Text style={[styles.ht1, {color: colors.b14}]}>
              Top up amount ($)
            </Text>
            <Text style={[styles.ht2, {color: colors.pur2}]}>${amount}</Text>
            <Text
              onPress={() => {
                navigation?.goBack();
              }}
              style={[styles.ht1, {color: colors.pur2}]}>
              Change
            </Text>
          </View>

          <AppHeading title={'Credit/Debit Card'} />
          <View style={[spacing.mb2, commonStyles.aiRow]}>
            <Image style={styles.iconStyle} source={appIcons.card} />
            <Text
              onPress={() => {
                navigation?.navigate('AddCard');
              }}
              style={[styles.ht3, {color: colors.pur2}]}>
              Add a card
            </Text>
          </View>
          <NeumorphDivider />
          <AppHeading title={'Card Details'} />
          <View style={{height: '50%'}}>
            <FlatList
              data={payment_card_list}
              renderItem={({item}) => {
                return (
                  <PayCard
                    setChecked={() => {
                      setCheckedItem(item);
                      setcurrentCard(item);
                    }}
                    onPress={() => {
                      setcurrentCard(item);
                      setShow(true);
                    }}
                    checked={item?.id == checkedItem?.id ? true : false}
                    icon={appIcons.card}
                    title={item?.card_holder_name || 'name'}
                    subtitle={`${item?.cvc}`}
                  />
                );
              }}
            />
          </View>
        </View>
        <AppButton
          onPress={() => {
            onSelectPayment();
          }}
          title={'Confirm'}
          textColor={colors.white}
        />
      </View>
      <PaymentDetailModal
        onPressEdit={() => {
          setShow(false);
          navigation?.navigate('EditCard', {card_detail: currentCard});
        }}
        show={show}
        onPressHide={() => {
          setShow(false);
        }}
        title={'Card Details'}
        list={[
          {title: 'Name', subtitle: currentCard?.card_holder_name || ''},
          {title: 'Country', subtitle: currentCard?.country || ''},
          {
            title: 'Card Number',
            subtitle: `${currentCard?.expiry_month || '0'}/${
              currentCard?.expiry || '0'
            }`,
          },
          {title: 'Brand', subtitle: currentCard?.brand_name || ''},
          {title: 'Expiry Date', subtitle: currentCard?.card_holder_name},
          {title: 'CVC', subtitle: currentCard?.cvc || '123'},
        ]}
        icon={appIcons.card}
      />
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default WalletCards;
