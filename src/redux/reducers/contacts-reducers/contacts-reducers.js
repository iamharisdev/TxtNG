import * as TYPES from '../../actions/types';

const initialState = {
  contacts: [],
  isSuccess: false,
  isFailure: false,
  group_contacts: [],
  favourite_contacts: [],
  addFavorite: null,
  all_group_contacts: [],
};
const contactReducer = (state = initialState, actions) => {
  const {type, payload} = actions;
  switch (type) {
    //************Get Contacts Sates*************

    case TYPES.LIST_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        contacts: payload,
      };

    case TYPES.LIST_CONTACT_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        contacts: [],
      };

    case TYPES.DELETE_CONTACT_SUCCESS:
      const {contacts} = state;
      const filteredItems = contacts.filter(item => {
        return item?.companion?.id !== payload;
      });
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        contacts: [...filteredItems],
      };

    case TYPES.DELETE_CONTACT_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        contacts: state.contacts,
      };

    // ******End Contacts*****************

    // Group States***********
    case TYPES.GET_GROUP_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        group_contacts: payload,
      };

    case TYPES.GET_GROUP_CONTACT_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        group_contacts: [],
      };

    case TYPES.GET_GROUPS_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        all_group_contacts: payload,
      };

    case TYPES.GET_GROUPS_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        all_group_contacts: [],
      };

    case TYPES.DELETE_GROUP_CONTACT_SUCCESS:
      const {all_group_contacts} = state;
      const filteredgroupItems = all_group_contacts.filter(item => {
        return item?.id !== payload;
      });
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        all_group_contacts: [...filteredgroupItems],
      };

    case TYPES.DELETE_GROUP_CONTACT_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        all_group_contacts: state.all_group_contacts,
      };
    //End Group States***********

    //**************Favourites */

    case TYPES.DELETE_FAVOURITE_SUCCESS:
      const {favourite_contacts} = state;
      const filteredfavItems = favourite_contacts.filter(item => {
        return item?.companion?.id !== payload;
      });
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        favourite_contacts: [...filteredfavItems],
      };

    case TYPES.DELETE_FAVOURITE_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        favourite_contacts: state.favourite_contacts,
      };

    case TYPES.GET_FAVOURITE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        favourite_contacts: payload,
      };

    case TYPES.GET_FAVOURITE_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        favourite_contacts: [],
      };

    case TYPES.ADD_TO_FAVOURITE_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        favourite_contacts: payload,
      };

    case TYPES.ADD_TO_FAVOURITE_FAILURE:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        isFailure: true,
        favourite_contacts: [],
      };

    // *********End Favourites******
    case TYPES.CHECKED_CONTACT_SUCCESS:
      state?.group_contacts.push(...payload);
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        group_contacts: state?.group_contacts,
      };
    case TYPES.REMOVE_CONTACT_SUCCESS:
      state.group_contacts[payload] = undefined;
      return {
        ...state,
        loading: false,
        isSuccess: true,
        isFailure: false,
        group_contacts: state.group_contacts.filter(item => item != undefined),
      };
    default:
      return state;
  }
};
export default contactReducer;
