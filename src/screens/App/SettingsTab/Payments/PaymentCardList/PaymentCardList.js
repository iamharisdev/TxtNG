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
  default_card_request,
  delete_card_request,
  get_payment_cards_request,
} from '../../../../../redux/actions';
const PaymentCardList = ({navigation}) => {
  const [show, setShow] = useState(false);
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const {payment_card_list} = useSelector(state => state?.settings);
  const [currentCard, setcurrentCard] = useState(null);
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

  //Delete Card
  const deleteCard = async () => {
    const isConnected = await checkConnected();
    if (isConnected) {
      setLoading(true);
      const onSuccess = res => {
        setShow(false);
        setLoading(false);
        console.log('On DEL Card Success');
        getCards();
      };
      const onFailure = res => {
        console.log(res);
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
      Alert.alert('Error', networkText);
    }
  };

  //On Set Default Card
  const onDafultCardHandler = (item, index) => {
    const requestBody = {
      card: item,
      id: index,
    };
    const onSuccess = res => {
      console.log('On Default Card Success', res);
    };
    const onFailure = res => {
      Alert.alert('Error', res);
      console.log('On Default Card Failure', res);
    };
    dispatch(default_card_request(requestBody, onSuccess, onFailure));
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
        title={'Manage Cards'}
        neumorph={false}
      />
      <View style={styles.contentContainer}>
        <View style={commonStyles.flex1}>
          {payment_card_list != '' ? (
            <FlatList
              data={payment_card_list}
              renderItem={({item, index}) => {
                return (
                  <View>
                    <ATMCard
                      onPressDel={() => {
                        setShow(true);
                        setcurrentCard(item);
                      }}
                      onPressEdit={() => {
                        navigation?.navigate('EditCard', {card_detail: item});
                      }}
                      holderName={item?.card_holder_name || 'name'}
                      cvc={`*** *** *** ***  ${item?.cvc}`}
                      brand={item?.brand_name}
                      defaultCard={item?.default}
                      onPressDefault={() => {
                        onDafultCardHandler(item, index);
                      }}
                    />
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <BlankField title={'No Card Available'} />
          )}
        </View>

        <AppButton
          onPress={() => {
            navigation?.navigate('AddCard');
          }}
          textColor={'white'}
          title={'Add New Card'}
        />
      </View>
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
            deleteCard();
          }}
        />
      )}
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default PaymentCardList;
