import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  appIcons,
  commonStyles,
  family,
  HP,
  size,
  WP,
} from '../../shared/exporter';
import LinearGradient from 'react-native-linear-gradient';
import {NeumorphBox} from '..';
import {useTheme} from 'react-native-paper';
import {FloatingTab} from './FloatingTab';
import {useDispatch, useSelector} from 'react-redux';
import {setOpenTabs} from '../../redux/actions';

export const BottomTab = ({state, descriptors, navigation}) => {
  const [showTab, setShowTab] = useState(true);
  const {colors} = useTheme();
  const btnRef = useRef(null);
  const dispatch = useDispatch();
  const {openTab} = useSelector(state => state?.auth);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setShowTab(false);
  };

  const _keyboardDidHide = () => {
    setShowTab(true);
  };
  return (
    <>
      {showTab && (
        <>
          <LinearGradient
            pointerEvents={'box-none'}
            accessibilityRole="button"
            start={{x: 1, y: 1}}
            end={{x: 1, y: -6}}
            colors={[colors.app_color, colors.bl3]}
            style={[
              styles.container,
              {
                zIndex: 999,
                backgroundColor: colors.app_color,
                height: '10%',
              },
            ]}>
            <FlatList
              style={{height: '100%'}}
              contentContainerStyle={styles.flatContainer}
              numColumns={4}
              data={state?.routes}
              renderItem={({item, index}) => {
                const {options} = descriptors[item?.key];
                const label =
                  options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : item.name;

                const isFocused = state.index === index;

                const onPress = () => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: item.key,
                    canPreventDefault: true,
                  });
                  if (!isFocused && !event.defaultPrevented) {
                    btnRef.current.reset();
                    dispatch(setOpenTabs(false, () => {}));
                    // The `merge: true` option makes sure that the params inside the tab screen are preserved
                    navigation.navigate({name: item.name, merge: true});
                  }
                };

                return (
                  <View style={styles.tabContainer}>
                    <TouchableOpacity
                      onPress={onPress}
                      style={[styles.tabContainer]}>
                      <NeumorphBox
                        alignItems={'center'}
                        justifyContent={'center'}
                        width={index == 0 ? 44 : index == 1 ? 44 : 1}
                        borderRadius={index == 0 ? 12 : index == 1 ? 12 : 1}
                        height={index == 0 ? 45 : index == 1 ? 45 : 1}>
                        <Image
                          source={
                            index == 0
                              ? appIcons.userGroup
                              : index == 1
                              ? appIcons.setting
                              : null
                          }
                          style={[
                            index == 0
                              ? styles.firstImageStyle
                              : index == 1
                              ? styles.thirdImageStyle
                              : null,
                            {
                              tintColor: isFocused ? colors.pur2 : colors.g11,
                            },
                          ]}
                        />
                      </NeumorphBox>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </LinearGradient>
          <FloatingTab btnRef={btnRef} />
          {openTab && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                btnRef.current.reset();
                dispatch(setOpenTabs(false, () => {}));
              }}
              style={[
                commonStyles?.bgOverlay,
                {
                  backgroundColor: colors.b8,
                },
              ]}
            />
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '3754AA',
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 8,
    shadowRadius: 3.84,
    elevation: 10,
    backgroundColor: 'transparent',
  },
  firstImageStyle: {
    height: 20,
    width: 18,
    resizeMode: 'contain',
  },
  secondImageStyle: {
    height: 60,
    width: 50,
    resizeMode: 'contain',
  },
  thirdImageStyle: {
    height: 20,
    width: 18,
    resizeMode: 'contain',
  },
  textStyle: {
    fontSize: size.tiny,
    fontFamily: family.Montserrat_Light,
    marginTop: 10,
  },

  tabContainer: {
    height: HP('10'),
    width: WP('70'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  aicenter: {
    alignItems: 'center',
    justifyContent: 'center',
    height: HP('10'),
    width: WP('25'),
  },
  flatContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgStyle: {
    position: 'absolute',
    height: 35,
    width: 35,
    resizeMode: 'contain',
    top: 25,
    left: 24,
  },
});
