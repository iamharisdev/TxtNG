import * as TYPES from '../../actions/types';

const initialState = {
  updateStatus: null,
  payment_card_list: [],
  pay_with_debit: null,
  pay_with_social: null,
  default_card: null,
  payment_method: null,
  bank_list: [],
  connected_account: false,
  default_bank: null,
  checkout_data: null,
  privacy_policy: null,
  terms_and_condition: null,
  faq: [],
  support: [],
};
const settingsReducer = (state = initialState, actions) => {
  const {type, payload} = actions;
  switch (type) {
    //************Login Sates*************
    case TYPES.UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        updateStatus: payload,
      };

    case TYPES.UPDATE_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        updateStatus: null,
      };
    // ****************Banks **************

    //Get Bank Success
    case TYPES.GET_BANK_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        bank_list: payload,
      };

    case TYPES.GET_BANK_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        bank_list: state?.bank_list,
      };
    // Add Bank Success
    case TYPES.ADD_BANK_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };

    case TYPES.ADD_BANK_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };

    //Edit Bank
    case TYPES.EDIT_BANK_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };

    case TYPES.EDIT_BANK_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };

    // **************** Cards **************

    // Add Card Success
    case TYPES.ADD_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };

    case TYPES.ADD_CARD_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        payment_card_list: state.payment_card_list,
      };

    // Edit Card Success
    case TYPES.EDIT_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
      };

    case TYPES.EDIT_CARD_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        payment_card_list: state.payment_card_list,
      };

    // default Card Success
    case TYPES.ADD_DEFAULT_CARD_SUCCESS:
      state.payment_card_list.map((item, index) => {
        if (index == payload.id) {
          state.payment_card_list[index].default = true;
        } else {
          state.payment_card_list[index].default = false;
        }
      });
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        payment_card_list: state.payment_card_list,
      };

    case TYPES.ADD_DEFAULT_CARD_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        payment_card_list: state.payment_card_list,
      };

    // default BANK Success
    case TYPES.ADD_DEFAULT_BANK_SUCCESS:
      state?.bank_list?.map((item, index) => {
        if (index == payload.id) {
          state.bank_list[index].default = true;
        } else {
          state.bank_list[index].default = false;
        }
      });
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        bank_list: state.bank_list,
      };

    case TYPES.ADD_DEFAULT_BANK_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        bank_list: state.bank_list,
      };

    // del bank Success
    case TYPES.DELETE_BANK_SUCCESS:
      const filteredAccountItems = state.bank_list.filter(item => {
        return item.id !== payload?.bank_id;
      });
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        bank_list: [...filteredAccountItems],
      };

    case TYPES.DELETE_BANK_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        bank_list: state?.bank_list,
      };

    // Get Default Bank Success
    case TYPES.GET_DEFAULT_BANK_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        default_bank: payload,
      };

    case TYPES.GET_DEFAULT_BANK_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        default_bank: null,
      };

    // del Card Success
    case TYPES.DELETE_CARD_SUCCESS:
      const filteredItems = state.payment_card_list.filter(item => {
        return item.id !== payload?.card_id;
      });
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        payment_card_list: [...filteredItems],
      };

    case TYPES.DELETE_CARD_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        payment_card_list: state?.payment_card_list,
      };

    // Get Card Success
    case TYPES.GET_DEFAULT_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        default_card: payload,
      };

    case TYPES.GET_DEFAULT_CARD_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        default_card: null,
      };

    //Get all card Success
    case TYPES.GET_CARD_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        payment_card_list: payload,
      };

    case TYPES.GET_CARD_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        payment_card_list: [],
      };

    //************Pay With Debit Card*************
    case TYPES.PAY_WITH_DEBIT_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        pay_with_debit: payload,
      };

    case TYPES.PAY_WITH_DEBIT_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        pay_with_debit: null,
      };
    //************Pay With Google Card*************
    case TYPES.PAY_WITH_SOCIAL_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        pay_with_social: payload,
      };

    case TYPES.PAY_WITH_SOCIAL_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        pay_with_social: null,
      };

    case TYPES.PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        payment_method: payload,
      };

    //Connected Account
    case TYPES.CHECK_CONNECTED_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        connected_account: payload,
      };

    //Checkout Data
    case TYPES.SET_CHECKOUT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        checkout_data: payload,
      };
    //Get Privacy Policy
    case TYPES.GET_PRIVACY_POLICY_PASS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        privacy_policy: payload,
      };
    //Get Terms And Conditions
    case TYPES.GET_TERMS_AND_CONDITIONS_PASS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        terms_and_condition: payload,
      };
    //Get Faqs
    case TYPES.GET_FAQS_PASS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        faq: payload,
      };
    //Get Support
    case TYPES.GET_SUPPORT_PASS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        support: payload,
      };
    //Post support Ticket
    case TYPES.POST_TICKET_PASS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        checkout_data: payload,
      };
    default:
      return state;
  }
};
export default settingsReducer;
