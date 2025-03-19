/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color, font} from '../../config/Env';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {style} from '../Auth/ForgotPassword';
import {Contact} from '../../sql';
import {BlurView} from '@react-native-community/blur';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

const contactObj = new Contact();

const ContactsPage = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const alphabet = Array.from({length: 26}, (_, i) =>
    String.fromCharCode(65 + i),
  );
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }
  const [contact, setContact] = useState([]);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const ReadContact = async () => {
      // let result;
      // if (Platform.OS === "android") {
      //   result = await request(PERMISSIONS.ANDROID.READ_CONTACTS);
      // }
      // else {
      //   result = await request(PERMISSIONS.IOS.CONTACTS);
      // }

      // if (result === RESULTS.GRANTED) {
      //   Contacts.getAll()
      //     .then((contacts) => {
      //     })
      //     .catch((e) => {
      //       console.error(e);
      //     });
      // } else {
      //   Alert.alert("Permission Denied", "Cannot access contacts.");
      // }

      const a = await contactObj.getContact();
      setContact(a);
    };
    ReadContact();
  }, []);
  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={color.primary}
        translucent={false}
      />
      <View style={{flex: 1, backgroundColor: color.white}}>
        <View
          style={{
            backgroundColor: color.primary,
            paddingVertical: responsiveScreenHeight(2),
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <Entypo
              name="chevron-small-left"
              style={{
                color: color.white,
                fontSize: responsiveScreenFontSize(4),
                flex: 1,
              }}
            />
          </Pressable>
          <Text
            style={{
              fontFamily: font.NunitoSemiBold,
              color: color.white,
              textAlign: 'center',
              fontSize: responsiveScreenFontSize(2.4),
              flex: 1,
            }}>
            Contacts
          </Text>
          <TouchableOpacity
            onPress={() => setStep(step === 0 ? 1 : 0)}
            style={{
              flex: 1,
              maxHeight: responsiveScreenHeight(2.6),
              marginRight: responsiveScreenWidth(2),
              alignItems: 'flex-end',
            }}>
            <Image
              source={require(`../../assests/icons/user-add.png`)}
              style={{height: '100%', aspectRatio: 1, tintColor: color.white}}
            />
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, flexDirection: 'row', position: 'relative'}}>
          <Model step={step} setStep={setStep} />
          <View
            style={{
              height: '100%',
              width: responsiveScreenWidth(8),
              paddingVertical: responsiveScreenHeight(1),
              justifyContent: 'space-between',
            }}>
            {alphabet.map((letter, index) => (
              <Text
                key={index}
                style={{
                  fontFamily: font.NunitoRegular,
                  backgroundColor: color.gray2,
                  color: color.black60,
                  paddingVertical: responsiveScreenHeight(0.4),
                  textAlign: 'center',
                  width: '80%',
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}>
                {letter}
              </Text>
            ))}
          </View>
          <View
            style={{
              height: '100%',
              width: responsiveScreenWidth(92),
              paddingHorizontal: responsiveScreenWidth(3),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: responsiveScreenWidth(4),
              }}>
              <View
                style={{
                  flex: 1,
                  borderWidth: 2,
                  borderColor: color.black15,
                  marginVertical: responsiveScreenHeight(1),
                  borderRadius: 200,
                  alignItems: 'center',
                  paddingHorizontal: responsiveScreenWidth(3.5),
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../../assests/icons/search.png')}
                  style={{
                    width: responsiveScreenWidth(4.8),
                    height: responsiveScreenHeight(2.8),
                    tintColor: 'black',
                  }}
                />
                <TextInput
                  style={{
                    fontFamily: font.NunitoRegular,
                    flex: 1,
                    paddingHorizontal: responsiveScreenWidth(2),
                    color: color.black60,
                    fontSize: responsiveScreenFontSize(1.6),
                  }}
                  placeholderTextColor={color.black60}
                  placeholder="Search contacts"
                />
              </View>
              <Image
                source={require('../../assests/icons/filter.png')}
                style={{tintColor: 'black'}}
              />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{gap: responsiveScreenHeight(1.7)}}>
                {[...contact]
                  .sort((a, b) => a?.displayName?.localeCompare(b?.displayName))
                  .map((e, i) => (
                    <View
                      key={e?.id}
                      style={{
                        flexDirection: 'row',
                        gap: responsiveScreenWidth(3),
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: responsiveScreenWidth(12),
                          aspectRatio: 1,
                          borderRadius: 1212,
                          overflow: 'hidden',
                        }}>
                        {e?.thumbnailPath ? (
                          <Image
                            source={{uri: e?.thumbnailPath}}
                            style={{height: '100%', width: '100%'}}
                          />
                        ) : (
                          <View
                            style={{
                              height: '100%',
                              width: '100%',
                              backgroundColor: color.primary,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: responsiveScreenFontSize(2),
                                color: color.white,
                                textTransform: 'uppercase',
                                fontFamily: font.NunitoSemiBold,
                              }}>
                              {e?.name?.charAt(0)}
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text
                        style={{
                          fontFamily: font.NunitoRegular,
                          color: color.black87,
                          fontSize: responsiveScreenFontSize(2.1),
                          textTransform: 'capitalize',
                        }}>
                        {e?.name || e?.number}
                      </Text>
                    </View>
                  ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </>
  );
};
const Model = ({step, setStep}) => {
  const [user, setUser] = useState({
    name: '',
    last: '',
    number: '',
    note: '',
    department: '',
    designation: '',
  });
  const [type, setType] = useState('');
  const [dropdown, setDropdown] = useState('Department');
  switch (step) {
    case 1:
      return (
        <>
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 10,
            }}>
            <View
              style={{
                height: '95%',
                width: '90%',
                borderRadius: 20,
                overflow: 'hidden',
                backgroundColor: 'transparent',
                position: 'relative',
              }}>
              <View
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  backgroundColor: color.black60,
                  opacity: 0.5,
                  top: 0,
                  right: 0,
                  zIndex: 9,
                }}></View>
              {/* <BlurView blurType="light" style={{ height: "100%", width: "100%", position: "absolute" }}>

              </BlurView> */}
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  paddingVertical: responsiveScreenHeight(2),
                  gap: responsiveScreenHeight(1.1),
                  position: 'relative',
                  zIndex: 10,
                }}>
                <View
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    gap: responsiveScreenWidth(3),
                    alignItems: 'center',
                    marginBottom: responsiveScreenWidth(2),
                  }}>
                  <View
                    style={{
                      borderWidth: 2,
                      flex: 1,
                      borderColor: color.primary,
                      borderRadius: 30,
                    }}>
                    <Text
                      style={{
                        fontFamily: font.NunitoSemiBold,
                        fontSize: responsiveScreenFontSize(2.2),
                        color: color.primary,
                        paddingVertical: responsiveScreenHeight(0.8),
                        textAlign: 'center',
                      }}>
                      Import
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{}}
                    onPress={() => {
                      setStep(0);
                    }}>
                    <Image
                      source={require('../../assests/icons/x.png')}
                      style={{
                        width: responsiveScreenHeight(3),
                        tintColor: color.primary,
                        height: responsiveScreenHeight(3),
                        resizeMode: 'center',
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    gap: responsiveScreenWidth(3),
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: color.white,
                      width: responsiveScreenHeight(5),
                      borderRadius: 30,
                      margin: 2,
                      padding: responsiveScreenHeight(0.5),
                      aspectRatio: 1,
                      elevation: 5,
                      overflow: 'hidden',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../assests/icons/user.png')}
                      style={{
                        backgroundColor: color.white,
                        width: '80%',
                        tintColor: color.primary,
                        height: '80%',
                        resizeMode: 'center',
                      }}
                    />
                  </View>
                  <TextInput
                    style={{
                      ...style.input,
                      borderColor: color.gray3,
                      borderWidth: 1,
                      paddingVertical: responsiveScreenHeight(1),
                    }}
                    keyboardType="default"
                    maxLength={10}
                    returnKeyType="done"
                    placeholder="First Name"
                    placeholderTextColor={color.black60}
                    value={user.name}
                    onChangeText={e => {
                      setUser({...user, name: e});
                    }}
                  />
                </View>
                <View
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    gap: responsiveScreenWidth(3),
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: responsiveScreenHeight(5),
                      margin: 2,
                      padding: responsiveScreenHeight(0.5),
                      aspectRatio: 1,
                      overflow: 'hidden',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../assests/icons/user.png')}
                      style={{
                        width: '80%',
                        height: '80%',
                        resizeMode: 'center',
                        tintColor: 'transparent',
                      }}
                    />
                  </View>
                  <TextInput
                    style={{
                      ...style.input,
                      borderColor: color.gray3,
                      borderWidth: 1,
                      paddingVertical: responsiveScreenHeight(1),
                    }}
                    keyboardType="default"
                    maxLength={10}
                    returnKeyType="done"
                    placeholder="Last Name"
                    placeholderTextColor={color.black60}
                    value={user.last}
                    onChangeText={e => {
                      setUser({...user, last: e});
                    }}
                  />
                </View>

                <View
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    gap: responsiveScreenWidth(3),
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: color.white,
                      width: responsiveScreenHeight(5),
                      borderRadius: 30,
                      margin: 2,
                      padding: responsiveScreenHeight(0.5),
                      aspectRatio: 1,
                      elevation: 5,
                      overflow: 'hidden',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../assests/icons/call.png')}
                      style={{
                        backgroundColor: color.white,
                        width: '80%',
                        tintColor: color.primary,
                        height: '80%',
                        resizeMode: 'center',
                      }}
                    />
                  </View>
                  <TextInput
                    style={{
                      ...style.input,
                      borderColor: color.gray3,
                      borderWidth: 1,
                      paddingVertical: responsiveScreenHeight(1),
                    }}
                    keyboardType="default"
                    maxLength={10}
                    returnKeyType="done"
                    placeholder="Mobile Number"
                    placeholderTextColor={color.black60}
                    value={user.number}
                    onChangeText={e => {
                      setUser({...user, number: e});
                    }}
                  />
                </View>

                <View
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    gap: responsiveScreenWidth(3),
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => setType('Internal')}
                    style={{
                      borderWidth: 2,
                      flex: 1,
                      borderColor: color.primary,
                      backgroundColor:
                        type === 'Internal' ? color.primary : color.white,
                      borderRadius: 30,
                    }}>
                    <Text
                      style={{
                        fontFamily: font.NunitoSemiBold,
                        fontSize: responsiveScreenFontSize(2.2),
                        color:
                          type !== 'Internal' ? color.primary : color.white,
                        paddingVertical: responsiveScreenHeight(0.8),
                        textAlign: 'center',
                      }}>
                      Internal
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setType('External')}
                    style={{
                      borderWidth: 2,
                      flex: 1,
                      borderColor: color.primary,
                      borderRadius: 30,
                      backgroundColor:
                        type === 'External' ? color.primary : color.white,
                    }}>
                    <Text
                      style={{
                        fontFamily: font.NunitoSemiBold,
                        fontSize: responsiveScreenFontSize(2.2),
                        color:
                          type !== 'External' ? color.primary : color.white,
                        paddingVertical: responsiveScreenHeight(0.8),
                        textAlign: 'center',
                      }}>
                      External
                    </Text>
                  </TouchableOpacity>
                </View>
                {type === 'Internal' && (
                  <>
                    <View
                      style={{
                        width: '90%',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        gap: responsiveScreenWidth(3),
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: color.white,
                          width: responsiveScreenHeight(5),
                          borderRadius: 30,
                          margin: 2,
                          padding: responsiveScreenHeight(0.5),
                          aspectRatio: 1,
                          elevation: 5,
                          overflow: 'hidden',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('../../assests/icons/call.png')}
                          style={{
                            backgroundColor: color.white,
                            width: '80%',
                            tintColor: color.primary,
                            height: '80%',
                            resizeMode: 'center',
                          }}
                        />
                      </View>

                      <TouchableOpacity
                        onPress={() =>
                          setDropdown(
                            dropdown === 'Department' ? '' : 'Department',
                          )
                        }
                        style={{
                          ...style.input,
                          borderColor: color.gray3,
                          borderWidth: 1,
                          paddingVertical: responsiveScreenHeight(1),
                        }}>
                        <Text
                          style={{
                            fontWeight: '400',
                            paddingVertical: responsiveScreenHeight(0.4),
                            fontSize: responsiveScreenFontSize(1.8),
                            fontFamily: font.NunitoMedium,
                            color: color.black60,
                            flex: 1,
                          }}>
                          {user.department || 'Select Department'}
                        </Text>
                      </TouchableOpacity>
                      {dropdown === 'Department' && (
                        <View
                          style={{
                            flex: 1,
                            borderColor: color.gray3,
                            borderWidth: 1,
                            maxHeight: responsiveScreenHeight(40),
                            padding: responsiveScreenWidth(2),
                            borderRadius: 20,
                            position: 'absolute',
                            top: '120%',
                            width: responsiveScreenWidth(66),
                            backgroundColor: color.white,
                            zIndex: 9,
                            right: 1,
                          }}>
                          <Text
                            onPress={() => {
                              setUser({...user, department: 'Client'});
                              setDropdown('');
                            }}
                            style={{
                              color: color.black60,
                              fontSize: responsiveScreenFontSize(1.6),
                              backgroundColor:
                                user.department === 'Client'
                                  ? color.gray2
                                  : color.white,
                              borderRadius: 30,
                              paddingHorizontal: responsiveScreenWidth(4),
                              paddingVertical: responsiveScreenHeight(1),
                            }}>
                            Client
                          </Text>
                          <Text
                            onPress={() => {
                              setUser({...user, department: 'Vendor'});
                              setDropdown('');
                            }}
                            style={{
                              color: color.black60,
                              fontSize: responsiveScreenFontSize(1.6),
                              backgroundColor:
                                user.department === 'Vendor'
                                  ? color.gray2
                                  : color.white,
                              borderRadius: 30,
                              paddingHorizontal: responsiveScreenWidth(4),
                              paddingVertical: responsiveScreenHeight(1),
                            }}>
                            Vendor
                          </Text>
                          <Text
                            onPress={() => {
                              setUser({...user, department: 'Contractor'});
                              setDropdown('');
                            }}
                            style={{
                              color: color.black60,
                              fontSize: responsiveScreenFontSize(1.6),
                              backgroundColor:
                                user.department === 'Contractor'
                                  ? color.gray2
                                  : color.white,
                              borderRadius: 30,
                              paddingHorizontal: responsiveScreenWidth(4),
                              paddingVertical: responsiveScreenHeight(1),
                            }}>
                            Pati Contractor
                          </Text>
                        </View>
                      )}
                    </View>
                    <View
                      style={{
                        width: '90%',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        gap: responsiveScreenWidth(3),
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: color.white,
                          width: responsiveScreenHeight(5),
                          borderRadius: 30,
                          margin: 2,
                          padding: responsiveScreenHeight(0.5),
                          aspectRatio: 1,
                          elevation: 5,
                          overflow: 'hidden',
                        }}>
                        <Image
                          source={require('../../assests/icons/call.png')}
                          style={{
                            backgroundColor: color.white,
                            width: '100%',
                            tintColor: color.primary,
                            height: '100%',
                            resizeMode: 'center',
                          }}
                        />
                      </View>

                      <TouchableOpacity
                        onPress={() =>
                          setDropdown(
                            dropdown === 'Designation' ? '' : 'Designation',
                          )
                        }
                        style={{
                          ...style.input,
                          borderColor: color.gray3,
                          borderWidth: 1,
                          paddingVertical: responsiveScreenHeight(1),
                        }}>
                        <Text
                          style={{
                            fontWeight: '400',
                            paddingVertical: responsiveScreenHeight(0.4),
                            fontSize: responsiveScreenFontSize(1.8),
                            fontFamily: font.NunitoMedium,
                            color: color.black60,
                            flex: 1,
                          }}>
                          {user.designation || 'Designation'}
                        </Text>
                      </TouchableOpacity>
                      {dropdown === 'Designation' && (
                        <View
                          style={{
                            flex: 1,
                            borderColor: color.gray3,
                            borderWidth: 1,
                            maxHeight: responsiveScreenHeight(40),
                            padding: responsiveScreenWidth(2),
                            borderRadius: 20,
                            position: 'absolute',
                            top: '120%',
                            width: responsiveScreenWidth(66),
                            backgroundColor: color.white,
                            zIndex: 9,
                            right: 1,
                          }}>
                          <Text
                            onPress={() => {
                              setUser({...user, designation: 'Client'});
                              setDropdown('');
                            }}
                            style={{
                              color: color.black60,
                              fontSize: responsiveScreenFontSize(1.6),
                              backgroundColor:
                                user.designation === 'Client'
                                  ? color.gray2
                                  : color.white,
                              borderRadius: 30,
                              paddingHorizontal: responsiveScreenWidth(4),
                              paddingVertical: responsiveScreenHeight(1),
                            }}>
                            Client
                          </Text>
                          <Text
                            onPress={() => {
                              setUser({...user, designation: 'Vendor'});
                              setDropdown('');
                            }}
                            style={{
                              color: color.black60,
                              fontSize: responsiveScreenFontSize(1.6),
                              backgroundColor:
                                user.designation === 'Vendor'
                                  ? color.gray2
                                  : color.white,
                              borderRadius: 30,
                              paddingHorizontal: responsiveScreenWidth(4),
                              paddingVertical: responsiveScreenHeight(1),
                            }}>
                            Vendor
                          </Text>
                          <Text
                            onPress={() => {
                              setUser({...user, designation: 'Contractor'});
                              setDropdown('');
                            }}
                            style={{
                              color: color.black60,
                              fontSize: responsiveScreenFontSize(1.6),
                              backgroundColor:
                                user.designation === 'Contractor'
                                  ? color.gray2
                                  : color.white,
                              borderRadius: 30,
                              paddingHorizontal: responsiveScreenWidth(4),
                              paddingVertical: responsiveScreenHeight(1),
                            }}>
                            Pati Contractor
                          </Text>
                        </View>
                      )}
                    </View>
                  </>
                )}
                {type === 'External' && (
                  <View
                    style={{
                      width: '90%',
                      alignSelf: 'center',
                      flexDirection: 'row',
                      gap: responsiveScreenWidth(3),
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: color.white,
                        width: responsiveScreenHeight(5),
                        borderRadius: 30,
                        margin: 2,
                        padding: responsiveScreenHeight(0.5),
                        aspectRatio: 1,
                        elevation: 5,
                        overflow: 'hidden',
                      }}>
                      <Image
                        source={require('../../assests/icons/call.png')}
                        style={{
                          backgroundColor: color.white,
                          width: '100%',
                          tintColor: color.primary,
                          height: '100%',
                          resizeMode: 'center',
                        }}
                      />
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        setDropdown(
                          dropdown === 'Department' ? '' : 'Department',
                        )
                      }
                      style={{
                        ...style.input,
                        borderColor: color.gray3,
                        borderWidth: 1,
                        paddingVertical: responsiveScreenHeight(1),
                      }}>
                      <Text
                        style={{
                          fontWeight: '400',
                          paddingVertical: responsiveScreenHeight(0.4),
                          fontSize: responsiveScreenFontSize(1.8),
                          fontFamily: font.NunitoMedium,
                          color: color.black60,
                          flex: 1,
                        }}>
                        Select Department
                      </Text>
                    </TouchableOpacity>
                    {dropdown === 'Department' && (
                      <View
                        style={{
                          flex: 1,
                          borderColor: color.gray3,
                          borderWidth: 1,
                          maxHeight: responsiveScreenHeight(40),
                          padding: responsiveScreenWidth(2),
                          borderRadius: 20,
                          position: 'absolute',
                          top: '120%',
                          width: responsiveScreenWidth(66),
                          backgroundColor: color.white,
                          zIndex: 9,
                          right: 1,
                        }}>
                        <Text
                          onPress={() => {
                            setUser({...user, department: 'Client'});
                            setDropdown('');
                          }}
                          style={{
                            color: color.black60,
                            fontSize: responsiveScreenFontSize(1.6),
                            backgroundColor:
                              user.department === 'Client'
                                ? color.gray2
                                : color.white,
                            borderRadius: 30,
                            paddingHorizontal: responsiveScreenWidth(4),
                            paddingVertical: responsiveScreenHeight(1),
                          }}>
                          Client
                        </Text>
                        <Text
                          onPress={() => {
                            setUser({...user, department: 'Vendor'});
                            setDropdown('');
                          }}
                          style={{
                            color: color.black60,
                            fontSize: responsiveScreenFontSize(1.6),
                            backgroundColor:
                              user.department === 'Vendor'
                                ? color.gray2
                                : color.white,
                            borderRadius: 30,
                            paddingHorizontal: responsiveScreenWidth(4),
                            paddingVertical: responsiveScreenHeight(1),
                          }}>
                          Vendor
                        </Text>
                        <Text
                          onPress={() => {
                            setUser({...user, department: 'Contractor'});
                            setDropdown('');
                          }}
                          style={{
                            color: color.black60,
                            fontSize: responsiveScreenFontSize(1.6),
                            backgroundColor:
                              user.department === 'Contractor'
                                ? color.gray2
                                : color.white,
                            borderRadius: 30,
                            paddingHorizontal: responsiveScreenWidth(4),
                            paddingVertical: responsiveScreenHeight(1),
                          }}>
                          Pati Contractor
                        </Text>
                      </View>
                    )}
                  </View>
                )}

                <View
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    gap: responsiveScreenWidth(3),
                    alignItems: 'flex-start',
                  }}>
                  <View
                    style={{
                      backgroundColor: color.white,
                      width: responsiveScreenHeight(5),
                      height: responsiveScreenHeight(5),
                      borderRadius: 30,
                      margin: 2,
                      padding: responsiveScreenHeight(0.5),
                      aspectRatio: 1,
                      elevation: 5,
                      overflow: 'hidden',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../assests/icons/book.png')}
                      style={{
                        backgroundColor: color.white,
                        width: '80%',
                        tintColor: color.primary,
                        height: '80%',
                        resizeMode: 'center',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      borderRadius: 30,
                      borderColor: color.gray3,
                      borderWidth: 1,
                      height: responsiveScreenHeight(20),
                      paddingVertical: responsiveScreenHeight(1.2),
                      paddingHorizontal: responsiveScreenWidth(4),
                      alignSelf: 'center',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                    }}>
                    <TextInput
                      placeholder="Add Note"
                      placeholderTextColor={color.black28}
                      multiline
                      value={user.note}
                      onChangeText={e => {
                        setUser({...user, note: e});
                      }}
                      style={{
                        height: 'auto',
                        flex: 1,
                        color: color.black87,
                        fontSize: responsiveScreenFontSize(1.7),
                      }}
                    />
                    <Image
                      source={require('../../assests/icons/mic.png')}
                      style={{opacity: 0, width: 1}}
                    />
                  </View>
                </View>
                <View style={{flex: 1}}></View>
                <View
                  style={{
                    alignSelf: 'center',
                    backgroundColor: color.primary,
                    width: responsiveScreenWidth(45),
                    borderRadius: 30,
                  }}>
                  <Text
                    onPress={async () => {
                      // contactObj.dropTable("contact")
                      await contactObj.insertUser(
                        user.name,
                        user.number,
                        user.note,
                        user.last,
                      );
                    }}
                    style={{
                      textAlign: 'center',
                      fontSize: responsiveScreenFontSize(2),
                      color: color.white,
                      paddingVertical: responsiveScreenHeight(1.5),
                    }}>
                    Save
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </>
      );
      break;
  }
  return null;
};
export default ContactsPage;

const styles = StyleSheet.create({});
