import {Image, SafeAreaView, Share, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  AppHeader,
  InvitationModal,
  MyStatusBar,
  OutlineButton,
} from '../../../../components';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import {appIcons, spacing} from '../../../../shared/exporter';
const AffiliateLinks = () => {
  const {colors} = useTheme();
  const [shareModal, setshareModal] = useState(false);
  const shareLink = async () => {
    const result = await Share.share({
      title: 'TextNG',
      message: `www.playstore.com/register/bryan-123/regi...`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors?.app_color,
        },
      ]}>
      <AppHeader
        barColor={colors.app_color}
        backIcon={true}
        title={'Affiliate Link'}
        onPressRight={() => {
          // navigation?.navigate('PaymentMethod');
        }}
      />
      <View style={styles.contentContainer}>
        <Text style={[styles.h1, {color: colors.pur2}]}>
          Awesome Way To Earn!
        </Text>
        <Text style={[styles.h2, {color: colors.g22}]}>
          Share your link and make your friends download and register to TextNG
          so you can get a 10% rebate per person.{' '}
        </Text>
        <View style={spacing.mt10}>
          <OutlineButton
            onPress={() => {
              setshareModal(true);
            }}
            leftIcon={
              <Image
                style={[styles.iconStyle, {tintColor: colors?.pur2}]}
                source={appIcons.share}
              />
            }
            title={'www.playstore.com/register/bryan-123/regi...'}
          />
        </View>
      </View>
      <InvitationModal
        show={shareModal}
        title={'Invite Friends & Family to download TextNG App'}
        onPressHide={() => {
          setshareModal(false);
        }}
        onPress={() => {
          setshareModal(false);
          setTimeout(() => {
            shareLink();
          }, 500);
        }}
        btnText={'Send Link'}
      />
    </SafeAreaView>
  );
};

export default AffiliateLinks;
