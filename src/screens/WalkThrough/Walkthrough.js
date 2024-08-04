import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import styles from './styles';
import {MyStatusBar} from '../../components';
import {appIcons, appImages, slidesData} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

const Walkthrough = ({navigation}) => {
  let slider = AppIntroSlider;
  const {colors} = useTheme();
  const [activeScreen, setActiveScreen] = useState(0);
  const {app_theme} = useSelector(state => state.persistReducer);
  //Check Theme
  const checkTheme = () => {
    if (app_theme == 'White') {
      return appImages.walk;
    } else if (app_theme == 'Orange') {
      return appImages.walkO;
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <>
        <MyStatusBar backgroundColor={colors.primary} translucent={true} />
        <ImageBackground source={checkTheme()} style={styles.bgStyle}>
          <View style={styles.imgCon}>
            <Image source={item?.image} style={styles.imgStyle} />
          </View>
          <View style={styles.textCon}>
            <Text
              style={styles.skipTextStyle(colors.g1)}
              onPress={() => {
                AsyncStorage.setItem('walkthrough', 'true').then(res => {
                  navigation.replace('Auth');
                });
              }}>
              Skip
            </Text>
          </View>
          <View style={styles.textCon2}>
            <Text style={[styles.h1Style(colors.primary)]}>{item?.title}</Text>
            <Text style={[styles.h2Style(colors.primary)]}>{item?.desc}</Text>
          </View>
        </ImageBackground>
      </>
    );
  };
  const keyExtractor = item => item.title;

  const renderPagination = activeIndex => {
    setActiveScreen(activeIndex);
    return (
      <View style={styles.paginationContainer}>
        <View style={styles.bottomRowContainer}>
          <View style={styles.paginationDots}>
            {slidesData.length > 1 &&
              slidesData.map((_, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    i === activeIndex
                      ? styles.activeDotStyle(colors.c1)
                      : styles.dotStyle(colors.c2),
                  ]}
                  onPress={() => {
                    slider?.goToSlide(i, true);
                  }}
                />
              ))}
            {/* ChooseInterest */}
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.arrowButtonContaianer(colors.c1)}
            onPress={() => {
              activeIndex === 2
                ? AsyncStorage.setItem('walkthrough', 'true').then(res => {
                    navigation.replace('Auth');
                  })
                : slider?.goToSlide(activeIndex + 1, true);
            }}>
            <Image
              source={appIcons.RightArrow}
              style={[styles.btnStyle, {tintColor: colors.walk_btn_color}]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <>
      <View style={styles.container(colors.primary)}>
        <AppIntroSlider
          data={slidesData}
          ref={ref => (slider = ref)}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          renderPagination={renderPagination}
        />
      </View>
    </>
  );
};

export default Walkthrough;
