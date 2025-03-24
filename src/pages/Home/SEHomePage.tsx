/* eslint-disable radix */
/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
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
  StyleSheet,
  Easing,
  TextInput,
} from 'react-native';
import {color, font, routes} from '../../config/Env';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {
  BottomModal,
  LinearGradient as CustomGradient,
  ProgressBar,
} from '../../component';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {useAppSelector} from '../../store/hooks';
import TaskProgressBar from '../../component/TaskProgressBar';
import DraggableComponent from '../../component/DraggableComponent';
import Svg, {Defs, LinearGradient, Rect, Stop, SvgXml} from 'react-native-svg';
import {loginArrow, logoSvg, logoSvgPrimary} from '../../svg';
import NewDrag from '../../component/NewDrag';
import Entypo from 'react-native-vector-icons/Entypo';
import {Shadow} from 'react-native-shadow-2';
import useHapticFeedback from '../../hooks/useHapticFeedback';
import Slider from '@react-native-community/slider';
import {Keyboard} from 'react-native';
import SearchBar from '../../component/SearchBar';
import PulseIndicator from '../../component/CustomPulseIndicator'

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

function SEHomePage() {
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

  const buttons = ['10th Floor', '12th Floor', '13th Floor'];
  const [selectedTab, setSelectedTab] = useState('10th Floor');

  const [clickedDrop, setClickedDrop] = useState<String | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [toolsReqModal, setToolsReqModal] = useState(false);
  const [addLabourModal, setAddLabourModal] = useState(false);
  const [dummyData, setDummyData] = useState([
    {
      name: 'Excavation',
      tag: 'Organizer',
      time: '12:30 AM',
      date: '12 Sep 2024',
      pic: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Horizon Belmound Construction Inventory Found in the Underground',
      desc: 'Insatll safety barriers on the 4th-floor perimeter. Ensure the gaps between walls',
      _id: 65746,
      running: 1,
    },
    {
      name: 'Internal wiring',
      tag: 'Organizer',
      time: '12:30 AM',
      date: '12 Sep 2024',
      pic: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Horizon Belmound Construction Inventory Found in the Underground',
      desc: 'Insatll safety barriers on the 4th-floor perimeter. Ensure the gaps between walls',
      _id: 45697,
      running: 0,
    },
    {
      name: 'Grinding',
      tag: 'Organizer',
      time: '12:30 AM',
      date: '12 Sep 2024',
      pic: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Horizon Belmound Construction Inventory Found in the Underground',
      desc: 'Insatll safety barriers on the 4th-floor perimeter. Ensure the gaps between walls',
      _id: 12587,
      running: 0,
    },
    {
      name: 'Flooring',
      tag: 'Organizer',
      time: '12:30 AM',
      date: '12 Sep 2024',
      pic: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Horizon Belmound Construction Inventory Found in the Underground',
      desc: 'Insatll safety barriers on the 4th-floor perimeter. Ensure the gaps between walls',
      _id: 36985,
      running: 0,
    },
    {
      name: 'Backfilling',
      tag: 'Organizer',
      time: '12:30 AM',
      date: '12 Sep 2024',
      pic: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Horizon Belmound Construction Inventory Found in the Underground',
      desc: 'Insatll safety barriers on the 4th-floor perimeter. Ensure the gaps between walls',
      _id: 47896,
      running: 0,
    },
    {
      name: 'Excavation',
      tag: 'Organizer',
      time: '12:30 AM',
      date: '12 Sep 2024',
      pic: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Horizon Belmound Construction Inventory Found in the Underground',
      desc: 'Insatll safety barriers on the 4th-floor perimeter. Ensure the gaps between walls',
      _id: 32569,
      running: 1,
    },
    {
      name: 'Excavation',
      tag: 'Organizer',
      time: '12:30 AM',
      date: '12 Sep 2024',
      pic: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Horizon Belmound Construction Inventory Found in the Underground',
      desc: 'Insatll safety barriers on the 4th-floor perimeter. Ensure the gaps between walls',
      _id: 45871,
      running: 0,
    },
    {
      name: 'Excavation',
      tag: 'Organizer',
      time: '12:30 AM',
      date: '12 Sep 2024',
      pic: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Horizon Belmound Construction Inventory Found in the Underground',
      desc: 'Insatll safety barriers on the 4th-floor perimeter. Ensure the gaps between walls',
      _id: 54698,
      running: 0,
    },
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Tower A2');
  const options = ['Tower A1', 'Tower A2', 'Tower A3'];
  const flatList = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const [slide, setSlide] = useState(false);
  const screenWidth = responsiveScreenWidth(100);
  const halfScreenWidth = screenWidth / 5;

  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {user} = useAppSelector(state => state.userStore);

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
        toValue: responsiveScreenHeight(10), // Expand height first
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(animationValue, {
          toValue: 0, // Bring content down smoothly
          duration: 200,
          useNativeDriver: false,
        }).start();
      });
    }
  };
  // ________________________________________END_______________________________________

  const animatedValueForTranslateX = new Animated.Value(0);
  // Reset width when modal is visible
  useEffect(() => {
    if (toolsReqModal) {
      setTimeout(() => {
        Animated.timing(animatedValueForTranslateX, {
          toValue: 0, // Reset to original width
          duration: 300,
          useNativeDriver: false,
        }).start();
      }, 200);
    }
  }, [toolsReqModal]);

  const renderTabContent = () => {
    switch (selectedTab) {
      case '10th Floor':
        return (
          <View style={{flex: 1}}>
            <FlatList
              data={dummyData}
              keyExtractor={item => item._id.toString()}
              renderItem={({item}: any) => {
                const animatedValueForTranslateX = new Animated.Value(0);
                const panResponder1 = PanResponder.create({
                  onStartShouldSetPanResponder: () => false,

                  onMoveShouldSetPanResponder: (evt, gestureState) => {
                    // Require minimum horizontal movement and ensure horizontal is significantly greater than vertical movement
                    if (
                      Math.abs(gestureState.dx) > 5 &&
                      Math.abs(gestureState.dx) >
                        Math.abs(gestureState.dy) * 1.2
                    ) {
                      return true;
                    }
                    return false;
                  },

                  onPanResponderMove: (evt, gestureState) => {
                    if (gestureState.dx < -1) {
                      // Limit movement to -200px max
                      animatedValueForTranslateX.setValue(
                        Math.max(gestureState.dx, -200),
                      );
                    }
                  },

                  onPanResponderRelease: (evt, gestureState) => {
                    if (gestureState.dx < -100) {
                      // If swiped left sufficiently, slide out completely
                      Animated.timing(animatedValueForTranslateX, {
                        toValue: -100,
                        duration: 300,
                        useNativeDriver: true,
                      }).start(() => {
                        setToolsReqModal(true);
                        triggerHaptic('impactMedium');
                      });
                    } else {
                      // Reset back to original position
                      Animated.timing(animatedValueForTranslateX, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                      }).start();
                    }
                  },

                  onPanResponderTerminate: () => {
                    // Gesture was cancelled (e.g. FlatList took over scrolling) so reset the value
                    Animated.timing(animatedValueForTranslateX, {
                      toValue: 0,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();
                  },

                  // onShouldBlockNativeResponder: () => false, // Allow other native components (like FlatList) to handle touches
                });

                const animatedStyle2 = {
                  transform: [
                    {
                      translateX: animatedValueForTranslateX,
                    },
                  ],
                };
                return (
                  <View
                    style={{
                      marginTop: responsiveScreenHeight(1.5),
                    }}>
                    <Shadow
                      distance={3}
                      style={{
                        width: '100%',
                        borderRadius: 20,
                      }}
                      startColor={color.gray2}
                      offset={[0, 0]}>
                      <View
                        style={{
                          overflow: 'hidden',
                        }}>
                        <View
                          style={{
                            backgroundColor: color.primary,
                            minHeight: responsiveScreenHeight(8),
                            borderRadius: 20,
                          }}>
                          <Animated.View
                            {...panResponder1.panHandlers}
                            style={[animatedStyle2]}>
                            <Pressable
                              onPress={() => {
                                {
                                  navigation.navigate(routes.SE_SUBTASK);
                                }
                              }}
                              style={{
                                minHeight: responsiveScreenHeight(8),
                                paddingHorizontal: responsiveScreenWidth(3.5),
                                paddingVertical: responsiveScreenHeight(1.5),
                                borderRadius: 19,
                                backgroundColor: color.white,
                                zIndex: 1,
                              }}>
                              {/* =============top======================== */}
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  marginBottom: responsiveScreenHeight(0.3),
                                }}>
                                <View
                                  style={{
                                    borderRadius: 30,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      color: color.primary,
                                      fontSize: responsiveScreenFontSize(2),
                                      fontFamily: font.NunitoSemiBold,
                                    }}>
                                    {item.name}
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
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                    }}>
                                    <View
                                      style={{
                                        backgroundColor: color.primaryLow,
                                        paddingHorizontal:
                                          responsiveScreenWidth(1),
                                        paddingVertical:
                                          responsiveScreenWidth(1),
                                        borderRadius: 30,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginRight: responsiveScreenWidth(1),
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
                                          source={require('../../assests/icons/calendar.png')}
                                          style={{
                                            tintColor: color.primary,
                                            aspectRatio: 1,
                                            height: '100%',
                                            resizeMode: 'contain',
                                          }}
                                        />
                                      </View>
                                      <Text
                                        style={{
                                          color: color.primary,
                                          fontSize:
                                            responsiveScreenFontSize(1.4),
                                          fontFamily: font.NunitoSemiBold,
                                          marginRight: responsiveScreenWidth(1),
                                        }}>
                                        Oct 1
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        backgroundColor: color.secondaryLow,
                                        paddingHorizontal:
                                          responsiveScreenWidth(1),
                                        paddingVertical:
                                          responsiveScreenWidth(1),
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
                                          source={require('../../assests/icons/calendar.png')}
                                          style={{
                                            tintColor: color.secondary,
                                            aspectRatio: 1,
                                            height: '100%',
                                            resizeMode: 'contain',
                                          }}
                                        />
                                      </View>
                                      <Text
                                        style={{
                                          color: color.secondary,
                                          fontSize:
                                            responsiveScreenFontSize(1.4),
                                          fontFamily: font.NunitoSemiBold,
                                          marginRight: responsiveScreenWidth(1),
                                        }}>
                                        Oct 12
                                      </Text>
                                    </View>
                                  </View>

                                  <Pressable
                                    onPress={() => {
                                      handlePressToggleButton(item._id);
                                      console.log('tapp');
                                    }}
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
                                      zIndex: 3,
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

                              {/* =============Middle======================== */}
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  gap: responsiveScreenWidth(1),
                                  marginBottom: responsiveScreenHeight(0.5),
                                }}>
                                <Text
                                  style={{
                                    color: color.primary,
                                    fontSize: responsiveScreenFontSize(1.1),
                                    fontFamily: font.NunitoMedium,
                                    padding: 3,
                                    backgroundColor: color.primaryLow,
                                    borderRadius: 50,
                                  }}>
                                  100 Sft
                                </Text>

                                <Text
                                  style={{
                                    color: color.secondary,
                                    fontSize: responsiveScreenFontSize(1.1),
                                    fontFamily: font.NunitoMedium,
                                    padding: 3,
                                    backgroundColor: color.secondaryLow,
                                    borderRadius: 50,
                                  }}>
                                  1200 Sft
                                </Text>
                              </View>
                              {/* =============bottom===================== */}
                              {item.running === 1 && (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: responsiveScreenHeight(0.5),
                                    alignItems: 'center',
                                  }}>
                                  <View
                                    style={{
                                      width: '90%',
                                      height: responsiveScreenHeight(1),
                                      backgroundColor: color.primaryLow,
                                      borderRadius: 20,
                                    }}>
                                    <View
                                      style={{
                                        width: '45%',
                                        height: '100%',
                                        backgroundColor: color.primary,
                                        borderRadius: 20,
                                      }}
                                    />
                                  </View>

                                  <Text
                                    style={{
                                      fontFamily: font.NunitoSemiBold,
                                      fontSize: responsiveScreenFontSize(1.4),
                                    }}>
                                    40%
                                  </Text>
                                </View>
                              )}
                            </Pressable>
                          </Animated.View>
                        </View>
                      </View>
                    </Shadow>

                    {clickedDrop === item._id && (
                      <Animated.View
                        style={{
                          height: animationValue1, // Expands height first
                          overflow: 'hidden', // Prevents content from showing before full expansion
                          zIndex: -1,
                        }}>
                        <Animated.View
                          style={{
                            transform: [{translateY: animationValue}], // Moves content down smoothly
                          }}>
                          <View
                            style={{
                              height: responsiveScreenHeight(7),
                              paddingHorizontal: responsiveScreenWidth(6),
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                              }}>
                              {/* ---------Skilled--------- */}
                              <View
                                style={{
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    zIndex: 1,
                                  }}>
                                  <Shadow
                                    distance={3}
                                    style={{}}
                                    startColor={color.gray2}
                                    offset={[0, 0]}>
                                    <View
                                      style={{
                                        borderRadius: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        backgroundColor: color.primaryLow,
                                        width: responsiveScreenWidth(40),
                                        paddingHorizontal:
                                          responsiveScreenWidth(1),
                                        paddingVertical:
                                          responsiveScreenHeight(0.5),
                                      }}>
                                      <View
                                        style={{
                                          height: responsiveScreenHeight(2.3),
                                          width: responsiveScreenHeight(2.3),
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          marginRight:
                                            responsiveScreenWidth(1.5),
                                          backgroundColor: 'white',
                                          borderRadius: 20,
                                        }}>
                                        <Image
                                          source={require('../../assests/icons/user.png')}
                                          style={{
                                            tintColor: color.primary,
                                            aspectRatio: 1,
                                            height: '70%',
                                            resizeMode: 'contain',
                                          }}
                                        />
                                      </View>
                                      <Text
                                        style={{
                                          color: color.black87,
                                          fontSize:
                                            responsiveScreenFontSize(1.8),
                                          fontFamily: font.NunitoMedium,
                                        }}>
                                        Ankit Kamboj
                                      </Text>
                                    </View>
                                  </Shadow>
                                </View>

                                <View
                                  style={{
                                    zIndex: -1,
                                  }}>
                                  <Shadow
                                    distance={3}
                                    style={{}}
                                    startColor={color.gray2}
                                    offset={[0, 0]}>
                                    <View
                                      style={{
                                        borderRadius: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        backgroundColor: color.primaryLow,
                                        width: responsiveScreenWidth(40),
                                        paddingHorizontal:
                                          responsiveScreenWidth(1),
                                        paddingVertical:
                                          responsiveScreenHeight(0.5),
                                      }}>
                                      <View
                                        style={{
                                          height: responsiveScreenHeight(2.3),
                                          width: responsiveScreenHeight(2.3),
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          marginRight:
                                            responsiveScreenWidth(1.5),
                                          backgroundColor: 'white',
                                          borderRadius: 20,
                                        }}>
                                        <Image
                                          source={require('../../assests/icons/user.png')}
                                          style={{
                                            tintColor: color.primary,
                                            aspectRatio: 1,
                                            height: '70%',
                                            resizeMode: 'contain',
                                          }}
                                        />
                                      </View>
                                      <Text
                                        style={{
                                          color: color.black87,
                                          fontSize:
                                            responsiveScreenFontSize(1.8),
                                          fontFamily: font.NunitoMedium,
                                        }}>
                                        Pankaj Sharma
                                      </Text>
                                    </View>
                                  </Shadow>
                                </View>
                              </View>

                              {/* ---------Unskilled--------- */}
                              <View
                                style={{
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    zIndex: 1,
                                  }}>
                                  <Shadow
                                    distance={3}
                                    style={{}}
                                    startColor={color.gray2}
                                    offset={[0, 0]}>
                                    <View
                                      style={{
                                        borderRadius: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        backgroundColor: color.secondaryLow,
                                        width: responsiveScreenWidth(40),
                                        paddingHorizontal:
                                          responsiveScreenWidth(1),
                                        paddingVertical:
                                          responsiveScreenHeight(0.5),
                                      }}>
                                      <View
                                        style={{
                                          height: responsiveScreenHeight(2.3),
                                          width: responsiveScreenHeight(2.3),
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          marginRight:
                                            responsiveScreenWidth(1.5),
                                          backgroundColor: 'white',
                                          borderRadius: 20,
                                        }}>
                                        <Image
                                          source={require('../../assests/icons/user.png')}
                                          style={{
                                            tintColor: color.secondary,
                                            aspectRatio: 1,
                                            height: '70%',
                                            resizeMode: 'contain',
                                          }}
                                        />
                                      </View>
                                      <Text
                                        style={{
                                          color: color.black87,
                                          fontSize:
                                            responsiveScreenFontSize(1.8),
                                          fontFamily: font.NunitoMedium,
                                        }}>
                                        Twinkle Johnson
                                      </Text>
                                    </View>
                                  </Shadow>
                                </View>

                                <View
                                  style={{
                                    zIndex: -1,
                                  }}>
                                  <Shadow
                                    distance={3}
                                    style={{}}
                                    startColor={color.gray2}
                                    offset={[0, 0]}>
                                    <View
                                      style={{
                                        borderRadius: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        backgroundColor: color.secondaryLow,
                                        width: responsiveScreenWidth(40),
                                        paddingHorizontal:
                                          responsiveScreenWidth(1),
                                        paddingVertical:
                                          responsiveScreenHeight(0.5),
                                      }}>
                                      <View
                                        style={{
                                          height: responsiveScreenHeight(2.3),
                                          width: responsiveScreenHeight(2.3),
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          marginRight:
                                            responsiveScreenWidth(1.5),
                                          backgroundColor: 'white',
                                          borderRadius: 20,
                                        }}>
                                        <Image
                                          source={require('../../assests/icons/user.png')}
                                          style={{
                                            tintColor: color.secondary,
                                            aspectRatio: 1,
                                            height: '70%',
                                            resizeMode: 'contain',
                                          }}
                                        />
                                      </View>
                                      <Text
                                        style={{
                                          color: color.black87,
                                          fontSize:
                                            responsiveScreenFontSize(1.8),
                                          fontFamily: font.NunitoMedium,
                                        }}>
                                        Rohit shetty
                                      </Text>
                                    </View>
                                  </Shadow>
                                </View>
                              </View>
                            </View>
                          </View>
                        </Animated.View>
                      </Animated.View>
                    )}
                  </View>
                );
              }}
              contentContainerStyle={{
                paddingHorizontal: responsiveScreenWidth(3),
                paddingBottom: responsiveScreenHeight(2),
              }}
            />
          </View>
        );
      case '12th Floor':
        return <View style={{flex: 1}}></View>;
      case '13th Floor':
        return (
          <View style={{flex: 1}}>
            <FlatList
              data={dummyData}
              keyExtractor={item => item._id.toString()}
              renderItem={({item}: any) => {
                console.log('heheheh', item);
                return (
                  <View
                    style={{
                      height: responsiveScreenHeight(18),
                      backgroundColor: color.white,
                      borderWidth: 1,
                      borderColor: color.red,
                      borderRadius: 15,
                      padding: responsiveScreenWidth(2.5),
                      elevation: 2,
                      gap: responsiveScreenHeight(1),
                      marginBottom: responsiveScreenHeight(1),
                    }}>
                    {/* =============top======================== */}
                    <View
                      style={{
                        // backgroundColor: 'red',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flex: 1,
                        alignItems: 'center',
                      }}>
                      {/* ====================== photo and name part================================ */}
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: responsiveScreenWidth(2),
                          width: responsiveScreenWidth(40),
                          alignItems: 'center',
                        }}>
                        {/* ===================Profile photo================== */}
                        <View
                          style={{
                            width: responsiveScreenWidth(11),
                            aspectRatio: 1,
                            borderRadius: 1212,
                            overflow: 'hidden',
                          }}>
                          <Image
                            source={{
                              uri: item.pic,
                            }}
                            style={{height: '100%', width: '100%'}}
                          />
                        </View>
                        {/* ===================Name and tag==================== */}
                        <View>
                          <Text
                            style={{
                              fontFamily: font.NunitoBold,
                              color: color.black87,
                              fontSize: responsiveScreenFontSize(1.8),
                            }}>
                            {item.name}
                          </Text>
                          <Text
                            style={{
                              fontFamily: font.NunitoSemiBold,
                              color: color.black60,
                              fontSize: responsiveScreenFontSize(1.5),
                            }}>
                            {item.tag}
                          </Text>
                        </View>
                      </View>
                      {/* ====================== photoooss================================ */}
                      <View
                        style={{
                          width: responsiveScreenWidth(25),
                          backgroundColor: 'gray',
                          height: responsiveScreenHeight(3.5),
                        }}></View>
                    </View>
                    {/* =============middle===================== */}
                    <View>
                      <Text
                        style={{
                          fontFamily: font.NunitoSemiBold,
                          fontSize: responsiveScreenFontSize(2),
                          color: color.black87,
                        }}>
                        {item.title.length > 10
                          ? item.title.substring(0, 42) + '...'
                          : item.title}
                      </Text>
                      <Text
                        style={{
                          fontFamily: font.NunitoSemiBold,
                          fontSize: responsiveScreenFontSize(1.6),
                          color: color.black60,
                        }}>
                        {item.desc.length > 10
                          ? item.desc.substring(0, 59) + '...'
                          : item.desc}
                      </Text>
                    </View>
                    {/* =============bottom===================== */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: responsiveScreenHeight(0.5),
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {/* =============time===================== */}
                        <Image
                          source={require(`../../assests/icons/clock.png`)}
                          style={{
                            width: '7%',
                            aspectRatio: 1,
                            tintColor: color.primary,
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: font.NunitoSemiBold,
                            fontSize: responsiveScreenFontSize(1.5),
                            color: color.black60,
                            marginLeft: responsiveScreenWidth(1),
                          }}>
                          {item.time}
                        </Text>
                        {/* ===================date======================= */}
                        <Image
                          source={require(`../../assests/icons/calendar.png`)}
                          style={{
                            marginLeft: responsiveScreenWidth(2),
                            width: '7%',
                            aspectRatio: 1,
                            tintColor: color.primary,
                          }}
                        />
                        <Text
                          style={{
                            marginLeft: responsiveScreenWidth(1),
                            fontFamily: font.NunitoSemiBold,
                            fontSize: responsiveScreenFontSize(1.5),
                            color: color.black60,
                          }}>
                          {item.date}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingHorizontal: responsiveScreenWidth(3),
                          height: responsiveScreenHeight(3.5),
                          width: responsiveScreenWidth(35),
                          borderWidth: responsiveScreenWidth(0.4),
                          borderRadius: 20,
                          borderColor: color.primary,
                        }}>
                        <Image
                          source={require(`../../assests/icons/map-marker.png`)}
                          style={{
                            width: '15%',
                            aspectRatio: 1,
                            tintColor: color.primary,
                          }}
                        />
                        <Text
                          style={{
                            marginLeft: responsiveScreenWidth(1),
                            fontFamily: font.NunitoSemiBold,
                            fontSize: responsiveScreenFontSize(1.5),
                            color: color.black60,
                          }}>
                          Horizon Belmo
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              contentContainerStyle={{
                paddingHorizontal: responsiveScreenWidth(3),
                paddingBottom: responsiveScreenHeight(2),
              }}
            />
          </View>
        );
      default:
        return null;
    }
  };

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

  // __________________________________________for work progress bar____________________________________________
  const [sliderValue, setSliderValue] = useState(50); // Initial value

  const handleSliderChange = (newValue: number) => {
    setSliderValue(Math.round(newValue)); // Update value when slider moves
  };

  const handleInputChange = (text: string) => {
    const newValue = parseInt(text) || 0; // Convert input to number
    setSliderValue(newValue);
  };
  const users = [
    {id: '1', name: 'Ankit Kamboj'},
    {id: '2', name: 'Pankaj Sharma'},
    {id: '3', name: 'Ratan Verma'},
    {id: '4', name: 'Ratan Verma'},
    {id: '5', name: 'Ratan Verma'},
    {id: '6', name: 'Ratan Verma'},
  ];
  // __________________________________________End____________________________________________

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />

      {/* __________________________________________________Notification Model__________________________________________________ */}
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
                    (Site Engineer) is requesting new items for Tower A1.{' '}
                  </Text>
                </View>
              </Pressable>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* __________________________________________________Tool Model__________________________________________________ */}

      <BottomModal
        visible={toolsReqModal}
        onClose={() => {
          setToolsReqModal(false);
        }}>
        <View
          style={{
            maxHeight: responsiveScreenHeight(78),
          }}>
          <View
            style={{
              alignSelf: 'center',
              paddingHorizontal: responsiveScreenWidth(4),
              paddingTop: responsiveScreenHeight(2),
            }}>
            {/* -----------------Heading---------------- */}
            <Text
              style={{
                fontFamily: font.NunitoSemiBold,
                color: color.black87,
                fontSize: responsiveScreenFontSize(2.5),
                marginBottom: responsiveScreenHeight(1),
                textAlign: 'center',
              }}>
              Excavation
            </Text>

            {/* -----------------work progress---------------- */}
            <View
              style={{
                flexDirection: 'row',
                gap: responsiveScreenWidth(2),
                marginBottom: responsiveScreenHeight(2),
              }}>
              <Text
                style={{
                  fontFamily: font.NunitoSemiBold,
                  color: color.primary,
                  fontSize: responsiveScreenFontSize(2),
                  marginBottom: responsiveScreenHeight(1),
                }}>
                Work Progress
              </Text>
              <View
                style={{
                  height: responsiveScreenHeight(2.8),
                  width: responsiveScreenHeight(2.8),
                  backgroundColor: color.white,
                  borderRadius: responsiveScreenHeight(2),
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: responsiveScreenHeight(0.1),
                }}>
                <Text
                  style={{
                    color: color.primary,
                    fontSize: responsiveScreenFontSize(1.4),
                    fontFamily: font.NunitoSemiBold,
                  }}>
                  Sft
                </Text>
              </View>
            </View>

            {/* -----------------Bar progress---------------- */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: responsiveScreenWidth(4),
                position: 'relative',
                marginTop: -responsiveScreenHeight(1.5),
                marginBottom: responsiveScreenHeight(1.5),
              }}>
              <View
                style={{
                  width: '78%',
                  height: 10,
                  backgroundColor: '#ddd', // Track Background
                  borderRadius: 5,
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                <View
                  style={{
                    width: `${sliderValue}%`,
                    height: '100%',
                    backgroundColor: color.primary, // Track Background
                    borderRadius: 5,
                  }}></View>
                <Slider
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                  }}
                  minimumValue={0}
                  maximumValue={100} // Set max limit
                  value={sliderValue}
                  onTouchStart={() => console.log('hello')}
                  minimumTrackTintColor={color.primary}
                  maximumTrackTintColor={color.gray3}
                  thumbTintColor={color.primaryForTop}
                  onValueChange={handleSliderChange}
                  thumbImage={
                    Platform.OS === 'android'
                      ? require('../../assests/icons/slider-thumb.png')
                      : ''
                  }
                />
              </View>

              {/* Input Field */}
              <View
                style={{
                  width: responsiveScreenWidth(15),
                  height: responsiveScreenHeight(4.5),
                  borderWidth: 1.5,
                  borderColor: color.primary,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: color.primaryLow,
                }}>
                <TextInput
                  style={{
                    fontSize: responsiveScreenFontSize(2),
                    fontFamily: font.NunitoMedium,
                    color: color.primary,
                  }}
                  value={sliderValue.toString()}
                  keyboardType="numeric"
                  onChangeText={handleInputChange}
                />
              </View>
            </View>

            <Text
              style={{
                fontFamily: font.NunitoSemiBold,
                color: color.primary,
                fontSize: responsiveScreenFontSize(2),
                marginBottom: responsiveScreenHeight(3),
              }}>
              Material Consumption
            </Text>
            <View
              style={{
                flex: 1,
                width: '100%',
              }}>
              <ScrollView
                contentContainerStyle={{
                  paddingBottom: responsiveScreenHeight(2),
                }}
                showsVerticalScrollIndicator={false}>
                <View style={{}}>
                  <View
                    style={{
                      height: responsiveScreenHeight(8.5),
                      width: '100%',
                      borderRadius: 50,
                      paddingHorizontal: responsiveScreenWidth(3),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: color.white87,
                      marginBottom: responsiveScreenHeight(1),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: responsiveScreenWidth(4),
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
                      <View
                        style={{
                          gap: responsiveScreenHeight(0.5),
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
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: responsiveScreenWidth(1.5),
                          }}>
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
                                fontSize: responsiveScreenFontSize(1),
                                fontFamily: font.NunitoSemiBold,
                                marginRight: responsiveScreenWidth(1),
                              }}>
                              100 Sft
                            </Text>
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
                                fontSize: responsiveScreenFontSize(1),
                                fontFamily: font.NunitoSemiBold,
                                marginRight: responsiveScreenWidth(1),
                              }}>
                              1200 Sft
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: responsiveScreenWidth(24),
                        height: responsiveScreenHeight(4),
                        backgroundColor: color.primaryLow,
                        borderRadius: 50,
                        borderWidth: 1,
                        paddingHorizontal: responsiveScreenWidth(0.5),
                      }}>
                      <Pressable
                        // onPress={() => {
                        //   triggerHaptic('impactMedium');
                        //   if (quantity > 0) {
                        //     let val = quantity - 1;
                        //     setQuantity(val);
                        //   }
                        //   handleRemove(name.id);
                        // }}
                        style={{
                          height: responsiveScreenHeight(2.8),
                          width: responsiveScreenHeight(2.8),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          backgroundColor: color.primary,
                        }}>
                        <Image
                          source={require('../../assests/icons/minus.png')}
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
                        2
                      </Text>

                      <Pressable
                        // onPress={() => {
                        //   triggerHaptic('impactMedium');
                        //   let val = quantity + 1;
                        //   setQuantity(val);
                        //   handleAdd(name.id, name.url);
                        // }}
                        style={{
                          height: responsiveScreenHeight(2.8),
                          width: responsiveScreenHeight(2.8),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          backgroundColor: color.primary,
                        }}>
                        <Image
                          source={require('../../assests/icons/plus.png')}
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
                      backgroundColor: color.white87,
                      marginBottom: responsiveScreenHeight(1),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: responsiveScreenWidth(4),
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
                      <View
                        style={{
                          gap: responsiveScreenHeight(0.5),
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
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: responsiveScreenWidth(1.5),
                          }}>
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
                                fontSize: responsiveScreenFontSize(1),
                                fontFamily: font.NunitoSemiBold,
                                marginRight: responsiveScreenWidth(1),
                              }}>
                              100 Sft
                            </Text>
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
                                fontSize: responsiveScreenFontSize(1),
                                fontFamily: font.NunitoSemiBold,
                                marginRight: responsiveScreenWidth(1),
                              }}>
                              1200 Sft
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: responsiveScreenWidth(24),
                        height: responsiveScreenHeight(4),
                        backgroundColor: color.primaryLow,
                        borderRadius: 50,
                        borderWidth: 1,
                        paddingHorizontal: responsiveScreenWidth(0.5),
                      }}>
                      <Pressable
                        // onPress={() => {
                        //   triggerHaptic('impactMedium');
                        //   if (quantity > 0) {
                        //     let val = quantity - 1;
                        //     setQuantity(val);
                        //   }
                        //   handleRemove(name.id);
                        // }}
                        style={{
                          height: responsiveScreenHeight(2.8),
                          width: responsiveScreenHeight(2.8),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          backgroundColor: color.primary,
                        }}>
                        <Image
                          source={require('../../assests/icons/minus.png')}
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
                        2
                      </Text>

                      <Pressable
                        // onPress={() => {
                        //   triggerHaptic('impactMedium');
                        //   let val = quantity + 1;
                        //   setQuantity(val);
                        //   handleAdd(name.id, name.url);
                        // }}
                        style={{
                          height: responsiveScreenHeight(2.8),
                          width: responsiveScreenHeight(2.8),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          backgroundColor: color.primary,
                        }}>
                        <Image
                          source={require('../../assests/icons/plus.png')}
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
                      backgroundColor: color.white87,
                      marginBottom: responsiveScreenHeight(1),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: responsiveScreenWidth(4),
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
                      <View
                        style={{
                          gap: responsiveScreenHeight(0.5),
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
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: responsiveScreenWidth(1.5),
                          }}>
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
                                fontSize: responsiveScreenFontSize(1),
                                fontFamily: font.NunitoSemiBold,
                                marginRight: responsiveScreenWidth(1),
                              }}>
                              100 Sft
                            </Text>
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
                                fontSize: responsiveScreenFontSize(1),
                                fontFamily: font.NunitoSemiBold,
                                marginRight: responsiveScreenWidth(1),
                              }}>
                              1200 Sft
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: responsiveScreenWidth(24),
                        height: responsiveScreenHeight(4),
                        backgroundColor: color.primaryLow,
                        borderRadius: 50,
                        borderWidth: 1,
                        paddingHorizontal: responsiveScreenWidth(0.5),
                      }}>
                      <Pressable
                        // onPress={() => {
                        //   triggerHaptic('impactMedium');
                        //   if (quantity > 0) {
                        //     let val = quantity - 1;
                        //     setQuantity(val);
                        //   }
                        //   handleRemove(name.id);
                        // }}
                        style={{
                          height: responsiveScreenHeight(2.8),
                          width: responsiveScreenHeight(2.8),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          backgroundColor: color.primary,
                        }}>
                        <Image
                          source={require('../../assests/icons/minus.png')}
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
                        2
                      </Text>

                      <Pressable
                        // onPress={() => {
                        //   triggerHaptic('impactMedium');
                        //   let val = quantity + 1;
                        //   setQuantity(val);
                        //   handleAdd(name.id, name.url);
                        // }}
                        style={{
                          height: responsiveScreenHeight(2.8),
                          width: responsiveScreenHeight(2.8),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          backgroundColor: color.primary,
                        }}>
                        <Image
                          source={require('../../assests/icons/plus.png')}
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
                      backgroundColor: color.white87,
                      marginBottom: responsiveScreenHeight(1),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: responsiveScreenWidth(4),
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
                      <View
                        style={{
                          gap: responsiveScreenHeight(0.5),
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
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: responsiveScreenWidth(1.5),
                          }}>
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
                                fontSize: responsiveScreenFontSize(1),
                                fontFamily: font.NunitoSemiBold,
                                marginRight: responsiveScreenWidth(1),
                              }}>
                              100 Sft
                            </Text>
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
                                fontSize: responsiveScreenFontSize(1),
                                fontFamily: font.NunitoSemiBold,
                                marginRight: responsiveScreenWidth(1),
                              }}>
                              1200 Sft
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: responsiveScreenWidth(24),
                        height: responsiveScreenHeight(4),
                        backgroundColor: color.primaryLow,
                        borderRadius: 50,
                        borderWidth: 1,
                        paddingHorizontal: responsiveScreenWidth(0.5),
                      }}>
                      <Pressable
                        // onPress={() => {
                        //   triggerHaptic('impactMedium');
                        //   if (quantity > 0) {
                        //     let val = quantity - 1;
                        //     setQuantity(val);
                        //   }
                        //   handleRemove(name.id);
                        // }}
                        style={{
                          height: responsiveScreenHeight(2.8),
                          width: responsiveScreenHeight(2.8),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          backgroundColor: color.primary,
                        }}>
                        <Image
                          source={require('../../assests/icons/minus.png')}
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
                        2
                      </Text>

                      <Pressable
                        // onPress={() => {
                        //   triggerHaptic('impactMedium');
                        //   let val = quantity + 1;
                        //   setQuantity(val);
                        //   handleAdd(name.id, name.url);
                        // }}
                        style={{
                          height: responsiveScreenHeight(2.8),
                          width: responsiveScreenHeight(2.8),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          backgroundColor: color.primary,
                        }}>
                        <Image
                          source={require('../../assests/icons/plus.png')}
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
                      backgroundColor: color.white87,
                      marginBottom: responsiveScreenHeight(1),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: responsiveScreenWidth(4),
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
                      <View
                        style={{
                          gap: responsiveScreenHeight(0.5),
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
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: responsiveScreenWidth(1.5),
                          }}>
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
                                fontSize: responsiveScreenFontSize(1),
                                fontFamily: font.NunitoSemiBold,
                                marginRight: responsiveScreenWidth(1),
                              }}>
                              100 Sft
                            </Text>
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
                                fontSize: responsiveScreenFontSize(1),
                                fontFamily: font.NunitoSemiBold,
                                marginRight: responsiveScreenWidth(1),
                              }}>
                              1200 Sft
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: responsiveScreenWidth(24),
                        height: responsiveScreenHeight(4),
                        backgroundColor: color.primaryLow,
                        borderRadius: 50,
                        borderWidth: 1,
                        paddingHorizontal: responsiveScreenWidth(0.5),
                      }}>
                      <Pressable
                        // onPress={() => {
                        //   triggerHaptic('impactMedium');
                        //   if (quantity > 0) {
                        //     let val = quantity - 1;
                        //     setQuantity(val);
                        //   }
                        //   handleRemove(name.id);
                        // }}
                        style={{
                          height: responsiveScreenHeight(2.8),
                          width: responsiveScreenHeight(2.8),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          backgroundColor: color.primary,
                        }}>
                        <Image
                          source={require('../../assests/icons/minus.png')}
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
                        2
                      </Text>

                      <Pressable
                        // onPress={() => {
                        //   triggerHaptic('impactMedium');
                        //   let val = quantity + 1;
                        //   setQuantity(val);
                        //   handleAdd(name.id, name.url);
                        // }}
                        style={{
                          height: responsiveScreenHeight(2.8),
                          width: responsiveScreenHeight(2.8),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          backgroundColor: color.primary,
                        }}>
                        <Image
                          source={require('../../assests/icons/plus.png')}
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
                      backgroundColor: color.white87,
                      marginBottom: responsiveScreenHeight(1),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: responsiveScreenWidth(4),
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
                      <View
                        style={{
                          gap: responsiveScreenHeight(0.5),
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
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: responsiveScreenWidth(1.5),
                          }}>
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
                                fontSize: responsiveScreenFontSize(1),
                                fontFamily: font.NunitoSemiBold,
                                marginRight: responsiveScreenWidth(1),
                              }}>
                              100 Sft
                            </Text>
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
                                fontSize: responsiveScreenFontSize(1),
                                fontFamily: font.NunitoSemiBold,
                                marginRight: responsiveScreenWidth(1),
                              }}>
                              1200 Sft
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: responsiveScreenWidth(24),
                        height: responsiveScreenHeight(4),
                        backgroundColor: color.primaryLow,
                        borderRadius: 50,
                        borderWidth: 1,
                        paddingHorizontal: responsiveScreenWidth(0.5),
                      }}>
                      <Pressable
                        // onPress={() => {
                        //   triggerHaptic('impactMedium');
                        //   if (quantity > 0) {
                        //     let val = quantity - 1;
                        //     setQuantity(val);
                        //   }
                        //   handleRemove(name.id);
                        // }}
                        style={{
                          height: responsiveScreenHeight(2.8),
                          width: responsiveScreenHeight(2.8),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          backgroundColor: color.primary,
                        }}>
                        <Image
                          source={require('../../assests/icons/minus.png')}
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
                        2
                      </Text>

                      <Pressable
                        // onPress={() => {
                        //   triggerHaptic('impactMedium');
                        //   let val = quantity + 1;
                        //   setQuantity(val);
                        //   handleAdd(name.id, name.url);
                        // }}
                        style={{
                          height: responsiveScreenHeight(2.8),
                          width: responsiveScreenHeight(2.8),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          backgroundColor: color.primary,
                        }}>
                        <Image
                          source={require('../../assests/icons/plus.png')}
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
                </View>
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              height: responsiveScreenHeight(80),
              width: responsiveScreenWidth(100),
              pointerEvents: 'none', // Allow touch events to pass through to the FlatList
            }}>
            {/* SVG Gradient Background */}
            <Svg height="100%" width="100%" style={{position: 'absolute'}}>
              <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="black" stopOpacity="0.0" />
                  <Stop offset="0.7" stopColor="white" stopOpacity="0.0" />
                  <Stop offset="0.90" stopColor="white" stopOpacity="0.95" />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="100%" fill="url(#grad)" />
            </Svg>

            {/* Content Overlay */}
            <View
              style={{
                position: 'absolute',
                width: '110%',
                height: '100%',
                justifyContent: 'flex-end',
              }}>
              <Pressable
                style={{
                  marginBottom: responsiveScreenHeight(5),
                }}
                //  onPress={handleCapture}
              >
                <CustomGradient
                  style={{
                    height: responsiveScreenHeight(5.5),
                    width: responsiveScreenHeight(24),
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveScreenFontSize(2),
                      fontFamily: font.NunitoSemiBold,
                      color: color.white,
                    }}>
                    Submit
                  </Text>
                </CustomGradient>
              </Pressable>
            </View>
          </View>
        </View>
      </BottomModal>

      <View style={{flex: 1, backgroundColor: color.white}}>
        {/* ________________________________________________________Top bar______________________________________________________ */}
        <CustomGradient style={{}} direction={'Vertical'}>
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
        </CustomGradient>
        {/* ==========================================Cards========================================== */}

        <View
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            overflow: 'visible',
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
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.2,
              shadowRadius: 3,
              width: '100%',
              height: '105%',
              alignSelf: 'center',
              position: 'absolute',
              zIndex: 5,
              overflow: 'hidden',
            }}>
            <FlatList
              ref={flatList}
              initialScrollIndex={index}
              style={{overflow: 'hidden'}}
              data={DATA}
              horizontal
              nestedScrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              onMomentumScrollEnd={onScrollEnd}
              getItemLayout={getItemLayout}
              renderItem={({item, index}) => (
                <Pressable
                  // onPress={() => navigation.navigate(routes.PROJECT_DETAIL)}
                  style={{
                    height: '90%',
                    width: responsiveScreenWidth(95),
                    paddingHorizontal: responsiveScreenWidth(1.5),
                    paddingVertical: responsiveScreenHeight(2),
                    backgroundColor: 'white',
                    gap: responsiveScreenHeight(2),
                    borderRadius: 25,
                    margin: 10,
                    elevation: 3,
                  }}>
                  {/* ---------------top view-------------- */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginHorizontal: responsiveScreenWidth(2),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          height: responsiveScreenHeight(3),
                          width: responsiveScreenHeight(3),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 5,
                          backgroundColor: color.primaryLow,
                          marginRight: responsiveScreenWidth(1),
                        }}>
                        <Image
                          source={require('../../assests/icons/electric.png')}
                          style={{
                            tintColor: color.primary,
                            aspectRatio: 1,
                            height: '75%',
                            resizeMode: 'contain',
                          }}
                        />
                      </View>

                      <Text
                        style={{
                          color: color.black87,
                          fontFamily: font.NunitoSemiBold,
                          fontSize: responsiveScreenFontSize(2.1),
                          fontWeight: '400',
                          marginBottom: responsiveScreenHeight(0.2),
                        }}>
                        Electrician
                      </Text>

                      <View
                        style={{
                          height: responsiveScreenHeight(2.6),
                          width: responsiveScreenHeight(2.6),
                          backgroundColor: color.primary,
                          borderRadius: responsiveScreenHeight(2),
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft: responsiveScreenWidth(1),
                        }}>
                        <Text
                          style={{
                            color: color.white,
                            fontSize: responsiveScreenFontSize(1.6),
                            fontFamily: font.NunitoSemiBold,
                          }}>
                          6
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: responsiveScreenWidth(2),
                      }}>
                      <View
                        style={{
                          // height:responsiveScreenHeight(10),
                          // width:responsiveScreenWidth(6),
                          backgroundColor: color.primaryLow,
                          alignItems: 'center',
                          paddingHorizontal: responsiveScreenWidth(3),
                          paddingVertical: responsiveScreenHeight(0.5),
                          borderRadius: 10,
                        }}>
                        <Text
                          style={{
                            fontFamily: font.NunitoMedium,
                            color: color.black87,
                            fontSize: responsiveScreenFontSize(1.4),
                          }}>
                          2
                        </Text>
                        <Text
                          style={{
                            fontFamily: font.NunitoMedium,
                            color: color.primary,
                            fontSize: responsiveScreenFontSize(1.4),
                          }}>
                          Skilled
                        </Text>
                      </View>

                      <View
                        style={{
                          backgroundColor: color.secondaryLow,
                          alignItems: 'center',
                          paddingHorizontal: responsiveScreenWidth(3),
                          paddingVertical: responsiveScreenHeight(0.5),
                          borderRadius: 10,
                        }}>
                        <Text
                          style={{
                            fontFamily: font.NunitoMedium,
                            color: color.black87,
                            fontSize: responsiveScreenFontSize(1.4),
                          }}>
                          2
                        </Text>
                        <Text
                          style={{
                            fontFamily: font.NunitoMedium,
                            color: color.secondary,
                            fontSize: responsiveScreenFontSize(1.4),
                          }}>
                          Unskilled
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* --------------Bottom labours view--------------- */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingVertical: responsiveScreenHeight(1),
                      paddingHorizontal: responsiveScreenWidth(2),
                      flex: 1,
                      gap: responsiveScreenWidth(1.5),
                    }}>
                    {/* ---------Skilled--------- */}
                    {/* <View
                      style={{
                        alignItems: 'center',
                        backgroundColor: 'red',
                        height: responsiveScreenHeight(12.5), // Allows scroll within fixed height
                      }}>
                      <ScrollView
                        contentContainerStyle={{
                          paddingBottom: responsiveScreenHeight(1),
                          gap: responsiveScreenHeight(0.5),
                        }}
                        // nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled" // Ensures smooth touch handling
                        style={{
                          height:'100%', // Allows scroll within fixed height
                          flexShrink: 1, // Ensures ScrollView does not take unnecessary space
                        }}
                      >
                        <Shadow
                          distance={3}
                          startColor={color.gray2}
                          offset={[0, 0]}>
                          <View
                            style={{
                              borderRadius: 10,
                              flexDirection: 'row',
                              alignItems: 'center',
                              // backgroundColor: color.primaryLow,
                              width: responsiveScreenWidth(42),
                              paddingHorizontal: responsiveScreenWidth(1),
                              paddingVertical: responsiveScreenHeight(0.5),
                              backgroundColor: color.white,
                            }}>
                            <View
                              style={{
                                height: responsiveScreenHeight(2.5),
                                width: responsiveScreenHeight(2.5),
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: responsiveScreenWidth(1.5),
                                backgroundColor: color.primaryLow,
                                borderRadius: 20,
                              }}>
                              <Image
                                source={require('../../assests/icons/user.png')}
                                style={{
                                  tintColor: color.primary,
                                  aspectRatio: 1,
                                  height: '70%',
                                  resizeMode: 'contain',
                                }}
                              />
                            </View>
                            <Text
                              style={{
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.8),
                                fontFamily: font.NunitoMedium,
                              }}>
                              Ankit Kamboj
                            </Text>
                          </View>
                        </Shadow>

                        <Shadow
                          distance={3}
                          startColor={color.gray2}
                          offset={[0, 0]}>
                          <View
                            style={{
                              borderRadius: 10,
                              flexDirection: 'row',
                              alignItems: 'center',
                              // backgroundColor: color.primaryLow,
                              width: responsiveScreenWidth(42),
                              paddingHorizontal: responsiveScreenWidth(1),
                              paddingVertical: responsiveScreenHeight(0.5),
                              backgroundColor: color.white,
                            }}>
                            <View
                              style={{
                                height: responsiveScreenHeight(2.5),
                                width: responsiveScreenHeight(2.5),
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: responsiveScreenWidth(1.5),
                                backgroundColor: color.primaryLow,
                                borderRadius: 20,
                              }}>
                              <Image
                                source={require('../../assests/icons/user.png')}
                                style={{
                                  tintColor: color.primary,
                                  aspectRatio: 1,
                                  height: '70%',
                                  resizeMode: 'contain',
                                }}
                              />
                            </View>
                            <Text
                              style={{
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.8),
                                fontFamily: font.NunitoMedium,
                              }}>
                              Pankaj Sharma
                            </Text>
                          </View>
                        </Shadow>

                        <Shadow
                          distance={3}
                          startColor={color.gray2}
                          offset={[0, 0]}>
                          <View
                            style={{
                              borderRadius: 10,
                              flexDirection: 'row',
                              alignItems: 'center',
                              // backgroundColor: color.primaryLow,
                              width: responsiveScreenWidth(42),
                              paddingHorizontal: responsiveScreenWidth(1),
                              paddingVertical: responsiveScreenHeight(0.5),
                              backgroundColor: color.white,
                            }}>
                            <View
                              style={{
                                height: responsiveScreenHeight(2.5),
                                width: responsiveScreenHeight(2.5),
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: responsiveScreenWidth(1.5),
                                backgroundColor: color.primaryLow,
                                borderRadius: 20,
                              }}>
                              <Image
                                source={require('../../assests/icons/user.png')}
                                style={{
                                  tintColor: color.primary,
                                  aspectRatio: 1,
                                  height: '70%',
                                  resizeMode: 'contain',
                                }}
                              />
                            </View>
                            <Text
                              style={{
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.8),
                                fontFamily: font.NunitoMedium,
                              }}>
                              Ratan verma
                            </Text>
                          </View>
                        </Shadow>
                        <Shadow
                          distance={3}
                          startColor={color.gray2}
                          offset={[0, 0]}>
                          <View
                            style={{
                              borderRadius: 10,
                              flexDirection: 'row',
                              alignItems: 'center',
                              // backgroundColor: color.primaryLow,
                              width: responsiveScreenWidth(42),
                              paddingHorizontal: responsiveScreenWidth(1),
                              paddingVertical: responsiveScreenHeight(0.5),
                              backgroundColor: color.white,
                            }}>
                            <View
                              style={{
                                height: responsiveScreenHeight(2.5),
                                width: responsiveScreenHeight(2.5),
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: responsiveScreenWidth(1.5),
                                backgroundColor: color.primaryLow,
                                borderRadius: 20,
                              }}>
                              <Image
                                source={require('../../assests/icons/user.png')}
                                style={{
                                  tintColor: color.primary,
                                  aspectRatio: 1,
                                  height: '70%',
                                  resizeMode: 'contain',
                                }}
                              />
                            </View>
                            <Text
                              style={{
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.8),
                                fontFamily: font.NunitoMedium,
                              }}>
                              Ratan verma
                            </Text>
                          </View>
                        </Shadow>
                        <Shadow
                          distance={3}
                          startColor={color.gray2}
                          offset={[0, 0]}>
                          <View
                            style={{
                              borderRadius: 10,
                              flexDirection: 'row',
                              alignItems: 'center',
                              // backgroundColor: color.primaryLow,
                              width: responsiveScreenWidth(42),
                              paddingHorizontal: responsiveScreenWidth(1),
                              paddingVertical: responsiveScreenHeight(0.5),
                              backgroundColor: color.white,
                            }}>
                            <View
                              style={{
                                height: responsiveScreenHeight(2.5),
                                width: responsiveScreenHeight(2.5),
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: responsiveScreenWidth(1.5),
                                backgroundColor: color.primaryLow,
                                borderRadius: 20,
                              }}>
                              <Image
                                source={require('../../assests/icons/user.png')}
                                style={{
                                  tintColor: color.primary,
                                  aspectRatio: 1,
                                  height: '70%',
                                  resizeMode: 'contain',
                                }}
                              />
                            </View>
                            <Text
                              style={{
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.8),
                                fontFamily: font.NunitoMedium,
                              }}>
                              Ratan verma
                            </Text>
                          </View>
                        </Shadow>
                        <Shadow
                          distance={3}
                          startColor={color.gray2}
                          offset={[0, 0]}>
                          <View
                            style={{
                              borderRadius: 10,
                              flexDirection: 'row',
                              alignItems: 'center',
                              // backgroundColor: color.primaryLow,
                              width: responsiveScreenWidth(42),
                              paddingHorizontal: responsiveScreenWidth(1),
                              paddingVertical: responsiveScreenHeight(0.5),
                              backgroundColor: color.white,
                            }}>
                            <View
                              style={{
                                height: responsiveScreenHeight(2.5),
                                width: responsiveScreenHeight(2.5),
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: responsiveScreenWidth(1.5),
                                backgroundColor: color.primaryLow,
                                borderRadius: 20,
                              }}>
                              <Image
                                source={require('../../assests/icons/user.png')}
                                style={{
                                  tintColor: color.primary,
                                  aspectRatio: 1,
                                  height: '70%',
                                  resizeMode: 'contain',
                                }}
                              />
                            </View>
                            <Text
                              style={{
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.8),
                                fontFamily: font.NunitoMedium,
                              }}>
                              Ratan verma
                            </Text>
                          </View>
                        </Shadow>
                      </ScrollView>
                    </View> */}
                    <View
                      style={{
                        alignItems: 'center',
                        height: responsiveScreenHeight(14.5),
                        width: '49%',
                      }}>
                      <FlatList
                        data={users}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true} // Ensures smooth scrolling
                        contentContainerStyle={{
                          alignItems: 'center',
                          paddingTop: responsiveScreenHeight(0.5),
                        }}
                        style={{
                          width: '100%',
                        }}
                        renderItem={({item}) => (
                          <Pressable
                            onPress={() => {
                              triggerHaptic('impactMedium');
                              setAddLabourModal(true);
                            }}
                            style={{
                              marginBottom: responsiveScreenHeight(1.5),
                            }}>
                            <Shadow
                              distance={3}
                              startColor={color.gray2}
                              offset={[0, 0]}>
                              <View
                                style={{
                                  borderRadius: 10,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  // backgroundColor: color.primaryLow,
                                  width: responsiveScreenWidth(42),
                                  paddingHorizontal: responsiveScreenWidth(1),
                                  paddingVertical: responsiveScreenHeight(0.5),
                                  backgroundColor: color.white,
                                }}>
                                <View
                                  style={{
                                    height: responsiveScreenHeight(2.5),
                                    width: responsiveScreenHeight(2.5),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: responsiveScreenWidth(1.5),
                                    backgroundColor: color.primaryLow,
                                    borderRadius: 20,
                                  }}>
                                  <Image
                                    source={require('../../assests/icons/user.png')}
                                    style={{
                                      tintColor: color.primary,
                                      aspectRatio: 1,
                                      height: '70%',
                                      resizeMode: 'contain',
                                    }}
                                  />
                                </View>
                                <Text
                                  style={{
                                    color: color.black87,
                                    fontSize: responsiveScreenFontSize(1.8),
                                    fontFamily: font.NunitoMedium,
                                  }}>
                                  {item.name}
                                </Text>
                              </View>
                            </Shadow>
                          </Pressable>
                        )}
                      />
                    </View>

                    {/* ---------Unskilled--------- */}
                    <View
                      style={{
                        alignItems: 'center',
                        height: responsiveScreenHeight(14.5),
                        width: '49%',
                      }}>
                      <FlatList
                        data={users}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true} // Ensures smooth scrolling
                        contentContainerStyle={{
                          alignItems: 'center',
                          paddingTop: responsiveScreenHeight(0.5),
                        }}
                        style={{
                          width: '100%',
                        }}
                        renderItem={({item}) => (
                          <View
                            style={{
                              marginBottom: responsiveScreenHeight(1.5),
                            }}>
                            <Shadow
                              distance={3}
                              startColor={color.gray2}
                              offset={[0, 0]}>
                              <View
                                style={{
                                  borderRadius: 10,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  // backgroundColor: color.primaryLow,
                                  width: responsiveScreenWidth(42),
                                  paddingHorizontal: responsiveScreenWidth(1),
                                  paddingVertical: responsiveScreenHeight(0.5),
                                  backgroundColor: color.white,
                                }}>
                                <View
                                  style={{
                                    height: responsiveScreenHeight(2.5),
                                    width: responsiveScreenHeight(2.5),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: responsiveScreenWidth(1.5),
                                    backgroundColor: color.secondaryLow,
                                    borderRadius: 20,
                                  }}>
                                  <Image
                                    source={require('../../assests/icons/user.png')}
                                    style={{
                                      tintColor: color.secondary,
                                      aspectRatio: 1,
                                      height: '70%',
                                      resizeMode: 'contain',
                                    }}
                                  />
                                </View>
                                <Text
                                  style={{
                                    color: color.black87,
                                    fontSize: responsiveScreenFontSize(1.8),
                                    fontFamily: font.NunitoMedium,
                                  }}>
                                  {item.name}
                                </Text>
                              </View>
                            </Shadow>
                          </View>
                        )}
                      />
                    </View>
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
            gap: responsiveScreenWidth(2.3),
            margin: 'auto',
            position: 'relative',
            marginTop: responsiveScreenHeight(2),
            zIndex: 5,
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

        {/* ==========================================Assigned Tasks=========================================== */}

        <View
          style={{
            position: 'relative',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: responsiveScreenHeight(1.5),
            width: responsiveScreenWidth(95),
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: color.black87,
              fontSize: responsiveScreenFontSize(2),
              fontFamily: font.NunitoMedium,
            }}>
            Assigned Tasks
          </Text>

          <Shadow distance={4} startColor={color.gray2} offset={[0, 0]}>
            <Pressable
              onPress={() => {
                setIsDropdownOpen(prev => !prev);
                triggerHaptic('impactMedium');
              }}
              style={{
                backgroundColor: color.white,
                paddingHorizontal: responsiveScreenWidth(3),
                paddingVertical: responsiveScreenWidth(1.5),
                borderRadius: 30,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: color.primary,
                  fontSize: responsiveScreenFontSize(1.5),
                  fontFamily: font.NunitoSemiBold,
                  marginRight: responsiveScreenWidth(1),
                }}>
                {selectedOption}
              </Text>
              <View
                style={{
                  height: responsiveScreenHeight(2.1),
                  width: responsiveScreenHeight(2.1),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {isDropdownOpen ? (
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
              </View>
            </Pressable>
          </Shadow>

          {isDropdownOpen && (
            <View
              style={{
                position: 'absolute',
                top: responsiveScreenHeight(4.2),
                right: 0,
                zIndex: 9,
              }}>
              <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
                <View
                  style={{
                    backgroundColor: color.white,
                    borderRadius: 10,
                    maxHeight: responsiveScreenHeight(11),
                    overflow: 'hidden',
                  }}>
                  <FlatList
                    data={options}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                      <Pressable
                        onPress={() => {
                          setSelectedOption(item);
                          setIsDropdownOpen(false);
                        }}
                        style={{
                          paddingVertical: responsiveScreenHeight(0.8),
                          paddingHorizontal: responsiveScreenWidth(5.5),
                        }}>
                        <Text
                          style={{
                            fontFamily: font.NunitoSemiBold,
                            fontSize: responsiveScreenFontSize(1.5),
                            color:
                              selectedOption === item
                                ? color.primary
                                : color.black60,
                          }}>
                          {item}
                        </Text>
                      </Pressable>
                    )}
                  />
                </View>
              </Shadow>
            </View>
          )}
        </View>

        {/* ==========================================Tasks navigation buttons=========================================== */}

        <View
          style={{
            marginBottom: responsiveScreenHeight(0.5),
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
                  backgroundColor: color.white,
                  paddingHorizontal: responsiveScreenWidth(1.5),
                  paddingVertical: responsiveScreenWidth(1.5),
                  borderRadius: 30,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor:
                    selectedTab === button ? color.primary : color.white,
                }}
                onPress={() => setSelectedTab(button)}>
                <Text
                  style={{
                    color:
                      selectedTab === button ? color.primary : color.black60,
                    fontSize: responsiveScreenFontSize(1.5),
                    fontFamily: font.NunitoSemiBold,
                  }}>
                  {button}
                </Text>
                <View
                  style={{
                    height: responsiveScreenHeight(2.2),
                    width: responsiveScreenHeight(2.2),
                    backgroundColor:
                      selectedTab === button ? color.primary : color.gray,
                    borderRadius: responsiveScreenHeight(2),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: responsiveScreenWidth(1),
                  }}>
                  <Text
                    style={{
                      color:
                        selectedTab === button ? color.white : color.black60,
                      fontSize: responsiveScreenFontSize(1.2),
                      fontFamily: font.NunitoSemiBold,
                    }}>
                    5
                  </Text>
                </View>
              </Pressable>
            </Shadow>
          ))}
        </View>
        {renderTabContent()}
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

      {(isDropdownOpen && (
        <Pressable
          onPress={() => {
            setIsDropdownOpen(false);
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

      {(addLabourModal && (
        <Pressable
          onPress={() => {
            setAddLabourModal(false);
            console.log('taps');
          }}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            backgroundColor: color.black28,
            // zIndex: 3,
            justifyContent: 'flex-end',
            paddingHorizontal: responsiveScreenWidth(4),
            paddingBottom: responsiveScreenHeight(2),
            zIndex: 4,
          }}>
          <View
            style={{
              maxHeight: responsiveScreenHeight(51),
              backgroundColor: color.gray2,
              borderRadius: 25,
              overflow: 'hidden',
              marginBottom: responsiveScreenHeight(1),
            }}>
            <View
              style={{
                height: '97%',
                width: responsiveScreenWidth(93),
                // alignSelf: 'center',
                paddingHorizontal: responsiveScreenWidth(4),
                paddingVertical: responsiveScreenHeight(2),
              }}>
              {/* ------------------------- Heading and searchbar------------------------ */}
              <Text
                style={{
                  fontFamily: font.NunitoMedium,
                  color: color.primary,
                  fontSize: responsiveScreenFontSize(2.1),
                  marginBottom: responsiveScreenHeight(1),
                }}>
                Assign Tower
              </Text>
              <View
                style={{
                  marginBottom: responsiveScreenHeight(1.5),
                }}>
                <SearchBar
                  placeholder={'Search Employee'}
                  onChangeText={(e: string) => {
                    setSearchValue(e);
                  }}
                  value={searchValue}
                />
              </View>

              {/* --------------------------- Labour scroll view-------------------------- */}
              <View
                style={{
                  height: '71%',
                }}>
                <ScrollView
                  contentContainerStyle={{
                    paddingBottom: responsiveScreenHeight(2),
                  }}
                  showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      gap: responsiveScreenHeight(1.5),
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{}}>
                        <Text
                          style={{
                            fontFamily: font.NunitoMedium,
                            fontSize: responsiveScreenFontSize(1.8),
                            color: color.black87,
                          }}>
                          Esther Howard
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: responsiveScreenFontSize(1.5),
                              color: color.black60,
                              fontFamily: font.NunitoRegular,
                            }}>
                            133412
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
                              color: color.black60,
                              fontFamily: font.NunitoRegular,
                            }}>
                            Site Engineer
                          </Text>
                        </View>
                      </View>

                      <Pressable
                        style={{
                          height: responsiveScreenHeight(3),
                          width: responsiveScreenHeight(3),
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
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{}}>
                        <Text
                          style={{
                            fontFamily: font.NunitoMedium,
                            fontSize: responsiveScreenFontSize(1.8),
                            color: color.black87,
                          }}>
                          Esther Howard
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: responsiveScreenFontSize(1.5),
                              color: color.black60,
                              fontFamily: font.NunitoRegular,
                            }}>
                            133412
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
                              color: color.black60,
                              fontFamily: font.NunitoRegular,
                            }}>
                            Site Engineer
                          </Text>
                        </View>
                      </View>

                      <Pressable
                        style={{
                          height: responsiveScreenHeight(3),
                          width: responsiveScreenHeight(3),
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
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{}}>
                        <Text
                          style={{
                            fontFamily: font.NunitoMedium,
                            fontSize: responsiveScreenFontSize(1.8),
                            color: color.black87,
                          }}>
                          Esther Howard
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: responsiveScreenFontSize(1.5),
                              color: color.black60,
                              fontFamily: font.NunitoRegular,
                            }}>
                            133412
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
                              color: color.black60,
                              fontFamily: font.NunitoRegular,
                            }}>
                            Site Engineer
                          </Text>
                        </View>
                      </View>

                      <Pressable
                        style={{
                          height: responsiveScreenHeight(3),
                          width: responsiveScreenHeight(3),
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
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{}}>
                        <Text
                          style={{
                            fontFamily: font.NunitoMedium,
                            fontSize: responsiveScreenFontSize(1.8),
                            color: color.black87,
                          }}>
                          Esther Howard
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: responsiveScreenFontSize(1.5),
                              color: color.black60,
                              fontFamily: font.NunitoRegular,
                            }}>
                            133412
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
                              color: color.black60,
                              fontFamily: font.NunitoRegular,
                            }}>
                            Site Engineer
                          </Text>
                        </View>
                      </View>

                      <Pressable
                        style={{
                          height: responsiveScreenHeight(3),
                          width: responsiveScreenHeight(3),
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
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{}}>
                        <Text
                          style={{
                            fontFamily: font.NunitoMedium,
                            fontSize: responsiveScreenFontSize(1.8),
                            color: color.black87,
                          }}>
                          Esther Howard
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: responsiveScreenFontSize(1.5),
                              color: color.black60,
                              fontFamily: font.NunitoRegular,
                            }}>
                            133412
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
                              color: color.black60,
                              fontFamily: font.NunitoRegular,
                            }}>
                            Site Engineer
                          </Text>
                        </View>
                      </View>

                      <Pressable
                        style={{
                          height: responsiveScreenHeight(3),
                          width: responsiveScreenHeight(3),
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
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{}}>
                        <Text
                          style={{
                            fontFamily: font.NunitoMedium,
                            fontSize: responsiveScreenFontSize(1.8),
                            color: color.black87,
                          }}>
                          Esther Howard
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: responsiveScreenFontSize(1.5),
                              color: color.black60,
                              fontFamily: font.NunitoRegular,
                            }}>
                            133412
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
                              color: color.black60,
                              fontFamily: font.NunitoRegular,
                            }}>
                            Site Engineer
                          </Text>
                        </View>
                      </View>

                      <Pressable
                        style={{
                          height: responsiveScreenHeight(3),
                          width: responsiveScreenHeight(3),
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
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{}}>
                        <Text
                          style={{
                            fontFamily: font.NunitoMedium,
                            fontSize: responsiveScreenFontSize(1.8),
                            color: color.black87,
                          }}>
                          Esther Howard
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: responsiveScreenFontSize(1.5),
                              color: color.black60,
                              fontFamily: font.NunitoRegular,
                            }}>
                            133412
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
                              color: color.black60,
                              fontFamily: font.NunitoRegular,
                            }}>
                            Site Engineer
                          </Text>
                        </View>
                      </View>

                      <Pressable
                        style={{
                          height: responsiveScreenHeight(3),
                          width: responsiveScreenHeight(3),
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
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{}}>
                        <Text
                          style={{
                            fontFamily: font.NunitoMedium,
                            fontSize: responsiveScreenFontSize(1.8),
                            color: color.black87,
                          }}>
                          Esther Howard
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: responsiveScreenFontSize(1.5),
                              color: color.black60,
                              fontFamily: font.NunitoRegular,
                            }}>
                            133412
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
                              color: color.black60,
                              fontFamily: font.NunitoRegular,
                            }}>
                            Site Engineer
                          </Text>
                        </View>
                      </View>

                      <Pressable
                        style={{
                          height: responsiveScreenHeight(3),
                          width: responsiveScreenHeight(3),
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
                    </View>
                  </View>
                </ScrollView>
              </View>

              {/* -------------------------------- Bottom buttons------------------------- */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                  gap: responsiveScreenWidth(5),
                  marginVertical: responsiveScreenHeight(1),
                }}>
                <Shadow distance={5} startColor={color.black15} offset={[0, 0]}>
                  <Pressable
                    style={{
                      width: responsiveScreenWidth(35),
                      height: responsiveScreenHeight(4),
                      backgroundColor: color.white,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 50,
                    }}>
                    <Text
                      style={{
                        fontFamily: font.NunitoMedium,
                        fontSize: responsiveScreenFontSize(1.7),
                        color: color.red,
                      }}>
                      Cancel
                    </Text>
                  </Pressable>
                </Shadow>
                <Shadow distance={5} startColor={color.black15} offset={[0, 0]}>
                  <Pressable
                    style={{
                      width: responsiveScreenWidth(35),
                      height: responsiveScreenHeight(4),
                      backgroundColor: color.primary,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 50,
                    }}>
                    <Text
                      style={{
                        fontFamily: font.NunitoMedium,
                        fontSize: responsiveScreenFontSize(1.7),
                        color: color.white,
                      }}>
                      Assign
                    </Text>
                  </Pressable>
                </Shadow>
              </View>
            </View>
          </View>
        </Pressable>
      )) ||
        ''}

      <View
        style={{
          position: 'absolute',
          bottom: responsiveScreenHeight(2),
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
                    navigation.navigate(routes.MYBAG);
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
                      source={require(`../../assests/icons/bag.png`)}
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
                    Bag
                  </Text>
                </Pressable>
              </Shadow>

              <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
                <Pressable
                  onPress={() => {
                    navigation.navigate(routes.MANPOWER_REQUEST);
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
                    Manpower Request
                  </Text>
                </Pressable>
              </Shadow>

              <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
                <Pressable
                  onPress={() => {
                    // navigation.navigate(routes.MYBAG);
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
                    Schedule Meeting
                  </Text>
                </Pressable>
              </Shadow>

              <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
                <Pressable
                  onPress={() => {
                    // navigation.navigate(routes.MYBAG);
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
                      source={require(`../../assests/icons/phonebook.png`)}
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
                    Contact Book
                  </Text>
                </Pressable>
              </Shadow>

              <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
                <Pressable
                  onPress={() => {
                    // navigation.navigate(routes.MYBAG);
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
        <Pressable>
          <CustomGradient
            style={{
              width: responsiveScreenWidth(12),
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
          </CustomGradient>
        </Pressable>
      </View>
    </>
  );
}
export default SEHomePage;
