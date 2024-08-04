import {configureFonts, DefaultTheme} from 'react-native-paper';
import {fontConfig} from '../src/shared/exporter';

export const WhiteTheme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),

  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    //Primary Colr
    primary: '#FFFFFF',
    app_color: '#F1F3F6',
    walk_btn_color: '#FFFFFF',

    //Purple Color
    pur1: '#AC00FF',
    pur2: '#8A4FFF',
    pur3: '#EAE0FF',
    pur4: '#E5D8FF',
    go_1: '#FF8C42',

    //Gray
    g1: '#6F6F6F',
    g2: '#797979',
    g3: '#777E91',
    g4: '#B4B4B4',
    g5: 'rgba(30, 30, 30, 0.72)',
    g6: '#696D6D',
    g7: '#181B1B',
    g8: '#A6A6A6',
    g9: 'rgba(55, 84, 170, 0.31)',
    g10: 'rgba(0, 0, 0, 0.5)',
    g11: '#777E90',
    g12: '#C4C4C4',
    g13: 'rgba(220, 226, 242, 0.78)',
    g14: '#E9EAEC',
    g15: '#636363',
    g16: '#5E5E5E',
    g17: '#454545',
    g18: '#5D5D5D',
    g19: '#EEF2F9',
    g20: '#E1E6F3',
    g21: '#A7A9AC',
    g22: '#7A7A7A',
    g23: '#B8B8B8',
    g24: '#ECF1F4',
    g25: '#AAAAAA',
    g26: '#E9E9E9',
    g27: '#C9C9C9',
    g28: '#BCBCBC',
    g29: '#CDCDCD',
    g30: '#E2E2E2',
    g31: '#7C7C7C',
    g32: '#DEDEDE',
    g33: '#C0C0C0',
    g34: '#E3E3E3',
    g35: '#848484',
    g36: '#EAEAEA',
    g37: '#EBEEF3',
    g38: '#E7E7E7',
    g39: '#9C9CA5',
    g40: '#E0E4EA',

    //Reds
    r1: '#E33E3E',
    r2: 'red',
    r3: '#E51F4A',
    r4: '#FB2A2A',

    //Blue
    bl1: '#377DFF',
    bl2: '#E3ECF3',
    bl3: '#DCE2F2',
    bl4: 'rgba(138, 79, 255, 0.5)',

    //Clay
    c1: '#FF8C42',
    c2: 'rgba(255, 197, 41, 0.4)',

    //Black
    b1: '#000000',
    b2: '#181B1B',
    b3: '#1E1E1E',
    b4: '#353535',
    b5: '#141414',
    b6: '#373737',
    b7: '#040404',
    b8: 'rgba(0, 0, 0, 0.3)',
    b9: '#131314',
    b10: '#2E2E2E',
    b11: '#303030',
    b12: 'rgba(0, 0, 0, 0.2)',
    b13: '#1B1D21',
    b13: '#1F2937',
    b14: '#09110E',
    b15: '#1A1A1A',

    //Green
    gr1: '#38D600',
    gr2: '#4F9D69',

    //Shadow Colors
    shad1: 'rgba(0, 0, 0, 0.05)',
    shad2: 'rgba(69, 70, 92, 0.0784314)',
    shad3: 'rgba(138, 79, 255, 0.239216)',

    //Input Shadows
    input_light_shadow: 'rgba(255, 255, 255, 0.86)',
    input_dark_shadow: 'rgba(55, 84, 170, 0.2)',
    inputColor: '#F1F3F6',
    input_linear_gradient: [
      'rgba(255, 255, 255, 0.3)',
      'rgba(255, 255, 255, 0)',
      '#8A4FFF',
    ],

    //Btn Shadows
    app_btn_shadow: 'rgba(82, 69, 109, 0.18)',

    //Red Shadows
    red1_gradient: 'rgba(227, 62, 62, 0.2)',

    //White Shadwos
    white: '#FFFFFF',

    //Menu Box Shadow
    menu_box_shadow: 'rgba(0, 0, 0, 0.25)',
    //Blue Shadows
    blue_gradient: ['#9661FF', '#8A4FFF'],
    //Size Shadows
    sm_shadow_color: 'rgba(138, 79, 255, 0.239216)',
    xsm_linear_gradient: [
      'rgba(255, 255, 255, 0.3)',
      'rgba(255, 255, 255, 0)',
      'rgba(138, 79, 255, 0.5)',
    ],
    //DIAL Shadows
    dial_gradient: ['#A577FF', '#6212FF'],
    light_dial_gradient: ['#E9EAEC', '#E9EAEC'],

    //Yellow
    y1: '#FFA800',
  },
};
