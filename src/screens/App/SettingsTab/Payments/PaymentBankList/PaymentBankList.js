import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {useTheme} from 'react-native-paper';
import {
  AppButton,
  AppHeader,
  AppLoader,
  ATMCard,
  BlankField,
  DelPaymentCard,
} from '../../../../../components';
import {
  checkConnected,
  commonStyles,
  networkText,
} from '../../../../../shared/exporter';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/core';
import {
  default_bank_request,
  delete_bank_request,
  delete_card_request,
  get_payment_bank_request,
} from '../../../../../redux/actions';
const PaymentBankList = ({navigation}) => {
  const [show, setShow] = useState(false);
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const {bank_list} = useSelector(state => state?.settings);
  const [currentCard, setcurrentCard] = useState(null);
  const dispatch = useDispatch(null);
  const isFocus = useIsFocused(null);

  useEffect(() => {
    getBanks();
  }, [isFocus]);

  //Get Cards
  const getBanks = async () => {
    const isConnected = await checkConnected();
    if (isConnected) {
      setLoading(true);
      const onSuccess = res => {
        setLoading(false);
        console.log('On Get Bank Success');
        setLoading(false);
      };
      const onFailure = res => {
        setLoading(false);
        Alert.alert('Error', res);
        console.log('On Get Bank Failure', res);
        setLoading(false);
      };
      dispatch(get_payment_bank_request(onSuccess, onFailure));
    } else {
      Alert.alert('Error', networkText);
    }
  };

  //Delete Card
  const deleteBank = async () => {
    const isConnected = await checkConnected();
    if (isConnected) {
      setLoading(true);
      const onSuccess = res => {
        setShow(false);
        setLoading(false);
        console.log('On DEL Bank Success');
        getBanks();
      };
      const onFailure = res => {
        console.log(res);
        setShow(false);
        setLoading(false);
        Alert.alert('Error', res || 'Unable to Delete Card');
        console.log('On DEL Bank Failure', res);
      };
      const requestBody = {
        bank_id: currentCard?.id,
      };
      dispatch(delete_bank_request(requestBody, onSuccess, onFailure));
    } else {
      Alert.alert('Error', networkText);
    }
  };

  //On Set Default Card
  const onDafultBankHandler = (item, index) => {
    const requestBody = {
      bank_id: item?.id,
      id: index,
    };
    const onSuccess = res => {
      console.log('On Default Bank Success', res);
    };
    const onFailure = res => {
      Alert.alert('Error', res);
      console.log('On Default Bank Failure', res);
    };
    dispatch(default_bank_request(requestBody, onSuccess, onFailure));
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
        title={'Manage Bank Accounts'}
        neumorph={false}
      />
      <View style={styles.contentContainer}>
        <View style={commonStyles.flex1}>
          {bank_list != '' ? (
            <FlatList
              data={bank_list}
              renderItem={({item, index}) => {
                return (
                  <View>
                    <ATMCard
                      onPressDel={() => {
                        setShow(true);
                        setcurrentCard(item);
                      }}
                      onPressEdit={() => {
                        navigation?.navigate('EditBankAccount', {
                          bank_detail: item,
                        });
                      }}
                      bankName={item?.bank_name || ''}
                      holderName={item?.account_holder_name || 'name'}
                      cvc={`${item?.account_number}`}
                      defaultCard={item?.default}
                      onPressDefault={() => {
                        onDafultBankHandler(item, index);
                      }}
                    />
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <BlankField title={'No Bank Account Available'} />
          )}
        </View>

        <AppButton
          onPress={() => {
            navigation?.navigate('AddBankAccount');
          }}
          textColor={'white'}
          title={'Add New Account'}
        />
      </View>
      {show && (
        <DelPaymentCard
          title={'Remove Account'}
          subtitle={'Are you sure you want to remove account?'}
          expiry_date={`Routing Number : ${currentCard?.routing_number}`}
          cvc={`A/C number : ${currentCard?.account_number}`}
          brand={currentCard?.brand_name}
          show={show}
          bankName={`Bank Name : ${currentCard?.bank_name}`}
          onPressHide={() => {
            setShow(false);
          }}
          onPress={() => {
            deleteBank();
          }}
        />
      )}
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default PaymentBankList;
