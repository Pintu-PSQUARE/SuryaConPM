/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Header} from '../../component';
import {color, font, routes} from '../../config/Env';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {truncateText} from '../../../function';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {socketDisconnect, Initialize, MessageStatus} from '../../socket';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {CurrentChat, GetChats} from '../../redux/slice/ChatSlice';
import {MessageObj} from '../../sql';
import {
  AddMessage,
  GetMessages,
  MarkRead,
  UpdateStatus,
} from '../../redux/slice/MessageSlice';
import {style} from '../Auth/ForgotPassword';
const Message = new MessageObj();

const ChatsPage = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.userStore);
  const {chats, currentChat} = useAppSelector(state => state.chatStore);
  const {messages} = useAppSelector(state => state.messageStore);
  const {socketData} = useAppSelector(state => state.socketStore);
  const navigate: NavigationProp<ParamListBase> = useNavigation();
  const sortedArray: CurrentChat[] = useMemo(() => {
    if (!chats || !messages) {
      return [];
    }
    const updatedChats = chats.map(chat => {
      const newChat = {...chat};
      const relatedMessages = messages.filter(msg => msg.chatId === chat._id);
      relatedMessages.forEach(message => {
        if (
          !newChat.lastMessage ||
          (newChat.lastDate &&
            new Date(message.date) > new Date(newChat.lastDate))
        ) {
          newChat.lastMessage = message.message;
          newChat.lastDate = message.date;
        }
        if (user?._id !== message.sender && !message.isRead) {
          newChat.unRead = (newChat.unRead || 0) + 1;
        }
        if (!message.isRead && user && user._id !== message.sender) {
          const receiveInfo = {
            sender: user._id,
            status: 'received',
            date: new Date(),
            to: message.sender,
            id: message.id,
          };
          dispatch(MessageStatus(receiveInfo));
        }
      });
      return newChat;
    });
    const a = updatedChats.sort((a, b) => {
      const dateA = a.lastDate || a.createdAt;
      const dateB = b.lastDate || b.createdAt;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
    return a;
  }, [chats, messages, user, dispatch]);

  useEffect(() => {
    if (!user?._id) {
      return;
    }
    dispatch(Initialize({id: user._id}));
    dispatch(GetChats({userId: user._id}));
    dispatch(GetMessages({to: user._id}));
    return () => {
      dispatch(socketDisconnect({id: user._id}));
    };
  }, [user?._id, dispatch]);

  const getDate = (date: string) => {
    const messageDate = new Date(date);
    const todayDate = new Date();
    if (messageDate.toLocaleDateString() == todayDate.toLocaleDateString()) {
      return messageDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else {
      return messageDate.toLocaleDateString();
    }
  };
  useEffect(() => {
    if (user?._id) {
      const handleStatusReceived = (
        data: {
          id: string;
          sender: string;
          status: 'read' | 'received';
          date: string;
        },
        callback: (response: boolean) => void,
      ) => {
        callback(true);
        const readTime = data.status === 'read' ? data.date : undefined;
        const receivedTime = data.status === 'received' ? data.date : undefined;
        Message.insertMessageInfoTable(
          data.id,
          data.sender,
          data.status,
          readTime,
          receivedTime,
        );
        dispatch(UpdateStatus({id: data.id, status: data.status}));
      };

      const handleMessageReceive = (
        data: {
          id: string;
          chatId: string;
          sender: string;
          message: string;
          reply: string;
        },
        callback: (response: boolean) => void,
      ) => {
        if (data.sender === user._id) {
          return;
        }
        Message.insertMessage({...data, isRead: false});
        callback(true);
        dispatch(
          AddMessage({
            ...data,
            date: `${new Date()}`,
            isRead: false,
            currentChat: currentChat?._id,
          }),
        );
      };

      const handleMessageDelivered = ({
        receivedUsers,
        id,
        date,
      }: {
        receivedUsers: string[];
        id: string;
        date: Date;
      }) => {
        receivedUsers.forEach(e => {
          Message.insertMessageInfoTable(
            id,
            e,
            'received',
            undefined,
            `${date}`,
          );
          dispatch(UpdateStatus({id, status: 'received'}));
        });
        dispatch(MarkRead({id}));
        Message.markRead({id});
      };

      // Register the event listeners
      socketData?.on('messageStatusReceived', handleStatusReceived); // receive status of messages
      socketData?.on('messageReceive', handleMessageReceive); // receive all messages
      socketData?.on('messageDelivered', handleMessageDelivered); // receive is messages send to server successfully

      //         // Cleanup function to avoid multiple event registrations
      return () => {
        socketData?.off('messageStatusReceived', handleStatusReceived);
        socketData?.off('messageReceive', handleMessageReceive);
        socketData?.off('messageDelivered', handleMessageDelivered);
      };
    }
  }, [user, socketData, currentChat, dispatch]);
  const [isGroup, setIsGroup] = useState(false);
  return (
    <>
      <Header title={isGroup ? 'Groups' : 'Messages'}>
        <Pressable
          onPress={() => {
            navigate.navigate(routes.NEWCHAT, {isGroup: isGroup});
          }}>
          <Image
            source={require('../../assests/icons/add-circle.png')}
            style={{height: '100%', aspectRatio: 1, tintColor: color.white}}
          />
        </Pressable>
      </Header>
      <View
        style={{
          flex: 1,
          backgroundColor: color.white,
          paddingHorizontal: responsiveScreenWidth(3),
          paddingVertical: responsiveScreenHeight(2),
        }}>
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
            <View style={{height: responsiveScreenHeight(2.2), aspectRatio: 1}}>
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
              placeholder="Search"
              placeholderTextColor={color.black60}
              // value={user.password}
              // onChangeText={e => {
              //   // setUser({ ...user, password: e })
              // }}
            />
          </View>
          {!isGroup && (
            <Pressable
              onPress={() => {}}
              style={{aspectRatio: 1, flexDirection: 'row'}}>
              <Image
                source={require('../../assests/icons/filter.png')}
                style={{
                  width: responsiveScreenWidth(6),
                  aspectRatio: 1,
                  tintColor: color.primary,
                }}
              />
            </Pressable>
          )}
        </View>
        {sortedArray.filter(e => e.isGroup === isGroup).length === 0 ? (
          <>
            {isGroup ? (
              <>
                <View
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: color.black87,
                      fontFamily: font.NunitoRegular,
                      fontSize: responsiveScreenFontSize(2.5),
                    }}>
                    Create New Group
                  </Text>
                  <Text
                    style={{
                      color: color.black60,
                      fontFamily: font.NunitoRegular,
                      fontSize: responsiveScreenFontSize(1.8),
                    }}>
                    Create your group and add members
                  </Text>
                  <Pressable
                    onPress={() => {
                      navigate.navigate(routes.NEWCHAT, {isGroup: isGroup});
                    }}
                    style={{
                      ...style.btn,
                      width: responsiveScreenWidth(50),
                      marginVertical: responsiveScreenHeight(2),
                      marginBottom: responsiveScreenHeight(8),
                      gap: responsiveScreenWidth(2),
                      justifyContent: 'center',
                      alignSelf: 'center',
                      borderColor: color.primary,
                      borderWidth: 1,
                      backgroundColor: color.white,
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveScreenFontSize(2.2),
                        color: color.primary,
                        fontWeight: '500',
                      }}>
                      {isGroup ? 'New Group' : 'New Chat'}
                    </Text>
                    <View style={{height: responsiveScreenHeight(2.5)}}>
                      <Image
                        source={require('../../assests/icons/add-circle.png')}
                        style={{
                          height: '100%',
                          aspectRatio: 1,
                          tintColor: color.primary,
                        }}
                      />
                    </View>
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                <View
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: color.black87,
                      fontFamily: font.NunitoRegular,
                      fontSize: responsiveScreenFontSize(2.5),
                    }}>
                    Start Chat
                  </Text>
                  <Text
                    style={{
                      color: color.black60,
                      fontFamily: font.NunitoRegular,
                      fontSize: responsiveScreenFontSize(1.8),
                    }}>
                    No conversations yet. Tap &apos;New Chat&apos; to begin
                  </Text>
                  <Pressable
                    onPress={() => {
                      navigate.navigate(routes.NEWCHAT, {isGroup: isGroup});
                    }}
                    style={{
                      ...style.btn,
                      width: responsiveScreenWidth(50),
                      marginVertical: responsiveScreenHeight(2),
                      marginBottom: responsiveScreenHeight(8),
                      gap: responsiveScreenWidth(2),
                      justifyContent: 'center',
                      alignSelf: 'center',
                      borderColor: color.primary,
                      borderWidth: 1,
                      backgroundColor: color.white,
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveScreenFontSize(2.2),
                        color: color.primary,
                        fontWeight: '500',
                      }}>
                      {isGroup ? 'New Group' : 'New Chat'}
                    </Text>
                    <View style={{height: responsiveScreenHeight(2.5)}}>
                      <Image
                        source={require('../../assests/icons/add-circle.png')}
                        style={{
                          height: '100%',
                          aspectRatio: 1,
                          tintColor: color.primary,
                        }}
                      />
                    </View>
                  </Pressable>
                </View>
              </>
            )}
          </>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {sortedArray
              .filter(e => e.isGroup === isGroup)
              .map(e => {
                return (
                  <Pressable
                    key={e._id}
                    onPress={() =>
                      navigate.navigate(routes.MESSAGE, {id: e._id})
                    }
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      backgroundColor: color.white,
                      paddingHorizontal: responsiveScreenWidth(4),
                      paddingVertical: responsiveScreenHeight(1),
                      marginTop: responsiveScreenHeight(1),
                      borderRadius: 18,
                      borderWidth: 1,
                      borderColor: color.gray3,
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
                          uri: isGroup
                            ? e.profile
                            : e.members.filter(
                                member => member.user._id !== user?._id,
                              )[0]?.user.profile,
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
                        {e.chatName
                          ? e.chatName
                          : e.members.filter(
                              member => member.user._id !== user?._id,
                            )[0]?.user?.name}
                      </Text>
                      <Text
                        style={{
                          color: color.black60,
                          fontSize: responsiveScreenFontSize(1.7),
                          marginTop: responsiveScreenHeight(0.2),
                          fontWeight: '400',
                          fontFamily: font.NunitoSemiBold,
                        }}>
                        {e.lastMessage && truncateText(e.lastMessage, 29)}
                      </Text>
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                      <Text
                        style={{
                          color: color.black60,
                          fontSize: responsiveScreenFontSize(1.7),
                          marginTop: responsiveScreenHeight(0.2),
                          fontWeight: '400',
                          fontFamily: font.NunitoSemiBold,
                          marginBottom: responsiveScreenHeight(0.3),
                          textTransform: 'uppercase',
                        }}>
                        {e?.lastDate && getDate(e.lastDate.toString())}
                      </Text>
                      {e.unRead && e.unRead > 0 && (
                        <View
                          style={{
                            height: responsiveScreenHeight(2.8),
                            aspectRatio: 1,
                            borderRadius: 200,
                            backgroundColor: color.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              color: color.white,
                              fontSize: responsiveScreenFontSize(1.8),
                              fontFamily: font.NunitoRegular,
                            }}>
                            {e.unRead}
                          </Text>
                        </View>
                      )}
                    </View>
                  </Pressable>
                );
              })}

            <View style={{height: responsiveScreenHeight(6)}} />
          </ScrollView>
        )}

        {isGroup ? (
          <Pressable
            onPress={() => setIsGroup(false)}
            style={{
              height: responsiveScreenHeight(6),
              aspectRatio: 1,
              borderRadius: 200,
              backgroundColor: color.primary,
              alignItems: 'center',
              justifyContent: 'center',
              padding: responsiveScreenWidth(3),
              position: 'absolute',
              bottom: responsiveScreenHeight(2),
              right: responsiveScreenWidth(3),
            }}>
            <Image
              source={require('../../assests/icons/user.png')}
              style={{width: '100%', height: '100%'}}
            />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => setIsGroup(true)}
            style={{
              height: responsiveScreenHeight(6),
              aspectRatio: 1,
              borderRadius: 200,
              backgroundColor: color.primary,
              alignItems: 'center',
              justifyContent: 'center',
              padding: responsiveScreenWidth(3),
              position: 'absolute',
              bottom: responsiveScreenHeight(2),
              right: responsiveScreenWidth(3),
            }}>
            <Image
              source={require('../../assests/icons/group-user.png')}
              style={{width: '100%', height: '100%'}}
            />
          </Pressable>
        )}
      </View>
    </>
  );
};

export default ChatsPage;
