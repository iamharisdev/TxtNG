import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import styles from './styles';
import {useTheme} from 'react-native-paper';
import {AppButton, AppHeader} from '../../../../../components';
import {appIcons, commonStyles, spacing} from '../../../../../shared/exporter';
import {useSelector} from 'react-redux';

const PaymentSuccess = ({navigation, route}) => {
  const {colors} = useTheme();
  const {checkout_detail} = useSelector(state => state?.appReducer);

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
        title={'Payment Successful'}
        neumorph={false}
      />
      <View style={styles.contentContainer}>
        <View style={[commonStyles.aiCenter, spacing.mt20]}>
          <ImageBackground source={appIcons.flower} style={styles.imgStyle}>
            <Image source={appIcons.tick} style={styles.iconStyle} />
          </ImageBackground>
          <Text style={[styles.h1, {color: colors.b13}]}>
            Payment Successful
          </Text>
          <Text style={[styles.h2, {color: colors.b13}]}>
            {`Your payment to a ${
              checkout_detail?.theme_id ? 'theme' : 'generate new number'
            } was successful, you can use your ${
              checkout_detail?.theme_id ? 'theme' : 'new number'
            } anytime`}
          </Text>
        </View>
        <AppButton
          textColor={colors.white}
          title={'Done'}
          onPress={() => {
            navigation?.navigate('Contacts');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PaymentSuccess;
