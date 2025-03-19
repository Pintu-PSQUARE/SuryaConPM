/* eslint-disable react-native/no-inline-styles */
import {Text, View, Modal, Pressable} from 'react-native';
import React from 'react';
import {color, font} from '../config/Env';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const Models: React.FC<{
  icon: JSX.Element;
  inputs?: JSX.Element;
  title: string;
  heading?: string;
  iconBackground?: string;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible?: boolean;
  cancel?: {on: () => void; title: string};
  ok?: {on: () => void; title: string};
}> = ({
  modalVisible = false,
  setModalVisible,
  title,
  heading,
  cancel = null,
  ok = null,
  icon,
  inputs,
  iconBackground,
}) => {
  return (
    <>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{backgroundColor: color.black20, flex: 1}}>
          <View
            style={{
              backgroundColor: color.white,
              width: responsiveScreenWidth(90),
              paddingVertical: responsiveScreenHeight(3),
              margin: 'auto',
              borderRadius: 30,
            }}>
            <View
              style={{
                width: responsiveScreenWidth(12),
                aspectRatio: 1,
                borderRadius: 100,
                backgroundColor: iconBackground
                  ? iconBackground
                  : color.primaryLow,
                margin: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {icon}
            </View>
            {heading && (
              <Text
                style={{
                  fontFamily: font.NunitoSemiBold,
                  fontWeight: '600',
                  fontSize: responsiveScreenFontSize(1.9),
                  color: color.black87,
                  textTransform: 'capitalize',
                  textAlign: 'center',
                  marginTop: responsiveScreenHeight(1),
                  width: responsiveScreenWidth(70),
                  marginHorizontal: 'auto',
                }}>
                {heading}
              </Text>
            )}
            {title && (
              <Text
                style={{
                  fontFamily: font.NunitoRegular,
                  color: color.black87,
                  textAlign: 'center',
                  marginTop: responsiveScreenHeight(2),
                  width: responsiveScreenWidth(70),
                  marginHorizontal: 'auto',
                  fontSize: responsiveScreenFontSize(1.8),
                }}>
                {title}
              </Text>
            )}
            {inputs}
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                marginTop: responsiveScreenHeight(2.7),
                gap: responsiveScreenWidth(3),
              }}>
              {cancel !== null && (
                <Pressable
                  onPress={() => cancel.on()}
                  style={{
                    borderColor: color.red,
                    borderWidth: 1,
                    paddingHorizontal: responsiveScreenWidth(8),
                    paddingVertical: responsiveScreenHeight(0.7),
                    borderRadius: 50,
                  }}>
                  <Text
                    style={{
                      color: color.black87,
                      fontFamily: font.NunitoMedium,
                      fontSize: responsiveScreenFontSize(1.7),
                    }}>
                    {cancel.title}
                  </Text>
                </Pressable>
              )}
              {ok !== null && (
                <Pressable
                  onPress={() => ok.on()}
                  style={{
                    borderColor: color.primary,
                    borderWidth: 1,
                    paddingHorizontal: responsiveScreenWidth(8),
                    paddingVertical: responsiveScreenHeight(0.7),
                    borderRadius: 50,
                  }}>
                  <Text
                    style={{
                      color: color.black87,
                      fontFamily: font.NunitoMedium,
                      fontSize: responsiveScreenFontSize(1.7),
                    }}>
                    {ok.title}
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Models;
