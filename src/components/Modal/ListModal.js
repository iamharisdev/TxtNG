import {Divider} from '@rneui/base';
import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import {family, size, WP} from '../../shared/exporter';

export const ListModal = ({listRef, list, getValue, height, title}) => {
  const {colors} = useTheme();
  const StoreList = item => {
    if (getValue) {
      getValue(item);
    }
  };

  return (
    <RBSheet
      ref={listRef}
      height={height}
      openDuration={250}
      customStyles={{
        container: styles.container,
      }}>
      <LinearGradient
        colors={colors.input_linear_gradient}
        style={styles.gradientStyle}
        start={{x: 1, y: -15}}
        end={{x: 1.3, y: 1.3}}>
        <Text style={[styles.h1, {color: colors.white}]}>{title}</Text>
        <FlatList
          data={list}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                key={index}
                style={[styles.buttonContainer]}
                onPress={() => StoreList(item)}>
                <Text style={[styles.textStyle, {color: colors.white}]}>
                  {item?.text}
                </Text>
              </TouchableOpacity>
            );
          }}
          ItemSeparatorComponent={() => {
            return <Divider />;
          }}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    // backgroundColor: colors.white,
    alignItems: 'center',
  },
  gradientStyle: {
    width: '100%',
    height: '100%',
    paddingHorizontal: WP('4'),
    paddingVertical: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginVertical: 5,
  },
  textStyle: {
    fontSize: size.h5,
    fontFamily: family.Montserrat_Medium,
  },
  h1: {
    fontSize: size.h1,
    fontFamily: family.Montserrat_SemiBold,
    textAlign: 'center',
    paddingVertical: 10,
  },
});
