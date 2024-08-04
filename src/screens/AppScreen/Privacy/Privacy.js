import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTheme} from 'react-native-paper';
import {AuthHeader, AuthText, AppLoader, BlankField} from '../../../components';
import styles from './styles';
import {checkConnected, size} from '../../../shared/exporter';
import {get_privacy_policy} from '../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';

const Privacy = ({navigation}) => {
  const dispatch = useDispatch(null);
  const {privacy_policy} = useSelector(state => state.settings);

  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);

  const getPrivacy = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      try {
        const onSuccess = async res => {
          console.log('Get Privacy Success');
          setLoading(false);
        };

        dispatch(get_privacy_policy(onSuccess));
      } catch (error) {
        console.log('Get Theme', error);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPrivacy();
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
          <AuthText fontSize={size.h2} title={'Privacy & Policy'} />
          <ScrollView showsVerticalScrollIndicator={false}>
            {!privacy_policy ? (
              <BlankField title={'No Data Available'} />
            ) : (
              <Text
                style={[
                  styles.desc,
                  {
                    color: colors.b5,
                  },
                ]}>
                {privacy_policy || ''}
              </Text>
            )}
          </ScrollView>
        </View>
      </View>
      <AppLoader loading={loading} />
    </>
  );
};

export default Privacy;
