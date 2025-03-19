/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  BottomModal,
  Header,
  ProgressBar,
  ProgressButton,
} from '../../component';
import {
  responsiveFontSize,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {color, font, routes} from '../../config/Env';
// import {style} from '../Auth/ForgotPassword';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {GetContact} from '../../reducers/ContactSlice';
// import {truncateText} from '../../../function';
// import DocumentPicker from 'react-native-document-picker';
// import Models from '../../component/Model';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {Shadow} from 'react-native-shadow-2';
import useHapticFeedback from '../../hooks/useHapticFeedback';
import SearchBar from '../../component/SearchBar';

const ProjectDetail = () => {
  const {triggerHaptic} = useHapticFeedback();
  const flatList = useRef<FlatList>(null);

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const [index, setIndex] = useState(0);
  const [addLabourModal, setAddLabourModal] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');

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

  const imgs = [
    {
      url: 'https://plus.unsplash.com/premium_photo-1737392497675-2e6314d3c73b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      url: 'https://plus.unsplash.com/premium_photo-1736338574018-9805477fb65f?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      url: 'https://images.unsplash.com/photo-1736754075245-2d2a75639fea?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  const subTasks = [
    {name: 'Excavation', progress: 54},
    {name: 'BackFilling', progress: 65},
    {name: 'Internal Plaster', progress: 35},
    {name: 'Brick Work', progress: 12},
    {name: 'Steel Binding', progress: 91},
  ];
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GetContact({}));
  }, []);

  return (
    <>
      {/* -----------------------Add labour modal-------------------------- */}
      <BottomModal
        visible={addLabourModal}
        onClose={() => setAddLabourModal(false)}
        bgColor="transparent">
        <View
          style={{
            maxHeight: responsiveScreenHeight(54),
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
                height: '72%',
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
              <Shadow distance={2} startColor={color.gray3} offset={[0, 0]}>
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
              <Shadow distance={2} startColor={color.gray3} offset={[0, 0]}>
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
      </BottomModal>

      <View
        style={{
          flex: 1,
          backgroundColor: color.white,
          paddingBottom: responsiveScreenHeight(2),
        }}>
        <Header title={'Tower A2'} backgroundColor={color.primaryForTop}>
          <>
            <Pressable
              onPress={() => {
                setAddLabourModal(true);
                triggerHaptic('impactMedium');
              }}>
              <Image
                source={require(`../../assests/icons/add-lab.png`)}
                style={{
                  height: '96%',
                  aspectRatio: 1,
                  tintColor: color.white,
                }}
              />
            </Pressable>
          </>
        </Header>

        {/* __________________________________________________Top Section Bars___________________________________________________ */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: responsiveScreenWidth(5),
            paddingVertical: responsiveScreenHeight(2),
          }}>
          <Pressable onPress={() => navigation.navigate(routes.MATERIAL_USED)}>
            <ProgressButton
              color={color.secondary}
              bgColor={color.white}
              percentage={68}
              title="Materials Used"
            />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate(routes.TARGET_PROGRESS)}>
            <ProgressButton
              color={color.primary}
              bgColor={color.white}
              percentage={41}
              title="Target Progress"
            />
          </Pressable>
        </View>

        {/* __________________________________________________Horizontal Cards___________________________________________________ */}

        <FlatList
          ref={flatList}
          initialScrollIndex={index}
          style={{overflow: 'hidden'}}
          data={DATA}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd={onScrollEnd}
          getItemLayout={getItemLayout}
          renderItem={({item, index}) => (
            <View
              style={{
                marginVertical: 3,
                marginHorizontal: 10,
                height: '100%',
              }}>
              <Shadow distance={4} startColor={color.gray2} offset={[0, 0]}>
                <View
                  style={{
                    width: responsiveScreenWidth(95),
                    height: responsiveScreenHeight(70),
                    paddingHorizontal: responsiveScreenWidth(4),
                    paddingVertical: responsiveScreenHeight(1),
                    backgroundColor: 'white',
                    gap: responsiveScreenHeight(1),
                    borderRadius: 25,
                  }}>
                  {/* -------------------------top View Progress and Task name---------------------- */}

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
                      <Text
                        style={{
                          fontFamily: font.NunitoSemiBold,
                          color: color.black87,
                          fontSize: responsiveScreenFontSize(2),
                          marginBottom: responsiveScreenHeight(0.2),
                          marginRight: responsiveScreenWidth(1),
                        }}>
                        {index + 1}st Floor
                      </Text>
                      <View
                        style={{
                          width: responsiveScreenWidth(10),
                          height: responsiveScreenHeight(4),
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {imgs.map((val, index) => (
                          <View
                            key={index}
                            style={{
                              height: '85%',
                              aspectRatio: 1,
                              borderRadius: 1000,
                              borderWidth: responsiveScreenWidth(0.5),
                              borderColor: color.primary,
                              overflow: 'hidden',
                              marginLeft:
                                index === 0 ? 0 : -responsiveScreenWidth(5.5),
                            }}>
                            <Image
                              source={{
                                uri: val.url,
                              }}
                              style={{
                                height: '100%',
                                width: '100%',
                                resizeMode: 'cover',
                              }}
                            />
                          </View>
                        ))}
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <ProgressBar
                        radius={responsiveScreenWidth(6)}
                        color={color.secondary}
                        bgColor={color.gray2}
                        percentage={78}
                      />
                      <ProgressBar
                        radius={responsiveScreenWidth(6)}
                        color={color.primary}
                        bgColor={color.gray2}
                        percentage={24}
                      />
                    </View>
                  </View>

                  {/* -------------------------Sub tasks Heading and date---------------------- */}

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginHorizontal: responsiveScreenWidth(2),
                      marginBottom: responsiveScreenHeight(1),
                    }}>
                    <Text
                      style={{
                        fontFamily: font.NunitoMedium,
                        color: color.black87,
                        fontSize: responsiveScreenFontSize(1.9),
                        fontWeight: '400',
                        marginBottom: responsiveScreenHeight(0.2),
                      }}>
                      SubTask: 1/5
                    </Text>

                    <Text
                      style={{
                        fontFamily: font.NunitoMedium,
                        color: color.black87,
                        fontSize: responsiveScreenFontSize(1.5),
                        fontWeight: '400',
                        marginBottom: responsiveScreenHeight(0.2),
                      }}>
                      5 Aug - 10 Aug
                    </Text>
                  </View>

                  {/* -------------------------Sub tasks view---------------------- */}

                  {subTasks.map(val => (
                    <Pressable
                      onPress={() =>
                        navigation.navigate(routes.PMSUBTASK_REVIEW)
                      }>
                      <Shadow
                        distance={3}
                        startColor={color.gray2}
                        style={{
                          width: '100%',
                        }}
                        offset={[0, 0]}>
                        <View
                          style={{
                            width: '100%',
                            height: responsiveScreenHeight(5.5),
                            backgroundColor: color.white,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            padding: 2,
                            position: 'relative',
                          }}>
                          <View
                            style={{
                              height: '100%',
                              width: `${val.progress}%`,
                              backgroundColor: color.gray3,
                              borderRadius: 10,
                            }}></View>
                          <Text
                            style={{
                              position: 'absolute',
                              fontFamily: font.NunitoMedium,
                              fontSize: responsiveFontSize(1.8),
                              marginLeft: responsiveScreenWidth(2.5),
                            }}>
                            {val.name}
                          </Text>
                        </View>
                      </Shadow>
                    </Pressable>
                  ))}

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignContent: 'space-between',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      paddingVertical: responsiveScreenHeight(1),
                      paddingHorizontal: responsiveScreenWidth(2),
                      flex: 1,
                      gap: responsiveScreenWidth(2),
                    }}></View>
                </View>
              </Shadow>
            </View>
          )}
          keyExtractor={item => item.id}
        />

        {/* __________________________________________________Dots___________________________________________________ */}

        <View
          style={{
            flexDirection: 'row',
            gap: responsiveScreenWidth(2),
            margin: 'auto',
            position: 'relative',
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
                    cIndex === index ? color.primary : color.gray2,
                  borderRadius: 100,
                }}
              />
            );
          })}
        </View>
      </View>
    </>
  );
};

export default ProjectDetail;
