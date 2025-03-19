/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, ProgressButton} from '../../component';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {color, font} from '../../config/Env';
import {SvgXml} from 'react-native-svg';
import {logoSvgPrimary} from '../../svg';
import Entypo from 'react-native-vector-icons/Entypo';
import {Shadow} from 'react-native-shadow-2';

const TargetProgress = () => {
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
      <View style={{flex: 1}}>
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
            <Shadow distance={8} startColor={color.black15} offset={[0, 0]}>
              <View
                style={{
                  //   height: '50%',
                  backgroundColor: color.white,
                  borderRadius: 20,
                }}>
                {/* <View
                  style={{
                    height: responsiveScreenHeight(100),
                    width: responsiveScreenWidth(92),
                  }}>
                  <Image
                    source={require('../../assests/target-progress.png')}
                    style={{
                      // aspectRatio: 9 / 16,
                      width:'100%',
                      height:'100%'
                    }}
                    resizeMode="cover"
                  />
                </View> */}
                <View
                  style={{
                    paddingHorizontal: responsiveScreenWidth(2.5),
                    paddingRight: responsiveScreenWidth(4),
                  }}>
                  {/* =====================================================Progress Button========================================= */}
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      paddingVertical: responsiveScreenHeight(2),
                    }}>
                    <ProgressButton
                      color={color.primary}
                      bgColor={color.white}
                      percentage={80}
                      title="Target Progress"
                    />
                  </View>

                  {/* =====================================================Progress card========================================= */}

                  <View
                    style={{
                      height: responsiveScreenHeight(25),
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    {/* ==============================Left loader part======================= */}

                    <View
                      style={{
                        height: '100%',
                        width: '7%',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          height: responsiveScreenHeight(2),
                          aspectRatio: 1,
                        }}>
                        <SvgXml
                          height={'100%'}
                          xml={logoSvgPrimary}
                          color={'#00596B'}
                        />
                      </View>

                      {/* ==============================Progress bar======================= */}

                      <View
                        style={{
                          height: '65%',
                          width: responsiveScreenWidth(1.4),
                          backgroundColor: color.gray3,
                          borderRadius: 20,
                          marginVertical: responsiveScreenHeight(1),
                          overflow: 'hidden',
                        }}>
                        <View
                          style={{
                            height: '65%',
                            width: '100%',
                            backgroundColor: color.primary,
                            borderRadius: 20,
                          }}></View>
                      </View>

                      <View
                        style={{
                          height: responsiveScreenHeight(2),
                          aspectRatio: 1,
                        }}>
                        <SvgXml
                          height={'100%'}
                          xml={logoSvgPrimary}
                          color={'#00596B'}
                        />
                      </View>
                    </View>

                    {/* ==============================Right part======================= */}

                    <View
                      style={{
                        width: '92%',
                        height: '100%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: -responsiveScreenHeight(0.8),
                        }}>
                        <Text
                          style={{
                            fontFamily: font.NunitoSemiBold,
                            color: color.black87,
                            fontSize: responsiveScreenFontSize(1.5),
                            fontWeight: '400',
                          }}>
                          Aug 11, Wed
                        </Text>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={{
                              fontFamily: font.NunitoSemiBold,
                              color: color.black87,
                              fontSize: responsiveScreenFontSize(1.8),
                              fontWeight: '400',
                              marginRight: responsiveScreenWidth(1),
                            }}>
                            Engineer 1
                          </Text>
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
                                borderRadius: 50,
                                overflow: 'hidden',
                              }}>
                              <Image
                                source={{
                                  uri: 'https://plus.unsplash.com/premium_photo-1737392497675-2e6314d3c73b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                }}
                                style={{
                                  height: '100%',
                                  width: '100%',
                                  resizeMode: 'cover',
                                }}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          height: '65%',
                          width: '100%',
                          backgroundColor: color.gray3,
                          borderRadius: 15,
                          marginVertical: responsiveScreenHeight(0.3),
                          paddingVertical: responsiveScreenHeight(1.5),
                          paddingHorizontal: responsiveScreenWidth(2.5),
                        }}>
                        <Text
                          style={{
                            fontFamily: font.NunitoSemiBold,
                            color: color.black87,
                            fontSize: responsiveScreenFontSize(1.8),
                            fontWeight: '400',
                            marginBottom: responsiveScreenHeight(0.5),
                          }}>
                          12th Floor
                        </Text>
                        <View
                          style={{
                            gap: responsiveScreenHeight(0.5),
                          }}>
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
                              }}>
                              <Entypo
                                name="dot-single"
                                style={{
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(2.5),
                                }}
                              />
                              <Text
                                style={{
                                  fontFamily: font.NunitoRegular,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.5),
                                  fontWeight: '400',
                                }}>
                                Layout
                              </Text>
                            </View>

                            <Text
                              style={{
                                fontFamily: font.NunitoSemiBold,
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.5),
                                fontWeight: '400',
                              }}>
                              34.70 MT
                            </Text>
                          </View>

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
                              }}>
                              <Entypo
                                name="dot-single"
                                style={{
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(2.5),
                                }}
                              />
                              <Text
                                style={{
                                  fontFamily: font.NunitoRegular,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.5),
                                  fontWeight: '400',
                                }}>
                                Vertical Steel Reinforcement
                              </Text>
                            </View>

                            <Text
                              style={{
                                fontFamily: font.NunitoSemiBold,
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.5),
                                fontWeight: '400',
                              }}>
                              2585.00 sqm
                            </Text>
                          </View>

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
                              }}>
                              <Entypo
                                name="dot-single"
                                style={{
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(2.5),
                                }}
                              />
                              <Text
                                style={{
                                  fontFamily: font.NunitoRegular,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.5),
                                  fontWeight: '400',
                                }}>
                                Slab shuttering
                              </Text>
                            </View>

                            <Text
                              style={{
                                fontFamily: font.NunitoSemiBold,
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.5),
                                fontWeight: '400',
                              }}>
                              165.00 cum
                            </Text>
                          </View>

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
                              }}>
                              <Entypo
                                name="dot-single"
                                style={{
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(2.5),
                                }}
                              />
                              <Text
                                style={{
                                  fontFamily: font.NunitoRegular,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.5),
                                  fontWeight: '400',
                                }}>
                                Slab Steel Reinforcement
                              </Text>
                            </View>

                            <Text
                              style={{
                                fontFamily: font.NunitoSemiBold,
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.5),
                                fontWeight: '400',
                              }}>
                              2548 sqm
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: responsiveScreenHeight(0.7),
                        }}>
                        <Text
                          style={{
                            fontFamily: font.NunitoSemiBold,
                            color: color.black87,
                            fontSize: responsiveScreenFontSize(1.5),
                            fontWeight: '400',
                          }}>
                          Aug 15, Mon
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* -------------2----------------- */}
                  <View
                    style={{
                      height: responsiveScreenHeight(25),
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    {/* ==============================Left loader part======================= */}

                    <View
                      style={{
                        height: '100%',
                        width: '7%',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          height: responsiveScreenHeight(2),
                          aspectRatio: 1,
                        }}>
                        <SvgXml
                          height={'100%'}
                          xml={logoSvgPrimary}
                          color={'#00596B'}
                        />
                      </View>

                      {/* ==============================Progress bar======================= */}

                      <View
                        style={{
                          height: '65%',
                          width: responsiveScreenWidth(1.4),
                          backgroundColor: color.gray3,
                          borderRadius: 20,
                          marginVertical: responsiveScreenHeight(1),
                          overflow: 'hidden',
                        }}>
                        <View
                          style={{
                            height: '65%',
                            width: '100%',
                            backgroundColor: color.primary,
                            borderRadius: 20,
                          }}></View>
                      </View>

                      <View
                        style={{
                          height: responsiveScreenHeight(2),
                          aspectRatio: 1,
                        }}>
                        <SvgXml
                          height={'100%'}
                          xml={logoSvgPrimary}
                          color={'#00596B'}
                        />
                      </View>
                    </View>

                    {/* ==============================Right part======================= */}

                    <View
                      style={{
                        width: '92%',
                        height: '100%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: -responsiveScreenHeight(0.8),
                        }}>
                        <Text
                          style={{
                            fontFamily: font.NunitoSemiBold,
                            color: color.black87,
                            fontSize: responsiveScreenFontSize(1.5),
                            fontWeight: '400',
                          }}>
                          Aug 11, Wed
                        </Text>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={{
                              fontFamily: font.NunitoSemiBold,
                              color: color.black87,
                              fontSize: responsiveScreenFontSize(1.8),
                              fontWeight: '400',
                              marginRight: responsiveScreenWidth(1),
                            }}>
                            Engineer 1
                          </Text>
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
                                borderRadius: 50,
                                overflow: 'hidden',
                              }}>
                              <Image
                                source={{
                                  uri: 'https://plus.unsplash.com/premium_photo-1737392497675-2e6314d3c73b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                }}
                                style={{
                                  height: '100%',
                                  width: '100%',
                                  resizeMode: 'cover',
                                }}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          height: '65%',
                          width: '100%',
                          backgroundColor: color.gray3,
                          borderRadius: 15,
                          marginVertical: responsiveScreenHeight(0.3),
                          paddingVertical: responsiveScreenHeight(1.5),
                          paddingHorizontal: responsiveScreenWidth(2.5),
                        }}>
                        <Text
                          style={{
                            fontFamily: font.NunitoSemiBold,
                            color: color.black87,
                            fontSize: responsiveScreenFontSize(1.8),
                            fontWeight: '400',
                            marginBottom: responsiveScreenHeight(0.5),
                          }}>
                          12th Floor
                        </Text>
                        <View
                          style={{
                            gap: responsiveScreenHeight(0.5),
                          }}>
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
                              }}>
                              <Entypo
                                name="dot-single"
                                style={{
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(2.5),
                                }}
                              />
                              <Text
                                style={{
                                  fontFamily: font.NunitoRegular,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.5),
                                  fontWeight: '400',
                                }}>
                                Layout
                              </Text>
                            </View>

                            <Text
                              style={{
                                fontFamily: font.NunitoSemiBold,
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.5),
                                fontWeight: '400',
                              }}>
                              34.70 MT
                            </Text>
                          </View>

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
                              }}>
                              <Entypo
                                name="dot-single"
                                style={{
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(2.5),
                                }}
                              />
                              <Text
                                style={{
                                  fontFamily: font.NunitoRegular,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.5),
                                  fontWeight: '400',
                                }}>
                                Vertical Steel Reinforcement
                              </Text>
                            </View>

                            <Text
                              style={{
                                fontFamily: font.NunitoSemiBold,
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.5),
                                fontWeight: '400',
                              }}>
                              2585.00 sqm
                            </Text>
                          </View>

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
                              }}>
                              <Entypo
                                name="dot-single"
                                style={{
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(2.5),
                                }}
                              />
                              <Text
                                style={{
                                  fontFamily: font.NunitoRegular,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.5),
                                  fontWeight: '400',
                                }}>
                                Slab shuttering
                              </Text>
                            </View>

                            <Text
                              style={{
                                fontFamily: font.NunitoSemiBold,
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.5),
                                fontWeight: '400',
                              }}>
                              165.00 cum
                            </Text>
                          </View>

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
                              }}>
                              <Entypo
                                name="dot-single"
                                style={{
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(2.5),
                                }}
                              />
                              <Text
                                style={{
                                  fontFamily: font.NunitoRegular,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.5),
                                  fontWeight: '400',
                                }}>
                                Slab Steel Reinforcement
                              </Text>
                            </View>

                            <Text
                              style={{
                                fontFamily: font.NunitoSemiBold,
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.5),
                                fontWeight: '400',
                              }}>
                              2548 sqm
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: responsiveScreenHeight(0.7),
                        }}>
                        <Text
                          style={{
                            fontFamily: font.NunitoSemiBold,
                            color: color.black87,
                            fontSize: responsiveScreenFontSize(1.5),
                            fontWeight: '400',
                          }}>
                          Aug 15, Mon
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* -------------3----------------- */}

                  <View
                    style={{
                      height: responsiveScreenHeight(25),
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    {/* ==============================Left loader part======================= */}

                    <View
                      style={{
                        height: '100%',
                        width: '7%',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          height: responsiveScreenHeight(2),
                          aspectRatio: 1,
                        }}>
                        <SvgXml
                          height={'100%'}
                          xml={logoSvgPrimary}
                          color={'#00596B'}
                        />
                      </View>

                      {/* ==============================Progress bar======================= */}

                      <View
                        style={{
                          height: '65%',
                          width: responsiveScreenWidth(1.4),
                          backgroundColor: color.gray3,
                          borderRadius: 20,
                          marginVertical: responsiveScreenHeight(1),
                          overflow: 'hidden',
                        }}>
                        <View
                          style={{
                            height: '65%',
                            width: '100%',
                            backgroundColor: color.primary,
                            borderRadius: 20,
                          }}></View>
                      </View>

                      <View
                        style={{
                          height: responsiveScreenHeight(2),
                          aspectRatio: 1,
                        }}>
                        <SvgXml
                          height={'100%'}
                          xml={logoSvgPrimary}
                          color={'#00596B'}
                        />
                      </View>
                    </View>

                    {/* ==============================Right part======================= */}

                    <View
                      style={{
                        width: '92%',
                        height: '100%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: -responsiveScreenHeight(0.8),
                        }}>
                        <Text
                          style={{
                            fontFamily: font.NunitoSemiBold,
                            color: color.black87,
                            fontSize: responsiveScreenFontSize(1.5),
                            fontWeight: '400',
                          }}>
                          Aug 11, Wed
                        </Text>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={{
                              fontFamily: font.NunitoSemiBold,
                              color: color.black87,
                              fontSize: responsiveScreenFontSize(1.8),
                              fontWeight: '400',
                              marginRight: responsiveScreenWidth(1),
                            }}>
                            Engineer 1
                          </Text>
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
                                borderRadius: 50,
                                overflow: 'hidden',
                              }}>
                              <Image
                                source={{
                                  uri: 'https://plus.unsplash.com/premium_photo-1737392497675-2e6314d3c73b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                }}
                                style={{
                                  height: '100%',
                                  width: '100%',
                                  resizeMode: 'cover',
                                }}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          height: '65%',
                          width: '100%',
                          backgroundColor: color.gray3,
                          borderRadius: 15,
                          marginVertical: responsiveScreenHeight(0.3),
                          paddingVertical: responsiveScreenHeight(1.5),
                          paddingHorizontal: responsiveScreenWidth(2.5),
                        }}>
                        <Text
                          style={{
                            fontFamily: font.NunitoSemiBold,
                            color: color.black87,
                            fontSize: responsiveScreenFontSize(1.8),
                            fontWeight: '400',
                            marginBottom: responsiveScreenHeight(0.5),
                          }}>
                          12th Floor
                        </Text>
                        <View
                          style={{
                            gap: responsiveScreenHeight(0.5),
                          }}>
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
                              }}>
                              <Entypo
                                name="dot-single"
                                style={{
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(2.5),
                                }}
                              />
                              <Text
                                style={{
                                  fontFamily: font.NunitoRegular,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.5),
                                  fontWeight: '400',
                                }}>
                                Layout
                              </Text>
                            </View>

                            <Text
                              style={{
                                fontFamily: font.NunitoSemiBold,
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.5),
                                fontWeight: '400',
                              }}>
                              34.70 MT
                            </Text>
                          </View>

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
                              }}>
                              <Entypo
                                name="dot-single"
                                style={{
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(2.5),
                                }}
                              />
                              <Text
                                style={{
                                  fontFamily: font.NunitoRegular,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.5),
                                  fontWeight: '400',
                                }}>
                                Vertical Steel Reinforcement
                              </Text>
                            </View>

                            <Text
                              style={{
                                fontFamily: font.NunitoSemiBold,
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.5),
                                fontWeight: '400',
                              }}>
                              2585.00 sqm
                            </Text>
                          </View>

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
                              }}>
                              <Entypo
                                name="dot-single"
                                style={{
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(2.5),
                                }}
                              />
                              <Text
                                style={{
                                  fontFamily: font.NunitoRegular,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.5),
                                  fontWeight: '400',
                                }}>
                                Slab shuttering
                              </Text>
                            </View>

                            <Text
                              style={{
                                fontFamily: font.NunitoSemiBold,
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.5),
                                fontWeight: '400',
                              }}>
                              165.00 cum
                            </Text>
                          </View>

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
                              }}>
                              <Entypo
                                name="dot-single"
                                style={{
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(2.5),
                                }}
                              />
                              <Text
                                style={{
                                  fontFamily: font.NunitoRegular,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.5),
                                  fontWeight: '400',
                                }}>
                                Slab Steel Reinforcement
                              </Text>
                            </View>

                            <Text
                              style={{
                                fontFamily: font.NunitoSemiBold,
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.5),
                                fontWeight: '400',
                              }}>
                              2548 sqm
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: responsiveScreenHeight(0.7),
                        }}>
                        <Text
                          style={{
                            fontFamily: font.NunitoSemiBold,
                            color: color.black87,
                            fontSize: responsiveScreenFontSize(1.5),
                            fontWeight: '400',
                          }}>
                          Aug 15, Mon
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* -------------4----------------- */}

                  <View
                    style={{
                      height: responsiveScreenHeight(25),
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    {/* ==============================Left loader part======================= */}

                    <View
                      style={{
                        height: '100%',
                        width: '7%',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          height: responsiveScreenHeight(2),
                          aspectRatio: 1,
                        }}>
                        <SvgXml
                          height={'100%'}
                          xml={logoSvgPrimary}
                          color={'#00596B'}
                        />
                      </View>

                      {/* ==============================Progress bar======================= */}

                      <View
                        style={{
                          height: '65%',
                          width: responsiveScreenWidth(1.4),
                          backgroundColor: color.gray3,
                          borderRadius: 20,
                          marginVertical: responsiveScreenHeight(1),
                          overflow: 'hidden',
                        }}>
                        <View
                          style={{
                            height: '65%',
                            width: '100%',
                            backgroundColor: color.primary,
                            borderRadius: 20,
                          }}></View>
                      </View>

                      <View
                        style={{
                          height: responsiveScreenHeight(2),
                          aspectRatio: 1,
                        }}>
                        <SvgXml
                          height={'100%'}
                          xml={logoSvgPrimary}
                          color={'#00596B'}
                        />
                      </View>
                    </View>

                    {/* ==============================Right part======================= */}

                    <View
                      style={{
                        width: '92%',
                        height: '100%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: -responsiveScreenHeight(0.8),
                        }}>
                        <Text
                          style={{
                            fontFamily: font.NunitoSemiBold,
                            color: color.black87,
                            fontSize: responsiveScreenFontSize(1.5),
                            fontWeight: '400',
                          }}>
                          Aug 11, Wed
                        </Text>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={{
                              fontFamily: font.NunitoSemiBold,
                              color: color.black87,
                              fontSize: responsiveScreenFontSize(1.8),
                              fontWeight: '400',
                              marginRight: responsiveScreenWidth(1),
                            }}>
                            Engineer 1
                          </Text>
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
                                borderRadius: 50,
                                overflow: 'hidden',
                              }}>
                              <Image
                                source={{
                                  uri: 'https://plus.unsplash.com/premium_photo-1737392497675-2e6314d3c73b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                }}
                                style={{
                                  height: '100%',
                                  width: '100%',
                                  resizeMode: 'cover',
                                }}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          height: '65%',
                          width: '100%',
                          backgroundColor: color.gray3,
                          borderRadius: 15,
                          marginVertical: responsiveScreenHeight(0.3),
                          paddingVertical: responsiveScreenHeight(1.5),
                          paddingHorizontal: responsiveScreenWidth(2.5),
                        }}>
                        <Text
                          style={{
                            fontFamily: font.NunitoSemiBold,
                            color: color.black87,
                            fontSize: responsiveScreenFontSize(1.8),
                            fontWeight: '400',
                            marginBottom: responsiveScreenHeight(0.5),
                          }}>
                          12th Floor
                        </Text>
                        <View
                          style={{
                            gap: responsiveScreenHeight(0.5),
                          }}>
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
                              }}>
                              <Entypo
                                name="dot-single"
                                style={{
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(2.5),
                                }}
                              />
                              <Text
                                style={{
                                  fontFamily: font.NunitoRegular,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.5),
                                  fontWeight: '400',
                                }}>
                                Layout
                              </Text>
                            </View>

                            <Text
                              style={{
                                fontFamily: font.NunitoSemiBold,
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.5),
                                fontWeight: '400',
                              }}>
                              34.70 MT
                            </Text>
                          </View>

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
                              }}>
                              <Entypo
                                name="dot-single"
                                style={{
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(2.5),
                                }}
                              />
                              <Text
                                style={{
                                  fontFamily: font.NunitoRegular,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.5),
                                  fontWeight: '400',
                                }}>
                                Vertical Steel Reinforcement
                              </Text>
                            </View>

                            <Text
                              style={{
                                fontFamily: font.NunitoSemiBold,
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.5),
                                fontWeight: '400',
                              }}>
                              2585.00 sqm
                            </Text>
                          </View>

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
                              }}>
                              <Entypo
                                name="dot-single"
                                style={{
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(2.5),
                                }}
                              />
                              <Text
                                style={{
                                  fontFamily: font.NunitoRegular,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.5),
                                  fontWeight: '400',
                                }}>
                                Slab shuttering
                              </Text>
                            </View>

                            <Text
                              style={{
                                fontFamily: font.NunitoSemiBold,
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.5),
                                fontWeight: '400',
                              }}>
                              165.00 cum
                            </Text>
                          </View>

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
                              }}>
                              <Entypo
                                name="dot-single"
                                style={{
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(2.5),
                                }}
                              />
                              <Text
                                style={{
                                  fontFamily: font.NunitoRegular,
                                  color: color.black87,
                                  fontSize: responsiveScreenFontSize(1.5),
                                  fontWeight: '400',
                                }}>
                                Slab Steel Reinforcement
                              </Text>
                            </View>

                            <Text
                              style={{
                                fontFamily: font.NunitoSemiBold,
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.5),
                                fontWeight: '400',
                              }}>
                              2548 sqm
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: responsiveScreenHeight(0.7),
                        }}>
                        <Text
                          style={{
                            fontFamily: font.NunitoSemiBold,
                            color: color.black87,
                            fontSize: responsiveScreenFontSize(1.5),
                            fontWeight: '400',
                          }}>
                          Aug 15, Mon
                        </Text>
                      </View>
                    </View>
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

export default TargetProgress;
