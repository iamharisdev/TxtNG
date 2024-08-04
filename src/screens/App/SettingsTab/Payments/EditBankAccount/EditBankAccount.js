import {Alert, FlatList, SafeAreaView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {useTheme} from 'react-native-paper';
import {
  AppButton,
  AppHeader,
  AppInput,
  AppLoader,
} from '../../../../../components';
import {
  addBankAccountFormField,
  bankAccountVS,
  checkConnected,
  commonStyles,
  editBankAccountFormField,
  editBankAccountVS,
  networkText,
  spacing,
} from '../../../../../shared/exporter';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {edit_bank_request} from '../../../../../redux/actions';
import {useIsFocused} from '@react-navigation/core';
const EditBankAccount = ({navigation, route}) => {
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(null);
  const {bank_detail} = route?.params;
  const isFocus = useIsFocused();

  //Bank Account Card
  const editBankAccountHanlder = async values => {
    const isConnected = await checkConnected();
    if (isConnected) {
      setLoading(true);
      try {
        const requestBody = {
          account_holder_name: values?.fullname,
          bank_id: bank_detail?.id,
        };
        const onBankSuccess = res => {
          setLoading(false);

          Alert.alert('Success', res?.message, [
            {
              text: 'Ok',
              onPress: () => {
                navigation?.goBack();
              },
            },
          ]);
        };
        const onBankFailure = res => {
          setLoading(false);
          Alert.alert('Failed', res);
          console.log(res);
        };
        dispatch(edit_bank_request(requestBody, onBankSuccess, onBankFailure));
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Error', networkText);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.app_color,
        },
      ]}>
      <AppHeader
        barColor={colors.app_color}
        backIcon={true}
        title={'Edit Bank Account'}
        neumorph={false}
      />
      <View style={styles.contentContainer}>
        <Formik
          initialValues={editBankAccountFormField}
          onSubmit={values => {
            editBankAccountHanlder(values);
          }}
          validationSchema={editBankAccountVS}>
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
          }) => {
            useEffect(() => {
              if (isFocus) {
                setFieldValue('account_number', bank_detail?.account_number);
                setFieldValue('fullname', bank_detail?.account_holder_name);
                setFieldValue('routing_number', bank_detail?.routing_number);
              }
            }, [isFocus]);
            return (
              <KeyboardAwareScrollView
                style={commonStyles.flex1}
                contentContainerStyle={styles.inputCon}
                showsVerticalScrollIndicator={false}>
                <View style={spacing.my4}>
                  <AppInput
                    onChangeText={handleChange('fullname')}
                    renderErrorMessage={true}
                    placeholder={'Enter Account Holder Name'}
                    value={values.fullname}
                    onBlur={() => setFieldTouched('fullname')}
                    blurOnSubmit={false}
                    disableFullscreenUI={true}
                    autoCapitalize="none"
                    touched={touched.fullname}
                    errorMessage={errors.fullname}
                    title={'Account Holder Name'}
                  />
                </View>

                <AppButton
                  disabled={loading}
                  onPress={handleSubmit}
                  textColor={'white'}
                  title={'Submit'}
                />
              </KeyboardAwareScrollView>
            );
          }}
        </Formik>
      </View>
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default EditBankAccount;
