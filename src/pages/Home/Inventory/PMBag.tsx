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
  TextInput,
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
import {LinearGradient as ComponentLinear} from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';

const PMBag = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {triggerHaptic} = useHapticFeedback();

  const [modalVisible, setModalVisible] = useState(false);
  const [searchBox, setSearchBox] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [selectedQuantities, setSelectedQuantities] = useState<{
    [key: string]: number;
  }>({});
  const [selectedProducts, setSelectedProducts] = useState<
    {id: string; url: string; quantity: number}[]
  >([]);

  // console.log('products', selectedProducts);

  const slideAnim = useRef(
    new Animated.Value(responsiveScreenWidth(100)),
  ).current; // Start off-screen to the left
  // const [isLeft, setIsLeft] = useState(true);
  const [selected, setSelected] = useState('Tools');

  // const handleToggle = (direction: boolean) => {
  //   if (isLeft !== direction) {
  //     Animated.timing(animatedLeft, {
  //       toValue: isLeft ? responsiveScreenWidth(39) : 0,
  //       duration: 300,
  //       useNativeDriver: false,
  //     }).start(() => setIsLeft(!isLeft));
  //   }
  // };
  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  const translateY = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: selectedProducts.length > 0 ? 0 : 100,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [selectedProducts.length]);

  const slideAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (searchBox) {
      Animated.timing(slideAnim2, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim2, {
        toValue: responsiveScreenHeight(80),
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [searchBox]);

  // ______________________________For items add_________________________________
  const handleAdd = (id: any, url: string) => {
    setSelectedQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));

    setSelectedProducts(prev => {
      const existingIndex = prev.findIndex(item => item.id === id);
      if (existingIndex !== -1) {
        // Update quantity
        const updatedProducts = [...prev];
        updatedProducts[existingIndex].quantity += 1;
        return updatedProducts;
      } else {
        // Add new product
        return [...prev, {id, url, quantity: 1}];
      }
    });
  };
  // ______________________________END_________________________________

  // ______________________________For items add_________________________________
  const handleRemove = (id: any) => {
    setSelectedQuantities(prev => {
      const updated = {...prev};
      if (updated[id] > 1) {
        updated[id] -= 1;
      } else {
        delete updated[id]; // Remove if quantity becomes 0
      }
      return updated;
    });

    setSelectedProducts(
      prev =>
        prev
          .map(item =>
            item.id === id ? {...item, quantity: item.quantity - 1} : item,
          )
          .filter(item => item.quantity > 0), // Remove if quantity is 0
    );
  };
  // ______________________________END_________________________________

  const toolsImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtbWVyfGVufDB8fDB8fHww',
      name: 'Angle Grinder',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1622044939413-0b829c342434?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Hammer',
    },
    {
      id: 3,
      url: 'https://plus.unsplash.com/premium_photo-1677009835565-1f6eb4cf4f63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHRvb2xzfGVufDB8fDB8fHww',
      name: 'Electric Drill',
    },
    {
      id: 4,
      url: 'https://plus.unsplash.com/premium_photo-1677697324819-51565a751caa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fHRvb2xzfGVufDB8fDB8fHww',
      name: 'Hand Saw',
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1559647746-9b2f216d2dc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHRvb2xzfGVufDB8fDB8fHww',
      name: 'Jigsaw Cutter',
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1597066157837-5084c251fa34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fHRvb2xzfGVufDB8fDB8fHww',
      name: 'Welding Machine',
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1596213812335-ac67c2d653d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fHRvb2xzfGVufDB8fDB8fHww',
      name: 'Circular Saw',
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1581621293775-7aac902d7032?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fHRvb2xzfGVufDB8fDB8fHww',
      name: 'Bench Grinder',
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1513467655676-561b7d489a88?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA3fHx0b29sc3xlbnwwfHwwfHx8MA%3D%3D',
      name: 'Screwdriver Set',
    },
  ];

  const categories = [
    {
      name: 'Tools',
      icon: require('../../../assests/icons/toolsSvg.png'),
    },
    {
      name: 'Machinery',
      icon: require('../../../assests/icons/machinerySvg.png'),
    },
    {
      name: 'Materials',
      icon: require('../../../assests/icons/materialSvg.png'),
    },
  ];

  return (
    <>
      <Header title={'Bag'}>
        <>
          <Pressable onPress={() => setSearchBox(true)}>
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

      <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'white'}}>
        {/* -----------------------------------------Left navigation-------------------------------------------------- */}

        <View
          style={{
            paddingRight: responsiveScreenWidth(1),
            shadowColor: '#000',
            shadowOffset: {width: 2, height: 0},
            shadowOpacity: 0.2,
            shadowRadius: 2,
          }}>
          <View
            style={{
              height: '100%',
              backgroundColor: 'white',
              overflow: 'hidden',
              gap: responsiveScreenHeight(2),
              elevation: 7,
              paddingVertical: responsiveScreenHeight(3),
              paddingHorizontal: responsiveScreenWidth(2),
            }}>
            {categories.map(item => (
              <Pressable
                key={item.name}
                onPress={() => setSelected(item.name)}
                style={{
                  alignItems: 'center',
                  gap: responsiveScreenHeight(1),
                  backgroundColor: color.white,
                }}>
                <View style={{}}>
                  <Shadow
                    distance={selected === item.name ? 8 : 1}
                    startColor={color.black15}
                    offset={[0, 2]}>
                    <View
                      style={{
                        height: responsiveScreenHeight(6),
                        width: responsiveScreenHeight(6),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 50,
                        backgroundColor:
                          selected === item.name
                            ? color.primary
                            : color.primaryLow,
                      }}>
                      <Image
                        source={item.icon}
                        style={{
                          tintColor:
                            selected === item.name
                              ? color.white
                              : color.primary,
                          aspectRatio: 1,
                          height: '55%',
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                  </Shadow>
                </View>
                <Text
                  style={{
                    fontFamily: font.NunitoSemiBold,
                    fontSize: responsiveScreenFontSize(1.7),
                    color:
                      selected === item.name ? color.primary : color.black87,
                  }}>
                  {item.name}
                </Text>
              </Pressable>
            ))}
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
              gap: responsiveScreenHeight(1.5),
              paddingHorizontal: responsiveScreenWidth(2.5),
              paddingVertical: responsiveScreenHeight(3),
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {toolsImages.map(name => {
              const selectedQty = selectedQuantities[name.id] || 0;
              return (
                <View
                  style={{
                    height: responsiveScreenHeight(21),
                    width: responsiveScreenWidth(34),
                    gap: responsiveScreenHeight(0.5),
                    position: 'relative',
                    zIndex: 1,
                  }}>
                  {/* ------------------------Image----------------------- */}
                  <View
                    style={{
                      width: '100%',
                      height: '70%',
                      borderRadius: 15,
                      overflow: 'hidden',
                    }}>
                    <Image
                      source={{
                        uri: name.url,
                      }}
                      style={{
                        aspectRatio: 1,
                        objectFit: 'cover',
                      }}
                    />
                  </View>
                  {/* -------------------Button View---------------- */}

                  {/* for addd------------------------------------------- */}
                  {selectedQty === 0 && (
                    <Pressable
                      onPress={() => {
                        triggerHaptic('impactMedium');
                        setQuantity(1);
                        handleAdd(name.id, name.url);
                      }}
                      style={{
                        position: 'absolute',
                        bottom: responsiveScreenHeight(5.7),
                        right: -responsiveScreenWidth(1),
                        zIndex: 2,
                      }}>
                      <Text
                        style={{
                          fontFamily: font.NunitoMedium,
                          fontSize: responsiveScreenFontSize(1.5),
                          color: color.primary,
                          paddingHorizontal: responsiveScreenWidth(5),
                          paddingVertical: responsiveScreenHeight(0.8),
                          backgroundColor: color.primaryLow,
                          borderRadius: 20,
                          borderWidth: 1.5,
                          borderColor: color.primary,
                        }}>
                        Add
                      </Text>
                    </Pressable>
                  )}

                  {/* for grades------------------------------------------- */}
                  {/* <Pressable
                    onPress={() => setModalVisible(true)}
                    style={{
                      position: 'absolute',
                      bottom: responsiveScreenHeight(5.7),
                      right: -responsiveScreenWidth(1),
                      zIndex: 2,
                      paddingHorizontal: responsiveScreenWidth(3.5),
                      paddingVertical: responsiveScreenHeight(0.8),
                      borderRadius: 20,
                      borderWidth: 1.5,
                      backgroundColor: color.primaryLow,
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderColor: color.primary,
                    }}>
                    <Text
                      style={{
                        fontFamily: font.NunitoMedium,
                        fontSize: responsiveScreenFontSize(1.5),
                        color: color.primary,
                      }}>
                      3 Grades
                    </Text>
                    <View
                      style={{
                        height: responsiveScreenHeight(2),
                        width: responsiveScreenHeight(2),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                      }}>
                      <Image
                        source={require('../../../assests/icons/chevron-down.png')}
                        style={{
                          tintColor: color.primary,
                          aspectRatio: 1,
                          height: '100%',
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                  </Pressable> */}

                  {/* for Quantity------------------------------------------------------- */}
                  {selectedQty >= 1 && (
                    <View
                      style={{
                        position: 'absolute',
                        bottom: responsiveScreenHeight(6),
                        right: -responsiveScreenWidth(1),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: responsiveScreenWidth(22),
                        height: responsiveScreenHeight(3.5),
                        backgroundColor: color.primaryLow,
                        borderRadius: 50,
                        borderWidth: 1,
                        paddingHorizontal: responsiveScreenWidth(0.5),
                      }}>
                      <Pressable
                        onPress={() => {
                          triggerHaptic('impactMedium');
                          if (quantity > 0) {
                            let val = quantity - 1;
                            setQuantity(val);
                          }
                          handleRemove(name.id);
                        }}
                        style={{
                          height: responsiveScreenHeight(2.8),
                          width: responsiveScreenHeight(2.8),
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
                        {selectedQty}
                      </Text>

                      <Pressable
                        onPress={() => {
                          triggerHaptic('impactMedium');
                          let val = quantity + 1;
                          setQuantity(val);
                          handleAdd(name.id, name.url);
                        }}
                        style={{
                          height: responsiveScreenHeight(2.8),
                          width: responsiveScreenHeight(2.8),
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
                  )}

                  {/* ------------------Bottom--------------------- */}
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
                      fontFamily: font.NunitoSemiBold,
                      fontSize: responsiveScreenFontSize(1.8),
                      color: color.black87,
                      marginLeft: responsiveScreenWidth(1),
                    }}>
                    {name.name}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>

        {/* ------------------------------Cart button--------------------------------- */}
        {selectedProducts.length && (
          <Animated.View
            style={{
              width: '100%',
              position: 'absolute',
              bottom: responsiveScreenHeight(3), // Keep it at the bottom of the screen
              transform: [{translateY}], // Apply animation effect
              alignSelf: 'center',
            }}>
            <Pressable onPress={() => navigation.navigate(routes.CART_VIEW)}>
              <ComponentLinear
                colors={['#00596B', '#004350']} // Dark gradient background
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  minWidth: responsiveScreenWidth(40), // Ensures minimum width but expands dynamically
                  maxWidth: responsiveScreenWidth(80), // Optional: Prevents excessive width
                  height: responsiveScreenHeight(7.5),
                  borderRadius: 50,
                  paddingHorizontal: responsiveScreenWidth(2),
                  elevation: 5, // Shadow effect
                  gap: responsiveScreenWidth(2),
                  alignSelf: 'center', // Ensures inner component is centered
                }}>
                {/* Product Images */}
                <View
                  style={{
                    height: responsiveScreenHeight(4),
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  {selectedProducts.slice(0, 3).map((val, index) => (
                    <View
                      key={index}
                      style={{
                        height: responsiveScreenHeight(5),
                        aspectRatio: 1,
                        borderRadius: 1000,
                        borderWidth: responsiveScreenWidth(0.5),
                        borderColor: color.primary,
                        overflow: 'hidden',
                        marginLeft:
                          index === 0 ? 0 : -responsiveScreenWidth(5.5),
                      }}>
                      <Image
                        source={{uri: val.url}}
                        style={{
                          height: '100%',
                          width: '100%',
                          resizeMode: 'cover',
                        }}
                      />
                    </View>
                  ))}
                </View>

                {/* Cart Text Info */}
                <View
                  style={{
                    gap: responsiveScreenHeight(0.4),
                  }}>
                  <Text
                    style={{
                      fontFamily: font.NunitoSemiBold,
                      fontSize: responsiveScreenFontSize(2),
                      color: color.white,
                      marginLeft: responsiveScreenWidth(1),
                    }}>
                    View Cart
                  </Text>
                  <Text
                    style={{
                      fontFamily: font.NunitoSemiBold,
                      fontSize: responsiveScreenFontSize(1.4),
                      color: color.white,
                      marginLeft: responsiveScreenWidth(1),
                    }}>
                    {selectedProducts.length} items
                  </Text>
                </View>

                {/* Arrow Icon */}
                <View
                  style={{
                    height: responsiveScreenHeight(5),
                    width: responsiveScreenHeight(5),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    backgroundColor: '#00000047',
                    marginLeft: responsiveScreenWidth(3),
                  }}>
                  <Image
                    source={require('../../../assests/icons/chevron-right.png')}
                    style={{
                      tintColor: color.white,
                      aspectRatio: 1,
                      height: '55%',
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              </ComponentLinear>
            </Pressable>
          </Animated.View>
        )}
      </View>

      {searchBox && (
        <Animated.View
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            zIndex: 1,
            transform: [{translateY: slideAnim2}],
          }}>
          <View
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              backgroundColor: color.black15, // Light transparent background
            }}>
            <BlurView
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                pointerEvents: 'none',
              }}
              blurType="light" // Options: 'light', 'dark', 'extraLight', 'regular'
              blurAmount={35} // Adjust blur intensity
            />
            <View
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                backgroundColor: 'transparent',
                paddingHorizontal: responsiveScreenWidth(3),
                paddingTop: responsiveScreenHeight(6),
                paddingBottom: responsiveScreenHeight(3),
                justifyContent: 'space-between',
                gap: responsiveScreenHeight(2),
              }}>
              {/* ----------------------------Top heading---------------------- */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: color.black87,
                    fontFamily: font.NunitoSemiBold,
                    fontSize: responsiveScreenFontSize(2.5),
                    width: responsiveScreenWidth(80),
                  }}>
                  Type something
                </Text>

                <Pressable
                  onPress={() => setSearchBox(false)}
                  style={{
                    width: responsiveScreenWidth(8),
                    justifyContent: 'center',
                    alignItems: 'center',
                    aspectRatio: 1,
                    borderRadius: 25,
                  }}>
                  <Image
                    source={require(`../../../assests/icons/x.png`)}
                    style={{
                      height: '80%',
                      aspectRatio: 1,
                      tintColor: color.black87,
                    }}
                  />
                </Pressable>
              </View>

              {/* ----------------------Search itmes------------------------ */}
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: responsiveScreenWidth(1),
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
                              fontSize: responsiveScreenFontSize(1.1),
                              fontFamily: font.NunitoSemiBold,
                            }}>
                            Tokio
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
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: responsiveScreenWidth(22),
                      height: responsiveScreenHeight(3.5),
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
                              fontSize: responsiveScreenFontSize(1.1),
                              fontFamily: font.NunitoSemiBold,
                            }}>
                            Tokio
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
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: responsiveScreenWidth(22),
                      height: responsiveScreenHeight(3.5),
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
                              fontSize: responsiveScreenFontSize(1.1),
                              fontFamily: font.NunitoSemiBold,
                            }}>
                            Tokio
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
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: responsiveScreenWidth(22),
                      height: responsiveScreenHeight(3.5),
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
              </View>

              {/* ----------------------------searchbar---------------------- */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: color.white,
                  borderRadius: 30,
                  paddingHorizontal: responsiveScreenWidth(2.5),
                  paddingVertical: responsiveScreenHeight(0.5),
                }}>
                <View
                  style={{
                    width: responsiveScreenWidth(8),
                    justifyContent: 'center',
                    alignItems: 'center',
                    aspectRatio: 1,
                    borderRadius: 25,
                  }}>
                  <Image
                    source={require(`../../../assests/icons/search.png`)}
                    style={{
                      height: '80%',
                      aspectRatio: 1,
                      tintColor: color.black28,
                    }}
                  />
                </View>
                <View
                  style={{
                    width: responsiveScreenWidth(70),
                  }}>
                  <TextInput
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="Search Items"
                    placeholderTextColor={color.black28}
                    style={{
                      color: color.black60,
                      fontSize: responsiveScreenFontSize(2),
                    }}
                  />
                </View>
                <Pressable
                  onPress={() => setSearchText('')}
                  style={{
                    width: responsiveScreenWidth(8),
                    justifyContent: 'center',
                    alignItems: 'center',
                    aspectRatio: 1,
                    borderRadius: 25,
                  }}>
                  <Image
                    source={require(`../../../assests/icons/x.png`)}
                    style={{
                      height: '80%',
                      aspectRatio: 1,
                      tintColor: color.black28,
                    }}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </Animated.View>
      )}
    </>
  );
};

export default PMBag;
