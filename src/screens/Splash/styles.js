import {Platform, StyleSheet} from 'react-native';
import {family, scrWidth, size, WP} from '../../shared/exporter';
const styles = StyleSheet.create({
  container: bgColor => {
    return {
      backgroundColor: bgColor,
      flex: 1,
    };
  },
  secondContainer: bgColor => {
    return {
      flex: 0.08,
      backgroundColor: bgColor,
    };
  },
  contentContainer: bgColor => {
    return {
      flex: 0.92,
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: bgColor,
      justifyContent: 'center',
      borderBottomLeftRadius: scrWidth * 2,
      borderBottomRightRadius: scrWidth * 2,
      width: scrWidth * 2,
    };
  },
  imgStyle: {
    height: WP('36'),
    width: '100%',
    resizeMode: 'contain',
  },
  h1Style: bgColor => {
    return {
      fontSize: size.extra_huge,
      marginTop: 10,
      color: bgColor,
      fontFamily: family.Montserrat_SemiBold,
    };
  },
  h2Style: bgColor => {
    return {
      fontSize: size.medium,
      color: bgColor,
      fontFamily: family.CenturyGothic_Bold,
      paddingLeft: 10,
    };
  },

  imgCon: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondCon: {
    paddingVertical: 10,
    justifyContent: 'center',
    padding: 10,
  },
});

export default styles;
