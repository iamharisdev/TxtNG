import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {useTheme} from 'react-native-paper';
import {
  AppButton,
  AppHeader,
  AppInput,
  AppLoader,
  NeumorphDivider,
  WalletCard,
} from '../../../../../components';
import {
  checkConnected,
  networkText,
  spacing,
  wallet_amount,
} from '../../../../../shared/exporter';
import {Input} from '@rneui/base';
import {Icon} from '@rneui/themed';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {
  transfer_wallet_amount_request,
  withdraw_wallet_amount_request,
} from '../../../../../redux/actions';
const AddWalletAmount = ({navigation, route}) => {
  const [selctedAmount, setselctedAmount] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const {type, selectedFriend, balanceDetail} = route?.params;
  const {payment_method} = useSelector(state => state?.settings);
  const {colors} = useTheme();
  const dispatch = useDispatch(null);

  const SMSimpleButton = props => {
    return (
      <TouchableOpacity
        onPress={props?.onPress}
        style={[
          styles.btnStyle,
          {backgroundColor: props?.bgColor, borderColor: props?.borderColor},
        ]}>
        <Text style={[styles.title, {color: props?.textColor}]}>
          {props?.title}
        </Text>
      </TouchableOpacity>
    );
  };
  const onConfirmAmount = async () => {
    if (amount || selctedAmount) {
      if (type == 'Top-Up') {
        navigation?.navigate('WalletCards', {
          amount: amount || selctedAmount,
        });
      } else if (type == 'Transfer') {
        onTransferMoney();
      } else if (type == 'Withdraw') {
        onWithdrawAmount();
      }
    } else {
      Alert.alert('Error', 'Please select amount!');
    }
  };

  // On Transfer Money
  const onTransferMoney = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);

      const requestBody = {
        amount: selctedAmount || amount || 0,
        receiver_id: selectedFriend?.companion?.id,
      };
      const onSuccess = res => {
        setLoading(false);

        navigation?.navigate('TransactionDetail', {
          type: type,
          item: res,
        });
      };
      const onFailure = res => {
        setLoading(false);
        Alert.alert('Error', res || 'Something went wrong!');
      };
      dispatch(
        transfer_wallet_amount_request(requestBody, onSuccess, onFailure),
      );
    } else {
      Alert.alert('Error', networkText);
    }
  };

  //onWithdrawAmount
  const onWithdrawAmount = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      const requestBody = {
        amount: selctedAmount || amount || 0,
      };
      const onSuccess = res => {
        setLoading(false);
        navigation?.navigate('TransactionDetail', {
          type: type,
          item: res,
        });
      };
      const onFailure = res => {
        setLoading(false);
        Alert.alert('Error', res || 'Something went wrong!');
      };
      dispatch(
        withdraw_wallet_amount_request(requestBody, onSuccess, onFailure),
      );
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
        title={'Wallet'}
        neumorph={false}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <View style={spacing.py2}>
            <WalletCard item={balanceDetail} />
            <View style={spacing.mt4}>
              <NeumorphDivider />
            </View>
            <View>
              <FlatList
                data={wallet_amount}
                renderItem={({item}) => {
                  return (
                    <SMSimpleButton
                      onPress={() => {
                        setAmount(0);
                        setselctedAmount(item?.title);
                      }}
                      title={item?.title}
                      bgColor={
                        item?.title == selctedAmount
                          ? colors.pur2
                          : colors?.app_color
                      }
                      textColor={
                        item?.title == selctedAmount ? colors.white : colors?.b1
                      }
                      borderColor={
                        item?.title == selctedAmount ? colors.pur2 : colors?.g36
                      }
                    />
                  );
                }}
                numColumns={3}
              />
            </View>
            <View style={spacing.mt4}>
              <NeumorphDivider />
            </View>
            <View>
              <Text style={[styles.inputTitle, {color: colors.b1}]}>
                Input Amout ($)
              </Text>
              <Input
                containerStyle={{
                  paddingHorizontal: 0,
                }}
                inputContainerStyle={{
                  borderColor: colors.app_color,
                }}
                onChangeText={text => {
                  setselctedAmount('');
                  setAmount(text);
                }}
                keyboardType={'decimal-pad'}
                leftIcon={
                  <Icon
                    size={18}
                    color={colors.pur2}
                    name={'dollar-sign'}
                    type={'feather'}
                  />
                }
                placeholder={'0'}
                value={amount}
                placeholderTextColor={colors.b1}
                inputStyle={[
                  styles.inputStyle,
                  {
                    color: colors.b1,
                  },
                ]}
              />
            </View>
          </View>
          <AppButton
            onPress={() => {
              onConfirmAmount();
            }}
            title={'Select Amount'}
            textColor={colors.white}
          />
        </View>
      </KeyboardAwareScrollView>
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default AddWalletAmount;
