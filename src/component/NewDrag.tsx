/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {Animated, PanResponder, StyleSheet, View} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {color} from '../config/Env';
import {Shadow} from 'react-native-shadow-2';

type DraggableComponentProps = {
  children: ReactNode;
  width: number;
  height: number;
  mid: ReactNode | null;
  right: ReactNode | null;
  active: boolean;
  onRight: () => void;
};

const NewDrag: React.FC<DraggableComponentProps> = ({
  width,
  height,
  children,
  mid,
  right,
  active,
  onRight,
}) => {
  const viewWidth = width || responsiveScreenWidth(65);
  const viewHeight = height || responsiveScreenHeight(6);
  const startStateX = viewWidth / 2 - viewWidth + viewHeight / 2;
  const endStateX = viewWidth / 2 - viewHeight / 2;
  const midPoint = (startStateX + endStateX) / 2;

  const [pan, setPan] = useState(
    new Animated.ValueXY({x: !active ? startStateX : endStateX, y: 0}),
  );

  // Animate the position based on the `active` prop
  useEffect(() => {
    Animated.spring(pan, {
      toValue: {x: startStateX, y: 0},
      speed: 1,
      useNativeDriver: false,
      bounciness: -10,
    }).start();
  }, [active]);

  // PanResponder to handle dragging
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setValue({x: !active ? startStateX : endStateX, y: 0});
      },
      onPanResponderMove: (e, gestureState) => {
        let newX = pan.x._value;
        if (gestureState.dx < endStateX * 2 && gestureState.dx > 0) {
          newX = gestureState.dx + startStateX;
        } else if (gestureState.dx > startStateX * 2 && gestureState.dx < 0) {
          newX = gestureState.dx + endStateX;
        }
        pan.x.setValue(newX);
      },
      onPanResponderRelease: () => {
        const snapTo = pan.x._value > midPoint ? endStateX : startStateX;
        if (pan.x._value > midPoint) {
          onRight();
        }
        Animated.spring(pan, {
          toValue: {x: snapTo, y: 0},
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  // Interpolating opacity for the mid view
  const midOpacity = pan.x.interpolate({
    inputRange: [startStateX, endStateX],
    outputRange: [1, 0], // Fully visible at start, invisible at end
    extrapolate: 'clamp',
  });

  return (
    <View
      style={{
        alignSelf: 'center',
      }}>
      <Shadow distance={2} startColor={color.black15} offset={[0, -0.3]}>
        <View
          style={{
            backgroundColor: color.primaryLow,
            borderRadius: 200,
            borderColor: color.black15,
            width: viewWidth,
            height: viewHeight,
            alignItems: 'center',
            position: 'relative',
            justifyContent: 'center',
            padding: responsiveScreenWidth(1.2),
          }}>
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.draggable,
              {transform: pan.getTranslateTransform()},
            ]}>
            {children}
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              margin: 'auto',
              zIndex: 1,
              opacity: midOpacity, // Apply interpolated opacity to mid view
            }}>
            {mid}
          </Animated.View>
          <View
            style={{
              position: 'absolute',
              margin: 'auto',
              zIndex: 1,
              right: responsiveScreenWidth(1.2),
            }}>
            {right}
          </View>
        </View>
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  draggable: {
    height: '90%',
    aspectRatio: 1,
    borderRadius: 30,
    overflow: 'hidden',
    zIndex: 2,
  },
});

export default NewDrag;
