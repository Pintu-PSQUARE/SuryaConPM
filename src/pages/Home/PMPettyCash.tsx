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
import Svg, {
  Defs,
  Line,
  LinearGradient,
  Rect,
  Stop,
  SvgXml,
} from 'react-native-svg';
import {Shadow} from 'react-native-shadow-2';
import {
  BottomModal,
  Header,
  LinearGradient as CustomLinearGradient,
  AnimatedInput,
} from '../../component';
import useHapticFeedback from '../../hooks/useHapticFeedback';
import {PanResponder} from 'react-native';

const PMPettyCash = () => {
  const {triggerHaptic} = useHapticFeedback();

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [addCashModal, setAddCashModal] = useState(false);
  const [timekeeperWalletModal, setTimerKeeperWalletModal] = useState(false);
  const [hisModal, setHisModal] = useState(false);
  const [comment, setComment] = useState('');
  const [slide, setSlide] = useState(false);
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
    new Animated.Value(-responsiveScreenHeight(10)),
  ).current;
  const animationValue1 = useRef(new Animated.Value(0)).current;

  const handlePressToggleButton = (id: string) => {
    if (clickedDrop === id) {
      // Close animation (first translateY, then collapse height)
      Animated.timing(animationValue, {
        toValue: -responsiveScreenHeight(20), // Move content up before collapsing
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(animationValue1, {
          toValue: 0, // Collapse height
          duration: 300,
          useNativeDriver: false,
        }).start(() => setClickedDrop(null));
      });
    } else {
      setClickedDrop(id);
      // Open animation (expand height first, then animate translateY)
      Animated.timing(animationValue1, {
        toValue: responsiveScreenHeight(27), // Expand height first
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(animationValue, {
          toValue: 0, // Bring content down smoothly
          duration: 300,
          useNativeDriver: false,
        }).start();
      });
    }
  };
  // ________________________________________END_______________________________________

  // ______________________________Animation for shrink width_________________________
  const animatedValueForWidth = new Animated.Value(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Only activate swipe when the gesture is more horizontal than vertical
      return (
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
        Math.abs(gestureState.dx) > 1
      );
    },

    onPanResponderMove: (evt, gestureState) => {
      // Shrink the card's width as it is swiped left
      if (gestureState.dx < -1) {
        animatedValueForWidth.setValue(Math.max(gestureState.dx, -1)); // Shrink width up to a maximum value
      }
    },

    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx < -1) {
        // Complete the swipe
        Animated.timing(animatedValueForWidth, {
          toValue: -200, // Fully shrink the width
          duration: 300,
          useNativeDriver: false, // Width animation does not support native driver
        }).start();
      } else {
        // Reset the swipe
        Animated.timing(animatedValueForWidth, {
          toValue: 0, // Reset to original width
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const animatedStyle = {
    width: animatedValueForWidth.interpolate({
      inputRange: [-200, 0],
      outputRange: ['91%', '100%'], // Shrinks width from 95% to 60%
      extrapolate: 'clamp',
    }),
  };
  // ______________________________________END________________________________________

  return (
    <View style={{flex: 1, backgroundColor: color.white}}>
      <Header title={'Petty Cash'} />

      {/* -----------------------Transaction History modal-------------------------- */}
      <BottomModal
        visible={hisModal}
        onClose={() => {
          setHisModal(false);
        }}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: responsiveScreenWidth(4),
            paddingVertical: responsiveScreenHeight(2),
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View
              style={{
                height: '1%',
                width: '15%',
              }}
            />
            <Text
              style={{
                fontFamily: font.NunitoSemiBold,
                color: color.primary,
                fontSize: responsiveScreenFontSize(2),
                marginBottom: responsiveScreenHeight(3),
              }}>
              Add Cash
            </Text>
            <View>
              <Text
                style={{
                  color: color.secondary,
                  fontSize: responsiveScreenFontSize(1.3),
                  fontFamily: font.NunitoMedium,
                  backgroundColor: color.secondaryLow,
                  padding: 5,
                  borderRadius: 25,
                }}>
                Rs 5,000
              </Text>
            </View>
          </View>

          {/* -----------------------------------------------History----------------------------------------- */}
          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveScreenWidth(4),
                }}>
                <View
                  style={{
                    height: responsiveScreenWidth(3.5),
                    width: responsiveScreenWidth(3.5),
                    borderRadius: responsiveScreenWidth(1.75),
                    borderWidth: responsiveScreenWidth(0.7),
                    borderColor: color.primary,
                  }}
                />
                <Text
                  style={{
                    fontSize: responsiveScreenFontSize(2),
                    fontFamily: font.NunitoSemiBold,
                    color: color.black87,
                  }}>
                  02 Items
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveScreenWidth(3),
                }}>
                <View>
                  <Text
                    style={{
                      color: color.secondary,
                      fontSize: responsiveScreenFontSize(1.8),
                      fontFamily: font.NunitoSemiBold,
                      padding: 5,
                      borderRadius: 25,
                    }}>
                    Oct 12
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: color.primary,
                      fontSize: responsiveScreenFontSize(1.5),
                      fontFamily: font.NunitoMedium,
                      backgroundColor: color.primaryLow,
                      padding: 5,
                      borderRadius: 25,
                    }}>
                    ₹ 1000
                  </Text>
                </View>
              </View>
            </View>
            {/* Dotter border--------------------------- */}
            <View
              style={{
                height: responsiveScreenHeight(3),
                width: '100%',
                marginLeft: responsiveScreenWidth(1.5),
                marginTop: -responsiveScreenHeight(0.5),
                flexDirection: 'row', // Keep text aligned properly
                alignItems: 'center',
              }}>
              {/* Dotted Vertical Line using SVG */}
              <Svg
                height={responsiveScreenHeight(3)}
                width={responsiveScreenWidth(0.5)}
                style={{marginRight: responsiveScreenWidth(2)}} // Adjust spacing
              >
                <Line
                  x1="50%" // Center the line
                  y1="0"
                  x2="50%"
                  y2="100%"
                  stroke={color.primary} // Use your defined color
                  strokeWidth={responsiveScreenWidth(0.5)}
                  strokeDasharray="3,3" // This makes it dotted
                />
              </Svg>

              {/* Text next to the dotted line */}
              <Text
                style={{
                  color: color.gray2,
                }}>
                5
              </Text>
            </View>
          </View>

          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveScreenWidth(4),
                }}>
                <View
                  style={{
                    height: responsiveScreenWidth(3.5),
                    width: responsiveScreenWidth(3.5),
                    borderRadius: responsiveScreenWidth(1.75),
                    borderWidth: responsiveScreenWidth(0.7),
                    borderColor: color.primary,
                  }}
                />
                <Text
                  style={{
                    fontSize: responsiveScreenFontSize(2),
                    fontFamily: font.NunitoSemiBold,
                    color: color.black87,
                  }}>
                  02 Items
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveScreenWidth(3),
                }}>
                <View>
                  <Text
                    style={{
                      color: color.secondary,
                      fontSize: responsiveScreenFontSize(1.8),
                      fontFamily: font.NunitoSemiBold,
                      padding: 5,
                      borderRadius: 25,
                    }}>
                    Oct 12
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: color.primary,
                      fontSize: responsiveScreenFontSize(1.5),
                      fontFamily: font.NunitoMedium,
                      backgroundColor: color.primaryLow,
                      padding: 5,
                      borderRadius: 25,
                    }}>
                    ₹ 1000
                  </Text>
                </View>
              </View>
            </View>
            {/* Dotter border--------------------------- */}
            <View
              style={{
                height: responsiveScreenHeight(3),
                width: '100%',
                marginLeft: responsiveScreenWidth(1.5),
                marginTop: -responsiveScreenHeight(0.5),
                flexDirection: 'row', // Keep text aligned properly
                alignItems: 'center',
              }}>
              {/* Dotted Vertical Line using SVG */}
              <Svg
                height={responsiveScreenHeight(3)}
                width={responsiveScreenWidth(0.5)}
                style={{marginRight: responsiveScreenWidth(2)}} // Adjust spacing
              >
                <Line
                  x1="50%" // Center the line
                  y1="0"
                  x2="50%"
                  y2="100%"
                  stroke={color.primary} // Use your defined color
                  strokeWidth={responsiveScreenWidth(0.5)}
                  strokeDasharray="3,3" // This makes it dotted
                />
              </Svg>

              {/* Text next to the dotted line */}
              <Text
                style={{
                  color: color.gray2,
                }}>
                5
              </Text>
            </View>
          </View>

          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveScreenWidth(4),
                }}>
                <View
                  style={{
                    height: responsiveScreenWidth(3.5),
                    width: responsiveScreenWidth(3.5),
                    borderRadius: responsiveScreenWidth(1.75),
                    borderWidth: responsiveScreenWidth(0.7),
                    borderColor: color.primary,
                  }}
                />
                <Text
                  style={{
                    fontSize: responsiveScreenFontSize(2),
                    fontFamily: font.NunitoSemiBold,
                    color: color.black87,
                  }}>
                  02 Items
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveScreenWidth(3),
                }}>
                <View>
                  <Text
                    style={{
                      color: color.secondary,
                      fontSize: responsiveScreenFontSize(1.8),
                      fontFamily: font.NunitoSemiBold,
                      padding: 5,
                      borderRadius: 25,
                    }}>
                    Oct 12
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: color.primary,
                      fontSize: responsiveScreenFontSize(1.5),
                      fontFamily: font.NunitoMedium,
                      backgroundColor: color.primaryLow,
                      padding: 5,
                      borderRadius: 25,
                    }}>
                    ₹ 1000
                  </Text>
                </View>
              </View>
            </View>
            {/* Dotter border--------------------------- */}
            <View
              style={{
                height: responsiveScreenHeight(3),
                width: '100%',
                marginLeft: responsiveScreenWidth(1.5),
                marginTop: -responsiveScreenHeight(0.5),
                flexDirection: 'row', // Keep text aligned properly
                alignItems: 'center',
              }}>
              {/* Dotted Vertical Line using SVG */}
              <Svg
                height={responsiveScreenHeight(3)}
                width={responsiveScreenWidth(0.5)}
                style={{marginRight: responsiveScreenWidth(2)}} // Adjust spacing
              >
                <Line
                  x1="50%" // Center the line
                  y1="0"
                  x2="50%"
                  y2="100%"
                  stroke={color.primary} // Use your defined color
                  strokeWidth={responsiveScreenWidth(0.5)}
                  strokeDasharray="3,3" // This makes it dotted
                />
              </Svg>

              {/* Text next to the dotted line */}
              <Text
                style={{
                  color: color.gray2,
                }}>
                5
              </Text>
            </View>
          </View>

          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveScreenWidth(4),
                }}>
                <View
                  style={{
                    height: responsiveScreenWidth(3.5),
                    width: responsiveScreenWidth(3.5),
                    borderRadius: responsiveScreenWidth(1.75),
                    borderWidth: responsiveScreenWidth(0.7),
                    borderColor: color.primary,
                  }}
                />
                <Text
                  style={{
                    fontSize: responsiveScreenFontSize(2),
                    fontFamily: font.NunitoSemiBold,
                    color: color.black87,
                  }}>
                  02 Items
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveScreenWidth(3),
                }}>
                <View>
                  <Text
                    style={{
                      color: color.secondary,
                      fontSize: responsiveScreenFontSize(1.8),
                      fontFamily: font.NunitoSemiBold,
                      padding: 5,
                      borderRadius: 25,
                    }}>
                    Oct 12
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: color.primary,
                      fontSize: responsiveScreenFontSize(1.5),
                      fontFamily: font.NunitoMedium,
                      backgroundColor: color.primaryLow,
                      padding: 5,
                      borderRadius: 25,
                    }}>
                    ₹ 1000
                  </Text>
                </View>
              </View>
            </View>
            {/* Dotter border--------------------------- */}
            <View
              style={{
                height: responsiveScreenHeight(3),
                width: '100%',
                marginLeft: responsiveScreenWidth(1.5),
                marginTop: -responsiveScreenHeight(0.5),
                flexDirection: 'row', // Keep text aligned properly
                alignItems: 'center',
              }}>
              {/* Dotted Vertical Line using SVG */}
              <Svg
                height={responsiveScreenHeight(3)}
                width={responsiveScreenWidth(0.5)}
                style={{marginRight: responsiveScreenWidth(2)}} // Adjust spacing
              >
                <Line
                  x1="50%" // Center the line
                  y1="0"
                  x2="50%"
                  y2="100%"
                  stroke={color.primary} // Use your defined color
                  strokeWidth={responsiveScreenWidth(0.5)}
                  strokeDasharray="3,3" // This makes it dotted
                />
              </Svg>

              {/* Text next to the dotted line */}
              <Text
                style={{
                  color: color.gray2,
                }}>
                5
              </Text>
            </View>
          </View>
        </View>
      </BottomModal>

      {/* -----------------------Add cash modal-------------------------- */}
      <BottomModal
        visible={addCashModal}
        onClose={() => setAddCashModal(false)}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: responsiveScreenWidth(3),
            paddingVertical: responsiveScreenHeight(2),
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View
              style={{
                height: '1%',
                width: '15%',
              }}
            />
            <Text
              style={{
                fontFamily: font.NunitoSemiBold,
                color: color.primary,
                fontSize: responsiveScreenFontSize(2),
                marginBottom: responsiveScreenHeight(3),
              }}>
              Add Cash
            </Text>
            <View>
              <Text
                style={{
                  color: color.secondary,
                  fontSize: responsiveScreenFontSize(1.2),
                  fontFamily: font.NunitoMedium,
                  backgroundColor: color.secondaryLow,
                  padding: 5,
                  borderRadius: 25,
                }}>
                Rs 20,000
              </Text>
            </View>
          </View>

          {/* -----------------------------------------------Amount Add----------------------------------------- */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: responsiveScreenHeight(3),
              gap: responsiveScreenWidth(2),
              marginBottom: responsiveScreenHeight(2),
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <AnimatedInput
                label="Amount"
                value={data.cash}
                inpColor={color.gray2}
                onChange={e => {
                  setData({...data, cash: e});
                }}
              />
            </View>
          </View>
          <Pressable style={{}}>
            <CustomLinearGradient
              style={{
                height: responsiveScreenHeight(5.5),
                width: responsiveScreenHeight(25),
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
                Add
              </Text>
            </CustomLinearGradient>
          </Pressable>
        </View>
      </BottomModal>

      {/* -----------------------Timekeeper wallet modal modal-------------------------- */}
      <BottomModal
        visible={timekeeperWalletModal}
        onClose={() => {
          setTimerKeeperWalletModal(false);
        }}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: responsiveScreenWidth(3.5),
            paddingVertical: responsiveScreenHeight(2.5),
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: responsiveScreenHeight(1.5),
            }}>
            <View
              style={{
                height: '1%',
                width: '12%',
              }}
            />
            <Text
              style={{
                fontFamily: font.NunitoSemiBold,
                color: color.primary,
                fontSize: responsiveScreenFontSize(2),
              }}>
              Wallets
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: responsiveScreenWidth(1),
              }}>
              <Pressable
                hitSlop={{
                  top: 10,
                  bottom: 10,
                  left: 10,
                  right: 10,
                }}
                style={{
                  height: responsiveScreenHeight(2.8),
                  width: responsiveScreenHeight(2.8),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Image
                  source={require('../../assests/icons/add-circle.png')}
                  style={{
                    tintColor: color.primary,
                    aspectRatio: 1,
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                />
              </Pressable>
              <Pressable
                hitSlop={{
                  top: 10,
                  bottom: 10,
                  left: 10,
                  right: 10,
                }}
                style={{
                  height: responsiveScreenHeight(2.8),
                  width: responsiveScreenHeight(2.8),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: responsiveScreenWidth(2),
                }}>
                <Image
                  source={require('../../assests/icons/pencil-edit.png')}
                  style={{
                    tintColor: color.primary,
                    aspectRatio: 1,
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                />
              </Pressable>
            </View>
          </View>

          {/* -----------------------------------------------wallet card----------------------------------------- */}
          <CustomLinearGradient
            colors={['#E8B000', '#AE8400']}
            style={{
              width: '100%',
              backgroundColor: color.primaryForTop,
              alignSelf: 'center',
              marginVertical: responsiveScreenHeight(1),
              borderRadius: 25,
            }}>
            <View
              style={{
                paddingHorizontal: responsiveScreenWidth(3.5),
                paddingVertical: responsiveScreenHeight(1.8),
              }}>
              {/* =============top======================== */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderRadius: 30,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: responsiveScreenWidth(2),
                  }}>
                  <View
                    style={{
                      height: responsiveScreenHeight(2.3),
                      width: responsiveScreenHeight(2.3),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                    }}>
                    <Image
                      source={require('../../assests/icons/wallet.png')}
                      style={{
                        tintColor: color.white,
                        aspectRatio: 1,
                        height: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      color: color.white,
                      fontSize: responsiveScreenFontSize(1.8),
                      fontFamily: font.NunitoMedium,
                    }}>
                    Vishal Gupta
                  </Text>
                  <Text
                    style={{
                      color: color.secondary,
                      fontSize: responsiveScreenFontSize(1.4),
                      fontFamily: font.NunitoMedium,
                      backgroundColor: color.secondaryLow,
                      paddingHorizontal: responsiveScreenWidth(2),
                      paddingVertical: responsiveScreenHeight(0.4),
                      borderRadius: 30,
                    }}>
                    Project Manager
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: responsiveScreenWidth(2),
                  }}>
                  <Pressable
                    onPress={() => {
                      setTimerKeeperWalletModal(false);
                      setTimeout(() => {
                        setAddCashModal(true); // Open second modal after delay
                      }, 100);
                      triggerHaptic('impactMedium');
                    }}
                    hitSlop={{
                      top: 10,
                      bottom: 10,
                      left: 10,
                      right: 10,
                    }}
                    style={{
                      height: responsiveScreenHeight(3.7),
                      width: responsiveScreenHeight(3.7),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                      backgroundColor: '#FFFFFF47',
                    }}>
                    <Image
                      source={require('../../assests/icons/comment.png')}
                      style={{
                        tintColor: color.white,
                        aspectRatio: 1,
                        height: '55%',
                        resizeMode: 'contain',
                      }}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setTimerKeeperWalletModal(false);
                      setTimeout(() => {
                        setHisModal(true); // Open second modal after delay
                      }, 100);
                      triggerHaptic('impactMedium');
                      console.log('Modal State:', hisModal);
                    }}
                    hitSlop={{
                      top: 10,
                      bottom: 10,
                      left: 10,
                      right: 10,
                    }}
                    style={{
                      height: responsiveScreenHeight(3.7),
                      width: responsiveScreenHeight(3.7),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                      backgroundColor: '#FFFFFF47',
                    }}>
                    <Image
                      source={require('../../assests/icons/call.png')}
                      style={{
                        tintColor: color.white,
                        aspectRatio: 1,
                        height: '60%',
                        resizeMode: 'contain',
                      }}
                    />
                  </Pressable>
                </View>
              </View>

              {/* =============Bottom======================== */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                    }}>
                    <Text
                      style={{
                        color: color.primary,
                        fontSize: responsiveScreenFontSize(2.4),
                        fontFamily: font.NunitoMedium,
                        marginRight: responsiveScreenWidth(1.5),
                      }}>
                      9,000
                    </Text>
                    <Text
                      style={{
                        color: color.white,
                        fontSize: responsiveScreenFontSize(2.4),
                        fontFamily: font.NunitoMedium,
                      }}>
                      / 20,000{' '}
                    </Text>
                    <Text
                      style={{
                        color: color.white,
                        fontSize: responsiveScreenFontSize(1.5),
                        fontFamily: font.NunitoMedium,
                      }}>
                      Rs
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                    }}>
                    <Text
                      style={{
                        color: color.white,
                        fontSize: responsiveScreenFontSize(1.4),
                        fontFamily: font.NunitoMedium,
                        opacity: 0.7,
                      }}>
                      Last used on 10 Feb{' '}
                    </Text>
                    <Text
                      style={{
                        color: color.white,
                        fontSize: responsiveScreenFontSize(1.4),
                        fontFamily: font.NunitoMedium,
                      }}>
                      Rs 5000
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: responsiveScreenWidth(2),
                    marginTop: responsiveScreenHeight(1),
                  }}>
                  <Pressable
                    onPress={() => {
                      setTimerKeeperWalletModal(false);
                      setTimeout(() => {
                        setAddCashModal(true); // Open second modal after delay
                      }, 100);
                      triggerHaptic('impactMedium');
                    }}
                    hitSlop={{
                      top: 10,
                      bottom: 10,
                      left: 10,
                      right: 10,
                    }}
                    style={{
                      height: responsiveScreenHeight(3.7),
                      width: responsiveScreenHeight(3.7),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                      backgroundColor: '#FFFFFF47',
                    }}>
                    <Image
                      source={require('../../assests/icons/add-circle.png')}
                      style={{
                        tintColor: color.white,
                        aspectRatio: 1,
                        height: '70%',
                        resizeMode: 'contain',
                      }}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setTimerKeeperWalletModal(false);
                      setTimeout(() => {
                        setHisModal(true); // Open second modal after delay
                      }, 100);
                      triggerHaptic('impactMedium');
                      console.log('Modal State:', hisModal);
                    }}
                    hitSlop={{
                      top: 10,
                      bottom: 10,
                      left: 10,
                      right: 10,
                    }}
                    style={{
                      height: responsiveScreenHeight(3.7),
                      width: responsiveScreenHeight(3.7),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                      backgroundColor: '#FFFFFF47',
                    }}>
                    <Image
                      source={require('../../assests/icons/msg.png')}
                      style={{
                        tintColor: color.white,
                        aspectRatio: 1,
                        height: '55%',
                        resizeMode: 'contain',
                      }}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </CustomLinearGradient>

          {/* -----------------------------------------------wallet card-----------------------------------------  */}
          <CustomLinearGradient
            colors={['#E8B000', '#AE8400']}
            style={{
              width: '100%',
              backgroundColor: color.primaryForTop,
              alignSelf: 'center',
              marginVertical: responsiveScreenHeight(1),
              borderRadius: 25,
            }}>
            <View
              style={{
                paddingHorizontal: responsiveScreenWidth(3.5),
                paddingVertical: responsiveScreenHeight(1.8),
              }}>
              {/* =============top======================== */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderRadius: 30,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: responsiveScreenWidth(2),
                  }}>
                  <View
                    style={{
                      height: responsiveScreenHeight(2.3),
                      width: responsiveScreenHeight(2.3),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                    }}>
                    <Image
                      source={require('../../assests/icons/wallet.png')}
                      style={{
                        tintColor: color.white,
                        aspectRatio: 1,
                        height: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      color: color.white,
                      fontSize: responsiveScreenFontSize(1.8),
                      fontFamily: font.NunitoMedium,
                    }}>
                    Vishal Gupta
                  </Text>
                  <Text
                    style={{
                      color: color.secondary,
                      fontSize: responsiveScreenFontSize(1.4),
                      fontFamily: font.NunitoMedium,
                      backgroundColor: color.secondaryLow,
                      paddingHorizontal: responsiveScreenWidth(2),
                      paddingVertical: responsiveScreenHeight(0.4),
                      borderRadius: 30,
                    }}>
                    Project Manager
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: responsiveScreenWidth(2),
                  }}>
                  <Pressable
                    onPress={() => {
                      setTimerKeeperWalletModal(false);
                      setTimeout(() => {
                        setAddCashModal(true); // Open second modal after delay
                      }, 100);
                      triggerHaptic('impactMedium');
                    }}
                    hitSlop={{
                      top: 10,
                      bottom: 10,
                      left: 10,
                      right: 10,
                    }}
                    style={{
                      height: responsiveScreenHeight(3.7),
                      width: responsiveScreenHeight(3.7),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                      backgroundColor: '#FFFFFF47',
                    }}>
                    <Image
                      source={require('../../assests/icons/comment.png')}
                      style={{
                        tintColor: color.white,
                        aspectRatio: 1,
                        height: '55%',
                        resizeMode: 'contain',
                      }}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setTimerKeeperWalletModal(false);
                      setTimeout(() => {
                        setHisModal(true); // Open second modal after delay
                      }, 100);
                      triggerHaptic('impactMedium');
                      console.log('Modal State:', hisModal);
                    }}
                    hitSlop={{
                      top: 10,
                      bottom: 10,
                      left: 10,
                      right: 10,
                    }}
                    style={{
                      height: responsiveScreenHeight(3.7),
                      width: responsiveScreenHeight(3.7),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                      backgroundColor: '#FFFFFF47',
                    }}>
                    <Image
                      source={require('../../assests/icons/call.png')}
                      style={{
                        tintColor: color.white,
                        aspectRatio: 1,
                        height: '60%',
                        resizeMode: 'contain',
                      }}
                    />
                  </Pressable>
                </View>
              </View>

              {/* =============Bottom======================== */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                    }}>
                    <Text
                      style={{
                        color: color.primary,
                        fontSize: responsiveScreenFontSize(2.4),
                        fontFamily: font.NunitoMedium,
                        marginRight: responsiveScreenWidth(1.5),
                      }}>
                      9,000
                    </Text>
                    <Text
                      style={{
                        color: color.white,
                        fontSize: responsiveScreenFontSize(2.4),
                        fontFamily: font.NunitoMedium,
                      }}>
                      / 20,000{' '}
                    </Text>
                    <Text
                      style={{
                        color: color.white,
                        fontSize: responsiveScreenFontSize(1.5),
                        fontFamily: font.NunitoMedium,
                      }}>
                      Rs
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                    }}>
                    <Text
                      style={{
                        color: color.white,
                        fontSize: responsiveScreenFontSize(1.4),
                        fontFamily: font.NunitoMedium,
                        opacity: 0.7,
                      }}>
                      Last used on 10 Feb{' '}
                    </Text>
                    <Text
                      style={{
                        color: color.white,
                        fontSize: responsiveScreenFontSize(1.4),
                        fontFamily: font.NunitoMedium,
                      }}>
                      Rs 5000
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: responsiveScreenWidth(2),
                    marginTop: responsiveScreenHeight(1),
                  }}>
                  <Pressable
                    onPress={() => {
                      setTimerKeeperWalletModal(false);
                      setTimeout(() => {
                        setAddCashModal(true); // Open second modal after delay
                      }, 100);
                      triggerHaptic('impactMedium');
                    }}
                    hitSlop={{
                      top: 10,
                      bottom: 10,
                      left: 10,
                      right: 10,
                    }}
                    style={{
                      height: responsiveScreenHeight(3.7),
                      width: responsiveScreenHeight(3.7),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                      backgroundColor: '#FFFFFF47',
                    }}>
                    <Image
                      source={require('../../assests/icons/add-circle.png')}
                      style={{
                        tintColor: color.white,
                        aspectRatio: 1,
                        height: '70%',
                        resizeMode: 'contain',
                      }}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setTimerKeeperWalletModal(false);
                      setTimeout(() => {
                        setHisModal(true); // Open second modal after delay
                      }, 100);
                      triggerHaptic('impactMedium');
                      console.log('Modal State:', hisModal);
                    }}
                    hitSlop={{
                      top: 10,
                      bottom: 10,
                      left: 10,
                      right: 10,
                    }}
                    style={{
                      height: responsiveScreenHeight(3.7),
                      width: responsiveScreenHeight(3.7),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                      backgroundColor: '#FFFFFF47',
                    }}>
                    <Image
                      source={require('../../assests/icons/msg.png')}
                      style={{
                        tintColor: color.white,
                        aspectRatio: 1,
                        height: '55%',
                        resizeMode: 'contain',
                      }}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </CustomLinearGradient>
        </View>
      </BottomModal>

      {/* -----------------------Wallet detail card---------------------------- */}

      <CustomLinearGradient
        style={{
          height: responsiveScreenHeight(12),
          width: '95%',
          backgroundColor: color.primaryForTop,
          alignSelf: 'center',
          marginTop: responsiveScreenHeight(1.5),
          marginBottom: responsiveScreenHeight(1),
          borderRadius: 25,
        }}>
        <View
          style={{
            paddingHorizontal: responsiveScreenWidth(3.5),
            paddingVertical: responsiveScreenHeight(1.8),
            gap: responsiveScreenHeight(0.7),
          }}>
          {/* =============top======================== */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderRadius: 30,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: responsiveScreenWidth(2),
              }}>
              <View
                style={{
                  height: responsiveScreenHeight(2.3),
                  width: responsiveScreenHeight(2.3),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  backgroundColor: color.primary,
                }}>
                <Image
                  source={require('../../assests/icons/wallet.png')}
                  style={{
                    tintColor: color.white,
                    aspectRatio: 1,
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <Text
                style={{
                  color: color.white,
                  fontSize: responsiveScreenFontSize(1.8),
                  fontFamily: font.NunitoMedium,
                }}>
                Wallet Balance
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#FFFFFF47',
                paddingHorizontal: responsiveScreenWidth(1.5),
                paddingVertical: responsiveScreenWidth(1),
                borderRadius: 30,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: responsiveScreenHeight(1.5),
                  width: responsiveScreenHeight(1.5),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: responsiveScreenWidth(1),
                }}>
                <Image
                  source={require('../../assests/icons/reload.png')}
                  style={{
                    tintColor: color.white,
                    aspectRatio: 1,
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <Text
                style={{
                  color: color.white,
                  fontSize: responsiveScreenFontSize(1.4),
                  fontFamily: font.NunitoSemiBold,
                  marginRight: responsiveScreenWidth(1),
                }}>
                1 Feb
              </Text>
            </View>
          </View>

          {/* =============Bottom======================== */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                gap: responsiveScreenHeight(0.2),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline',
                }}>
                <Text
                  style={{
                    color: color.secondary,
                    fontSize: responsiveScreenFontSize(2.4),
                    fontFamily: font.NunitoMedium,
                    marginRight: responsiveScreenWidth(1.5),
                  }}>
                  20,000
                </Text>
                <Text
                  style={{
                    color: color.white,
                    fontSize: responsiveScreenFontSize(2.4),
                    fontFamily: font.NunitoMedium,
                  }}>
                  / 50,000{' '}
                </Text>
                <Text
                  style={{
                    color: color.white,
                    fontSize: responsiveScreenFontSize(1.5),
                    fontFamily: font.NunitoMedium,
                  }}>
                  Rs
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline',
                }}>
                <Text
                  style={{
                    color: color.white,
                    fontSize: responsiveScreenFontSize(1.4),
                    fontFamily: font.NunitoMedium,
                    opacity: 0.7,
                  }}>
                  Last used on 10 Feb{' '}
                </Text>
                <Text
                  style={{
                    color: color.white,
                    fontSize: responsiveScreenFontSize(1.4),
                    fontFamily: font.NunitoMedium,
                  }}>
                  Rs 5000
                </Text>
              </View>
            </View>
            <Pressable
              onPress={() => {
                triggerHaptic('impactMedium');
                setAddCashModal(true);
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
                source={require('../../assests/icons/add-circle.png')}
                style={{
                  tintColor: color.white,
                  aspectRatio: 1,
                  height: '70%',
                  resizeMode: 'contain',
                }}
              />
            </Pressable>
          </View>
        </View>
      </CustomLinearGradient>

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
                  marginTop: responsiveScreenHeight(1),
                  maxHeight: responsiveScreenHeight(27),
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
                      borderRadius: 20,
                    }}>
                    <Animated.View
                      {...panResponder.panHandlers}
                      style={[animatedStyle]}>
                      <Pressable
                        style={{
                          height: responsiveScreenHeight(8.4),
                          borderRadius: 19,
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
                              fontSize: responsiveScreenFontSize(1.4),
                              fontFamily: font.NunitoMedium,
                              paddingVertical: responsiveScreenHeight(0.2),
                              paddingLeft: responsiveScreenWidth(2),
                              paddingRight: responsiveScreenWidth(5),
                              backgroundColor: color.primary,
                              borderTopLeftRadius: 50,
                              borderBottomLeftRadius: 50,
                            }}>
                            Oct 12
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
                              marginTop: -responsiveScreenHeight(0.5),
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'baseline',
                                gap: responsiveScreenWidth(1),
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
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                color: color.primary,
                                fontSize: responsiveScreenFontSize(1.5),
                                fontFamily: font.NunitoSemiBold,
                                marginRight: responsiveScreenWidth(2.5),
                                backgroundColor: color.primaryLow,
                                paddingVertical: responsiveScreenHeight(0.4),
                                paddingHorizontal: responsiveScreenWidth(1.5),
                                borderRadius: 20,
                              }}>
                              Rs 1200
                            </Text>
                            <Pressable
                              style={{
                                height: responsiveScreenHeight(2.3),
                                width: responsiveScreenHeight(2.3),
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                                backgroundColor: color.white,
                              }}>
                              <Image
                                source={require('../../assests/icons/msg.png')}
                                style={{
                                  tintColor: color.primary,
                                  aspectRatio: 1,
                                  height: '100%',
                                  resizeMode: 'contain',
                                }}
                              />
                            </Pressable>
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
                        </View>
                      </Pressable>
                    </Animated.View>
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
                        paddingHorizontal: responsiveScreenWidth(2.5),
                        paddingVertical: responsiveScreenHeight(1.5),
                        gap: responsiveScreenHeight(1),
                      }}>
                      {/* <Shadow
                        distance={3}
                        startColor={color.gray2}
                        offset={[0, 0]}> */}
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingHorizontal: responsiveScreenWidth(2.5),
                          paddingVertical: responsiveScreenHeight(1),
                          borderRadius: 50,
                          backgroundColor: color.white,
                          width: responsiveScreenWidth(89),
                          elevation: 1,
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 1},
                          shadowOpacity: 0.18,
                          shadowRadius: 1.0,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: responsiveScreenWidth(2),
                          }}>
                          <View
                            style={{
                              height: responsiveScreenHeight(5.5),
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
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: responsiveScreenWidth(2),
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
                                fontSize: responsiveScreenFontSize(1.4),
                                fontFamily: font.NunitoSemiBold,
                              }}>
                              02 / 02
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
                                fontSize: responsiveScreenFontSize(1.4),
                                fontFamily: font.NunitoSemiBold,
                              }}>
                              Rs 600
                            </Text>
                          </View>
                        </View>
                      </View>
                      {/* </Shadow> */}

                      {/* <Shadow
                        distance={3}
                        startColor={color.gray2}
                        offset={[0, 0]}> */}
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingHorizontal: responsiveScreenWidth(2.5),
                          paddingVertical: responsiveScreenHeight(1),
                          borderRadius: 50,
                          backgroundColor: color.white,
                          width: responsiveScreenWidth(89),
                          elevation: 1,
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 1},
                          shadowOpacity: 0.18,
                          shadowRadius: 1.0,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: responsiveScreenWidth(2),
                          }}>
                          <View
                            style={{
                              height: responsiveScreenHeight(5.5),
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
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: responsiveScreenWidth(2),
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
                                fontSize: responsiveScreenFontSize(1.4),
                                fontFamily: font.NunitoSemiBold,
                              }}>
                              02 / 02
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
                                fontSize: responsiveScreenFontSize(1.4),
                                fontFamily: font.NunitoSemiBold,
                              }}>
                              Rs 600
                            </Text>
                          </View>
                        </View>
                      </View>
                      {/* </Shadow> */}
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
          <Shadow
            distance={7}
            style={{
              // width: '100%',
              borderRadius: 50,
            }}
            startColor={color.gray2}
            offset={[0, 0]}>
            <Pressable
              style={{
                pointerEvents: 'auto',
              }}
              onPress={() => navigation.navigate(routes.PM_ORDERS)}>
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
          </Shadow>
        </View>
      </View>

      {/* ==========================================Floating buttons=========================================== */}
      <View
        style={{
          position: 'absolute',
          bottom: responsiveScreenHeight(16),
          right: -responsiveScreenWidth(1),
          gap: responsiveScreenHeight(0.8),
          alignItems: 'flex-end',
        }}>
        <Pressable
          onPress={() => {
            setTimerKeeperWalletModal(true);
            triggerHaptic('impactMedium');
            console.log('this ->', timekeeperWalletModal);
          }}>
          <CustomLinearGradient
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
            direction={'Vertical'}>
            <View
              style={{
                backgroundColor: color.secondary,
                paddingHorizontal: responsiveScreenWidth(2),
                paddingVertical: responsiveScreenWidth(2.5),
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: responsiveScreenWidth(1.5),
              }}>
              <View
                style={{
                  height: responsiveScreenHeight(2.4),
                  width: responsiveScreenHeight(2.4),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: responsiveScreenWidth(1),
                  position: 'relative',
                }}>
                <Image
                  source={require('../../assests/icons/wallet.png')}
                  style={{
                    tintColor: color.white,
                    aspectRatio: 1,
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                />
                <View
                  style={{
                    height: responsiveScreenHeight(1.7),
                    aspectRatio: 1,
                    backgroundColor: color.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                    position: 'absolute',
                    top: -responsiveScreenHeight(0.8),
                    right: -responsiveScreenWidth(2),
                  }}>
                  <Text
                    style={{
                      color: color.secondary,
                      fontSize: responsiveScreenFontSize(1.4),
                      fontFamily: font.NunitoSemiBold,
                    }}>
                    2
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  color: color.white,
                  fontSize: responsiveScreenFontSize(1.5),
                  fontFamily: font.NunitoSemiBold,
                }}>
                Wallets
              </Text>
            </View>
          </CustomLinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

export default PMPettyCash;
