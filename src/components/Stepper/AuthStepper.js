import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import StepIndicator from 'react-native-step-indicator';
import {useTheme} from 'react-native-paper';

const AuthStepper = ({stepper}) => {
  const {colors} = useTheme();
  return (
    <View style={{marginHorizontal: -65}}>
      <StepIndicator
        customStyles={{
          stepIndicatorSize: 17,
          currentStepIndicatorSize: 17,
          separatorStrokeWidth: 5,
          currentStepStrokeWidth: 9,
          stepStrokeWidth: 9,
          stepStrokeUnFinishedColor: colors.g12,
          separatorFinishedColor: colors.pur2,
          separatorUnFinishedColor: colors.g12,
          stepStrokeFinishedColor: colors.pur2,
          stepStrokeCurrentColor: colors.pur2,
        }}
        stepCount={3}
        currentPosition={stepper}
      />
    </View>
  );
};

export default AuthStepper;
