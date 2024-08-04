import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import {
  AppButton,
  AppHeader,
  AppLoader,
  GalleryCard,
  ImagePickerModal,
  NeumorphBox,
} from '../../../components';
import styles from './styles';
import {
  checkConnected,
  commonStyles,
  networkText,
  spacing,
  WP,
} from '../../../shared/exporter';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {
  messageTicket,
  ticketMessage,
} from '../../../shared/utilities/validations';
import {Post_Ticket} from '../../../redux/actions';

const CreateTicket = ({navigation}) => {
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [imageArray, setimageArray] = useState([]);

  const dispatch = useDispatch(null);

  //Gallery Handlers
  const showGallery = () => {
    setShow(false);
    setTimeout(() => {
      ImagePicker.openPicker({multiple: true, mediaType: 'photo'}).then(
        image => {
          var array3 = imageArray.concat(image);
          const distinctItems = [
            ...new Map(array3.map(item => [item['size'], item])).values(),
          ];
          setimageArray(distinctItems);

          setShow(false);
        },
      );
    }, 400);
  };
  //Camra Handlers
  const showCamera = () => {
    setShow(false);
    setTimeout(() => {
      ImagePicker.openCamera({multiple: true, mediaType: 'photo'}).then(
        image => {
          var array3 = imageArray.concat(image);
          const distinctItems = [
            ...new Map(array3.map(item => [item['size'], item])).values(),
          ];
          setimageArray(distinctItems);
          setShow(false);
        },
      );
    }, 400);
  };
  // Remove Images
  const removeImage = (index, item) => {
    imageArray.splice(index, 1);
    setimageArray(
      imageArray.filter(item => {
        return item;
      }),
    );
  };

  //  CREATE SUPPORT TICKET

  const onSubmit = async values => {
    const form = new FormData();
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      form.append('message', values.message);
      imageArray.forEach(e => {
        form.append('images[]', {
          uri: e?.path,
          name: e?.filename || 'image',
          type: e?.mime || 'image.jpg',
        });
      });

      const onSuccess = async res => {
        Alert.alert('Success', 'Ticket Created Successfully', [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
        setLoading(false);
      };

      const onFailure = async res => {
        setLoading(false);
      };
      dispatch(Post_Ticket(form, onSuccess, onFailure));
    } else {
      setLoading(false);
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
        backIcon={true}
        barColor={colors.app_color}
        onPressBack={() => {
          navigation?.goBack();
        }}
        paddingVertical={WP('2')}
        title={'Create Ticket'}
      />
      <Formik
        initialValues={ticketMessage}
        onSubmit={values => {
          onSubmit(values);
        }}
        validationSchema={messageTicket}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          handleBlur,
          handleSubmit,
          handleReset,
        }) => {
          return (
            <KeyboardAwareScrollView
              style={commonStyles.flex1}
              contentContainerStyle={styles.inputCon}
              showsVerticalScrollIndicator={false}>
              <View style={spacing.my4}>
                <Text style={[styles.title, {color: colors.g3}]}>Message</Text>
                <NeumorphBox height={210}>
                  <TextInput
                    placeholder={'What would you like to tell us?'}
                    multiline={true}
                    numberOfLines={20}
                    style={[styles.inputStyle, {color: colors.g3}]}
                    onChangeText={handleChange('message')}
                    onBlur={handleBlur('message')}
                  />
                </NeumorphBox>
                {touched.message && errors.message && (
                  <Text style={styles.warningStyle}>{errors.message}</Text>
                )}
                <GalleryCard
                  onPressImg={index => {
                    removeImage(index);
                  }}
                  imageArray={imageArray}
                  onPress={() => {
                    setShow(true);
                  }}
                />
              </View>
              <View style={spacing.mb4}>
                <AppButton
                  onPress={handleSubmit}
                  title={'Submit'}
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
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default CreateTicket;
