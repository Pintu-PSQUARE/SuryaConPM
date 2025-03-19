import React, {ReactNode, useEffect, useRef} from 'react';
import {Animated, StyleSheet, TextInput, View} from 'react-native';
import {color, font} from '../config/Env';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {Circle, G, Rect, Svg} from 'react-native-svg';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
type ProgressProps = {
  children?: ReactNode;
  radius?: number;
  strokeWidth?: number;
  percentage?: number;
  duration?: number;
  delay?: number;
  textColor?: string;
  max?: number;
  color?: string;
  bgColor?: string;
  strokeLinecap?: 'butt' | 'round' | 'square';
  run?: boolean;
  type?: 'ProgressBar' | 'Dashed';
  onComplete?: () => Promise<void>;
};

const ProgressBar: React.FC<ProgressProps> = ({
  radius = responsiveScreenWidth(10),
  strokeWidth = responsiveScreenWidth(2),
  percentage = 100,
  color = 'tomato',
  max = 100,
  delay = 500,
  duration = 1000,
  textColor,
  children,
  bgColor,
  run = true,
  strokeLinecap = 'square',
  type = 'ProgressBar',
  onComplete,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circleRef = useRef();
  const inputRef = useRef();

  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
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
      animation(percentage)
    }
    animatedValue.addListener((v) => {
      const maxPerc = 100 * v.value / max
      const strokeDashoffset = circleCircumference - (circleCircumference * maxPerc) / 100
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}%`,
        });
      }
      if (circleRef?.current) {
        circleRef.current.setNativeProps({
          strokeDashoffset
        })
      }
    })
  }, [run, percentage])
  return (
    <>
      <View
        style={{
          width: radius * 2,
          height: radius * 2,
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Svg
          width={radius * 2}
          height={radius * 2}
          viewBox={`0, 0, ${halfCircle * 2}, ${halfCircle * 2}`}>
          <G rotation={'-90'} origin={`${halfCircle},${halfCircle}`}>
            <Circle
              cx="50%"
              cy="50%"
              stroke={bgColor}
              strokeWidth={strokeWidth}
              r={radius}
              fill={'transparent'}
            />
            <AnimatedCircle
              ref={circleRef}
              cx="50%"
              cy="50%"
              stroke={color}
              strokeWidth={strokeWidth}
              r={radius}
              fill={'transparent'}
              strokeDasharray={circleCircumference}
              strokeDashoffset={circleCircumference}
              strokeLinecap={strokeLinecap}
            />
            {type === 'Dashed' && (
              <Circle
                cx="50%"
                cy="50%"
                stroke={'white'}
                strokeWidth={strokeWidth}
                r={radius}
                fill={'transparent'}
                strokeDasharray={[13, 6]}
              />
            )}
          </G>
        </Svg>
        {children ? (
          children
        ) : (
          <AnimatedTextInput
            ref={inputRef}
            underlineColorAndroid="transparent"
            editable={false}
            defaultValue="0"
            style={[
              StyleSheet.absoluteFillObject,
              {fontSize: radius / 2 - 1, color: textColor ?? color},
              styles.text,
            ]}
          />
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  text: {
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: font.NunitoRegular,
  },
});
export default ProgressBar;
// function onComplete(percentage: number) {
//   throw new Error('Function not implemented.');
// }
