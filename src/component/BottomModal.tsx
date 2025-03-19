/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {
  Modal,
  Animated,
  Dimensions,
  Image,
  Pressable,
  View,
} from 'react-native';
import {color} from '../config/Env';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';

interface BottomModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  bgColor?: string;
}

const {height} = Dimensions.get('window');

const BottomModal: React.FC<BottomModalProps> = ({
  visible,
  onClose,
  children,
  bgColor,
}) => {
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: color.black60,
          justifyContent: 'flex-end',
          gap: responsiveScreenHeight(2),
        }}>
        <Pressable
          onPress={onClose}
          style={{
            height: responsiveScreenHeight(4.5),
            width: responsiveScreenHeight(4.5),
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            backgroundColor: color.gray3,
            elevation: 10,
          }}>
          <Image
            source={require('../..../../assests/icons/cross-primary.png')}
            style={{
              tintColor: color.primary,
              aspectRatio: 1,
              height: '40%',
              resizeMode: 'contain',
            }}
          />
        </Pressable>
        <Animated.View
          style={[
            {
              backgroundColor: bgColor ? `${bgColor}` : color.gray2,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              alignItems: 'center',
              minHeight: responsiveScreenHeight(20),
              overflow: 'hidden',
              zIndex: 9,
            },
            {transform: [{translateY: slideAnim}]},
          ]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BottomModal;
