import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {
  appIcons,
  emojiArray,
  family,
  scrWidth,
  size,
  WP,
} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import {AppInput, SmAppButton, XSmButton} from '..';

export const StatusModal = ({
  show,
  onPressHide,
  title,
  openEmojiModal,
  setopenEmojiModal,
  statusText,
  onPressUpdate,
  onChangeText,
  onPressEmoji,
  loading,
  value,
  placeholder,
  group,
  placeholder1,
  onChangeGroupName,
  groupName,
  title1,
  btnText,
}) => {
  const {colors} = useTheme();
  const Title = ({title}) => {
    return (
      <Text
        style={[
          styles.h1,
          {
            color: colors?.g17,
          },
        ]}>
        {title}
      </Text>
    );
  };
  return (
    <>
      <Modal
        avoidKeyboard={true}
        onBackdropPress={onPressHide}
        isVisible={show}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors?.app_color,
              height: openEmojiModal
                ? group
                  ? WP('150')
                  : WP('130')
                : group
                ? WP('100')
                : WP('78'),
            },
          ]}>
          {group && (
            <View>
              <Title title={title1} />
              <AppInput
                placeholder={placeholder1 || 'Enter Group Name'}
                value={groupName}
                onChangeText={onChangeGroupName}
                width={scrWidth / 1.26}
              />
            </View>
          )}
          <View>
            <Title title={title} />
            <AppInput
              leftIcon={
                <TouchableOpacity
                  onPress={() => {
                    setopenEmojiModal(!openEmojiModal);
                  }}>
                  <Image source={appIcons.happy} style={styles.iconStyle} />
                </TouchableOpacity>
              }
              placeholder={placeholder || 'How are you doing?'}
              value={statusText}
              onChangeText={onChangeText}
              width={scrWidth / 1.26}
            />
          </View>

          <View>
            <FlatList
              data={emojiArray}
              renderItem={({item}) => {
                return (
                  <View style={{marginRight: 15}}>
                    {item?.emoji ? (
                      <TouchableOpacity
                        onPress={() => {
                          onPressEmoji(item?.emoji);
                        }}
                        style={styles.emojiCon}>
                        <Text style={[styles.emojiStyle, {color: colors.g17}]}>
                          {item?.emoji}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <XSmButton
                        onPress={setopenEmojiModal}
                        icon={openEmojiModal ? 'minus' : 'plus'}
                      />
                    )}
                  </View>
                );
              }}
              horizontal={true}
            />
          </View>
          {openEmojiModal && (
            <View style={styles.emojilist}>
              <EmojiSelector
                showSearchBar={false}
                columns={10}
                category={Categories.all}
                onEmojiSelected={emoji => {
                  onPressEmoji(emoji);
                }}
              />
            </View>
          )}
          <View
            style={{marginTop: openEmojiModal ? 50 : 10, marginHorizontal: 15}}>
            <SmAppButton
              loading={loading}
              onPress={onPressUpdate}
              title={btnText || 'Update'}
              textColor={colors.white}
              gradient_color={colors.xsm_linear_gradient}
            />
            <SmAppButton
              onPress={onPressHide}
              gradient_color={[colors.app_color, colors.app_color]}
              title={'cancel'}
              textColor={colors.g17}
              fontFamily={family.Montserrat_Regular}
              fontSize={size.xsmall}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WP('5'),
    borderRadius: 16,
    paddingVertical: 20,
  },
  h1: {
    fontSize: size.normal,
    fontFamily: family.Montserrat_Bold,
    marginVertical: 10,
  },
  emojiStyle: {
    fontSize: size.h5,
  },
  emojiCon: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  iconStyle: {
    height: 20,
    width: 21,
    resizeMode: 'contain',
  },
  emojilist: {
    height: WP('40'),
    marginVertical: 10,
  },
});
