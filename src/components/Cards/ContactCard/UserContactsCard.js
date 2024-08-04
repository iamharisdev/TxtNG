import {
  Image,
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  appIcons,
  appImages,
  contact_list_media,
  profile_uri,
  scrWidth,
  size,
} from '../../../shared/exporter';
import {useTheme} from 'react-native-paper';
import {AppCheckBox, NeumorphDivider} from '../..';
import {Swipeable} from 'react-native-gesture-handler';
import {Icon} from '@rneui/themed';
import FastImage from 'react-native-fast-image';
import CountryPicker from 'react-native-country-picker-modal';

export const UserContactsCard = ({
  username,
  workStation,
  time,
  id,
  group,
  swipeable,
  checkBox,
  onPressCheck,
  checked,
  onPress,
  img,
  onPressDelete,
  groupImg1,
  groupImg2,
  country,
  onPressButton,
}) => {
  const {colors} = useTheme();
  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-120, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.btnCon}>
        <TouchableOpacity
          onPress={onPressDelete}
          activeOpacity={0.7}
          style={[styles.delContainer, {backgroundColor: colors.r1}]}>
          <Animated.Image
            source={appIcons.delete}
            style={[styles.delImageStyle, {transform: [{scale}]}]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View key={id}>
      <Swipeable enabled={swipeable} renderRightActions={renderRightActions}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPress}
          style={styles.container}>
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
                    uri: img || profile_uri,
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
              {!group && (
                <Image source={appImages.splashBg} style={styles.gIcon} />
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
              {username || 'username'}
            </Text>
            <Text style={[styles.workStationStyle, {color: colors.pur2}]}>
              {workStation || 'work'}
            </Text>
            <Text
              style={[
                styles.time,
                {
                  color: colors.g3,
                },
              ]}>
              {time}
            </Text>
          </View>
          {checkBox ? (
            <View
              style={[
                styles.rightCon,
                {
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                },
              ]}>
              <TouchableOpacity
                onPress={onPressCheck}
                style={[
                  styles.checkBox,
                  {
                    backgroundColor: checked ? colors.pur2 : colors.pur3,
                    borderColor: checked ? colors?.pur2 : colors.b12,
                  },
                ]}>
                {checked && <Icon name={'check'} color={colors.white} />}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.rightCon}>
              {contact_list_media?.map(item => {
                return (
                  <TouchableOpacity
                    key={item?.id}
                    onPress={() => {
                      onPressButton(item);
                    }}
                    style={[styles.iconCon, {backgroundColor: colors.pur3}]}>
                    <Image
                      style={
                        item?.id == 1
                          ? styles.imgStyle
                          : item?.id == 2
                          ? styles.imgStyle
                          : item?.id == 3
                          ? styles.imgStyle1
                          : null
                      }
                      source={item?.img}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.aiEnd}>
          <NeumorphDivider width={scrWidth / 1.35} />
        </View>
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
  leftCon: {
    width: '18%',
    paddingLeft: 5,
  },
  centerCon: {
    width: '50%',
    height: '100%',
  },
  rightCon: {
    width: '32%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgCon: {
    height: 45,
    width: 45,
    borderRadius: 45,
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
    fontSize: size.large,
    fontWeight: '400',
  },
  workStationStyle: {
    fontSize: size.xsmall,
    fontWeight: '400',
  },
  time: {
    fontSize: size.tiny,
    fontWeight: '400',
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
    bottom: 0,
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
  delContainer: {
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: '100%',
  },
  delImageStyle: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  btnCon: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 80,
    paddingVertical: 8,
  },
  checkBox: {
    height: 32,
    width: 32,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
