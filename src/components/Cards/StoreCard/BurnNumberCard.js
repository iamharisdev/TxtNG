import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {appIcons, family, size} from '../../../shared/exporter';
import {useTheme} from 'react-native-paper';

export const BurnNumberCard = () => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.leftCon}>
        <Image style={styles.iconStyle} source={appIcons.fire2} />
      </View>
      <View style={styles.rightCon}>
        <Text style={[styles.cardText, {color: colors.g3}]}>
          Burn your number
        </Text>
        <View
          style={[
            styles.cardStyle,
            {backgroundColor: colors.pur2, shadowColor: colors.sm_shadow_color},
          ]}>
          <Text style={[styles.smCardText, {color: colors.white}]}>$10</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftCon: {
    width: '18%',
    justifyContent: 'center',
  },
  rightCon: {
    width: '82%',
  },
  iconStyle: {
    height: 55,
    width: 40,
  },
  cardStyle: {
    marginTop: 10,
    height: 26,
    width: 43,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowOpacity: 3,
    justifyContent: 'center',
  },
  cardText: {
    fontSize: size.normal,
    fontFamily: family.Montserrat_Regular,
  },
  smCardText: {
    fontSize: size.normal,
    fontWeight: '400',
  },
});
