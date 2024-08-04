import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTheme} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {
  AppButton,
  AppLoader,
  AuthHeader,
  AuthText,
  BlankField,
  SupportCard,
} from '../../../components';
import styles from './styles';
import {
  checkConnected,
  commonStyles,
  HP,
  size,
  spacing,
} from '../../../shared/exporter';
import {get_Support} from '../../../redux/actions';

const Support = ({navigation}) => {
  const dispatch = useDispatch(null);
  const isFocus = useIsFocused();
  const {support} = useSelector(state => state.settings);

  const {colors} = useTheme();

  const [loading, setLoading] = useState(false);

  const getSupportList = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      try {
        const onSuccess = async res => {
          setLoading(false);
        };

        dispatch(get_Support(onSuccess));
      } catch (error) {
        console.log('Get Theme', error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSupportList();
  }, [isFocus]);
  return (
    <>
      <AuthHeader
        backIcon={true}
        barColor={colors.app_color}
        onPressBack={() => {
          navigation?.goBack();
        }}
      />
      <View style={[styles.container, {backgroundColor: colors.app_color}]}>
        <View style={styles.contentContainer}>
          <AuthText fontSize={size.h2} title={'Support'} />
          <View style={commonStyles.flex1}>
            {support.length == 0 ? (
              <BlankField title={'No Ticket Found'} />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={support}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation?.navigate('SupportDetail', {
                          support_detail: item,
                        });
                      }}>
                      <SupportCard item={item} />
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </View>
          <View style={spacing.mb4}>
            <AppButton
              onPress={() => {
                navigation?.navigate('CreateTicket');
              }}
              textColor={colors.white}
              title={'Create New Ticket'}
            />
          </View>
        </View>
        <AppLoader loading={loading} />
      </View>
    </>
  );
};

export default Support;
