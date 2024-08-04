import {Alert, FlatList, SafeAreaView, View} from 'react-native';
import React, {useState} from 'react';
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
  image_options,
  networkText,
  spacing,
} from '../../../../shared/exporter';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch} from 'react-redux';
import {add_contact} from '../../../../redux/actions';

const AddNewContact = ({navigation}) => {
  const {colors} = useTheme();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const isFocus = useIsFocused();
  const dispatch = useDispatch(null);

  //Add Contact
  const onAddContact = async values => {
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
        form.append('name', values?.fullname);
        form.append('number', values?.phone);
        form.append('image', imgObj);

        const onAddSuccess = res => {
          Alert.alert('Success', res?.message, [
            {
              text: 'OK',
              onPress: () => {
                navigation?.goBack();
              },
            },
          ]);
          setLoading(false);
        };
        const onAddFailure = res => {
          Alert.alert('Error', res);
          setLoading(false);
        };
        dispatch(add_contact(form, onAddSuccess, onAddFailure));
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
        title={'Add to Contact'}
      />
      <Formik
        initialValues={addContactForm}
        onSubmit={values => {
          onAddContact(values);
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
            <KeyboardAwareScrollView
              style={{flex: 1}}
              contentContainerStyle={styles.inputCon}
              showsVerticalScrollIndicator={false}>
              <View style={[spacing.my3, commonStyles.aiCenter, styles.paddH5]}>
                <ProfileImageBox
                  onPressEdit={() => {
                    setShow(true);
                  }}
                  error={errors?.image}
                  img={values?.image?.path}
                />
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
                  onChangeText={handleChange('phone')}
                  renderErrorMessage={true}
                  placeholder="Phone"
                  value={values.phone}
                  onBlur={() => setFieldTouched('phone')}
                  blurOnSubmit={false}
                  disableFullscreenUI={true}
                  autoCapitalize="none"
                  touched={touched.phone}
                  errorMessage={errors.phone}
                  onSubmitEditing={handleSubmit}
                  title={'Phone Number'}
                  keyboardType={'phone-pad'}
                />
              </View>

              <View style={styles.paddH5}>
                <AppButton
                  onPress={handleSubmit}
                  title={'Save Contact'}
                  textColor={colors.white}
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

      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default AddNewContact;
