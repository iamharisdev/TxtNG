import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {useTheme} from 'react-native-paper';
import {WP} from '../../shared/exporter';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
export const EmojiModal = ({onPressHide, show, onPressEmoji}) => {
  const {colors} = useTheme();
  return (
    <Modal onBackdropPress={onPressHide} isVisible={show}>
      <View style={[styles.container, {backgroundColor: colors.white}]}>
        <EmojiSelector
          showSearchBar={false}
          columns={10}
          category={Categories.all}
          onEmojiSelected={emoji => {
            onPressEmoji(emoji);
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: WP('120'),
    borderRadius: 20,
    padding: WP('5'),
    width: '100%',
    paddingVertical: 50,
  },
});
