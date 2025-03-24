/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {} from 'react-native';
import {routes} from './src/config/Env';
import {
  AssetCart,
  ChatsPage,
  ContactsPage,
  ForgotPassword,
  ItemRequest,
  ItemRequestReview,
  LoginPage,
  LoginWithNumber,
  MarkAttendence,
  MaterialUsed,
  Meetingdetail,
  MeetingHistory,
  NewPassword,
  OptVerification,
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
  SplashPage,
  StartChat,
  TargetProgress,
  UserProfile,
} from './src/pages';
// import {useAppSelector} from './src/store/hooks';
import {SafeAreaView} from 'react-native-safe-area-context';
import useHapticFeedback from './src/hooks/useHapticFeedback';
import {useAppSelector} from './src/store/hooks';

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  const {isLogin, user} = useAppSelector(state => state.userStore);
  console.log('user--------', user);
  
  const {triggerHaptic} = useHapticFeedback();
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'transparent'}}
      edges={['left', 'right']}>
      <NavigationContainer onStateChange={() => triggerHaptic('impactMedium')}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false, // Hide header for a clean UI
            animation: 'slide_from_right', // Apply fade animation on navigation
          }}>
          {!isLogin ? (
            <>
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.SPLASH}
                component={SplashPage}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.LOGIN}
                component={LoginPage}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.FORGOTPASSWORD}
                component={ForgotPassword}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.OTP}
                component={OptVerification}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.NEWPASSWORD}
                component={NewPassword}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.LOGINWITHNUMBER}
                component={LoginWithNumber}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.PROJECT_SELECTION}
                component={ProjectSelection}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.PM_HOMEPAGE}
                component={PMHomePage}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.PROJECT_DETAIL}
                component={ProjectDetail}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.TARGET_PROGRESS}
                component={TargetProgress}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.MATERIAL_USED}
                component={MaterialUsed}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.SE_HOMEPAGE}
                component={SEHomePage}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.PROFILE}
                component={UserProfile}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.PM_INVENTORY}
                component={PMInventory}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.MARKATTENDENCE}
                component={MarkAttendence}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.PMSUBTASK_REVIEW}
                component={PMSubtaskReview}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.PMPETTY_CASH}
                component={PMPettyCash}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.ORDERPAGE}
                component={OrderPage}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.PM_ORDERS}
                component={PMOrders}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.ASSET_CART}
                component={AssetCart}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.PM_CONTRACTOR_1}
                component={PMContractor_1}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.PM_CONTRACTOR_2}
                component={PMContractor_2}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.PM_CONTRACTOR_3}
                component={PMContractor_3}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.ITEM_REQUEST}
                component={ItemRequest}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.ITEM_REQUEST_REVIEW}
                component={ItemRequestReview}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.SCHEDULEFORM}
                component={ScheduleForm}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.MEETING_DETAIL}
                component={Meetingdetail}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.MEETING_HISTORY}
                component={MeetingHistory}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.CONTACT}
                component={ContactsPage}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.CHATS}
                component={ChatsPage}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.NEWCHAT}
                component={StartChat}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.PM_REQUESTS}
                component={PMRequest}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.PM_BAG}
                component={PMBag}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
