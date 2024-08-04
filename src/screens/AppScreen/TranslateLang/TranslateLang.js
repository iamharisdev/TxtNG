import {View, SafeAreaView, Image, ScrollView} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from './styles';
import {AppButton, AppHeader, GroupInput, ListModal} from '../../../components';
import {useTheme} from 'react-native-paper';
import {Icon} from '@rneui/themed';
import {appImages, commonStyles, languages} from '../../../shared/exporter';

const TranslateLang = ({navigation}) => {
  const {colors} = useTheme();
  const languageRef = useRef(null);
  const friendLanguageRef = useRef(null);

  const [language, setlanguage] = useState({text: 'English'});
  const [friendLanguage, setFreindLangugae] = useState({text: 'English'});

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.app_color}]}>
      <AppHeader backIcon={true} title={'Translate'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={commonStyles.flex1}
        contentContainerStyle={styles.contentContainer}>
        <GroupInput
          paddingHorizontal={5}
          title={'Your Text Language'}
          titleColor={colors.g11}
          bgColor={colors.g40}
          editable={false}
          onPressIn={() => {
            languageRef?.current?.open();
          }}
          borderRadius={15}
          placeholder={'English'}
          value={language}
          rightIcon={
            <Icon
              name={'caretdown'}
              type={'antdesign'}
              size={15}
              color={colors.g12}
            />
          }
        />
        <View style={styles.imgCon}>
          <Image source={appImages.trans2} style={styles.imgStyle} />
        </View>
        <GroupInput
          paddingHorizontal={5}
          title={'Your Friend’s Language'}
          titleColor={colors.g11}
          bgColor={colors.g40}
          editable={false}
          onPressIn={() => {
            friendLanguageRef?.current?.open();
          }}
          value={friendLanguage}
          borderRadius={15}
          placeholder={'Filipino'}
          rightIcon={
            <Icon
              name={'caretdown'}
              type={'antdesign'}
              size={15}
              color={colors.g12}
            />
          }
        />
        <View style={styles.imgCon1}>
          <Image source={appImages.trans1} style={styles.imgStyle} />
        </View>
        <View style={styles.btnCon}>
          <AppButton
            onPress={() => {
              navigation?.goBack();
            }}
            title={'Save'}
            textColor={colors.white}
          />
        </View>
      </ScrollView>
      <ListModal
        title={'Choose Language'}
        listRef={languageRef}
        list={languages}
        height={250}
        getValue={item => {
          setlanguage(item?.text);
          languageRef?.current?.close();
        }}
      />
      <ListModal
        title={'Choose Language'}
        listRef={friendLanguageRef}
        list={languages}
        height={250}
        getValue={item => {
          setFreindLangugae(item?.text);
          friendLanguageRef?.current?.close();
        }}
      />
    </SafeAreaView>
  );
};

export default TranslateLang;
