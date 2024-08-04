import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  appIcons,
  appImages,
  contact_list_media,
  profile_uri,
  scrWidth,
  size,
  spacing,
} from '../../../shared/exporter';
import {useTheme} from 'react-native-paper';
import {NeumorphDivider} from '../..';
import ThreeDotsMenu from '../../Menu/ThreeDotsMenu';
import CountryPicker from 'react-native-country-picker-modal';
import FastImage from 'react-native-fast-image';

export const ContactHistoryCard = ({
  username,
  time,
  key,
  iconType,
  menu_list,
  onSelect,
  profile_img,
  lastTime,
  country,
  onPress,
  blocked,
  groupImg2,
  group,
  groupImg1,
}) => {
  const {colors} = useTheme();
  return (
    <View style={spacing.py2} key={key}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.section1}>
          <Image
            source={iconType || appIcons.video1}
            style={[styles.img1Style]}
          />
        </View>
        <View style={styles.section2}>
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
                  uri: profile_img || profile_uri,
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
        <View style={styles.section3}>
          <View>
            <Text style={[styles.username, {color: colors.b1}]}>
              {username || 'Amelia John'}
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
        </View>
        <View style={styles.section4}>
          <Text
            style={[
              styles.time,
              {
                color: colors.g3,
              },
            ]}>
            {lastTime}
          </Text>
          <ThreeDotsMenu
            menu_list={menu_list}
            onSelect={onSelect}
            block={blocked}
            group={group}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.aiEnd}>
        <NeumorphDivider width={scrWidth} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  section1: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section2: {
    width: '17%',
    height: '100%',
    alignItems: 'center',
  },
  section3: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  section4: {
    width: '28%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img1Style: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  imgCon: {
    height: 45,
    width: 45,
    borderRadius: 45,
    marginRight: 15,
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
  time: {
    fontSize: size.tiny,
    fontWeight: '400',
  },

  aiEnd: {
    alignItems: 'flex-end',
    marginTop: 5,
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
});
