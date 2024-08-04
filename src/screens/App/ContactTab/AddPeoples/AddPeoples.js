import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/core';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import {
  AppButton,
  AppHeader,
  AppLoader,
  SearchInput,
  SimpleButton,
  UserContactsCard,
} from '../../../../components';
import {
  checkConnected,
  networkText,
  scrWidth,
  size,
} from '../../../../shared/exporter';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {
  checked_contact,
  get_d_mutual_contacts,
  get_mutual_contacts,
} from '../../../../redux/actions';
import moment from 'moment';

const AddPeoples = ({navigation, route}) => {
  const {colors} = useTheme();
  const isFocus = useIsFocused();
  const dispatch = useDispatch(null);
  const [searchText, setSearchText] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const {group_contacts} = useSelector(state => state?.contactReducer);

  //Get All Contacts
  useEffect(() => {
    if (isFocus) {
      if (route?.params?.group_detail) {
        get_all_mutual_contacts();
      } else {
        get_all_contacts();
      }
    }
  }, [isFocus]);
  //Get all Contacts
  const get_all_contacts = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const onSuccess = res => {
        const result = res.filter(
          c => !group_contacts.some(s => s.companion?.id === c?.companion?.id),
        );
        setContacts(result);
        setFilteredContacts(result);
        console.log('On Get Mutual Contact Success');
        setLoading(false);
      };
      const onFailure = res => {
        console.log('On Get Mutual Contact Failure', res);
        setLoading(false);
      };
      dispatch(get_mutual_contacts(onSuccess, onFailure));
    } else {
      Alert.alert('Error', networkText);
    }
  };

  //Get all Mutual Contacts
  const get_all_mutual_contacts = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const onSuccess = res => {
        const result = res.filter(
          c => !group_contacts.some(s => s.companion?.id === c?.companion?.id),
        );
        setContacts(result);
        setFilteredContacts(result);
        console.log('On Get Mutual Contact Success');
        setLoading(false);
      };
      const onFailure = res => {
        console.log('On Get Mutual Contact Failure', res);
        setLoading(false);
      };
      dispatch(
        get_d_mutual_contacts(
          route?.params?.group_detail?.id,
          onSuccess,
          onFailure,
        ),
      );
    } else {
      Alert.alert('Error', networkText);
    }
  };

  //On Press Check
  const onPressCheck = index => {
    contacts[index].checked = !contacts[index].checked;
    setContacts([...contacts]);
  };

  //Search Items
  const searchItem = search => {
    let searchData = [];
    searchData = filteredContacts?.filter(item => {
      return item?.name?.toUpperCase().includes(search.toUpperCase());
    });
    setSearchText(search);
    setContacts(searchData);
  };

  //On Press Save
  const onPressSave = () => {
    dispatch(
      checked_contact(
        contacts?.filter(item => item?.checked),
        () => {
          navigation?.goBack();
        },
      ),
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.app_color,
        },
      ]}>
      <AppHeader
        barColor={colors.app_color}
        backIcon={true}
        title={'Add people to group'}
      />

      <KeyboardAwareScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.inputCon}
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 0.99}}>
          <SearchInput
            onChangeText={text => {
              searchItem(text);
            }}
            value={searchText}
            inputWidth={scrWidth / 1.12}
          />
          <Text
            style={[
              styles.headingStyle,
              {
                color: colors.b1,
              },
            ]}>
            Suggested Contacts
          </Text>
          <SimpleButton
            onPress={() => {
              navigation?.navigate('AddNewContact');
            }}
            title={'Enter number'}
            selectedItem={'Enter number'}
            alignItems={'center'}
            justifyContent={'center'}
            fontSize={size.normal}
          />
          <View style={styles.listStyle}>
            <FlatList
              data={contacts}
              renderItem={({item, index}) => {
                return (
                  <View>
                    <UserContactsCard
                      swipeable={false}
                      checkBox={true}
                      checked={item?.checked}
                      onPressCheck={() => {
                        onPressCheck(index);
                      }}
                      country={item?.country}
                      img={item?.image_url}
                      username={item?.name}
                      key={item}
                      time={moment(item?.companion?.created_at).format(
                        'hh:mm A',
                      )}
                    />
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
        <View>
          <AppButton
            onPress={() => {
              onPressSave();
            }}
            title={'Save Contact'}
            textColor={colors.white}
          />
        </View>
      </KeyboardAwareScrollView>

      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default AddPeoples;
