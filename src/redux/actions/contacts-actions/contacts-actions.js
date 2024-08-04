import * as TYPES from '../types';
//Get Contacts
export const get_contacts = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.LIST_CONTACT_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

//Get Mutual Contacts
export const get_mutual_contacts = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_MUTUAL_CONTACTS_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

//Get D Mutual Contacts
export const get_d_mutual_contacts = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_DMUTUAL_CONTACTS_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Add contact Action
export const add_contact = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ADD_CONTACT_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Delete contact Action
export const delete_contact = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.DELETE_CONTACT_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Checked contact Action
export const checked_contact = (params, cbSuccess) => {
  return {
    type: TYPES.CHECKED_CONTACT_REQUEST,
    params,
    cbSuccess,
  };
};

//Checked contact Action
export const remove_contact_card = (params, cbSuccess) => {
  return {
    type: TYPES.REMOVE_CONTACT_REQUEST,
    params,
    cbSuccess,
  };
};

//get group contact Action
export const get_group_contacts = (params, cbSuccess) => {
  return {
    type: TYPES.GET_GROUP_CONTACT_REQUEST,
    params,
    cbSuccess,
  };
};

//Delete Group
export const delete_group = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.DELETE_GROUP_CONTACT_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
//Add Group
export const add_group = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ADD_GROUP_CONTACT_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
//Add Group
export const edit_group = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.EDIT_GROUP_CONTACT_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Get Groups
export const get_groups = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_GROUPS_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

//Add contact to favourite
export const add_to_favorite_contact = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ADD_TO_FAVOURITE_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
// GET Favourite favourite
export const get_favorite_contact = (cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_FAVOURITE_REQUEST,
    cbSuccess,
    cbFailure,
  };
};

// Delete Favourite favourite
export const delete_favorite_contact = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.DELETE_FAVOURITE_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Remove Member
export const remove_group_member = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.REMOVE_GROUP_MEMBER_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};
