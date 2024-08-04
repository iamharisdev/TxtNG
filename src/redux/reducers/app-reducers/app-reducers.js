import * as TYPES from '../../actions/types';

const initialState = {
  all_themes: [],
  burn_numbers: [],
  burn_number: null,
  checkout_detail: null,
  all_messages: [],
  transaction_history: [],
};
const appReducer = (state = initialState, actions) => {
  const {type, payload} = actions;
  switch (type) {
    //Checkout Detail
    case TYPES.SET_ITEM_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        checkout_detail: payload,
      };
    //************Themes Sates*************
    case TYPES.GET_THEME_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        all_themes: payload,
      };

    case TYPES.GET_THEME_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        all_themes: [],
      };

    //************Burn Numbers Sates*************
    case TYPES.GET_BURN_NUMBERS_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        burn_numbers: payload?.all_burned_numbers,
      };

    case TYPES.GET_BURN_NUMBERS_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        burn_numbers: [],
      };

    case TYPES.DELETE_NUMBER_SUCCESS:
      const {burn_numbers} = state;
      const filteredItems = burn_numbers?.filter(item => {
        return item?.id != payload;
      });
      console.log(filteredItems);
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        burn_numbers: [...filteredItems],
      };

    case TYPES.DELETE_NUMBER_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        burn_numbers: state?.burn_numbers,
      };

    case TYPES.BURN_NUMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        burn_number: [],
      };

    case TYPES.BURN_NUMBER_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        burn_number: null,
      };
    //************Burn Number Sates*************

    case TYPES.GET_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        all_messages: payload,
      };

    case TYPES.GET_MESSAGE_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        all_messages: null,
      };

    //Set Messages
    case TYPES.SET_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        all_messages: [...state?.all_messages, payload],
      };

    case TYPES.SET_MESSAGE_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        all_messages: [],
      };

    //Current Messages
    case TYPES.CURRENT_MESSAGE_SUCCESS:
      for (let i = 0; i < state.all_messages.length; i++) {
        if (state.all_messages[i] == state.all_messages[payload]) {
          state.all_messages[payload].play = !state.all_messages[payload].play;
          state.all_messages[payload].loading = true;
        } else {
          state.all_messages[i].play = false;
        }
      }
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        all_messages: [...state.all_messages],
      };

    //Current Messages
    case TYPES.STOP_PLAY_SUCCESS:
      for (let i = 0; i < state.all_messages.length; i++) {
        state.all_messages[payload].play = false;
      }
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        all_messages: [...state.all_messages],
      };

    //Stop PLAYING
    case TYPES.SET_AUDIO_LOADING_SUCCESS:
      state.all_messages[payload].loading = false;
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        all_messages: [...state.all_messages],
      };

    //Stop PLAYING
    case TYPES.SET_AUDIO_DURATION_SUCCESS:
      if (payload?.id) {
        state.all_messages[payload.id].duration = payload?.progress;
      }
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        all_messages: [...state.all_messages],
      };

    case TYPES.CURRENT_MESSAGE_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        all_messages: [],
      };
    case TYPES.GET_TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        transaction_history: payload,
      };
    default:
      return state;
  }
};
export default appReducer;
