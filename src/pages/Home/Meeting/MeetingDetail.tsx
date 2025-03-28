/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header} from '../../../component';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {color, font} from '../../../config/Env';
// import {style} from '../Auth/ForgotPassword';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {GetContact} from '../../../redux/slice/ContactSlice';
// import {truncateText} from '../../../function';
// import DocumentPicker from 'react-native-document-picker';
// import Models from '../../component/Model';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

const MeetingDetail = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

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
  const [dropdown, setDropdown] = useState('Department');
  const {contact} = useAppSelector(state => state.contactStore);
  const [info, setInfo] = useState({priority: false, selectDate: false});
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Once');
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GetContact({}));
  }, []);
  const shortWeekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [daysInMonth, setDaysInMonth] = useState([]);
  const [attentionModal, setAttentionModal] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState(10);
  const [selectedYear, setSelectedYear] = useState(2024);
  const generateDaysInMonth = (year, month) => {
    const days = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayIndex = firstDayOfMonth.getDay();
    const lastMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push(lastMonthDays - i);
    }
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      days.push(i);
    }
    const lastDayOfMonth = new Date(year, month + 1, 0);
    for (let i = 1; i <= 6 - lastDayOfMonth.getDay(); i++) {
      days.push(i);
    }
    setDaysInMonth(days);
  };
  useEffect(() => {
    generateDaysInMonth(selectedYear, selectedMonth);
  }, [selectedMonth, selectedYear]);

  return (
    <>
      {/* <Models
        icon={
          <Image
            source={require(`../../assests/icons/alert-triangle.png`)}
            style={{
              height: '55%',
              aspectRatio: 1,
              tintColor: color.red,
            }}
          />
        }
        modalVisible={attentionModal}
        title={'Are you sure you want to schedule this meeting?'}
        heading=""
        cancel={{
          on: () => setAttentionModal(false),
          title: 'Cancel',
        }}
        ok={{
          on: () => console.log('OK button clicked'),
          title: 'Schedule',
        }}
      /> */}
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={{flex: 1}}>
          <Header title={'Meeting Details'}>
            <>
              <Pressable
              // onPress={() => navigation.navigate(routes.MEETING_HISTORY)}
              >
                <Image
                  source={require(`../../../assests/icons/pencil-edit.png`)}
                  style={{
                    height: '95%',
                    aspectRatio: 1,
                    tintColor: color.white,
                  }}
                />
              </Pressable>
            </>
          </Header>

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
                paddingBottom: responsiveScreenHeight(21),
                backgroundColor: color.white,
              }}>
              <View
                style={{
                  //   height: '50%',
                  backgroundColor: color.white,
                  borderRadius: 20,
                  marginTop: responsiveScreenHeight(1.5),
                  elevation: 2,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}>
                <View style={{padding: responsiveScreenWidth(2.5)}}>
                  <Text
                    style={{
                      color: color.primary,
                      fontFamily: font.NunitoSemiBold,
                      fontSize: responsiveScreenFontSize(1.8),
                      marginTop: responsiveScreenHeight(0.5),
                    }}>
                    Title
                  </Text>
                  <Text
                    style={{
                      color: color.black87,
                      fontFamily: font.NunitoMedium,
                      fontSize: responsiveScreenFontSize(2),
                      marginTop: responsiveScreenHeight(0.5),
                      marginBottom: responsiveScreenHeight(1),
                    }}>
                    Horizon Belmond Construction Inventory Issue
                  </Text>
                  {/* =============================================================================Description================================================================================ */}
                  <Text
                    style={{
                      color: color.primary,
                      fontFamily: font.NunitoSemiBold,
                      fontSize: responsiveScreenFontSize(1.8),
                      marginTop: responsiveScreenHeight(0.5),
                    }}>
                    Description
                  </Text>
                  <Text
                    style={{
                      color: color.black87,
                      fontFamily: font.NunitoMedium,
                      fontSize: responsiveScreenFontSize(1.9),
                      marginTop: responsiveScreenHeight(0.5),
                      marginBottom: responsiveScreenHeight(1),
                    }}>
                    Install safety barriers on the 4th-floor perimeter. Ensure
                    all materials comply with safety regulations. Complete the
                    work by 5:00 PM on Friday
                  </Text>
                  {/* =================================================================================Add participants============================================================================================ */}

                  <Text
                    style={{
                      color: color.primary,
                      fontFamily: font.NunitoSemiBold,
                      fontSize: responsiveScreenFontSize(1.8),
                      marginTop: responsiveScreenHeight(0.5),
                      marginBottom: responsiveScreenHeight(1),
                    }}>
                    Added Participants
                  </Text>

                  <ScrollView
                    contentContainerStyle={{gap: responsiveScreenWidth(2)}}
                    showsHorizontalScrollIndicator={false}
                    style={{
                      maxHeight: responsiveScreenHeight(7),
                      width: '100%',
                      marginBottom: responsiveScreenHeight(2),
                    }}
                    horizontal>
                    {dummyUser.map(e => (
                      <Pressable
                        key={e._id}
                        // onPress={() => {
                        //   setData({
                        //     ...data,
                        //     participants: [...data.participants, e._id],
                        //   });
                        //   setSearch('');
                        // }}
                        style={{
                          borderWidth: 1,
                          borderColor: color.gray3,
                          alignSelf: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          backgroundColor: color.white,
                          paddingHorizontal: responsiveScreenWidth(2),
                          paddingVertical: responsiveScreenHeight(0.5),
                          borderRadius: 7,
                        }}>
                        <View
                          style={{
                            width: responsiveScreenWidth(8),
                            aspectRatio: 1,
                            borderRadius: 1212,
                            overflow: 'hidden',
                          }}>
                          <Image
                            source={{
                              uri: e.pic,
                            }}
                            style={{height: '100%', width: '100%'}}
                          />
                        </View>
                        <View style={{marginLeft: responsiveScreenWidth(2)}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: responsiveScreenWidth(2),
                            }}>
                            <Text
                              style={{
                                color: color.black87,
                                fontSize: responsiveScreenFontSize(1.5),
                                fontWeight: '400',
                              }}>
                              {e.name}
                            </Text>
                            <View
                              style={{
                                width: responsiveScreenWidth(4),
                                aspectRatio: 1,
                                borderRadius: 1212,
                                overflow: 'hidden',
                              }}>
                              <Image
                                source={require(`../../../assests/icons/minus-circle.png`)}
                                style={{
                                  height: '100%',
                                  width: '100%',
                                  tintColor: color.red,
                                }}
                              />
                            </View>
                          </View>
                          <Text
                            style={{
                              color: color.black60,
                              fontSize: responsiveScreenFontSize(1.4),
                              marginTop: responsiveScreenHeight(0.1),
                              fontWeight: '400',
                              fontFamily: font.NunitoSemiBold,
                            }}>
                            {e.tag}
                          </Text>
                        </View>
                      </Pressable>
                    ))}
                  </ScrollView>
                  {/* =================================================================================Set Priority================================================================================================ */}

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: responsiveScreenWidth(6),
                    }}>
                    <Text
                      style={{
                        color: color.primary,
                        fontFamily: font.NunitoSemiBold,
                        fontSize: responsiveScreenFontSize(1.8),
                      }}>
                      Set Priority
                    </Text>
                    <Pressable
                      onPress={() => setData({...data, priority: 'normal'})}
                      style={{
                        width: responsiveScreenWidth(23),
                        borderWidth: 1,
                        borderColor: color.black28,
                        borderRadius: 25,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        paddingVertical: responsiveScreenHeight(0.6),
                        paddingHorizontal: responsiveScreenWidth(2),
                        height: responsiveScreenHeight(3.2),
                        gap: responsiveScreenWidth(1),
                      }}>
                      <View
                        style={{
                          borderColor:
                            data.priority === 'normal'
                              ? color.secondary
                              : color.black28,
                          borderWidth: 1,
                          aspectRatio: 1,
                          borderRadius: 100,
                          marginHorizontal: responsiveScreenWidth(0.5),
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          padding: 2,
                        }}>
                        {data.priority === 'normal' && (
                          <View
                            style={{
                              aspectRatio: 1,
                              borderRadius: 100,
                              height: '100%',
                              backgroundColor: color.secondary,
                            }}></View>
                        )}
                      </View>
                      <Text
                        style={{
                          color: color.black87,
                          fontFamily: font.NunitoMedium,
                          fontSize: responsiveScreenFontSize(1.5),
                        }}>
                        Normal
                      </Text>
                    </Pressable>
                  </View>
                  {/* =================================================================================Date & Time Calander======================================================================================== */}

                  <Text
                    style={{
                      color: color.primary,
                      fontFamily: font.NunitoSemiBold,
                      fontSize: responsiveScreenFontSize(1.8),
                      marginTop: responsiveScreenHeight(2),
                      marginBottom: responsiveScreenHeight(1),
                    }}>
                    Date & Time
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      //   gap: responsiveScreenWidth(3),
                      position: 'relative',
                      marginBottom: responsiveScreenHeight(2),
                    }}>
                    {/* calandar---------------------------------------------------- */}

                    {/* clock icon---------------------------------------- */}
                    <Pressable
                      style={{
                        width: responsiveScreenWidth(11),
                        padding: responsiveScreenWidth(2.7),
                        aspectRatio: 1,
                        backgroundColor: color.white,
                        borderWidth: 1,
                        borderColor: color.gray2,
                        borderRadius: 100,
                      }}>
                      <Image
                        source={require(`../../../assests/icons/calendar.png`)}
                        style={{
                          height: '100%',
                          aspectRatio: 1,
                          tintColor: color.primary,
                        }}
                      />
                    </Pressable>

                    <View
                      style={{
                        paddingHorizontal: responsiveScreenWidth(2),
                        width: responsiveScreenWidth(30),
                        paddingVertical: responsiveScreenHeight(1),
                        gap: responsiveScreenWidth(2),
                        borderWidth: 1,
                        borderColor: color.black28,
                        borderRadius: 25,
                      }}>
                      <TextInput
                        keyboardType="default"
                        returnKeyType="done"
                        placeholder="DD/MM/YYYY"
                        style={{padding: 0}}
                        placeholderTextColor={color.black28}
                        value={'10/12/2024'}
                        editable={false}
                      />
                    </View>

                    {/* Time----------------------------------------------------------------- */}

                    <View
                      style={{
                        width: responsiveScreenWidth(11),
                        padding: responsiveScreenWidth(2.7),
                        aspectRatio: 1,
                        backgroundColor: color.white,
                        borderWidth: 1,
                        borderColor: color.gray2,
                        borderRadius: 100,
                      }}>
                      <Image
                        source={require(`../../../assests/icons/clock.png`)}
                        style={{
                          height: '100%',
                          aspectRatio: 1,
                          tintColor: color.primary,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        paddingHorizontal: responsiveScreenWidth(2),
                        width: responsiveScreenWidth(30),
                        paddingVertical: responsiveScreenHeight(1),
                        gap: responsiveScreenWidth(2),
                        borderWidth: 1,
                        borderColor: color.black28,
                        borderRadius: 25,
                      }}>
                      <TextInput
                        keyboardType="default"
                        returnKeyType="done"
                        placeholder="00:00:00"
                        style={{padding: 0}}
                        placeholderTextColor={color.black28}
                        // value={user.password}
                        onChangeText={e => {
                          // setUser({ ...user, password: e })
                        }}
                      />
                    </View>
                  </View>
                  {/* =================================================================================add location======================================================================================== */}
                  <Text
                    style={{
                      color: color.primary,
                      fontFamily: font.NunitoSemiBold,
                      fontSize: responsiveScreenFontSize(1.8),
                      marginBottom: responsiveScreenHeight(1),
                    }}>
                    Add Location
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      gap: responsiveScreenWidth(1),
                      alignItems: 'center',
                      marginBottom: responsiveScreenHeight(1),
                    }}>
                    <View
                      style={{
                        width: responsiveScreenWidth(11),
                        padding: responsiveScreenWidth(2.7),
                        aspectRatio: 1,
                        backgroundColor: color.white,
                        borderWidth: 1,
                        borderColor: color.gray2,
                        borderRadius: 100,
                      }}>
                      <Image
                        source={require(`../../../assests/icons/map-marker.png`)}
                        style={{
                          height: '100%',
                          aspectRatio: 1,
                          tintColor: color.primary,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        paddingHorizontal: responsiveScreenWidth(3),
                        flex: 1,
                        paddingVertical: responsiveScreenHeight(1.3),
                        gap: responsiveScreenWidth(2),
                        borderWidth: 1,
                        borderColor: color.black28,
                        borderRadius: 25,
                      }}>
                      <TextInput
                        keyboardType="default"
                        returnKeyType="done"
                        placeholder="Enter the location"
                        style={{padding: 0, color: color.black60}}
                        placeholderTextColor={color.black28}
                        // value={user.password}
                        onChangeText={e => {
                          // setUser({ ...user, password: e })
                        }}
                      />
                    </View>
                  </View>
                  {/* ===============================================================================================Repeat========================================================================================== */}

                  <View
                    style={{
                      gap: responsiveScreenHeight(1),
                    }}>
                    <Text
                      style={{
                        color: color.primary,
                        fontFamily: font.NunitoSemiBold,
                        fontSize: responsiveScreenFontSize(1.8),
                      }}>
                      Repeat
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: responsiveScreenWidth(1),
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: responsiveScreenWidth(11),
                          padding: responsiveScreenWidth(2.7),
                          aspectRatio: 1,
                          backgroundColor: color.white,
                          borderWidth: 1,
                          borderColor: color.gray2,
                          borderRadius: 100,
                        }}>
                        <Image
                          source={require(`../../../assests/icons/category2.png`)}
                          style={{
                            height: '100%',
                            aspectRatio: 1,
                            tintColor: color.primary,
                          }}
                        />
                      </View>
                      <View
                        onPress={() => setDropdownVisible(!dropdownVisible)}
                        style={{
                          position: 'relative',
                          flex: 1,
                          paddingVertical: responsiveScreenHeight(1.3),
                          paddingHorizontal: 15,
                          borderWidth: 1,
                          borderColor: color.black28,
                          borderRadius: 25,
                          zIndex: 7,
                        }}>
                        {/* TextInput to show the selected value */}
                        <View
                          style={{
                            flexDirection: 'row',
                            // width: '100%',
                          }}>
                          <TextInput
                            placeholder="Select Frequency"
                            value={selectedOption}
                            editable={false}
                            style={{
                              padding: 0,
                              color: 'black',
                              width: responsiveScreenWidth(68),
                              fontFamily: font.NunitoSemiBold,
                            }}
                            placeholderTextColor={color.black20}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  {/* ===============================================================================================Attachments===================================================================================== */}
                  <Text
                    style={{
                      color: color.primary,
                      fontFamily: font.NunitoSemiBold,
                      fontSize: responsiveScreenFontSize(1.8),
                      marginTop: responsiveScreenHeight(2),
                      marginBottom: responsiveScreenHeight(1),
                    }}>
                    Attachments
                  </Text>
                  <View
                    // key={index}
                    style={{
                      gap: responsiveScreenHeight(1),
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: responsiveScreenWidth(11),
                        padding: responsiveScreenWidth(2.4),
                        aspectRatio: 1,
                        backgroundColor: color.white,
                        borderWidth: 1,
                        borderColor: color.gray2,
                        borderRadius: 100,
                      }}>
                      <Image
                        source={require(`../../../assests/icons/link.png`)}
                        style={{
                          height: '110%',
                          aspectRatio: 1,
                          tintColor: color.primary,
                        }}
                      />
                    </View>

                    <View
                      style={{
                        width: responsiveScreenWidth(45),
                        padding: responsiveScreenWidth(2.7),
                        backgroundColor: color.white,
                        borderWidth: 1,
                        borderColor: color.primary,
                        borderRadius: 30,
                        overflow: 'hidden',
                      }}>
                      <Text
                        style={{
                          color: color.black60,
                          fontFamily: font.NunitoMedium,
                          fontSize: responsiveScreenFontSize(1.8),
                          width: responsiveScreenWidth(80),
                        }}>
                        {'documents_for_test'.length > 8
                          ? `${'documents_for_test'.substring(0, 20)}...`
                          : 'documents_for_test'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* ===============================================================================================Final buttons========================================================================================= */}
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginTop: responsiveScreenHeight(2.7),
                  gap: responsiveScreenWidth(8),
                }}>
                <Pressable
                  //   onPress={() => cancel.on()}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: color.red,
                    paddingVertical: responsiveScreenHeight(0.7),
                    borderWidth: 1,
                    borderRadius: 50,
                    width: responsiveScreenWidth(33),
                  }}>
                  <Text
                    style={{
                      color: color.black87,
                      fontFamily: font.NunitoMedium,
                      fontSize: responsiveScreenFontSize(1.7),
                    }}>
                    Cancel
                  </Text>
                </Pressable>

                <Pressable
                  //   onPress={() => ok.on()}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: color.primary,
                    borderWidth: 1,
                    paddingVertical: responsiveScreenHeight(0.7),
                    width: responsiveScreenWidth(33),

                    borderRadius: 50,
                  }}>
                  <Text
                    style={{
                      color: color.black87,
                      fontFamily: font.NunitoMedium,
                      fontSize: responsiveScreenFontSize(1.7),
                    }}>
                    Re-Schedule
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default MeetingDetail;
