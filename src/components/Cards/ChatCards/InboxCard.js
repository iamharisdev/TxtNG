import {
  Image,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  appIcons,
  appImages,
  contact_list_media,
  family,
  profile_uri,
  scrWidth,
  size,
  spacing,
} from '../../../shared/exporter';
import {useTheme} from 'react-native-paper';
import {Swipeable} from 'react-native-gesture-handler';
import moment from 'moment';
import CountryPicker from 'react-native-country-picker-modal';
import FastImage from 'react-native-fast-image';

export const InboxCard = ({
  username,
  onPress,
  comments,
  key,
  onPressDelete,
  time,
  profileImg,
  unread_message,
  country,
  group,
  groupImg2,
  groupImg1,
}) => {
  console.log(groupImg1, groupImg2);
  const {colors} = useTheme();
  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity
        onPress={onPressDelete}
        activeOpacity={0.7}
        style={[styles.delContainer, {backgroundColor: colors.r1}]}>
        <Animated.Image
          source={appIcons.delete}
          style={[styles.delImageStyle, {transform: [{scale}]}]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={spacing.py1}>
      <Swipeable
        enabled={true}
        key={key}
        renderRightActions={renderRightActions}>
        <TouchableOpacity onPress={onPress} style={[styles.container]}>
          <View style={styles.leftCon}>
            <View style={styles.imgCon}>
              {group ? (
                <View style={{marginTop: 5}}>
                  <FastImage
                    source={{
                      uri: groupImg1 || profile_uri,
                      priority: FastImage.priority.high,
                    }}
                    style={[
                      styles.imageStyle1,
                      {height: groupImg2 ? 29 : 42, width: groupImg2 ? 29 : 42},
                    ]}
                  />
                  {groupImg2 ? (
                    <FastImage
                      source={{
                        uri: groupImg2 || profile_uri,
                        priority: FastImage.priority.high,
                      }}
                      style={styles.imageStyle2}
                    />
                  ) : null}
                </View>
              ) : (
                <FastImage
                  source={{
                    uri: profileImg || profile_uri,
                    priority: FastImage.priority.high,
                  }}
                  style={[
                    styles.imageStyle,
                    {
                      backgroundColor: colors.g1,
                    },
                  ]}
                />
              )}

              <View style={group ? styles.pIcon1 : styles.pIcon}>
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
          </View>
          <View style={styles.centerCon}>
            <Text style={[styles.username, {color: colors.b1}]}>
              {username || 'Amelia John'}
            </Text>
            <Text
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={[
                styles.comments,
                {
                  color: colors.g18,
                },
              ]}>
              {comments || 'Great! Thank you!'}
            </Text>
          </View>
          <View style={styles.rightCon}>
            <Text
              style={[
                styles.time,
                {
                  color: colors.g18,
                },
              ]}>
              {moment(time).format('hh:mm:A')}
            </Text>
            {unread_message != 0 && (
              <View style={styles.unReadCon}>
                <Text
                  style={[
                    styles.unReadText,
                    {
                      color: colors.white,
                    },
                  ]}>
                  {unread_message}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    height: 90,
  },
  leftCon: {
    width: '25%',
    paddingLeft: 5,
  },
  centerCon: {
    width: '60%',
    justifyContent: 'center',
  },
  rightCon: {
    width: '15%',
    alignItems: 'center',
  },
  imgCon: {
    height: 53,
    width: 53,
    borderRadius: 53,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
  },
  imageStyle1: {
    height: 29,
    width: 29,
    position: 'absolute',
    // left: 10,
    zIndex: 9999,
    borderRadius: 29,
  },
  imageStyle2: {
    height: 29,
    width: 29,
    left: 20,
    top: -8,
    borderRadius: 29,
  },
  username: {
    fontSize: size.xsmall,
    fontWeight: '400',
    fontFamily: family.Poppins_Regular,
  },

  comments: {
    fontSize: size.tiny,
    fontWeight: '400',
    marginTop: 10,
    fontFamily: family.Poppins_Regular,
  },
  aiEnd: {
    alignItems: 'flex-end',
    marginTop: 5,
  },
  iconCon: {
    height: 33,
    width: 33,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgStyle: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },

  imgStyle1: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
  gIcon: {
    position: 'absolute',
    height: 15,
    width: 15,
    resizeMode: 'contain',
    bottom: 3,
    left: 0,
  },
  pIcon: {
    position: 'absolute',
    resizeMode: 'cover',
    bottom: -5,
    right: -20,
  },
  pIcon1: {
    position: 'absolute',
    resizeMode: 'cover',
    bottom: -5,
    right: -20,
    zIndex: 9999,
  },
  time: {
    fontSize: size.xxtiny,
    fontWeight: '400',
    fontFamily: family.Poppins_Regular,
  },
  unReadCon: {
    backgroundColor: '#FF8C42',
    height: 13,
    width: 13,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  unReadText: {
    fontSize: size.xxxtiny,
    fontFamily: family.Poppins_SemiBold,
  },
  delContainer: {
    width: 56,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  delImageStyle: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
});
