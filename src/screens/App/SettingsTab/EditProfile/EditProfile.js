import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from 'react-native-paper';
import {
  AppButton,
  AppInput,
  AppLoader,
  AuthHeader,
  ImagePickerModal,
  ProfileImageBox,
  StoreModal,
} from '../../../../components';
import styles from './styles';
import {
  checkConnected,
  image_options,
  networkText,
  profile_uri,
  spacing,
  updateFormFields,
  UpdateVS,
  WP,
} from '../../../../shared/exporter';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {updateUserProfile} from '../../../../redux/actions';
import {useIsFocused} from '@react-navigation/core';

const EditProfile = ({navigation}) => {
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch(null);
  const {profile_info} = useSelector(state => state?.auth);
  const isFocus = useIsFocused(null);

  //On Edit Profile
  const onSubmit = async values => {
    const check = await checkConnected();
    if (check) {
      try {
        setLoading(true);
        const imgObj = {
          uri: values?.image?.path,
          type: values?.image?.mime,
          name: values?.image?.filename || 'image',
        };
        const form = new FormData();
        form.append('user[name]', values?.fullname);
        form.append('user[image]', values?.image?.mime ? imgObj : '');
        const updateProfileSuccess = async res => {
          setLoading(false);
          Alert.alert('Success', res?.message);
        };
        const updateProfileFailure = async res => {
          Alert.alert('Failed', res);
          setLoading(false);
        };

        dispatch(
          updateUserProfile(form, updateProfileSuccess, updateProfileFailure),
        );
      } catch (error) {
        console.log(error);
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
            initialValues={updateFormFields}
            onSubmit={values => {
              onSubmit(values);
            }}
            validationSchema={UpdateVS}>
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
              useEffect(() => {
                if (isFocus) {
                  setFieldValue('fullname', profile_info?.user?.name || '');
                  setFieldValue('email', profile_info?.user?.email);
                  setFieldValue(
                    'phone',
                    `${profile_info?.user?.textng_number}`,
                  );
                  setFieldValue(
                    'image',
                    profile_info?.profile_image
                      ? {
                          path: profile_info?.profile_image,
                        }
                      : '',
                  );
                }
              }, [isFocus]);

              //Gallery Handlers
              const showGallery = () => {
                setShow(false);
                setTimeout(() => {
                  ImagePicker.openPicker(image_options).then(image => {
                    setShow(false);
                    setFieldValue('image', image);
                  });
                }, 400);
              };
              //Camra Handlers
              const showCamera = () => {
                setShow(false);
                setTimeout(() => {
                  ImagePicker.openCamera({
                    width: 300,
                    height: 400,
                  }).then(image => {
                    setShow(false);
                    setFieldValue('image', image);
                  });
                }, 400);
              };

              return (
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.imgCon}>
                    <ProfileImageBox
                      onPressEdit={() => {
                        setShow(true);
                      }}
                      img={values.image?.path || profile_uri}
                      height={125}
                      width={125}
                      error={errors.image}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <AppInput
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
                      editable={false}
                      onChangeText={handleChange('phone')}
                      renderErrorMessage={true}
                      placeholder={'Phone number'}
                      value={`${
                        profile_info?.user?.country?.country_code || '1'
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
                      title={'Generated Number'}
                      keyboardType={'phone-pad'}
                    />
                  </View>
                  <View style={spacing.pt8}>
                    <AppButton
                      onPress={handleSubmit}
                      title={'Update'}
                      textColor={colors.primary}
                      gradient_color={colors.input_linear_gradient}
                    />
                  </View>
                  {show && (
                    <ImagePickerModal
                      show={show}
                      onPressCamera={() => {
                        showCamera();
                      }}
                      onPressGallery={() => {
                        showGallery();
                      }}
                      onPressHide={() => {
                        setShow(false);
                      }}
                    />
                  )}
                </KeyboardAwareScrollView>
              );
            }}
          </Formik>
        </View>
      </View>
      {showModal && (
        <StoreModal
          title={'Update Your Email!'}
          subtitle={
            'Kindly update your email as soon as you saw this message for us to maintain your referral bonus and get more perks!'
          }
          onPress={() => {
            setShowModal(false);
            navigation.navigate('UpdateEmail');
          }}
          show={showModal}
          onPressHide={() => {
            setShowModal(false);
          }}
          paddingHorizontal={WP('5')}
          height={WP('70')}
          btnWidth={'90%'}
          btnText={'Update Email'}
        />
      )}
      <AppLoader loading={loading} />
    </>
  );
};

export default EditProfile;
