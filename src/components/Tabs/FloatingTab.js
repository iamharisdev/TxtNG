import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {useTheme} from 'react-native-paper';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import {appIcons, family, size, WP} from '../../shared/exporter';
import DeviceInfo from 'react-native-device-info';
import {useNavigation} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {setOpenTabs} from '../../redux/actions';

export const FloatingTab = ({btnRef}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch(null);
  const {openTab} = useSelector(state => state?.auth);
  return (
    <>
      <View style={styles.tabStyle}>
        <ActionButton
          ref={btnRef}
          size={90}
          onPress={() => {
            dispatch(setOpenTabs(!openTab, () => {}));
          }}
          degrees={1}
          startDegree={-30}
          endDegree={-150}
          btnOutRange={colors.pur2}
          icon={
            <>
              <Image
                style={[
                  styles.imageStyle,
                  {
                    tintColor: openTab ? colors.white : colors.pur2,
                  },
                ]}
                source={appIcons.global}
              />
              <Image source={appIcons.world} style={styles.imgStyle1} />
            </>
          }
          buttonColor={colors.app_color}>
          <ActionButton.Item
            buttonColor={colors.white}
            title="store"
            onPress={() => {
              dispatch(
                setOpenTabs(false, () => {
                  navigation?.navigate('Store');
                }),
              );
            }}>
            <Text style={[styles.textStyle, {right: -40, color: colors.white}]}>
              Store
            </Text>

            <Image
              source={appIcons.store}
              style={[styles.iconStyle, {tintColor: colors.pur2}]}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={colors.white}
            title="Video Call"
            onPress={() => {
              dispatch(
                setOpenTabs(false, () => {
                  navigation?.navigate('VideoCallHistory');
                }),
              );
            }}>
            <Text style={[styles.textStyle, {right: -70, color: colors.white}]}>
              Video Call
            </Text>

            <Image
              source={appIcons.video}
              style={[styles.iconStyle, {tintColor: colors.pur2}]}
            />
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor={colors.white}
            title="Voice Call"
            onPress={() => {
              dispatch(
                setOpenTabs(false, () => {
                  navigation?.navigate('VoiceCallHistory');
                }),
              );
            }}>
            <Text style={[styles.textStyle, {left: -70, color: colors.white}]}>
              Voice Call
            </Text>
            <Image
              source={appIcons.call}
              style={[styles.iconStyle, {tintColor: colors.pur2}]}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={colors.white}
            title="Chat"
            onPress={() => {
              dispatch(
                setOpenTabs(false, () => {
                  navigation?.navigate('Inbox');
                }),
              );
            }}>
            <Text style={[styles.textStyle, {left: -40, color: colors.white}]}>
              Chat
            </Text>
            <Image
              source={appIcons.message}
              style={[styles.iconStyle, {tintColor: colors.pur2}]}
            />
          </ActionButton.Item>
        </ActionButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 77,
    width: 77,
    resizeMode: 'contain',
  },
  imgStyle1: {
    position: 'absolute',
    height: 40,
    width: 40,
    resizeMode: 'contain',
    top: 30,
    left: 30,
  },
  iconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  textStyle: {
    position: 'absolute',
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Bold,
  },
  tabStyle: {
    position: 'absolute',
    width: '100%',
    bottom: WP('15'),
    zIndex: 9999,
  },
});
