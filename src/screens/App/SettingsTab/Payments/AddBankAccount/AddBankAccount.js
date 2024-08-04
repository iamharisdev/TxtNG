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
  networkText,
  spacing,
} from '../../../../../shared/exporter';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {add_bank_request} from '../../../../../redux/actions';
const AddBankAccount = ({navigation, route}) => {
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(null);

  //Bank Account Card
  const addBankAccountHanlder = async values => {
    const isConnected = await checkConnected();
    if (isConnected) {
      try {
        setLoading(true);
        const requestBody = {
          account_number: values?.account_number,
          country: 'US',
          currency: 'USD',
          account_holder_name: values?.fullname,
          account_holder_type: 'individual',
          routing_number: values?.routing_number,
        };
        const onBankSuccess = res => {
          setLoading(false);
          navigation?.goBack();
          console.log(res);
        };
        const onBankFailure = res => {
          setLoading(false);
          Alert.alert('Success', res);
          console.log(res);
        };
        dispatch(add_bank_request(requestBody, onBankSuccess, onBankFailure));
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
        title={'Add Bank Account'}
        neumorph={false}
      />
      <View style={styles.contentContainer}>
        <Formik
          initialValues={addBankAccountFormField}
          onSubmit={values => {
            addBankAccountHanlder(values);
          }}
          validationSchema={bankAccountVS}>
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
            return (
              <KeyboardAwareScrollView
                style={commonStyles.flex1}
                contentContainerStyle={styles.inputCon}
                showsVerticalScrollIndicator={false}>
                <View style={spacing.my4}>
                  <AppInput
                    onChangeText={handleChange('account_number')}
                    renderErrorMessage={true}
                    placeholder={'Enter Account Number'}
                    value={values.account_number}
                    onBlur={() => setFieldTouched('account_number')}
                    blurOnSubmit={false}
                    disableFullscreenUI={true}
                    autoCapitalize="none"
                    touched={touched.account_number}
                    errorMessage={errors.account_number}
                    title={'Account Number'}
                    keyboardType={'decimal-pad'}
                  />
                  <AppInput
                    onChangeText={handleChange('fullname')}
                    renderErrorMessage={true}
                    placeholder={'Enter Card Holder Name'}
                    value={values.fullname}
                    onBlur={() => setFieldTouched('fullname')}
                    blurOnSubmit={false}
                    disableFullscreenUI={true}
                    autoCapitalize="none"
                    touched={touched.fullname}
                    errorMessage={errors.fullname}
                    title={'Account Holder Name'}
                  />
                  <AppInput
                    onChangeText={handleChange('routing_number')}
                    renderErrorMessage={true}
                    placeholder={'Enter Routing Number'}
                    value={values.routing_number}
                    onBlur={() => setFieldTouched('routing_number')}
                    blurOnSubmit={false}
                    disableFullscreenUI={true}
                    autoCapitalize="none"
                    touched={touched.routing_number}
                    errorMessage={errors.routing_number}
                    title={'Routing Number'}
                    keyboardType={'decimal-pad'}
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

export default AddBankAccount;
