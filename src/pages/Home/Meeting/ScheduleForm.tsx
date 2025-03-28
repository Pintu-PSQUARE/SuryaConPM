/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable curly */
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
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AnimatedInput, Header} from '../../../component';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {color, font, routes} from '../../../config/Env';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {GetContact} from '../../../redux/slice/ContactSlice';
import {truncateText} from '../../../../function';
import DocumentPicker from 'react-native-document-picker';
import Models from '../../../component/Model';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

type DocumentType = {
  name: string | null;
  uri: string;
};

const ScheduleForm = () => {
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
  const {contact} = useAppSelector(state => state.contactStore);
  const [info, setInfo] = useState<{priority: boolean; selectDate: boolean}>({
    priority: false,
    selectDate: false,
  });
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
  const participantsDropdown = () => {
    if (!search) return null;
    const a = contact.filter(e =>
      e.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    );
    if (a.length <= 0) return null;
    return (
      <View
        style={{
          flex: 1,
          borderColor: color.gray3,
          borderWidth: 1,
          maxHeight: responsiveScreenHeight(40),
          paddingHorizontal: responsiveScreenWidth(3),
          paddingVertical: responsiveScreenHeight(1),
          gap: responsiveScreenHeight(1),
          borderRadius: 20,
          position: 'absolute',
          top: '180%',
          width: '100%',
          backgroundColor: color.white,
          zIndex: 9,
          right: 1,
        }}>
        {a.map(e => (
          <Pressable
            key={e._id}
            onPress={() => {
              setData({...data, participants: [...data.participants, e]});
              setSearch('');
            }}
            style={{
              width: '100%',
              alignSelf: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: color.white,
            }}>
            <View
              style={{
                width: responsiveScreenWidth(12),
                aspectRatio: 1,
                borderRadius: 1212,
                overflow: 'hidden',
              }}>
              <Image
                source={{
                  uri: 'https://www.befunky.com/images/wp/wp-2022-12-social-media-profile-picture-1.jpg?auto=avif,webp&format=jpg&width=950',
                }}
                style={{height: '100%', width: '100%'}}
              />
            </View>
            <View style={{flex: 1, marginLeft: responsiveScreenWidth(4)}}>
              <Text
                style={{
                  color: color.black87,
                  fontSize: responsiveScreenFontSize(2),
                  fontWeight: '400',
                }}>
                {e.name}
              </Text>
              <Text
                style={{
                  color: color.black60,
                  fontSize: responsiveScreenFontSize(1.6),
                  fontWeight: '400',
                  fontFamily: font.NunitoSemiBold,
                }}>
                {truncateText('Role', 29)}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    );
  };

  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  const [monthModal, setMonthModal] = useState(false);
  const [calanderModal, setCalanderModal] = useState(false);
  const [attentionModal, setAttentionModal] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState(10);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedDocuments, setSelectedDocuments] = useState<DocumentType[]>(
    [],
  );
  const generateDaysInMonth = (year: number, month: number) => {
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
  const getWeeks = (days: string | any[]) => {
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  };
  const weeks = getWeeks(daysInMonth);

  const openFileExplorer = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // Allow all file types
      });

      setSelectedDocuments(prevDocs => [
        ...prevDocs,
        {name: res[0].name, uri: res[0].uri},
      ]);
      // Log the file details (e.g., name, URI)
      console.log('Selected file:', res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // Handle cancellation
        console.log('File selection cancelled');
      } else {
        // Handle other errors
        console.error('Error selecting file:', err);
      }
    }
  };

  return (
    <>
      <Models
        icon={
          <Image
            source={require(`../../../assests/icons/alert-triangle.png`)}
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
          on: () => navigation.navigate(routes.MEETING_DETAIL),
          title: 'Schedule',
        }}
        setModalVisible={function (value: React.SetStateAction<boolean>): void {
          throw new Error('Function not implemented.');
        }}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={{flex: 1}}>
          <Header title={'Schedule Meeting'}>
            <>
              <Pressable
                onPress={() => navigation.navigate(routes.MEETING_HISTORY)}>
                <Image
                  source={require(`../../../assests/icons/History.png`)}
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
              {/* =================================================================================Title===================================================================================================== */}

              <AnimatedInput
                label="Title"
                value={data.title}
                onChange={e => {
                  setData({...data, title: e});
                }}
              />

              {/* =================================================================================Description================================================================================================ */}

              <View
                style={{
                  height: responsiveScreenHeight(16),
                  marginTop: responsiveScreenHeight(-0.5),
                }}>
                <AnimatedInput
                  label="Description"
                  value={data.description}
                  onChange={e => {
                    setData({...data, description: e});
                  }}
                  multiline={true}
                />
              </View>

              {/* =================================================================================Add participants============================================================================================ */}

              <Text
                style={{
                  color: color.black87,
                  fontFamily: font.NunitoMedium,
                  fontSize: responsiveScreenFontSize(1.8),
                  marginTop: responsiveScreenHeight(0.5),
                }}>
                Add Participants
              </Text>
              <View
                style={{
                  position: 'relative',
                  zIndex: 10,
                  flexDirection: 'row',
                  paddingVertical: responsiveScreenHeight(1),
                  gap: responsiveScreenWidth(2),
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: color.black28,
                  borderRadius: 25,
                }}>
                <View
                  style={{
                    maxHeight: responsiveScreenHeight(2),
                    alignItems: 'flex-start',
                    marginLeft: responsiveScreenWidth(3),
                  }}>
                  <Image
                    source={require(`../../../assests/icons/search.png`)}
                    style={{
                      height: '100%',
                      aspectRatio: 1,
                      tintColor: color.black28,
                    }}
                  />
                </View>
                <TextInput
                  keyboardType="default"
                  returnKeyType="done"
                  placeholder="Find Participants"
                  style={{padding: 0, marginRight: responsiveScreenWidth(3)}}
                  placeholderTextColor={color.black28}
                  value={search}
                  onChangeText={e => {
                    setSearch(e);
                  }}
                />
                {participantsDropdown()}
              </View>
              {data.participants.length > 0 && (
                <ScrollView
                  contentContainerStyle={{gap: responsiveScreenWidth(2)}}
                  showsHorizontalScrollIndicator={false}
                  style={{maxHeight: responsiveScreenHeight(7), width: '100%'}}
                  horizontal>
                  {data.participants.map(e => (
                    <Pressable
                      key={e._id}
                      onPress={() => {
                        setData({
                          ...data,
                          participants: [...data.participants, e._id],
                        });
                        setSearch('');
                      }}
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
                            uri: 'https://www.befunky.com/images/wp/wp-2022-12-social-media-profile-picture-1.jpg?auto=avif,webp&format=jpg&width=950',
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
                          {e.employeeId && truncateText(e?.employeeId, 29)}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </ScrollView>
              )}

              {/* =================================================================================Set Priority================================================================================================ */}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 8,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: responsiveScreenWidth(1),
                  }}>
                  <Text
                    style={{
                      color: color.black87,
                      fontFamily: font.NunitoMedium,
                      fontSize: responsiveScreenFontSize(1.8),
                    }}>
                    Set Priority
                  </Text>
                  <Pressable
                    onPress={() => {
                      setInfo({priority: !info.priority});
                    }}
                    style={{
                      maxHeight: responsiveScreenHeight(2),
                      alignItems: 'flex-start',
                      marginTop: responsiveScreenHeight(0.3),
                    }}>
                    <Image
                      source={require(`../../../assests/icons/Discription.png`)}
                      style={{
                        height: '100%',
                        aspectRatio: 1,
                        tintColor: color.primary,
                      }}
                    />
                  </Pressable>
                </View>
                <View
                  style={{
                    marginTop: responsiveScreenHeight(0.5),
                    justifyContent: 'center',
                    flexDirection: 'row',
                    gap: responsiveScreenWidth(2),
                  }}>
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
                  <Pressable
                    onPress={() => setData({...data, priority: 'urgent'})}
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
                          data.priority === 'urgent'
                            ? color.red
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
                      {data.priority === 'urgent' && (
                        <View
                          style={{
                            aspectRatio: 1,
                            borderRadius: 100,
                            height: '100%',
                            backgroundColor: color.red,
                          }}></View>
                      )}
                    </View>
                    <Text
                      style={{
                        color: color.black87,
                        fontFamily: font.NunitoMedium,
                        fontSize: responsiveScreenFontSize(1.5),
                      }}>
                      Urgent
                    </Text>
                  </Pressable>
                </View>
                {info.priority && (
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: color.gray3,
                      position: 'absolute',
                      width: '100%',
                      top: '120%',
                      backgroundColor: color.white,
                      paddingVertical: responsiveScreenHeight(1),
                      paddingHorizontal: responsiveScreenWidth(3),
                      borderRadius: 15,
                      zIndex: 99,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: responsiveScreenWidth(3),
                      }}>
                      <View
                        style={{
                          aspectRatio: 1,
                          width: responsiveScreenWidth(2),
                          borderRadius: 100,
                          backgroundColor: color.red,
                        }}></View>
                      <Text
                        style={{
                          fontSize: responsiveScreenFontSize(1.5),
                          fontFamily: font.NunitoRegular,
                          color: color.black60,
                        }}>
                        &quot;High ( Urgent )&quot; sends your meeting as a
                        request.
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: responsiveScreenWidth(3),
                      }}>
                      <View
                        style={{
                          aspectRatio: 1,
                          width: responsiveScreenWidth(2),
                          borderRadius: 100,
                          backgroundColor: color.secondary,
                        }}></View>
                      <Text
                        style={{
                          fontSize: responsiveScreenFontSize(1.5),
                          fontFamily: font.NunitoRegular,
                          color: color.black60,
                        }}>
                        &quot;Medium ( Moderate )&ldquo; schedules your meeting
                        with a normal priority
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              {/* =================================================================================Date & Time Calander======================================================================================== */}

              <Text
                style={{
                  color: color.black87,
                  fontFamily: font.NunitoMedium,
                  fontSize: responsiveScreenFontSize(1.8),
                  marginTop: responsiveScreenHeight(0.5),
                }}>
                Date & Time
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: responsiveScreenWidth(3),
                  position: 'relative',
                }}>
                {/* calandar---------------------------------------------------- */}
                <View
                  style={{
                    flexDirection: 'row',
                    gap: responsiveScreenWidth(1),
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  {/* clock icon---------------------------------------- */}
                  <Pressable
                    onPress={() => setCalanderModal(prev => !prev)}
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
                      paddingHorizontal: responsiveScreenWidth(3),
                      width: responsiveScreenWidth(33),
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
                      value={
                        data.date
                          ? `${String(data.date.getDate()).padStart(
                              2,
                              '0',
                            )}/${String(data.date.getMonth() + 1).padStart(
                              2,
                              '0',
                            )}/${data.date.getFullYear()}`
                          : ''
                      }
                      editable={false}
                    />
                  </View>
                </View>
                {/* Time----------------------------------------------------------------- */}
                <View
                  style={{
                    flexDirection: 'row',
                    gap: responsiveScreenWidth(1),
                    // flex: 1,
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
                      paddingHorizontal: responsiveScreenWidth(3),
                      width: responsiveScreenWidth(33),
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

                {calanderModal && (
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: color.gray3,
                      position: 'absolute',
                      width: '100%',
                      top: '120%',
                      backgroundColor: color.white,
                      paddingVertical: responsiveScreenHeight(1),
                      paddingHorizontal: responsiveScreenWidth(3),
                      borderRadius: 15,
                      zIndex: 8,
                    }}>
                    {/* Month and Year Selector */}
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: responsiveScreenWidth(2),
                        position: 'relative',
                        zIndex: 12,
                      }}>
                      <Pressable
                        onPress={() => setMonthModal(prev => !prev)}
                        style={{
                          flexDirection: 'row',
                          gap: responsiveScreenWidth(2),
                        }}>
                        <Text
                          style={{
                            color: color.black87,
                            fontFamily: font.NunitoMedium,
                            fontSize: responsiveScreenFontSize(1.7),
                          }}>
                          {months[selectedMonth]} {selectedYear}
                        </Text>
                        <View
                          style={{
                            aspectRatio: 1,
                            backgroundColor: color.white,
                            width: responsiveScreenWidth(5),
                          }}>
                          <Image
                            source={require(`../../../assests/icons/chevron-down.png`)}
                            style={{
                              height: '100%',
                              aspectRatio: 1,
                              tintColor: color.primary,
                            }}
                          />
                        </View>
                      </Pressable>
                      {monthModal && (
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: color.gray2,
                            backgroundColor: color.white,
                            paddingHorizontal: responsiveScreenWidth(2),
                            position: 'absolute',
                            top: '120%',
                            left: '5%',
                            elevation: 2,
                            borderRadius: 20,
                          }}>
                          <ScrollView
                            contentContainerStyle={{
                              flexGrow: 1,
                            }}
                            nestedScrollEnabled={true}
                            showsVerticalScrollIndicator={true}
                            style={{
                              maxHeight: responsiveScreenHeight(34),
                              paddingVertical: responsiveScreenWidth(2),
                            }}>
                            <View style={{flex: 1}}>
                              {months.map((month, index) => (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => {
                                    setSelectedMonth(index);
                                    setMonthModal(false);
                                  }}
                                  activeOpacity={0.7}
                                  style={{
                                    elevation:
                                      months[selectedMonth] === month ? 1 : 0,
                                    borderWidth: 0.5,
                                    borderColor: color.gray2,
                                    borderRadius: 20,
                                    backgroundColor:
                                      months[selectedMonth] === month
                                        ? color.gray3
                                        : color.white,
                                    paddingVertical:
                                      responsiveScreenHeight(0.1),
                                    marginBottom: responsiveScreenHeight(0.5),
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: font.NunitoMedium,
                                      fontSize: responsiveScreenFontSize(1.5),
                                      paddingHorizontal:
                                        responsiveScreenWidth(4.8),
                                      textAlign: 'center',
                                      color:
                                        months[selectedMonth] === month
                                          ? color.primary
                                          : color.black60,
                                    }}>
                                    {month}
                                  </Text>
                                </TouchableOpacity>
                              ))}
                            </View>
                          </ScrollView>
                        </View>
                      )}
                    </View>

                    {/* Days of the Week */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: responsiveScreenHeight(1.5),
                      }}>
                      {shortWeekNames.map(day => (
                        <Text
                          key={day}
                          style={{
                            textAlign: 'center',
                            flex: 1,
                            color: color.black60,
                            fontFamily: font.NunitoMedium,
                            fontSize: responsiveScreenFontSize(1.5),
                          }}>
                          {day}
                        </Text>
                      ))}
                    </View>

                    {/* Days in the Month */}
                    <View style={{marginTop: responsiveScreenHeight(1)}}>
                      {weeks.map((week, weekIndex) => (
                        <View
                          key={weekIndex}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: responsiveScreenHeight(0.5),
                          }}>
                          {week.map((day, index) => {
                            const today = new Date();
                            const isPreviousMonthDay =
                              weekIndex === 0 && day > 20;
                            const isNextMonthDay = weekIndex >= 4 && day < 15;

                            let currentDate = new Date();
                            currentDate.setFullYear(selectedYear);

                            if (isPreviousMonthDay) {
                              currentDate.setMonth(selectedMonth - 1);
                            } else if (isNextMonthDay) {
                              currentDate.setMonth(selectedMonth + 1);
                            } else {
                              currentDate.setMonth(selectedMonth);
                            }
                            currentDate.setDate(day);

                            const isPastDate = currentDate < today;
                            const isSelectedDate =
                              data.date?.getDate() === day &&
                              data.date?.getMonth() ===
                                currentDate.getMonth() &&
                              data.date?.getFullYear() ===
                                currentDate.getFullYear();

                            return (
                              <View
                                key={index}
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  onPress={() => {
                                    if (!isPastDate) {
                                      setData({...data, date: currentDate});
                                      setCalanderModal(prev => !prev);
                                    }
                                  }}
                                  style={{
                                    textAlign: 'center',
                                    backgroundColor: isSelectedDate
                                      ? color.primary
                                      : color.white,
                                    aspectRatio: 1,
                                    borderRadius: 20,
                                    paddingVertical:
                                      responsiveScreenHeight(0.5),
                                    color: isSelectedDate
                                      ? color.white
                                      : isPastDate
                                      ? color.black28
                                      : color.black87,

                                    fontSize: responsiveScreenFontSize(1.5),
                                  }}>
                                  {day}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>

              {/* ===============================================================================================Add Location==================================================================================== */}

              <View style={{gap: responsiveScreenHeight(1)}}>
                <Text
                  style={{
                    color: color.black87,
                    fontFamily: font.NunitoMedium,
                    fontSize: responsiveScreenFontSize(1.8),
                    marginTop: responsiveScreenHeight(0.5),
                  }}>
                  Add Location
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
              </View>

              {/* ===============================================================================================Repeat========================================================================================== */}

              <View
                style={{
                  gap: responsiveScreenHeight(1),
                }}>
                <Text
                  style={{
                    color: color.black87,
                    fontFamily: font.NunitoMedium,
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
                  <Pressable
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

                      {dropdownVisible ? (
                        <Image
                          source={require(`../../../assests/icons/chevron-up.png`)}
                          style={{
                            width: '7%',
                            aspectRatio: 1,
                            tintColor: color.primary,
                          }}
                        />
                      ) : (
                        <Image
                          source={require(`../../../assests/icons/chevron-down.png`)}
                          style={{
                            width: '7%',
                            aspectRatio: 1,
                            tintColor: color.primary,
                          }}
                        />
                      )}
                    </View>

                    {/* Dropdown options */}
                    {dropdownVisible && (
                      <View
                        style={{
                          position: 'absolute',
                          top: responsiveScreenHeight(5.2),
                          left: '16%',
                          // flex: 1,
                          // maxHeight: 200,
                          borderColor: color.black15,
                          borderWidth: 1,
                          elevation: 1,
                          borderRadius: 20,
                          backgroundColor: color.white,
                          padding: 5,
                        }}>
                        {/* Dropdown Items */}
                        {['Once', 'Daily', 'Weekly'].map((item, index) => (
                          <Pressable
                            key={index}
                            onPress={() => {
                              setSelectedOption(item);
                              setDropdownVisible(false);
                            }}
                            style={{
                              paddingVertical: responsiveScreenHeight(1.2),
                              paddingHorizontal: responsiveScreenWidth(4),
                              width: responsiveScreenWidth(65),
                              borderRadius: 20,
                              justifyContent: 'flex-start',
                              backgroundColor:
                                selectedOption === item
                                  ? color.gray2
                                  : 'transparent',
                              marginBottom: 5,
                              // zIndex: 9,
                            }}>
                            <Text
                              style={{
                                color:
                                  selectedOption === item
                                    ? color.primary
                                    : color.black60,
                                fontSize: 16,
                              }}>
                              {item}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </Pressable>
                </View>
              </View>

              {/* ===============================================================================================Attachments===================================================================================== */}

              <View style={{gap: responsiveScreenHeight(0.5)}}>
                <View
                  style={{
                    gap: responsiveScreenHeight(1),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: responsiveScreenHeight(-1),
                  }}>
                  <Text
                    style={{
                      color: color.black87,
                      fontFamily: font.NunitoMedium,
                      fontSize: responsiveScreenFontSize(1.8),
                      width: responsiveScreenWidth(80),
                    }}>
                    Attachments
                  </Text>
                  <Pressable
                    onPress={openFileExplorer}
                    style={{
                      width: responsiveScreenWidth(11),
                      justifyContent: 'center',
                      alignItems: 'center',
                      aspectRatio: 1,
                    }}>
                    <Image
                      source={require(`../../../assests/icons/add-circle.png`)}
                      style={{
                        height: '60%',
                        aspectRatio: 1,
                        tintColor: color.primary,
                      }}
                    />
                  </Pressable>
                </View>
                {selectedDocuments.map((doc, index) => (
                  <View
                    key={index}
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
                        {doc.name.length > 8
                          ? `${doc.name.substring(0, 20)}...`
                          : doc.name}
                      </Text>
                    </View>

                    <Pressable
                      onPress={() =>
                        setSelectedDocuments(prevDocs =>
                          prevDocs.filter((_, i) => i !== index),
                        )
                      }
                      style={{
                        width: responsiveScreenWidth(11),
                        justifyContent: 'center',
                        alignItems: 'center',
                        aspectRatio: 1,
                      }}>
                      <Image
                        source={require(`../../../assests/icons/bin.png`)}
                        style={{
                          height: '60%',
                          aspectRatio: 1,
                          tintColor: color.red,
                        }}
                      />
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity
            onPress={() => setAttentionModal(true)}
            style={{
              position: 'absolute',
              bottom: responsiveScreenHeight(1),
              left: '50%',
              transform: [{translateX: -responsiveScreenWidth(27.5)}],
              paddingVertical: responsiveScreenHeight(1.8),
              width: responsiveScreenWidth(55),
              backgroundColor: color.primary,
              borderRadius: 30,
              elevation: 2,
              zIndex: 9,
            }}>
            <Text
              style={{
                color: color.white,
                fontFamily: font.NunitoSemiBold,
                fontSize: responsiveScreenFontSize(2),
                textAlign: 'center',
                letterSpacing: 0.5,
              }}>
              Create
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* ===============================================================================================Create button========================================================================================= */}
    </>
  );
};

export default ScheduleForm;
