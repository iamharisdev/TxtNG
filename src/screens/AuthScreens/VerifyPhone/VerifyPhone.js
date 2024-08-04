import {Text, View, TextInput, Alert} from 'react-native';
import React, {useRef, useState} from 'react';
import {useTheme} from 'react-native-paper';
import {
  AppButton,
  AppLoader,
  AuthHeader,
  ListModal,
  PhoneListModal,
} from '../../../components';
import styles from './styles';
import {
  checkConnected,
  loginFormFields,
  LoginVS,
  networkText,
  responseValidator,
  spacing,
} from '../../../shared/exporter';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {saveSignUpDataRequset} from '../../../redux/actions';
import {createPhoneNumber} from '../../../shared/service/AuthService';
const VerifyPhone = ({navigation}) => {
  const {colors} = useTheme();
  const phoneListRef = useRef(null);
  const {signup_data, phone_list} = useSelector(state => state.auth);
  const [phone, setphone] = useState({
    text: signup_data?.phone_number,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(null);

  const onConfirmNumber = async () => {
    const check = await checkConnected();
    if (check) {
      try {
        setLoading(true);
        const requestBody = {
          new_number: phone?.text,
        };
        const res = await createPhoneNumber(requestBody);
        if (res?.data) {
          signup_data['phone'] = res?.data;
          dispatch(
            saveSignUpDataRequset(signup_data, () => {
              setLoading(false);
              navigation?.replace('ChooseLanguage');
            }),
          );
        } else {
          setLoading(false);
        }
      } catch (error) {
        let msg = responseValidator(
          error.response.status,
          error?.response?.data,
        );
        Alert.alert('Error', msg);
        setLoading(false);
      }
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
          <Formik
            initialValues={loginFormFields}
            onSubmit={values => {
              // navigation?.replace('ChooseInterest');
            }}
            validationSchema={LoginVS}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
              handleReset,
            }) => (
              <KeyboardAwareScrollView
                style={{flex: 1}}
                contentContainerStyle={styles.inputCon}
                showsVerticalScrollIndicator={false}>
                <View style={styles.inputContainer}>
                  <Text style={[styles.h1Style, {color: colors.b3}]}>
                    Here’s your
                  </Text>
                  <Text style={[styles.h1Style, {color: colors.b3}]}>
                    new TextNG number:
                  </Text>
                  <View style={styles.inputContainerStyle}>
                    <TextInput
                      editable={false}
                      style={[styles.inputStyle, {color: colors.b3}]}
                      placeholder={`(${phone?.text?.slice(
                        0,
                        2,
                      )}) ${phone?.text?.slice(2, phone?.text?.length)}`}
                      placeholderTextColor={colors.b3}
                    />
                  </View>
                  <View>
                    <Text style={[styles.h2Style, {color: colors.g5}]}>
                      If you don’t like this number, you can try again
                    </Text>
                    <Text
                      onPress={() => {
                        phoneListRef?.current?.open();
                      }}
                      style={[styles.h3Style, {color: colors.bl1}]}>
                      Choose a Different Number
                    </Text>
                  </View>
                </View>
                <View style={styles.btnStyle}>
                  <AppButton
                    title={'Confirm Your Number'}
                    textColor={colors.primary}
                    onPress={() => {
                      onConfirmNumber();
                    }}
                  />
                </View>
              </KeyboardAwareScrollView>
            )}
          </Formik>
        </View>
      </View>
      <PhoneListModal
        title={'Select Phone Number'}
        listRef={phoneListRef}
        list={phone_list}
        height={500}
        getValue={item => {
          setphone({text: item?.text_ng_number});
          phoneListRef?.current?.close();
        }}
      />
      <AppLoader loading={loading} />
    </>
  );
};

export default VerifyPhone;
