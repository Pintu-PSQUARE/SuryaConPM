/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {Header} from '../../../component';
import {
  responsiveFontSize,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {color, font} from '../../../config/Env';
import SearchBar from '../../../component/SearchBar';

const MeetingHistory = () => {
  const [searchValue, setSearchValue] = useState('');
  const buttons = ['Pending', 'Completed', 'Cancelled'];
  const [selectedTab, setSelectedTab] = useState('Pending');

  const [dummyUser, setDummyUsers] = useState([
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

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'Pending':
        return (
          <View style={{flex: 1, marginTop: responsiveScreenHeight(2)}}>
            <FlatList
              data={dummyUser}
              keyExtractor={item => item._id.toString()}
              renderItem={({item}: any) => {
                return (
                  <View
                    style={{
                      height: responsiveScreenHeight(18),
                      backgroundColor: color.white,
                      borderRadius: 15,
                      padding: responsiveScreenWidth(2.5),
                      elevation: 2,
                      gap: responsiveScreenHeight(1),
                      marginBottom: responsiveScreenHeight(1),
                    }}>
                    {/* =============top======================== */}
                    <View
                      style={{
                        // backgroundColor: 'red',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flex: 1,
                        alignItems: 'center',
                      }}>
                      {/* ====================== photo and name part================================ */}
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: responsiveScreenWidth(2),
                          width: responsiveScreenWidth(40),
                          alignItems: 'center',
                        }}>
                        {/* ===================Profile photo================== */}
                        <View
                          style={{
                            width: responsiveScreenWidth(11),
                            aspectRatio: 1,
                            borderRadius: 1212,
                            overflow: 'hidden',
                          }}>
                          <Image
                            source={{
                              uri: item.pic,
                            }}
                            style={{height: '100%', width: '100%'}}
                          />
                        </View>
                        {/* ===================Name and tag==================== */}
                        <View>
                          <Text
                            style={{
                              fontFamily: font.NunitoBold,
                              color: color.black87,
                              fontSize: responsiveFontSize(1.8),
                            }}>
                            {item.name}
                          </Text>
                          <Text
                            style={{
                              fontFamily: font.NunitoSemiBold,
                              color: color.black60,
                              fontSize: responsiveFontSize(1.5),
                            }}>
                            {item.tag}
                          </Text>
                        </View>
                      </View>
                      {/* ====================== photoooss================================ */}
                      <View
                        style={{
                          width: responsiveScreenWidth(25),
                          backgroundColor: 'gray',
                          height: responsiveScreenHeight(3.5),
                        }}></View>
                    </View>
                    {/* =============middle===================== */}
                    <View>
                      <Text
                        style={{
                          fontFamily: font.NunitoSemiBold,
                          fontSize: responsiveScreenFontSize(2),
                          color: color.black87,
                        }}>
                        {item.title.length > 10
                          ? item.title.substring(0, 42) + '...'
                          : item.title}
                      </Text>
                      <Text
                        style={{
                          fontFamily: font.NunitoSemiBold,
                          fontSize: responsiveScreenFontSize(1.6),
                          color: color.black60,
                        }}>
                        {item.desc.length > 10
                          ? item.desc.substring(0, 59) + '...'
                          : item.desc}
                      </Text>
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
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {/* =============time===================== */}
                        <Image
                          source={require(`../../../assests/icons/clock.png`)}
                          style={{
                            width: '7%',
                            aspectRatio: 1,
                            tintColor: color.primary,
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: font.NunitoSemiBold,
                            fontSize: responsiveScreenFontSize(1.5),
                            color: color.black60,
                            marginLeft: responsiveScreenWidth(1),
                          }}>
                          {item.time}
                        </Text>
                        {/* ===================date======================= */}
                        <Image
                          source={require(`../../../assests/icons/calendar.png`)}
                          style={{
                            marginLeft: responsiveScreenWidth(2),
                            width: '7%',
                            aspectRatio: 1,
                            tintColor: color.primary,
                          }}
                        />
                        <Text
                          style={{
                            marginLeft: responsiveScreenWidth(1),
                            fontFamily: font.NunitoSemiBold,
                            fontSize: responsiveScreenFontSize(1.5),
                            color: color.black60,
                          }}>
                          {item.date}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingHorizontal: responsiveScreenWidth(3),
                          height: responsiveScreenHeight(3.5),
                          width: responsiveScreenWidth(35),
                          borderWidth: responsiveScreenWidth(0.4),
                          borderRadius: 20,
                          borderColor: color.primary,
                        }}>
                        <Image
                          source={require(`../../../assests/icons/map-marker.png`)}
                          style={{
                            width: '15%',
                            aspectRatio: 1,
                            tintColor: color.primary,
                          }}
                        />
                        <Text
                          style={{
                            marginLeft: responsiveScreenWidth(1),
                            fontFamily: font.NunitoSemiBold,
                            fontSize: responsiveScreenFontSize(1.5),
                            color: color.black60,
                          }}>
                          Horizon Belmo
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              contentContainerStyle={{
                paddingHorizontal: responsiveScreenWidth(3),
                paddingBottom: responsiveScreenHeight(2),
              }}
            />
          </View>
        );
      case 'Completed':
        return (
          <View style={{flex: 1}}>
            <FlatList
              data={dummyUser}
              keyExtractor={item => item._id.toString()}
              renderItem={({item}: any) => {
                console.log('heheheh', item);
                return (
                  <View
                    style={{
                      height: responsiveScreenHeight(18),
                      backgroundColor: color.white,
                      borderRadius: 15,
                      borderWidth: 1,
                      borderColor: color.primary,
                      padding: responsiveScreenWidth(2.5),
                      elevation: 2,
                      gap: responsiveScreenHeight(1),
                      marginBottom: responsiveScreenHeight(1),
                    }}>
                    {/* =============top======================== */}
                    <View
                      style={{
                        // backgroundColor: 'red',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flex: 1,
                        alignItems: 'center',
                      }}>
                      {/* ====================== photo and name part================================ */}
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: responsiveScreenWidth(2),
                          width: responsiveScreenWidth(40),
                          alignItems: 'center',
                        }}>
                        {/* ===================Profile photo================== */}
                        <View
                          style={{
                            width: responsiveScreenWidth(11),
                            aspectRatio: 1,
                            borderRadius: 1212,
                            overflow: 'hidden',
                          }}>
                          <Image
                            source={{
                              uri: item.pic,
                            }}
                            style={{height: '100%', width: '100%'}}
                          />
                        </View>
                        {/* ===================Name and tag==================== */}
                        <View>
                          <Text
                            style={{
                              fontFamily: font.NunitoBold,
                              color: color.black87,
                              fontSize: responsiveFontSize(1.8),
                            }}>
                            {item.name}
                          </Text>
                          <Text
                            style={{
                              fontFamily: font.NunitoSemiBold,
                              color: color.black60,
                              fontSize: responsiveFontSize(1.5),
                            }}>
                            {item.tag}
                          </Text>
                        </View>
                      </View>
                      {/* ====================== photoooss================================ */}
                      <View
                        style={{
                          width: responsiveScreenWidth(25),
                          backgroundColor: 'gray',
                          height: responsiveScreenHeight(3.5),
                        }}></View>
                    </View>
                    {/* =============middle===================== */}
                    <View>
                      <Text
                        style={{
                          fontFamily: font.NunitoSemiBold,
                          fontSize: responsiveScreenFontSize(2),
                          color: color.black87,
                        }}>
                        {item.title.length > 10
                          ? item.title.substring(0, 42) + '...'
                          : item.title}
                      </Text>
                      <Text
                        style={{
                          fontFamily: font.NunitoSemiBold,
                          fontSize: responsiveScreenFontSize(1.6),
                          color: color.black60,
                        }}>
                        {item.desc.length > 10
                          ? item.desc.substring(0, 59) + '...'
                          : item.desc}
                      </Text>
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
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {/* =============time===================== */}
                        <Image
                          source={require(`../../../assests/icons/clock.png`)}
                          style={{
                            width: '7%',
                            aspectRatio: 1,
                            tintColor: color.primary,
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: font.NunitoSemiBold,
                            fontSize: responsiveScreenFontSize(1.5),
                            color: color.black60,
                            marginLeft: responsiveScreenWidth(1),
                          }}>
                          {item.time}
                        </Text>
                        {/* ===================date======================= */}
                        <Image
                          source={require(`../../../assests/icons/calendar.png`)}
                          style={{
                            marginLeft: responsiveScreenWidth(2),
                            width: '7%',
                            aspectRatio: 1,
                            tintColor: color.primary,
                          }}
                        />
                        <Text
                          style={{
                            marginLeft: responsiveScreenWidth(1),
                            fontFamily: font.NunitoSemiBold,
                            fontSize: responsiveScreenFontSize(1.5),
                            color: color.black60,
                          }}>
                          {item.date}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingHorizontal: responsiveScreenWidth(3),
                          height: responsiveScreenHeight(3.5),
                          width: responsiveScreenWidth(35),
                          borderWidth: responsiveScreenWidth(0.4),
                          borderRadius: 20,
                          borderColor: color.primary,
                        }}>
                        <Image
                          source={require(`../../../assests/icons/map-marker.png`)}
                          style={{
                            width: '15%',
                            aspectRatio: 1,
                            tintColor: color.primary,
                          }}
                        />
                        <Text
                          style={{
                            marginLeft: responsiveScreenWidth(1),
                            fontFamily: font.NunitoSemiBold,
                            fontSize: responsiveScreenFontSize(1.5),
                            color: color.black60,
                          }}>
                          Horizon Belmo
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              contentContainerStyle={{
                paddingHorizontal: responsiveScreenWidth(3),
                paddingBottom: responsiveScreenHeight(2),
              }}
            />
          </View>
        );
      case 'Cancelled':
        return (
          <View style={{flex: 1}}>
            <FlatList
              data={dummyUser}
              keyExtractor={item => item._id.toString()}
              renderItem={({item}: any) => {
                console.log('heheheh', item);
                return (
                  <View
                    style={{
                      height: responsiveScreenHeight(18),
                      backgroundColor: color.white,
                      borderWidth: 1,
                      borderColor: color.red,
                      borderRadius: 15,
                      padding: responsiveScreenWidth(2.5),
                      elevation: 2,
                      gap: responsiveScreenHeight(1),
                      marginBottom: responsiveScreenHeight(1),
                    }}>
                    {/* =============top======================== */}
                    <View
                      style={{
                        // backgroundColor: 'red',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flex: 1,
                        alignItems: 'center',
                      }}>
                      {/* ====================== photo and name part================================ */}
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: responsiveScreenWidth(2),
                          width: responsiveScreenWidth(40),
                          alignItems: 'center',
                        }}>
                        {/* ===================Profile photo================== */}
                        <View
                          style={{
                            width: responsiveScreenWidth(11),
                            aspectRatio: 1,
                            borderRadius: 1212,
                            overflow: 'hidden',
                          }}>
                          <Image
                            source={{
                              uri: item.pic,
                            }}
                            style={{height: '100%', width: '100%'}}
                          />
                        </View>
                        {/* ===================Name and tag==================== */}
                        <View>
                          <Text
                            style={{
                              fontFamily: font.NunitoBold,
                              color: color.black87,
                              fontSize: responsiveFontSize(1.8),
                            }}>
                            {item.name}
                          </Text>
                          <Text
                            style={{
                              fontFamily: font.NunitoSemiBold,
                              color: color.black60,
                              fontSize: responsiveFontSize(1.5),
                            }}>
                            {item.tag}
                          </Text>
                        </View>
                      </View>
                      {/* ====================== photoooss================================ */}
                      <View
                        style={{
                          width: responsiveScreenWidth(25),
                          backgroundColor: 'gray',
                          height: responsiveScreenHeight(3.5),
                        }}></View>
                    </View>
                    {/* =============middle===================== */}
                    <View>
                      <Text
                        style={{
                          fontFamily: font.NunitoSemiBold,
                          fontSize: responsiveScreenFontSize(2),
                          color: color.black87,
                        }}>
                        {item.title.length > 10
                          ? item.title.substring(0, 42) + '...'
                          : item.title}
                      </Text>
                      <Text
                        style={{
                          fontFamily: font.NunitoSemiBold,
                          fontSize: responsiveScreenFontSize(1.6),
                          color: color.black60,
                        }}>
                        {item.desc.length > 10
                          ? item.desc.substring(0, 59) + '...'
                          : item.desc}
                      </Text>
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
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {/* =============time===================== */}
                        <Image
                          source={require(`../../../assests/icons/clock.png`)}
                          style={{
                            width: '7%',
                            aspectRatio: 1,
                            tintColor: color.primary,
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: font.NunitoSemiBold,
                            fontSize: responsiveScreenFontSize(1.5),
                            color: color.black60,
                            marginLeft: responsiveScreenWidth(1),
                          }}>
                          {item.time}
                        </Text>
                        {/* ===================date======================= */}
                        <Image
                          source={require(`../../../assests/icons/calendar.png`)}
                          style={{
                            marginLeft: responsiveScreenWidth(2),
                            width: '7%',
                            aspectRatio: 1,
                            tintColor: color.primary,
                          }}
                        />
                        <Text
                          style={{
                            marginLeft: responsiveScreenWidth(1),
                            fontFamily: font.NunitoSemiBold,
                            fontSize: responsiveScreenFontSize(1.5),
                            color: color.black60,
                          }}>
                          {item.date}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingHorizontal: responsiveScreenWidth(3),
                          height: responsiveScreenHeight(3.5),
                          width: responsiveScreenWidth(35),
                          borderWidth: responsiveScreenWidth(0.4),
                          borderRadius: 20,
                          borderColor: color.primary,
                        }}>
                        <Image
                          source={require(`../../../assests/icons/map-marker.png`)}
                          style={{
                            width: '15%',
                            aspectRatio: 1,
                            tintColor: color.primary,
                          }}
                        />
                        <Text
                          style={{
                            marginLeft: responsiveScreenWidth(1),
                            fontFamily: font.NunitoSemiBold,
                            fontSize: responsiveScreenFontSize(1.5),
                            color: color.black60,
                          }}>
                          Horizon Belmo
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              contentContainerStyle={{
                paddingHorizontal: responsiveScreenWidth(3),
                paddingBottom: responsiveScreenHeight(2),
              }}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={{flex: 1, backgroundColor: color.white}}>
          <Header title={'Meeting History'} />

          <View
            style={{
              paddingHorizontal: responsiveScreenWidth(3),
              paddingTop: responsiveScreenHeight(1.5),
            }}>
            <View
              style={{
                marginBottom: responsiveScreenHeight(1.5),
                height: responsiveScreenWidth(13),
                borderRadius: 50,
                backgroundColor: color.white,
                elevation: 3,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginVertical: 4,
                }}>
                {buttons.map((button, index) => (
                  <Pressable
                    key={index}
                    style={{
                      flex: 1,
                      paddingVertical: responsiveScreenWidth(3.5),
                      backgroundColor:
                        selectedTab === button ? color.primary : color.white,
                      alignItems: 'center',
                      borderRadius: 50,
                      marginHorizontal: responsiveScreenWidth(0.8),
                    }}
                    onPress={() => setSelectedTab(button)}>
                    <Text
                      style={{
                        color:
                          selectedTab === button ? color.white : color.black87,
                        fontSize: responsiveScreenFontSize(1.6),
                        fontFamily: font.NunitoSemiBold,
                      }}>
                      {button}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <SearchBar
              placeholder={'Search'}
              onChangeText={e => {
                setSearchValue(e);
              }}
              value={searchValue}
            />
          </View>
          {renderTabContent()}

          {/* <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: responsiveScreenHeight(2),
              backgroundColor: color.white,
            }}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}></ScrollView> */}
        </View>
      </KeyboardAvoidingView>

      {/* ===============================================================================================Create button========================================================================================= */}
    </>
  );
};

export default MeetingHistory;

const styles = StyleSheet.create({
  tabContentText: {
    fontSize: responsiveScreenFontSize(2),
    textAlign: 'center',
    color: color.primary,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveScreenHeight(0.5),
    paddingHorizontal: responsiveScreenHeight(0.5),
    borderRadius: 10,
    backgroundColor: color.white,
    overflow: 'hidden',
  },
  userPic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: responsiveScreenFontSize(1.9),
    fontWeight: 'semibold',
    color: 'black',
  },
  userDigit: {
    fontSize: responsiveScreenFontSize(1.5),
    color: '#666',
  },
  swipeBackground: {
    backgroundColor: 'teal',
    justifyContent: 'center',
    width: 100,
    borderRadius: 8,
    marginVertical: 5,
  },
  swipeText: {
    color: '#fff',
    paddingHorizontal: 20,
    fontSize: responsiveScreenFontSize(1.8),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: responsiveScreenFontSize(2),
    letterSpacing: 0.2,
    color: 'grey',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  button: {
    padding: 15,
    borderRadius: 50,
    width: '40%',
  },
  okButton: {
    backgroundColor: color.primary,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  back: {
    position: 'relative',
    marginVertical: 4,
    borderColor: color.gray3,
    borderRadius: 25,
    // borderWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: color.primary,
    overflow: 'hidden',
    elevation: 2.5,
  },
  detsCard: {
    display: 'flex',
    width: '23%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seCircle: {
    height: responsiveScreenHeight(1),
    width: responsiveScreenWidth(2),
    backgroundColor: color.primary,
    borderRadius: 50,
  },
});
