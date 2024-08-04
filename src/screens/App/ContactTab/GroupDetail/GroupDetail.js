import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/core';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import {
  AppButton,
  AppHeader,
  AppLoader,
  GroupInput,
  TopTab,
  UserGroupCard,
} from '../../../../components';
import {
  appIcons,
  checkConnected,
  createGroupForm,
  createGroupVS,
  networkText,
  spacing,
} from '../../../../shared/exporter';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {
  edit_group,
  remove_contact_card,
  remove_group_member,
} from '../../../../redux/actions';

const GroupDetail = ({navigation, route}) => {
  const menu_list = [
    {
      id: 0,
      title: 'Remove',
    },
  ];
  const group_head_list = [
    {id: 0, title: 'Members'},
    {id: 1, title: 'Recently Added'},
  ];

  const {conversation, name, status, id} = route?.params?.group_detail;
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const [members, setMemebers] = useState([]);
  const isFocus = useIsFocused();
  const dispatch = useDispatch(null);
  const [selectedTab, setSelectedTab] = useState({id: 0, title: 'Members'});

  const [editFirstInput, seteditFirstInput] = useState(false);
  const [editSecondInput, seteditSecondInput] = useState(false);
  const {group_contacts} = useSelector(state => state.contactReducer);
  const {userInfo} = useSelector(state => state.auth);

  useEffect(() => {
    setMemebers(conversation?.groups);
  }, []);

  //Update Group
  const onUpdateGroup = async values => {
    const finalArray = [...members, ...group_contacts];
    const check = await checkConnected();
    if (check) {
      try {
        setLoading(true);
        var form = new FormData();
        form.append('group_id', id);
        form.append('status', values?.groupStatus);
        form.append('name', values?.groupName);
        finalArray.forEach(item => {
          form.append('contact_ids[]', item?.id);
        });

        const onEditGroupSuccess = res => {
          Alert.alert(
            'Success',
            res?.message || 'Group updated successfully!',
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
        const onEditGroupFailure = () => {
          setLoading(false);
        };
        dispatch(edit_group(form, onEditGroupSuccess, onEditGroupFailure));
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Error', networkText);
    }
  };

  //on Selecte Option
  const onSelectOption = (res, item, index) => {
    if (selectedTab?.id == 1) {
      dispatch(
        remove_contact_card(item, () => {
          console.log('selected');
        }),
      );
    } else {
      onRemoveGroupMember(item);
    }
  };
  //on Remove Member
  const onRemoveGroupMember = async item => {
    const check = await checkConnected();
    if (check) {
      try {
        setLoading(true);
        var form = new FormData();
        form.append('contact_id', item?.companion_id);
        form.append('group_id', id);
        const onRemoveMemberSuccess = res => {
          Alert.alert(
            'Success',
            res?.message || 'Member removed successfully!',
            [
              {
                text: 'OK',
                onPress: () => {
                  const filteredMembers = members.filter(fitem => {
                    return fitem?.contact_id !== item?.contact_id;
                  });
                  setMemebers([...filteredMembers]);
                },
              },
            ],
          );

          setLoading(false);
        };
        const onRemoveMemberFailure = () => {
          setLoading(false);
        };
        dispatch(
          remove_group_member(
            form,
            onRemoveMemberSuccess,
            onRemoveMemberFailure,
          ),
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Error', networkText);
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
        title={'Group Detail'}
        rightIcon={
          <Image style={styles.headerIcon} source={appIcons.addUser} />
        }
        onPressRight={() => {
          navigation?.navigate('AddPeoples', {
            group_detail: route?.params?.group_detail,
          });
        }}
        marginTop={10}
      />
      <Formik
        initialValues={createGroupForm}
        onSubmit={values => {
          onUpdateGroup(values);
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
          useEffect(() => {
            setFieldValue('groupName', name);
            setFieldValue('groupStatus', status || 'At Work');
          }, []);

          return (
            <KeyboardAwareScrollView
              style={{flex: 1}}
              contentContainerStyle={styles.inputCon}
              showsVerticalScrollIndicator={false}>
              <View style={[styles.paddH5, {flex: 0.98}]}>
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
                  subtitle={'edit'}
                  onPressEdit={() => {
                    seteditFirstInput(true);
                  }}
                  editable={editFirstInput}
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
                  subtitle={'edit'}
                  onPressEdit={() => {
                    seteditSecondInput(true);
                  }}
                  editable={editSecondInput}
                />
                <View>
                  <TopTab
                    tabList={group_head_list}
                    setSelectedTab={item => {
                      setSelectedTab(item);
                    }}
                    selectedTab={selectedTab}
                  />
                </View>
                <View style={{height: '56%'}}>
                  {selectedTab?.id == 0 && (
                    <View style={{flex: 1}}>
                      <FlatList
                        data={[
                          ...members,
                          ...[route?.params?.group_detail?.user],
                        ]}
                        renderItem={({item, index}) => {
                          return (
                            <UserGroupCard
                              blocked={item?.blocked}
                              country={item?.country}
                              img={item?.image_url}
                              menu_list={menu_list}
                              onSelect={res => {
                                onSelectOption(res, item, index);
                              }}
                              h1={item?.name}
                              h2={`(${item?.textng_number?.slice(
                                0,
                                2,
                              )}) ${item?.textng_number?.slice(
                                2,
                                item?.textng_number?.length,
                              )}`}
                              admin={
                                route?.params?.group_detail?.user?.id ==
                                item?.id
                                  ? false
                                  : route?.params?.group_detail?.user?.id ==
                                    userInfo?.user?.id
                                  ? true
                                  : false
                              }
                            />
                          );
                        }}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </View>
                  )}

                  {selectedTab?.id == 1 && (
                    <View style={{flex: 1}}>
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
                              h2={item?.textng_number}
                            />
                          );
                        }}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </View>
                  )}
                </View>
              </View>

              <View style={[styles.paddH5]}>
                <AppButton
                  onPress={handleSubmit}
                  title={'Update'}
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

export default GroupDetail;
