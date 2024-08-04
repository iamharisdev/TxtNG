import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {NeumorphBox, NeumorphDivider} from '../..';
import {Icon} from '@rneui/themed';
import {useTheme} from 'react-native-paper';
import {scrWidth, size, spacing} from '../../../shared/exporter';

export const AddContactCard = ({onPress, title}) => {
  const {colors} = useTheme();
  return (
    <View style={spacing.py2}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={styles.leftCon}>
          <NeumorphBox
            width={42}
            height={42}
            borderRadius={21}
            alignItems={'center'}
            borderColor={colors.bl2}
            marginTop={12}
            justifyContent={'center'}>
            <Icon color={colors.pur2} name={'plus'} type={'entypo'} size={30} />
          </NeumorphBox>
        </TouchableOpacity>
        <View style={styles.rightCon}>
          <Text style={[styles.textStyle, {color: colors.pur2}]}>{title}</Text>
        </View>
      </View>
      <View style={styles.aiEnd}>
        <NeumorphDivider width={scrWidth / 1.35} height={2.5} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  leftCon: {
    width: '18%',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  rightCon: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: size.normal,
    fontWeight: '500',
  },
  aiEnd: {
    alignItems: 'flex-end',
  },
});
