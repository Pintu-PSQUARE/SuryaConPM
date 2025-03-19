/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, Pressable, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {color, font, routes} from '../../../config/Env';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import {Shadow} from 'react-native-shadow-2';
import {
  Header,
  LinearGradient as CustomLinearGradient,
} from '../../../component';

const PMRequest = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [clickedDrop, setClickedDrop] = useState<String | null>(null);
  const [dummyData, setDummyData] = useState([
    {
      name: 'John Doe',
      tag: 'Organizer',
      time: '12:30 AM',
      date: '12 Sep 2024',
      pic: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Horizon Belmound Construction Inventory Found in the Underground',
      desc: 'Insatll safety barriers on the 4th-floor perimeter. Ensure the gaps between walls',
      _id: 65746,
    },
    {
      name: 'John Doe',
      tag: 'Organizer',
      time: '12:30 AM',
      date: '12 Sep 2024',
      pic: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Horizon Belmound Construction Inventory Found in the Underground',
      desc: 'Insatll safety barriers on the 4th-floor perimeter. Ensure the gaps between walls',
      _id: 45697,
    },
    {
      name: 'John Doe',
      tag: 'Organizer',
      time: '12:30 AM',
      date: '12 Sep 2024',
      pic: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Horizon Belmound Construction Inventory Found in the Underground',
      desc: 'Insatll safety barriers on the 4th-floor perimeter. Ensure the gaps between walls',
      _id: 12587,
    },
    {
      name: 'John Doe',
      tag: 'Organizer',
      time: '12:30 AM',
      date: '12 Sep 2024',
      pic: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Horizon Belmound Construction Inventory Found in the Underground',
      desc: 'Insatll safety barriers on the 4th-floor perimeter. Ensure the gaps between walls',
      _id: 36985,
    },
  ]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title={'Requests'} />

      {/* -----------------------Date---------------------------- */}
      {/* 
      <View
        style={{
          paddingHorizontal: responsiveScreenWidth(3.5),
          paddingTop: responsiveScreenHeight(1.5),
        }}>
        <View
          style={{
            borderRadius: 30,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: color.black87,
              fontSize: responsiveScreenFontSize(2),
              fontFamily: font.NunitoMedium,
            }}>
            Oct 15, 2025
          </Text>
          <View
            style={{
              height: responsiveScreenHeight(2.3),
              width: responsiveScreenHeight(2.3),
              backgroundColor: color.primary,
              borderRadius: responsiveScreenHeight(2),
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: responsiveScreenWidth(1),
            }}>
            <Text
              style={{
                color: color.white,
                fontSize: responsiveScreenFontSize(1.4),
                fontFamily: font.NunitoSemiBold,
              }}>
              5
            </Text>
          </View>
        </View>
      </View> */}

      {/* ------------------------------Tools--------------------------------- */}
      <View style={{flex: 1}}>
        <FlatList
          data={dummyData}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}: any) => {
            return (
              <View
                style={{
                  marginTop: responsiveScreenHeight(1.5),
                  maxHeight: responsiveScreenHeight(24),
                }}>
                <Shadow
                  distance={4}
                  style={{
                    width: '100%',
                  }}
                  startColor={color.gray2}
                  offset={[0, 0]}>
                  <View
                    style={{
                      backgroundColor: color.primary,
                      borderRadius: 25,
                    }}>
                    <Pressable
                      style={{
                        height: responsiveScreenHeight(8.5),
                        // paddingVertical: responsiveScreenHeight(2),
                        borderRadius: 24,
                        overflow: 'hidden',
                        backgroundColor: color.white,
                        zIndex: 1,
                      }}>
                      {/* =============top======================== */}
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: color.secondary,
                            fontSize: responsiveScreenFontSize(1.4),
                            fontFamily: font.NunitoSemiBold,
                            paddingVertical: responsiveScreenHeight(0.4),
                            paddingLeft: responsiveScreenWidth(2),
                            paddingRight: responsiveScreenWidth(5),
                            backgroundColor: color.secondaryLow,
                            borderTopLeftRadius: 50,
                            borderBottomLeftRadius: 50,
                          }}>
                          Pending
                        </Text>
                      </View>

                      {/* =============Bottom======================== */}
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingHorizontal: responsiveScreenWidth(3.5),
                        }}>
                        <View
                          style={{
                            gap: responsiveScreenHeight(0.2),
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'baseline',
                              gap: responsiveScreenWidth(1),
                              marginTop: -responsiveScreenHeight(0.8),
                            }}>
                            <Text
                              style={{
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(2.5),
                                fontFamily: font.NunitoRegular,
                              }}>
                              02
                            </Text>
                            <Text
                              style={{
                                color: color.black60,
                                fontSize: responsiveScreenFontSize(1.5),
                                fontFamily: font.NunitoMedium,
                              }}>
                              Total Items
                            </Text>
                          </View>
                          <Text
                            style={{
                              color: color.primaryForTop,
                              fontSize: responsiveScreenFontSize(1.4),
                              fontFamily: font.NunitoSemiBold,
                              opacity: 0.7,
                            }}>
                            TI123456
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: color.primaryForTop,
                            fontSize: responsiveScreenFontSize(1.4),
                            fontFamily: font.NunitoSemiBold,
                            paddingVertical: responsiveScreenHeight(0.5),
                            paddingHorizontal: responsiveScreenWidth(2.2),
                            backgroundColor: color.primaryLow,
                            borderRadius: 30,
                          }}>
                          Oct 6
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                </Shadow>
              </View>
            );
          }}
          contentContainerStyle={{
            paddingHorizontal: responsiveScreenWidth(3),
            paddingBottom: responsiveScreenHeight(10),
          }}
        />

        {/* -------------------Linear gradient overlay--------------------- */}
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: responsiveScreenWidth(100),
            pointerEvents: 'none', // Allow touch events to pass through to the FlatList
          }}>
          {/* SVG Gradient Background */}
          <Svg height="100%" width="100%">
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="black" stopOpacity="0" />
                <Stop offset="0.7" stopColor="white" stopOpacity="0" />
                <Stop offset="0.90" stopColor="white" stopOpacity="0.95" />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#grad)" />
          </Svg>

          {/* Content Overlay */}
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: responsiveScreenHeight(3),
            alignSelf: 'center',
          }}>
          {/* Bottom Section: Description */}

          <Pressable
            style={{
              pointerEvents: 'auto',
            }}
            onPress={() =>
              navigation.navigate(routes.ASSET_CART, {data: 'Order Items'})
            }>
            <CustomLinearGradient
              style={{
                height: responsiveScreenHeight(5.5),
                width: responsiveScreenHeight(22),
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(2),
                  fontFamily: font.NunitoSemiBold,
                  color: color.white,
                }}>
                Item Request
              </Text>
            </CustomLinearGradient>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default PMRequest;
