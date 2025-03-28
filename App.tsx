import 'react-native-gesture-handler';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import AppStack from './src/navigations/index';
import {AppContextProviders} from './src/provider';
import {store} from './src/redux/store';

const App = () => {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <AppContextProviders>
          <AppStack />
        </AppContextProviders>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
