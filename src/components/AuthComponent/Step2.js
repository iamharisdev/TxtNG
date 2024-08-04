import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {AppButton, AppInput, AuthImageBox, DropdownInput} from '..';
import {Formik} from 'formik';
import {
  appIcons,
  idList,
  setp2FormFields,
  spacing,
  step2VS,
} from '../../shared/exporter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from 'react-native-paper';

export const Step2 = ({
  onContinue,
  onPressFront,
  onPressBack,
  idType,
  onPressIdPicker,
  frontPic,
  backPic,
}) => {
  const {colors} = useTheme();
  return (
    <View>
      <Formik
        initialValues={setp2FormFields}
        onSubmit={values => {
          onContinue(values);
        }}
        validationSchema={step2VS}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
          handleReset,
          setFieldValue,
          setValues,
        }) => {
          useEffect(() => {
            getdata();
          }, []);
          useEffect(() => {
            if (idType) {
              setFieldValue('idType', idType);
            }
            if (frontPic) {
              setFieldValue('frontId', frontPic);
            }
            if (backPic) {
              setFieldValue('backId', backPic);
            }
          }, [idType, frontPic, backPic]);

          //Get Old Data
          const getdata = async () => {
            const form2 = await AsyncStorage.getItem('form2');
            if (form2) {
              setValues(JSON.parse(form2));
            }
          };

          return (
            <View>
              <DropdownInput
                title={'ID Type'}
                placeholder={values?.idType?.text || idType?.text}
                onPress={onPressIdPicker}
              />
              <AppInput
                onChangeText={handleChange('id')}
                renderErrorMessage={true}
                placeholder={'4845-CASF-AS4584'}
                value={values.id}
                onBlur={() => setFieldTouched('id')}
                blurOnSubmit={false}
                disableFullscreenUI={true}
                autoCapitalize="none"
                touched={touched.id}
                errorMessage={errors.id}
                title={'ID No.'}
                maxLength={14}
                keyboardType={'numeric'}
              />
              <AuthImageBox
                onPress={onPressFront}
                title={'Front ID'}
                icon={appIcons.idFront}
                img={values.frontId || frontPic}
                error={errors.frontId}
              />
              <AuthImageBox
                onPress={onPressBack}
                title={'Back ID'}
                icon={appIcons.idBack}
                img={values.backId || backPic}
                error={errors.backId}
              />

              <View style={spacing.py2}>
                <AppButton
                  title={'Continue'}
                  textColor={colors.white}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};
