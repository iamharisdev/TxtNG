import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {appIcons, appImages, family, size, WP} from '../../../shared/exporter';
import {useTheme} from 'react-native-paper';
import moment from 'moment';

export const SupportCard = ({item}) => {
  const {colors} = useTheme();

  var check = moment(item.created_at);
  let day = check.format('D');
  let month = check.format('MMMM');
  let year = check.format('YYYY');
  let time = check.format('hh:mm a');
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: colors.g23,
          shadowColor: colors.shad1,
        },
      ]}>
      <View style={styles.leftCon}>
        {item?.user_profile ? (
          <View style={[styles.imgCon, {backgroundColor: colors?.pur2}]}>
            <Image
              style={styles.profileStyle}
              source={{uri: item?.user_profile}}
            />
          </View>
        ) : (
          <View style={[styles.imgCon, {backgroundColor: colors?.pur2}]}>
            <Image style={styles.imageStyle} source={appIcons.social} />
          </View>
        )}
      </View>
      <View style={styles.rightCon}>
        <Text style={[styles.h1, {color: colors.b5}]}>{item?.id}</Text>
        <Text style={[styles.h2, {color: colors.pur2}]}>
          {`${month} ${day}, ${year} | ${time}`}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode={'tail'}
          style={[styles.desc, {color: colors.b1}]}>
          {item?.message}
        </Text>
      </View>
      <View style={[styles.statusCon, {backgroundColor: colors.y1}]}>
        <Text style={[styles.statusText, {color: colors.white}]}>
          {item.status}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: WP('4'),
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 14,
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  imgCon: {
    height: 42,
    width: 42,
    resizeMode: 'contain',
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageStyle: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  leftCon: {
    width: '17%',
    height: '100%',
  },
  rightCon: {
    width: '83%',
  },
  desc: {
    fontFamily: family.Gilroy_Regular,
    fontSize: size.tiny,
    lineHeight: 17,
  },
  h2: {
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_SemiBold,
    marginBottom: 5,
  },
  h1: {
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
    marginBottom: 5,
  },
  statusCon: {
    position: 'absolute',
    right: 10,
    top: 10,
    height: 22,
    backgroundColor: 'red',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  statusText: {
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  profileStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 42,
  },
});
