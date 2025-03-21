/* eslint-disable react/react-in-jsx-scope */
/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const ReactApp = () => {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <App />
      </Provider>
    </GestureHandlerRootView>
  );
};
AppRegistry.registerComponent(appName, () => ReactApp);
