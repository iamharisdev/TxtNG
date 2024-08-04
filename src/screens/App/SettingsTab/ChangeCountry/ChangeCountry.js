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
} from '../../../../components';
import styles from './styles';
import {
  checkConnected,
  languages,
  networkText,
  responseValidator,
} from '../../../../shared/exporter';
import {useDispatch, useSelector} from 'react-redux';
import {changeLangCountryApi} from '../../../../shared/service/SettingService';

const ChangeCountry = ({navigation}) => {
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
  const dispatch = useDispatch(null);
  const {profile_info} = useSelector(state => state?.auth);
  //Change Country
  const setCountryValue = val => {
    setcca2(val.cca2);
    setcountry(val);
    setshowCountryPicker(!showCountryPicker);
  };

  //Change Language Country
  const onSubmitHandler = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      try {
        const form = new FormData();
        form.append('language', language?.text);
        form.append('country[country_name]', country?.name);
        form.append('country[country_code]', `+${country?.callingCode[0]}`);
        form.append('country[country_cc]', cca2);
        const res = await changeLangCountryApi(form);

        if (res) {
          setLoading(false);
          Alert.alert('Success', 'Info Updated Successfully', [
            {
              text: 'Ok',
              onPress: () => {
                navigation?.goBack();
              },
            },
          ]);
        }
      } catch (error) {
        setLoading(false);
        let msg = responseValidator(
          error.response.status,
          error?.response?.data,
        );
        Alert.alert('Error', msg || 'Something went wrong!');
      }
    } else {
      Alert.alert('Error', networkText);
    }
  };

  useEffect(() => {
    setCountryValue({
      name: profile_info?.user?.country?.country_name || 'United States',
      callingCode: [profile_info?.user?.country?.country_code || '1'],
      cca2: profile_info?.user?.country?.country_cc || 'US',
    });
    setlanguage({text: profile_info?.user?.language});
  }, []);

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
              Choose a Language and Country
            </Text>

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
                placeholder={language?.text || 'English'}
              />
            </View>
          </View>
          <View style={styles.btnStyle}>
            <AppButton
              onPress={() => {
                onSubmitHandler();
              }}
              title={'Update'}
              textColor={colors.white}
            />
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

export default ChangeCountry;
