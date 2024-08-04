import React, {Fragment} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {family, HP, profile_uri, size, WP} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';
import moment from 'moment';
import FastImage from 'react-native-fast-image';

export const ChatBox = ({messages, receiver, time, img, isSeen}) => {
  const {colors} = useTheme();

  return (
    <>
      <View
        style={[
          styles.container,
          {
            alignSelf: receiver ? 'flex-start' : 'flex-end',
          },
        ]}>
        {receiver && (
          <View style={styles.imgCon}>
            <FastImage
              source={{uri: img || profile_uri}}
              style={[styles.userImg, {backgroundColor: colors.g10}]}
            />
          </View>
        )}
        <View
          style={[
            styles.boxStyle,
            {
              marginLeft: receiver ? WP('9') : 0,
            },
          ]}>
          <View
            style={[
              styles.boxStyle,
              {
                shadowColor: receiver ? colors.shad2 : colors.shad3,
                padding: 20,
                borderRadius: 16,
                backgroundColor: receiver ? colors.white : colors.pur2,
                width: 'auto',
                marginRight: receiver ? 100 : 0,
                marginLeft: receiver ? 0 : 100,
                alignSelf: receiver ? 'flex-start' : 'flex-end',
              },
            ]}>
            <Text
              style={[
                styles.textStyle,
                {color: receiver ? colors.b9 : colors.white},
              ]}>
              {messages}
            </Text>
          </View>
          <View
            style={[
              styles.aiRow,

              {
                marginVertical: HP(0.5),
                justifyContent: receiver ? 'flex-start' : 'flex-end',
              },
            ]}>
            {/* {!isSeen ? (
              <View style={[styles.circleStyle, {borderColor: colors.g39}]} />
            ) : (
              <Image
                source={require('../../assets/icons/seen.png')}
                style={styles.seenImageStyle}
              />
            )} */}

            <Text style={[styles.timeStyle, {color: colors.g39}]}>
              {moment(time).format('hh:mm:A')}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flex: 1,
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: size.normal,
    fontFamily: family.Gilroy_Medium,
    lineHeight: 20,
  },
  boxStyle: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.27,
    elevation: 6,
    marginHorizontal: 2,
  },
  timeStyle: {
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
    marginTop: 5,
  },
  aiRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userImg: {
    height: 29,
    width: 29,
    borderRadius: 29,
  },
  imgCon: {
    position: 'absolute',
    left: 0,
    bottom: 15,
    zIndex: 9999,
  },
  seenImageStyle: {
    width: WP(4),
    height: WP(4),
    borderRadius: WP(4),
    marginHorizontal: WP(1),
  },
  circleStyle: {
    width: WP(4),
    height: WP(4),
    borderRadius: WP(4),

    borderWidth: 0.5,
    marginHorizontal: WP(1),
  },
});
