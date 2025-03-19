/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {TextInput, View, Image} from 'react-native';
import {color, font} from '../config/Env';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Shadow} from 'react-native-shadow-2';
type ServicedetailsProps = {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: any;
};
const SearchBar: React.FC<ServicedetailsProps> = ({
  placeholder,
  onChangeText,
  value,
}) => {
  function mapValue(oldValue: number): number {
    const newValue = 3.6 * oldValue - 180;
    return newValue;
  }
  function mapValue2(oldValue: number): number {
    const newValue = 3.6 * (oldValue - 50);
    return newValue;
  }
  return (
    <View>
      <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            backgroundColor: color.white,
            borderRadius: 100,
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: responsiveScreenWidth(3),
              alignItems: 'center',
            }}>
            <View style={{height: responsiveScreenHeight(2.3), aspectRatio: 1}}>
              <Image
                source={require('../assests/icons/search.png')}
                style={{
                  height: '100%',
                  resizeMode: 'cover',
                  width: '100%',
                  tintColor: color.black60,
                }}
              />
            </View>
            <TextInput
              style={{
                backgroundColor: color.white,
                color: color.black60,
                fontWeight: '400',
                borderRadius: 200,
                paddingVertical: responsiveScreenHeight(1.1),
                fontSize: responsiveScreenFontSize(1.8),
                paddingHorizontal: responsiveScreenWidth(3),
                flex: 1,
                fontFamily: font.NunitoMedium,
              }}
              keyboardType="default"
              maxLength={10}
              returnKeyType="done"
              placeholder={placeholder}
              placeholderTextColor={color.black60}
              value={value}
              onChangeText={e => onChangeText(e)}
            />
          </View>
        </View>
      </Shadow>
    </View>
  );
};

export default SearchBar;
