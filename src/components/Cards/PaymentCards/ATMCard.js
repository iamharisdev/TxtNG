import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {appIcons, checkBrand, family, size, WP} from '../../../shared/exporter';
import {useTheme} from 'react-native-paper';

export const ATMCard = ({
  onPressDel,
  onPressEdit,
  holderName,
  cvc,
  brand,
  onPressDefault,
  defaultCard,
  bankName,
}) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: colors.g29,
        },
      ]}>
      <View style={[styles.leftCon]}>
        <View>
          <Text style={[styles.h1, {color: colors.b1}]}>{holderName}</Text>
          <Text
            style={[
              styles.h2,
              {
                color: colors.b1,
              },
            ]}>
            {cvc}
          </Text>
        </View>
        <View>
          {brand && (
            <Image style={styles.brandStyle} source={checkBrand(brand)} />
          )}
          {bankName && (
            <Text style={[styles.h1, {color: colors.b1}]}>{bankName}</Text>
          )}
        </View>
      </View>
      <View style={styles.rightCon}>
        <View>
          <TouchableOpacity
            onPress={onPressDefault}
            style={[
              styles.leftBtn,
              {
                backgroundColor: defaultCard ? colors.pur2 : colors.app_color,
                borderColor: defaultCard ? colors?.primary : colors.pur2,
              },
            ]}>
            <Text
              style={[
                styles.btnText,
                {color: defaultCard ? colors?.primary : colors?.pur2},
              ]}>
              Set as Default
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightItemCon}>
          <TouchableOpacity
            onPress={onPressEdit}
            style={[
              styles.smleftBtn,
              {
                backgroundColor: colors.pur2,
                borderColor: colors.pur2,
              },
            ]}>
            <Text style={[styles.btnText, {color: colors?.white}]}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressDel}
            style={[styles.xsmBtn, {backgroundColor: colors.r3}]}>
            <Image source={appIcons.delete} style={styles.iconStyle} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: WP('32'),
    padding: 20,
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 10,
  },
  leftCon: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightCon: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  brandStyle: {
    height: 17,
    width: 56,
    resizeMode: 'contain',
  },
  h1: {
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
    fontWeight: '600',
  },
  h2: {
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Regular,
    marginVertical: 5,
  },
  iconStyle: {
    height: 14,
    width: 13,
    resizeMode: 'contain',
  },
  rightItemCon: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leftBtn: {
    width: WP('32'),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    borderWidth: 1,
  },
  btnText: {
    fontSize: size.tiny,
    fontFamily: family.Gilroy_SemiBold,
    fontWeight: '600',
  },
  smleftBtn: {
    width: WP('20'),
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    borderWidth: 1,
    marginRight: 10,
  },
  xsmBtn: {
    height: 32,
    width: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
