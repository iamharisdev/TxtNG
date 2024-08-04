import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Divider, useTheme} from 'react-native-paper';
import {
  AppButton,
  AppLoader,
  AuthHeader,
  CountryInput,
  DropdownInput,
  LangCheckBox,
  ListModal,
} from '../../../components';
import styles from './styles';

import {checkConnected, languages, networkText} from '../../../shared/exporter';
import {useDispatch, useSelector} from 'react-redux';
import {signUpRequest} from '../../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPassword = ({navigation}) => {
  const {colors} = useTheme();
  const [check, setCheck] = useState(true);
  const [country, setcountry] = useState({
    name: 'United States',
    callingCode: '1',
  });
  const [cca2, setcca2] = useState('US');
  const [showCountryPicker, setshowCountryPicker] = useState(false);
  const [language, setlanguage] = useState({text: 'English'});
  const languageRef = useRef(null);
  const [loading, setLoading] = useState(false);
  //Redux States
  const {signup_data} = useSelector(state => state.auth);

  const dispatch = useDispatch(null);
  const setCountryValue = val => {
    setcca2(val.cca2);
    setcountry(val);
    setshowCountryPicker(!showCountryPicker);
  };

  //Create Account
  const onCreateAccount = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const imgObj1 = {
        uri: signup_data?.frontImg?.path,
        type: signup_data?.frontImg?.mime,
        name: signup_data?.frontImg?.fileName || 'image',
      };
      const imgObj2 = {
        uri: signup_data?.backImg?.path,
        type: signup_data?.backImg?.mime,
        name: signup_data?.backImg?.fileName || 'image',
      };
      const img3 = {
        uri: signup_data?.selfie_pic?.path,
        type: signup_data?.selfie_pic?.mime,
        name: signup_data?.selfie_pic?.fileName || 'image',
      };
      const form = new FormData();
      if (signup_data?.type != 'social') {
        form.append('user[email]', signup_data?.email);
        form.append('user[password]', signup_data?.password);
        form.append(
          'user[password_confirmation]',
          signup_data?.password_confirmation,
        );
      }
      form.append('user[language]', language?.text);
      form.append('user[country][country_name]', country?.name);
      form.append('user[country][country_code]', `+${country?.callingCode[0]}`);
      form.append('user[country][country_cc]', cca2);
      form.append('user[image]', img3);

      form.append('user[phone_id]', signup_data?.phone?.id);
      form.append('user[name]', signup_data?.name);
      form.append('user[address_line_1]', signup_data?.address_line_1);
      form.append('user[address_line_2]', signup_data?.address_line_2);
      form.append(
        'user[id_verification_attributes][id_no]',
        signup_data?.id_no,
      );
      form.append(
        'user[id_verification_attributes][type]',
        signup_data?.id_type?.text,
      );
      form.append('user[id_verification_attributes][front_id]', imgObj1);
      form.append('user[id_verification_attributes][back_id]', imgObj2);
      const signUpSuccess = async res => {
        navigation?.replace('Terms');
        setLoading(false);
        AsyncStorage.multiRemove(['form1', 'form2']);
      };
      const signUpFailure = async res => {
        setLoading(false);
        console.log('RESPONSE:   ', res);
        Alert.alert('Error', res);
      };
      dispatch(signUpRequest(signup_data, form, signUpSuccess, signUpFailure));
    } else {
      Alert.alert('Error', networkText);
    }
  };
  return (
    <>
      <AuthHeader
        backIcon={true}
        barColor={colors.app_color}
        onPressBack={() => {
          navigation?.goBack();
        }}
      />
      <View style={[styles.container, {backgroundColor: colors.app_color}]}>
        <View style={styles.contentContainer}>
          <View>
            <Text
              style={[
                styles.h1Style,
                {
                  color: colors.b3,
                },
              ]}>
              Choose a Language
            </Text>
            <LangCheckBox
              title={'English'}
              subTitle={'Default'}
              checked={check}
              onPress={() => {
                setCheck(!check);
              }}
            />
            <Divider style={styles.divider(colors.g9)} />
            <View style={styles.inputContainer}>
              <CountryInput
                cca2={cca2}
                onSelect={val => {
                  setCountryValue(val);
                }}
                onPressCountryPicker={() => {
                  setshowCountryPicker(true);
                }}
                countryPicker={showCountryPicker}
                country={country}
                title={'Country'}
              />
            </View>
            <View style={styles.inputContainer}>
              <DropdownInput
                title={'Language'}
                onPress={() => {
                  languageRef?.current?.open();
                }}
                placeholder={language?.text}
              />
            </View>
          </View>
          <View style={styles.btnStyle}>
            <AppButton
              onPress={() => {
                onCreateAccount();
              }}
              title={'Create Account'}
              textColor={colors.white}
            />
            {/* <AppButton
              onPress={() => {
                navigation?.navigate('Terms');
              }}
              title={'Next'}
              textColor={colors.white}
            /> */}
          </View>
        </View>
      </View>
      <ListModal
        title={'Choose Language'}
        listRef={languageRef}
        list={languages}
        height={250}
        getValue={item => {
          setlanguage(item);
          languageRef?.current?.close();
          setCheck(false);
        }}
      />
      <AppLoader loading={loading} />
    </>
  );
};

export default ForgotPassword;
