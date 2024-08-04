import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import {
  AppLoader,
  AuthHeader,
  AuthText,
  ImagePickerModal,
  ListModal,
  Step1,
  Step2,
  Step3,
} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AuthStepper from '../../../components/Stepper/AuthStepper';
import {checkConnected, idList, networkText} from '../../../shared/exporter';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  getPhoneNumberRequest,
  saveSignUpDataRequset,
} from '../../../redux/actions';
import {
  checkEmailAccount,
  getPhoneNumber,
} from '../../../shared/service/AuthService';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Register = ({navigation, route}) => {
  const {colors} = useTheme();
  const {item} = route?.params;
  const [stepper, setStepper] = useState(0);
  const [show, setShow] = useState(false);
  const [idType, setidType] = useState({text: 'Resident Card'});
  const [showfront, setshowFront] = useState(false);
  const [selfiePic, setSelfiePic] = useState(null);
  const [frontPic, setfrontPic] = useState(null);
  const [backPic, setBackPic] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(null);
  const idTypeRef = useRef();
  const showLabel = () => {
    if (stepper == 0) {
      return 'Register';
    } else if (stepper == 1) {
      return 'ID Verification';
    } else if (stepper == 2) {
      return 'Selfie Authentication';
    }
  };
  //Gallery Handlers
  const showGallery = () => {
    setShow(false);
    setTimeout(() => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        mediaType: 'photo',
      }).then(image => {
        if (showfront) {
          setfrontPic(image);
        } else {
          setBackPic(image);
        }
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
        mediaType: 'photo',
      }).then(image => {
        if (showfront) {
          setfrontPic(image);
        } else {
          setBackPic(image);
        }
      });
    }, 400);
  };

  const onRegisterStep1 = async val => {
    const check = await checkConnected();
    if (check) {
      if (item?.type != 'social') {
        try {
          setLoading(true);
          const body = {
            email: val?.email,
          };
          const checkAccount = await checkEmailAccount(body);
          if (checkAccount?.data) {
            setfrontPic(null);
            setBackPic(null);
            setidType({text: 'Resident Card'});
            setStepper(stepper + 1);
            AsyncStorage.setItem('form1', JSON.stringify(val));
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
          Alert.alert('Error', error?.response?.data?.message);
          GoogleSignin.signOut();
        }
      } else {
        setfrontPic(null);
        setBackPic(null);
        setidType({text: 'Resident Card'});
        setStepper(stepper + 1);
        AsyncStorage.setItem('form1', JSON.stringify(val));
      }
    } else {
      Alert.alert('Error', networkText);
    }
  };

  const onRegisterStep2 = async val => {
    setStepper(stepper + 1);
    AsyncStorage.setItem('form2', JSON.stringify(val));
  };

  const onRegisterStep3 = async () => {
    const check = await checkConnected();
    if (check) {
      try {
        if (selfiePic) {
          setLoading(true);
          const form1 = await AsyncStorage.getItem('form1');
          const form2 = await AsyncStorage.getItem('form2');
          const step1Data = JSON.parse(form1);
          const step2Data = JSON.parse(form2);
          const res = await getPhoneNumber();
          if (res.data) {
            const requestBody = {
              email: step1Data?.email,
              password: step1Data?.password,
              password_confirmation: step1Data?.confirmPassword,
              name: step1Data?.fullname,
              address_line_1: step1Data?.address1,
              address_line_2: step1Data?.address_2,
              id_no: step2Data?.id,
              id_type: step2Data?.idType,
              frontImg: step2Data?.frontId,
              backImg: step2Data?.backId,
              phone_number: res?.data?.text_ng_number,
              selfie_pic: selfiePic,
              type: item?.type,
            };
            dispatch(
              saveSignUpDataRequset(requestBody, () => {
                dispatch(
                  getPhoneNumberRequest(null, () => {
                    setLoading(false);
                    navigation?.replace('VerifyPhone');
                  }),
                );
              }),
            );
          }
        } else {
          Alert.alert('Error', 'Please authenticate yourself!');
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      Alert.alert('Error', networkText);
    }
  };

  //Camra Handlers
  const showSelfie = () => {
    setShow(false);
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    }).then(image => {
      setSelfiePic(image);
    });
  };

  return (
    <>
      <AuthHeader
        backIcon={true}
        barColor={colors.app_color}
        onPressBack={() => {
          if (stepper == 0) {
            navigation?.goBack();
          } else {
            setStepper(stepper - 1);
          }
        }}
      />
      <View style={[styles.container, {backgroundColor: colors.app_color}]}>
        <View style={styles.contentContainer}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View>
              <AuthText textColor={colors.b6} title={showLabel()} />
              <AuthStepper stepper={stepper} />
              <View style={styles.inputContainer}>
                {stepper == 0 && (
                  <Step1
                    item={item}
                    onPressLogin={() => {
                      navigation?.replace('Login');
                    }}
                    onContinue={val => {
                      onRegisterStep1(val);
                    }}
                  />
                )}
                {stepper == 1 && (
                  <Step2
                    onContinue={val => {
                      onRegisterStep2(val);
                    }}
                    onPressIdPicker={() => {
                      idTypeRef?.current?.open();
                    }}
                    idType={idType}
                    onPressFront={() => {
                      setShow(true);
                      setshowFront(true);
                    }}
                    onPressBack={() => {
                      setShow(true);
                      setshowFront(false);
                    }}
                    frontPic={frontPic}
                    backPic={backPic}
                  />
                )}
                {stepper == 2 && (
                  <Step3
                    onNext={() => {
                      onRegisterStep3();
                    }}
                    onContinue={val => {
                      setStepper(stepper + 1);
                    }}
                    onPress={() => {
                      showSelfie();
                      setshowFront(false);
                    }}
                    selfiePic={selfiePic?.path}
                  />
                )}
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
      <ListModal
        title={'Select ID Type'}
        listRef={idTypeRef}
        list={idList}
        height={320}
        getValue={item => {
          setidType(item);
          idTypeRef?.current?.close();
        }}
      />
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
      <AppLoader loading={loading} />
    </>
  );
};

export default Register;
