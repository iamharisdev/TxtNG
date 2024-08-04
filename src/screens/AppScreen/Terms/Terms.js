import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTheme} from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import {
  AppButton,
  AppCheckBox,
  AuthHeader,
  AuthText,
  AppLoader,
  BlankField,
} from '../../../components';
import styles from './styles';
import {checkConnected, HP, size} from '../../../shared/exporter';
import {useSelector, useDispatch} from 'react-redux';
import {get_Terms_And_Conditions} from '../../../redux/actions/settings-actions/settings-action';

const Terms = ({navigation, route}) => {
  const dispatch = useDispatch(null);
  const {terms_and_condition} = useSelector(state => state.settings);
  const {signup_data} = useSelector(state => state.auth);

  const {colors} = useTheme();
  const [checked, setchecked] = useState(false);

  const [loading, setLoading] = useState(false);

  const getTerms = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      try {
        const onSuccess = async res => {
          setLoading(false);
        };
        dispatch(get_Terms_And_Conditions(onSuccess));
      } catch (error) {
        console.log('Get Theme', error);
        Toast.showWithGravity(error.message, Toast.SHORT, Toast.BOTTOM);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTerms();
  }, []);
  return (
    <>
      <AuthHeader
        backIcon={true}
        barColor={colors.app_color}
        onPressBack={() => {
          navigation?.goBack();
        }}
      />
      <View style={[styles.container, {backgroundColor: colors.app_color}]}>
        <View style={styles.contentContainer}>
          <AuthText fontSize={size.h2} title={'Terms & Condition'} />
          <ScrollView showsVerticalScrollIndicator={false}>
            {!terms_and_condition ? (
              <BlankField title={'No Record Found'} />
            ) : (
              <Text
                style={[
                  styles.desc,
                  {
                    color: colors.b5,
                  },
                ]}>
                {terms_and_condition || ''}
              </Text>
            )}

            {!route?.params?.isRegister ? (
              <>
                <AppCheckBox
                  onPress={() => {
                    setchecked(!checked);
                  }}
                  checked={checked}
                  h1={'I Accept the Terms and Condition'}
                />
                <View style={styles.btnStyle}>
                  <AppButton
                    onPress={() => {
                      if (checked) {
                        if (signup_data?.type == 'social') {
                          navigation?.replace('App');
                        } else {
                          navigation?.replace('VerifyOtp', {
                            email: signup_data?.email,
                          });
                        }
                      } else {
                        Alert.alert(
                          'Meesage!',
                          'Please accept the Terms and Condition',
                        );
                      }
                    }}
                    title={'Continue'}
                    textColor={colors.white}
                  />
                </View>
              </>
            ) : (
              false
            )}
          </ScrollView>
        </View>
      </View>
      <AppLoader loading={loading} />
    </>
  );
};

export default Terms;
