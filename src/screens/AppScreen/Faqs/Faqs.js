import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTheme} from 'react-native-paper';
import {
  AuthHeader,
  AuthText,
  NeumorphDivider,
  AppLoader,
  BlankField,
} from '../../../components';
import styles from './styles';
import {checkConnected, HP, size, spacing, WP} from '../../../shared/exporter';
import {ListItem} from '@rneui/base';
import {Icon} from '@rneui/themed';
import {useSelector, useDispatch} from 'react-redux';
import {get_Faqs} from '../../../redux/actions/settings-actions/settings-action';

const Faqs = ({navigation}) => {
  const [expanded, setExpanded] = useState(false);

  const dispatch = useDispatch(null);
  const {faq} = useSelector(state => state.settings);
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);

  const getFaq = async () => {
    const check = await checkConnected();
    if (check) {
      setLoading(true);
      try {
        const onSuccess = async res => {
          setLoading(false);
        };

        dispatch(get_Faqs(onSuccess));
      } catch (error) {
        console.log('Get Theme', error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFaq();
  }, []);

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
          <AuthText fontSize={size.h2} title={'FAQ'} />

          {faq.length == 0 ? (
            <BlankField title={'No Data Available'} />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={faq}
              renderItem={({item, index}) => {
                return (
                  <ListItem.Accordion
                    containerStyle={[
                      styles.containerStyle,
                      {
                        backgroundColor: colors.app_color,
                      },
                    ]}
                    activeOpacity={1}
                    noIcon={true}
                    content={
                      <View
                        style={[
                          styles.cardContainer,
                          {backgroundColor: colors.app_color},
                        ]}>
                        <ListItem.Content
                          style={{backgroundColor: colors.app_color}}>
                          <ListItem.Title
                            style={[styles.titleStyle, {color: colors.b14}]}>
                            {item?.question}
                          </ListItem.Title>
                        </ListItem.Content>
                        <Icon
                          size={22}
                          type={'feather'}
                          name={
                            faq[index]?.expanded
                              ? 'chevron-up'
                              : 'chevron-right'
                          }
                        />
                      </View>
                    }
                    isExpanded={faq[index]?.expanded}
                    onPress={() => {
                      setExpanded(!expanded);
                      faq[index].expanded = !faq[index]?.expanded;
                    }}>
                    {faq[index]?.expanded ? (
                      <View style={spacing.mb4}>
                        <Text style={[styles.subText, {color: colors.b14}]}>
                          {item?.answer}
                        </Text>
                      </View>
                    ) : (
                      false
                    )}
                  </ListItem.Accordion>
                );
              }}
              ItemSeparatorComponent={() => {
                return <NeumorphDivider height={1.5} />;
              }}
            />
          )}
        </View>
      </View>
      <AppLoader loading={loading} />
    </>
  );
};

export default Faqs;
