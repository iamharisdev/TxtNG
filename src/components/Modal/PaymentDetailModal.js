import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {
  appIcons,
  commonStyles,
  family,
  size,
  spacing,
  WP,
} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';

export const PaymentDetailModal = ({
  onPressHide,
  show,
  title,
  list,
  onPressEdit,
  icon,
}) => {
  const {colors} = useTheme();
  const PaymentField = ({title, subtitle}) => {
    return (
      <View style={styles.headingStyle}>
        <Text style={[styles.h1, {color: colors.b1}]}>{title}</Text>
        <Text
          style={[
            styles.h2,
            {
              color: colors.b1,
            },
          ]}>
          {subtitle}
        </Text>
      </View>
    );
  };
  return (
    <Modal avoidKeyboard={true} onBackdropPress={onPressHide} isVisible={show}>
      <View style={[styles.container, {backgroundColor: colors.app_color}]}>
        <View style={[styles.aiRow, spacing.mb4]}>
          <View style={commonStyles.aiRow}>
            <Image style={styles.icon1} source={icon} />
            <Text style={[styles.title, {color: colors.g17}]}>{title}</Text>
          </View>
          <TouchableOpacity onPress={onPressEdit}>
            <Image
              source={appIcons.edit}
              style={[styles.icon24, {tintColor: colors.pur2}]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.aiRow}>
          {list?.map(item => {
            return <PaymentField title={item.title} subtitle={item.subtitle} />;
          })}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '33%',
    borderRadius: 16,
    padding: WP('5'),
  },
  icon1: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
    marginRight: 15,
  },
  title: {
    fontSize: size.large,
    fontFamily: family.Montserrat_Bold,
  },
  aiRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  icon24: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  headingStyle: {
    marginVertical: 10,
    width: '50%',
  },
  h1: {
    fontSize: size.xxtiny,
    fontFamily: family.Montserrat_Regular,
  },
  h2: {
    fontSize: size.xsmall,
    fontFamily: family.Montserrat_Medium,
    marginVertical: 5,
  },
});
