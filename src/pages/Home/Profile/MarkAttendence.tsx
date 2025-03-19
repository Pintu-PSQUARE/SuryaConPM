/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  ImageBackground,
  LayoutChangeEvent,
  Image,
  Animated,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Header, ProgressBar} from '../../../component';
import {useRoute} from '@react-navigation/native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {color, font} from '../../../config/Env';
import {LinearGradient as CustomLinearGradient} from '../../../component';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {ActivityIndicatorBase} from 'react-native';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
const MarkAttendence = () => {
  const route: any = useRoute();
  const cameraRef = useRef<Camera>(null);
  const {page} = route.params;
  const [images, setImages] = useState<{front?: string; back?: string}>({
    front: '',
    back: '',
  });
  const [run, setRun] = useState(false);
  const [camera, setCamera] = useState<'back' | 'front'>('front');
  const [isCaptured, setIsCaptured] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));
  const device = useCameraDevice(camera);
  const {hasPermission} = useCameraPermission();
  const borderRadius = useRef(new Animated.Value(200)).current;
  const [layout, setLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const animatedHeight = useRef(new Animated.Value(layout?.height)).current;
  const animatedWidth = useRef(new Animated.Value(layout?.width)).current;
  const animatedTop = useRef(new Animated.Value(0)).current;
  const animatedLeft = useRef(new Animated.Value(0)).current;
  const [target, setTarget] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const duration = 500;
  useEffect(() => {
    if (images.back && images.front) {
      AnimateView();
    }
    if (!images.back && images.front) {
      setRun(true);
      setCamera('back');
    }
  }, [images]);
  const handleLayout = (event: LayoutChangeEvent) => {
    const {x, width, height} = event.nativeEvent.layout;
    animatedHeight.setValue(height);
    animatedWidth.setValue(width);
    animatedLeft.setValue(x / 2);
  };
  const AnimateView = () => {
    Animated.timing(animatedHeight, {
      toValue: responsiveScreenHeight(28),
      duration: duration,
      useNativeDriver: false,
    }).start();
    Animated.timing(animatedWidth, {
      toValue: responsiveScreenWidth(35),
      duration: duration,
      useNativeDriver: false,
    }).start();
    Animated.timing(borderRadius, {
      toValue: 15,
      duration: duration,
      useNativeDriver: false,
    }).start();
  };
  return (
    <>
      <ImageBackground
        source={{uri: `file://${images.back}`}}
        style={{flex: 1, backgroundColor: color.white}}>
        <Header
          title={images.back && images.front ? page : 'Mark Attendance'}
        />
        {images.front && images.back ? (
          <></>
        ) : (
          <View
            style={{flex: 3, justifyContent: 'flex-end', alignItems: 'center'}}>
            <ProgressBar
              radius={responsiveScreenWidth(48)}
              color={color.primary}
              bgColor={color.gray2}
              strokeWidth={responsiveScreenWidth(5)}
              percentage={100}
              type="Dashed"
              run={run}
              onComplete={async () => {
                const back = await cameraRef.current?.takePhoto({});
                setImages({...images, back: back?.path});
              }}>
              <View
                onLayout={handleLayout}
                style={{
                  aspectRatio: 1,
                  backgroundColor: color.white,
                  overflow: 'hidden',
                  width: '80%',
                  position: 'absolute',
                  height: '80%',
                  borderRadius: 200,
                }}>
                {images.front && (
                  <>
                    <Image
                      source={{uri: `file://${images.front}`}}
                      style={{height: '100%', width: '100%'}}
                    />
                  </>
                )}
                {device && hasPermission ? (
                  <Camera
                    ref={cameraRef}
                    style={{height: '100%', width: '100%'}}
                    device={device}
                    isActive={true}
                    photo={true}
                    onInitialized={() => {}}
                  />
                ) : (
                  <ActivityIndicatorBase />
                )}
              </View>
            </ProgressBar>
            <Text
              style={{
                fontFamily: font.NunitoMedium,
                color: color.black87,
                fontSize: responsiveScreenFontSize(2.2),
                marginTop: responsiveScreenHeight(1.5),
              }}>
              {page}
            </Text>
            <Text
              style={{
                fontFamily: font.NunitoMedium,
                color: color.black87,
                fontSize: responsiveScreenFontSize(1.8),
                marginTop: responsiveScreenHeight(1),
                textAlign: 'center',
                width: responsiveScreenWidth(85),
                alignSelf: 'center',
              }}>
              Capture your attendance with a front photo while the back camera
              captures your surroundings.
            </Text>
          </View>
        )}
        {images.front && images.back && (
          <>
            {/* -----------------------top date and time------------------- */}
            <View
              style={{
                height: responsiveScreenHeight(4.5),
                gap: responsiveScreenWidth(4),
                marginVertical: responsiveScreenHeight(1.5),
                flexDirection: 'row',
                marginHorizontal: responsiveScreenWidth(5),
                alignSelf: 'center',
                opacity: 0.8,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 100,
                  gap: responsiveScreenWidth(3),
                  backgroundColor: color.white,
                  alignItems: 'center',
                  paddingHorizontal: responsiveScreenWidth(3),
                  width: responsiveScreenWidth(45),
                }}>
                <View
                  style={{
                    maxHeight: responsiveScreenHeight(3),
                    alignItems: 'flex-start',
                  }}>
                  <Image
                    source={require('../../../assests/icons/calendar.png')}
                    style={{
                      height: '100%',
                      aspectRatio: 1,
                      tintColor: color.primary,
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: font.NunitoSemiBold,
                    fontSize: responsiveScreenFontSize(2),
                    color: color.black87,
                  }}>
                  {new Date().toLocaleDateString()}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 100,
                  gap: responsiveScreenWidth(3),
                  backgroundColor: color.white,
                  alignItems: 'center',
                  paddingHorizontal: responsiveScreenWidth(3),
                  width: responsiveScreenWidth(45),
                }}>
                <View
                  style={{
                    maxHeight: responsiveScreenHeight(3),
                    alignItems: 'flex-start',
                  }}>
                  <Image
                    source={require('../../../assests/icons/clock.png')}
                    style={{
                      height: '100%',
                      aspectRatio: 1,
                      tintColor: color.primary,
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: font.NunitoSemiBold,
                    fontSize: responsiveScreenFontSize(2),
                    color: color.black87,
                  }}>
                  {new Date().toLocaleTimeString([], {
                    hour12: true,
                    minute: '2-digit',
                    hour: 'numeric',
                  })}
                </Text>
              </View>
            </View>

            {/* -----------------------front image------------------- */}

            <View
              style={{
                flex: 2,
                position: 'relative',
                alignItems: 'center',
                marginHorizontal: responsiveScreenWidth(5),
              }}>
              <Animated.View
                style={{
                  position: 'absolute',
                  top: animatedTop,
                  left: 0,
                  overflow: 'hidden',
                  backgroundColor: 'white',
                  height: animatedHeight,
                  width: animatedWidth,
                  borderRadius,
                }}>
                <Image
                  source={{uri: `file://${images.front}`}}
                  style={{height: '100%', width: '100%'}}
                />
              </Animated.View>
            </View>

            {/* ______________________________________________________Gradient View______________________________________________________ */}
            <View
              style={{
                position: 'absolute',
                height: responsiveScreenHeight(100),
                width: responsiveScreenWidth(100),
              }}>
              {/* SVG Gradient Background */}
              <Svg height="100%" width="100%" style={{position: 'absolute'}}>
                <Defs>
                  <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor="black" stopOpacity="0.1" />
                    <Stop offset="0.7" stopColor="black" stopOpacity="0.1" />
                    <Stop offset="0.93" stopColor="white" stopOpacity="0.95" />
                  </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#grad)" />
              </Svg>
            </View>
          </>
        )}
        <View style={{flex: 1}}></View>
        <Pressable
          style={{
            marginBottom: responsiveScreenHeight(3),
          }}
          onPress={async () => {
            const front = await cameraRef.current?.takePhoto({});
            setIsCaptured(true);
            setImages({front: front?.path});
          }}>
          <CustomLinearGradient
            style={{
              height: responsiveScreenHeight(6),
              width: responsiveScreenHeight(25),
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: responsiveScreenFontSize(2),
                fontFamily: font.NunitoSemiBold,
                color: color.white,
              }}>
              {isCaptured ? 'Mark Attendance' : 'Capture'}
            </Text>
          </CustomLinearGradient>
        </Pressable>
      </ImageBackground>
    </>
  );
};

export default MarkAttendence;
