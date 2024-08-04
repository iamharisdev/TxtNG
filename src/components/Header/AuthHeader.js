import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {family, scrWidth, size, WP} from '../../shared/exporter';
import BackArrow from 'react-native-vector-icons/Ionicons';
import {MyStatusBar, NeumorphBox} from '..';
import {useTheme} from 'react-native-paper';

export const AuthHeader = ({
  backIcon,
  rightIcon,
  onPressBack,
  title,
  fontFamily,
  textColor,
  barColor,
  backText,
  paddingVertical,
}) => {
  const {colors} = useTheme();
  return (
    <>
      <MyStatusBar backgroundColor={barColor || colors.white} />
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors?.app_color,
            paddingVertical: paddingVertical || WP('5'),
          },
        ]}>
        <View style={[styles.contentContainer]}>
          {backIcon && (
            <TouchableOpacity onPress={onPressBack}>
              <NeumorphBox
                width={50}
                lightShadowColor={colors.white}
                darkShadowColor={colors.input_dark_shadow}
                borderRadius={12}
                shadowRadius={3}
                alignItems={'center'}
                justifyContent={'center'}>
                <BackArrow name={'arrow-back'} size={25} color={colors.b2} />
              </NeumorphBox>
            </TouchableOpacity>
          )}
          {backText && (
            <Text style={[styles.textStyle, {color: colors.b2}]}>
              {backText}
            </Text>
          )}
          <Text
            style={[
              styles.titleTextStyle,
              {
                fontFamily: fontFamily,
                color: textColor,
                right: rightIcon ? 10 : 0,
              },
            ]}>
            {title}
          </Text>
          {rightIcon && <TouchableOpacity>{rightIcon}</TouchableOpacity>}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WP('5'),
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleTextStyle: {
    fontSize: size.large,
    fontFamily: family.Poppins_SemiBold,
  },
  leftIconStyle: {
    height: 44,
    width: 44,
    borderRadius: 12,
  },
  textStyle: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.h5,
  },
});
