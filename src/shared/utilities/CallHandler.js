import {Alert, Platform} from 'react-native';
import {
  create_conversation_Request,
  get_current_conversation,
  initialize_call_service,
  initialize_group_video_call_service,
  initialize_group_voice_call_service,
  initialize_video_call_service,
} from '../../redux/actions';
import {networkText} from './constant';
import {
  checkConnected,
  _requestAudioPermission,
  _requestCameraPermission,
} from './helper';

// Video call funstions
export const _onVideoButtonPress = async (
  navigation,
  dispatch,
  item,
  setLoading,
) => {
  const check = await checkConnected();
  if (check) {
    if (Platform.OS === 'android') {
      await _requestAudioPermission();
      await _requestCameraPermission();
    }
    setLoading(true);
    const onSuccess = async res => {
      navigation?.navigate('VideoCall', {item: item});
      console.log('Connecting Success');
      setLoading(false);
    };
    const onFailure = async res => {
      Alert.alert('Error', res || 'Something went wrong!');
      setLoading(false);
    };
    const body = {
      contact_id:
        item?.contact?.contact_id || item?.contacts?.contact_id || item?.id,
    };
    dispatch(initialize_video_call_service(body, onSuccess, onFailure));
  } else {
    Alert.alert('Error', networkText);
  }
};

// Audio call funstions
export const _onAudioButtonPress = async (
  navigation,
  dispatch,
  item,
  setLoading,
) => {
  const check = await checkConnected();
  if (check) {
    setLoading(true);
    if (Platform.OS === 'android') {
      await _requestAudioPermission();
      await _requestCameraPermission();
    }
    const onSuccess = async res => {
      navigation?.navigate('VoiceCall', {item: item});
      console.log('Connecting Success');
      setLoading(false);
    };

    const onFailure = async res => {
      Alert.alert('Error', res || 'Something went wrong!');
      setLoading(false);
    };
    const body = {
      contact_id:
        item?.contact?.contact_id || item?.contacts?.contact_id || item?.id,
    };
    dispatch(initialize_call_service(body, onSuccess, onFailure));
  } else {
    Alert.alert('Error', networkText);
  }
};

// Audio Group call funstions
export const _onGroupAudioButtonPress = async (
  navigation,
  dispatch,
  item,
  setLoading,
) => {
  const check = await checkConnected();
  if (check) {
    setLoading(true);
    if (Platform.OS === 'android') {
      await _requestAudioPermission();
      await _requestCameraPermission();
    }
    const onSuccess = async res => {
      navigation?.navigate('GroupVoiceCall', {
        item: item?.conversation?.groups || item?.contacts || item?.groups,
      });
      console.log('Connecting Success');
      setLoading(false);
    };
    const onFailure = async res => {
      Alert.alert('Error', res || 'Something went wrong!');
      setLoading(false);
    };
    var form = new FormData();
    form.append('group_id', item?.group_id || item?.id);
    dispatch(initialize_group_voice_call_service(form, onSuccess, onFailure));
  } else {
    Alert.alert('Error', networkText);
  }
};

// Video Group call funstions
export const _onVideoGroupButtonPress = async (
  navigation,
  dispatch,
  item,
  setLoading,
) => {
  const check = await checkConnected();
  if (check) {
    setLoading(true);
    if (Platform.OS === 'android') {
      await _requestAudioPermission();
      await _requestCameraPermission();
    }
    const onSuccess = async res => {
      navigation?.navigate('GroupVideoCall', {item: item});
      console.log('Connecting Success');
      setLoading(false);
    };
    const onFailure = async res => {
      Alert.alert('Error', res || 'Something went wrong!');
      setLoading(false);
    };
    var form = new FormData();
    form.append('group_id', item?.group_id || item?.group?.id || item?.id);

    dispatch(initialize_group_video_call_service(form, onSuccess, onFailure));
  } else {
    Alert.alert('Error', networkText);
  }
};

//  Create Conversation
export const createConversation = async (
  navigation,
  dispatch,
  item,
  setLoading,
) => {
  const check = await checkConnected();
  if (check) {
    const requestBody = {
      title:
        item?.contact?.name ||
        item?.name ||
        item?.contacts?.name ||
        item?.participant_name,
      user_id:
        item?.contact?.user_id ||
        item?.companion?.id ||
        item?.receiver_id ||
        item?.contacts?.user_id,
    };
    setLoading(true);
    const onSuccess = res => {
      const data = {
        data: res,
        userdata: requestBody,
        item: item,
      };
      navigation?.navigate('Chat', {channel_detail: data});
      setLoading(false);
      console.log('On Create Conversation Success');
    };
    const onFailure = res => {
      setLoading(false);
    };
    dispatch(create_conversation_Request(requestBody, onSuccess, onFailure));
  } else {
    Alert.alert('Error', networkText);
  }
};

//On Create Group Conversation
export const onCreateGroupConversation = (navigation, item) => {
  navigation?.navigate('Chat', {
    channel_detail: {
      data: {conversation: item?.conversation},
    },
    type: 'group',
    groupImg: item?.group_logo || item?.conversation?.group_logo,
  });
};

export const get_conversation = async (
  navigation,
  dispatch,
  item,
  setLoading,
) => {
  const check = await checkConnected();
  if (check) {
    setLoading(true);
    const onSuccess = res => {
      setLoading(false);

      navigation?.navigate('Chat', {
        channel_detail: {
          data: res,
        },
        groupImg: res?.conversation?.group_logo,
        type: res?.conversation?.group ? 'group' : '',
      });
      console.log('On Create Conversation Success');
    };
    const onFailure = res => {
      setLoading(false);

      Alert.alert('Error', res);
    };
    dispatch(get_current_conversation(item?.id, onSuccess, onFailure));
  } else {
    Alert.alert('Error', networkText);
  }
};
