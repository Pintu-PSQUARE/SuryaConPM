/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {Header} from '../../component';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {color, font, routes} from '../../config/Env';

const OrderPage = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
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
    <>
      <Header title={'Orders'}>
        <>
          <Pressable onPress={() => {}}>
            <Image
              source={require('../../assests/icons/History.png')}
              style={{height: '100%', aspectRatio: 1, tintColor: color.white}}
            />
          </Pressable>
        </>
      </Header>
      <View
        style={{
          flex: 1,
          backgroundColor: color.white,
          paddingHorizontal: responsiveScreenWidth(3),
          paddingVertical: responsiveScreenHeight(1.4),
        }}>
        <View
          style={{
            width: '100%',
            gap: responsiveScreenWidth(5),
            alignSelf: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: responsiveScreenHeight(1),
          }}>
          <View
            style={{
              backgroundColor: color.white,
              borderRadius: 100,
              flexDirection: 'row',
              flex: 1,
              paddingHorizontal: responsiveScreenWidth(3),
              borderColor: color.gray3,
              borderWidth: 1,
              alignItems: 'center',
            }}>
            <View style={{height: responsiveScreenHeight(2.2), aspectRatio: 1}}>
              <Image
                source={require('../../assests/icons/search.png')}
                style={{
                  height: '100%',
                  resizeMode: 'cover',
                  width: '100%',
                  tintColor: color.black87,
                }}
              />
            </View>
            <TextInput
              style={{
                backgroundColor: color.white,
                fontWeight: '400',
                borderRadius: 200,
                paddingVertical: responsiveScreenHeight(1),
                fontSize: responsiveScreenFontSize(1.8),
                paddingHorizontal: responsiveScreenWidth(3),
                flex: 1,
              }}
              keyboardType="default"
              maxLength={10}
              returnKeyType="done"
              placeholder="Search ticket id"
              placeholderTextColor={color.black60}
              // value={user.password}
              onChangeText={e => {
                // setUser({ ...user, password: e })
              }}
            />
          </View>
          <Pressable
            onPress={() => {}}
            style={{aspectRatio: 1, flexDirection: 'row'}}>
            <Image
              source={require('../../assests/icons/scan.png')}
              style={{
                width: responsiveScreenWidth(6),
                aspectRatio: 1,
                tintColor: color.primary,
              }}
            />
          </Pressable>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 100,
            borderColor: color.gray3,
            flexDirection: 'row',
            position: 'relative',
            width: '100%',
            marginTop: responsiveScreenHeight(0.2),
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
              left: animatedLeft, // Controlled by animation
            }}></Animated.View>
          <TouchableOpacity
            onPress={() => handleToggle(true)}
            style={{
              width: '50%',
              paddingVertical: responsiveScreenHeight(1.3),
              flexDirection: 'row',
              justifyContent: 'center',
              gap: responsiveScreenWidth(3),
            }}>
            <Text
              style={{
                color: !isLeft ? color.black87 : color.white,
                fontFamily: font.NunitoMedium,
                fontSize: responsiveScreenFontSize(1.8),
              }}>
              Material
            </Text>
            <View
              style={{
                width: responsiveScreenWidth(5),
                backgroundColor: !isLeft ? color.primary : color.white,
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
              }}>
              <Text
                style={{
                  color: !isLeft ? color.white : color.primary,
                  fontFamily: font.NunitoMedium,
                  fontSize: responsiveScreenFontSize(1.2),
                }}>
                89
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleToggle(false)}
            style={{
              width: '50%',
              paddingVertical: responsiveScreenHeight(1.3),
              flexDirection: 'row',
              justifyContent: 'center',
              gap: responsiveScreenWidth(3),
            }}>
            <Text
              style={{
                color: isLeft ? color.black87 : color.white,
                fontFamily: font.NunitoMedium,
                fontSize: responsiveScreenFontSize(1.8),
              }}>
              Material
            </Text>
            <View
              style={{
                width: responsiveScreenWidth(5),
                backgroundColor: isLeft ? color.primary : color.white,
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
              }}>
              <Text
                style={{
                  color: isLeft ? color.white : color.primary,
                  fontFamily: font.NunitoMedium,
                  fontSize: responsiveScreenFontSize(1.2),
                }}>
                89
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate(routes.TICKET, {order: true, page: 'order'})
          }
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: color.black28,
            borderRadius: 20,
            marginTop: responsiveScreenHeight(2),
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: responsiveScreenWidth(1.8),
              alignItems: 'center',
              paddingHorizontal: responsiveScreenWidth(3),
              paddingVertical: responsiveScreenHeight(2),
            }}>
            <Pressable
              onPress={() => {}}
              style={{
                width: responsiveScreenWidth(8),
                padding: responsiveScreenWidth(1.7),
                aspectRatio: 1,
                backgroundColor: color.white,
                borderWidth: 1,
                borderColor: color.black28,
                borderRadius: 100,
              }}>
              <Image
                source={require('../../assests/icons/ticket.png')}
                style={{
                  height: '100%',
                  aspectRatio: 1,
                  tintColor: color.primary,
                }}
              />
            </Pressable>
            <View>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(1.5),
                  color: color.black60,
                  fontFamily: font.NunitoMedium,
                }}>
                Ticket id
              </Text>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(1.7),
                  color: color.black87,
                  fontFamily: font.NunitoSemiBold,
                }}>
                565778
              </Text>
            </View>
            <Pressable
              onPress={() => {}}
              style={{
                width: responsiveScreenWidth(8),
                padding: responsiveScreenWidth(1.7),
                aspectRatio: 1,
                backgroundColor: color.white,
                borderWidth: 1,
                borderColor: color.black28,
                borderRadius: 100,
              }}>
              <Image
                source={require('../../assests/icons/calendar.png')}
                style={{
                  height: '100%',
                  aspectRatio: 1,
                  tintColor: color.primary,
                }}
              />
            </Pressable>
            <View>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(1.5),
                  color: color.black60,
                  fontFamily: font.NunitoMedium,
                }}>
                Shipping Date
              </Text>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(1.7),
                  color: color.black87,
                  fontFamily: font.NunitoSemiBold,
                }}>
                Sep 25, Thr
              </Text>
            </View>
            <Pressable
              onPress={() => {}}
              style={{
                width: responsiveScreenWidth(8),
                padding: responsiveScreenWidth(1.7),
                aspectRatio: 1,
                backgroundColor: color.white,
                borderWidth: 1,
                borderColor: color.black28,
                borderRadius: 100,
              }}>
              <Image
                source={require('../../assests/icons/clock.png')}
                style={{
                  height: '100%',
                  aspectRatio: 1,
                  tintColor: color.primary,
                }}
              />
            </Pressable>
            <View>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(1.5),
                  color: color.black60,
                  fontFamily: font.NunitoMedium,
                }}>
                Representative
              </Text>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(1.7),
                  color: color.black87,
                  fontFamily: font.NunitoSemiBold,
                }}>
                Tarundeep
              </Text>
            </View>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: color.primary2,
              borderStyle: 'dashed',
            }}></View>

          <View
            style={{
              flexDirection: 'row',
              gap: responsiveScreenWidth(2),
              alignItems: 'center',
              paddingHorizontal: responsiveScreenWidth(4),
              paddingVertical: responsiveScreenHeight(2),
            }}>
            <View
              style={{
                width: responsiveScreenWidth(10),
                aspectRatio: 1,
                borderRadius: 1212,
                overflow: 'hidden',
              }}>
              <Image
                style={{height: '100%', width: '100%'}}
                source={{
                  uri: 'https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png',
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: color.black87,
                  fontSize: responsiveScreenFontSize(1.9),
                  fontWeight: '400',
                  fontFamily: font.NunitoSemiBold,
                }}>
                World 13 PVT LTD
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveScreenWidth(2),
                }}>
                <Text
                  style={{
                    color: color.black60,
                    fontSize: responsiveScreenFontSize(1.7),
                    fontWeight: '400',
                    fontFamily: font.NunitoMedium,
                  }}>
                  133412
                </Text>
                <View
                  style={{
                    width: responsiveScreenWidth(2),
                    borderRadius: 100,
                    aspectRatio: 1,
                    backgroundColor: color.primary,
                  }}></View>
                <Text
                  style={{
                    color: color.black60,
                    fontSize: responsiveScreenFontSize(1.7),
                    fontWeight: '400',
                    fontFamily: font.NunitoMedium,
                  }}>
                  Site Engineer
                </Text>
              </View>
            </View>
            <Pressable
              onPress={() => {}}
              style={{
                width: responsiveScreenWidth(9),
                padding: responsiveScreenWidth(2),
                aspectRatio: 1,
                backgroundColor: color.white,
                borderWidth: 1,
                borderColor: color.black28,
                borderRadius: 100,
              }}>
              <Image
                source={require('../../assests/icons/box.png')}
                style={{
                  height: '100%',
                  aspectRatio: 1,
                  tintColor: color.primary,
                }}
              />
            </Pressable>
            <View>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(1.5),
                  color: color.black60,
                  fontFamily: font.NunitoMedium,
                }}>
                Items
              </Text>
              <Text
                style={{
                  fontSize: responsiveScreenFontSize(1.7),
                  color: color.black87,
                  fontFamily: font.NunitoSemiBold,
                }}>
                04 Items
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default OrderPage;
