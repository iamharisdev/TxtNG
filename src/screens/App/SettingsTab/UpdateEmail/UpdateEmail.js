import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from 'react-native-paper';
import {
  AppButton,
  AppInput,
  AppLoader,
  AuthHeader,
  AuthText,
} from '../../../../components';
import styles from './styles';
import {
  profile_uri,
  WP,
  updateEmailVS,
  updateEmailField,
  spacing,
  networkText,
  checkConnected,
} from '../../../../shared/exporter';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserEmail} from '../../../../redux/actions';

const EditProfile = ({navigation}) => {
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(null);
  //On Edit Profile
  const onSubmit = async values => {
    const check = await checkConnected();
    if (check) {
      try {
        setLoading(true);
        const requestBody = {
          password: values?.password,
          old_email: values?.old_email,
          new_email: values?.new_email,
        };
        const updateProfileSuccess = async res => {
          setLoading(false);
          Alert.alert('Success', res?.message, [
            {
              text: 'OK',
              onPress: () => {
                navigation?.navigate('EditProfile');
              },
            },
          ]);
        };
        const updateProfileFailure = async res => {
          Alert.alert('Failed', res);
          setLoading(false);
        };
        dispatch(
          updateUserEmail(
            requestBody,
            updateProfileSuccess,
            updateProfileFailure,
          ),
        );
      } catch (error) {
        console.log(error);
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
        paddingVertical={WP('2')}
      />

      <View style={[styles.container, {backgroundColor: colors.app_color}]}>
        <View style={styles.contentContainer}>
          <Formik
            initialValues={updateEmailField}
            onSubmit={values => {
              onSubmit(values);
            }}
            validationSchema={updateEmailVS}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
              setFieldValue,
              handleReset,
            }) => {
              return (
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.inputContainer}>
                    <AuthText
                      title={'Update Email'}
                      subtitle={
                        'Kindly update your email as soon as you saw this message for us to maintain your referral bonus and get more perks!'
                      }
                    />
                    <AppInput
                      onChangeText={handleChange('old_email')}
                      renderErrorMessage={true}
                      placeholder={'Old Email'}
                      value={values.old_email}
                      onBlur={() => setFieldTouched('old_email')}
                      blurOnSubmit={false}
                      disableFullscreenUI={true}
                      autoCapitalize="none"
                      touched={touched.old_email}
                      errorMessage={errors.old_email}
                      title={'Old Email'}
                      keyboardType={'email-address'}
                    />
                    <AppInput
                      onChangeText={handleChange('new_email')}
                      renderErrorMessage={true}
                      placeholder={'New Email'}
                      value={values.new_email}
                      onBlur={() => setFieldTouched('new_email')}
                      blurOnSubmit={false}
                      disableFullscreenUI={true}
                      autoCapitalize="none"
                      touched={touched.new_email}
                      errorMessage={errors.new_email}
                      title={'New Email'}
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
                  </View>
                  <View style={spacing.pt20}>
                    <AppButton
                      onPress={handleSubmit}
                      title={'Update'}
                      textColor={colors.primary}
                      gradient_color={colors.input_linear_gradient}
                    />
                  </View>
                </KeyboardAwareScrollView>
              );
            }}
          </Formik>
        </View>
      </View>
      <AppLoader loading={loading} />
    </>
  );
};

export default EditProfile;
