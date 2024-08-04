import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';
import {useTheme} from 'react-native-paper';
import {MyStatusBar, NeumorphBox, NeumorphDivider} from '..';
import {
  commonStyles,
  family,
  scrWidth,
  size,
  spacing,
  WP,
} from '../../shared/exporter';
import {useNavigation} from '@react-navigation/core';
export const AppHeader = ({
  barColor,
  title,
  backIcon,
  rightIcon,
  onPressRight,
  neumorph = true,
  marginTop,
  onPressBack,
}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  return (
    <>
      <MyStatusBar backgroundColor={barColor} />
      <View
        style={[
          styles.container,
          {paddingTop: !rightIcon ? WP('5') : !neumorph ? WP('5') : 10},
        ]}>
        <View style={styles.leftCon}>
          {backIcon && (
            <>
              <TouchableOpacity
                onPress={() => {
                  if (onPressBack) {
                    onPressBack();
                  } else {
                    navigation.goBack();
                  }
                }}>
                <Icon
                  type={'ionicons'}
                  name={'arrow-back'}
                  size={25}
                  color={colors.b2}
                />
              </TouchableOpacity>
              <Text style={[styles.h1Style, {color: colors.b1}]}>{title}</Text>
            </>
          )}
        </View>
        <View style={[styles.rightCon, {marginTop: marginTop}]}>
          {rightIcon && neumorph && (
            <NeumorphBox
              width={44}
              height={44}
              alignItems={'center'}
              justifyContent={'center'}>
              <TouchableOpacity
                onPress={onPressRight}
                style={[commonStyles.fullImg, commonStyles.aiCenter]}>
                {rightIcon}
              </TouchableOpacity>
            </NeumorphBox>
          )}
          {rightIcon && !neumorph && (
            <TouchableOpacity onPress={onPressRight}>
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>
      </View>
      <NeumorphDivider width={scrWidth} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WP('5'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: WP('2'),
  },
  leftCon: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  h1Style: {
    marginLeft: 10,
    fontSize: size.h5,
    fontFamily: family.Gilroy_Bold,
  },
  rightCon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
