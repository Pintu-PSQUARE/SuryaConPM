/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, ProgressButton} from '../../component';
import {
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {color, font} from '../../config/Env';
import {SvgXml} from 'react-native-svg';
import {logoSvgPrimary, logoSvgRed, logoSvgSecondary} from '../../svg';
import Entypo from 'react-native-vector-icons/Entypo';
import {Shadow} from 'react-native-shadow-2';

const MaterialUsed = () => {
  //   const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [data, setData] = useState<{
    title: string;
    description: string;
    priority: 'normal' | 'urgent';
    participants: any[];
    date?: Date;
  }>({
    date: undefined,
    title: '',
    description: '',
    priority: 'normal',
    participants: [],
  });

  //   const dispatch = useAppDispatch();

  return (
    <>
      <View style={{flex: 1, backgroundColor:'white'}}>
        <Header title={'Tower A2'} />

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: responsiveScreenHeight(2),
            backgroundColor: color.white,
          }}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={true}>
          <View
            style={{
              gap: responsiveScreenHeight(1),
              paddingHorizontal: responsiveScreenWidth(4),
              paddingVertical: responsiveScreenHeight(2),
              backgroundColor: color.white,
            }}>
            <Shadow distance={10} startColor={color.black15} offset={[0, 0]}>
              <View
                style={{
                  backgroundColor: color.white,
                  borderRadius: 20,
                  paddingHorizontal: responsiveScreenWidth(2.5),
                  paddingVertical: responsiveScreenHeight(2),
                  height: '100%',
                }}>
                {/* =====================================================Progress Button========================================= */}
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginBottom: responsiveHeight(1.5),
                  }}>
                  <ProgressButton
                    color={color.secondary}
                    bgColor={color.white}
                    percentage={41}
                    title="Material Used"
                  />
                </View>

                {/* =====================================================Floor view========================================= */}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: responsiveScreenHeight(1),
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        height: responsiveScreenHeight(2.2),
                        aspectRatio: 1,
                        marginRight: responsiveScreenWidth(1),
                      }}>
                      <SvgXml
                        height={'100%'}
                        xml={logoSvgPrimary}
                        color={'#00596B'}
                      />
                    </View>
                    <Text
                      style={{
                        fontFamily: font.NunitoMedium,
                        color: color.black87,
                        fontSize: responsiveScreenFontSize(1.8),
                        fontWeight: '400',
                        marginRight: responsiveScreenWidth(1),
                      }}>
                      10th Floor
                    </Text>
                  </View>
                  <View
                    style={{
                      height: responsiveScreenHeight(3.5),
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: '75%',
                        aspectRatio: 1,
                        borderRadius: 1000,
                        overflow: 'hidden',
                        backgroundColor: '#F0F6F6',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: font.NunitoMedium,
                          color: color.primary,
                          fontSize: responsiveScreenFontSize(1.5),
                        }}>
                        5
                      </Text>
                    </View>
                  </View>
                </View>

                {/* =====================================================Cards========================================= */}

                <View
                  style={{
                    width: '100%',
                    height: responsiveScreenHeight(8),
                    borderRadius: 15,
                    position: 'relative',
                    overflow: 'hidden',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: responsiveScreenHeight(1),
                    backgroundColor: color.white,
                  }}>
                  <View
                    style={{
                      height: '96%',
                      width: '48%',
                      backgroundColor: color.gray,
                      borderRadius: 15,
                      elevation: 0.5,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.1,
                      shadowRadius: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      paddingBottom: responsiveScreenHeight(0.5),
                    }}>
                    <Text
                      style={{
                        fontFamily: font.NunitoSemiBold,
                        color: color.black87,
                        fontSize: responsiveScreenFontSize(1.5),
                        opacity: 0.8,
                      }}>
                      Ambuja
                    </Text>
                  </View>
                  <View
                    style={{
                      height: '96%',
                      width: '48%',
                      backgroundColor: color.gray,
                      borderRadius: 15,
                      elevation: 0.5,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.1,
                      shadowRadius: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      paddingBottom: responsiveScreenHeight(0.5),
                    }}>
                    <Text
                      style={{
                        opacity: 0.8,
                        fontFamily: font.NunitoSemiBold,
                        color: color.black87,
                        fontSize: responsiveScreenFontSize(1.5),
                      }}>
                      Grade A
                    </Text>
                  </View>

                  {/* -----------------Progress view------------------ */}

                  <View
                    style={{
                      height: responsiveScreenHeight(4.8),
                      width: '98%',
                      position: 'absolute',
                      borderRadius: 10,
                      top: 2,
                      backgroundColor: color.white,
                    }}>
                    <Shadow
                      distance={4}
                      startColor={color.gray2}
                      offset={[0, 0]}
                      style={{
                        width: '100%',
                      }}>
                      <View
                        style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: 10,
                          paddingLeft: responsiveScreenWidth(0.5),
                          paddingVertical: responsiveScreenHeight(0.3),
                          backgroundColor: color.white,
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            borderRadius: 10,
                            backgroundColor: color.white,
                          }}>
                          <View
                            style={{
                              height: '100%',
                              width: '40%',
                              backgroundColor: color.gray3,
                              borderRadius: 10,
                            }}></View>
                          <View
                            style={{
                              height: '100%',
                              width: '100%',
                              position: 'absolute',
                              alignSelf: 'center',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              paddingLeft: responsiveScreenWidth(2.5),
                            }}>
                            <Text
                              style={{
                                fontFamily: font.NunitoMedium,
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.8),
                                opacity: 0.9,
                              }}>
                              Cement
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: font.NunitoMedium,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.7),
                                }}>
                                500
                              </Text>
                              <View
                                style={{
                                  height: responsiveScreenHeight(1.4),
                                  aspectRatio: 1,
                                  marginHorizontal: responsiveScreenWidth(0.5),
                                  marginRight: responsiveScreenWidth(1),
                                }}>
                                <SvgXml
                                  height={'100%'}
                                  xml={logoSvgPrimary}
                                  color={'#00596B'}
                                />
                              </View>
                              <Text
                                style={{
                                  fontFamily: font.NunitoMedium,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.7),
                                }}>
                                1000
                              </Text>
                              <View
                                style={{
                                  width: responsiveScreenWidth(8),
                                  height: responsiveScreenHeight(2.1),
                                  backgroundColor: color.primary,
                                  borderBottomLeftRadius: 10,
                                  borderTopLeftRadius: 10,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  marginLeft: responsiveScreenWidth(1.5),
                                }}>
                                <Text
                                  style={{
                                    fontFamily: font.NunitoSemiBold,
                                    color: color.white,
                                    fontSize: responsiveScreenFontSize(1),
                                  }}>
                                  Bags
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Shadow>
                  </View>
                </View>

                {/* -------------------card1------------------------ */}

                <View
                  style={{
                    width: '100%',
                    height: responsiveScreenHeight(8),
                    borderRadius: 15,
                    position: 'relative',
                    overflow: 'hidden',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: responsiveScreenHeight(1),
                    backgroundColor: color.white,
                  }}>
                  <View
                    style={{
                      height: '96%',
                      width: '48%',
                      backgroundColor: color.gray,
                      borderRadius: 15,
                      elevation: 0.5,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.1,
                      shadowRadius: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      paddingBottom: responsiveScreenHeight(0.5),
                    }}>
                    <Text
                      style={{
                        fontFamily: font.NunitoSemiBold,
                        color: color.black87,
                        fontSize: responsiveScreenFontSize(1.5),
                        opacity: 0.8,
                      }}>
                      Ambuja
                    </Text>
                  </View>
                  <View
                    style={{
                      height: '96%',
                      width: '48%',
                      backgroundColor: color.gray,
                      borderRadius: 15,
                      elevation: 0.5,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.1,
                      shadowRadius: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      paddingBottom: responsiveScreenHeight(0.5),
                    }}>
                    <Text
                      style={{
                        opacity: 0.8,
                        fontFamily: font.NunitoSemiBold,
                        color: color.black87,
                        fontSize: responsiveScreenFontSize(1.5),
                      }}>
                      Grade A
                    </Text>
                  </View>

                  {/* -----------------Progress view------------------ */}

                  <View
                    style={{
                      height: responsiveScreenHeight(4.8),
                      width: '98%',
                      position: 'absolute',
                      borderRadius: 10,
                      top: 2,
                      backgroundColor: color.white,
                    }}>
                    <Shadow
                      distance={4}
                      startColor={color.gray2}
                      offset={[0, 0]}
                      style={{
                        width: '100%',
                      }}>
                      <View
                        style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: 10,
                          paddingLeft: responsiveScreenWidth(0.5),
                          paddingVertical: responsiveScreenHeight(0.3),
                          backgroundColor: color.white,
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            borderRadius: 10,
                            backgroundColor: color.white,
                          }}>
                          <View
                            style={{
                              height: '100%',
                              width: '70%',
                              backgroundColor: color.secondaryLow,
                              borderRadius: 10,
                            }}></View>
                          <View
                            style={{
                              height: '100%',
                              width: '100%',
                              position: 'absolute',
                              alignSelf: 'center',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              paddingLeft: responsiveScreenWidth(2.5),
                            }}>
                            <Text
                              style={{
                                fontFamily: font.NunitoMedium,
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.8),
                                opacity: 0.9,
                              }}>
                              Bricks
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: font.NunitoMedium,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.7),
                                }}>
                                500
                              </Text>
                              <View
                                style={{
                                  height: responsiveScreenHeight(1.4),
                                  aspectRatio: 1,
                                  marginHorizontal: responsiveScreenWidth(0.5),
                                  marginRight: responsiveScreenWidth(1),
                                }}>
                                <SvgXml
                                  height={'100%'}
                                  xml={logoSvgSecondary}
                                  color={color.secondary}
                                />
                              </View>
                              <Text
                                style={{
                                  fontFamily: font.NunitoMedium,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.7),
                                }}>
                                1000
                              </Text>
                              <View
                                style={{
                                  width: responsiveScreenWidth(8),
                                  height: responsiveScreenHeight(2.1),
                                  backgroundColor: color.secondary,
                                  borderBottomLeftRadius: 10,
                                  borderTopLeftRadius: 10,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  marginLeft: responsiveScreenWidth(1.5),
                                }}>
                                <Text
                                  style={{
                                    fontFamily: font.NunitoSemiBold,
                                    color: color.white,
                                    fontSize: responsiveScreenFontSize(1),
                                  }}>
                                  No's
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Shadow>
                  </View>
                </View>

                {/* -------------------card2------------------------ */}

                <View
                  style={{
                    width: '100%',
                    height: responsiveScreenHeight(8),
                    borderRadius: 15,
                    position: 'relative',
                    overflow: 'hidden',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: responsiveScreenHeight(1),
                    backgroundColor: color.white,
                  }}>
                  <View
                    style={{
                      height: '96%',
                      width: '48%',
                      backgroundColor: color.gray,
                      borderRadius: 15,
                      elevation: 0.5,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.2,
                      shadowRadius: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      paddingBottom: responsiveScreenHeight(0.5),
                    }}>
                    <Text
                      style={{
                        fontFamily: font.NunitoSemiBold,
                        color: color.black87,
                        fontSize: responsiveScreenFontSize(1.5),
                        opacity: 0.8,
                      }}>
                      Ambuja
                    </Text>
                  </View>
                  <View
                    style={{
                      height: '96%',
                      width: '48%',
                      backgroundColor: color.gray,
                      borderRadius: 15,
                      elevation: 0.5,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.1,
                      shadowRadius: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      paddingBottom: responsiveScreenHeight(0.5),
                    }}>
                    <Text
                      style={{
                        opacity: 0.8,
                        fontFamily: font.NunitoSemiBold,
                        color: color.black87,
                        fontSize: responsiveScreenFontSize(1.5),
                      }}>
                      Grade A
                    </Text>
                  </View>

                  {/* -----------------Progress view------------------ */}

                  <View
                    style={{
                      height: responsiveScreenHeight(4.8),
                      width: '98%',
                      position: 'absolute',
                      borderRadius: 10,
                      top: 2,
                      backgroundColor: color.white,
                    }}>
                    <Shadow
                      distance={4}
                      startColor={color.gray2}
                      offset={[0, 0]}
                      style={{
                        width: '100%',
                      }}>
                      <View
                        style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: 10,
                          paddingLeft: responsiveScreenWidth(0.5),
                          paddingVertical: responsiveScreenHeight(0.3),
                          backgroundColor: color.white,
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            borderRadius: 10,
                            backgroundColor: color.white,
                          }}>
                          <View
                            style={{
                              height: '100%',
                              width: '50%',
                              backgroundColor: color.redLow,
                              borderRadius: 10,
                            }}></View>
                          <View
                            style={{
                              height: '100%',
                              width: '100%',
                              position: 'absolute',
                              alignSelf: 'center',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              paddingLeft: responsiveScreenWidth(2.5),
                            }}>
                            <Text
                              style={{
                                fontFamily: font.NunitoMedium,
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.8),
                                opacity: 0.9,
                              }}>
                              Sand
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: font.NunitoMedium,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.7),
                                }}>
                                500
                              </Text>
                              <View
                                style={{
                                  height: responsiveScreenHeight(1.4),
                                  aspectRatio: 1,
                                  marginHorizontal: responsiveScreenWidth(0.5),
                                  marginRight: responsiveScreenWidth(1),
                                }}>
                                <SvgXml
                                  height={'100%'}
                                  xml={logoSvgRed}
                                  color={'#00596B'}
                                />
                              </View>
                              <Text
                                style={{
                                  fontFamily: font.NunitoMedium,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.7),
                                }}>
                                1000
                              </Text>
                              <View
                                style={{
                                  width: responsiveScreenWidth(8),
                                  height: responsiveScreenHeight(2.1),
                                  backgroundColor: color.red,
                                  borderBottomLeftRadius: 10,
                                  borderTopLeftRadius: 10,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  marginLeft: responsiveScreenWidth(1.5),
                                }}>
                                <Text
                                  style={{
                                    fontFamily: font.NunitoSemiBold,
                                    color: color.white,
                                    fontSize: responsiveScreenFontSize(1),
                                  }}>
                                  Sqm
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Shadow>
                  </View>
                </View>

                {/* -------------------card3------------------------ */}

                <View
                  style={{
                    width: '100%',
                    height: responsiveScreenHeight(8),
                    borderRadius: 15,
                    position: 'relative',
                    overflow: 'hidden',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: responsiveScreenHeight(1),
                    backgroundColor: color.white,
                  }}>
                  <View
                    style={{
                      height: '96%',
                      width: '48%',
                      backgroundColor: color.gray,
                      borderRadius: 15,
                      elevation: 0.5,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.1,
                      shadowRadius: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      paddingBottom: responsiveScreenHeight(0.5),
                    }}>
                    <Text
                      style={{
                        fontFamily: font.NunitoSemiBold,
                        color: color.black87,
                        fontSize: responsiveScreenFontSize(1.5),
                        opacity: 0.8,
                      }}>
                      Ambuja
                    </Text>
                  </View>
                  <View
                    style={{
                      height: '96%',
                      width: '48%',
                      backgroundColor: color.gray,
                      borderRadius: 15,
                      elevation: 0.5,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.1,
                      shadowRadius: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      paddingBottom: responsiveScreenHeight(0.5),
                    }}>
                    <Text
                      style={{
                        opacity: 0.8,
                        fontFamily: font.NunitoSemiBold,
                        color: color.black87,
                        fontSize: responsiveScreenFontSize(1.5),
                      }}>
                      Grade A
                    </Text>
                  </View>

                  {/* -----------------Progress view------------------ */}

                  <View
                    style={{
                      height: responsiveScreenHeight(4.8),
                      width: '98%',
                      position: 'absolute',
                      borderRadius: 10,
                      top: 2,
                      backgroundColor: color.white,
                    }}>
                    <Shadow
                      distance={4}
                      startColor={color.gray2}
                      offset={[0, 0]}
                      style={{
                        width: '100%',
                      }}>
                      <View
                        style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: 10,
                          paddingLeft: responsiveScreenWidth(0.5),
                          paddingVertical: responsiveScreenHeight(0.3),
                          backgroundColor: color.white,
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            borderRadius: 10,
                            backgroundColor: color.white,
                          }}>
                          <View
                            style={{
                              height: '100%',
                              width: '30%',
                              backgroundColor: color.redLow,
                              borderRadius: 10,
                            }}></View>
                          <View
                            style={{
                              height: '100%',
                              width: '100%',
                              position: 'absolute',
                              alignSelf: 'center',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              paddingLeft: responsiveScreenWidth(2.5),
                            }}>
                            <Text
                              style={{
                                fontFamily: font.NunitoMedium,
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.8),
                                opacity: 0.9,
                              }}>
                              Plywood
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: font.NunitoMedium,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.7),
                                }}>
                                300
                              </Text>
                              <View
                                style={{
                                  height: responsiveScreenHeight(1.4),
                                  aspectRatio: 1,
                                  marginHorizontal: responsiveScreenWidth(0.5),
                                  marginRight: responsiveScreenWidth(1),
                                }}>
                                <SvgXml
                                  height={'100%'}
                                  xml={logoSvgRed}
                                  color={'#00596B'}
                                />
                              </View>
                              <Text
                                style={{
                                  fontFamily: font.NunitoMedium,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.7),
                                }}>
                                1000
                              </Text>
                              <View
                                style={{
                                  width: responsiveScreenWidth(8),
                                  height: responsiveScreenHeight(2.1),
                                  backgroundColor: color.red,
                                  borderBottomLeftRadius: 10,
                                  borderTopLeftRadius: 10,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  marginLeft: responsiveScreenWidth(1.5),
                                }}>
                                <Text
                                  style={{
                                    fontFamily: font.NunitoSemiBold,
                                    color: color.white,
                                    fontSize: responsiveScreenFontSize(1),
                                  }}>
                                  Sqm
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Shadow>
                  </View>
                </View>

                {/* -------------------card4------------------------ */}

                <View
                  style={{
                    width: '100%',
                    height: responsiveScreenHeight(8),
                    borderRadius: 15,
                    position: 'relative',
                    overflow: 'hidden',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: responsiveScreenHeight(1),
                    backgroundColor: color.white,
                  }}>
                  <View
                    style={{
                      height: '96%',
                      width: '48%',
                      backgroundColor: color.gray,
                      borderRadius: 15,
                      elevation: 0.5,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.1,
                      shadowRadius: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      paddingBottom: responsiveScreenHeight(0.5),
                    }}>
                    <Text
                      style={{
                        fontFamily: font.NunitoSemiBold,
                        color: color.black87,
                        fontSize: responsiveScreenFontSize(1.5),
                        opacity: 0.8,
                      }}>
                      Ambuja
                    </Text>
                  </View>
                  <View
                    style={{
                      height: '96%',
                      width: '48%',
                      backgroundColor: color.gray,
                      borderRadius: 15,
                      elevation: 0.5,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.1,
                      shadowRadius: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      paddingBottom: responsiveScreenHeight(0.5),
                    }}>
                    <Text
                      style={{
                        opacity: 0.8,
                        fontFamily: font.NunitoSemiBold,
                        color: color.black87,
                        fontSize: responsiveScreenFontSize(1.5),
                      }}>
                      Grade A
                    </Text>
                  </View>

                  {/* -----------------Progress view------------------ */}

                  <View
                    style={{
                      height: responsiveScreenHeight(4.8),
                      width: '98%',
                      position: 'absolute',
                      borderRadius: 10,
                      top: 2,
                      backgroundColor: color.white,
                    }}>
                    <Shadow
                      distance={4}
                      startColor={color.gray2}
                      offset={[0, 0]}
                      style={{
                        width: '100%',
                      }}>
                      <View
                        style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: 10,
                          paddingLeft: responsiveScreenWidth(0.5),
                          paddingVertical: responsiveScreenHeight(0.3),
                          backgroundColor: color.white,
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            borderRadius: 10,
                            backgroundColor: color.white,
                          }}>
                          <View
                            style={{
                              height: '100%',
                              width: '58%',
                              backgroundColor: color.gray3,
                              borderRadius: 10,
                            }}></View>
                          <View
                            style={{
                              height: '100%',
                              width: '100%',
                              position: 'absolute',
                              alignSelf: 'center',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              paddingLeft: responsiveScreenWidth(2.5),
                            }}>
                            <Text
                              style={{
                                fontFamily: font.NunitoMedium,
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.8),
                                opacity: 0.9,
                              }}>
                              Iron Bars
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: font.NunitoMedium,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.7),
                                }}>
                                550
                              </Text>
                              <View
                                style={{
                                  height: responsiveScreenHeight(1.4),
                                  aspectRatio: 1,
                                  marginHorizontal: responsiveScreenWidth(0.5),
                                  marginRight: responsiveScreenWidth(1),
                                }}>
                                <SvgXml
                                  height={'100%'}
                                  xml={logoSvgPrimary}
                                  color={'#00596B'}
                                />
                              </View>
                              <Text
                                style={{
                                  fontFamily: font.NunitoMedium,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.7),
                                }}>
                                1000
                              </Text>
                              <View
                                style={{
                                  width: responsiveScreenWidth(8),
                                  height: responsiveScreenHeight(2.1),
                                  backgroundColor: color.primary,
                                  borderBottomLeftRadius: 10,
                                  borderTopLeftRadius: 10,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  marginLeft: responsiveScreenWidth(1.5),
                                }}>
                                <Text
                                  style={{
                                    fontFamily: font.NunitoSemiBold,
                                    color: color.white,
                                    fontSize: responsiveScreenFontSize(1),
                                  }}>
                                  Bags
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
            </Shadow>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default MaterialUsed;
