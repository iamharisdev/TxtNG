import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from 'react-native-paper';
import {
  AppButton,
  AppInput,
  AppLoader,
  AuthHeader,
  AuthText,
} from '../../../components';
import styles from './styles';
import {
  checkConnected,
  forgotFormFields,
  ForgotPasswordVS,
  networkText,
} from '../../../shared/exporter';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {forgotPassRequest} from '../../../redux/actions/auth-actions/auth-action';
const ForgotPassword = ({navigation, route}) => {
  const title = route?.params?.title;

  const [loading, setLoading] = useState(false);
  const {colors} = useTheme();
  const dispatch = useDispatch(null);

  //On Submit
  const onSubmit = async values => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const body = {
        forgotRes: values,
      };
      dispatch(
        forgotPassRequest(
          body,
          res => {
            console.log(res);
            setLoading(false);
            navigation?.navigate('VerifyOtp', {
              email: values?.email,
              forgotScreen: true,
            });
          },
          res => {
            Alert.alert('Error', res);
            setLoading(false);
          },
        ),
      );
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
            initialValues={forgotFormFields}
            onSubmit={values => {
              onSubmit(values);
            }}
            validationSchema={ForgotPasswordVS}>
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
                <View>
                  <AuthText
                    title={title}
                    subtitle={
                      'Enter your email ID  or phone number associated with your account and we’ll send an verification code for reset your password'
                    }
                  />
                  <View style={styles.inputContainer}>
                    <AppInput
                      onChangeText={handleChange('email')}
                      renderErrorMessage={true}
                      placeholder={'Email'}
                      value={values.email}
                      onBlur={() => setFieldTouched('email')}
                      blurOnSubmit={false}
                      disableFullscreenUI={true}
                      autoCapitalize="none"
                      touched={touched.email}
                      errorMessage={errors.email}
                      title={'Email'}
                    />
                  </View>
                </View>
                <View style={styles.btnStyle}>
                  <AppButton
                    onPress={handleSubmit}
                    title={'Send'}
                    textColor={colors.white}
                  />
                </View>
              </KeyboardAwareScrollView>
            )}
          </Formik>
        </View>
      </View>
      <AppLoader loading={loading} />
    </>
  );
};

export default ForgotPassword;
