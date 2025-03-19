/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Animated,
  PanResponder,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AnimatedInput, BottomModal, Header} from '../../component';
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
import {Shadow} from 'react-native-shadow-2';
import {LinearGradient as CustomLinearGradient} from '../../component';
import useHapticFeedback from '../../hooks/useHapticFeedback';
// import useHapticFeedback from '../../hooks/useHapticFeedback';

const ItemRequest = () => {
  const {triggerHaptic} = useHapticFeedback();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [actionModal, setActionModal] = useState(false);
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
    {
      name: 'John Doe',
      tag: 'Organizer',
      time: '12:30 AM',
      date: '12 Sep 2024',
      pic: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Horizon Belmound Construction Inventory Found in the Underground',
      desc: 'Insatll safety barriers on the 4th-floor perimeter. Ensure the gaps between walls',
      _id: 45698,
    },
    {
      name: 'John Doe',
      tag: 'Organizer',
      time: '12:30 AM',
      date: '12 Sep 2024',
      pic: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Horizon Belmound Construction Inventory Found in the Underground',
      desc: 'Insatll safety barriers on the 4th-floor perimeter. Ensure the gaps between walls',
      _id: 12548,
    },
    {
      name: 'John Doe',
      tag: 'Organizer',
      time: '12:30 AM',
      date: '12 Sep 2024',
      pic: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Horizon Belmound Construction Inventory Found in the Underground',
      desc: 'Insatll safety barriers on the 4th-floor perimeter. Ensure the gaps between walls',
      _id: 78859,
    },
  ]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.white,
      }}>
      <Header title={'Approvals'} />

      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingHorizontal: responsiveScreenWidth(2),
          paddingTop: responsiveScreenHeight(1.5),
          gap: responsiveScreenHeight(1.5),
        }}>
        {/* ------------------------------Tools--------------------------------- */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            marginBottom: responsiveScreenHeight(2),
            backgroundColor: color.white,
          }}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              gap: responsiveScreenHeight(1),
              paddingHorizontal: responsiveScreenWidth(2),
              paddingTop: responsiveScreenHeight(1),
              marginBottom: responsiveScreenHeight(8),
            }}>
            {dummyData.map((val, index) => {
              return (
                <View
                  style={{
                    marginBottom: responsiveScreenHeight(0.8),
                  }}>
                  {/* ---------------- Right Section ---------------- */}
                  <View style={{}}>
                    <Shadow
                      distance={3}
                      startColor={color.gray2}
                      offset={[0, 0]}>
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
                        </View>
                      </View>
                    </Shadow>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ItemRequest;
