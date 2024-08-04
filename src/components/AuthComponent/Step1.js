import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {AppButton, AppInput, AuthFooter, AuthText} from '..';
import {Formik} from 'formik';
import {
  ScoialStep1SignUpVS,
  SocialStep1FormFields,
  spacing,
  Step1FormFields,
  Step1SignUpVS,
  WP,
} from '../../shared/exporter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from 'react-native-paper';

export const Step1 = ({onContinue, onPressLogin, item}) => {
  const {colors} = useTheme();
  return (
    <View>
      <Formik
        initialValues={
          item?.tye == 'social' ? SocialStep1FormFields : Step1FormFields
        }
        onSubmit={values => {
          onContinue(values);
        }}
        validationSchema={
          item?.type == 'social' ? ScoialStep1SignUpVS : Step1SignUpVS
        }>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleBlur,
          handleSubmit,
          handleReset,
          setValues,
          setFieldValue,
        }) => {
          useEffect(() => {
            getdata();
            setFieldValue('fullname', item?.user?.name || '');
            setFieldValue('email', item?.user?.email || '');
            setFieldValue('address1', item?.user?.address_line_1 || '');
            setFieldValue('address2', item?.user?.address_line_1 || '');
          }, []);
          const getdata = async () => {
            const form1 = await AsyncStorage.getItem('form1');
            if (form1) {
              setValues(JSON.parse(form1));
            }
          };
          return (
            <View>
              <AppInput
                onChangeText={handleChange('fullname')}
                renderErrorMessage={true}
                placeholder={'Name'}
                value={values.fullname}
                onBlur={handleBlur('fullname')}
                blurOnSubmit={false}
                disableFullscreenUI={true}
                autoCapitalize="none"
                touched={touched.fullname}
                errorMessage={errors.fullname}
                title={'Name'}
              />
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
              {item?.type != 'social' && (
                <View>
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
                    secureTextEntry
                    title={'Password'}
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
                    secureTextEntry
                    title={'Re-type Password'}
                  />
                </View>
              )}
              <AppInput
                onChangeText={handleChange('address1')}
                renderErrorMessage={true}
                placeholder="Address Line 1"
                value={values.address1}
                onBlur={() => setFieldTouched('address1')}
                blurOnSubmit={false}
                disableFullscreenUI={true}
                autoCapitalize="none"
                touched={touched.address1}
                errorMessage={errors.address1}
                title={'Address Line 1'}
              />
              <AppInput
                onChangeText={handleChange('address2')}
                renderErrorMessage={true}
                placeholder="Address Line 2"
                value={values.address2}
                onBlur={() => setFieldTouched('address1')}
                blurOnSubmit={false}
                disableFullscreenUI={true}
                autoCapitalize="none"
                touched={touched.address2}
                errorMessage={errors.address2}
                title={'Address Line 2'}
              />
              <View style={spacing.py2}>
                <AppButton
                  title={'Continue'}
                  textColor={colors.white}
                  onPress={handleSubmit}
                />
              </View>
              <AuthFooter
                title={'Don’t have an account?'}
                subtitle={'Login'}
                onPress={onPressLogin}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};
