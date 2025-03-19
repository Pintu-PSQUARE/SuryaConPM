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
  TouchableOpacity,
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
  Model as Models,
} from '../../component';
import useHapticFeedback from '../../hooks/useHapticFeedback';
import {PanResponder} from 'react-native';

const ItemRequestReview = () => {
  const {triggerHaptic} = useHapticFeedback();

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [approveModal, setApproveModal] = useState(false);
  const [referenceModal, setReferenceModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
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
    reason: '',
  });

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

  const [index, setIndex] = useState(0);

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
      <Header title={'Approvals'} />

      {/* -----------------------Attachments modal-------------------------- */}
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
                    opacity: 0,
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
        </View>
      </BottomModal>

      {/* -----------------------Approve Confirmation modal-------------------------- */}
      <Models
        modalVisible={approveModal}
        setModalVisible={setApproveModal}
        cancel={{
          title: 'No',
          on: () => {
            setApproveModal(false);
          },
        }}
        ok={{
          title: 'Yes',
          on: () => {
            setApproveModal(false);
          },
        }}
        title={'Are you sure you approve the item request?'}
        icon={
          <View
            style={{
              maxHeight: responsiveScreenHeight(2.8),
              alignItems: 'flex-start',
            }}>
            <Image
              source={require('../../assests/icons/check.png')}
              style={{
                tintColor: color.primary,
                height: '90%',
                aspectRatio: 1,
              }}
            />
          </View>
        }
      />

      {/* -----------------------Approve Confirmation modal-------------------------- */}
      <Models
        modalVisible={declineModal}
        setModalVisible={setDeclineModal}
        cancel={{
          title: 'Cancel',
          on: () => {
            setDeclineModal(false);
          },
        }}
        ok={{
          title: 'Submit',
          on: () => {
            setDeclineModal(false);
          },
        }}
        title={'Are you sure you want to decline the item request?'}
        iconBackground={color.redLow}
        inputs={
          <View
            style={{
              maxHeight: responsiveScreenHeight(5),
              width: '100%',
              paddingHorizontal: responsiveScreenWidth(5.5),
            }}>
            <AnimatedInput
              label="Reason"
              value={data.reason}
              onChange={e => {
                setData({...data, reason: e});
              }}
            />
          </View>
        }
        icon={
          <View
            style={{
              maxHeight: responsiveScreenHeight(2.8),
              alignItems: 'flex-start',
            }}>
            <Image
              source={require('../../assests/icons/cross-circle.png')}
              style={{
                tintColor: color.red,
                height: '95%',
                aspectRatio: 1,
              }}
            />
          </View>
        }
      />

      {/* -----------------------card---------------------------- */}

      <View
        style={{
          paddingHorizontal: responsiveScreenWidth(3),
          paddingTop: responsiveScreenHeight(1),
        }}>
        <View
          style={{
            marginBottom: responsiveScreenHeight(1.5),
          }}>
          <View style={{}}>
            <Shadow distance={4} startColor={color.black15} offset={[0, 0]}>
              <View
                style={{
                  backgroundColor: color.primaryLow,
                  borderRadius: 25,
                  width: '100%',
                }}>
                {/* ________________Top section____________ */}
                <Pressable
                  onPress={() => {
                    navigation.navigate(routes.ITEM_REQUEST_REVIEW);
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: color.white,
                    borderRadius: 25,
                    paddingLeft: responsiveScreenWidth(3),
                    width: '100%',
                    overflow: 'hidden',
                    elevation: 1,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                      gap: responsiveScreenWidth(2),
                    }}>
                    <Text
                      style={{
                        fontFamily: font.NunitoMedium,
                        fontSize: responsiveScreenFontSize(2.7),
                        color: color.black87,
                      }}>
                      07
                    </Text>
                    <Text
                      style={{
                        fontFamily: font.NunitoMedium,
                        fontSize: responsiveScreenFontSize(1.5),
                        color: color.black60,
                      }}>
                      Total Items
                    </Text>
                  </View>
                  <View
                    style={{
                      gap: responsiveScreenWidth(2),
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={{
                        fontFamily: font.NunitoSemiBold,
                        fontSize: responsiveScreenFontSize(1.4),
                        color: color.secondary,
                        paddingVertical: responsiveScreenHeight(0.5),
                        paddingHorizontal: responsiveScreenWidth(3),
                        backgroundColor: color.secondaryLow,
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                      }}>
                      Raft foundation
                    </Text>
                    <View
                      style={{
                        backgroundColor: color.primaryLow,
                        paddingHorizontal: responsiveScreenWidth(1.5),
                        paddingVertical: responsiveScreenWidth(0.5),
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: responsiveScreenWidth(1),
                        width: responsiveScreenWidth(23),
                      }}>
                      <View
                        style={{
                          height: responsiveScreenHeight(2.1),
                          width: responsiveScreenHeight(2.1),
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={require('../../assests/icons/clock.png')}
                          style={{
                            tintColor: color.primaryForTop,
                            aspectRatio: 1,
                            height: '100%',
                            resizeMode: 'contain',
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          color: color.primaryForTop,
                          fontSize: responsiveScreenFontSize(1.5),
                          fontFamily: font.NunitoSemiBold,
                          marginRight: responsiveScreenWidth(1),
                        }}>
                        12:25 PM
                      </Text>
                    </View>
                  </View>
                </Pressable>

                {/* ________________down section____________ */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: responsiveScreenWidth(3),
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
                        style={{
                          height: responsiveScreenHeight(3.8),
                          width: responsiveScreenHeight(3.8),
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          overflow: 'hidden',
                        }}>
                        <Image
                          source={{
                            uri: 'https://s3-alpha-sig.figma.com/img/faf5/6090/177c2ac6da578526daf50db3026f2fe9?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=N5EDln9aGWbigqinTq1nbe4~nYGzzNWE4JMH4~qNXaXfQ9r2CcP4VEw7M1xAa2NQsQ00EWEHqApYZy3kpgSQoN1Wxoh1pgjB2vz4btkjHUQCDPIXDTf0QY1lanPRVhUU7~MU0KbHI0G1aRI04GUM2ozbMEsmnNhJR~YzcoBrqingq02mAjRrm8ZmEo-KCNn4YUqOUj1J5Dck4eSTbD-wibA2JFphDH4n-1C2I34e3v6oN43P6Qr5-P40GepMDPuSUlM4OjdCnSTXBMQdicvQ6cx~SKQdsBLizE8YZaDrbDkn5uv6yBhLdB42ctqfTM7cA3gYCCz8Z8xoaEiYm4wK3w__',
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
                          fontFamily: font.NunitoSemiBold,
                          color: color.black87,
                          fontSize: responsiveScreenFontSize(1.5),
                        }}>
                        Ramesh Kumar
                      </Text>
                      <Text
                        style={{
                          fontFamily: font.NunitoMedium,
                          color: color.black60,
                          fontSize: responsiveScreenFontSize(1.4),
                        }}>
                        Head Engineer
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: responsiveScreenWidth(2),
                    }}>
                    <Pressable
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
                      }}>
                      <Image
                        source={require('../../assests/icons/comment.png')}
                        style={{
                          tintColor: color.primaryForTop,
                          aspectRatio: 1,
                          height: '60%',
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
                        height: responsiveScreenHeight(4),
                        width: responsiveScreenHeight(4),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 50,
                      }}>
                      <Image
                        source={require('../../assests/icons/call.png')}
                        style={{
                          tintColor: color.primaryForTop,
                          aspectRatio: 1,
                          height: '70%',
                          resizeMode: 'contain',
                        }}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            </Shadow>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: responsiveScreenWidth(2.5),
            paddingVertical: responsiveScreenHeight(1),
            backgroundColor: color.primaryLow,
            borderRadius: 15,
            gap: responsiveScreenHeight(0.5),
            marginBottom: responsiveScreenHeight(1.5),
          }}>
          <Text
            style={{
              fontFamily: font.NunitoMedium,
              color: color.primary,
              fontSize: responsiveScreenFontSize(1.5),
            }}>
            Remarks
          </Text>
          <Text
            style={{
              fontFamily: font.NunitoMedium,
              color: color.black87,
              fontSize: responsiveScreenFontSize(1.7),
            }}>
            If there are less unskilled person available for work please provide
            me but there are very important task to complete today by the the
          </Text>
        </View>

        <Shadow
          distance={3}
          style={{
            width: '100%',
            marginBottom: responsiveScreenHeight(1),
          }}
          startColor={color.gray2}
          offset={[0, 0]}>
          <View
            style={{
              paddingHorizontal: responsiveScreenWidth(3),
              paddingVertical: responsiveScreenHeight(1.5),
              backgroundColor: color.white,
              borderRadius: 15,
              gap: responsiveScreenHeight(1),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: font.NunitoMedium,
                color: color.black87,
                fontSize: responsiveScreenFontSize(1.7),
              }}>
              Attachments
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: responsiveScreenWidth(5),
              }}>
              <View
                style={{
                  position: 'relative',
                }}>
                <Shadow distance={3} startColor={color.gray3} offset={[0, 0]}>
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
                      backgroundColor: color.primary,
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
                  <Shadow distance={2} startColor={color.gray3} offset={[1, 0]}>
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
                        // backgroundColor: onCheck ? color.primary : color.white,
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
              <Shadow distance={3} startColor={color.black10} offset={[0, 0]}>
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
                    source={require('../../assests/icons/msg2.png')}
                    style={{
                      tintColor: color.primary,
                      aspectRatio: 1,
                      height: '70%',
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              </Shadow>
            </View>
          </View>
        </Shadow>
      </View>

      {/* ------------------------------Tools--------------------------------- */}
      <View style={{flex: 1}}>
        <FlatList
          data={dummyData}
          contentContainerStyle={{paddingBottom: responsiveScreenHeight(10)}}
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

            return (
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: responsiveScreenHeight(1),
                }}>
                <Shadow distance={3} startColor={color.gray2} offset={[0, 0]}>
                  <View
                    style={{
                      overflow: 'hidden',
                      borderRadius: 20,
                    }}>
                    <View
                      style={{
                        width: responsiveScreenWidth(93),
                        position: 'relative',
                        backgroundColor: color.primary,
                        borderRadius: 21,
                      }}>
                      <View
                        style={{
                          height: responsiveScreenHeight(3),
                          width: responsiveScreenHeight(3),
                          position: 'absolute',
                          top: 24,
                          right: 40,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'row',
                          zIndex: 0,
                          gap: responsiveScreenWidth(2),
                        }}>
                        <View
                          style={{
                            height: responsiveScreenHeight(3.5),
                            width: responsiveScreenHeight(3.5),
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: color.white,
                            borderRadius: 30,
                          }}>
                          <Image
                            source={require('../../assests/icons/bin.png')}
                            style={{
                              tintColor: color.red,
                              aspectRatio: 1,
                              height: '60%',
                              resizeMode: 'contain',
                            }}
                          />
                        </View>
                        <View
                          style={{
                            height: responsiveScreenHeight(3.5),
                            width: responsiveScreenHeight(3.5),
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: color.white,
                            borderRadius: 30,
                          }}>
                          <Image
                            source={require('../../assests/icons/pencil-edit.png')}
                            style={{
                              tintColor: color.primary,
                              aspectRatio: 1,
                              height: '60%',
                              resizeMode: 'contain',
                            }}
                          />
                        </View>
                      </View>
                      <Animated.View
                        {...panResponder.panHandlers}
                        style={[animatedStyle]}>
                        <View
                          style={{
                            backgroundColor: color.white,
                            borderRadius: 20,
                            width: '100%',
                            overflow: 'hidden',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingLeft: responsiveScreenWidth(2.5),
                            paddingBottom: responsiveScreenHeight(1.4),
                          }}>
                          {/* =============Left======================== */}

                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginTop: responsiveScreenHeight(1.3),
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
                                      paddingHorizontal:
                                        responsiveScreenWidth(1.5),
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
                                      paddingHorizontal:
                                        responsiveScreenWidth(1.5),
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
                                      paddingHorizontal:
                                        responsiveScreenWidth(1.5),
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
                          </View>

                          {/* =============Right======================== */}
                          <View
                            style={{
                              alignItems: 'flex-end',
                              gap: responsiveScreenHeight(1),
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  paddingVertical: responsiveScreenHeight(0.2),
                                  paddingLeft: responsiveScreenWidth(0.8),
                                  paddingRight: responsiveScreenWidth(4),
                                  borderTopLeftRadius: 15,
                                  borderBottomLeftRadius: 15,
                                  backgroundColor: color.primaryLow,
                                  gap: responsiveScreenWidth(1),
                                  marginRight: -responsiveScreenWidth(2.5),
                                }}>
                                <View
                                  style={{
                                    height: responsiveScreenHeight(2),
                                    width: responsiveScreenHeight(2),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <Image
                                    source={require('../../assests/icons/box2.png')}
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
                                    color: color.primary,
                                    fontSize: responsiveScreenFontSize(1.5),
                                    fontFamily: font.NunitoRegular,
                                  }}>
                                  500
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: responsiveScreenWidth(3),
                                paddingRight: responsiveScreenWidth(2.5),
                              }}>
                              <View
                                style={{
                                  height: responsiveScreenHeight(3.3),
                                  width: responsiveScreenHeight(3.3),
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundColor: color.primary,
                                  borderRadius: 30,
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
                              <Text
                                style={{
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(2),
                                  fontFamily: font.NunitoSemiBold,
                                }}>
                                150/200
                              </Text>
                            </View>
                          </View>
                        </View>
                      </Animated.View>
                    </View>
                  </View>
                </Shadow>
              </View>
            );
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
                <Stop offset="0.85" stopColor="white" stopOpacity="0.99" />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#grad)" />
          </Svg>

          {/* Content Overlay */}
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: responsiveScreenHeight(2),
            alignSelf: 'center',
          }}>
          {/* Bottom Section: Description */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              gap: responsiveScreenWidth(5),
              marginVertical: responsiveScreenHeight(1),
            }}>
            {/* <Shadow distance={5} startColor={color.black15} offset={[0, 0]}> */}
            <Pressable
              onPress={() => {
                triggerHaptic('impactMedium');
                setDeclineModal(true);
              }}
              style={{
                width: responsiveScreenWidth(25),
                height: responsiveScreenHeight(3.5),
                backgroundColor: color.white,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                borderWidth: responsiveScreenWidth(0.3),
                borderColor: color.red,
              }}>
              <Text
                style={{
                  fontFamily: font.NunitoMedium,
                  fontSize: responsiveScreenFontSize(1.5),
                  color: color.black87,
                }}>
                Declined
              </Text>
            </Pressable>
            {/* </Shadow> */}
            {/* <Shadow distance={5} startColor={color.black15} offset={[0, 0]}> */}
            <Pressable
              onPress={() => {
                triggerHaptic('impactMedium');
                setApproveModal(true);
              }}
              style={{
                width: responsiveScreenWidth(25),
                height: responsiveScreenHeight(3.5),
                backgroundColor: color.white,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                borderWidth: responsiveScreenWidth(0.3),
                borderColor: color.primary,
              }}>
              <Text
                style={{
                  fontFamily: font.NunitoMedium,
                  fontSize: responsiveScreenFontSize(1.5),
                  color: color.black87,
                }}>
                Approve
              </Text>
            </Pressable>
            {/* </Shadow> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemRequestReview;
