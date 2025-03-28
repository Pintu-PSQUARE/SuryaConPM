import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {routes} from '../config/Env';
import {useAppDispatch} from '../hooks/hooks';
import {
  AssetCart,
  ChatsPage,
  ContactsPage,
  ItemRequest,
  ItemRequestReview,
  MarkAttendence,
  MaterialUsed,
  Meetingdetail,
  MeetingHistory,
  OrderPage,
  PMBag,
  PMContractor_1,
  PMContractor_2,
  PMContractor_3,
  PMHomePage,
  PMInventory,
  PMOrders,
  PMPettyCash,
  PMRequest,
  PMSubtaskReview,
  ProjectDetail,
  ProjectSelection,
  ScheduleForm,
  SEHomePage,
  StartChat,
  TargetProgress,
  UserProfile,
} from '../pages';
import {loadProjectsFromStorage} from '../redux/slice/ProjectSlice';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProjectsFromStorage());
  }, [dispatch]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name={routes.PROJECT_SELECTION}
        component={ProjectSelection}
      />
      <Stack.Screen name={routes.PM_HOMEPAGE} component={PMHomePage} />
      <Stack.Screen name={routes.PROJECT_DETAIL} component={ProjectDetail} />
      <Stack.Screen name={routes.TARGET_PROGRESS} component={TargetProgress} />
      <Stack.Screen name={routes.MATERIAL_USED} component={MaterialUsed} />
      <Stack.Screen name={routes.SE_HOMEPAGE} component={SEHomePage} />
      <Stack.Screen name={routes.PROFILE} component={UserProfile} />
      <Stack.Screen name={routes.PM_INVENTORY} component={PMInventory} />
      <Stack.Screen name={routes.MARKATTENDENCE} component={MarkAttendence} />
      <Stack.Screen
        name={routes.PMSUBTASK_REVIEW}
        component={PMSubtaskReview}
      />
      <Stack.Screen name={routes.PMPETTY_CASH} component={PMPettyCash} />
      <Stack.Screen name={routes.ORDERPAGE} component={OrderPage} />
      <Stack.Screen name={routes.PM_ORDERS} component={PMOrders} />
      <Stack.Screen name={routes.ASSET_CART} component={AssetCart} />
      <Stack.Screen name={routes.PM_CONTRACTOR_1} component={PMContractor_1} />
      <Stack.Screen name={routes.PM_CONTRACTOR_2} component={PMContractor_2} />
      <Stack.Screen name={routes.PM_CONTRACTOR_3} component={PMContractor_3} />
      <Stack.Screen name={routes.ITEM_REQUEST} component={ItemRequest} />
      <Stack.Screen
        name={routes.ITEM_REQUEST_REVIEW}
        component={ItemRequestReview}
      />
      <Stack.Screen name={routes.SCHEDULEFORM} component={ScheduleForm} />
      <Stack.Screen name={routes.MEETING_DETAIL} component={Meetingdetail} />
      <Stack.Screen name={routes.MEETING_HISTORY} component={MeetingHistory} />
      <Stack.Screen name={routes.CONTACT} component={ContactsPage} />
      <Stack.Screen name={routes.CHATS} component={ChatsPage} />
      <Stack.Screen name={routes.NEWCHAT} component={StartChat} />
      <Stack.Screen name={routes.PM_REQUESTS} component={PMRequest} />
      <Stack.Screen name={routes.PM_BAG} component={PMBag} />
    </Stack.Navigator>
  );
};
