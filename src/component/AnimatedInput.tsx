/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, TextInput, Animated} from 'react-native';
import React, {useRef} from 'react';
import {color} from '../config/Env';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
interface InputProps {
  label?: string;
  value: string;
  border?: string;
  multiline?: boolean;
  onChange: (value: string) => void;
  inpColor?: string;
}
const AnimatedInput = ({
  label = '',
  value,
  onChange,
  border = color.gray3,
  multiline = false,
  inpColor,
}: InputProps) => {
  const translateY = useRef(new Animated.Value(0));
  const handelFocus = () => {
    Animated.timing(translateY.current, {
      toValue: responsiveScreenHeight(-2.2),
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const handelBlur = () => {
    if (!value) {
      Animated.timing(translateY.current, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <>
      <View
        style={[
          styles.container,
          {borderColor: color.black28, height: multiline ? '100%' : 'auto'},
        ]}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              paddingHorizontal: responsiveScreenWidth(2),
              marginHorizontal: responsiveScreenWidth(3),
              marginVertical: responsiveScreenHeight(1),
              backgroundColor: inpColor ? inpColor : color.white,
            },
            {transform: [{translateY: translateY.current}]},
          ]}>
          <Text style={{color: color.black28}}>{label}</Text>
        </Animated.View>
        <TextInput
          multiline={multiline}
          value={value}
          onChangeText={onChange}
          onBlur={handelBlur}
          onFocus={handelFocus}
          style={styles.input}
        />
      </View>
    </>
  );
};

export default AnimatedInput;

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: responsiveScreenHeight(1),
    overflow: 'visible',
    marginTop: responsiveScreenHeight(1),
    maxHeight: responsiveScreenHeight(15),
  },
  input: {
    paddingHorizontal: responsiveScreenWidth(3),
    paddingVertical: 0,
    margin: 0,
  },
});
