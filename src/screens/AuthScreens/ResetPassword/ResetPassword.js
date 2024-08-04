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
  networkText,
  resetFormFields,
  ResetPasswordVS,
} from '../../../shared/exporter';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {resetPassRequest} from '../../../redux/actions';
const ResetPassword = ({navigation}) => {
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const {forgotPassRes} = useSelector(state => state.auth);
  const dispatch = useDispatch(null);

  //On Submit
  const onSubmit = async values => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const requestBody = {
        password: values.password,
        password_confirmation: values.confirmPassword,
        email: forgotPassRes?.forgotRes?.email,
      };
      const resetSuccess = async res => {
        navigation?.replace('Login');
        setLoading(false);
      };
      const resetFailure = async res => {
        setLoading(false);
        Alert.alert('Error', res);
      };
      dispatch(resetPassRequest(requestBody, resetSuccess, resetFailure));
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
            initialValues={resetFormFields}
            onSubmit={values => {
              onSubmit(values);
            }}
            validationSchema={ResetPasswordVS}>
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
                    title={'Create new password'}
                    subtitle={
                      'Your password must be different from previous used password.'
                    }
                  />
                  <View style={styles.inputContainer}>
                    <AppInput
                      onChangeText={handleChange('password')}
                      renderErrorMessage={true}
                      placeholder="New Password"
                      value={values.password}
                      onBlur={() => setFieldTouched('password')}
                      blurOnSubmit={false}
                      disableFullscreenUI={true}
                      autoCapitalize="none"
                      touched={touched.password}
                      errorMessage={errors.password}
                      secureTextEntry
                      title={'New Password'}
                    />
                    <AppInput
                      onChangeText={handleChange('confirmPassword')}
                      renderErrorMessage={true}
                      placeholder="Re-type Password"
                      value={values.confirmPassword}
                      onBlur={() => setFieldTouched('confirmPassword')}
                      blurOnSubmit={false}
                      disableFullscreenUI={true}
                      autoCapitalize="none"
                      touched={touched.confirmPassword}
                      errorMessage={errors.confirmPassword}
                      onSubmitEditing={handleSubmit}
                      secureTextEntry
                      title={'Re-type Password'}
                    />
                  </View>
                </View>
                <View style={styles.btnStyle}>
                  <AppButton
                    onPress={handleSubmit}
                    title={'Set New Password'}
                    textColor={colors.white}
                  />
                </View>
              </KeyboardAwareScrollView>
            )}
          </Formik>
        </View>
      </View>
      {<AppLoader loading={loading} />}
    </>
  );
};

export default ResetPassword;
