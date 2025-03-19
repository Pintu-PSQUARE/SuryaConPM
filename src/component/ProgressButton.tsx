/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode, useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, TextInput, View} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Rect, Svg} from 'react-native-svg';
import {font} from '../config/Env';
import {Shadow} from 'react-native-shadow-2';

const AnimatedRect = Animated.createAnimatedComponent(Rect);
// const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

type ProgressProps = {
  children?: ReactNode;
  width?: number;
  height?: number;
  borderRadius?: number;
  strokeWidth?: number;
  percentage?: number;
  duration?: number;
  delay?: number;
  textColor?: string;
  max?: number;
  color?: string;
  bgColor?: string;
  title?: string;
  run?: boolean;
  onComplete?: () => Promise<void>;
};

const ProgressButton: React.FC<ProgressProps> = ({
  width = responsiveScreenWidth(42),
  height = responsiveScreenWidth(11),
  borderRadius = responsiveScreenWidth(6),
  strokeWidth = responsiveScreenWidth(1.5),
  percentage = 100,
  color = 'tomato',
  max = 100,
  delay = 0,
  duration = 2000,
  bgColor = '#E0E0E0',
  run = true,
  title = 'Title',
  onComplete,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const rectRef: any = useRef();
  const inputRef = useRef();

  const rectPerimeter = 2 * (width + height); // Total perimeter of the rectangle

  const animation = (toValue: number) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start(async ({finished}) => {
      if (finished && onComplete) {
        onComplete();
      }
    });
  };

  useEffect(() => {
    if (run) {
      animation(percentage);
    }

    animatedValue.addListener(v => {
      const maxPerc = (100 * v.value) / max;
      const strokeDashoffset = rectPerimeter - (rectPerimeter * maxPerc) / 100;

      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}%`,
        });
      }
      if (rectRef?.current) {
        rectRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [run, percentage]);

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor: bgColor,
          borderWidth: responsiveScreenWidth(1.2),
          borderColor: '#f3f3f3',
        },
      ]}>
      <Svg
        width={width + strokeWidth * 2}
        height={height + strokeWidth * 2}
        viewBox={`0 0 ${width + strokeWidth * 2} ${
          height + strokeWidth * 2.2
        }`}>
        {/* Animated Border Rectangle */}
        <AnimatedRect
          ref={rectRef}
          x={strokeWidth}
          y={strokeWidth}
          width={width}
          height={height}
          rx={borderRadius}
          ry={borderRadius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={rectPerimeter} // Total perimeter
          strokeDashoffset={rectPerimeter} // Start fully hidden
        />
      </Svg>
      <View
        style={{
          position: 'absolute',
          top: -3,
        }}>
        <Shadow distance={1} startColor="rgba(0, 0, 0, 0.15)" offset={[0, 0]}>
          <View
            style={{
              borderRadius: responsiveScreenWidth(6),
              height: responsiveScreenHeight(4.3),
              width: responsiveScreenWidth(39.2),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            <Text
              style={{
                fontFamily: font.NunitoRegular,
                color: 'black',
                fontSize: responsiveScreenFontSize(1.6),
              }}>
              {title}
            </Text>
          </View>
        </Shadow>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
});

export default ProgressButton;
