import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {Icon} from '@rneui/themed';
import {appIcons, family, size, WP} from '../../../shared/exporter';
import {NeumorphDivider} from '../..';

export const PayCard = ({
  title,
  icon,
  subtitle,
  checked,
  setChecked,
  onPress,
}) => {
  const {colors} = useTheme();

  return (
    <>
      <TouchableOpacity onPress={onPress} style={[styles.container]}>
        <View style={styles.leftCon}>
          <Image source={icon} style={styles.iconStyle} />
        </View>
        <View style={styles.centerCon}>
          <Text style={[styles.title, {color: colors.b1}]}>{title}</Text>
          <Text style={[styles.subtitle, {color: colors.g35}]}>{subtitle}</Text>
        </View>
        <View style={styles.rightCon}>
          <TouchableOpacity
            onPress={setChecked}
            style={[
              styles.btnCon,
              {
                backgroundColor: checked ? colors.pur2 : colors?.app_color,
                borderColor: checked ? colors.pur2 : colors?.g28,
              },
            ]}>
            {checked && <Icon size={15} name={'check'} color={colors.white} />}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <NeumorphDivider />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    height: 66,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 9999,
  },
  leftCon: {
    width: '12%',
    justifyContent: 'center',
    height: '100%',
  },
  iconStyle: {
    height: 20,
    width: 24,
    resizeMode: 'contain',
  },
  centerCon: {
    width: '76%',
  },
  btnCon: {
    height: 24,
    width: 24,
    borderRadius: 7,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightCon: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '12%',
  },
  rightSwipeCon: {
    height: 66,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    width: '25%',
    alignSelf: 'center',
    left: 10,
    flexDirection: 'row',
    paddingHorizontal: WP('4'),
  },
  delImageStyle: {
    height: 22,
    width: 25,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: family.Gilroy_Medium,
    fontSize: size.xsmall,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Regular,
  },
});
