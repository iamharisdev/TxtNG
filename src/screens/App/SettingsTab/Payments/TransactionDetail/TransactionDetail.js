import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {useTheme} from 'react-native-paper';
import {
  AppButton,
  AppHeader,
  DividerBox,
  NeumorphDivider,
  PaymentField,
} from '../../../../../components';
import {Icon} from '@rneui/themed';
import {
  appIcons,
  checkBrand,
  family,
  size,
} from '../../../../../shared/exporter';
const TransactionDetail = ({navigation, route}) => {
  const {colors} = useTheme();
  const {item, type, current_card} = route?.params;

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.app_color,
        },
      ]}>
      <AppHeader
        onPressBack={() => {
          navigation?.navigate('Wallet');
        }}
        barColor={colors.app_color}
        backIcon={true}
        title={'Transaction Details'}
        neumorph={false}
      />
      <View style={styles.contentContainer}>
        <View style={styles.headerStyle}>
          <View
            style={[
              styles.headImgCon,
              {
                backgroundColor: colors.pur2,
              },
            ]}>
            <Icon size={30} name={'check'} color={colors.white} />
          </View>
          <Text style={[styles.h1, {color: colors.pur2}]}>
            {item?.message || ''}
          </Text>
        </View>
        <PaymentField
          title={'Amount ($)'}
          subtitle={`${item?.amount || 0}.00` || '0.00'}
          fontSizeSub={size.h5}
          textColorSub={colors.pur2}
          fontFamilySub={family.Gilroy_Bold}
        />
        <NeumorphDivider />
        <PaymentField
          title={'Method'}
          subtitle={item?.method || 'Credit Card'}
          fontSizeSub={size.xsmall}
          textColorSub={colors.b1}
          fontFamilySub={family.Gilroy_Medium}
          iconSub={appIcons.card}
          iconStyle={styles.iconStyle}
        />
        <PaymentField
          title={'Transaction ID'}
          subtitle={item?.Transaction_id || ''}
          fontSizeSub={size.xsmall}
          textColorSub={colors.b1}
          fontFamilySub={family.Gilroy_Medium}
        />
        <PaymentField
          title={'Current TextNG Wallet Balance'}
          subtitle={`${item?.Current_TextNG_Wallet_Balance || 0}.00` || '0.00'}
          fontSizeSub={size.h5}
          textColorSub={colors.pur2}
          fontFamilySub={family.Gilroy_Bold}
        />
        <NeumorphDivider />
        {type == 'Top-Up' && (
          <>
            <Text style={styles.headingStyle}>Card Information</Text>
            <PaymentField
              title={'Full Name'}
              subtitle={current_card?.card_holder_name || ''}
              fontSizeSub={size.xsmall}
              textColorSub={colors.b1}
              fontFamilySub={family.Gilroy_Medium}
            />
            <PaymentField
              title={'Card Number'}
              subtitle={`**** **** **** ${current_card?.cvc}` || ''}
              fontSizeSub={size.xsmall}
              textColorSub={colors.b1}
              fontFamilySub={family.Gilroy_Medium}
              iconStyle={styles.brandStyle}
              iconSub={checkBrand(current_card?.brand_name)}
            />
            <PaymentField
              title={'Expiry Date'}
              subtitle={`${current_card?.expiry_month || 0}/ ${
                current_card?.expiry || 0
              }`}
              fontSizeSub={size.xsmall}
              textColorSub={colors.b1}
              fontFamilySub={family.Gilroy_Medium}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TransactionDetail;
