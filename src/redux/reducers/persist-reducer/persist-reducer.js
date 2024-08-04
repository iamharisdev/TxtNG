import * as TYPES from '../../actions/types';

const initialState = {
  app_theme: 'White',
};
const persistReducer = (state = initialState, actions) => {
  const {type, payload} = actions;
  switch (type) {
    //************App Theme Sates*************

    case TYPES.SET_APP_THEME_SUCCESS:
      return {
        ...state,
        loading: false,
        app_theme: payload,
      };

    default:
      return state;
  }
};
export default persistReducer;
