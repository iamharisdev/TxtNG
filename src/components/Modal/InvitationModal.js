import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {useTheme} from 'react-native-paper';
import {appIcons, family, size, spacing, WP} from '../../shared/exporter';
import moment from 'moment';
import {BurnCard, SmAppButton} from '..';
export const InvitationModal = ({
  onPressHide,
  show,
  onPress,
  btnText,
  title,
}) => {
  const {colors} = useTheme();
  return (
    <Modal onBackdropPress={onPressHide} isVisible={show}>
      <View style={[styles.container, {backgroundColor: colors.white}]}>
        <Text style={[styles.h1, {color: colors.b1}]}>{title}</Text>
        <View style={spacing.mt4}>
          <SmAppButton
            onPress={onPress}
            textColor={colors.white}
            title={btnText}
          />
          {onPressHide && (
            <SmAppButton
              onPress={onPressHide}
              title={'Cancel'}
              gradient_color={[colors?.white, colors.white]}
              shadowColor={colors.white}
              textColor={colors.b1}
              fontFamily={family.Poppins_SemiBold}
              fontSize={size.xsmall}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: WP('5'),
    paddingHorizontal: WP('8'),
    width: '90%',
    alignSelf: 'center',
  },

  h1: {
    textAlign: 'center',
    fontSize: size.normal,
    fontFamily: family.Poppins_SemiBold,
  },
});
