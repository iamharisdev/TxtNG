import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {useTheme} from 'react-native-paper';
import {family, size, WP} from '../../shared/exporter';
import {SmAppButton} from '..';
export const StoreModal = ({
  show,
  onPressHide,
  onPress,
  title,
  subtitle,
  btnText,
  height,
  paddingHorizontal,
  btnWidth,
}) => {
  const {colors} = useTheme();
  return (
    <Modal onBackdropPress={onPressHide} isVisible={show}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.app_color,
            height: height || WP('73'),
            paddingHorizontal: paddingHorizontal || WP('8'),
          },
        ]}>
        <Text style={[styles.h1, {color: colors.g17}]}>{title} </Text>
        <Text style={[styles.h2, {color: colors.g17}]}>{subtitle}</Text>
        <View style={[styles.btnCon, {width: btnWidth || '100%'}]}>
          {onPress && (
            <SmAppButton
              onPress={onPress}
              textColor={colors.white}
              title={btnText}
            />
          )}
          {onPressHide && (
            <SmAppButton
              onPress={onPressHide}
              gradient_color={[colors.app_color, colors.app_color]}
              title={'cancel'}
              textColor={colors.g17}
              fontFamily={family.Montserrat_Regular}
              fontSize={size.xsmall}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: WP('8'),
    borderRadius: 16,
    justifyContent: 'space-between',
  },
  h1: {
    fontSize: size.large,
    fontFamily: family.Montserrat_Bold,
    textAlign: 'center',
    width: '80%',
    marginVertical: 20,
  },
  h2: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
    lineHeight: 16,
    textAlign: 'center',
    width: '100%',
  },
  btnCon: {
    width: '100%',
    paddingVertical: 10,
  },
});
