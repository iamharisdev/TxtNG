export const size = {
  extra_huge: 55,
  huge: 50,
  xxxtitle: 38,
  xxtitle: 36,
  xtitle: 34,
  title: 32,
  h1: 30,
  h2: 28,
  h3: 26,
  h4: 25,
  h5: 24,
  h6: 22,
  xxxlarge: 21,
  xxlarge: 20,
  xlarge: 19,
  large: 18,
  medium: 17,
  normal: 16,
  small: 15,
  xsmall: 14,
  xxsmall: 13,
  tiny: 12,
  xtiny: 11,
  xxtiny: 10,
  xxxtiny: 9,
};

export const appRadius = {
  buttonRadius: 25,
  boxRadius: 18,
};

export const family = {
  // English Fonts
  Poppins_ThinItalic: 'Poppins-ThinItalic',
  Poppins_Thin: 'Poppins-Thin',
  Poppins_SemiBoldItalic: 'Poppins-SemiBoldItalic',
  Poppins_SemiBold: 'Poppins-SemiBold',
  Poppins_Regular: 'Poppins-Regular',
  Poppins_MediumItalic: 'Poppins-MediumItalic',
  Poppins_Medium: 'Poppins-Medium',
  Poppins_LightItalic: 'Poppins-LightItalic',
  Poppins_Light: 'Poppins-Light',
  Poppins_Italic: 'Poppins-Italic',
  Poppins_ExtraLightItalic: 'Poppins-ExtraLightItalic',
  Poppins_ExtraLight: 'Poppins-ExtraLight',
  Poppins_ExtraBoldItalic: 'Poppins-ExtraBoldItalic',
  Poppins_ExtraBold: 'Poppins-ExtraBold',
  Poppins_BoldItalic: 'Poppins-BoldItalic',
  Poppins_Bold: 'Poppins-Bold',
  Poppins_BlackItalic: 'Poppins-BlackItalic',
  Poppins_Black: 'Poppins-Black',
  Montserrat_Bold: 'Montserrat-Bold',
  Montserrat_Light: 'Montserrat-Light',
  Montserrat_Medium: 'Montserrat-Medium',
  Montserrat_Regular: 'Montserrat-Regular',
  Montserrat_SemiBold: 'Montserrat-SemiBold',
  Montserrat_SemiBold: 'Montserrat-SemiBold',
  CenturyGothic_Bold: 'CenturyGothic-Bold',
  CenturyGothic_Regular: 'CenturyGothic',
  Gilroy_Light: 'Gilroy-Light',
  Gilroy_Regular: 'Gilroy-Regular',
  Gilroy_Medium: 'Gilroy-Medium',
  Gilroy_Bold: 'Gilroy-Bold',
  Gilroy_ExtraBold: 'Gilroy-ExtraBold',
  Gilroy_SemiBold: 'Gilroy-SemiBold',
  sofia_pro: 'SofiaPro-Light',
};

const _fontConfig = {
  regular: {
    fontFamily: family.Montserrat_Regular,
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: family.Montserrat_Medium,
    fontWeight: 'normal',
  },
  light: {
    fontFamily: family.Montserrat_Light,
    fontWeight: 'normal',
  },
  bold: {
    fontFamily: family.Montserrat_Bold,
    fontWeight: 'normal',
  },
};

export const fontConfig = {
  ios: _fontConfig,
  android: _fontConfig,
};
