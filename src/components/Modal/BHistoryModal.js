import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {useTheme} from 'react-native-paper';
import {appIcons, family, size, spacing, WP} from '../../shared/exporter';
import moment from 'moment';
import {BurnCard} from '..';
export const BHistoryModal = ({onPressHide, show, data}) => {
  const {colors} = useTheme();
  return (
    <Modal onBackdropPress={onPressHide} isVisible={show}>
      <View style={[styles.container, {backgroundColor: colors.white}]}>
        <Text style={[styles.h1, {color: colors.b1}]}>
          Burned Number History
        </Text>
        <View style={[spacing.p4]}>
          <BurnCard
            title={`(${data?.burn_number?.slice(
              0,
              2,
            )}) ${data?.burn_number?.slice(2, data?.burn_number?.length)}`}
            subtitle={`Bought Last ${moment(data?.bought_last).format(
              'MMM DD, YYYY',
            )}`}
          />
          <BurnCard
            title={` (${data?.burn_number?.slice(
              0,
              2,
            )}) ${data?.burn_number?.slice(2, data?.burn_number?.length)}`}
            subtitle={`Last Used ${moment(data?.created_at).format(
              'MMM DD, YYYY',
            )}`}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: WP('100'),
    borderRadius: 20,
    padding: WP('5'),
    width: '95%',
    alignSelf: 'center',
  },
  listStyle: {
    paddingVertical: 10,
    marginTop: 10,
  },
  h1: {
    textAlign: 'center',
    fontSize: size.normal,
    fontFamily: family.Poppins_SemiBold,
  },
});
