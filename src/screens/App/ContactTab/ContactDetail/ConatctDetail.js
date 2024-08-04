import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/core';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import {
  AppButton,
  AppHeader,
  AppInput,
  AppLoader,
  ImagePickerModal,
  ProfileImageBox,
} from '../../../../components';
import {
  addContactForm,
  addContactVS,
  checkConnected,
  commonStyles,
  networkText,
  profile_uri,
  spacing,
} from '../../../../shared/exporter';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {add_to_favorite_contact} from '../../../../redux/actions';

const ContactDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);

  const {contact_detail} = route?.params;

  //On add Favorite
  const addFavorite = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const form = new FormData();
      form.append('contact_id', route?.params?.contact_detail?.id);
      const onSuccess = res => {
        setLoading(false);
        console.log('On Add Contact Success', res);
        Alert.alert('Message', 'Contact Added in Favorites successfully', [
          {
            text: 'Ok',
            onPress: () => {
              navigation?.goBack();
            },
          },
        ]);
      };
      const onFailure = res => {
        setLoading(false);
        console.log('On Add Contact Failure', res);
      };
      dispatch(add_to_favorite_contact(form, onSuccess, onFailure));
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
        title={'Contact Detail'}
      />

      <Formik
        initialValues={addContactForm}
        onSubmit={values => {
          // navigation?.replace('ChooseInterest');
        }}
        validationSchema={addContactVS}>
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
            setFieldValue(
              'fullname',
              route?.params?.contact_detail?.name ||
                contact_detail?.receiver_name ||
                'username',
            );
            setFieldValue(
              'phone',
              route?.params?.contact_detail?.companion?.textng_number ||
                contact_detail?.receiver_textng_number ||
                'number',
            );
            setFieldValue(
              'image',
              route?.params?.contact_detail?.image_url ||
                contact_detail?.receiver_image_url
                ? {
                    path:
                      route?.params?.contact_detail?.image_url ||
                      contact_detail?.receiver_image_url,
                  }
                : '',
            );
          }, []);
          return (
            <KeyboardAwareScrollView
              style={{flex: 1}}
              contentContainerStyle={styles.inputCon}
              showsVerticalScrollIndicator={false}>
              <View style={[commonStyles.aiCenter, spacing.my3]}>
                <ProfileImageBox
                  img={values?.image?.path || profile_uri}
                  error={errors.image}
                />
                <AppInput
                  editable={false}
                  onChangeText={handleChange('fullname')}
                  renderErrorMessage={true}
                  placeholder={'Name'}
                  value={values.fullname}
                  onBlur={() => setFieldTouched('fullname')}
                  blurOnSubmit={false}
                  disableFullscreenUI={true}
                  autoCapitalize="none"
                  touched={touched.fullname}
                  errorMessage={errors.fullname}
                  title={'Name'}
                />
                <AppInput
                  editable={false}
                  onChangeText={handleChange('phone')}
                  renderErrorMessage={true}
                  placeholder="Phone"
                  value={`${
                    route?.params?.contact_detail?.country?.country_code ||
                    contact_detail?.user_country?.country_code
                  } (${values?.phone?.slice(0, 2)}) ${values?.phone?.slice(
                    2,
                    values?.phone?.length,
                  )}`}
                  onBlur={() => setFieldTouched('phone')}
                  blurOnSubmit={false}
                  disableFullscreenUI={true}
                  autoCapitalize="none"
                  touched={touched.phone}
                  errorMessage={errors.phone}
                  title={'Phone Number'}
                  keyboardType={'phone-pad'}
                />
              </View>
              {!route?.params?.contact_detail?.favourite && (
                <AppButton
                  onPress={() => {
                    addFavorite();
                  }}
                  title={'Add To Favourite'}
                  textColor={colors.white}
                />
              )}
            </KeyboardAwareScrollView>
          );
        }}
      </Formik>
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default ContactDetail;
