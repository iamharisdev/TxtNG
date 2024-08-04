import {Alert, FlatList, SafeAreaView, Image, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {useTheme} from 'react-native-paper';
import {
  AppButton,
  AppHeader,
  AppHeading,
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
  get_payment_bank_request,
  get_payment_cards_request,
} from '../../../../../redux/actions';
import {useIsFocused} from '@react-navigation/core';
const WalletAccounts = ({navigation, route}) => {
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
  const {bank_list} = useSelector(state => state?.settings);
  const dispatch = useDispatch(null);
  const isFocus = useIsFocused(null);

  useEffect(() => {
    getBanks();
  }, [isFocus]);

  //Get Banks
  const getBanks = async () => {
    const isConnected = await checkConnected();
    if (isConnected) {
      setLoading(true);
      const onSuccess = res => {
        setLoading(false);
        console.log('On Get Card Success');
      };
      const onFailure = res => {
        Alert.alert('Error', res);
        console.log('On Get Card Failure', res);
        setLoading(false);
      };
      dispatch(get_payment_bank_request(onSuccess, onFailure));
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

          <View style={[spacing.mb2, commonStyles.aiRow]}>
            <Image style={styles.iconStyle} source={appIcons.bank} />
            <Text
              onPress={() => {
                navigation?.navigate('AddBankAccount');
              }}
              style={[styles.ht3, {color: colors.pur2}]}>
              Add Bank Account
            </Text>
          </View>
          <NeumorphDivider />
          <AppHeading title={'Bank Details'} />
          <View style={{height: '50%'}}>
            <FlatList
              data={bank_list}
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
                    icon={appIcons.bank}
                    title={item?.account_holder_name || 'name'}
                    subtitle={`${item?.account_number}`}
                  />
                );
              }}
            />
          </View>
        </View>
        <AppButton
          onPress={() => {
            navigation?.navigate('TransactionDetail');
          }}
          title={'Confirm'}
          textColor={colors.white}
        />
      </View>
      <PaymentDetailModal
        onPressEdit={() => {
          setShow(false);
          navigation?.navigate('EditBankAccount', {bank_detail: currentCard});
        }}
        show={show}
        onPressHide={() => {
          setShow(false);
        }}
        title={'Bank Details'}
        list={[
          {title: 'Name', subtitle: currentCard?.account_holder_name || ''},
          {title: 'Country', subtitle: currentCard?.country || ''},
          {
            title: 'Bank Name',
            subtitle: currentCard?.bank_name || '',
          },
          {
            title: 'Account Number',
            subtitle: currentCard?.account_number || '',
          },
          {
            title: 'Routing Number',
            subtitle: currentCard?.routing_number,
          },
        ]}
        icon={appIcons.bank}
      />
    </SafeAreaView>
  );
};

export default WalletAccounts;
