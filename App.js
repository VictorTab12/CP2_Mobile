import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './screens/MainNavigator';
import { app } from './firebaseConfig';

function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}

export default App;