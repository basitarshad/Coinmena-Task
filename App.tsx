import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './src/screens/Home';
import TradeScreen from './src/screens/Trade';
import {RootStackParamList} from './src/screens/RootStackParams';
import BottomTabs from './src/navigation/BottomTabs';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <SafeAreaProvider>
        <BottomTabs />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
