import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';

// Define props for reusability
interface PulseIndicatorProps {
  size?: number;
  color?: string;
}

const PulseIndicator: React.FC<PulseIndicatorProps> = ({
  size = 50,
  color = 'blue',
}) => {
  const scale = useSharedValue(0.4);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1, {duration: 1000, easing: Easing.out(Easing.ease)}),
      -1,
      true,
    );

    opacity.value = withRepeat(
      withTiming(0, {duration: 1000, easing: Easing.ease}),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.pulse,
          animatedStyle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulse: {
    position: 'absolute',
  },
});

export default PulseIndicator;
