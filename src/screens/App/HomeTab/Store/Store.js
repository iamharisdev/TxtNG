import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from 'react-native-paper';
import {
  AppButton,
  AppHeader,
  AppLoader,
  BurnNumberCard,
  NeumorphDivider,
  StoreCard,
  StoreModal,
  ThemeCard,
} from '../../../../components';
import {
  appIcons,
  checkConnected,
  commonStyles,
  networkText,
  spacing,
  store_list,
  themes_list,
} from '../../../../shared/exporter';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  burn_number_Request,
  current_checkout_request,
  getPhoneNumberRequest,
  get_all_theme_Request,
  setAppTheme,
} from '../../../../redux/actions';
import {useIsFocused} from '@react-navigation/core';
import {getPhoneNumber} from '../../../../shared/service/AuthService';

const Store = ({navigation}) => {
  const {colors} = useTheme();
  const [selected, setSelected] = useState({title: 'Burn Phone Number'});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(null);
  const isFocus = useIsFocused();
  const {all_themes} = useSelector(state => state?.appReducer);

  useEffect(() => {
    if (isFocus) {
      get_themes();
    }
  }, [isFocus]);

  //Get All Themes
  const get_themes = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      try {
        const onSuccess = async res => {
          console.log('Get Theme Success');
          setLoading(false);
        };
        const onFailure = async () => {
          console.log('Get Theme Failure');
          setLoading(false);
        };

        dispatch(get_all_theme_Request(onSuccess, onFailure));
      } catch (error) {
        console.log('Get Theme', error);
      }
    } else {
    }
  };

  //Burn Number
  const burnNumberHandler = async () => {
    try {
      const check = await checkConnected();
      if (check) {
        setLoading(true);
        const res = await getPhoneNumber();
        const requestBody = {
          title: 'New Burn Number',
          price: 10,
          phone: res?.data?.text_ng_number,
        };
        dispatch(
          current_checkout_request(requestBody, res => {
            dispatch(
              getPhoneNumberRequest(null, () => {
                setLoading(false);
                navigation?.navigate('GenerateNumber');
              }),
            );
          }),
        );
      } else {
        Alert.alert('Error', networkText);
      }
    } catch (error) {}
  };

  const onBuy = item => {
    const requestBody = {
      title: item?.title,
      price: item?.price,
      image: item?.image_url,
      color: colors.pur2,
      theme_id: item?.id,
      selected_Theme: item?.selected_theme,
    };
    dispatch(
      current_checkout_request(requestBody, res => {
        navigation?.navigate('PaymentMethods', {screenName: 'checkout'});
      }),
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
        title={'Store'}
        onPressRight={() => {
          navigation?.navigate('Wallet');
        }}
        neumorph={false}
        rightIcon={
          <Image
            source={appIcons.wallet}
            style={[styles.iconStyle, {tintColor: colors.pur2}]}
          />
        }
      />
      <View style={styles.contentContainer}>
        <View style={styles.aiRow}>
          {store_list?.map(item => {
            return (
              <StoreCard
                onPress={() => {
                  setSelected(item);
                }}
                icon={item.img}
                selected={selected.title}
                title={item?.title}
              />
            );
          })}
        </View>
        {selected.title == 'Burn Phone Number' && (
          <>
            <View>
              <NeumorphDivider />
              <BurnNumberCard />
              <Text style={[styles.textStyle, {color: colors.b9}]}>
                Burning your number will discard your current randomly generated
                TextNG number and new number will be generated.
                {'\n\n'}
                Your contacts, and rewards will not be affected by this process.
              </Text>
            </View>
            <View style={spacing.mt2}>
              <AppButton
                onPress={() => {
                  setShow(true);
                }}
                textColor={colors.white}
                title={'Generate Number'}
              />
            </View>
          </>
        )}
        {selected.title == 'Themes' && (
          <View style={commonStyles.flex1}>
            <FlatList
              data={all_themes?.filter(item => !item?.status)}
              numColumns={3}
              renderItem={({item, index}) => {
                return (
                  <View style={{width: '33.5%'}}>
                    <ThemeCard
                      onPress={() => {
                        onBuy(item);
                      }}
                      h1={item?.price}
                      h2={item?.title}
                      img={item?.image_url}
                      h3={item?.edition}
                      btnColor={item?.btn_color}
                      btnText={'Buy Now'}
                    />
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>
      {show && (
        <StoreModal
          onPress={() => {
            setShow(false);
            burnNumberHandler();
          }}
          show={show}
          onPressHide={() => {
            setShow(false);
          }}
          title={'Wait! Are you sure you want to burn your number?'}
          subtitle={
            'Once you burn your number you will no longer retrieve it again. You will need to purchase another one.'
          }
          btnText={'I am sure'}
        />
      )}
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default Store;
