/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';
import {color, font, routes} from '../../../config/Env';
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
import {useAppSelector} from '../../../hooks/hooks';
import {requestCameraPermission} from '../../../../function';
import {Shadow} from 'react-native-shadow-2';
import {LinearGradient} from '../../../component';

const UserProfile = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {user} = useAppSelector(state => state.userStore);

  return (
    <>
      <View
        style={{
          height: responsiveScreenHeight(4),
          backgroundColor: color.primaryForTop,
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          backgroundColor: color.white,
        }}>
        <View
          style={{
            paddingTop: responsiveScreenHeight(4),
            paddingHorizontal: responsiveScreenWidth(4),
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: color.primaryForTop,
          }}>
          <TouchableOpacity
            // onPress={() => navigation.goBack()}
            style={{
              maxHeight: responsiveScreenHeight(3.6),
              flex: 1,
              alignItems: 'flex-start',
            }}>
            <Image
              source={require('../../../assests/icons/pencil-edit.png')}
              style={{height: '90%', aspectRatio: 1, tintColor: color.white}}
            />
          </TouchableOpacity>
          <Text style={{flex: 1}} />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: responsiveScreenWidth(3),
              paddingRight: responsiveScreenWidth(3),
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                maxHeight: responsiveScreenHeight(2.5),
                alignItems: 'flex-start',
              }}>
              <Image
                source={require('../../../assests/icons/share.png')}
                style={{height: '100%', aspectRatio: 1, tintColor: color.white}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: color.primaryForTop,
            gap: responsiveScreenHeight(0.5),
          }}>
          <Text
            style={{
              color: color.white,
              fontSize: responsiveScreenHeight(2.5),
              fontFamily: font.NunitoMedium,
              textAlign: 'center',
            }}>
            Project Manager Name
          </Text>
          <Text
            style={{
              color: color.white87,
              fontSize: responsiveScreenHeight(1.5),
              fontFamily: font.NunitoMedium,
              textAlign: 'center',
            }}>
            Project Manager
          </Text>
        </View>

        {/* _______________________________________________Profile Image_____________________________________ */}
        <View
          style={{
            position: 'relative',
            marginBottom: responsiveScreenHeight(8),
          }}>
          <View
            style={{
              width: '100%',
              height: responsiveScreenHeight(9),
              backgroundColor: color.primaryForTop,
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
              position: 'relative',
            }}
          />
          <View
            style={{
              borderWidth: 4,
              borderColor: color.white,
              zIndex: 2,
              position: 'absolute',
              top: responsiveScreenHeight(3),
              width: responsiveScreenWidth(26),
              overflow: 'hidden',
              borderRadius: 200,
              aspectRatio: 1,
              backgroundColor: 'black',
              alignSelf: 'center',
            }}>
            <Image
              source={{uri: user?.profile}}
              style={{height: '100%', width: '100%'}}
            />
          </View>
        </View>

        {/* _______________________________________________Down Content_____________________________________ */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginTop: responsiveScreenHeight(1),
              flex: 1,
              paddingHorizontal: responsiveScreenWidth(5),
              gap: responsiveScreenHeight(1),
              marginBottom: responsiveScreenHeight(5),
            }}>
            <View
              style={{
                gap: responsiveScreenWidth(3),
                width: responsiveScreenWidth(92),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  borderRadius: 20,
                }}>
                <Shadow
                  distance={5}
                  startColor={color.gray2}
                  style={{
                    width: '100%',
                  }}
                  offset={[0, 0]}>
                  <Pressable
                    onPress={async () => {
                      const a = await requestCameraPermission();
                      if (a) {
                        navigation.navigate(routes.MARKATTENDENCE, {
                          page: 'Check-In',
                        });
                      }
                    }}
                    style={{
                      flex: 1,
                      paddingVertical: responsiveScreenHeight(2.6),
                      gap: responsiveScreenHeight(1),
                      borderRadius: 20,
                      backgroundColor: color.white,
                    }}>
                    <Text
                      style={{
                        color: color.primary,
                        textAlign: 'center',
                        fontSize: responsiveScreenHeight(1.8),
                        fontFamily: font.NunitoSemiBold,
                      }}>
                      Check-In
                    </Text>
                    <Text
                      style={{
                        color: color.black87,
                        textAlign: 'center',
                        fontSize: responsiveScreenHeight(1.8),
                        fontFamily: font.NunitoSemiBold,
                      }}>
                      08:00 AM
                    </Text>
                  </Pressable>
                </Shadow>
              </View>
              <TouchableOpacity
                style={{
                  maxHeight: responsiveScreenHeight(2.5),
                  alignItems: 'flex-start',
                }}>
                <Image
                  source={require('../../../assests/icons/arrow-switch.png')}
                  style={{
                    height: '100%',
                    aspectRatio: 1,
                    tintColor: color.primary,
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  borderRadius: 20,
                }}>
                <Shadow
                  distance={5}
                  startColor={color.gray2}
                  style={{
                    width: '100%',
                  }}
                  offset={[0, 0]}>
                  <Pressable
                    onPress={async () => {
                      const a = await requestCameraPermission();
                      if (a) {
                        navigation.navigate(routes.MARKATTENDENCE, {
                          page: 'Check-In',
                        });
                      }
                    }}
                    style={{
                      flex: 1,
                      paddingVertical: responsiveScreenHeight(2.6),
                      gap: responsiveScreenHeight(1),
                      borderRadius: 20,
                      backgroundColor: color.white,
                    }}>
                    <Text
                      style={{
                        color: color.primary,
                        textAlign: 'center',
                        fontSize: responsiveScreenHeight(1.8),
                        fontFamily: font.NunitoSemiBold,
                      }}>
                      Check-Out
                    </Text>
                    <Text
                      style={{
                        color: color.black87,
                        textAlign: 'center',
                        fontSize: responsiveScreenHeight(1.8),
                        fontFamily: font.NunitoSemiBold,
                      }}>
                      08:00 AM
                    </Text>
                  </Pressable>
                </Shadow>
              </View>
            </View>

            {/* ----------------------------------My self---------------------------------- */}

            <Text
              style={{
                color: color.black87,
                fontSize: responsiveScreenHeight(1.8),
                fontFamily: font.NunitoMedium,
                marginTop: responsiveScreenHeight(1.5),
              }}>
              My Self
            </Text>
            <Shadow
              distance={4}
              startColor={color.gray2}
              style={{
                width: '100%',
              }}
              offset={[0, 0]}>
              <View
                style={{
                  flex: 1,
                  gap: responsiveScreenHeight(2),
                  backgroundColor: color.white,
                  paddingHorizontal: responsiveScreenWidth(3.8),
                  paddingVertical: responsiveScreenHeight(1.8),
                  borderRadius: 25,
                }}>
                <Pressable
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: responsiveScreenWidth(4),
                    }}>
                    <View
                      style={{
                        height: responsiveScreenHeight(4),
                        aspectRatio: 1,
                        borderRadius: 1000,
                        backgroundColor: color.gray2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {/* <Image
                    source={require('../../assests/msg2.png')}
                    style={{
                      tintColor: color.primaryForTop,
                      aspectRatio: 1,
                      height: '50%',
                      resizeMode: 'contain',
                    }}
                  /> */}
                    </View>
                    <Text
                      style={{
                        color: color.black87,
                        fontSize: responsiveScreenHeight(1.6),
                        fontFamily: font.NunitoMedium,
                      }}>
                      Salary Slips
                    </Text>
                  </View>
                  <Pressable
                    style={{
                      maxHeight: responsiveScreenHeight(3),
                      alignItems: 'flex-start',
                    }}>
                    <Image
                      source={require('../../../assests/icons/right-arrow.png')}
                      style={{
                        height: '100%',
                        aspectRatio: 1,
                        tintColor: color.primary,
                      }}
                    />
                  </Pressable>
                </Pressable>

                <Pressable
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: responsiveScreenWidth(4),
                    }}>
                    <View
                      style={{
                        height: responsiveScreenHeight(4),
                        aspectRatio: 1,
                        borderRadius: 1000,
                        backgroundColor: color.gray2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {/* <Image
                    source={require('../../assests/msg2.png')}
                    style={{
                      tintColor: color.primaryForTop,
                      aspectRatio: 1,
                      height: '50%',
                      resizeMode: 'contain',
                    }}
                  /> */}
                    </View>
                    <Text
                      style={{
                        color: color.black87,
                        fontSize: responsiveScreenHeight(1.6),
                        fontFamily: font.NunitoMedium,
                      }}>
                      Apply Leave
                    </Text>
                  </View>
                  <Pressable
                    style={{
                      maxHeight: responsiveScreenHeight(3),
                      alignItems: 'flex-start',
                    }}>
                    <Image
                      source={require('../../../assests/icons/right-arrow.png')}
                      style={{
                        height: '100%',
                        aspectRatio: 1,
                        tintColor: color.primary,
                      }}
                    />
                  </Pressable>
                </Pressable>

                <Pressable
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: responsiveScreenWidth(4),
                    }}>
                    <View
                      style={{
                        height: responsiveScreenHeight(4),
                        aspectRatio: 1,
                        borderRadius: 1000,
                        backgroundColor: color.gray2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {/* <Image
                    source={require('../../assests/msg2.png')}
                    style={{
                      tintColor: color.primaryForTop,
                      aspectRatio: 1,
                      height: '50%',
                      resizeMode: 'contain',
                    }}
                  /> */}
                    </View>
                    <Text
                      style={{
                        color: color.black87,
                        fontSize: responsiveScreenHeight(1.6),
                        fontFamily: font.NunitoMedium,
                      }}>
                      Attendance
                    </Text>
                  </View>
                  <Pressable
                    style={{
                      maxHeight: responsiveScreenHeight(3),
                      alignItems: 'flex-start',
                    }}>
                    <Image
                      source={require('../../../assests/icons/right-arrow.png')}
                      style={{
                        height: '100%',
                        aspectRatio: 1,
                        tintColor: color.primary,
                      }}
                    />
                  </Pressable>
                </Pressable>
              </View>
            </Shadow>

            {/* ----------------------------------HR---------------------------------- */}
            <Text
              style={{
                color: color.black87,
                fontSize: responsiveScreenHeight(1.8),
                fontFamily: font.NunitoMedium,
                marginTop: responsiveScreenHeight(1),
              }}>
              My Self
            </Text>
            <Shadow
              distance={4}
              startColor={color.gray2}
              style={{
                width: '100%',
              }}
              offset={[0, 0]}>
              <View
                style={{
                  flex: 1,
                  gap: responsiveScreenHeight(2),
                  backgroundColor: color.white,
                  paddingHorizontal: responsiveScreenWidth(3.8),
                  paddingVertical: responsiveScreenHeight(1.8),
                  borderRadius: 25,
                }}>
                <Pressable
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: responsiveScreenWidth(4),
                    }}>
                    <View
                      style={{
                        height: responsiveScreenHeight(4),
                        aspectRatio: 1,
                        borderRadius: 1000,
                        backgroundColor: color.gray2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {/* <Image
                    source={require('../../assests/msg2.png')}
                    style={{
                      tintColor: color.primaryForTop,
                      aspectRatio: 1,
                      height: '50%',
                      resizeMode: 'contain',
                    }}
                  /> */}
                    </View>
                    <Text
                      style={{
                        color: color.black87,
                        fontSize: responsiveScreenHeight(1.6),
                        fontFamily: font.NunitoMedium,
                      }}>
                      Leave requests
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: responsiveScreenWidth(1),
                    }}>
                    <View
                      style={{
                        height: responsiveScreenHeight(2.7),
                        width: responsiveScreenHeight(2.7),
                        backgroundColor: color.primaryLow,
                        borderRadius: responsiveScreenHeight(2),
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: responsiveScreenWidth(1),
                      }}>
                      <Text
                        style={{
                          color: color.primary,
                          fontSize: responsiveScreenFontSize(1.5),
                          fontFamily: font.NunitoSemiBold,
                        }}>
                        05
                      </Text>
                    </View>
                    <Pressable
                      style={{
                        maxHeight: responsiveScreenHeight(3),
                        alignItems: 'flex-start',
                      }}>
                      <Image
                        source={require('../../../assests/icons/right-arrow.png')}
                        style={{
                          height: '100%',
                          aspectRatio: 1,
                          tintColor: color.primary,
                        }}
                      />
                    </Pressable>
                  </View>
                </Pressable>

                <Pressable
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: responsiveScreenWidth(4),
                    }}>
                    <View
                      style={{
                        height: responsiveScreenHeight(4),
                        aspectRatio: 1,
                        borderRadius: 1000,
                        backgroundColor: color.gray2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {/* <Image
                    source={require('../../assests/msg2.png')}
                    style={{
                      tintColor: color.primaryForTop,
                      aspectRatio: 1,
                      height: '50%',
                      resizeMode: 'contain',
                    }}
                  /> */}
                    </View>
                    <Text
                      style={{
                        color: color.black87,
                        fontSize: responsiveScreenHeight(1.6),
                        fontFamily: font.NunitoMedium,
                      }}>
                      Apply Leave
                    </Text>
                  </View>
                  <Pressable
                    style={{
                      maxHeight: responsiveScreenHeight(3),
                      alignItems: 'flex-start',
                    }}>
                    <Image
                      source={require('../../../assests/icons/right-arrow.png')}
                      style={{
                        height: '100%',
                        aspectRatio: 1,
                        tintColor: color.primary,
                      }}
                    />
                  </Pressable>
                </Pressable>

                <Pressable
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: responsiveScreenWidth(4),
                    }}>
                    <View
                      style={{
                        height: responsiveScreenHeight(4),
                        aspectRatio: 1,
                        borderRadius: 1000,
                        backgroundColor: color.gray2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {/* <Image
                    source={require('../../assests/msg2.png')}
                    style={{
                      tintColor: color.primaryForTop,
                      aspectRatio: 1,
                      height: '50%',
                      resizeMode: 'contain',
                    }}
                  /> */}
                    </View>
                    <Text
                      style={{
                        color: color.black87,
                        fontSize: responsiveScreenHeight(1.6),
                        fontFamily: font.NunitoMedium,
                      }}>
                      Attendance
                    </Text>
                  </View>
                  <Pressable
                    style={{
                      maxHeight: responsiveScreenHeight(3),
                      alignItems: 'flex-start',
                    }}>
                    <Image
                      source={require('../../../assests/icons/right-arrow.png')}
                      style={{
                        height: '100%',
                        aspectRatio: 1,
                        tintColor: color.primary,
                      }}
                    />
                  </Pressable>
                </Pressable>
              </View>
            </Shadow>

            {/* ----------------------------------Office---------------------------------- */}
            <Text
              style={{
                color: color.black87,
                fontSize: responsiveScreenHeight(1.8),
                fontFamily: font.NunitoMedium,
                marginTop: responsiveScreenHeight(1),
              }}>
              Office
            </Text>
            <Shadow
              distance={4}
              startColor={color.gray2}
              style={{
                width: '100%',
              }}
              offset={[0, 0]}>
              <View
                style={{
                  flex: 1,
                  gap: responsiveScreenHeight(2),
                  backgroundColor: color.white,
                  paddingHorizontal: responsiveScreenWidth(3.8),
                  paddingVertical: responsiveScreenHeight(1.8),
                  borderRadius: 25,
                }}>
                <Pressable
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: responsiveScreenWidth(4),
                    }}>
                    <View
                      style={{
                        height: responsiveScreenHeight(4),
                        aspectRatio: 1,
                        borderRadius: 1000,
                        backgroundColor: color.gray2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {/* <Image
                    source={require('../../assests/msg2.png')}
                    style={{
                      tintColor: color.primaryForTop,
                      aspectRatio: 1,
                      height: '50%',
                      resizeMode: 'contain',
                    }}
                  /> */}
                    </View>
                    <Text
                      style={{
                        color: color.black87,
                        fontSize: responsiveScreenHeight(1.6),
                        fontFamily: font.NunitoMedium,
                      }}>
                      History
                    </Text>
                  </View>

                  <Pressable
                    style={{
                      maxHeight: responsiveScreenHeight(3),
                      alignItems: 'flex-start',
                    }}>
                    <Image
                      source={require('../../../assests/icons/right-arrow.png')}
                      style={{
                        height: '100%',
                        aspectRatio: 1,
                        tintColor: color.primary,
                      }}
                    />
                  </Pressable>
                </Pressable>

                <Pressable
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: responsiveScreenWidth(4),
                    }}>
                    <View
                      style={{
                        height: responsiveScreenHeight(4),
                        aspectRatio: 1,
                        borderRadius: 1000,
                        backgroundColor: color.gray2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {/* <Image
                    source={require('../../assests/msg2.png')}
                    style={{
                      tintColor: color.primaryForTop,
                      aspectRatio: 1,
                      height: '50%',
                      resizeMode: 'contain',
                    }}
                  /> */}
                    </View>
                    <Text
                      style={{
                        color: color.black87,
                        fontSize: responsiveScreenHeight(1.6),
                        fontFamily: font.NunitoMedium,
                      }}>
                      Client details
                    </Text>
                  </View>
                  <Pressable
                    style={{
                      maxHeight: responsiveScreenHeight(3),
                      alignItems: 'flex-start',
                    }}>
                    <Image
                      source={require('../../../assests/icons/right-arrow.png')}
                      style={{
                        height: '100%',
                        aspectRatio: 1,
                        tintColor: color.primary,
                      }}
                    />
                  </Pressable>
                </Pressable>

                <Pressable
                  onPress={() => navigation.navigate(routes.PM_INVENTORY)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: responsiveScreenWidth(4),
                    }}>
                    <View
                      style={{
                        height: responsiveScreenHeight(4),
                        aspectRatio: 1,
                        borderRadius: 1000,
                        backgroundColor: color.gray2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {/* <Image
                    source={require('../../assests/msg2.png')}
                    style={{
                      tintColor: color.primaryForTop,
                      aspectRatio: 1,
                      height: '50%',
                      resizeMode: 'contain',
                    }}
                  /> */}
                    </View>
                    <Text
                      style={{
                        color: color.black87,
                        fontSize: responsiveScreenHeight(1.6),
                        fontFamily: font.NunitoMedium,
                      }}>
                      Inventory
                    </Text>
                  </View>
                  <Pressable
                    style={{
                      maxHeight: responsiveScreenHeight(3),
                      alignItems: 'flex-start',
                    }}>
                    <Image
                      source={require('../../../assests/icons/right-arrow.png')}
                      style={{
                        height: '100%',
                        aspectRatio: 1,
                        tintColor: color.primary,
                      }}
                    />
                  </Pressable>
                </Pressable>

                <Pressable
                  onPress={() => navigation.navigate(routes.PMPETTY_CASH)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: responsiveScreenWidth(4),
                    }}>
                    <View
                      style={{
                        height: responsiveScreenHeight(4),
                        aspectRatio: 1,
                        borderRadius: 1000,
                        backgroundColor: color.gray2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {/* <Image
                    source={require('../../assests/msg2.png')}
                    style={{
                      tintColor: color.primaryForTop,
                      aspectRatio: 1,
                      height: '50%',
                      resizeMode: 'contain',
                    }}
                  /> */}
                    </View>
                    <Text
                      style={{
                        color: color.black87,
                        fontSize: responsiveScreenHeight(1.6),
                        fontFamily: font.NunitoMedium,
                      }}>
                      Petty Cash
                    </Text>
                  </View>
                  <Pressable
                    style={{
                      maxHeight: responsiveScreenHeight(3),
                      alignItems: 'flex-start',
                    }}>
                    <Image
                      source={require('../../../assests/icons/right-arrow.png')}
                      style={{
                        height: '100%',
                        aspectRatio: 1,
                        tintColor: color.primary,
                      }}
                    />
                  </Pressable>
                </Pressable>

                <Pressable
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: responsiveScreenWidth(4),
                    }}>
                    <View
                      style={{
                        height: responsiveScreenHeight(4),
                        aspectRatio: 1,
                        borderRadius: 1000,
                        backgroundColor: color.gray2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {/* <Image
                    source={require('../../assests/msg2.png')}
                    style={{
                      tintColor: color.primaryForTop,
                      aspectRatio: 1,
                      height: '50%',
                      resizeMode: 'contain',
                    }}
                  /> */}
                    </View>
                    <Text
                      style={{
                        color: color.black87,
                        fontSize: responsiveScreenHeight(1.6),
                        fontFamily: font.NunitoMedium,
                      }}>
                      Vendors
                    </Text>
                  </View>
                  <Pressable
                    style={{
                      maxHeight: responsiveScreenHeight(3),
                      alignItems: 'flex-start',
                    }}>
                    <Image
                      source={require('../../../assests/icons/right-arrow.png')}
                      style={{
                        height: '100%',
                        aspectRatio: 1,
                        tintColor: color.primary,
                      }}
                    />
                  </Pressable>
                </Pressable>

                <Pressable
                  onPress={() => navigation.navigate(routes.PM_CONTRACTOR_1)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: responsiveScreenWidth(4),
                    }}>
                    <View
                      style={{
                        height: responsiveScreenHeight(4),
                        aspectRatio: 1,
                        borderRadius: 1000,
                        backgroundColor: color.gray2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {/* <Image
                    source={require('../../assests/msg2.png')}
                    style={{
                      tintColor: color.primaryForTop,
                      aspectRatio: 1,
                      height: '50%',
                      resizeMode: 'contain',
                    }}
                  /> */}
                    </View>
                    <Text
                      style={{
                        color: color.black87,
                        fontSize: responsiveScreenHeight(1.6),
                        fontFamily: font.NunitoMedium,
                      }}>
                      Contractors
                    </Text>
                  </View>
                  <Pressable
                    style={{
                      maxHeight: responsiveScreenHeight(3),
                      alignItems: 'flex-start',
                    }}>
                    <Image
                      source={require('../../../assests/icons/right-arrow.png')}
                      style={{
                        height: '100%',
                        aspectRatio: 1,
                        tintColor: color.primary,
                      }}
                    />
                  </Pressable>
                </Pressable>
              </View>
            </Shadow>
          </View>
        </ScrollView>

        {/* ==========================================Floating buttons=========================================== */}

        <View
          style={{
            position: 'absolute',
            bottom: responsiveScreenHeight(4),
            right: responsiveScreenWidth(5),
            gap: responsiveScreenHeight(1.5),
            alignItems: 'flex-end',
          }}>
          <Shadow distance={8} startColor={color.black15} offset={[0, 1]}>
            <Pressable
              style={{
                width: responsiveScreenWidth(12),
                borderRadius: 200,
              }}
              onPress={() => {
                navigation.goBack();
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
                  source={require('../../../assests/icons/Home3.png')}
                  style={{
                    height: responsiveScreenHeight(2.5),
                    aspectRatio: 1,
                    tintColor: color.white,
                    resizeMode: 'contain',
                  }}
                />
              </LinearGradient>
            </Pressable>
          </Shadow>
        </View>
      </View>
    </>
  );
};

export default UserProfile;
