import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {WP, family, appIcons} from '../../shared/exporter';
import PropTypes from 'prop-types';
import {useTheme} from 'react-native-paper';

export const ImagePickerModal = ({
  show,
  onPressHide,
  onPressGallery,
  onPressCamera,
}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Modal onBackdropPress={onPressHide} isVisible={show}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onPressCamera} style={styles.btn}>
            <View style={styles.leftContainer}>
              <Image
                source={appIcons.themeCamera}
                style={[
                  styles.imageStyle,
                  {
                    tintColor: colors.pur1,
                  },
                ]}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.btnText, {color: colors.b1}]}>
                Take Image from Camera
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity onPress={onPressGallery} style={styles.btn}>
            <View style={styles.leftContainer}>
              <Image
                source={appIcons.gallery}
                style={[
                  styles.imageStyle,
                  {
                    tintColor: colors.pur1,
                  },
                ]}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.btnText, {color: colors?.b1}]}>
                Pick Image from Gallery
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    borderRadius: 30,
  },
  separator: {
    borderWidth: 0.5,
    width: '100%',
  },

  btn: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
  },
  btnText: {
    fontSize: WP('4'),
    fontFamily: family.Gilroy_Bold,
    paddingVertical: WP('5'),
    textAlign: 'left',
  },
  imageStyle: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  textContainer: {
    width: '85%',
  },
  leftContainer: {
    width: '15%',

    paddingVertical: WP('5'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
