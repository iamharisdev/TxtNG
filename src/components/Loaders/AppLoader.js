import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';
import {useTheme} from 'react-native-paper';
import Modal from 'react-native-modal';
import {scrHeight, scrWidth} from '../../shared/exporter';
export const AppLoader = ({loader_color, loading}) => {
  const {colors} = useTheme();
  return (
    <Modal isVisible={loading} style={styles.container}>
      <SkypeIndicator size={50} color={loader_color || colors.white} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
