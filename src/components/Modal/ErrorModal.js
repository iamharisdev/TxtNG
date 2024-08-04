import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {WP, family, appIcons, size} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';

export const ErrorModal = ({show, onPressHide, title}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Modal onBackdropPress={onPressHide} isVisible={show}>
        <View style={styles.modalContainer}>
          <View>
            <Image source={appIcons.danger} style={styles.iconStyle} />
          </View>
          <Text style={[styles.title, {color: colors.b1}]}>{title}</Text>
          <Text
            onPress={onPressHide}
            style={[styles.subtitle, {color: colors.g17}]}>
            OK
          </Text>
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
  iconStyle: {
    height: 112,
    width: 112,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.large,
    marginVertical: 10,
  },
  subtitle: {
    fontSize: size.xsmall,
    fontFamily: family.Montserrat_Regular,
    marginVertical: 10,
  },
});
