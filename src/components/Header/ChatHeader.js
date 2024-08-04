import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';
import {useTheme} from 'react-native-paper';
import {MyStatusBar, NeumorphBox} from '..';
import CountryPicker from 'react-native-country-picker-modal';
import {
  commonStyles,
  family,
  profile_uri,
  size,
  WP,
} from '../../shared/exporter';
import {useNavigation} from '@react-navigation/core';
export const ChatHeader = ({
  barColor,
  title,
  subtitle,
  backIcon,
  rightIcon,
  onPressRight,
  neumorph = true,
  marginTop,
  profileImg,
  profileImg1,
  country,
  group,
}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  return (
    <>
      <MyStatusBar backgroundColor={barColor} />
      <View
        style={[
          styles.container,
          {
            borderBottomWidth: 1,
            borderColor: colors.g40,
            backgroundColor: colors?.app_color,
            paddingTop: !rightIcon ? WP('5') : !neumorph ? WP('5') : 10,
          },
        ]}>
        <View style={styles.leftCon}>
          {backIcon && (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon
                  type={'ionicons'}
                  name={'arrow-back'}
                  size={25}
                  color={colors.b2}
                />
              </TouchableOpacity>
              <View>
                {!group ? (
                  <Image
                    style={[styles.profile, {backgroundColor: colors.g10}]}
                    source={{uri: profileImg || profile_uri}}
                  />
                ) : (
                  <View style={styles.groupCon}>
                    <Image
                      style={[
                        styles.groupProfileStyle,
                        {
                          marginTop: 15,
                          zIndex: 9999,
                          backgroundColor: colors.g10,
                        },
                      ]}
                      source={{uri: profileImg || profile_uri}}
                    />
                    <Image
                      style={[
                        styles.groupProfileStyle,
                        {marginLeft: -10, backgroundColor: colors.g10},
                      ]}
                      source={{uri: profileImg1 || profile_uri}}
                    />
                  </View>
                )}
                <View style={!group ? styles.pIcon : styles.pIcon1}>
                  <CountryPicker
                    modalProps={{visible: false}}
                    translation="eng"
                    withFlag={true}
                    withEmoji={true}
                    countryCode={country?.country_cc || 'US'}
                    withFilter={true}
                    withAlphaFilter={true}
                    visible={false}
                    theme={{flagSizeButton: 12}}
                  />
                </View>
              </View>
              <View style={[styles.textCon]}>
                <Text style={[styles.h1Style, {color: colors.b1}]}>
                  {title}
                </Text>
                <Text style={[styles.h2Style, {color: colors.gr2}]}>
                  {subtitle}
                </Text>
              </View>
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
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WP('5'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: WP('3'),
  },
  leftCon: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  h1Style: {
    fontSize: size.large,
    fontFamily: family.Gilroy_Medium,
    marginBottom: 2,
  },
  h2Style: {
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Regular,
  },
  textCon: {
    marginTop: 5,
    marginLeft: 8,
  },
  rightCon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    height: 43,
    width: 43,
    borderRadius: 43,
    marginLeft: 10,
  },
  groupProfileStyle: {
    height: 29,
    width: 29,
    borderRadius: 29,
  },
  groupCon: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  pIcon: {
    position: 'absolute',
    resizeMode: 'cover',
    bottom: 2,
    right: -20,
  },
  pIcon1: {
    position: 'absolute',
    resizeMode: 'cover',
    bottom: 0,
    right: -10,
    zIndex: 9999,
  },
});
