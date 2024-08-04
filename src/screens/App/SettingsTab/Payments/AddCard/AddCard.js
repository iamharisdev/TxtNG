import {Alert, SafeAreaView, View} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {useTheme} from 'react-native-paper';
import {
  AppButton,
  AppHeader,
  AppLoader,
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
import {add_card_request} from '../../../../../redux/actions';
const AddCard = ({navigation}) => {
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(null);

  //Add Card
  const addCardHanlder = async values => {
    const isConnected = await checkConnected();
    if (isConnected) {
      try {
        setLoading(true);
        const data = await createToken({
          name: values?.fullname,
          type: 'Card',
          setupFutureUsage: 'OffSession',
        });
        if (data?.token?.id) {
          const requestBody = {
            token: data?.token?.id,
            name: values?.fullname,
          };
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

          dispatch(add_card_request(requestBody, onSuccess, onFailure));
        } else {
          setLoading(false);

          Alert.alert('Failed', 'Unable to proceed payment!');
        }
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
        title={'Add Card'}
        neumorph={false}
      />
      <View style={styles.contentContainer}>
        <Formik
          initialValues={addCardFormField}
          onSubmit={values => {
            addCardHanlder(values);
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
          }) => (
            <KeyboardAwareScrollView
              style={commonStyles.flex1}
              contentContainerStyle={styles.inputCon}
              showsVerticalScrollIndicator={false}>
              <View style={spacing.my4}>
                <PaymentCardField
                  paymentField={true}
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
                title={'Add New Card'}
              />
            </KeyboardAwareScrollView>
          )}
        </Formik>
      </View>
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default AddCard;
