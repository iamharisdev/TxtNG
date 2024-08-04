import {
  SafeAreaView,
  Text,
  Image,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from 'react-native-paper';
import styles from './styles';

import {AppHeader, DialButton} from '../../../../components';
import {appIcons, commonStyles, dial_list} from '../../../../shared/exporter';
import {Icon} from '@rneui/themed';

const DialPad = ({navigation}) => {
  const {colors} = useTheme();
  const [inputNumber, setinputNumber] = useState('');

  //Remove Text
  const removeText = () => {
    const myText = inputNumber.slice(0, -1);
    setinputNumber(myText);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.app_color,
        },
      ]}>
      <AppHeader
        barColor={colors.app_color}
        backIcon={true}
        title={'Dial Phone'}
        marginTop={10}
        onPressRight={() => {
          navigation?.navigate('VoiceCallHistory');
        }}
        rightIcon={
          <Image
            source={appIcons.history}
            style={[
              styles.iconStyle,
              {
                tintColor: colors.pur2,
              },
            ]}
          />
        }
      />
      <View style={styles.inputContainerStyle}>
        <View style={commonStyles.aiRow}>
          <TextInput
            style={[styles.inputStyle, {color: colors.b7}]}
            placeholder={'+1 (320) 584-7512'}
            placeholderTextColor={colors.b7}
            keyboardType={'phone-pad'}
            showSoftInputOnFocus={false}
            value={inputNumber}
            pointerEvents={'none'}
            selectionColor={colors?.app_color}
            selection={false}
          />
          <TouchableOpacity onPress={removeText}>
            <Icon name={'backspace'} type={'ionicons'} color={colors.pur2} />
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dial_list}
          numColumns={3}
          renderItem={({item}) => {
            return (
              <View>
                <DialButton
                  onPress={() => {
                    if (inputNumber.length < 14) {
                      setinputNumber(inputNumber.concat(item?.title));
                    }
                  }}
                  title={item.title}
                  subtitle={item.subtitle}
                  bgColor={colors.light_dial_gradient}
                />
              </View>
            );
          }}
        />
      </View>
      <View style={styles.btnCon}>
        <DialButton
          onPress={() => {
            navigation?.navigate('VoiceCall');
          }}
          bgColor={colors.dial_gradient}
        />
      </View>
    </SafeAreaView>
  );
};

export default DialPad;
