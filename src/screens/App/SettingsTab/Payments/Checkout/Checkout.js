import {Alert, Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {useTheme} from 'react-native-paper';
import {
  AppButton,
  AppHeader,
  AppLoader,
  CheckoutField,
  NeumorphDivider,
} from '../../../../../components';
import {
  checkConnected,
  commonStyles,
  family,
  networkText,
  profile_uri,
  spacing,
} from '../../../../../shared/exporter';
import {useDispatch, useSelector} from 'react-redux';
import {
  pay_with_debit_request,
  setAppTheme,
} from '../../../../../redux/actions';
const Checkout = ({navigation, route}) => {
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(null);
  const {checkout_detail} = useSelector(state => state?.appReducer);
  const {checkout_data} = useSelector(state => state?.settings);
  const total_price = checkout_detail?.price + 0.99;

  //Create Checkout handler
  const checkoutHandler = async () => {
    const check = await checkConnected();
    if (check) {
      try {
        setLoading(true);
        const checkMethod = await PaymentMethodBody();
        //On Success
        const onSuccess = async res => {
          console.log('Create Checkout Success');
          setLoading(false);
          if (checkout_detail?.theme_id) {
            dispatch(
              setAppTheme(checkout_detail?.selected_Theme, () => {
                navigation?.navigate('PaymentSuccess');
              }),
            );
          } else {
            navigation?.navigate('PaymentSuccess');
          }
        };
        //On Failure
        const onFailure = async res => {
          console.log('Create Checkout Failure');
          Alert.alert('Error', res || 'Something went wrong!');
          setLoading(false);
        };
        //Pay with Debit Card
        dispatch(
          pay_with_debit_request(
            checkout_detail?.theme_id
              ? 'create_charge_for_theme'
              : 'create_charge_for_burn_number',
            checkout_detail?.theme_id
              ? checkMethod?.requestBody
              : checkMethod?.burnRequest,
            onSuccess,
            onFailure,
          ),
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Error', networkText);
    }
  };

  //Get Payment Methods
  const PaymentMethodBody = async () => {
    if (checkout_data?.pay_with_card) {
      const requestBody = {
        theme_id: checkout_detail?.theme_id,
        card_id: checkout_data?.card_detail?.id,
      };

      const burnRequest = {
        price: 10,
        card_id: checkout_data?.card_detail?.id,
        new_number: checkout_detail?.phone?.text_ng_number,
      };
      return {requestBody, burnRequest};
    } else if (checkout_data?.pay_with_account) {
      const requestBody = {
        theme_id: checkout_detail?.theme_id,
        bank_id: checkout_data?.bank_detail?.id,
      };
      const burnRequest = {
        price: 10,
        bank_id: checkout_data?.bank_detail?.id,
        new_number: checkout_detail?.phone?.text_ng_number,
      };
      return {requestBody, burnRequest};
    } else if (checkout_data?.pay_with_wallet) {
      const requestBody = {
        theme_id: checkout_detail?.theme_id,
      };
      const burnRequest = {
        price: 10,
        new_number: checkout_detail?.phone?.text_ng_number,
      };
      return {requestBody, burnRequest};
    } else {
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
        title={'Checkout'}
        neumorph={false}
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View>
          {checkout_detail?.image && (
            <View style={[commonStyles.aiCenter, spacing.my2]}>
              <Image
                source={{
                  uri: checkout_detail?.image,
                }}
                resizeMode={'contain'}
                style={styles.imgStyle}
              />
            </View>
          )}
          <Text style={[styles.h1, {color: colors.b1}]}>Summary</Text>
          <CheckoutField
            title={checkout_detail?.title}
            subtitle={`$${checkout_detail?.price}`}
          />

          <CheckoutField title={'TextNG Fee'} subtitle={'$0.99'} />
          <View style={spacing.my4}>
            <NeumorphDivider height={4} bgColor={colors.g32} />
          </View>
          <CheckoutField
            fontFamilyH1={family.Gilroy_Medium}
            fontFamilyH2={family.Gilroy_Regular}
            colorH2={colors.b1}
            title={'TextNG Fee'}
            subtitle={`$${total_price}`}
          />
        </View>
        <View>
          <AppButton
            disabled={loading}
            textColor={colors.white}
            title={'Pay Now'}
            onPress={() => {
              checkoutHandler();
            }}
          />
        </View>
      </ScrollView>

      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default Checkout;
