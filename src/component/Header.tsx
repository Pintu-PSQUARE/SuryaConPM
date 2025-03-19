/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {ReactNode} from 'react';
import {color, font} from '../config/Env';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {LinearGradient} from '../component';

const Header: React.FC<{
  children?: ReactNode;
  backgroundColor?: string;
  title: string;
}> = ({backgroundColor = color.primaryForTop, title, children}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        zIndex: 1,
      }}>
      <LinearGradient
        style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <View
          style={{
            paddingTop: responsiveScreenHeight(6.5),
            paddingBottom: responsiveScreenHeight(2.2),
            paddingHorizontal: responsiveScreenWidth(4),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              maxHeight: responsiveScreenHeight(3),
              flex: 1,
              alignItems: 'flex-start',
            }}>
            <Image
              source={require('../assests/icons/chevron-left.png')}
              style={{height: '100%', aspectRatio: 1, tintColor: color.white}}
            />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: font.NunitoMedium,
              color: color.white,
              fontSize: responsiveScreenFontSize(2.5),
              flex: 2,
            }}>
            {title}
          </Text>
          <View
            style={{
              flex: 1,
              maxHeight: responsiveScreenHeight(3.6),
              alignItems: 'flex-end',
            }}>
            {children}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Header;
