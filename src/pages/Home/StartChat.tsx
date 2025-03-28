/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  NavigationProp,
  ParamListBase,
  useRoute,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { truncateText } from '../../../function';
import { Header } from '../../component';
import { color, font, routes } from '../../config/Env';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { StartChats } from '../../redux/slice/ChatSlice';
import { GetContact } from '../../redux/slice/ContactSlice';
interface StartChatProp {
  navigation: NavigationProp<ParamListBase>;
}
const StartChat: React.FC<StartChatProp> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const route: any = useRoute();
  const {isGroup} = route.params;
  const {contact} = useAppSelector(state => state.contactStore);
  const {user} = useAppSelector(state => state.userStore);
  const [selectUser, setSelectUser] = useState([]);
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [group, setGroup] = useState({
    canEdit: false,
    canMessage: true,
    canAdd: false,
  });
  useEffect(() => {
    dispatch(GetContact({}));
  }, []);
  if (!user) {
    return null;
  }
  const renderElem = () => {
    switch (step) {
      case 0:
        return (
          <>
            <View
              style={{
                width: '100%',
                gap: responsiveScreenWidth(5),
                alignSelf: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginBottom: responsiveScreenHeight(1.5),
              }}>
              <View
                style={{
                  backgroundColor: color.white,
                  borderRadius: 100,
                  flexDirection: 'row',
                  flex: 1,
                  paddingHorizontal: responsiveScreenWidth(3),
                  borderColor: color.gray3,
                  borderWidth: 1,
                  alignItems: 'center',
                }}>
                <View
                  style={{height: responsiveScreenHeight(2.2), aspectRatio: 1}}>
                  <Image
                    source={require('../../assests/icons/search.png')}
                    style={{
                      height: '100%',
                      resizeMode: 'cover',
                      width: '100%',
                      tintColor: color.black87,
                    }}
                  />
                </View>
                <TextInput
                  style={{
                    backgroundColor: color.white,
                    fontWeight: '400',
                    borderRadius: 200,
                    paddingVertical: responsiveScreenHeight(1),
                    fontSize: responsiveScreenFontSize(1.8),
                    paddingHorizontal: responsiveScreenWidth(3),
                    flex: 1,
                  }}
                  keyboardType="default"
                  maxLength={10}
                  returnKeyType="done"
                  placeholder="Search name or number"
                  placeholderTextColor={color.black60}
                  // value={user.password}
                  onChangeText={e => {
                    // setUser({ ...user, password: e })
                  }}
                />
              </View>
              <View style={{aspectRatio: 1, flexDirection: 'row'}}>
                <Image
                  source={require('../../assests/icons/filter.png')}
                  style={{
                    width: responsiveScreenWidth(6),
                    aspectRatio: 1,
                    tintColor: color.primary,
                  }}
                />
              </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {contact
                ?.filter(e => e._id !== user._id)
                .map((e, i) => (
                  <Pressable
                    key={e._id}
                    onPress={() => {
                      if (isGroup) {
                        setSelectUser(prevSelectUser => {
                          if (prevSelectUser.includes(e._id)) {
                            return prevSelectUser.filter(
                              selectedUser => selectedUser !== e._id,
                            );
                          } else {
                            return [...prevSelectUser, e._id];
                          }
                        });
                      } else {
                        dispatch(
                          StartChats({
                            members: [e._id],
                            isGroup: false,
                            userId: user?._id,
                            canMessage: true,
                          }),
                        ).then(e => {
                          if (e.payload.success) {
                            navigation.replace(routes.MESSAGE, {
                              id: e.payload.chat._id,
                            });
                          }
                        });
                      }
                    }}
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      backgroundColor: color.white,
                      paddingVertical: responsiveScreenHeight(0.5),
                      marginTop: responsiveScreenHeight(0.5),
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
                          uri:
                            e.profile ||
                            'https://www.befunky.com/images/wp/wp-2022-12-social-media-profile-picture-1.jpg?auto=avif,webp&format=jpg&width=950',
                        }}
                        style={{height: '100%', width: '100%'}}
                      />
                    </View>
                    <View
                      style={{flex: 1, marginLeft: responsiveScreenWidth(4)}}>
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
                          fontSize: responsiveScreenFontSize(1.7),
                          marginTop: responsiveScreenHeight(0.2),
                          fontWeight: '400',
                          fontFamily: font.NunitoSemiBold,
                        }}>
                        {truncateText('Role', 29)}
                      </Text>
                    </View>
                    {isGroup && (
                      <>
                        {selectUser.includes(e._id) ? (
                          <Image
                            source={require('../../assests/icons/minus-circle.png')}
                            style={{
                              height: responsiveScreenWidth(7),
                              width: responsiveScreenWidth(7),
                              tintColor: color.primary,
                            }}
                          />
                        ) : (
                          <Image
                            source={require('../../assests/icons/add-circle.png')}
                            style={{
                              height: responsiveScreenWidth(7),
                              width: responsiveScreenWidth(7),
                              tintColor: color.primary,
                            }}
                          />
                        )}
                      </>
                    )}
                  </Pressable>
                ))}
            </ScrollView>
          </>
        );
        break;

      case 1:
        return (
          <>
            <View
              style={{
                borderWidth: 1,
                borderColor: color.gray3,
                flexDirection: 'row',
                gap: responsiveScreenWidth(4),
                alignItems: 'center',
                paddingHorizontal: responsiveScreenWidth(4),
                paddingVertical: responsiveScreenHeight(1.5),
                borderRadius: 20,
              }}>
              <View
                style={{
                  width: responsiveScreenWidth(11),
                  padding: responsiveWidth(2.7),
                  aspectRatio: 1,
                  backgroundColor: color.primary2,
                  borderRadius: 100,
                }}>
                <Image
                  source={require('../../assests/icons/camera.png')}
                  style={{
                    height: '100%',
                    aspectRatio: 1,
                    tintColor: color.white,
                  }}
                />
              </View>
              <TextInput
                style={{
                  borderBottomColor: color.primary,
                  borderBottomWidth: 1,
                  flex: 1,
                  padding: 0,
                  fontFamily: font.NunitoRegular,
                  fontSize: responsiveScreenFontSize(1.8),
                  color: color.black87,
                }}
                keyboardType="default"
                returnKeyType="done"
                placeholder="Group Name"
                value={name}
                placeholderTextColor={color.black28}
                onChangeText={e => {
                  setName(e);
                }}
              />
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: color.gray3,
                paddingHorizontal: responsiveScreenWidth(4),
                paddingVertical: responsiveScreenHeight(1.5),
                borderRadius: 20,
                marginTop: responsiveScreenHeight(2),
              }}>
              <Pressable
                onPress={() => setStep(2)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveScreenWidth(3),
                }}>
                <View
                  style={{
                    width: responsiveScreenWidth(11),
                    padding: responsiveWidth(2.7),
                    aspectRatio: 1,
                    backgroundColor: color.white,
                    borderWidth: 1,
                    borderColor: color.gray2,
                    borderRadius: 100,
                  }}>
                  <Image
                    source={require('../../assests/icons/setting.png')}
                    style={{
                      height: '100%',
                      aspectRatio: 1,
                      tintColor: color.primary,
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: font.NunitoSemiBold,
                    fontSize: responsiveScreenFontSize(1.7),
                    color: color.primary,
                  }}>
                  Group permissions
                </Text>
              </Pressable>
              <Text
                style={{
                  fontFamily: font.NunitoRegular,
                  fontSize: responsiveScreenFontSize(1.6),
                  color: color.black60,
                  marginTop: responsiveScreenHeight(1.2),
                }}>
                Group Members: {selectUser.length}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: responsiveScreenWidth(3),
                  marginTop: responsiveScreenHeight(0.8),
                }}>
                {contact
                  .filter(e => selectUser.includes(e._id))
                  .map(e => {
                    return (
                      <View>
                        <View
                          style={{
                            width: responsiveScreenWidth(12),
                            aspectRatio: 1,
                            overflow: 'hidden',
                            borderRadius: 100,
                          }}>
                          <Image
                            source={{uri: e.profile}}
                            style={{height: '100%'}}
                          />
                        </View>
                        <Text
                          style={{
                            fontFamily: font.NunitoRegular,
                            fontSize: responsiveScreenFontSize(1.6),
                            color: color.black60,
                            textAlign: 'center',
                          }}>
                          {truncateText(e.name, 6)}
                        </Text>
                      </View>
                    );
                  })}
              </View>
            </View>
          </>
        );

        break;
      case 2:
        return (
          <>
            <View
              style={{
                borderWidth: 1,
                borderColor: color.gray3,
                gap: responsiveScreenHeight(1),
                paddingHorizontal: responsiveScreenWidth(4),
                paddingVertical: responsiveScreenHeight(1.5),
                borderRadius: 20,
              }}>
              <Text
                style={{
                  fontFamily: font.NunitoSemiBold,
                  fontSize: responsiveScreenFontSize(1.6),
                  color: color.black60,
                }}>
                Members can:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveScreenWidth(3),
                }}>
                <View
                  style={{
                    width: responsiveScreenWidth(11),
                    padding: responsiveWidth(2.7),
                    aspectRatio: 1,
                    backgroundColor: color.white,
                    borderWidth: 1,
                    borderColor: color.gray2,
                    borderRadius: 100,
                  }}>
                  <Image
                    source={require('../../assests/icons/setting.png')}
                    style={{
                      height: '100%',
                      aspectRatio: 1,
                      tintColor: color.primary,
                    }}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontFamily: font.NunitoSemiBold,
                      fontSize: responsiveScreenFontSize(1.8),
                      color: color.black87,
                    }}>
                    Edit Group setting
                  </Text>
                  <Text
                    style={{
                      fontFamily: font.NunitoSemiBold,
                      fontSize: responsiveScreenFontSize(1.6),
                      color: color.black87,
                    }}>
                    This include the name, icon and description
                  </Text>
                </View>
                <Pressable
                  onPress={() => {
                    setGroup({...group, canEdit: !group.canEdit});
                  }}
                  style={{
                    width: responsiveScreenWidth(13),
                    padding: responsiveScreenWidth(1),
                    height: responsiveScreenHeight(3.2),
                    borderRadius: 50,
                    backgroundColor: group.canEdit
                      ? color.primary2
                      : color.white,
                    borderWidth: 1,
                    borderColor: group.canEdit ? color.primary2 : color.gray3,
                    alignItems: group.canEdit ? 'flex-end' : 'flex-start',
                  }}>
                  <View
                    style={{
                      height: '100%',
                      aspectRatio: 1,
                      backgroundColor: group.canEdit
                        ? color.primary
                        : color.black60,
                      borderRadius: 20,
                    }}></View>
                </Pressable>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveScreenWidth(3),
                }}>
                <View
                  style={{
                    width: responsiveScreenWidth(11),
                    padding: responsiveWidth(2.7),
                    aspectRatio: 1,
                    backgroundColor: color.white,
                    borderWidth: 1,
                    borderColor: color.gray2,
                    borderRadius: 100,
                  }}>
                  <Image
                    source={require('../../assests/icons/setting.png')}
                    style={{
                      height: '100%',
                      aspectRatio: 1,
                      tintColor: color.primary,
                    }}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontFamily: font.NunitoSemiBold,
                      fontSize: responsiveScreenFontSize(1.8),
                      color: color.black87,
                    }}>
                    Send Messages
                  </Text>
                </View>
                <Pressable
                  onPress={() => {
                    setGroup({...group, canMessage: !group.canMessage});
                  }}
                  style={{
                    width: responsiveScreenWidth(13),
                    padding: responsiveScreenWidth(1),
                    height: responsiveScreenHeight(3.2),
                    borderRadius: 50,
                    backgroundColor: group.canMessage
                      ? color.primary2
                      : color.white,
                    borderWidth: 1,
                    borderColor: group.canMessage
                      ? color.primary2
                      : color.gray3,
                    alignItems: group.canMessage ? 'flex-end' : 'flex-start',
                  }}>
                  <View
                    style={{
                      height: '100%',
                      aspectRatio: 1,
                      backgroundColor: group.canMessage
                        ? color.primary
                        : color.black60,
                      borderRadius: 20,
                    }}></View>
                </Pressable>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveScreenWidth(3),
                }}>
                <View
                  style={{
                    width: responsiveScreenWidth(11),
                    padding: responsiveWidth(2.7),
                    aspectRatio: 1,
                    backgroundColor: color.white,
                    borderWidth: 1,
                    borderColor: color.gray2,
                    borderRadius: 100,
                  }}>
                  <Image
                    source={require('../../assests/icons/setting.png')}
                    style={{
                      height: '100%',
                      aspectRatio: 1,
                      tintColor: color.primary,
                    }}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontFamily: font.NunitoSemiBold,
                      fontSize: responsiveScreenFontSize(1.8),
                      color: color.black87,
                    }}>
                    Add other members
                  </Text>
                </View>
                <Pressable
                  onPress={() => {
                    setGroup({...group, canAdd: !group.canAdd});
                  }}
                  style={{
                    width: responsiveScreenWidth(13),
                    padding: responsiveScreenWidth(1),
                    height: responsiveScreenHeight(3.2),
                    borderRadius: 50,
                    backgroundColor: group.canAdd
                      ? color.primary2
                      : color.white,
                    borderWidth: 1,
                    borderColor: group.canAdd ? color.primary2 : color.gray3,
                    alignItems: group.canAdd ? 'flex-end' : 'flex-start',
                  }}>
                  <View
                    style={{
                      height: '100%',
                      aspectRatio: 1,
                      backgroundColor: group.canAdd
                        ? color.primary
                        : color.black60,
                      borderRadius: 20,
                    }}></View>
                </Pressable>
              </View>
            </View>
          </>
        );
        break;
    }
  };
  return (
    <>
      <Header
        onClick={() => {
          if (step === 0) {
            navigation.goBack();
          } else {
            setStep(step - 1);
          }
        }}
        title={
          isGroup
            ? step === 2
              ? 'Group permissions'
              : 'New Group'
            : 'Select Contact'
        }>
        <>
          {isGroup && (
            <Pressable
              onPress={() => {
                if (selectUser.length >= 2 && step === 0) {
                  setStep(1);
                }
                if (step === 1 && user) {
                  dispatch(
                    StartChats({
                      members: [...selectUser],
                      userId: user?._id,
                      isGroup: true,
                      name,
                      ...group,
                    }),
                  ).then(e => {
                    if (e.payload.success) {
                      navigation.replace(routes.MESSAGE, {
                        id: e.payload.chat._id,
                      });
                    }
                  });
                }
              }}>
              {step === 0 ? (
                <Image
                  source={require('../../assests/icons/add-circle.png')}
                  style={{
                    height: '100%',
                    aspectRatio: 1,
                    tintColor: color.white,
                  }}
                />
              ) : (
                <Image
                  source={require('../../assests/icons/tick-circle.png')}
                  style={{
                    height: '100%',
                    aspectRatio: 1,
                    tintColor: color.white,
                  }}
                />
              )}
            </Pressable>
          )}
        </>
      </Header>
      <View
        style={{
          flex: 1,
          backgroundColor: color.white,
          paddingHorizontal: responsiveScreenWidth(4),
          paddingVertical: responsiveScreenHeight(2),
        }}>
        {user?._id && renderElem()}
      </View>
    </>
  );
};

export default StartChat;
