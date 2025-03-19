/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  PanResponder,
} from 'react-native';
import {color, font, routes} from '../../config/Env';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {LinearGradient, ProgressBar} from '../../component';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {useAppSelector} from '../../store/hooks';
import TaskProgressBar from '../../component/TaskProgressBar';
import {SvgXml} from 'react-native-svg';
import {PulseIndicator} from 'react-native-indicators';
import {loginArrow, logoSvg, logoSvgPrimary} from '../../svg';
import NewDrag from '../../component/NewDrag';
import {Shadow} from 'react-native-shadow-2';
import useHapticFeedback from '../../hooks/useHapticFeedback';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

function PMHomePage() {
  const {triggerHaptic} = useHapticFeedback();

  const [dummyUser, setDummyUsers] = useState([
    {
      heading: 'BackFilling',
      place: 'Tower A2',
      floor: 5,
      msg: '',
    },
    {
      heading: 'BackFilling',
      place: 'Tower A2',
      floor: 4,
      msg: '',
    },
    {
      heading: 'BackFilling',
      place: 'Tower A2',
      floor: 3,
      msg: '',
    },
    {
      heading: 'BackFilling',
      place: 'Tower A2',
      floor: 2,
      msg: '',
    },
    {
      heading: 'BackFilling',
      place: 'Tower A2',
      floor: 1,
      msg: '',
    },
    {
      heading: 'BackFilling',
      place: 'Tower A2',
      floor: 6,
      msg: '',
    },
  ]);
  const flatList = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);

  const [slide, setSlide] = useState(false);
  const screenWidth = responsiveScreenWidth(100);
  const halfScreenWidth = screenWidth / 5;

  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {user} = useAppSelector(state => state.userStore);
  // useEffect(()=>{
  //   navigation.navigate(routes.CHATS)
  // },[])
  const onScrollEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / responsiveScreenWidth(90)); // Calculate the new index based on scroll position
    setIndex(newIndex);
  };
  const getItemLayout = () => {
    return {
      length: responsiveScreenWidth(90),
      offset: responsiveScreenWidth(90) * index,
      index,
    };
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleLongPress = (cardId: React.SetStateAction<null>) => {
    setSelectedCard(cardId);

    // Reset the card to its initial state after 5 seconds
    setTimeout(() => {
      setSelectedCard(null);
    }, 3000);
  };

  const animations: any = {};

  dummyUser.forEach(item => {
    animations[item.floor] = new Animated.Value(0);
  });

  const handlePinPress = (ind: string | number) => {
    console.log('indexxxxx', ind);

    // Start the animation for the clicked pin
    Animated.sequence([
      // Move the pin up 20% (adjust value as needed)
      Animated.timing(animations[ind], {
        toValue: -responsiveScreenHeight(10),
        duration: 500,
        useNativeDriver: true,
      }),
      // Rotate and make the pin invisible
      Animated.timing(animations[ind], {
        toValue: responsiveScreenHeight(1), // End value for opacity and rotation
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const a = 60;
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
  ).current; // Start off-screen to the left
  const [isLeft, setIsLeft] = useState(true);
  const animatedLeft = useRef(new Animated.Value(0)).current;
  const handleToggle = (direction: boolean) => {
    if (isLeft !== direction) {
      Animated.timing(animatedLeft, {
        toValue: isLeft ? responsiveScreenWidth(39) : 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsLeft(!isLeft));
    }
  };
  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);
  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            Animated.timing(slideAnim, {
              toValue: responsiveScreenWidth(100),
              duration: 300,
              useNativeDriver: true,
            }).start(() => {
              setModalVisible(false);
            });
          }}
          style={{flex: 1, backgroundColor: 'red'}}>
          <Animated.View
            style={[
              {flex: 1, flexDirection: 'row'},
              {transform: [{translateX: slideAnim}]},
            ]}>
            <View style={{maxWidth: responsiveScreenHeight(6), width: '100%'}}>
              <View
                style={{
                  width: '100%',
                  aspectRatio: '5/2',
                  backgroundColor: color.black60,
                  marginTop: responsiveScreenHeight(2.3),
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: color.primary,
                    borderBottomRightRadius: 30,
                  }}
                />
              </View>
              <Pressable
                onPress={() => {
                  Animated.timing(slideAnim, {
                    toValue: responsiveScreenWidth(100),
                    duration: 300,
                    useNativeDriver: true,
                  }).start(() => {
                    setModalVisible(false);
                  });
                }}
                style={{
                  maxHeight: responsiveScreenHeight(6),
                  alignItems: 'center',
                  maxWidth: responsiveScreenHeight(6),
                  justifyContent: 'center',
                  height: '100%',
                  width: '100%',
                  backgroundColor: color.black60,
                  borderTopLeftRadius: 30,
                  borderBottomLeftRadius: 30,
                }}>
                <Image
                  source={require('../../assests/icons/chevron-left.png')}
                  style={{
                    height: '60%',
                    aspectRatio: 1,
                    tintColor: color.white,
                  }}
                />
              </Pressable>
              <View
                style={{
                  width: '100%',
                  aspectRatio: '5/2',
                  backgroundColor: color.black60,
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: color.primary,
                    borderTopRightRadius: 30,
                    position: 'relative',
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: color.black60,
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
                paddingHorizontal: responsiveScreenWidth(5),
              }}>
              <Text
                style={{
                  fontFamily: font.NunitoRegular,
                  color: color.white,
                  textAlign: 'center',
                  fontSize: responsiveScreenFontSize(3),
                  marginTop: responsiveScreenHeight(5),
                }}>
                Notifications
              </Text>

              <View
                style={{
                  backgroundColor: color.white,
                  borderRadius: 100,
                  borderColor: color.gray3,
                  flexDirection: 'row',
                  position: 'relative',
                  width: '100%',
                  marginTop: responsiveScreenHeight(3.5),
                  marginHorizontal: 'auto',
                }}>
                <Animated.View
                  style={{
                    width: '50%',
                    backgroundColor: color.primary,
                    borderRadius: 100,
                    position: 'absolute',
                    height: '100%',
                    top: 0,
                    left: animatedLeft,
                  }}
                />
                <Pressable
                  onPress={() => handleToggle(true)}
                  style={{
                    width: '50%',
                    paddingVertical: responsiveScreenHeight(1.3),
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: !isLeft ? color.black87 : color.white,
                      fontFamily: font.NunitoMedium,
                      fontSize: responsiveScreenFontSize(1.8),
                    }}>
                    Action Required
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => handleToggle(false)}
                  style={{
                    width: '50%',
                    paddingVertical: responsiveScreenHeight(1.3),
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: isLeft ? color.black87 : color.white,
                      fontFamily: font.NunitoMedium,
                      fontSize: responsiveScreenFontSize(1.8),
                    }}>
                    Alerts
                  </Text>
                </Pressable>
              </View>
              <Pressable
                onPress={() => {
                  Animated.timing(slideAnim, {
                    toValue: responsiveScreenWidth(100),
                    duration: 300,
                    useNativeDriver: true,
                  }).start(() => {
                    setModalVisible(false);
                    navigation.navigate(routes.TICKET, {
                      order: false,
                      page: 'approve',
                    });
                  });
                }}
                style={{
                  marginTop: responsiveHeight(2),
                  flexDirection: 'row',
                  borderRadius: 20,
                  overflow: 'hidden',
                  paddingVertical: responsiveScreenHeight(2),
                  position: 'relative',
                  gap: responsiveScreenWidth(2),
                  alignItems: 'center',
                  backgroundColor: color.white,
                  paddingHorizontal: responsiveScreenWidth(2),
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: responsiveScreenHeight(1.5),
                    right: responsiveScreenWidth(3),
                    width: responsiveScreenWidth(2),
                    aspectRatio: 1,
                    backgroundColor: color.secondary,
                    borderRadius: 50,
                  }}
                />
                <Text
                  style={{
                    position: 'absolute',
                    bottom: responsiveScreenHeight(1.1),
                    right: responsiveScreenWidth(3),
                    fontFamily: font.NunitoMedium,
                    fontSize: responsiveScreenFontSize(1.2),
                  }}>
                  12:02 pm
                </Text>
                <Pressable
                  style={{
                    width: responsiveScreenWidth(11),
                    padding: responsiveScreenWidth(2.7),
                    aspectRatio: 1,
                    backgroundColor: color.white,
                  }}>
                  <Image
                    source={require('../../assests/icons/building.png')}
                    style={{
                      height: '100%',
                      aspectRatio: 1,
                      tintColor: color.primary,
                    }}
                  />
                </Pressable>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontSize: responsiveScreenFontSize(2),
                      color: color.black87,
                      fontFamily: font.NunitoSemiBold,
                    }}>
                    Item Request
                  </Text>
                  <Text
                    style={{
                      fontSize: responsiveScreenFontSize(1.6),
                      color: color.black60,
                      fontFamily: font.NunitoMedium,
                    }}>
                    (Site Engineer) is requesting new items for Tower A1.
                  </Text>
                </View>
              </Pressable>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={{flex: 1, backgroundColor: color.white}}>
        {/* __________________________________________________Top bar________________________________ */}
        <LinearGradient style={{}} direction={'Vertical'}>
          <View
            style={{
              paddingLeft: responsiveScreenWidth(5),
              paddingTop: responsiveScreenHeight(7),
              paddingBottom: responsiveScreenHeight(2),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                gap: responsiveScreenHeight(0.5),
              }}>
              <Text
                style={{
                  fontFamily: font.NunitoRegular,
                  fontSize: responsiveScreenFontSize(3),
                  color: color.white,
                }}>
                Hello {user?.name},
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: responsiveScreenWidth(35),
                  marginLeft: -responsiveScreenWidth(0.5),
                }}>
                <EvilIcons
                  style={{
                    fontFamily: font.NunitoBold,
                    fontSize: responsiveScreenFontSize(2.5),
                    color: color.secondary,
                  }}
                  name="location"
                />
                <Text
                  style={{
                    fontFamily: font.NunitoMedium,
                    fontSize: responsiveScreenFontSize(1.8),
                    color: color.secondary,
                  }}>
                  North View
                </Text>
                <EvilIcons
                  style={{
                    fontFamily: font.NunitoBold,
                    fontSize: responsiveScreenFontSize(3.5),
                    marginTop: responsiveScreenHeight(-0.6),
                    color: color.secondary,
                  }}
                  name="chevron-down"
                />
                <PulseIndicator
                  size={responsiveScreenFontSize(2)}
                  color="#A80000"
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={{
                maxHeight: responsiveScreenHeight(6),
                alignItems: 'center',
                maxWidth: responsiveScreenHeight(6),
                justifyContent: 'center',
                height: '100%',
                width: '100%',
              }}>
              <Image
                source={require('../../assests/icons/chevron-left.png')}
                style={{
                  height: '60%',
                  aspectRatio: 1,
                  tintColor: color.white,
                }}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        {/* ==========================================Cards========================================== */}

        <View
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            overflow: 'visible',
            marginBottom: responsiveScreenHeight(0.2),
          }}>
          <View
            style={{
              width: '100%',
              height: '50%',
              backgroundColor: color.primaryForTop,
              position: 'relative',
              borderBottomEndRadius: 40,
              borderBottomLeftRadius: 40,
            }}
          />
          <View
            style={{
              shadowColor: 'black',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.2,
              shadowRadius: 3,
              width: '100%',
              height: '105%',
              alignSelf: 'center',
              // backgroundColor: 'white',
              //   borderRadius: 40,
              position: 'absolute',
              zIndex: 3,
              overflow: 'hidden',
            }}>
            <FlatList
              ref={flatList}
              initialScrollIndex={index}
              style={{overflow: 'hidden'}}
              data={DATA}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              onMomentumScrollEnd={onScrollEnd}
              getItemLayout={getItemLayout}
              renderItem={({item, index}) => (
                <Pressable
                  onPress={() => navigation.navigate(routes.PROJECT_DETAIL)}
                  style={{
                    height: '83%',
                    width: responsiveScreenWidth(95),
                    paddingHorizontal: responsiveScreenWidth(4),
                    paddingVertical: responsiveScreenHeight(2),
                    backgroundColor: 'white',
                    gap: responsiveScreenHeight(1),
                    borderRadius: 25,
                    margin: 10,
                    elevation: 3,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginHorizontal: responsiveScreenWidth(2),
                    }}>
                    <View>
                      <Text
                        style={{
                          color: color.black87,
                          fontFamily: font.NunitoSemiBold,
                          fontSize: responsiveScreenFontSize(2),
                          fontWeight: '400',
                          marginBottom: responsiveScreenHeight(0.2),
                        }}>
                        Tower A{index + 1}
                      </Text>
                      <Text
                        style={{
                          color: color.black60,
                          fontSize: responsiveScreenFontSize(1.5),
                          fontWeight: '400',
                          fontFamily: font.NunitoRegular,
                        }}>
                        Completion: 15 August
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: responsiveScreenWidth(1),
                      }}>
                      <ProgressBar
                        radius={responsiveScreenWidth(6.5)}
                        color={color.secondary}
                        bgColor={color.gray2}
                        percentage={a}
                      />
                      <ProgressBar
                        radius={responsiveScreenWidth(6.5)}
                        color={color.primary}
                        bgColor={color.gray2}
                        percentage={a}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      paddingVertical: responsiveScreenHeight(1),
                      paddingHorizontal: responsiveScreenWidth(2),
                      flex: 1,
                      gap: responsiveScreenWidth(1),
                    }}>
                    {[
                      // Assuming data is an array of your progress items
                      {title: '11th Floor', currentStep: 4, totalSteps: 8},
                      {title: '11th Floor', currentStep: 4, totalSteps: 10},
                      {title: '11th Floor', currentStep: 2, totalSteps: 8},
                    ].map((item, index, array) => (
                      <View
                        key={index}
                        style={{
                          flexBasis: array.length === 1 ? '100%' : '48%',

                          marginBottom: responsiveScreenHeight(1),
                        }}>
                        <TaskProgressBar
                          title={item.title}
                          currentStep={item.currentStep}
                          totalSteps={item.totalSteps}
                        />
                      </View>
                    ))}
                  </View>
                </Pressable>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>

        {/* ==========================================Dots=========================================== */}
        <View
          style={{
            flexDirection: 'row',
            gap: responsiveScreenWidth(2),
            margin: 'auto',
            position: 'relative',
            top: responsiveScreenHeight(-0.5),
            marginBottom: responsiveScreenHeight(2),
          }}>
          {DATA.map((elem, cIndex) => {
            return (
              <TouchableOpacity
                key={elem.id}
                onPress={() => setIndex(cIndex)}
                style={{
                  width: responsiveScreenWidth(2),
                  aspectRatio: 1,
                  backgroundColor:
                    cIndex === index ? color.primary : color.gray,
                  borderRadius: 100,
                }}
              />
            );
          })}
        </View>

        {/* ==========================================Slider=========================================== */}

        <NewDrag
          onRight={() => {
            setSlide(true);
          }}
          active={slide}
          right={
            <View style={{height: responsiveScreenHeight(4), aspectRatio: 1}}>
              <SvgXml height={'100%'} xml={loginArrow} />
            </View>
          }
          mid={
            <Text
              style={{
                fontFamily: font.NunitoRegular,
                color: color.black87,
                fontSize: responsiveScreenFontSize(1.8),
              }}>
              Slide to view DLR and DPR
            </Text>
          }
          height={responsiveScreenHeight(6)}
          width={responsiveScreenWidth(90)}>
          <View
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: color.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <SvgXml height={'50%'} xml={logoSvg} />
          </View>
        </NewDrag>

        {/* ==========================================Pinned Tasks=========================================== */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: responsiveScreenHeight(0.5),
            marginTop: responsiveScreenHeight(2),
            width: responsiveScreenWidth(95),
            alignSelf: 'center',
          }}>
          <Text
            style={{
              width: '30%',
              color: color.black87,
              fontSize: responsiveScreenFontSize(2.1),
              fontFamily: font.NunitoRegular,
            }}>
            Pinned Tasks
          </Text>

          <Pressable
            onPress={() => console.log('hello')}
            style={{height: responsiveScreenHeight(2.3), aspectRatio: 1}}>
            <SvgXml height={'100%'} xml={logoSvgPrimary} color={'#00596B'} />
          </Pressable>
        </View>

        <FlatList
          data={dummyUser}
          contentContainerStyle={{paddingBottom: responsiveScreenHeight(3)}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}: any) => {
            const animatedValue = new Animated.Value(0);
            const panResponder = PanResponder.create({
              onStartShouldSetPanResponder: () => false,

              onMoveShouldSetPanResponder: (evt, gestureState) => {
                // Require minimum horizontal movement and ensure horizontal is significantly greater than vertical movement
                if (
                  Math.abs(gestureState.dx) > 5 &&
                  Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 1.2
                ) {
                  return true;
                }
                return false;
              },

              onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dx < -1) {
                  // Limit movement to -200px max
                  animatedValue.setValue(Math.max(gestureState.dx, -200));
                }
              },

              onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx < -100) {
                  // If swiped left sufficiently, slide out completely
                  Animated.timing(animatedValue, {
                    toValue: -100,
                    duration: 300,
                    useNativeDriver: true,
                  }).start(() => {
                    triggerHaptic('impactMedium');
                  });
                } else {
                  // Reset back to original position
                  Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                  }).start();
                }
              },

              onPanResponderTerminate: () => {
                // Gesture was cancelled (e.g. FlatList took over scrolling) so reset the value
                Animated.timing(animatedValue, {
                  toValue: 0,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
              },

              // onShouldBlockNativeResponder: () => false, // Allow other native components (like FlatList) to handle touches
            });

            const animatedStyle = {
              transform: [
                {
                  translateX: animatedValue,
                },
              ],
            };

            const isTransformed = selectedCard === item.floor;

            const transformStyle = {
              transform: [
                {translateY: animations[item.floor]}, // Moves the button up
                {
                  rotate: animations[item.floor].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'], // Rotate the button
                  }),
                },
              ],
              opacity: animations[item.floor].interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0], // Make the button invisible
              }),
            };

            return (
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: responsiveScreenHeight(1),
                }}>
                <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
                  <View
                    style={{
                      width: responsiveScreenWidth(93),
                      position: 'relative',
                      borderRadius: 16,
                      backgroundColor: color.primary,
                    }}>
                    {!isTransformed ? (
                      <>
                        <View
                          style={{
                            height: responsiveScreenHeight(3),
                            width: responsiveScreenHeight(3),
                            position: 'absolute',
                            top: 20,
                            right: 25,
                            borderRadius: responsiveScreenHeight(2),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            zIndex: 0,
                          }}>
                          <Animated.View style={transformStyle}>
                            <TouchableOpacity
                              onPress={() => handlePinPress(item.floor)}
                              style={{
                                height: responsiveScreenHeight(2),
                                width: responsiveScreenHeight(2),
                                borderRadius: responsiveScreenHeight(2),
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'transparent',
                                zIndex: 9,
                              }}>
                              <Image
                                source={require('../../assests/icons/push-pin.png')}
                                style={{
                                  height: responsiveScreenHeight(1.5),
                                  width: responsiveScreenHeight(1.5),
                                  resizeMode: 'contain',
                                  tintColor: color.primary,
                                  zIndex: 9,
                                }}
                              />
                            </TouchableOpacity>
                          </Animated.View>
                        </View>
                        <Animated.View
                          {...panResponder.panHandlers}
                          style={[animatedStyle]}>
                          <View
                            style={{
                              backgroundColor: color.white,
                              borderRadius: 15,
                              width: '100%',
                              overflow: 'hidden',
                            }}>
                            <View
                              style={{
                                width: '98%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingVertical: responsiveScreenHeight(1.2),
                                paddingHorizontal: responsiveScreenWidth(4),
                              }}>
                              <View>
                                <Text
                                  style={{
                                    fontSize: responsiveScreenFontSize(1.7),
                                    color: color.primary,
                                    fontFamily: font.NunitoMedium,
                                  }}>
                                  {item.heading}
                                </Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: responsiveScreenFontSize(1.4),
                                      marginTop: responsiveScreenHeight(0.1),
                                      color: color.black60,
                                      fontFamily: font.NunitoMedium,
                                    }}>
                                    {item.place}
                                  </Text>
                                  <View
                                    style={{
                                      height: responsiveScreenHeight(0.8),
                                      margin: 4,
                                      width: responsiveScreenWidth(1.6),
                                      borderRadius: 10,
                                      backgroundColor: color.primary,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      fontSize: responsiveScreenFontSize(1.5),
                                      marginTop: responsiveScreenHeight(0.1),
                                      color: color.black60,
                                      fontFamily: font.NunitoRegular,
                                    }}>
                                    {item.floor}th Floor
                                  </Text>
                                </View>
                              </View>
                              <View>
                                <Pressable
                                  onLongPress={() =>
                                    handleLongPress(item.floor)
                                  }
                                  style={{
                                    height: responsiveScreenHeight(3.5),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 50,
                                    backgroundColor: 'white',
                                    opacity: 0.8,
                                  }}>
                                  <Image
                                    source={require('../../assests/msg2.png')}
                                    style={{
                                      tintColor: color.primaryForTop,
                                      aspectRatio: 1,
                                      height: '60%',
                                      resizeMode: 'contain',
                                    }}
                                  />
                                </Pressable>
                              </View>
                            </View>
                            <View
                              style={{
                                width: '45%',
                                backgroundColor: color.primary,
                                height: responsiveScreenHeight(0.7),
                                //   borderBottomLeftRadius: 30,
                                //   borderTopRightRadius: 10,
                                //   borderBottomRightRadius: 10,
                                borderRadius: 15,
                              }}
                            />
                          </View>
                        </Animated.View>
                      </>
                    ) : (
                      <View
                        style={{
                          backgroundColor: '#F0F4F8',
                          borderRadius: 10,
                          width: '100%',
                          paddingHorizontal: responsiveScreenWidth(4),
                          paddingVertical: responsiveScreenHeight(2),
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveScreenFontSize(1.6),
                            color: 'gray',
                            fontFamily: font.NunitoRegular,
                          }}>
                          Are you sure you want to increase the quantity?
                        </Text>
                        <Pressable
                          style={{
                            height: responsiveScreenHeight(3),
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 50,
                            opacity: 0.8,
                          }}>
                          <Image
                            source={require('../../assests/msg2.png')}
                            style={{
                              tintColor: color.primaryForTop,
                              aspectRatio: 1,
                              height: '60%',
                              resizeMode: 'contain',
                            }}
                          />
                        </Pressable>
                      </View>
                    )}
                  </View>
                </Shadow>
              </View>
            );
          }}
        />
      </View>

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
          bottom: responsiveScreenHeight(2),
          right: responsiveScreenWidth(3),
          gap: responsiveScreenHeight(1.5),
          alignItems: 'flex-end',
          zIndex: 3,
          pointerEvents: 'box-none',
        }}>
        <Animated.View
          style={[
            {
              opacity: animation,
              width: responsiveScreenWidth(55),
              backgroundColor: color.white,
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
                    navigation.navigate(routes.SCHEDULEFORM);
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
                      source={require(`../../assests/icons/calendar-add.png`)}
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
                    Schedule Meeting
                  </Text>
                </Pressable>
              </Shadow>

              <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
                <Pressable
                  onPress={() => {
                    setSidBar(false);
                    startAnimation();
                    navigation.navigate(routes.CONTACT);
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
                      source={require(`../../assests/icons/box3.png`)}
                      style={{
                        height: '97%',
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
                    Contact Book
                  </Text>
                </Pressable>
              </Shadow>

              <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
                <Pressable
                  onPress={() => {
                    setSidBar(false);
                    startAnimation();
                    navigation.navigate(routes.ITEM_REQUEST);
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
                      source={require(`../../assests/icons/calendar2.png`)}
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
                    Item Request
                  </Text>
                </Pressable>
              </Shadow>

              <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
                <Pressable
                  onPress={() => {
                    navigation.navigate(routes.CHATS);
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
                      source={require(`../../assests/icons/message.png`)}
                      style={{
                        height: '90%',
                        aspectRatio: 1,
                        tintColor: color.black60,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: font.NunitoMedium,
                      color: color.black60,
                      fontSize: responsiveScreenFontSize(1.6),
                    }}>
                    Messages
                  </Text>
                </Pressable>
              </Shadow>
            </View>
          </Shadow>
        </Animated.View>

        <Shadow distance={8} startColor={color.black15} offset={[0, 1]}>
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
              source={require('../../assests/icons/add.png')}
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

        <Shadow distance={8} startColor={color.black15} offset={[0, 1]}>
          <Pressable
            style={{
              width: responsiveScreenWidth(12),
              borderRadius: 200,
            }}
            onPress={() => {
              navigation.navigate(routes.PROFILE);
            }}>
            <LinearGradient
              style={{
                aspectRatio: 1,
                borderRadius: 200,

                justifyContent: 'center',
                alignItems: 'center',
              }}
              direction={'Vertical'}>
              <Image
                source={require('../../assests/icons/userOutline.png')}
                style={{
                  height: responsiveScreenHeight(2),
                  aspectRatio: 1,
                  tintColor: color.white,
                  resizeMode: 'contain',
                }}
              />
            </LinearGradient>
          </Pressable>
        </Shadow>
      </View>
    </>
  );
}

export default PMHomePage;
