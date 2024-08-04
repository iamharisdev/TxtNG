import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from 'react-native-paper';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {
  AppButton,
  AppInput,
  AppLoader,
  AuthButton,
  AuthFooter,
  AuthHeader,
  DividerBox,
} from '../../../components';
import styles from './styles';
import {
  appIcons,
  checkConnected,
  loginFormFields,
  LoginVS,
  networkText,
  onFacebookLogin,
  onGoogleLogin,
  onAppleLogin,
  spacing,
} from '../../../shared/exporter';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {loginRequest, resendOTPRequest} from '../../../redux/actions';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Login = ({navigation}) => {
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(null);

  const onUserLogin = async values => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const form = new FormData();
      form.append('user[email]', values.email);
      form.append('user[password]', values.password);

      const loginSuccess = async res => {
        if (res?.user?.verified) {
          setLoading(false);
          navigation?.replace('App');
        } else {
          setLoading(false);
          const resendForm = new FormData();
          resendForm.append('email', values?.email);
          dispatch(
            resendOTPRequest(
              resendForm,
              res => {
                navigation?.navigate('VerifyOtp', {email: values?.email});
              },
              res => {
                Alert.alert('Error', res || 'Something went wrong!');
              },
            ),
          );
        }
      };
      const loginFailure = async res => {
        console.log(res);
        if (res == 'User not verified') {
          const resendForm = new FormData();
          resendForm.append('email', values?.email);
          dispatch(
            resendOTPRequest(
              resendForm,
              res => {
                navigation?.navigate('VerifyOtp', {email: values?.email});
              },
              res => {
                console.log(res);
                Alert.alert('Error', res || 'Something went wrong!');
              },
            ),
          );
        } else {
          GoogleSignin.signOut();
          Alert.alert('Error', res || 'Something went wrong!');
        }
        setLoading(false);
      };
      dispatch(loginRequest(form, loginSuccess, loginFailure));
    } else {
      Alert.alert('Error', networkText);
    }
  };

  return (
    <>
      <AuthHeader backText={'Login'} barColor={colors.app_color} />
      <View style={[styles.container, {backgroundColor: colors.app_color}]}>
        <View style={styles.contentContainer}>
          <Formik
            initialValues={loginFormFields}
            onSubmit={values => {
              onUserLogin(values);
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
              <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.btnContainer}>
                  {/* <AuthButton
                    onPress={() => {
                      navigation?.navigate('VerifyPhone');
                    }}
                    title={'Login with Phone'}
                    icon={appIcons.call}
                    style={styles.iconStyle}
                  /> */}
                  {Platform.OS === 'ios' ? (
                    <AuthButton
                      title={'Login with Apple'}
                      icon={appIcons.apple}
                      style={styles.iconStyle}
                      onPress={() => {
                        onAppleLogin(navigation, dispatch, setLoading);
                      }}
                    />
                  ) : null}
                  <AuthButton
                    onPress={() => {
                      onFacebookLogin(navigation, dispatch, setLoading);
                    }}
                    title={'Login with Facebook'}
                    icon={appIcons.facebook}
                    style={styles.fbIconStyle}
                  />
                  <AuthButton
                    onPress={() => {
                      onGoogleLogin(navigation, dispatch, setLoading);
                    }}
                    title={'Login with Google'}
                    icon={appIcons.google}
                    style={styles.fbIconStyle}
                  />
                </View>
                <DividerBox />
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
                    keyboardType={'email-address'}
                  />
                  <AppInput
                    onChangeText={handleChange('password')}
                    renderErrorMessage={true}
                    placeholder="Password"
                    value={values.password}
                    onBlur={() => setFieldTouched('password')}
                    blurOnSubmit={false}
                    disableFullscreenUI={true}
                    autoCapitalize="none"
                    touched={touched.password}
                    errorMessage={errors.password}
                    onSubmitEditing={handleSubmit}
                    secureTextEntry
                    title={'Password'}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      navigation?.navigate('ForgotPassword', {
                        title: 'Forgot Password',
                      });
                    }}
                    style={spacing.my2}>
                    <Text
                      style={[
                        styles.forgotStyle,
                        {
                          color: colors.pur2,
                        },
                      ]}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={spacing.mt10}>
                  <AppButton
                    onPress={handleSubmit}
                    title={'Login'}
                    textColor={colors.primary}
                    gradient_color={colors.input_linear_gradient}
                  />
                  <AuthFooter
                    title={`Don’t have an account? `}
                    subtitle={'Sign Up'}
                    onPress={() => {
                      navigation?.navigate('Register');
                    }}
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

export default Login;
