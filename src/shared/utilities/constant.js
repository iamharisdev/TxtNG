import {appIcons, appImages, colors} from '../exporter';

const ANDROID = Platform.OS === 'android';
const IOS = Platform.OS === 'ios';
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const web_client_id =
  '878382848452-5jsu1q5gk4ung7g88bfqlqcidspe43iv.apps.googleusercontent.com';

export const video_url = '';
const swipe_config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};
let image_options = {
  width: 300,
  height: 400,
  mediaType: 'photo',
};
const stripe_publishableKey =
  'pk_test_51LOKTmGBrGIRSmDgxfKSTB9TOn6xLKkld8IKKTQNQbGXa89bUz8R0vRDrOSOsveAWqRVlRcAFaBF3XUpTB2BdJv600bKL9tsUm';
const profile_uri =
  'https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png';
const slidesData = [
  {
    key: 1,
    title: 'Chat Live With Your Teammates',
    desc: `Experience seamless communication with your family and friends`,
    image: appImages.walk1,
  },
  {
    key: 2,
    title: 'Connecting Made Easier',
    desc: `Experience seamless communication with your family and friends`,
    image: appImages.walk2,
  },
  {
    key: 3,
    title: 'Accessible Anytime, Anywhere',
    desc: `Experience seamless communication with your family and friends`,
    image: appImages.walk3,
  },
];
const languages = [{text: 'English'}];
const idList = [
  {text: 'Resident Card'},
  {text: 'National'},
  {text: 'International'},
];
const contact_headings = [
  {id: '1', text: 'Contact', img: appIcons.profile},
  {id: '2', text: 'Recents', img: appIcons.document},
  {id: '3', text: 'Favorites', img: appIcons.star},
  {id: '4', text: 'Groups', img: appIcons.group},
  {id: '5', text: 'History', img: appIcons.history},
];
const contact_list_media = [
  {id: 1, img: appIcons.call1},
  {id: 2, img: appIcons.message},
  {id: 3, img: appIcons.video},
];

const store_list = [
  {id: 1, title: 'Burn Phone Number', img: appIcons.fire},
  {id: 2, title: 'Themes', img: appIcons.box},
];
const dial_list = [
  {id: 0, title: '1', subtitle: ''},
  {id: 1, title: '2', subtitle: 'ABC'},
  {id: 2, title: '3', subtitle: 'DEF'},
  {id: 3, title: '4', subtitle: 'GHI'},
  {id: 4, title: '5', subtitle: 'JKL'},
  {id: 5, title: '6', subtitle: 'MNO'},
  {id: 6, title: '7', subtitle: 'PQRS'},
  {id: 7, title: '8', subtitle: 'TUV'},
  {id: 8, title: '9', subtitle: 'WXYZ'},
  {id: 9, title: '*', subtitle: ''},
  {id: 10, title: '0', subtitle: '.'},
  {id: 11, title: '#', subtitle: ''},
];
const themes_list = [
  {
    id: 1,
    title: '$0.99',
    subtitle: 'Moonlight White',
    btnText: 'Buy Now',
    btnColor: colors.pur1,
    edition: '',
    img: appImages.whiteTheme,
    selectedTheme: 'White',
  },
  {
    id: 2,
    title: '$2.00',
    subtitle: 'Mercury Rose',
    btnText: 'Buy Now',
    btnColor: colors.r1,
    edition: 'Special Theme',
    img: appImages.redTheme,
    selectedTheme: 'White',
  },
  {
    id: 3,
    title: '$2.00',
    subtitle: 'Galaxy Green',
    btnText: 'Buy Now',
    btnColor: colors.gr1,
    edition: 'Special Theme',
    img: appImages.greenTheme,
    selectedTheme: 'White',
  },
  {
    id: 4,
    title: '$0.99',
    subtitle: 'Lunar Yellow',
    btnText: 'Buy Now',
    btnColor: colors.y1,
    edition: '',
    img: appImages.yellowTheme,
    selectedTheme: 'White',
  },
  {
    id: 5,
    title: '$1.99',
    subtitle: 'Cosmic Blue',
    btnText: 'Buy Now',
    btnColor: colors.cbl1,
    edition: '',
    img: appImages.greenTheme,
    selectedTheme: 'White',
  },
  {
    id: 6,
    title: '$1.99',
    subtitle: 'Interstellar Peach',
    btnText: 'Buy Now',
    btnColor: colors.or1,
    edition: '',
    img: appImages.orangeTheme,
    selectedTheme: 'Orange',
  },
];
export const emojiArray = [
  {id: 1, emoji: '😂'},
  {id: 2, emoji: '❤️ '},
  {id: 3, emoji: '😅'},
  {id: 4, emoji: '😌'},
  {id: 5, emoji: '👍'},
  {id: 6, emoji: '💪'},
  {id: 7, emoji: null},
];
export const card_list = [
  {
    id: 0,
    icon: appIcons.card,
    title: 'Credit Card',
    subtitle: '**** **** **** 3456 Visa',
  },
  {
    id: 1,
    icon: appIcons.bank,
    title: 'Bank Account',
    subtitle: '12345678',
  },
  {
    id: 2,
    icon: appIcons.wallet2,
    title: 'TextNG Wallet',
    subtitle: '',
  },
  {
    id: 3,
    icon: appIcons.apple,
    title: 'Apple Pay',
    subtitle: '',
  },
  {
    id: 4,
    icon: appIcons.googlewallet,
    title: 'Google Wallet',
    subtitle: '',
  },
];
const networkText = 'Check Internet Connection';
const wallet_amount = [
  {id: 0, title: '10'},
  {id: 1, title: '30'},
  {id: 2, title: '50'},
  {id: 3, title: '100'},
  {id: 4, title: '200'},
  {id: 5, title: '400'},
  {id: 6, title: '600'},
  {id: 7, title: '800'},
  {id: 8, title: '1000'},
];
const floating_icon_list = [
  {
    id: 0,
    icon: appIcons.plus,
  },
  {
    id: 1,
    icon: appIcons.call,
  },
  {
    id: 2,
    icon: appIcons.video1,
  },
  {
    id: 3,
    icon: appIcons.wallet,
  },
  {
    id: 4,
    icon: appIcons.lang,
  },
];

export const facebookID = '1420138071803063';
export {
  ANDROID,
  IOS,
  emailRegex,
  web_client_id,
  swipe_config,
  image_options,
  profile_uri,
  stripe_publishableKey,
  slidesData,
  languages,
  idList,
  contact_headings,
  contact_list_media,
  dial_list,
  store_list,
  themes_list,
  networkText,
  wallet_amount,
  floating_icon_list,
};
