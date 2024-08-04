import React from 'react';
import {View, StyleSheet} from 'react-native';
import {platformOrientedCode} from '../../shared/exporter';

const Spacer = ({androidVal, iOSVal}) => (
  <View style={styles.spacer(androidVal, iOSVal)} />
);

const styles = StyleSheet.create({
  spacer: (androidVal, iOSVal) => {
    return {
      height: platformOrientedCode(androidVal, iOSVal),
    };
  },
});

export {Spacer};
