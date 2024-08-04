import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import styles from './styles';
import {MyStatusBar} from '../../../../components';
import {useTheme} from 'react-native-paper';
import Contacts from '../../ContactTab/Contacts';
const Home = () => {
  const {colors} = useTheme();
  return (
    <>
      <View style={styles.container}>
        <MyStatusBar backgroundColor={'transparent'} />
        <View style={[styles.overlay, {backgroundColor: colors.b8}]} />
      </View>
    </>
  );
};

export default Home;
