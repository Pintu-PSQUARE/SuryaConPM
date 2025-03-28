import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import useHapticFeedback from '../hooks/useHapticFeedback';
import { AuthStack } from './AuthStack';
import { MainStack } from './MainStack';
import { restoreSession } from '../redux/thunks/authThunk';


const AppStack: React.FC = () => {
  const {isAuthenticated} = useAppSelector(state => state.userStore);
  const dispatch = useAppDispatch();
  const {triggerHaptic} = useHapticFeedback();
  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <NavigationContainer onStateChange={() => triggerHaptic('impactMedium')}>
        {!isAuthenticated ? <AuthStack /> : <MainStack />}
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default AppStack;
