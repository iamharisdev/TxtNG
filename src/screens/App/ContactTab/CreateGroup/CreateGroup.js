import {Alert, FlatList, SafeAreaView, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/core';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import {
  AppButton,
  AppHeader,
  AppLoader,
  GroupInput,
  UserGroupCard,
} from '../../../../components';
import {
  appIcons,
  capitalizeFirstLetter,
  checkConnected,
  createGroupForm,
  createGroupVS,
  networkText,
  spacing,
} from '../../../../shared/exporter';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {add_group, remove_contact_card} from '../../../../redux/actions';

const CreateGroup = ({navigation}) => {
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const {group_contacts} = useSelector(state => state.contactReducer);
  const isFocus = useIsFocused();
  const dispatch = useDispatch(null);

  const menu_list = [
    {
      id: 0,
      title: 'Remove',
    },
  ];
  //on Selecte Option
  const onSelectOption = (res, item) => {
    if (res?.id == 0) {
      dispatch(
        remove_contact_card(item, () => {
          console.log('selected');
        }),
      );
    } else {
    }
  };
  //on create Group
  const onCreateGroup = async values => {
    if (group_contacts.length > 0) {
      const check = await checkConnected();
      if (check) {
        try {
          setLoading(true);
          var form = new FormData();
          form.append('group_name', capitalizeFirstLetter(values?.groupName));
          form.append('group_status', values?.groupStatus);
          for (let i = 0; i < group_contacts.length; i++) {
            form.append('contact_ids[]', group_contacts[i].id);
          }

          const onAddGroupSuccess = res => {
            Alert.alert(
              'Success',
              res?.message || 'Group Created Successfully!',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    navigation?.goBack();
                  },
                },
              ],
            );

            setLoading(false);
          };
          const onAddGroupFailure = () => {
            setLoading(false);
          };
          dispatch(add_group(form, onAddGroupSuccess, onAddGroupFailure));
        } catch (error) {
          console.log(error);
        }
      } else {
        Alert.alert('Error', networkText);
      }
    } else {
      Alert.alert('Message!', 'Please add at least one group member');
    }
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
        title={'Create Group'}
        rightIcon={
          <Image style={styles.headerIcon} source={appIcons.addUser} />
        }
        onPressRight={() => {
          navigation?.navigate('AddPeoples');
        }}
        marginTop={10}
      />
      <Formik
        initialValues={createGroupForm}
        onSubmit={values => {
          onCreateGroup(values);
        }}
        validationSchema={createGroupVS}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
          handleReset,
          setFieldValue,
        }) => {
          return (
            <KeyboardAwareScrollView
              style={{flex: 1}}
              contentContainerStyle={styles.inputCon}
              showsVerticalScrollIndicator={false}>
              <View style={styles.inputContainer}>
                <GroupInput
                  onChangeText={handleChange('groupName')}
                  renderErrorMessage={true}
                  placeholder={'New Group'}
                  value={values.groupName}
                  onBlur={() => setFieldTouched('groupName')}
                  blurOnSubmit={false}
                  disableFullscreenUI={true}
                  autoCapitalize="none"
                  touched={touched.groupName}
                  errorMessage={errors.groupName}
                  title={'Group Name'}
                />
                <GroupInput
                  onChangeText={handleChange('groupStatus')}
                  renderErrorMessage={true}
                  placeholder="Group Status"
                  value={values.groupStatus}
                  onBlur={() => setFieldTouched('groupStatus')}
                  blurOnSubmit={false}
                  disableFullscreenUI={true}
                  autoCapitalize="none"
                  touched={touched.groupStatus}
                  errorMessage={errors.groupStatus}
                  onSubmitEditing={handleSubmit}
                  title={'Group Status'}
                />
                <Text
                  style={[
                    styles.headingStyle,
                    {
                      color: colors.b1,
                    },
                  ]}>
                  Recently added to group
                </Text>
                <View style={{height: '45%'}}>
                  <FlatList
                    data={group_contacts}
                    renderItem={({item, index}) => {
                      return (
                        <UserGroupCard
                          country={item?.country}
                          img={item?.image_url}
                          menu_list={menu_list}
                          onSelect={res => {
                            onSelectOption(res, index);
                          }}
                          h1={item?.name}
                          h2={`(${item?.companion?.textng_number?.slice(
                            0,
                            2,
                          )}) ${item?.companion?.textng_number?.slice(
                            2,
                            item?.companion?.textng_number?.length,
                          )}`}
                        />
                      );
                    }}
                  />
                </View>
              </View>

              <View style={styles.paddH5}>
                <AppButton
                  onPress={handleSubmit}
                  title={'Save Group'}
                  textColor={colors.white}
                />
              </View>
            </KeyboardAwareScrollView>
          );
        }}
      </Formik>

      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default CreateGroup;
