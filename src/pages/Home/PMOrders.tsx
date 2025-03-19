/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Animated,
  Easing,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {color, font, routes} from '../../config/Env';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import {Shadow} from 'react-native-shadow-2';
import {Header, LinearGradient as CustomLinearGradient} from '../../component';
import {PanResponder} from 'react-native';

const PMOrders = () => {
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

  // ______________________________Animation for dropdowns_________________________
  const animationValue = useRef(
    new Animated.Value(-responsiveScreenHeight(10)),
  ).current;
  const animationValue1 = useRef(new Animated.Value(0)).current;

  const handlePressToggleButton = (id: string) => {
    if (clickedDrop === id) {
      // Close animation (first translateY, then collapse height)
      Animated.timing(animationValue, {
        toValue: -responsiveScreenHeight(10), // Move content up before collapsing
        duration: 150,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(animationValue1, {
          toValue: 0, // Collapse height
          duration: 150,
          useNativeDriver: false,
        }).start(() => setClickedDrop(null));
      });
    } else {
      setClickedDrop(id);
      // Open animation (expand height first, then animate translateY)
      Animated.timing(animationValue1, {
        toValue: responsiveScreenHeight(27), // Expand height first
        duration: 250,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(animationValue, {
          toValue: 0, // Bring content down smoothly
          duration: 150,
          useNativeDriver: false,
        }).start();
      });
    }
  };
  // ________________________________________END_______________________________________

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title={'Orders'} />

      {/* -----------------------Date---------------------------- */}

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
      </View>

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
                  distance={3}
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
                            color: color.white,
                            fontSize: responsiveScreenFontSize(1.2),
                            fontFamily: font.NunitoMedium,
                            paddingVertical: responsiveScreenHeight(0.4),
                            paddingLeft: responsiveScreenWidth(2),
                            paddingRight: responsiveScreenWidth(5),
                            backgroundColor: color.secondary,
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
                              color: color.primary,
                              fontSize: responsiveScreenFontSize(1.4),
                              fontFamily: font.NunitoMedium,
                              opacity: 0.7,
                            }}>
                            TI123456
                          </Text>
                        </View>
                        <Pressable
                          onPress={() => handlePressToggleButton(item._id)}
                          hitSlop={{
                            top: 10,
                            bottom: 10,
                            left: 10,
                            right: 10,
                          }}
                          style={{
                            height: responsiveScreenHeight(2.5),
                            width: responsiveScreenHeight(2.5),
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: responsiveScreenWidth(2),
                          }}>
                          {clickedDrop === item._id ? (
                            <Image
                              source={require('../../assests/icons/chevron-up.png')}
                              style={{
                                tintColor: color.primary,
                                aspectRatio: 1,
                                height: '100%',
                                resizeMode: 'contain',
                              }}
                            />
                          ) : (
                            <Image
                              source={require('../../assests/icons/chevron-down.png')}
                              style={{
                                tintColor: color.primary,
                                aspectRatio: 1,
                                height: '100%',
                                resizeMode: 'contain',
                              }}
                            />
                          )}
                        </Pressable>
                      </View>
                    </Pressable>
                  </View>
                </Shadow>

                {clickedDrop === item._id && (
                  <Animated.View
                    style={{
                      height: animationValue1, // Expands height first
                      overflow: 'hidden', // Prevents content from showing before full expansion
                    }}>
                    <View
                      style={{
                        paddingHorizontal: responsiveScreenWidth(3.5),
                        paddingVertical: responsiveScreenHeight(1.5),
                        gap: responsiveScreenHeight(2),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: responsiveScreenWidth(2),
                          }}>
                          <View
                            style={{
                              height: responsiveScreenHeight(5),
                              aspectRatio: 1,
                              borderRadius: 100,
                              overflow: 'hidden',
                            }}>
                            <Image
                              source={{
                                uri: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww',
                              }}
                              style={{
                                height: '100%',
                                width: '100%',
                                resizeMode: 'cover',
                              }}
                            />
                          </View>
                          <View
                            style={{
                              gap: responsiveScreenHeight(0.5),
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: responsiveScreenWidth(1),
                              }}>
                              <Text
                                style={{
                                  fontFamily: font.NunitoSemiBold,
                                  fontSize: responsiveScreenFontSize(2),
                                  color: color.black87,
                                  marginLeft: responsiveScreenWidth(1),
                                }}>
                                Hammer
                              </Text>
                              <View
                                style={{
                                  backgroundColor: color.secondary,
                                  paddingHorizontal: responsiveScreenWidth(1.5),
                                  paddingVertical: responsiveScreenWidth(1),
                                  borderRadius: 30,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: color.white,
                                    fontSize: responsiveScreenFontSize(1.1),
                                    fontFamily: font.NunitoSemiBold,
                                  }}>
                                  Nos
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: responsiveScreenWidth(1.5),
                              }}>
                              <View
                                style={{
                                  backgroundColor: color.secondaryLow,
                                  paddingHorizontal: responsiveScreenWidth(1.5),
                                  paddingVertical: responsiveScreenWidth(1),
                                  borderRadius: 30,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: color.secondary,
                                    fontSize: responsiveScreenFontSize(1.1),
                                    fontFamily: font.NunitoSemiBold,
                                  }}>
                                  Tokio
                                </Text>
                              </View>
                              <View
                                style={{
                                  backgroundColor: color.primaryLow,
                                  paddingHorizontal: responsiveScreenWidth(1.5),
                                  paddingVertical: responsiveScreenWidth(1),
                                  borderRadius: 30,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: color.primary,
                                    fontSize: responsiveScreenFontSize(1.1),
                                    fontFamily: font.NunitoSemiBold,
                                  }}>
                                  Grade A
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            backgroundColor: color.secondaryLow,
                            paddingHorizontal: responsiveScreenWidth(1.5),
                            paddingVertical: responsiveScreenWidth(1),
                            borderRadius: 30,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: color.secondary,
                              fontSize: responsiveScreenFontSize(1.4),
                              fontFamily: font.NunitoSemiBold,
                            }}>
                            02
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: responsiveScreenWidth(2),
                          }}>
                          <View
                            style={{
                              height: responsiveScreenHeight(5),
                              aspectRatio: 1,
                              borderRadius: 100,
                              overflow: 'hidden',
                            }}>
                            <Image
                              source={{
                                uri: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww',
                              }}
                              style={{
                                height: '100%',
                                width: '100%',
                                resizeMode: 'cover',
                              }}
                            />
                          </View>
                          <View
                            style={{
                              gap: responsiveScreenHeight(0.5),
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: responsiveScreenWidth(1),
                              }}>
                              <Text
                                style={{
                                  fontFamily: font.NunitoSemiBold,
                                  fontSize: responsiveScreenFontSize(2),
                                  color: color.black87,
                                  marginLeft: responsiveScreenWidth(1),
                                }}>
                                Hammer
                              </Text>
                              <View
                                style={{
                                  backgroundColor: color.secondary,
                                  paddingHorizontal: responsiveScreenWidth(1.5),
                                  paddingVertical: responsiveScreenWidth(1),
                                  borderRadius: 30,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: color.white,
                                    fontSize: responsiveScreenFontSize(1.1),
                                    fontFamily: font.NunitoSemiBold,
                                  }}>
                                  Nos
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: responsiveScreenWidth(1.5),
                              }}>
                              <View
                                style={{
                                  backgroundColor: color.secondaryLow,
                                  paddingHorizontal: responsiveScreenWidth(1.5),
                                  paddingVertical: responsiveScreenWidth(1),
                                  borderRadius: 30,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: color.secondary,
                                    fontSize: responsiveScreenFontSize(1.1),
                                    fontFamily: font.NunitoSemiBold,
                                  }}>
                                  Tokio
                                </Text>
                              </View>
                              <View
                                style={{
                                  backgroundColor: color.primaryLow,
                                  paddingHorizontal: responsiveScreenWidth(1.5),
                                  paddingVertical: responsiveScreenWidth(1),
                                  borderRadius: 30,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: color.primary,
                                    fontSize: responsiveScreenFontSize(1.1),
                                    fontFamily: font.NunitoSemiBold,
                                  }}>
                                  Grade A
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            backgroundColor: color.secondaryLow,
                            paddingHorizontal: responsiveScreenWidth(1.5),
                            paddingVertical: responsiveScreenWidth(1),
                            borderRadius: 30,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: color.secondary,
                              fontSize: responsiveScreenFontSize(1.4),
                              fontFamily: font.NunitoSemiBold,
                            }}>
                            02
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Animated.View>
                )}
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
                Order Items
              </Text>
            </CustomLinearGradient>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default PMOrders;
