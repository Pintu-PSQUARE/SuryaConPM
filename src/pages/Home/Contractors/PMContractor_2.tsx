/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, Pressable, FlatList} from 'react-native';
import React, {useState} from 'react';
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
import {
  Header,
  LinearGradient as CustomLinearGradient,
} from '../../../component';
import useHapticFeedback from '../../../hooks/useHapticFeedback';

const PMContractor_2 = () => {
  const {triggerHaptic} = useHapticFeedback();

  const navigation: NavigationProp<ParamListBase> = useNavigation();

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

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title={'Contractors'} />

      {/* ------------------------------Tools--------------------------------- */}
      <View style={{flex: 1}}>
        <View
          style={{
            paddingHorizontal: responsiveScreenWidth(3),
            paddingTop: responsiveScreenHeight(1.5),
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
                // onPress={() => handlePressToggleButton(item._id)}
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

          <View
            style={{
              height: responsiveScreenHeight(5), // Expands height first
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
          </View>
        </View>
        {/* ___________________________________Details flatlist__________________________________ */}
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
                      borderRadius: 20,
                      //   overflow: 'hidden',
                      minHeight: responsiveScreenHeight(9.7),
                      backgroundColor: color.white,
                      overflow: 'hidden',
                      paddingLeft: responsiveScreenWidth(3.5),
                    }}>
                    {/* -----------------------Top--------------------- */}
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: color.primaryLow,
                          height: responsiveScreenHeight(2.6),
                          width: responsiveScreenWidth(38),
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingLeft: responsiveScreenWidth(2),
                          borderRadius: 25,
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: color.primary,
                              fontSize: responsiveScreenFontSize(1.5),
                              fontFamily: font.NunitoMedium,
                            }}>
                            ₹ 12000
                          </Text>
                        </View>
                        <View
                          style={{
                            backgroundColor: color.primary,
                            height: responsiveScreenHeight(2.6),
                            width: responsiveScreenWidth(21),
                            borderTopLeftRadius: 25,
                            borderBottomLeftRadius: 25,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: color.white,
                              fontSize: responsiveScreenFontSize(1.5),
                              fontFamily: font.NunitoMedium,
                            }}>
                            12000 Sft
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* -----------------------middle--------------------- */}
                    <Text
                      style={{
                        color: color.black87,
                        fontSize: responsiveScreenFontSize(2),
                        fontFamily: font.NunitoMedium,
                        marginTop: -responsiveScreenHeight(1),
                        marginBottom: responsiveScreenHeight(1),
                      }}>
                      Internal wiring
                    </Text>

                    {/* -----------------------bottom--------------------- */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingRight: responsiveScreenWidth(3.5),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: color.primaryLow,
                          paddingHorizontal: responsiveScreenWidth(2),
                          paddingVertical: responsiveScreenHeight(0.05),
                          borderRadius: 30,
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveScreenFontSize(1.4),
                            color: color.primary,
                            fontFamily: font.NunitoMedium,
                          }}>
                          Tower A2
                        </Text>
                        <View
                          style={{
                            height: responsiveScreenHeight(0.6),
                            marginHorizontal: responsiveScreenWidth(2),
                            width: responsiveScreenWidth(1.2),
                            borderRadius: 10,
                            backgroundColor: color.primary,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: responsiveScreenFontSize(1.5),
                            color: color.primary,
                            fontFamily: font.NunitoRegular,
                          }}>
                          4th Floor
                        </Text>
                      </View>
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
                            fontSize: responsiveScreenFontSize(1.4),
                            fontFamily: font.NunitoMedium,
                            paddingHorizontal: responsiveScreenWidth(1.8),
                            paddingVertical: responsiveScreenHeight(0.2),
                            backgroundColor: color.primaryLow,
                            borderRadius: 50,
                          }}>
                          Oct 12
                        </Text>

                        <Text
                          style={{
                            color: color.secondary,
                            fontSize: responsiveScreenFontSize(1.4),
                            fontFamily: font.NunitoMedium,
                            paddingHorizontal: responsiveScreenWidth(1.8),
                            paddingVertical: responsiveScreenHeight(0.2),
                            backgroundColor: color.secondaryLow,
                            borderRadius: 50,
                          }}>
                          Oct 12
                        </Text>
                      </View>
                    </View>
                  </View>
                </Shadow>
              </View>
            );
          }}
          contentContainerStyle={{
            paddingHorizontal: responsiveScreenWidth(3),
            paddingBottom: responsiveScreenHeight(1),
          }}
        />

        {/* ==========================================Floating buttons=========================================== */}

        <View
          style={{
            position: 'absolute',
            bottom: responsiveScreenHeight(15),
            right: responsiveScreenWidth(3),
            gap: responsiveScreenHeight(1.5),
            alignItems: 'flex-end',
          }}>
          <Shadow distance={7} startColor={color.black15} offset={[0, 0]}>
            <Pressable
              style={{
                width: responsiveScreenWidth(12),
                borderRadius: 200,
              }}
              onPress={() => {
                navigation.navigate(routes.PM_CONTRACTOR_3);
              }}>
              <CustomLinearGradient
                colors={['#E8B000', '#AE8400']}
                style={{
                  aspectRatio: 1,
                  borderRadius: 200,

                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                direction={'Vertical'}>
                <Image
                  source={require('../../../assests/icons/rupee.png')}
                  style={{
                    height: responsiveScreenHeight(2.5),
                    aspectRatio: 1,
                    tintColor: color.white,
                    resizeMode: 'contain',
                  }}
                />
              </CustomLinearGradient>
            </Pressable>
          </Shadow>
        </View>

        {/* ==========================================Floating amounts=========================================== */}
        <View
          style={{
            position: 'absolute',
            bottom: responsiveScreenHeight(13),
            left: responsiveScreenWidth(0),
            alignItems: 'flex-end',
          }}>
          <Shadow distance={5} startColor={color.black15} offset={[0, 0]}>
            <View
              style={{
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                width: responsiveScreenWidth(25),
                height: responsiveScreenHeight(5),
                overflow: 'hidden',
              }}>
              <CustomLinearGradient
                colors={['#E8B000', '#AE8400']}
                style={{
                  height: '100%',
                  width: '100%',
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}
                direction={'Vertical'}>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    paddingLeft: responsiveScreenWidth(4),
                    paddingVertical: responsiveScreenHeight(0.5),
                  }}>
                  <Text
                    style={{
                      color: color.white,
                      fontSize: responsiveScreenFontSize(1.2),
                      fontFamily: font.NunitoMedium,
                    }}>
                    Advance
                  </Text>
                  <Text
                    style={{
                      color: color.white,
                      fontSize: responsiveScreenFontSize(1.8),
                      fontFamily: font.NunitoMedium,
                    }}>
                    Rs 40,000
                  </Text>
                </View>
              </CustomLinearGradient>
            </View>
          </Shadow>
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: responsiveScreenHeight(7.1),
            left: responsiveScreenWidth(0),
            alignItems: 'flex-end',
          }}>
          <Shadow distance={5} startColor={color.black15} offset={[0, 0]}>
            <View
              style={{
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                width: responsiveScreenWidth(25),
                height: responsiveScreenHeight(5),
                overflow: 'hidden',
              }}>
              <CustomLinearGradient
                style={{
                  height: '100%',
                  width: '100%',
                }}
                direction={'Vertical'}>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    paddingLeft: responsiveScreenWidth(4),
                    paddingVertical: responsiveScreenHeight(0.5),
                  }}>
                  <Text
                    style={{
                      color: color.white,
                      fontSize: responsiveScreenFontSize(1.2),
                      fontFamily: font.NunitoMedium,
                    }}>
                    Payable
                  </Text>
                  <Text
                    style={{
                      color: color.white,
                      fontSize: responsiveScreenFontSize(1.8),
                      fontFamily: font.NunitoMedium,
                    }}>
                    Rs 35,000
                  </Text>
                </View>
              </CustomLinearGradient>
            </View>
          </Shadow>
        </View>
      </View>
    </View>
  );
};

export default PMContractor_2;
