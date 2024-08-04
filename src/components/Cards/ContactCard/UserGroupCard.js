import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  appIcons,
  family,
  profile_uri,
  scrWidth,
  size,
  WP,
} from '../../../shared/exporter';
import {useTheme} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {NeumorphDivider} from '../..';
import ThreeDotsMenu from '../../Menu/ThreeDotsMenu';
import CountryPicker from 'react-native-country-picker-modal';

export const UserGroupCard = ({
  h1,
  h2,
  menu_list,
  onSelect,
  img,
  admin,
  country,
  blocked,
}) => {
  const {colors} = useTheme();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftCon}>
          <FastImage
            style={[styles.imgStyle, {backgroundColor: colors.g19}]}
            source={{
              uri: img || profile_uri,
              priority: FastImage.priority.high,
            }}
          />
          <View style={styles.pIcon1}>
            <CountryPicker
              modalProps={{visible: false}}
              translation="eng"
              withFlag={true}
              withEmoji={true}
              countryCode={country?.country_cc || 'US'}
              withFilter={true}
              withAlphaFilter={true}
              visible={false}
              theme={{flagSizeButton: 20}}
            />
          </View>
        </View>
        <View style={styles.rightCon}>
          <Text
            style={[
              styles.h1,
              {
                color: colors.b1,
              },
            ]}>
            {h1 || 'username'}
          </Text>
          <Text
            style={[
              styles.h2,
              {
                color: colors.g3,
              },
            ]}>
            {h2 || '+1 23456788'}
          </Text>
        </View>
        {admin && (
          <View>
            <ThreeDotsMenu
              menu_list={menu_list}
              width={'40%'}
              onSelect={onSelect}
              block={blocked}
            />
          </View>
        )}
      </View>
      <View>
        <NeumorphDivider width={scrWidth} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginVertical: 10,
  },
  leftCon: {
    width: '15%',
    justifyContent: 'center',
    height: '100%',
  },
  rightCon: {
    width: '80%',
  },
  imgStyle: {
    height: 42,
    width: 42,
    borderRadius: 21,
  },
  h1: {
    fontSize: size.normal,
    fontFamily: family.Gilroy_Medium,
    marginBottom: 2,
    marginLeft: 1,
  },
  h2: {
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Regular,
  },
  pIcon1: {
    position: 'absolute',
    resizeMode: 'cover',
    bottom: -5,
    right: -5,
    zIndex: 9999,
  },
});
