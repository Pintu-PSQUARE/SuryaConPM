/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */

/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {BottomModal, Header, LinearGradient} from '../../../component';
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

import {Shadow} from 'react-native-shadow-2';
import useHapticFeedback from '../../../hooks/useHapticFeedback';

const PMInventory = () => {
  const {triggerHaptic} = useHapticFeedback();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const [showPin, setShowPin] = useState(false);

  const buttons = [
    {
      title: 'Tool1',
      icon: require('../../../assests/icons/machinery.png'),
      count: 5,
    },
    {
      title: 'Tool2',
      icon: require('../../../assests/icons/tools.png'),
      count: 5,
    },
    {
      title: 'Tool3',
      icon: require('../../../assests/icons/material.png'),
      count: 5,
    },
  ];
  const [selectedTab, setSelectedTab] = useState('Tool1');

  const [sideBar, setSidBar] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const startAnimation = () => {
    Animated.spring(animation, {
      toValue: sideBar ? 0 : 1,
      useNativeDriver: true,
    }).start();
  };

  const slideAnim = useRef(
    new Animated.Value(responsiveScreenWidth(100)),
  ).current;
  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  const toolsImages = [
    'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww', // Angle Grinder
    'https://images.unsplash.com/photo-1622044939413-0b829c342434?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Hammer
    'https://plus.unsplash.com/premium_photo-1677009835565-1f6eb4cf4f63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHRvb2xzfGVufDB8fDB8fHww', // Electric Drill
    'https://plus.unsplash.com/premium_photo-1677697324819-51565a751caa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fHRvb2xzfGVufDB8fDB8fHww', // Hand Saw
    'https://images.unsplash.com/photo-1559647746-9b2f216d2dc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHRvb2xzfGVufDB8fDB8fHww', // Jigsaw Cutter
    'https://images.unsplash.com/photo-1597066157837-5084c251fa34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fHRvb2xzfGVufDB8fDB8fHww', // Welding Machine
    'https://images.unsplash.com/photo-1596213812335-ac67c2d653d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fHRvb2xzfGVufDB8fDB8fHww', // Circular Saw
    'https://images.unsplash.com/photo-1581621293775-7aac902d7032?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fHRvb2xzfGVufDB8fDB8fHww', // Bench Grinder
    'https://images.unsplash.com/photo-1513467655676-561b7d489a88?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA3fHx0b29sc3xlbnwwfHwwfHx8MA%3D%3D', // Screwdriver Set
    'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww', // Angle Grinder
    'https://images.unsplash.com/photo-1622044939413-0b829c342434?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Hammer
    'https://plus.unsplash.com/premium_photo-1677009835565-1f6eb4cf4f63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHRvb2xzfGVufDB8fDB8fHww', // Electric Drill
    'https://plus.unsplash.com/premium_photo-1677697324819-51565a751caa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fHRvb2xzfGVufDB8fDB8fHww', // Hand Saw
    'https://images.unsplash.com/photo-1559647746-9b2f216d2dc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHRvb2xzfGVufDB8fDB8fHww', // Jigsaw Cutter
    'https://images.unsplash.com/photo-1597066157837-5084c251fa34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fHRvb2xzfGVufDB8fDB8fHww', // Welding Machine
    'https://images.unsplash.com/photo-1596213812335-ac67c2d653d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fHRvb2xzfGVufDB8fDB8fHww', // Circular Saw
    'https://images.unsplash.com/photo-1581621293775-7aac902d7032?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fHRvb2xzfGVufDB8fDB8fHww', // Bench Grinder
    'https://images.unsplash.com/photo-1513467655676-561b7d489a88?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA3fHx0b29sc3xlbnwwfHwwfHx8MA%3D%3D', // Screwdriver Set
  ];

  // __________________________________________Jiggle animation_________________________________
  const animationValue = useRef(new Animated.Value(0)).current;

  const startJiggleAnimation = () => {
    setShowPin(true);

    const jiggleSequence = Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 5, // Slightly right
          duration: 150,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animationValue, {
          toValue: -5, // Slightly left
          duration: 150,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    jiggleSequence.start();

    // Stop jiggle after 5 seconds
    setTimeout(() => {
      jiggleSequence.stop(); // Stop loop
      Animated.timing(animationValue, {
        toValue: 0, // Reset position smoothly
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => setShowPin(false));
    }, 5000);
  };
  // __________________________________________Jiggle END______________________________________

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.white,
        paddingBottom: responsiveScreenHeight(2),
      }}>
      <Header title={'Inventory'}>
        <>
          <Pressable
          // onPress={() => navigation.navigate(routes.MEETING_HISTORY)}
          >
            <Image
              source={require(`../../../assests/icons/plus-diff.png`)}
              style={{
                height: '80%',
                aspectRatio: 1,
                tintColor: color.white,
              }}
            />
          </Pressable>
        </>
      </Header>

      {/* -----------------------------------------Grades Modal-------------------------------------------------- */}

      <BottomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}>
        <View
          style={{
            minHeight: responsiveScreenHeight(30),
            backgroundColor: color.gray3,
            alignItems: 'center',
            paddingHorizontal: responsiveScreenWidth(2),
            paddingVertical: responsiveScreenHeight(2),
          }}>
          <Text
            style={{
              fontSize: responsiveScreenFontSize(2),
              fontFamily: font.NunitoBold,
              color: color.primary,
              marginBottom: responsiveScreenHeight(2),
            }}>
            Select Grade
          </Text>

          <View
            style={{
              height: responsiveScreenHeight(8.5),
              width: '100%',
              borderRadius: 50,
              paddingHorizontal: responsiveScreenWidth(3),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: color.gray2,
              marginBottom: responsiveScreenHeight(1.5),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: responsiveScreenWidth(6),
              }}>
              <View
                style={{
                  width: responsiveScreenWidth(14),
                  height: responsiveScreenWidth(14),
                  backgroundColor: 'yellow',
                  borderRadius: responsiveScreenWidth(14) / 2,
                  overflow: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww',
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(2),
                  fontFamily: font.NunitoMedium,
                  color: color.black87,
                }}>
                20 Kg
              </Text>
            </View>

            <Pressable style={{}}>
              <Text
                style={{
                  fontFamily: font.NunitoMedium,
                  fontSize: responsiveScreenFontSize(1.6),
                  color: color.primary,
                  paddingHorizontal: responsiveScreenWidth(8.5),
                  paddingVertical: responsiveScreenHeight(1),
                  backgroundColor: color.primaryLow,
                  borderRadius: 50,
                  borderWidth: 1.2,
                  borderColor: color.primary,
                }}>
                Add
              </Text>
            </Pressable>
          </View>

          <View
            style={{
              height: responsiveScreenHeight(8.5),
              width: '100%',
              borderRadius: 50,
              paddingHorizontal: responsiveScreenWidth(3),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: color.gray2,
              marginBottom: responsiveScreenHeight(1.5),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: responsiveScreenWidth(6),
              }}>
              <View
                style={{
                  width: responsiveScreenWidth(14),
                  height: responsiveScreenWidth(14),
                  backgroundColor: 'yellow',
                  borderRadius: responsiveScreenWidth(14) / 2,
                  overflow: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww',
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(2),
                  fontFamily: font.NunitoMedium,
                  color: color.black87,
                }}>
                30 Kg
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: responsiveScreenWidth(25),
                height: responsiveScreenHeight(4),
                backgroundColor: color.primaryLow,
                borderRadius: 50,
                borderWidth: 1.2,
                paddingHorizontal: responsiveScreenWidth(0.5),
              }}>
              <Pressable
                onPress={() => {
                  triggerHaptic('impactMedium');
                  let val = quantity - 1;
                  setQuantity(val);
                }}
                style={{
                  height: responsiveScreenHeight(3),
                  width: responsiveScreenHeight(3),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  backgroundColor: color.primary,
                }}>
                <Image
                  source={require('../../../assests/icons/minus.png')}
                  style={{
                    tintColor: color.white,
                    aspectRatio: 1,
                    height: '50%',
                    resizeMode: 'contain',
                  }}
                />
              </Pressable>

              <Text
                style={{
                  fontFamily: font.NunitoSemiBold,
                  fontSize: responsiveScreenFontSize(1.7),
                  color: color.primary,
                  backgroundColor: color.primaryLow,
                }}>
                {quantity}
              </Text>

              <Pressable
                onPress={() => {
                  triggerHaptic('impactMedium');
                  let val = quantity + 1;
                  setQuantity(val);
                }}
                style={{
                  height: responsiveScreenHeight(3),
                  width: responsiveScreenHeight(3),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  backgroundColor: color.primary,
                }}>
                <Image
                  source={require('../../../assests/icons/plus.png')}
                  style={{
                    tintColor: color.white,
                    aspectRatio: 1,
                    height: '50%',
                    resizeMode: 'contain',
                  }}
                />
              </Pressable>
            </View>
          </View>

          <View
            style={{
              height: responsiveScreenHeight(8.5),
              width: '100%',
              borderRadius: 50,
              paddingHorizontal: responsiveScreenWidth(3),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: color.gray2,
              marginBottom: responsiveScreenHeight(1.5),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: responsiveScreenWidth(6),
              }}>
              <View
                style={{
                  width: responsiveScreenWidth(14),
                  height: responsiveScreenWidth(14),
                  backgroundColor: 'yellow',
                  borderRadius: responsiveScreenWidth(14) / 2,
                  overflow: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww',
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(2),
                  fontFamily: font.NunitoMedium,
                  color: color.black87,
                }}>
                40 Kg
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: responsiveScreenWidth(25),
                height: responsiveScreenHeight(4),
                backgroundColor: color.primaryLow,
                borderRadius: 50,
                borderWidth: 1.2,
                paddingHorizontal: responsiveScreenWidth(0.5),
              }}>
              <Pressable
                onPress={() => {
                  triggerHaptic('impactMedium');
                  let val = quantity - 1;
                  setQuantity(val);
                }}
                style={{
                  height: responsiveScreenHeight(3),
                  width: responsiveScreenHeight(3),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  backgroundColor: color.primary,
                }}>
                <Image
                  source={require('../../../assests/icons/minus.png')}
                  style={{
                    tintColor: color.white,
                    aspectRatio: 1,
                    height: '50%',
                    resizeMode: 'contain',
                  }}
                />
              </Pressable>

              <Text
                style={{
                  fontFamily: font.NunitoSemiBold,
                  fontSize: responsiveScreenFontSize(1.7),
                  color: color.primary,
                  backgroundColor: color.primaryLow,
                }}>
                {quantity}
              </Text>

              <Pressable
                onPress={() => {
                  triggerHaptic('impactMedium');
                  let val = quantity + 1;
                  setQuantity(val);
                }}
                style={{
                  height: responsiveScreenHeight(3),
                  width: responsiveScreenHeight(3),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  backgroundColor: color.primary,
                }}>
                <Image
                  source={require('../../../assests/icons/plus.png')}
                  style={{
                    tintColor: color.white,
                    aspectRatio: 1,
                    height: '50%',
                    resizeMode: 'contain',
                  }}
                />
              </Pressable>
            </View>
          </View>

          {/* ----------------------------------Add to cart button------------------------------- */}

          <LinearGradient
            style={{
              height: responsiveScreenHeight(6),
              width: responsiveScreenHeight(28),
              borderRadius: 50,
              marginBottom: responsiveScreenHeight(1),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable style={{}}>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(2),
                  fontFamily: font.NunitoSemiBold,
                  color: color.white,
                }}>
                Add to Cart
              </Text>
            </Pressable>
          </LinearGradient>
        </View>
      </BottomModal>

      <View style={{flex: 1, backgroundColor: 'white'}}>
        {/* -----------------------------------------top navigation-------------------------------------------------- */}

        <View
          style={{
            backgroundColor: 'white',
            gap: responsiveScreenHeight(1),
            paddingVertical: responsiveScreenHeight(1.5),
            paddingHorizontal: responsiveScreenWidth(3),
            flexDirection: 'row',
          }}>
          <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
            <Pressable
              // onPress={() => setSelected(item.name)}
              style={{
                alignItems: 'flex-start',
                width: responsiveScreenWidth(30),
                height: responsiveScreenHeight(9.7),
                gap: responsiveScreenHeight(0.4),
                backgroundColor: color.white,
                borderWidth: 1,
                borderColor: color.red,
                borderRadius: 15,
                padding: 8,
              }}>
              <View
                style={{
                  height: responsiveScreenHeight(3.2),
                  width: responsiveScreenHeight(3.2),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  backgroundColor: color.redLow,
                }}>
                <Image
                  source={require('../../../assests/icons/clock2.png')}
                  style={{
                    tintColor: color.red,
                    aspectRatio: 1,
                    height: '60%',
                    resizeMode: 'contain',
                  }}
                />
              </View>

              <Text
                style={{
                  fontFamily: font.NunitoMedium,
                  fontSize: responsiveScreenFontSize(1.5),
                  color: color.black60,
                }}>
                Low Stock
              </Text>
              <Text
                style={{
                  fontFamily: font.NunitoMedium,
                  fontSize: responsiveScreenFontSize(1.7),
                  color: color.black87,
                }}>
                06
              </Text>
            </Pressable>
          </Shadow>

          <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
            <Pressable
              // onPress={() => setSelected(item.name)}
              style={{
                alignItems: 'flex-start',
                width: responsiveScreenWidth(30),
                height: responsiveScreenHeight(9.7),
                gap: responsiveScreenHeight(0.4),
                backgroundColor: color.white,
                // borderWidth: 1,
                borderColor: color.primary,
                borderRadius: 15,
                padding: 8,
              }}>
              <View
                style={{
                  height: responsiveScreenHeight(3.2),
                  width: responsiveScreenHeight(3.2),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  backgroundColor: color.primaryLow,
                }}>
                <Image
                  source={require('../../../assests/icons/clock2.png')}
                  style={{
                    tintColor: color.primary,
                    aspectRatio: 1,
                    height: '60%',
                    resizeMode: 'contain',
                  }}
                />
              </View>

              <Text
                style={{
                  fontFamily: font.NunitoMedium,
                  fontSize: responsiveScreenFontSize(1.5),
                  color: color.black60,
                }}>
                Total items
              </Text>
              <Text
                style={{
                  fontFamily: font.NunitoMedium,
                  fontSize: responsiveScreenFontSize(1.7),
                  color: color.black87,
                }}>
                90
              </Text>
            </Pressable>
          </Shadow>

          <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
            <Pressable
              // onPress={() => setSelected(item.name)}
              style={{
                alignItems: 'flex-start',
                width: responsiveScreenWidth(30),
                height: responsiveScreenHeight(9.7),
                gap: responsiveScreenHeight(0.4),
                backgroundColor: color.white,
                // borderWidth: 1,
                borderColor: color.secondary,
                borderRadius: 15,
                padding: 8,
              }}>
              <View
                style={{
                  height: responsiveScreenHeight(3.2),
                  width: responsiveScreenHeight(3.2),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  backgroundColor: color.secondaryLow,
                }}>
                <Image
                  source={require('../../../assests/icons/clock2.png')}
                  style={{
                    tintColor: color.secondary,
                    aspectRatio: 1,
                    height: '60%',
                    resizeMode: 'contain',
                  }}
                />
              </View>

              <Text
                style={{
                  fontFamily: font.NunitoMedium,
                  fontSize: responsiveScreenFontSize(1.5),
                  color: color.black60,
                }}>
                Pending
              </Text>
              <Text
                style={{
                  fontFamily: font.NunitoMedium,
                  fontSize: responsiveScreenFontSize(1.7),
                  color: color.black87,
                }}>
                03
              </Text>
            </Pressable>
          </Shadow>
        </View>

        {/* ==========================================Tasks navigation buttons=========================================== */}

        <View
          style={{
            marginBottom: responsiveScreenHeight(0.5),
            marginTop: responsiveScreenHeight(0.5),
            paddingHorizontal: responsiveScreenWidth(2.5),
            flexDirection: 'row',
            alignItems: 'center',
            gap: responsiveScreenWidth(3),
          }}>
          {buttons.map((button, index) => (
            <Shadow
              key={index}
              distance={5}
              style={{}}
              startColor={color.gray2}
              offset={[0, 0]}>
              <Pressable
                style={{
                  backgroundColor:
                    selectedTab === button.title ? color.redLow : color.white,
                  paddingHorizontal: responsiveScreenWidth(1),
                  paddingVertical: responsiveScreenWidth(1),
                  borderRadius: 30,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderColor:
                    selectedTab === button.title ? color.red : color.white,
                  gap: responsiveScreenWidth(1),
                }}
                onPress={() => setSelectedTab(button.title)}>
                <View
                  style={{
                    height: responsiveScreenHeight(2.4),
                    width: responsiveScreenHeight(2.4),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    backgroundColor: color.white,
                  }}>
                  <Image
                    source={button.icon}
                    style={{
                      tintColor:
                        selectedTab === button.title
                          ? color.red
                          : color.black60,
                      aspectRatio: 1,
                      height: '80%',
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <Text
                  style={{
                    color:
                      selectedTab === button.title ? color.red : color.black60,
                    fontSize: responsiveScreenFontSize(1.5),
                    fontFamily: font.NunitoSemiBold,
                  }}>
                  {button.title}
                </Text>
                <View
                  style={{
                    height: responsiveScreenHeight(2.4),
                    width: responsiveScreenHeight(2.4),
                    backgroundColor: color.red,
                    borderRadius: responsiveScreenHeight(2),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: color.white,
                      fontSize: responsiveScreenFontSize(1.2),
                      fontFamily: font.NunitoSemiBold,
                    }}>
                    {button.count}
                  </Text>
                </View>
              </Pressable>
            </Shadow>
          ))}
        </View>

        {/* ------------------------------Tools--------------------------------- */}

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: responsiveScreenHeight(2),
            // backgroundColor: color.white,
            backgroundColor: color.white,
          }}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={true}>
          <View
            style={{
              gap: responsiveScreenHeight(1.5),
              paddingHorizontal: responsiveScreenWidth(3),
              paddingVertical: responsiveScreenHeight(1.5),
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {toolsImages.map(name => (
              <Animated.View
                style={{
                  position: 'relative',
                  zIndex: 1,
                  marginBottom: responsiveScreenHeight(1),
                  transform: [
                    {
                      rotate: animationValue.interpolate({
                        inputRange: [-5, 5],
                        outputRange: ['-3deg', '3deg'],
                      }),
                    },
                  ],
                }}>
                <Shadow
                  distance={5}
                  style={{}}
                  startColor={color.gray2}
                  offset={[0, 0]}>
                  <View
                    style={{
                      height: responsiveScreenHeight(19),
                      width: responsiveScreenWidth(29),
                      gap: responsiveScreenHeight(0.2),
                      borderRadius: 10,
                      backgroundColor: color.white,
                    }}>
                    {/* ------------------------Image----------------------- */}
                    <Pressable
                      onLongPress={startJiggleAnimation}
                      style={{
                        width: '100%',
                        height: '70%',
                        borderRadius: 10,
                        overflow: 'hidden',
                        position: 'relative',
                      }}>
                      <Image
                        source={{
                          uri: name,
                        }}
                        style={{
                          aspectRatio: 1,
                          objectFit: 'cover',
                          borderRadius: 10,
                        }}
                      />
                      <View
                        style={{
                          width: '100%',
                          position: 'absolute',
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          zIndex: 9,
                        }}>
                        <Text
                          style={{
                            fontFamily: font.NunitoSemiBold,
                            fontSize: responsiveScreenFontSize(1),
                            color: color.white,
                            backgroundColor: color.secondary,
                            paddingVertical: responsiveScreenHeight(0.5),
                            paddingHorizontal: responsiveScreenWidth(2),
                            borderRadius: 10,
                            marginRight: -responsiveScreenWidth(1),
                          }}>
                          Tokio
                        </Text>
                      </View>
                    </Pressable>
                    {/* -------------------Button View---------------- */}
                    <View
                      style={{
                        position: 'absolute',
                        bottom: responsiveScreenHeight(5.2),
                        right: -responsiveScreenWidth(0.6),
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: responsiveScreenHeight(3.5),
                        gap: responsiveScreenWidth(1),
                      }}>
                      <Text
                        style={{
                          fontFamily: font.NunitoSemiBold,
                          fontSize: responsiveScreenFontSize(1.4),
                          color: color.red,
                          backgroundColor: color.redLow,
                          paddingHorizontal: responsiveScreenWidth(3.5),
                          paddingVertical: responsiveScreenHeight(0.3),
                          borderRadius: 50,
                          borderWidth: 1,
                          borderColor: color.red,
                        }}>
                        15
                      </Text>

                      <Text
                        style={{
                          fontFamily: font.NunitoSemiBold,
                          fontSize: responsiveScreenFontSize(1.4),
                          color: color.primary,
                          backgroundColor: color.primaryLow,
                          paddingHorizontal: responsiveScreenWidth(3.5),
                          paddingVertical: responsiveScreenHeight(0.3),
                          borderRadius: 50,
                          borderWidth: 1,
                          borderColor: color.primary,
                        }}>
                        15
                      </Text>
                    </View>

                    {/* ------------------Bottom--------------------- */}
                    <View
                      style={{
                        paddingHorizontal: responsiveScreenWidth(0.5),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: responsiveScreenWidth(1),
                        }}>
                        <Text
                          style={{
                            fontFamily: font.NunitoMedium,
                            fontSize: responsiveScreenFontSize(1.2),
                            color: color.primary,
                            padding: 4,
                            backgroundColor: color.primaryLow,
                            borderRadius: 10,
                          }}>
                          Tokio
                        </Text>

                        <Text
                          style={{
                            fontFamily: font.NunitoMedium,
                            fontSize: responsiveScreenFontSize(1.2),
                            color: color.secondary,
                            padding: 4,
                            backgroundColor: color.secondaryLow,
                            borderRadius: 10,
                          }}>
                          Grade 3+
                        </Text>
                      </View>

                      {/* ---------------------name------------------------- */}
                      <Text
                        style={{
                          fontFamily: font.NunitoMedium,
                          fontSize: responsiveScreenFontSize(1.6),
                          color: color.black87,
                          marginLeft: responsiveScreenWidth(1),
                        }}>
                        Hammer
                      </Text>
                    </View>

                    {showPin && (
                      <View
                        style={{
                          height: '100%',
                          width: '100%',
                          position: 'absolute',
                          borderRadius: 15,
                        }}>
                        <Pressable
                          style={{
                            height: responsiveScreenHeight(3),
                            width: responsiveScreenHeight(3),
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 50,
                            backgroundColor: color.primaryLow,
                            marginLeft: -responsiveScreenWidth(2),
                            marginTop: -responsiveScreenWidth(2),
                            position: 'absolute',
                          }}>
                          <Image
                            source={require('../../../assests/icons/push-pin.png')}
                            style={{
                              tintColor: color.primary,
                              aspectRatio: 1,
                              height: '55%',
                              resizeMode: 'contain',
                            }}
                          />
                        </Pressable>
                      </View>
                    )}
                  </View>
                </Shadow>
              </Animated.View>
            ))}
          </View>
        </ScrollView>

        {/* ------------------------------Cart button--------------------------------- */}

        {/* ==========================================Floating buttons=========================================== */}
        {(sideBar && (
          <Pressable
            onPress={() => {
              setSidBar(false);
              startAnimation();
              console.log('taps');
            }}
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              backgroundColor: 'transparent',
              zIndex: 3,
            }}
          />
        )) ||
          ''}

        <View
          style={{
            position: 'absolute',
            bottom: responsiveScreenHeight(7),
            right: responsiveScreenWidth(3),
            gap: responsiveScreenHeight(0.8),
            alignItems: 'flex-end',
            zIndex: 3,
            pointerEvents: 'box-none',
          }}>
          <Animated.View
            style={[
              {
                opacity: animation,
                width: responsiveScreenWidth(55),
              },
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [
                        responsiveScreenWidth(55),
                        responsiveScreenWidth(6),
                      ],
                    }),
                  },
                ],
              },
            ]}>
            <Shadow distance={7} startColor={color.black10} offset={[0, 0]}>
              <View
                style={{
                  paddingHorizontal: responsiveScreenWidth(4),
                  paddingVertical: responsiveScreenHeight(2),
                  gap: responsiveScreenHeight(1),
                  backgroundColor: color.white,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                }}>
                <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
                  <Pressable
                    onPress={() => {
                      setSidBar(false);
                      startAnimation();
                      navigation.navigate(routes.ITEM_REQUEST);
                      triggerHaptic('impactMedium');
                    }}
                    style={{
                      borderRadius: 50,
                      paddingHorizontal: responsiveScreenWidth(3),
                      paddingVertical: responsiveScreenHeight(0.8),
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: responsiveScreenWidth(2),
                      backgroundColor: color.white,
                      width: responsiveScreenWidth(44),
                    }}>
                    <View
                      style={{
                        width: responsiveScreenWidth(6),
                        justifyContent: 'center',
                        alignItems: 'center',
                        aspectRatio: 1,
                        backgroundColor: color.white,
                        borderRadius: 25,
                      }}>
                      <Image
                        source={require(`../../../assests/icons/Approve.png`)}
                        style={{
                          height: '90%',
                          aspectRatio: 1,
                          tintColor: 'black',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontFamily: font.NunitoMedium,
                        color: color.black60,
                        fontSize: responsiveScreenFontSize(1.6),
                      }}>
                      Approvals
                    </Text>
                  </Pressable>
                </Shadow>

                <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
                  <Pressable
                    onPress={() => {
                      setSidBar(false);
                      startAnimation();
                      navigation.navigate(routes.PM_REQUESTS);
                      triggerHaptic('impactMedium');
                    }}
                    style={{
                      borderRadius: 50,
                      paddingHorizontal: responsiveScreenWidth(3),
                      paddingVertical: responsiveScreenHeight(0.8),
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: responsiveScreenWidth(2),
                      backgroundColor: color.white,
                      width: responsiveScreenWidth(44),
                    }}>
                    <View
                      style={{
                        width: responsiveScreenWidth(6),
                        justifyContent: 'center',
                        alignItems: 'center',
                        aspectRatio: 1,
                        backgroundColor: color.white,
                        borderRadius: 25,
                      }}>
                      <Image
                        source={require(`../../../assests/icons/cart.png`)}
                        style={{
                          height: '75%',
                          aspectRatio: 1,
                          tintColor: 'black',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontFamily: font.NunitoMedium,
                        color: color.black60,
                        fontSize: responsiveScreenFontSize(1.6),
                      }}>
                      Requests
                    </Text>
                  </Pressable>
                </Shadow>

                <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
                  <Pressable
                    onPress={() => {
                      setSidBar(false);
                      startAnimation();
                      navigation.navigate(routes.PM_BAG);
                      triggerHaptic('impactMedium');
                    }}
                    style={{
                      borderRadius: 50,
                      paddingHorizontal: responsiveScreenWidth(3),
                      paddingVertical: responsiveScreenHeight(0.8),
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: responsiveScreenWidth(2),
                      backgroundColor: color.white,
                      width: responsiveScreenWidth(44),
                    }}>
                    <View
                      style={{
                        width: responsiveScreenWidth(6),
                        justifyContent: 'center',
                        alignItems: 'center',
                        aspectRatio: 1,
                        backgroundColor: color.white,
                        borderRadius: 25,
                      }}>
                      <Image
                        source={require(`../../../assests/icons/calendar2.png`)}
                        style={{
                          height: '100%',
                          aspectRatio: 1,
                          tintColor: 'black',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontFamily: font.NunitoMedium,
                        color: color.black60,
                        fontSize: responsiveScreenFontSize(1.6),
                      }}>
                      Bag
                    </Text>
                  </Pressable>
                </Shadow>
              </View>
            </Shadow>
          </Animated.View>

          <Shadow distance={5} startColor={color.black10} offset={[0, 1]}>
            <Pressable
              onPress={() => {
                startAnimation();
                setSidBar(!sideBar);
                triggerHaptic('impactMedium');
              }}
              style={{
                width: responsiveScreenWidth(12),
                aspectRatio: 1,
                backgroundColor: sideBar ? color.white : color.secondary,
                borderRadius: 200,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Animated.Image
                source={require('../../../assests/icons/add.png')}
                style={{
                  height: '65%',
                  aspectRatio: 1,
                  tintColor: sideBar ? color.black87 : color.white,
                  transform: [
                    {
                      rotateZ: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '45deg'],
                      }),
                    },
                  ],
                }}
              />
            </Pressable>
          </Shadow>
        </View>
      </View>
    </View>
  );
};

export default PMInventory;
