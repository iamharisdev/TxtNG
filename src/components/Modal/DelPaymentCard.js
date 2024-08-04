import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {useTheme} from 'react-native-paper';
import {
  appIcons,
  checkBrand,
  family,
  size,
  spacing,
  WP,
} from '../../shared/exporter';
import {SmAppButton} from '..';

export const DelPaymentCard = ({
  onPressHide,
  show,
  cvc,
  expiry_date,
  onPress,
  brand,
  title,
  subtitle,
  bankName,
}) => {
  const {colors} = useTheme();
  return (
    <Modal onBackdropPress={onPressHide} isVisible={show}>
      <View style={[styles.container, {backgroundColor: colors.white}]}>
        <Text style={[styles.h1, {color: colors.b1}]}>
          {title || 'Remove Card'}
        </Text>
        <Text
          style={[
            styles.h2,
            {
              color: colors.b11,
            },
          ]}>
          {subtitle || 'Are you sure you want to remove card?'}
        </Text>
        <View style={[styles.leftCon]}>
          <View>
            <Text style={[styles.h3, {color: colors.b11}]}>{cvc}</Text>
            <Text
              style={[
                styles.h3,
                {
                  color: colors.b11,
                },
              ]}>
              {expiry_date}
            </Text>
          </View>
          {brand && (
            <Image style={styles.brandStyle} source={checkBrand(brand)} />
          )}
        </View>
        {bankName && (
          <Text style={[styles.h3, {color: colors.b11}]}>{bankName}</Text>
        )}
        <View style={spacing.mt4}>
          <SmAppButton
            onPress={onPress}
            shadowColor={colors.red1_gradient}
            textColor={colors.white}
            title={'Confirm'}
            fontFamily={family.Poppins_Regular}
            fontSize={size.xsmall}
            gradient_color={[colors?.r3, colors.r3]}
            height={50}
          />
          <SmAppButton
            onPress={onPressHide}
            title={'Cancel'}
            gradient_color={[colors?.white, colors.white]}
            shadowColor={colors.white}
            textColor={colors.b1}
            fontFamily={family.Poppins_SemiBold}
            fontSize={size.xsmall}
            height={50}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: WP('75'),
    borderRadius: 20,
    padding: 20,
  },
  h1: {
    textAlign: 'center',
    fontSize: size.xsmall,
    fontFamily: family.Poppins_SemiBold,
  },
  h2: {
    fontSize: size.tiny,
    marginVertical: 10,
    fontFamily: family.Poppins_Regular,
    textAlign: 'center',
  },
  leftCon: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  brandStyle: {
    height: 17,
    width: 56,
    resizeMode: 'contain',
  },
  h3: {
    fontFamily: family.Poppins_Regular,
    fontSize: size.xsmall,
  },
});
