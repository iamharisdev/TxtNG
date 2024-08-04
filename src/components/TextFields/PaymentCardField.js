import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {family, size} from '../../shared/exporter';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import {AppInput, NeumorphBox} from '..';
import {useTheme, Switch} from 'react-native-paper';

export const PaymentCardField = ({
  onCardChange,
  onFocus,
  paymentField,
  title,
  check,
  setCheck,
  placeholder,
  value,
  onChangeText,
  blurOnSubmit,
  errorMessage,
  inputTtitle,
  onBlur,
  touched,
  showBtn,
}) => {
  const {colors} = useTheme();
  return (
    <View>
      {paymentField && (
        <>
          <Text style={[styles.titleStyle, {color: colors.g3}]}>{title}</Text>

          <NeumorphBox alignItems={'center'} justifyContent={'center'}>
            <CardField
              placeholder={{
                number: 'Card Number',
              }}
              postalCodeEnabled={false}
              cardStyle={{
                backgroundColor: colors.app_color,
                borderRadius: 12,
                fontSize: size.normal,
                fontFamily: family.Montserrat_Regular,
                textColor: colors.g1,
              }}
              style={[styles.payStyle]}
              onCardChange={onCardChange}
              onFocus={onFocus}
            />
          </NeumorphBox>
        </>
      )}
      <AppInput
        onChangeText={onChangeText}
        title={inputTtitle}
        placeholder={placeholder}
        height={47}
        inputColor={colors.g1}
        renderErrorMessage={true}
        value={value}
        onBlur={onBlur}
        blurOnSubmit={blurOnSubmit}
        touched={touched}
        errorMessage={errorMessage}
      />
      {showBtn && (
        <View style={styles.footer}>
          <Text
            style={[
              styles.footerText,
              {
                color: colors.g3,
              },
            ]}>
            Save this card for future payments
          </Text>

          <Switch color={colors.pur2} value={check} onValueChange={setCheck} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  payStyle: {
    width: '98%',
    height: 45,
  },

  titleStyle: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.normal,
    marginVertical: 10,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  footerText: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.normal,
    width: '80%',
  },
});
