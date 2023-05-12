/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import RootNavigation from './android/app/navigation/RootNavigation';
import LoginScreen from './android/ui/screens/MainScreen';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => RootNavigation);
