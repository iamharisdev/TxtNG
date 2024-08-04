import * as TYPES from '../../actions/types';

const initialState = {
  allCallLogs: [],
  allRecentCallLogs: [],
  service_data: null,
  group_service_data: null,
};

const callReducer = (state = initialState, actions) => {
  const {type, payload} = actions;
  switch (type) {
    //Get all call logs
    case TYPES.GET_ALL_CALL_HISTORY_SUCCESS:
      return {
        ...state,
        allCallLogs: payload,
      };
    //Get All recent call logs
    case TYPES.GET_RECENT_CALL_LOGS_SUCCESS:
      return {
        ...state,
        allRecentCallLogs: payload,
      };
    case TYPES.BLOCK_USER_SUCCESS:
      return {
        ...state,
        allCallLogs: payload,
      };
    case TYPES.CLEAR_ALL_CALL_LOGS_SUCCESS:
      return {
        ...state,
        allCallLogs: payload,
      };

    case TYPES.INITIALIZE_CALL_SERVICE_SUCCESS:
      return {
        ...state,
        service_data: payload,
      };
    case TYPES.INITIALIZE_CALL_SERVICE_FAIL:
      return {
        ...state,
        service_data: null,
      };

    case TYPES.DESTROY_CALL_SERVICE_SUCCESS:
      return {
        ...state,
        service_data: null,
      };
    case TYPES.DESTROY_CALL_SERVICE_FAIL:
      return {
        ...state,
        service_data: state?.service_data,
      };

    case TYPES.INITIALIZE_VIDEO_CALL_SERVICE_SUCCESS:
      return {
        ...state,
        service_data: payload,
      };
    case TYPES.INITIALIZE_VIDEO_CALL_SERVICE_FAIL:
      return {
        ...state,
        service_data: null,
      };

    case TYPES.DESTROY_VIDEO_CALL_SERVICE_SUCCESS:
      return {
        ...state,
        service_data: null,
      };
    case TYPES.DESTROY_VIDEO_CALL_SERVICE_FAIL:
      return {
        ...state,
        service_data: state?.service_data,
      };

    case TYPES.INITIATE_GROUP_VOICE_CALL_SUCCESS:
      return {
        ...state,
        group_service_data: payload,
      };
    case TYPES.INITIATE_GROUP_VOICE_CALL_FAILURE:
      return {
        ...state,
        group_service_data: null,
      };

    case TYPES.DESTROY_GROUP_VOICE_CALL_SUCCESS:
      return {
        ...state,
        group_service_data: null,
      };
    case TYPES.DESTROY_GROUP_VOICE_CALL_FAILURE:
      return {
        ...state,
        group_service_data: state?.group_service_data,
      };

    case TYPES.INITIATE_GROUP_VIDEO_CALL_SUCCESS:
      return {
        ...state,
        group_service_data: payload,
      };
    case TYPES.INITIATE_GROUP_VIDEO_CALL_FAILURE:
      return {
        ...state,
        group_service_data: null,
      };

    case TYPES.DESTROY_GROUP_VIDEO_CALL_SUCCESS:
      return {
        ...state,
        group_service_data: null,
      };
    case TYPES.DESTROY_GROUP_VIDEO_CALL_FAILURE:
      return {
        ...state,
        group_service_data: state?.group_service_data,
      };

    default:
      return state;
  }
};
export default callReducer;
