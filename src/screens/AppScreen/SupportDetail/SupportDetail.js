import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from 'react-native-paper';
import {
  AppButton,
  AuthHeader,
  AuthText,
  SupportCard,
  SupportDetailCard,
} from '../../../components';
import styles from './styles';
import {commonStyles, size, spacing} from '../../../shared/exporter';
import RNFS from 'react-native-fs';

const SupportDetail = ({navigation, route}) => {
  const {colors} = useTheme();
  const {support_detail} = route?.params;
  const [loading, setloading] = useState(false);

  //Download Multiple Files
  const downloadFiles = () => {
    const files = support_detail?.support_images;

    setloading(true);
    files.forEach(item => {
      const promise = RNFS.downloadFile({
        fromUrl: item,
        toFile: `${RNFS.DownloadDirectoryPath}/download_${Math.random()}.png`,
      });
      return promise;
    });
    setTimeout(() => {
      setloading(false);
      Alert.alert('Success', 'Downloading Completed');
    }, 5000);
  };

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
          <View style={commonStyles.flex1}>
            <View>
              <SupportDetailCard
                onPress={downloadFiles}
                item={support_detail}
                loading={loading}
              />
              {/* <SupportDetailCard onPress={downloadFiles} admin={true} /> */}
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default SupportDetail;
