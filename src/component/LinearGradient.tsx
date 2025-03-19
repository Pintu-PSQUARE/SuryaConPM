import React from 'react';
import {ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface LinearGradientComponentProps {
  direction?: 'Horizontal' | 'Vertical'; // Direction of the gradient
  style?: ViewStyle; // Custom style for the gradient container
  children?: React.ReactNode; // Child components to be rendered inside the gradient
  colors?: string[];
}

const LinearGradientComponent: React.FC<LinearGradientComponentProps> = ({
  direction = 'Vertical',
  style,
  children,
  colors = ['#00596B', '#004350'], // Default colors
}) => {
  return (
    <LinearGradient
      colors={colors.length > 0 ? colors : ['#00596B', '#004350']}
      start={direction === 'Horizontal' ? {x: 0, y: 0} : {x: 0, y: 0}}
      end={direction === 'Horizontal' ? {x: 1, y: 0} : {x: 0, y: 1}}
      style={[style]}>
      {children}
    </LinearGradient>
  );
};

export default LinearGradientComponent;
