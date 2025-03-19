/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */

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
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  BottomModal,
  Header,
  LinearGradient as CustomLinearGradient,
} from '../../component';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {color, font, routes} from '../../config/Env';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';

// import {SvgXml} from 'react-native-svg';
// import {loginArrow, logoSvg} from '../../svg';
// import NewDrag from '../../component/NewDrag';
import {Shadow} from 'react-native-shadow-2';
import useHapticFeedback from '../../hooks/useHapticFeedback';

const PMSubtaskReview = () => {
  const {triggerHaptic} = useHapticFeedback();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [clickedDrop, setClickedDrop] = useState(true);
  const [onCheck, setOnCheck] = useState(false);
  //   const [slide, setSlide] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [referenceModal, setReferenceModal] = useState(false);
  const [toolsReqModal, setToolsReqModal] = useState(false);

  const [comment, setComment] = useState('');
  const [index, setIndex] = useState(0);

  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: clickedDrop ? 0 : responsiveScreenHeight(10),
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [clickedDrop]);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      uri: require('../../assests/reference1.png'),
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      uri: require('../../assests/reference2.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      uri: require('../../assests/reference3.png'),
    },
  ];
  //   const imageWidth = responsiveScreenWidth(100);
  //   const imageHeight = (imageWidth * 16) / 9;

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

  const [isLeft, setIsLeft] = useState(true);
  const animatedLeft = useRef(new Animated.Value(0)).current;
  const handleToggle = (direction: boolean) => {
    if (isLeft !== direction) {
      Animated.timing(animatedLeft, {
        toValue: isLeft ? responsiveScreenWidth(47) : 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsLeft(!isLeft));
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title={'PMSubtask'} />

      {/* -------------------------------------------------Modals------------------------------------------------------ */}

      {/* -----------------------Comments modal-------------------------- */}
      <BottomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: responsiveScreenWidth(3),
            paddingVertical: responsiveScreenHeight(2),
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: font.NunitoSemiBold,
              color: color.primary,
              fontSize: responsiveScreenFontSize(2),
              marginBottom: responsiveScreenHeight(3),
            }}>
            Comments
          </Text>

          <View
            style={{
              minHeight: responsiveScreenHeight(8),
              flexDirection: 'row',
              gap: responsiveScreenWidth(3),
              marginBottom: responsiveScreenHeight(2),
            }}>
            {/* ---------------- Left Icon ---------------- */}

            <Shadow distance={4} startColor={color.black15} offset={[0, 0]}>
              <Pressable
                onPress={() => setOnCheck(prev => !prev)}
                style={{
                  height: responsiveScreenHeight(3.4),
                  width: responsiveScreenHeight(3.4),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  overflow: 'hidden',
                }}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww',
                  }}
                  style={{
                    aspectRatio: 1,
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Pressable>
            </Shadow>

            {/* ---------------- Right Section ---------------- */}
            <View
              style={{
                flex: 1,
              }}>
              {/* Text Section */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  gap: responsiveScreenWidth(1.5),
                }}>
                <Text
                  style={{
                    fontFamily: font.NunitoSemiBold,
                    fontSize: responsiveScreenFontSize(1.6),
                    color: color.black87,
                  }}>
                  Ramesh kumar
                </Text>
                <Text
                  style={{
                    fontFamily: font.NunitoSemiBold,
                    fontSize: responsiveScreenFontSize(1.4),
                    color: color.black28,
                  }}>
                  2h
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: font.NunitoSemiBold,
                  fontSize: responsiveScreenFontSize(1.5),
                  color: color.black28,
                  marginBottom: responsiveScreenHeight(0.4),
                }}>
                Project Manager
              </Text>
              <Text
                style={{
                  fontFamily: font.NunitoRegular,
                  fontSize: responsiveScreenFontSize(1.5),
                  color: color.black87,
                  marginBottom: responsiveScreenHeight(0.5),
                }}>
                Lorem ipsum dolor sit amet, consectetur adipis elit, sed do
                eiusmod Lorem ipsum dolor sit.
              </Text>

              <Pressable>
                <Text
                  style={{
                    fontFamily: font.NunitoSemiBold,
                    fontSize: responsiveScreenFontSize(1.5),
                    color: color.primary,
                  }}>
                  Reply
                </Text>
              </Pressable>
            </View>
          </View>

          {/* 2--------------------------------- */}
          <View
            style={{
              minHeight: responsiveScreenHeight(8),
              flexDirection: 'row',
              gap: responsiveScreenWidth(3),
            }}>
            {/* ---------------- Left Icon ---------------- */}

            <Shadow distance={4} startColor={color.black15} offset={[0, 0]}>
              <Pressable
                onPress={() => setOnCheck(prev => !prev)}
                style={{
                  height: responsiveScreenHeight(3.4),
                  width: responsiveScreenHeight(3.4),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  overflow: 'hidden',
                }}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww',
                  }}
                  style={{
                    aspectRatio: 1,
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Pressable>
            </Shadow>

            {/* ---------------- Right Section ---------------- */}
            <View
              style={{
                flex: 1,
              }}>
              {/* Text Section */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  gap: responsiveScreenWidth(1.5),
                }}>
                <Text
                  style={{
                    fontFamily: font.NunitoSemiBold,
                    fontSize: responsiveScreenFontSize(1.6),
                    color: color.black87,
                  }}>
                  Ramesh kumar
                </Text>
                <Text
                  style={{
                    fontFamily: font.NunitoSemiBold,
                    fontSize: responsiveScreenFontSize(1.4),
                    color: color.black28,
                  }}>
                  2h
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: font.NunitoSemiBold,
                  fontSize: responsiveScreenFontSize(1.5),
                  color: color.black28,
                  marginBottom: responsiveScreenHeight(0.4),
                }}>
                Project Manager
              </Text>
              <Text
                style={{
                  fontFamily: font.NunitoRegular,
                  fontSize: responsiveScreenFontSize(1.5),
                  color: color.black87,
                  marginBottom: responsiveScreenHeight(0.5),
                }}>
                Lorem ipsum dolor sit amet, consectetur adipis elit, sed do
                eiusmod Lorem ipsum dolor sit.
              </Text>

              <Pressable>
                <Text
                  style={{
                    fontFamily: font.NunitoSemiBold,
                    fontSize: responsiveScreenFontSize(1.5),
                    color: color.primary,
                  }}>
                  Reply
                </Text>
              </Pressable>
            </View>
          </View>

          {/* -----------------------------------------------reply chat----------------------------------------- */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: responsiveScreenHeight(3),
              gap: responsiveScreenWidth(2),
            }}>
            <TextInput
              style={{
                flex: 1,
                fontFamily: font.NunitoSemiBold,
                fontSize: responsiveScreenFontSize(1.6),
                color: '#333',
                paddingVertical: responsiveScreenHeight(1.9),
                paddingHorizontal: responsiveScreenWidth(4),
                borderWidth: 1,
                borderRadius: 50,
                borderColor: color.black15,
              }}
              placeholder="Write Comment"
              placeholderTextColor={color.black28}
              value={comment}
              onChangeText={setComment}
            />
            <Pressable
              style={{
                height: responsiveScreenHeight(5.5),
                width: responsiveScreenHeight(5.5),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: color.primary,
              }}>
              <Image
                source={require('../../assests/icons/send2.png')}
                style={{
                  tintColor: color.white,
                  aspectRatio: 1,
                  height: '45%',
                  resizeMode: 'contain',
                }}
              />
            </Pressable>
          </View>
        </View>
      </BottomModal>

      {/* -----------------------Reference modal-------------------------- */}
      <BottomModal
        visible={referenceModal}
        onClose={() => setReferenceModal(false)}>
        <View
          style={{
            height: responsiveScreenHeight(78), // Ensure the modal has enough space
          }}>
          <FlatList
            data={DATA}
            horizontal
            pagingEnabled
            onMomentumScrollEnd={onScrollEnd}
            getItemLayout={getItemLayout}
            showsHorizontalScrollIndicator
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={{flex: 1}}>
                <View
                  style={{
                    height: responsiveScreenHeight(80),
                    width: responsiveScreenWidth(100),
                  }}>
                  <Image
                    source={item.uri}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    resizeMode="cover"
                  />
                </View>
              </View>
            )}
          />

          {/* Absolute Gradient Overlay */}
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
                  <Stop offset="0" stopColor="black" stopOpacity="0.3" />
                  <Stop offset="0.7" stopColor="black" stopOpacity="0.1" />
                  <Stop offset="0.90" stopColor="white" stopOpacity="0.95" />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="100%" fill="url(#grad)" />
            </Svg>

            {/* Content Overlay */}
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                paddingHorizontal: responsiveScreenWidth(4.5),
                paddingVertical: responsiveScreenHeight(2.5),
                justifyContent: 'space-between',
              }}>
              {/* Top Row: Title and Camera Icon */}
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  style={{
                    height: responsiveScreenHeight(3),
                    width: responsiveScreenWidth(32),
                    backgroundColor: '#FFFFFFB2',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    opacity: 0.9,
                  }}>
                  <Text
                    style={{
                      fontFamily: font.NunitoMedium,
                      color: color.black60,
                      fontSize: responsiveScreenFontSize(1.6),
                    }}>
                    Reference Images
                  </Text>
                </View>
              </View>

              {/* Bottom Section: Description */}
              <View
                style={{
                  marginBottom: responsiveScreenHeight(3),
                  gap: responsiveScreenHeight(1),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: responsiveScreenWidth(1.5),
                    margin: 'auto',
                    position: 'relative',
                    top: responsiveScreenHeight(-2),
                    padding: 5,
                    backgroundColor: '#F0F6F647',
                    borderRadius: 30,
                  }}>
                  {DATA.map((elem, cIndex) => (
                    <TouchableOpacity
                      key={elem.id}
                      onPress={() => setIndex(cIndex)}
                      style={{
                        width: responsiveScreenWidth(2),
                        aspectRatio: 1,
                        backgroundColor:
                          cIndex === index ? color.primary : color.white60,
                        borderRadius: 100,
                      }}
                    />
                  ))}
                </View>
                <Text
                  style={{
                    fontFamily: font.NunitoMedium,
                    color: color.primary,
                    fontSize: responsiveScreenFontSize(1.7),
                  }}>
                  Description
                </Text>
                <Text
                  style={{
                    fontFamily: font.NunitoMedium,
                    color: color.black87,
                    fontSize: responsiveScreenFontSize(1.6),
                  }}>
                  Lorem ipsum dolor sit amet, consectetur adipis elit, sed do
                  eiusmod Lorem ipsum dolor sit amet.
                </Text>
              </View>
            </View>
          </View>

          {/* ------------------Absolute Camera Button-------------------- */}
          <View
            style={{
              pointerEvents: 'auto',
              position: 'absolute',
              right: responsiveScreenWidth(4.5),
              top: responsiveScreenHeight(2.5),
            }}>
            <Pressable
              onPress={() => {
                navigation.navigate(routes.CAMERA);
                setReferenceModal(false);
              }}
              style={{
                height: responsiveScreenHeight(3.5),
                width: responsiveScreenHeight(3.5),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: 'white',
                opacity: 0.8,
              }}>
              <Image
                source={require('../../assests/icons/camera-bold.png')}
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
      </BottomModal>

      {/* -----------------------Tool req modal-------------------------- */}
      <BottomModal
        visible={toolsReqModal}
        onClose={() => setToolsReqModal(false)}>
        <View
          style={{
            maxHeight: responsiveScreenHeight(78),
          }}>
          <View
            style={{
              height: responsiveScreenHeight(80),
              width: responsiveScreenWidth(110),
            }}>
            <Image
              source={require('../../assests/target-progress.png')}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              alignSelf: 'center',
              paddingHorizontal: responsiveScreenWidth(3),
              paddingTop: responsiveScreenHeight(2),
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: font.NunitoSemiBold,
                color: color.primary,
                fontSize: responsiveScreenFontSize(2),
                marginBottom: responsiveScreenHeight(3),
              }}>
              Comments
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
                <View
                  style={{
                    gap: responsiveScreenHeight(1.5),
                    paddingHorizontal: responsiveScreenWidth(2),
                  }}>
                  <Shadow
                    distance={1}
                    style={{
                      width: '100%',
                    }}
                    startColor={color.gray2}
                    offset={[0, 0]}>
                    <Pressable
                      onPress={() =>
                        navigation.navigate(routes.ASSET_CART, {
                          data: 'Machinery',
                        })
                      }
                      style={{
                        minHeight: responsiveScreenHeight(10),
                        backgroundColor: color.white,
                        borderRadius: 15,
                        // elevation: 2,
                        // shadowColor: '#000',
                        // shadowOffset: {width: 0, height: 2},
                        // shadowOpacity: 0.3,
                        // shadowRadius: 2,
                        padding: 15,
                        flexDirection: 'row',
                        gap: responsiveScreenWidth(3),
                      }}>
                      <View
                        style={{
                          height: responsiveScreenHeight(3.5),
                          width: responsiveScreenHeight(3.5),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 10,
                          backgroundColor: color.primary,
                        }}>
                        <Image
                          source={require('../../assests/icons/machinery.png')}
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
                          flex: 1,
                          gap: responsiveScreenHeight(1),
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                          }}>
                          <Text
                            style={{
                              fontFamily: font.NunitoSemiBold,
                              fontSize: responsiveScreenFontSize(2),
                              color: color.primary,
                            }}>
                            Machinery
                          </Text>
                          <View
                            style={{
                              height: responsiveScreenHeight(3),
                              width: responsiveScreenHeight(3),
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 10,
                            }}>
                            <Image
                              source={require('../../assests/icons/right-arrow.png')}
                              style={{
                                tintColor: color.primary,
                                aspectRatio: 1,
                                height: '100%',
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: responsiveScreenWidth(2.5),
                          }}>
                          {[
                            'Back hoe loader',
                            'Bulldozer',
                            'Skit-stir loader',
                            'Trencher',
                            'Compactor',
                            'Ripper',
                            'Pile Driver',
                            'Hydraulic Crane',
                            'Wheel excavator',
                          ].map((name, index) => (
                            <Text
                              key={index} // Add a unique key for each item
                              style={{
                                fontFamily: font.NunitoRegular,
                                fontSize: responsiveScreenFontSize(1.5),
                                color: color.black87,
                                paddingHorizontal: responsiveScreenWidth(1.5),
                                paddingVertical: responsiveScreenHeight(0.2),
                                backgroundColor: color.primaryLow,
                                borderRadius: 15,
                              }}>
                              {name} {/* Use the 'name' variable here */}
                            </Text>
                          ))}
                        </View>
                      </View>
                    </Pressable>
                  </Shadow>

                  <Shadow
                    distance={1}
                    style={{
                      width: '100%',
                    }}
                    startColor={color.gray2}
                    offset={[0, 0]}>
                    <Pressable
                      style={{
                        minHeight: responsiveScreenHeight(10),
                        backgroundColor: color.white,
                        borderRadius: 15,
                        // elevation: 2,
                        // shadowColor: '#000',
                        // shadowOffset: {width: 0, height: 2},
                        // shadowOpacity: 0.3,
                        // shadowRadius: 2,
                        padding: 15,
                        flexDirection: 'row',
                        gap: responsiveScreenWidth(3),
                      }}>
                      <View
                        style={{
                          height: responsiveScreenHeight(3.5),
                          width: responsiveScreenHeight(3.5),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 10,
                          backgroundColor: color.primary,
                        }}>
                        <Image
                          source={require('../../assests/icons/tools.png')}
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
                          flex: 1,
                          gap: responsiveScreenHeight(1),
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                          }}>
                          <Text
                            style={{
                              fontFamily: font.NunitoSemiBold,
                              fontSize: responsiveScreenFontSize(2),
                              color: color.primary,
                            }}>
                            Tools
                          </Text>
                          <View
                            style={{
                              height: responsiveScreenHeight(3),
                              width: responsiveScreenHeight(3),
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 10,
                            }}>
                            <Image
                              source={require('../../assests/icons/right-arrow.png')}
                              style={{
                                tintColor: color.primary,
                                aspectRatio: 1,
                                height: '100%',
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: responsiveScreenWidth(2),
                          }}>
                          {[
                            'Hammer',
                            'Drill Machine',
                            'Screw driver',
                            'Ripper',
                            'Suger',
                          ].map((name, index) => (
                            <Text
                              key={index} // Add a unique key for each item
                              style={{
                                fontFamily: font.NunitoRegular,
                                fontSize: responsiveScreenFontSize(1.5),
                                color: color.black87,
                                paddingHorizontal: responsiveScreenWidth(1.5),
                                paddingVertical: responsiveScreenHeight(0.2),
                                backgroundColor: color.primaryLow,
                                borderRadius: 15,
                              }}>
                              {name} {/* Use the 'name' variable here */}
                            </Text>
                          ))}
                        </View>
                      </View>
                    </Pressable>
                  </Shadow>

                  <Shadow
                    distance={1}
                    style={{
                      width: '100%',
                    }}
                    startColor={color.gray2}
                    offset={[0, 0]}>
                    <Pressable
                      style={{
                        minHeight: responsiveScreenHeight(10),
                        backgroundColor: color.white,
                        borderRadius: 15,
                        // elevation: 2,
                        // shadowColor: '#000',
                        // shadowOffset: {width: 0, height: 2},
                        // shadowOpacity: 0.3,
                        // shadowRadius: 2,
                        padding: 15,
                        flexDirection: 'row',
                        gap: responsiveScreenWidth(3),
                      }}>
                      <View
                        style={{
                          height: responsiveScreenHeight(3.5),
                          width: responsiveScreenHeight(3.5),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 10,
                          backgroundColor: color.primary,
                        }}>
                        <Image
                          source={require('../../assests/icons/material.png')}
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
                          flex: 1,
                          gap: responsiveScreenHeight(1),
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                          }}>
                          <Text
                            style={{
                              fontFamily: font.NunitoSemiBold,
                              fontSize: responsiveScreenFontSize(2),
                              color: color.primary,
                            }}>
                            Materials
                          </Text>
                          <View
                            style={{
                              height: responsiveScreenHeight(3),
                              width: responsiveScreenHeight(3),
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 10,
                            }}>
                            <Image
                              source={require('../../assests/icons/right-arrow.png')}
                              style={{
                                tintColor: color.primary,
                                aspectRatio: 1,
                                height: '100%',
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: responsiveScreenWidth(2),
                          }}>
                          {[
                            'Sand',
                            'Cement',
                            'Bricks',
                            'Nails',
                            'Rocks',
                            'Crushed Stone',
                            'Clay',
                            'Mud',
                          ].map((name, index) => (
                            <Text
                              key={index} // Add a unique key for each item
                              style={{
                                fontFamily: font.NunitoRegular,
                                fontSize: responsiveScreenFontSize(1.5),
                                color: color.black87,
                                paddingHorizontal: responsiveScreenWidth(1.5),
                                paddingVertical: responsiveScreenHeight(0.2),
                                backgroundColor: color.primaryLow,
                                borderRadius: 15,
                              }}>
                              {name} {/* Use the 'name' variable here */}
                            </Text>
                          ))}
                        </View>
                      </View>
                    </Pressable>
                  </Shadow>

                  <Shadow
                    distance={1}
                    style={{
                      width: '100%',
                    }}
                    startColor={color.gray2}
                    offset={[0, 0]}>
                    <Pressable
                      style={{
                        minHeight: responsiveScreenHeight(10),
                        backgroundColor: color.white,
                        borderRadius: 15,
                        // elevation: 2,
                        // shadowColor: '#000',
                        // shadowOffset: {width: 0, height: 2},
                        // shadowOpacity: 0.3,
                        // shadowRadius: 2,
                        padding: 15,
                        flexDirection: 'row',
                        gap: responsiveScreenWidth(3),
                      }}>
                      <View
                        style={{
                          height: responsiveScreenHeight(3.5),
                          width: responsiveScreenHeight(3.5),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 10,
                          backgroundColor: color.primary,
                        }}>
                        <Image
                          source={require('../../assests/icons/material.png')}
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
                          flex: 1,
                          gap: responsiveScreenHeight(1),
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                          }}>
                          <Text
                            style={{
                              fontFamily: font.NunitoSemiBold,
                              fontSize: responsiveScreenFontSize(2),
                              color: color.primary,
                            }}>
                            Materials
                          </Text>
                          <View
                            style={{
                              height: responsiveScreenHeight(3),
                              width: responsiveScreenHeight(3),
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 10,
                            }}>
                            <Image
                              source={require('../../assests/icons/right-arrow.png')}
                              style={{
                                tintColor: color.primary,
                                aspectRatio: 1,
                                height: '100%',
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: responsiveScreenWidth(2),
                          }}>
                          {[
                            'Sand',
                            'Cement',
                            'Bricks',
                            'Nails',
                            'Rocks',
                            'Crushed Stone',
                            'Clay',
                            'Mud',
                          ].map((name, index) => (
                            <Text
                              key={index} // Add a unique key for each item
                              style={{
                                fontFamily: font.NunitoRegular,
                                fontSize: responsiveScreenFontSize(1.5),
                                color: color.black87,
                                paddingHorizontal: responsiveScreenWidth(1.5),
                                paddingVertical: responsiveScreenHeight(0.2),
                                backgroundColor: color.primaryLow,
                                borderRadius: 15,
                              }}>
                              {name} {/* Use the 'name' variable here */}
                            </Text>
                          ))}
                        </View>
                      </View>
                    </Pressable>
                  </Shadow>

                  <Shadow
                    distance={1}
                    style={{
                      width: '100%',
                    }}
                    startColor={color.gray2}
                    offset={[0, 0]}>
                    <Pressable
                      style={{
                        minHeight: responsiveScreenHeight(10),
                        backgroundColor: color.white,
                        borderRadius: 15,
                        // elevation: 2,
                        // shadowColor: '#000',
                        // shadowOffset: {width: 0, height: 2},
                        // shadowOpacity: 0.3,
                        // shadowRadius: 2,
                        padding: 15,
                        flexDirection: 'row',
                        gap: responsiveScreenWidth(3),
                      }}>
                      <View
                        style={{
                          height: responsiveScreenHeight(3.5),
                          width: responsiveScreenHeight(3.5),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 10,
                          backgroundColor: color.primary,
                        }}>
                        <Image
                          source={require('../../assests/icons/material.png')}
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
                          flex: 1,
                          gap: responsiveScreenHeight(1),
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                          }}>
                          <Text
                            style={{
                              fontFamily: font.NunitoSemiBold,
                              fontSize: responsiveScreenFontSize(2),
                              color: color.primary,
                            }}>
                            Materials
                          </Text>
                          <View
                            style={{
                              height: responsiveScreenHeight(3),
                              width: responsiveScreenHeight(3),
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 10,
                            }}>
                            <Image
                              source={require('../../assests/icons/right-arrow.png')}
                              style={{
                                tintColor: color.primary,
                                aspectRatio: 1,
                                height: '100%',
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: responsiveScreenWidth(2),
                          }}>
                          {[
                            'Sand',
                            'Cement',
                            'Bricks',
                            'Nails',
                            'Rocks',
                            'Crushed Stone',
                            'Clay',
                            'Mud',
                          ].map((name, index) => (
                            <Text
                              key={index} // Add a unique key for each item
                              style={{
                                fontFamily: font.NunitoRegular,
                                fontSize: responsiveScreenFontSize(1.5),
                                color: color.black87,
                                paddingHorizontal: responsiveScreenWidth(1.5),
                                paddingVertical: responsiveScreenHeight(0.2),
                                backgroundColor: color.primaryLow,
                                borderRadius: 15,
                              }}>
                              {name} {/* Use the 'name' variable here */}
                            </Text>
                          ))}
                        </View>
                      </View>
                    </Pressable>
                  </Shadow>

                  <Shadow
                    distance={1}
                    style={{
                      width: '100%',
                    }}
                    startColor={color.gray2}
                    offset={[0, 0]}>
                    <Pressable
                      style={{
                        minHeight: responsiveScreenHeight(10),
                        backgroundColor: color.white,
                        borderRadius: 15,
                        // elevation: 2,
                        // shadowColor: '#000',
                        // shadowOffset: {width: 0, height: 2},
                        // shadowOpacity: 0.3,
                        // shadowRadius: 2,
                        padding: 15,
                        flexDirection: 'row',
                        gap: responsiveScreenWidth(3),
                      }}>
                      <View
                        style={{
                          height: responsiveScreenHeight(3.5),
                          width: responsiveScreenHeight(3.5),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 10,
                          backgroundColor: color.primary,
                        }}>
                        <Image
                          source={require('../../assests/icons/material.png')}
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
                          flex: 1,
                          gap: responsiveScreenHeight(1),
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                          }}>
                          <Text
                            style={{
                              fontFamily: font.NunitoSemiBold,
                              fontSize: responsiveScreenFontSize(2),
                              color: color.primary,
                            }}>
                            Materials
                          </Text>
                          <View
                            style={{
                              height: responsiveScreenHeight(3),
                              width: responsiveScreenHeight(3),
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 10,
                            }}>
                            <Image
                              source={require('../../assests/icons/right-arrow.png')}
                              style={{
                                tintColor: color.primary,
                                aspectRatio: 1,
                                height: '100%',
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: responsiveScreenWidth(2),
                          }}>
                          {[
                            'Sand',
                            'Cement',
                            'Bricks',
                            'Nails',
                            'Rocks',
                            'Crushed Stone',
                            'Clay',
                            'Mud',
                          ].map((name, index) => (
                            <Text
                              key={index} // Add a unique key for each item
                              style={{
                                fontFamily: font.NunitoRegular,
                                fontSize: responsiveScreenFontSize(1.5),
                                color: color.black87,
                                paddingHorizontal: responsiveScreenWidth(1.5),
                                paddingVertical: responsiveScreenHeight(0.2),
                                backgroundColor: color.primaryLow,
                                borderRadius: 15,
                              }}>
                              {name} {/* Use the 'name' variable here */}
                            </Text>
                          ))}
                        </View>
                      </View>
                    </Pressable>
                  </Shadow>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </BottomModal>

      {/* -----------------------dropDown---------------------------- */}

      <View
        style={{
          paddingHorizontal: responsiveScreenWidth(3),
          paddingVertical: responsiveScreenHeight(1.5),
          // backgroundColor:'red',
          // shadowColor: '#000',
          // shadowOffset: {width: 0, height: 2},
          // shadowOpacity: 0.3,
          // shadowRadius: 2,
        }}>
        <Shadow
          distance={5}
          style={{
            width: '100%',
          }}
          startColor={color.gray2}
          offset={[0, 0]}>
          <View
            style={{
              minHeight: responsiveScreenHeight(10),
              borderRadius: 20,
              overflow: 'hidden',
            }}>
            <Pressable
              style={{
                paddingHorizontal: responsiveScreenWidth(3.5),
                paddingVertical: responsiveScreenHeight(1.4),
                gap: responsiveScreenHeight(1),
                backgroundColor: color.white,
                zIndex: 2,
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
                  <Text
                    style={{
                      color: color.primary,
                      fontSize: responsiveScreenFontSize(2),
                      fontFamily: font.NunitoSemiBold,
                    }}>
                    Excavation
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
                          fontSize: responsiveScreenFontSize(1.4),
                          fontFamily: font.NunitoSemiBold,
                          marginRight: responsiveScreenWidth(1),
                        }}>
                        Oct 12
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
                          fontSize: responsiveScreenFontSize(1.4),
                          fontFamily: font.NunitoSemiBold,
                          marginRight: responsiveScreenWidth(1),
                        }}>
                        Oct 20
                      </Text>
                    </View>
                  </View>
                </View>
                <Pressable
                  onPress={() => setClickedDrop(prev => !prev)}
                  style={{
                    height: responsiveScreenHeight(2.5),
                    width: responsiveScreenHeight(2.5),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: responsiveScreenWidth(2),
                  }}>
                  {(!clickedDrop && (
                    <Image
                      source={require('../../assests/icons/chevron-up.png')}
                      style={{
                        tintColor: color.primary,
                        aspectRatio: 1,
                        height: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  )) || (
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

              {/* =============Middle===================== */}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: color.primaryLow,
                    borderRadius: 15,
                    paddingHorizontal: responsiveScreenWidth(1.5),
                    paddingVertical: responsiveScreenWidth(0.8),
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveScreenFontSize(1.5),
                      color: color.primary,
                      fontFamily: font.NunitoMedium,
                    }}>
                    Tower A2
                  </Text>
                  <View
                    style={{
                      height: responsiveScreenHeight(0.7),
                      margin: 5,
                      width: responsiveScreenWidth(1.4),
                      borderRadius: 10,
                      backgroundColor: color.primary,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: responsiveScreenFontSize(1.5),
                      marginTop: responsiveScreenHeight(0.1),
                      color: color.primary,
                      fontFamily: font.NunitoMedium,
                    }}>
                    5th floor
                  </Text>
                </View>
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
                        fontSize: responsiveScreenFontSize(1.4),
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
                        fontSize: responsiveScreenFontSize(1.4),
                        fontFamily: font.NunitoSemiBold,
                        marginRight: responsiveScreenWidth(1),
                      }}>
                      1200 Sft
                    </Text>
                  </View>
                </View>
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
            </Pressable>

            {/* Dropdow content---------------------------- */}

            <Animated.View
              style={{
                height: animationValue,
                overflow: 'hidden',
                backgroundColor: color.white,
              }}>
              <View
                style={{
                  paddingHorizontal: responsiveScreenWidth(3.5),
                  gap: responsiveScreenHeight(0.5),
                }}>
                <Text
                  style={{
                    fontFamily: font.NunitoMedium,
                    fontSize: responsiveScreenFontSize(1.8),
                    color: color.primary,
                  }}>
                  Description
                </Text>
                <Text
                  style={{
                    fontFamily: font.NunitoRegular,
                    fontSize: responsiveScreenFontSize(1.7),
                    color: color.black87,
                  }}>
                  Lorem ipsum dolor sit amet, construction should keep it with
                  safety and regulation of any site engineer.
                </Text>
              </View>
            </Animated.View>
          </View>
        </Shadow>
      </View>

      {/* -----------------------Work instruction heading---------------------------- */}

      <View
        style={{
          paddingHorizontal: responsiveScreenWidth(3),
          paddingVertical: responsiveScreenHeight(1.5),
        }}>
        <View style={{}}>
          <Shadow distance={4} startColor={color.gray2} offset={[0, 0]}>
            <View
              style={{
                borderRadius: 100,
                flexDirection: 'row',
                position: 'relative',
                overflow: 'hidden', // Prevent shadow clipping
                backgroundColor: color.white,
              }}>
              {/* Animated Sliding Background */}
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

              {/* Left Button */}
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
                    fontSize: responsiveScreenFontSize(1.5),
                  }}>
                  Work Instruction
                </Text>
              </Pressable>

              {/* Right Button */}
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
                    fontSize: responsiveScreenFontSize(1.5),
                  }}>
                  Task Closing Requirement
                </Text>
              </Pressable>
            </View>
          </Shadow>
        </View>
      </View>

      {/* ------------------------------Tools--------------------------------- */}

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: responsiveScreenHeight(2),
          backgroundColor: color.white,
        }}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={true}>
        <View
          style={{
            paddingHorizontal: responsiveScreenWidth(4),
            marginBottom: responsiveScreenHeight(0.8),
          }}>
          <View
            style={{
              minHeight: responsiveScreenHeight(10),
              flexDirection: 'row',
              gap: responsiveScreenWidth(3),
              flex: 1,
              paddingTop: responsiveScreenHeight(1),
            }}>
            {/* ---------------- Left Icon ---------------- */}
            <View
              style={{
                paddingVertical: responsiveScreenHeight(1),
              }}>
              <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
                <Pressable
                  style={{
                    height: responsiveScreenHeight(3.3),
                    width: responsiveScreenHeight(3.3),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    backgroundColor: color.primary,
                  }}>
                  <Image
                    source={require('../../assests/icons/check-flower.png')}
                    style={{
                      tintColor: color.white,
                      aspectRatio: 1,
                      height: '65%',
                      resizeMode: 'contain',
                    }}
                  />
                </Pressable>
              </Shadow>
            </View>

            {/* ---------------- Right Section ---------------- */}
            <View style={{flex: 1}}>
              <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
                <View
                  style={{
                    backgroundColor: color.primaryLow,
                    borderRadius: 15,
                    flex: 1,
                  }}>
                  {/* ________________Top section____________ */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 15,
                      gap: responsiveScreenHeight(1),
                      backgroundColor: color.white,
                      borderRadius: 15,
                    }}>
                    {/* Text Section */}
                    <Text
                      style={{
                        fontFamily: font.NunitoRegular,
                        fontSize: responsiveScreenFontSize(1.8),
                        color: color.black87,
                        width: responsiveScreenWidth(64),
                      }}>
                      Lorem ipsum dolor sit amet, consectetur adipis elit, sed
                      do eiusmod Lorem ipsum dolor sit amet, consectetur adipis
                      elit.
                    </Text>

                    {/* Right Icons Section (Static) */}
                    <View
                      style={{
                        gap: responsiveScreenHeight(0.5),
                      }}>
                      <View style={{flex: 1}}>
                        <Shadow
                          distance={3}
                          startColor={color.gray2}
                          offset={[0, 0]}>
                          <View
                            style={{
                              height: responsiveScreenHeight(3.5),
                              width: responsiveScreenHeight(3.5),
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 50,
                              backgroundColor: color.white,
                            }}>
                            <Image
                              source={require('../../assests/icons/video.png')}
                              style={{
                                tintColor: color.primary,
                                aspectRatio: 1,
                                height: '55%',
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                        </Shadow>
                      </View>

                      {/* ------------------------Reference Image Button----------------------- */}
                      <View
                        style={{
                          position: 'relative',
                          marginLeft: -responsiveScreenWidth(2),
                        }}>
                        <Shadow
                          distance={3}
                          startColor={color.gray3}
                          offset={[0, 0]}>
                          <Pressable
                            onPress={() => {
                              setReferenceModal(true);
                              triggerHaptic('impactMedium');
                            }}
                            style={{
                              height: responsiveScreenHeight(3.8),
                              width: responsiveScreenHeight(3.8),
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 50,
                              backgroundColor: onCheck
                                ? color.primary
                                : color.white,
                              overflow: 'hidden',
                              position: 'relative',
                            }}>
                            <Image
                              source={{
                                uri: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww',
                              }}
                              style={{
                                aspectRatio: 1,
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />

                            <View
                              style={{
                                position: 'absolute',
                                height: responsiveScreenHeight(3.8),
                                width: responsiveScreenHeight(3.8),
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 50,
                                backgroundColor: color.black60,
                                overflow: 'hidden',
                                borderWidth: 1,
                                borderColor: color.white,
                              }}>
                              <Text
                                style={{
                                  fontFamily: font.NunitoRegular,
                                  color: color.white,
                                  fontSize: responsiveScreenFontSize(1.5),
                                }}>
                                +3
                              </Text>
                            </View>
                          </Pressable>
                        </Shadow>
                        <View
                          style={{
                            position: 'absolute',
                            left: 10,
                          }}>
                          <Shadow
                            distance={2}
                            startColor={color.gray3}
                            offset={[1, 0]}>
                            <Pressable
                              onPress={() => {
                                setReferenceModal(true);
                                triggerHaptic('impactMedium');
                              }}
                              style={{
                                height: responsiveScreenHeight(3.8),
                                width: responsiveScreenHeight(3.8),
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 50,
                                backgroundColor: onCheck
                                  ? color.primary
                                  : color.white,
                                overflow: 'hidden',
                                position: 'relative',
                              }}>
                              <Image
                                source={{
                                  uri: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww',
                                }}
                                style={{
                                  aspectRatio: 1,
                                  height: '100%',
                                  objectFit: 'cover',
                                }}
                              />

                              <View
                                style={{
                                  position: 'absolute',
                                  height: responsiveScreenHeight(3.8),
                                  width: responsiveScreenHeight(3.8),
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: 50,
                                  backgroundColor: color.black60,
                                  overflow: 'hidden',
                                  borderWidth: 1,
                                  borderColor: color.white,
                                }}>
                                <Text
                                  style={{
                                    fontFamily: font.NunitoRegular,
                                    color: color.white,
                                    fontSize: responsiveScreenFontSize(1.5),
                                  }}>
                                  +3
                                </Text>
                              </View>
                            </Pressable>
                          </Shadow>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* ________________down section____________ */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: responsiveScreenWidth(5),
                      paddingVertical: responsiveScreenHeight(1.3),
                      gap: responsiveScreenHeight(1),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: responsiveScreenWidth(2),
                      }}>
                      {/* Text Section */}
                      <Shadow
                        distance={3}
                        startColor={color.gray3}
                        offset={[0, 0]}>
                        <Pressable
                          onPress={() => {
                            setReferenceModal(true);
                            triggerHaptic('impactMedium');
                          }}
                          style={{
                            height: responsiveScreenHeight(3.8),
                            width: responsiveScreenHeight(3.8),
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 50,
                            backgroundColor: onCheck
                              ? color.primary
                              : color.white,
                            overflow: 'hidden',
                          }}>
                          <Image
                            source={{
                              uri: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww',
                            }}
                            style={{
                              aspectRatio: 1,
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </Pressable>
                      </Shadow>
                      <View>
                        <Text
                          style={{
                            fontFamily: font.NunitoMedium,
                            color: color.black87,
                            fontSize: responsiveScreenFontSize(1.5),
                          }}>
                          Alex rox
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: responsiveScreenWidth(2),
                          }}>
                          <Text
                            style={{
                              fontFamily: font.NunitoMedium,
                              color: color.primary,
                              fontSize: responsiveScreenFontSize(1.5),
                            }}>
                            Oct 12
                          </Text>
                          <Text
                            style={{
                              fontFamily: font.NunitoMedium,
                              color: color.secondary,
                              fontSize: responsiveScreenFontSize(1.4),
                            }}>
                            4:00 PM
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Right Icons Section (Static) */}
                    {/* ------------------------Reference Image Button----------------------- */}
                    <View
                      style={{
                        position: 'relative',
                        marginLeft: -responsiveScreenWidth(2),
                      }}>
                      <Shadow
                        distance={3}
                        startColor={color.gray3}
                        offset={[0, 0]}>
                        <Pressable
                          onPress={() => {
                            setReferenceModal(true);
                            triggerHaptic('impactMedium');
                          }}
                          style={{
                            height: responsiveScreenHeight(3.8),
                            width: responsiveScreenHeight(3.8),
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 50,
                            backgroundColor: onCheck
                              ? color.primary
                              : color.white,
                            overflow: 'hidden',
                            position: 'relative',
                          }}>
                          <Image
                            source={{
                              uri: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww',
                            }}
                            style={{
                              aspectRatio: 1,
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />

                          <View
                            style={{
                              position: 'absolute',
                              height: responsiveScreenHeight(3.8),
                              width: responsiveScreenHeight(3.8),
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 50,
                              backgroundColor: color.black60,
                              overflow: 'hidden',
                              borderWidth: 1,
                              borderColor: color.white,
                            }}>
                            <Text
                              style={{
                                fontFamily: font.NunitoRegular,
                                color: color.white,
                                fontSize: responsiveScreenFontSize(1.5),
                              }}>
                              +3
                            </Text>
                          </View>
                        </Pressable>
                      </Shadow>
                      <View
                        style={{
                          position: 'absolute',
                          left: 10,
                        }}>
                        <Shadow
                          distance={2}
                          startColor={color.gray3}
                          offset={[1, 0]}>
                          <Pressable
                            onPress={() => {
                              setReferenceModal(true);
                              triggerHaptic('impactMedium');
                            }}
                            style={{
                              height: responsiveScreenHeight(3.8),
                              width: responsiveScreenHeight(3.8),
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 50,
                              backgroundColor: onCheck
                                ? color.primary
                                : color.white,
                              overflow: 'hidden',
                              position: 'relative',
                            }}>
                            <Image
                              source={{
                                uri: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww',
                              }}
                              style={{
                                aspectRatio: 1,
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />

                            <View
                              style={{
                                position: 'absolute',
                                height: responsiveScreenHeight(3.8),
                                width: responsiveScreenHeight(3.8),
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 50,
                                backgroundColor: color.black60,
                                overflow: 'hidden',
                                borderWidth: 1,
                                borderColor: color.white,
                              }}>
                              <Text
                                style={{
                                  fontFamily: font.NunitoRegular,
                                  color: color.white,
                                  fontSize: responsiveScreenFontSize(1.5),
                                }}>
                                +3
                              </Text>
                            </View>
                          </Pressable>
                        </Shadow>
                      </View>
                    </View>
                  </View>
                </View>
              </Shadow>
            </View>
          </View>
        </View>

        {/* ------------------2 */}
        <View
          style={{
            paddingHorizontal: responsiveScreenWidth(4),
            marginBottom: responsiveScreenHeight(0.8),
          }}>
          <View
            style={{
              minHeight: responsiveScreenHeight(10),
              flexDirection: 'row',
              gap: responsiveScreenWidth(3),
              flex: 1,
              paddingTop: responsiveScreenHeight(1),
            }}>
            {/* ---------------- Left Icon ---------------- */}
            <View
              style={{
                paddingVertical: responsiveScreenHeight(1),
              }}>
              <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
                <Pressable
                  style={{
                    height: responsiveScreenHeight(3.3),
                    width: responsiveScreenHeight(3.3),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    backgroundColor: color.primary,
                  }}>
                  <Image
                    source={require('../../assests/icons/check-flower.png')}
                    style={{
                      tintColor: color.white,
                      aspectRatio: 1,
                      height: '65%',
                      resizeMode: 'contain',
                    }}
                  />
                </Pressable>
              </Shadow>
            </View>

            {/* ---------------- Right Section ---------------- */}
            <View style={{flex: 1}}>
              <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
                <View
                  style={{
                    backgroundColor: color.primaryLow,
                    borderRadius: 15,
                    flex: 1,
                  }}>
                  {/* ________________Top section____________ */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 15,
                      gap: responsiveScreenHeight(1),
                      backgroundColor: color.white,
                      borderRadius: 15,
                    }}>
                    {/* Text Section */}
                    <Text
                      style={{
                        fontFamily: font.NunitoRegular,
                        fontSize: responsiveScreenFontSize(1.8),
                        color: color.black87,
                        width: responsiveScreenWidth(64),
                      }}>
                      Lorem ipsum dolor sit amet, consectetur adipis elit, sed
                      do eiusmod Lorem ipsum dolor sit amet, consectetur adipis
                      elit.
                    </Text>

                    {/* Right Icons Section (Static) */}
                    <View
                      style={{
                        gap: responsiveScreenHeight(0.5),
                      }}>
                      <View style={{flex: 1}}>
                        <Shadow
                          distance={3}
                          startColor={color.gray2}
                          offset={[0, 0]}>
                          <View
                            style={{
                              height: responsiveScreenHeight(3.5),
                              width: responsiveScreenHeight(3.5),
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 50,
                              backgroundColor: color.white,
                            }}>
                            <Image
                              source={require('../../assests/icons/video.png')}
                              style={{
                                tintColor: color.primary,
                                aspectRatio: 1,
                                height: '55%',
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                        </Shadow>
                      </View>
                    </View>
                  </View>

                  {/* ________________down section____________ */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: responsiveScreenWidth(5),
                      paddingVertical: responsiveScreenHeight(1.3),
                      gap: responsiveScreenHeight(1),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: responsiveScreenWidth(2),
                      }}>
                      {/* Text Section */}
                      <Shadow
                        distance={3}
                        startColor={color.gray3}
                        offset={[0, 0]}>
                        <Pressable
                          onPress={() => {
                            setReferenceModal(true);
                            triggerHaptic('impactMedium');
                          }}
                          style={{
                            height: responsiveScreenHeight(3.8),
                            width: responsiveScreenHeight(3.8),
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 50,
                            backgroundColor: onCheck
                              ? color.primary
                              : color.white,
                            overflow: 'hidden',
                          }}>
                          <Image
                            source={{
                              uri: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww',
                            }}
                            style={{
                              aspectRatio: 1,
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </Pressable>
                      </Shadow>
                      <View>
                        <Text
                          style={{
                            fontFamily: font.NunitoMedium,
                            color: color.black87,
                            fontSize: responsiveScreenFontSize(1.5),
                          }}>
                          Alex rox
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: responsiveScreenWidth(2),
                          }}>
                          <Text
                            style={{
                              fontFamily: font.NunitoMedium,
                              color: color.primary,
                              fontSize: responsiveScreenFontSize(1.5),
                            }}>
                            Oct 12
                          </Text>
                          <Text
                            style={{
                              fontFamily: font.NunitoMedium,
                              color: color.secondary,
                              fontSize: responsiveScreenFontSize(1.4),
                            }}>
                            4:00 PM
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </Shadow>
            </View>
          </View>
        </View>

        {/* ------------------3 */}
        <View
          style={{
            paddingHorizontal: responsiveScreenWidth(4),
            marginBottom: responsiveScreenHeight(0.8),
          }}>
          <View
            style={{
              minHeight: responsiveScreenHeight(10),
              flexDirection: 'row',
              gap: responsiveScreenWidth(3),
              flex: 1,
              paddingTop: responsiveScreenHeight(1),
            }}>
            {/* ---------------- Left Icon ---------------- */}
            <View
              style={{
                paddingVertical: responsiveScreenHeight(1),
              }}>
              <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
                <Pressable
                  style={{
                    height: responsiveScreenHeight(3.3),
                    width: responsiveScreenHeight(3.3),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    backgroundColor: color.primary,
                  }}>
                  <Image
                    source={require('../../assests/icons/check-flower.png')}
                    style={{
                      tintColor: color.white,
                      aspectRatio: 1,
                      height: '65%',
                      resizeMode: 'contain',
                    }}
                  />
                </Pressable>
              </Shadow>
            </View>

            {/* ---------------- Right Section ---------------- */}
            <View style={{flex: 1}}>
              <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
                <View
                  style={{
                    backgroundColor: color.primaryLow,
                    borderRadius: 15,
                    flex: 1,
                  }}>
                  {/* ________________Top section____________ */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 15,
                      gap: responsiveScreenHeight(1),
                      backgroundColor: color.white,
                      borderRadius: 15,
                    }}>
                    {/* Text Section */}
                    <Text
                      style={{
                        fontFamily: font.NunitoRegular,
                        fontSize: responsiveScreenFontSize(1.8),
                        color: color.black87,
                        width: responsiveScreenWidth(64),
                      }}>
                      Lorem ipsum dolor sit amet, consectetur adipis elit, sed
                      do eiusmod Lorem ipsum dolor sit amet, consectetur adipis
                      elit.
                    </Text>

                    {/* Right Icons Section (Static) */}
                    <View
                      style={{
                        gap: responsiveScreenHeight(0.5),
                      }}>
                      <View style={{flex: 1}}>
                        <Shadow
                          distance={3}
                          startColor={color.gray2}
                          offset={[0, 0]}>
                          <View
                            style={{
                              height: responsiveScreenHeight(3.5),
                              width: responsiveScreenHeight(3.5),
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 50,
                              backgroundColor: color.white,
                            }}>
                            <Image
                              source={require('../../assests/icons/video.png')}
                              style={{
                                tintColor: color.primary,
                                aspectRatio: 1,
                                height: '55%',
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                        </Shadow>
                      </View>

                      {/* ------------------------Reference Image Button----------------------- */}
                      <View
                        style={{
                          position: 'relative',
                          marginLeft: -responsiveScreenWidth(2),
                        }}>
                        <Shadow
                          distance={3}
                          startColor={color.gray3}
                          offset={[0, 0]}>
                          <Pressable
                            onPress={() => {
                              setReferenceModal(true);
                              triggerHaptic('impactMedium');
                            }}
                            style={{
                              height: responsiveScreenHeight(3.8),
                              width: responsiveScreenHeight(3.8),
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 50,
                              backgroundColor: onCheck
                                ? color.primary
                                : color.white,
                              overflow: 'hidden',
                              position: 'relative',
                            }}>
                            <Image
                              source={{
                                uri: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww',
                              }}
                              style={{
                                aspectRatio: 1,
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />

                            <View
                              style={{
                                position: 'absolute',
                                height: responsiveScreenHeight(3.8),
                                width: responsiveScreenHeight(3.8),
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 50,
                                backgroundColor: color.black60,
                                overflow: 'hidden',
                                borderWidth: 1,
                                borderColor: color.white,
                              }}>
                              <Text
                                style={{
                                  fontFamily: font.NunitoRegular,
                                  color: color.white,
                                  fontSize: responsiveScreenFontSize(1.5),
                                }}>
                                +3
                              </Text>
                            </View>
                          </Pressable>
                        </Shadow>
                        <View
                          style={{
                            position: 'absolute',
                            left: 10,
                          }}>
                          <Shadow
                            distance={2}
                            startColor={color.gray3}
                            offset={[1, 0]}>
                            <Pressable
                              onPress={() => {
                                setReferenceModal(true);
                                triggerHaptic('impactMedium');
                              }}
                              style={{
                                height: responsiveScreenHeight(3.8),
                                width: responsiveScreenHeight(3.8),
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 50,
                                backgroundColor: onCheck
                                  ? color.primary
                                  : color.white,
                                overflow: 'hidden',
                                position: 'relative',
                              }}>
                              <Image
                                source={{
                                  uri: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww',
                                }}
                                style={{
                                  aspectRatio: 1,
                                  height: '100%',
                                  objectFit: 'cover',
                                }}
                              />

                              <View
                                style={{
                                  position: 'absolute',
                                  height: responsiveScreenHeight(3.8),
                                  width: responsiveScreenHeight(3.8),
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: 50,
                                  backgroundColor: color.black60,
                                  overflow: 'hidden',
                                  borderWidth: 1,
                                  borderColor: color.white,
                                }}>
                                <Text
                                  style={{
                                    fontFamily: font.NunitoRegular,
                                    color: color.white,
                                    fontSize: responsiveScreenFontSize(1.5),
                                  }}>
                                  +3
                                </Text>
                              </View>
                            </Pressable>
                          </Shadow>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* ________________down section____________ */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: responsiveScreenWidth(5),
                      paddingVertical: responsiveScreenHeight(1.3),
                      gap: responsiveScreenHeight(1),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: responsiveScreenWidth(2),
                      }}>
                      {/* Text Section */}
                      <Shadow
                        distance={3}
                        startColor={color.gray3}
                        offset={[0, 0]}>
                        <Pressable
                          onPress={() => {
                            setReferenceModal(true);
                            triggerHaptic('impactMedium');
                          }}
                          style={{
                            height: responsiveScreenHeight(3.8),
                            width: responsiveScreenHeight(3.8),
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 50,
                            backgroundColor: onCheck
                              ? color.primary
                              : color.white,
                            overflow: 'hidden',
                          }}>
                          <Image
                            source={{
                              uri: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww',
                            }}
                            style={{
                              aspectRatio: 1,
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </Pressable>
                      </Shadow>
                      <View>
                        <Text
                          style={{
                            fontFamily: font.NunitoMedium,
                            color: color.black87,
                            fontSize: responsiveScreenFontSize(1.5),
                          }}>
                          Alex rox
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: responsiveScreenWidth(2),
                          }}>
                          <Text
                            style={{
                              fontFamily: font.NunitoMedium,
                              color: color.primary,
                              fontSize: responsiveScreenFontSize(1.5),
                            }}>
                            Oct 12
                          </Text>
                          <Text
                            style={{
                              fontFamily: font.NunitoMedium,
                              color: color.secondary,
                              fontSize: responsiveScreenFontSize(1.4),
                            }}>
                            4:00 PM
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Right Icons Section (Static) */}
                    {/* ------------------------Reference Image Button----------------------- */}
                    <View
                      style={{
                        position: 'relative',
                        marginLeft: -responsiveScreenWidth(2),
                      }}>
                      <Shadow
                        distance={3}
                        startColor={color.gray3}
                        offset={[0, 0]}>
                        <Pressable
                          onPress={() => {
                            setReferenceModal(true);
                            triggerHaptic('impactMedium');
                          }}
                          style={{
                            height: responsiveScreenHeight(3.8),
                            width: responsiveScreenHeight(3.8),
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 50,
                            backgroundColor: onCheck
                              ? color.primary
                              : color.white,
                            overflow: 'hidden',
                            position: 'relative',
                          }}>
                          <Image
                            source={{
                              uri: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww',
                            }}
                            style={{
                              aspectRatio: 1,
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />

                          <View
                            style={{
                              position: 'absolute',
                              height: responsiveScreenHeight(3.8),
                              width: responsiveScreenHeight(3.8),
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 50,
                              backgroundColor: color.black60,
                              overflow: 'hidden',
                              borderWidth: 1,
                              borderColor: color.white,
                            }}>
                            <Text
                              style={{
                                fontFamily: font.NunitoRegular,
                                color: color.white,
                                fontSize: responsiveScreenFontSize(1.5),
                              }}>
                              +3
                            </Text>
                          </View>
                        </Pressable>
                      </Shadow>
                      <View
                        style={{
                          position: 'absolute',
                          left: 10,
                        }}>
                        <Shadow
                          distance={2}
                          startColor={color.gray3}
                          offset={[1, 0]}>
                          <Pressable
                            onPress={() => {
                              setReferenceModal(true);
                              triggerHaptic('impactMedium');
                            }}
                            style={{
                              height: responsiveScreenHeight(3.8),
                              width: responsiveScreenHeight(3.8),
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 50,
                              backgroundColor: onCheck
                                ? color.primary
                                : color.white,
                              overflow: 'hidden',
                              position: 'relative',
                            }}>
                            <Image
                              source={{
                                uri: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww',
                              }}
                              style={{
                                aspectRatio: 1,
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />

                            <View
                              style={{
                                position: 'absolute',
                                height: responsiveScreenHeight(3.8),
                                width: responsiveScreenHeight(3.8),
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 50,
                                backgroundColor: color.black60,
                                overflow: 'hidden',
                                borderWidth: 1,
                                borderColor: color.white,
                              }}>
                              <Text
                                style={{
                                  fontFamily: font.NunitoRegular,
                                  color: color.white,
                                  fontSize: responsiveScreenFontSize(1.5),
                                }}>
                                +3
                              </Text>
                            </View>
                          </Pressable>
                        </Shadow>
                      </View>
                    </View>
                  </View>
                </View>
              </Shadow>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ------------------------------Slide start button---------------------------------
      <View
        style={{
          paddingBottom: responsiveScreenHeight(3),
        }}>
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
                fontFamily: font.NunitoMedium,
                color: color.black87,
                fontSize: responsiveScreenFontSize(1.8),
              }}>
              Slide to End Subtask
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
      </View> */}

      {/* ==========================================Floating buttons=========================================== */}
      <View
        style={{
          position: 'absolute',
          bottom: responsiveScreenHeight(3),
          right: responsiveScreenWidth(3.5),
          gap: responsiveScreenHeight(0.8),
          alignItems: 'flex-end',
        }}>
        <Pressable
          onPress={() => {
            setModalVisible(true);
            triggerHaptic('impactMedium');
          }}>
          <CustomLinearGradient
            style={{
              width: responsiveScreenWidth(11),
              aspectRatio: 1,
              borderRadius: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            direction={'Vertical'}>
            <Image
              source={require('../../assests/icons/comment.png')}
              style={{
                height: responsiveScreenHeight(2),
                aspectRatio: 1,
                tintColor: color.white,
                resizeMode: 'contain',
              }}
            />
          </CustomLinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

export default PMSubtaskReview;
