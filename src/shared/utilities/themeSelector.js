import {OrangeTheme, WhiteTheme} from '../../../Themes';

export const themeSelector = themeName => {
  if (themeName == 'White') {
    return WhiteTheme;
  } else if (themeName == 'Orange') {
    return OrangeTheme;
  }
};
