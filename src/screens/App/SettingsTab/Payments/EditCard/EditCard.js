import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {useTheme} from 'react-native-paper';
import {
  AppButton,
  AppHeader,
  AppLoader,
  DelPaymentCard,
  PaymentCardField,
} from '../../../../../components';
import {createToken} from '@stripe/stripe-react-native';
import {
  addCardFormField,
  addCardVS,
  checkConnected,
  commonStyles,
  networkText,
  spacing,
} from '../../../../../shared/exporter';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  add_card_request,
  edit_card_request,
} from '../../../../../redux/actions';
import {useIsFocused} from '@react-navigation/core';
const EditCard = ({navigation, route}) => {
  const [check, setCheck] = useState(false);
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(null);
  const {card_detail} = route?.params;
  const isFocus = useIsFocused();

  //Edit Card
  const editCardHanlder = async values => {
    const isConnected = await checkConnected();
    if (isConnected) {
      try {
        if (check) {
          const data = await createToken({
            name: values?.fullname,
            type: 'Card',
            setupFutureUsage: 'OffSession',
          });
          if (data?.token?.id) {
            const requestBody = {
              card_id: card_detail?.id,
              token: data?.token?.id,
              card_holder_name: values?.fullname,
              save_for_future: check,
            };
            editCardRequest(requestBody);
          } else {
            setLoading(false);
            Alert.alert('Failed', 'Unable to proceed payment!');
          }
        } else {
          const requestBody = {
            card_id: card_detail?.id,
            card_holder_name: values?.fullname,
            default: card_detail?.default,
          };
          editCardRequest(requestBody);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Error', networkText);
    }
  };

  //Edit Card
  const editCardRequest = async requestBody => {
    setLoading(true);
    const onSuccess = res => {
      setLoading(false);
      navigation?.goBack();
      console.log('On Add Card Success');
    };
    const onFailure = res => {
      setLoading(false);
      Alert.alert('Error', res);
      console.log('On Add Card Failure', res);
    };
    dispatch(edit_card_request(requestBody, onSuccess, onFailure));
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
        title={'Edit Card'}
        neumorph={false}
      />
      <View style={styles.contentContainer}>
        <Formik
          initialValues={addCardFormField}
          onSubmit={values => {
            editCardHanlder(values);
          }}
          validationSchema={addCardVS}>
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
                setFieldValue('fullname', card_detail?.card_holder_name);
              }
            }, [isFocus]);

            return (
              <KeyboardAwareScrollView
                style={commonStyles.flex1}
                contentContainerStyle={styles.inputCon}
                showsVerticalScrollIndicator={false}>
                <View style={spacing.my4}>
                  <PaymentCardField
                    showBtn={true}
                    setCheck={() => {
                      setCheck(!check);
                    }}
                    check={check}
                    paymentField={check}
                    title={'Card Details'}
                    onChangeText={handleChange('fullname')}
                    renderErrorMessage={true}
                    placeholder={'Card Holder Name'}
                    value={values.fullname}
                    onBlur={() => setFieldTouched('fullname')}
                    blurOnSubmit={false}
                    touched={touched.fullname}
                    errorMessage={errors.fullname}
                    inputTtitle={'Card Holder Name'}
                  />
                </View>

                <AppButton
                  disabled={loading}
                  onPress={handleSubmit}
                  textColor={'white'}
                  title={'Edit'}
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

export default EditCard;
