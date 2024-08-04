import {Alert, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  AppButton,
  AppLoader,
  AuthHeader,
  AuthText,
  NeumorphBox,
} from '../../../components';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import CountDown from 'react-native-countdown-component';
import {
  checkConnected,
  codeFormFields,
  CodeVS,
  family,
  networkText,
  size,
} from '../../../shared/exporter';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import {resendOTPRequest, verifyOTPRequest} from '../../../redux/actions';
const VerifyOtp = ({navigation, route}) => {
  const {colors} = useTheme();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [resendCode, setResendCode] = useState(false);
  const {userInfo} = useSelector(state => state?.auth);
  const dispatch = useDispatch(null);

  //Reference Declraration
  const ref = useRef();
  const onSubmit = async values => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const requestBody = {
        email: route?.params?.email,
        otp: values.code,
      };
      const otpSuccess = async res => {
        if (res?.user?.verified) {
          if (route?.params?.forgotScreen) {
            navigation?.replace('ResetPassword');
          } else {
            navigation?.replace('App');
          }
        } else {
          Alert.alert('Error', res?.message);
        }
        setLoading(false);
      };
      const otpFailure = async res => {
        setLoading(false);
        Alert.alert('Error', res);
      };
      dispatch(verifyOTPRequest(requestBody, otpSuccess, otpFailure));
    } else {
      Alert.alert('Error', networkText);
    }
  };

  //Resend OTP
  const resendOtp = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const resendForm = new FormData();
      resendForm.append('email', route?.params?.email);
      dispatch(
        resendOTPRequest(
          resendForm,
          res => {
            console.log('Otp', res);
            setLoading(false);
            Alert.alert('Success', res?.message);
          },
          res => {
            setLoading(false);
            Alert.alert('Error', res);
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
            initialValues={codeFormFields}
            onSubmit={values => {
              onSubmit(values);
            }}
            validationSchema={CodeVS}>
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
                    fontSizeSub={size.normal}
                    title={'Verify your Email'}
                    subtitle={`Verification code sent to your email ${route?.params?.email}`}
                  />
                  <View style={styles.inputContainer}>
                    <CodeField
                      ref={ref}
                      {...codeFieldProps}
                      value={value}
                      onChangeText={val => {
                        handleChange('code')(val);
                        setValue(val);
                      }}
                      cellCount={6}
                      onBlur={() => setFieldTouched('code')}
                      blurOnSubmit={false}
                      disableFullscreenUI={true}
                      autoCapitalize="none"
                      onSubmitEditing={handleSubmit}
                      keyboardType="number-pad"
                      textContentType="oneTimeCode"
                      renderCell={({index, symbol, isFocused}) => (
                        <NeumorphBox
                          width={44}
                          height={64}
                          alignItems={'center'}
                          justifyContent={'center'}
                          key={index.toString()}
                          onLayout={getCellOnLayoutHandler(index)}>
                          <Text style={[styles.txtStyle, {color: colors.g7}]}>
                            {symbol || (isFocused && <Cursor />)}
                          </Text>
                        </NeumorphBox>
                      )}
                    />
                    {errors.code && touched.code && (
                      <Text style={styles.errorStyle}>{errors.code}</Text>
                    )}
                  </View>
                  <TouchableOpacity
                    disabled={resendCode}
                    onPress={() => {
                      resendOtp();
                      setResendCode(true);
                    }}
                    activeOpacity={0.7}>
                    {resendCode ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          alignSelf: 'center',
                        }}>
                        <Text style={[styles.resendText, {color: colors.b1}]}>
                          Resend code {resendCode && 'in '}
                        </Text>
                        <CountDown
                          size={10}
                          until={60}
                          digitStyle={styles.digitStyle}
                          digitTxtStyle={[
                            styles.timerText,
                            {color: colors.pur1},
                          ]}
                          timeToShow={['S']}
                          onFinish={() => {
                            setResendCode(false);
                          }}
                          timeLabels={{m: null, s: null}}
                        />
                        <Text style={[styles.timerText, {color: colors.pur1}]}>
                          sec
                        </Text>
                      </View>
                    ) : (
                      <Text
                        style={[
                          styles.resendText,
                          {
                            color: colors.b1,
                          },
                        ]}>
                        Didn’t recive code?{' '}
                        <Text
                          style={[
                            styles.resendText,
                            {
                              color: colors.pur1,
                              fontFamily: family.Montserrat_Bold,
                            },
                          ]}>
                          Resend OTP
                        </Text>
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.btnStyle}>
                  <AppButton
                    onPress={handleSubmit}
                    title={'Verify'}
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

export default VerifyOtp;
