import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {
  appJSON,
  family,
  size,
  spacing,
  HP,
  WP,
  profile_uri,
} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {SmallLoader} from '..';
import CountDown from 'react-native-countdown-component';
import FastImage from 'react-native-fast-image';
export const PlayerBox = ({
  messages,
  receiver,
  onPlay,
  player,
  onPause,
  progress,
  time,
  loading,
  duration,
  isSeen,
  lottie,
  img,
}) => {
  const {colors} = useTheme();
  const lotRef = useRef();

  //Use Ref Setting
  useEffect(() => {
    if (player) {
      lotRef?.current?.play();
    }
  }, [lotRef]);

  return (
    <View>
      {receiver && (
        <View style={styles.imgCon}>
          <FastImage
            source={{uri: img || profile_uri}}
            style={styles.userImg}
          />
        </View>
      )}
      <View
        style={[
          styles.container,
          {
            alignSelf: receiver ? 'flex-start' : 'flex-end',
          },
        ]}>
        <View
          style={[
            styles.boxStyle,
            {
              marginLeft: receiver ? WP('9') : 0,
              backgroundColor: receiver ? colors?.white : colors?.pur2,
            },
          ]}>
          {!loading ? (
            <TouchableOpacity
              hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
              onPress={() => {
                if (!player) {
                  onPlay();
                  lottie?.current?.play();
                  console.log(lottie);
                } else {
                  onPause();
                }
              }}
              style={{marginRight: 5}}>
              <Ionicons
                type={'Ionicons'}
                name={!player ? 'play' : 'pause'}
                color={receiver ? colors?.b1 : colors?.white}
                size={20}
              />
            </TouchableOpacity>
          ) : (
            <View style={spacing.mr2}>
              <SmallLoader
                size={'small'}
                color={receiver ? colors.b1 : colors.white}
              />
            </View>
          )}
          <View
            style={[
              {
                height: '100%',
                width: '70%',
              },
            ]}>
            {receiver ? (
              <LottieView
                progress={0}
                ref={lotRef}
                source={appJSON.playerIcon1}
              />
            ) : (
              <LottieView
                ref={lotRef}
                progress={0}
                source={appJSON.playerIcon}
              />
            )}
          </View>
          {player ? (
            <CountDown
              size={10}
              until={progress}
              digitStyle={styles.digitStyle}
              digitTxtStyle={[styles.timerText, {color: colors.white}]}
              timeToShow={['M', 'S']}
              timeLabels={{m: null, s: null}}
            />
          ) : (
            <Text
              style={[
                styles.timeStamp,
                {color: receiver ? colors?.b1 : colors.white},
              ]}>
              {duration}
            </Text>
          )}
        </View>
      </View>
      <View
        style={[
          styles.aiRow,
          {
            marginLeft: receiver ? WP('9') : 0,
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
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 16,
    height: 66,
    paddingHorizontal: 20,
    width: '70%',
    alignSelf: 'flex-end',
  },
  timeStyle: {
    fontSize: size.tiny,
    paddingHorizontal: 5,
  },
  timeStamp: {
    fontSize: size.normal,
    fontFamily: family.Gilroy_Medium,
    marginLeft: 5,
  },
  aiRow: {
    alignItems: 'center',
    flexDirection: 'row',
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
  digitStyle: {
    backgroundColor: 'transparent',
  },
  timerText: {
    fontSize: size.normal,
    fontFamily: family.Gilroy_Medium,
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
});
