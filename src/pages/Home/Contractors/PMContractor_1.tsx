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
import {color, font, routes} from '../../../config/Env';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import Svg, {Defs, LinearGradient, Rect, Stop, SvgXml} from 'react-native-svg';
import {Shadow} from 'react-native-shadow-2';
import {
  BottomModal,
  Header,
  LinearGradient as CustomLinearGradient,
  AnimatedInput,
} from '../../../component';
import useHapticFeedback from '../../../hooks/useHapticFeedback';
import {PanResponder} from 'react-native';

const PMContractor_1 = () => {
  const {triggerHaptic} = useHapticFeedback();

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [addCashModal, setAddCashModal] = useState(false);
  const [timekeeperWalletModal, setTimerKeeperWalletModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
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
    {
      name: 'John Doe',
      tag: 'Organizer',
      time: '12:30 AM',
      date: '12 Sep 2024',
      pic: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Horizon Belmound Construction Inventory Found in the Underground',
      desc: 'Insatll safety barriers on the 4th-floor perimeter. Ensure the gaps between walls',
      _id: 47896,
    },
    {
      name: 'John Doe',
      tag: 'Organizer',
      time: '12:30 AM',
      date: '12 Sep 2024',
      pic: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Horizon Belmound Construction Inventory Found in the Underground',
      desc: 'Insatll safety barriers on the 4th-floor perimeter. Ensure the gaps between walls',
      _id: 32569,
    },
    {
      name: 'John Doe',
      tag: 'Organizer',
      time: '12:30 AM',
      date: '12 Sep 2024',
      pic: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Horizon Belmound Construction Inventory Found in the Underground',
      desc: 'Insatll safety barriers on the 4th-floor perimeter. Ensure the gaps between walls',
      _id: 45871,
    },
    {
      name: 'John Doe',
      tag: 'Organizer',
      time: '12:30 AM',
      date: '12 Sep 2024',
      pic: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Horizon Belmound Construction Inventory Found in the Underground',
      desc: 'Insatll safety barriers on the 4th-floor perimeter. Ensure the gaps between walls',
      _id: 54698,
    },
  ]);
  const [data, setData] = useState({
    priority: '',
    name: '',
    reporting: '',
    role: '',
    photo: '',
    cash: '',
  });

  // ______________________________Animation for dropdowns_________________________
  const animationValue = useRef(
    new Animated.Value(-responsiveScreenHeight(0)),
  ).current;
  const animationValue1 = useRef(new Animated.Value(0)).current;

  const handlePressToggleButton = (id: string) => {
    if (clickedDrop === id) {
      // Close animation (first translateY, then collapse height)
      Animated.timing(animationValue, {
        toValue: -responsiveScreenHeight(4), // Move content up before collapsing
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
        toValue: responsiveScreenHeight(4), // Expand height first
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
      <Header title={'Contractors'} />

      {/* ------------------------------Tools--------------------------------- */}
      <View style={{flex: 1}}>
        <FlatList
          data={dummyData}
          keyExtractor={item => item._id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}: any) => {
            return (
              <View
                style={{
                  marginTop: responsiveScreenHeight(1.5),
                  //   maxHeight: responsiveScreenHeight(24),
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
                      borderRadius: 25,
                      //   overflow: 'hidden',
                      minHeight: responsiveScreenHeight(17),
                      backgroundColor: color.white,
                    }}>
                    {/* _________________________Top navigation box_____________________ */}
                    <Shadow
                      distance={2}
                      style={{
                        width: '100%',
                      }}
                      startColor={color.gray2}
                      offset={[0, 1]}>
                      <Pressable
                        onPress={() => {
                          navigation.navigate(routes.PM_CONTRACTOR_2);
                        }}
                        style={{
                          height: responsiveScreenHeight(8.4),
                          borderRadius: 25,
                          backgroundColor: color.white,
                          overflow: 'hidden',
                          zIndex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingLeft: responsiveScreenWidth(3.5),
                          marginBottom: responsiveScreenHeight(0.5),
                        }}>
                        {/* =============Left======================== */}
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: responsiveScreenWidth(2),
                          }}>
                          <View
                            style={{
                              height: responsiveScreenHeight(4.5),
                              width: responsiveScreenHeight(4.5),
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 50,
                              backgroundColor: color.primary,
                              marginRight: responsiveScreenWidth(1),
                            }}>
                            <Image
                              source={require('../../../assests/icons/electric.png')}
                              style={{
                                tintColor: color.white,
                                aspectRatio: 1,
                                height: '60%',
                                resizeMode: 'contain',
                              }}
                            />
                          </View>

                          <View
                            style={{
                              gap: responsiveScreenHeight(0.2),
                            }}>
                            <Text
                              style={{
                                color: color.black87,
                                fontFamily: font.NunitoSemiBold,
                                fontSize: responsiveScreenFontSize(1.8),
                              }}>
                              Shree Balaji Contractors
                            </Text>
                            <Text
                              style={{
                                color: color.primary,
                                fontFamily: font.NunitoSemiBold,
                                fontSize: responsiveScreenFontSize(1.5),
                              }}>
                              Electrician
                            </Text>
                          </View>
                        </View>

                        {/* =============Right======================== */}
                        <View
                          style={{
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: color.white,
                              fontSize: responsiveScreenFontSize(1.5),
                              fontFamily: font.NunitoMedium,
                              paddingVertical: responsiveScreenHeight(0.4),
                              paddingLeft: responsiveScreenWidth(2),
                              paddingRight: responsiveScreenWidth(4),
                              backgroundColor: color.primary,
                              borderTopLeftRadius: 50,
                              borderBottomLeftRadius: 50,
                              marginRight: -responsiveScreenWidth(1.5),
                            }}>
                            12000 Sft
                          </Text>
                          <Text
                            style={{
                              color: color.primaryForTop,
                              fontSize: responsiveScreenFontSize(1.5),
                              fontFamily: font.NunitoMedium,
                              paddingVertical: responsiveScreenHeight(0.4),
                              paddingLeft: responsiveScreenWidth(2),
                              paddingRight: responsiveScreenWidth(5),
                              backgroundColor: color.primaryLow,
                              borderTopLeftRadius: 50,
                              borderBottomLeftRadius: 50,
                              marginRight: -responsiveScreenWidth(1.5),
                            }}>
                            ₹ 600/Day
                          </Text>
                          <Text
                            style={{
                              color: color.secondary,
                              fontSize: responsiveScreenFontSize(1.5),
                              fontFamily: font.NunitoMedium,
                              paddingVertical: responsiveScreenHeight(0.4),
                              paddingLeft: responsiveScreenWidth(2),
                              paddingRight: responsiveScreenWidth(5),
                              backgroundColor: color.secondaryLow,
                              borderTopLeftRadius: 50,
                              borderBottomLeftRadius: 50,
                              marginRight: -responsiveScreenWidth(1.5),
                            }}>
                            ₹ 400/Day
                          </Text>
                        </View>
                      </Pressable>
                    </Shadow>

                    {/* _________________________Bottom dropdown click box_____________________ */}
                    <Pressable
                      onPress={() => handlePressToggleButton(item._id)}
                      style={{
                        height: responsiveScreenHeight(8),
                        borderRadius: 25,
                        backgroundColor: color.white,
                        overflow: 'hidden',
                        zIndex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: responsiveScreenWidth(3.5),
                      }}>
                      {/* =============Left======================== */}
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: responsiveScreenWidth(2),
                        }}>
                        <View
                          style={{
                            height: responsiveScreenHeight(4.5),
                            width: responsiveScreenHeight(4.5),
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 50,
                            backgroundColor: color.primaryLow,
                            marginRight: responsiveScreenWidth(1),
                          }}>
                          <Image
                            source={require('../../../assests/icons/user.png')}
                            style={{
                              tintColor: color.primary,
                              aspectRatio: 1,
                              height: '60%',
                              resizeMode: 'contain',
                            }}
                          />
                        </View>

                        <View style={{}}>
                          <Text
                            style={{
                              color: color.black87,
                              fontFamily: font.NunitoMedium,
                              fontSize: responsiveScreenFontSize(1.8),
                            }}>
                            Suryavanshi
                          </Text>
                          <Text
                            style={{
                              color: color.black28,
                              fontFamily: font.NunitoSemiBold,
                              fontSize: responsiveScreenFontSize(1.5),
                            }}>
                            Name
                          </Text>
                        </View>
                      </View>

                      {/* =============Right======================== */}
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Pressable
                          onPress={() => {
                            triggerHaptic('impactMedium');
                            // setAddCashModal(true);
                          }}
                          hitSlop={{
                            top: 10,
                            bottom: 10,
                            left: 10,
                            right: 10,
                          }}
                          style={{
                            height: responsiveScreenHeight(4),
                            width: responsiveScreenHeight(4),
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 50,
                            backgroundColor: '#FFFFFF47',
                          }}>
                          <Image
                            source={require('../../../assests/icons/comment.png')}
                            style={{
                              tintColor: color.primary,
                              aspectRatio: 1,
                              height: '60%',
                              resizeMode: 'contain',
                            }}
                          />
                        </Pressable>
                        <Pressable
                          onPress={() => {
                            triggerHaptic('impactMedium');
                            // setHistoryModal(true);
                          }}
                          hitSlop={{
                            top: 10,
                            bottom: 10,
                            left: 10,
                            right: 10,
                          }}
                          style={{
                            height: responsiveScreenHeight(4),
                            width: responsiveScreenHeight(4),
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 50,
                            backgroundColor: '#FFFFFF47',
                          }}>
                          <Image
                            source={require('../../../assests/icons/watsapp.png')}
                            style={{
                              tintColor: color.primary,
                              aspectRatio: 1,
                              height: '60%',
                              resizeMode: 'contain',
                            }}
                          />
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
                      borderBottomLeftRadius: 25,
                      borderBottomEndRadius: 25,
                      //   marginTop: -responsiveScreenHeight(2),
                      backgroundColor: color.white,
                    }}>
                    <View
                      style={{
                        gap: responsiveScreenHeight(0.6),
                        height: '100%',
                        // marginTop:-responsiveScreenHeight(2)
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          width: '50%',
                          backgroundColor: color.primaryLow,
                          borderBottomEndRadius: 25,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: font.NunitoRegular,
                            fontSize: responsiveScreenFontSize(2),
                            color: color.black87,
                            marginLeft: responsiveScreenWidth(1),
                          }}>
                          48
                        </Text>
                        <Text
                          style={{
                            fontFamily: font.NunitoSemiBold,
                            fontSize: responsiveScreenFontSize(1.5),
                            color: color.primaryForTop,
                            marginLeft: responsiveScreenWidth(1),
                          }}>
                          Skilled
                        </Text>
                      </View>

                      <View
                        style={{
                          height: '100%',
                          width: '50%',
                          backgroundColor: color.secondaryLow,
                          borderBottomLeftRadius: 25,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontFamily: font.NunitoRegular,
                            fontSize: responsiveScreenFontSize(2),
                            color: color.black87,
                            marginLeft: responsiveScreenWidth(1),
                          }}>
                          90
                        </Text>
                        <Text
                          style={{
                            fontFamily: font.NunitoSemiBold,
                            fontSize: responsiveScreenFontSize(1.5),
                            color: color.secondary,
                            marginLeft: responsiveScreenWidth(1),
                          }}>
                          Unskilled
                        </Text>
                      </View>
                    </View>
                  </Animated.View>
                )}
              </View>
            );
          }}
          contentContainerStyle={{
            paddingHorizontal: responsiveScreenWidth(3),
            paddingVertical: responsiveScreenHeight(1),
          }}
        />
      </View>
    </View>
  );
};

export default PMContractor_1;
